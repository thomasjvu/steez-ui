import React from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { QuartzCrystal } from "./QuartzCrystal";

let intersect: IntersectionObserverCallback;
let mediaChange: () => void;
let matches = false;
const disconnect = vi.fn();
const removeMedia = vi.fn();

beforeEach(() => {
  matches = false;
  vi.stubGlobal("matchMedia", vi.fn(() => ({
    get matches() { return matches; },
    addEventListener: (_type: string, callback: () => void) => { mediaChange = callback; },
    removeEventListener: removeMedia,
  })));
  vi.stubGlobal("IntersectionObserver", class {
    constructor(callback: IntersectionObserverCallback) { intersect = callback; }
    observe() {}
    disconnect = disconnect;
  });
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.restoreAllMocks(); vi.clearAllMocks(); });

describe("QuartzCrystal", () => {
  it("keeps all nine facets decorative and scopes distortion IDs per instance", () => {
    const { container } = render(<><QuartzCrystal data-testid="one" distortion={20} /><QuartzCrystal data-testid="two" color="#ff00ff" distortion={20} /></>);
    const ids = [...container.querySelectorAll("filter")].map((filter) => filter.id);
    expect(new Set(ids).size).toBe(2);
    for (const id of ["one", "two"]) {
      const root = screen.getByTestId(id);
      expect(root).toHaveAttribute("aria-hidden", "true");
      expect(root.querySelector('.quartz')?.children).toHaveLength(9);
      expect(ids.some((filter) => root.style.getPropertyValue("--quartz-distortion") === `url(#${filter})`)).toBe(true);
    }
  });

  it("pauses when hidden, offscreen, paused, or reduced motion is enabled", () => {
    const { rerender } = render(<QuartzCrystal data-testid="crystal" />);
    const root = screen.getByTestId("crystal");
    expect(root).toHaveAttribute("data-running", "true");
    act(() => intersect([{ isIntersecting: false } as IntersectionObserverEntry], {} as IntersectionObserver));
    expect(root).toHaveAttribute("data-running", "false");
    act(() => intersect([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver));
    expect(root).toHaveAttribute("data-running", "true");
    act(() => { matches = true; mediaChange(); });
    expect(root).toHaveAttribute("data-running", "false");
    act(() => { matches = false; mediaChange(); });
    rerender(<QuartzCrystal data-testid="crystal" visible={false} />);
    expect(root).toHaveAttribute("data-visible", "false");
    expect(root).toHaveAttribute("data-running", "false");
    rerender(<QuartzCrystal data-testid="crystal" paused />);
    expect(root).toHaveAttribute("data-running", "false");
  });

  it("pauses for hidden tabs and removes observers and media listeners on unmount", () => {
    const { unmount } = render(<QuartzCrystal data-testid="crystal" />);
    vi.spyOn(document, "visibilityState", "get").mockReturnValue("hidden");
    fireEvent(document, new Event("visibilitychange"));
    expect(screen.getByTestId("crystal")).toHaveAttribute("data-running", "false");
    unmount();
    expect(disconnect).toHaveBeenCalledTimes(1);
    expect(removeMedia).toHaveBeenCalledWith("change", mediaChange);
  });

  it("bounds opt-in parallax and cancels pending animation work", () => {
    let frame: FrameRequestCallback = () => {};
    const request = vi.fn((callback: FrameRequestCallback) => { frame = callback; return 7; });
    const cancel = vi.fn();
    vi.stubGlobal("requestAnimationFrame", request);
    vi.stubGlobal("cancelAnimationFrame", cancel);
    const { unmount } = render(<QuartzCrystal data-testid="crystal" parallax={{ strength: 1, maxX: 10, maxY: 5 }} />);
    const event = () => Object.assign(new Event("pointermove"), { pointerType: "mouse", clientX: 1000, clientY: -1000 });
    fireEvent(window, event());
    fireEvent(window, event());
    expect(request).toHaveBeenCalledTimes(1);
    act(() => frame(0));
    expect(screen.getByTestId("crystal").querySelector<HTMLElement>('.offset')?.style.transform).toBe("translate(10px, -5px)");
    fireEvent(window, event());
    unmount();
    expect(cancel).toHaveBeenCalledWith(7);
    const count = request.mock.calls.length;
    fireEvent(window, event());
    expect(request).toHaveBeenCalledTimes(count);
  });

  it("defaults to crisp facets without an SVG filter and normalizes invalid sizing", () => {
    const { container } = render(<QuartzCrystal data-testid="crystal" width={NaN} durationMs={Infinity} />);
    expect(container.querySelector("filter")).toBeNull();
    expect(screen.getByTestId("crystal").style.getPropertyValue("--quartz-width")).toBe("120px");
    expect(screen.getByTestId("crystal").style.getPropertyValue("--quartz-speed")).toBe("5000ms");
  });
});
