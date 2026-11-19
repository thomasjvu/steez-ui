import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { IconBackground } from "./IconBackground";

afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

it("renders a bounded decorative grid with customizable artwork", () => {
  const { container } = render(<IconBackground columns={30} rows={0} size={Infinity} gap={NaN}
    icon={<svg data-testid="art" />} data-testid="grid" />);
  expect(container.querySelectorAll("[data-icon-cell]")).toHaveLength(24);
  expect(screen.getAllByTestId("art")).toHaveLength(24);
  expect(screen.getByTestId("grid")).toHaveAttribute("aria-hidden", "true");
  expect(screen.getByTestId("grid")).toHaveAttribute("data-running", "false");
  expect(container.innerHTML).not.toMatch(/NaN|Infinity/);
});

it("batches pointer events and uses each unrotated cell center, then resets on pause", () => {
  let frame: FrameRequestCallback = () => {};
  const request = vi.fn((callback: FrameRequestCallback) => { frame = callback; return 1; });
  const cancel = vi.fn();
  vi.stubGlobal("requestAnimationFrame", request);
  vi.stubGlobal("cancelAnimationFrame", cancel);
  const { container, rerender } = render(<IconBackground variant="magnetic" columns={2} rows={1} />);
  const cells = Array.from(container.querySelectorAll<HTMLElement>("[data-icon-cell]"));
  cells.forEach((cell, index) => vi.spyOn(cell, "getBoundingClientRect").mockReturnValue({
    left: index * 50, top: 0, width: 40, height: 40,
  } as DOMRect));
  act(() => {
    window.dispatchEvent(new MouseEvent("pointermove", { clientX: 0, clientY: 0 }));
    window.dispatchEvent(new MouseEvent("pointermove", { clientX: 20, clientY: 100 }));
  });
  expect(request).toHaveBeenCalledTimes(1);
  act(() => frame(0));
  expect((cells[0].firstElementChild as HTMLElement).style.transform).toBe("rotate(90deg)");
  expect(parseFloat((cells[1].firstElementChild as HTMLElement).style.transform.slice(7))).toBeCloseTo(122, 0);
  act(() => window.dispatchEvent(new MouseEvent("pointermove", { clientX: 30, clientY: 40 })));
  rerender(<IconBackground variant="magnetic" columns={2} rows={1} paused />);
  expect(cancel).toHaveBeenCalledWith(1);
  expect((cells[0].firstElementChild as HTMLElement).style.transform).toBe("");
  act(() => window.dispatchEvent(new MouseEvent("pointermove")));
  expect(request).toHaveBeenCalledTimes(2);
});

it("ignores touch and keeps reduced-motion grids still", () => {
  const request = vi.fn();
  vi.stubGlobal("requestAnimationFrame", request);
  const { rerender } = render(<IconBackground variant="magnetic" columns={1} rows={1} />);
  const touch = new MouseEvent("pointermove");
  Object.defineProperty(touch, "pointerType", { value: "touch" });
  act(() => window.dispatchEvent(touch));
  expect(request).not.toHaveBeenCalled();
  vi.stubGlobal("matchMedia", () => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
  rerender(<IconBackground key="reduced" variant="magnetic" data-testid="grid" />);
  expect(screen.getByTestId("grid")).toHaveAttribute("data-running", "false");
  act(() => window.dispatchEvent(new MouseEvent("pointermove")));
  expect(request).not.toHaveBeenCalled();
});

it("scales cells near the pointer down for shrink and up for grow, then resets", () => {
  let frame: FrameRequestCallback = () => {};
  vi.stubGlobal("requestAnimationFrame", vi.fn((callback: FrameRequestCallback) => { frame = callback; return 1; }));
  vi.stubGlobal("cancelAnimationFrame", vi.fn());
  const scales = (variant: "shrink" | "grow") => {
    const { container, unmount } = render(<IconBackground variant={variant} columns={3} rows={1} />);
    const cells = Array.from(container.querySelectorAll<HTMLElement>("[data-icon-cell]"));
    cells.forEach((cell, index) => vi.spyOn(cell, "getBoundingClientRect").mockReturnValue({
      left: index * 200, top: 0, width: 40, height: 40,
    } as DOMRect));
    act(() => window.dispatchEvent(new MouseEvent("pointermove", { clientX: 20, clientY: 20 })));
    act(() => frame(0));
    const values = cells.map(cell => (cell.firstElementChild as HTMLElement).style.transform);
    act(() => document.documentElement.dispatchEvent(new MouseEvent("pointerleave")));
    const reset = cells.map(cell => (cell.firstElementChild as HTMLElement).style.transform);
    unmount();
    return { values, reset };
  };
  const shrink = scales("shrink");
  expect(shrink.values[0]).toBe("scale(0.3)");
  expect(shrink.values.slice(1)).toEqual(["scale(1)", "scale(1)"]);
  expect(shrink.reset).toEqual(["", "", ""]);
  expect(scales("grow").values[0]).toBe("scale(1.5)");
});
