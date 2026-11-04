import { act, cleanup, fireEvent, render } from "@testing-library/react";
import type { ReactElement } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { AsciiRippleText } from "./AsciiRippleText";

// Pinned with fake Date + animation frames (16ms) before the wave logic
// moved out of the component. Failure modes:
// - a frame renders different glyphs at the same time and position
// - spaces stop being preserved (or are preserved when they should not be)
// - focus does not start from the middle character
// - spread no longer slows the ring
// - a second wave replaces the first instead of overlapping it
// - the text, width lock or active class outlive the waves
// - disabled text animates

const TEXT = "Hi there you";

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date", "requestAnimationFrame", "cancelAnimationFrame"] });
  vi.setSystemTime(0);
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

function mount(element: ReactElement) {
  const { container } = render(element);
  const visual = container.querySelector<HTMLElement>("[aria-hidden='true']")!;
  vi.spyOn(visual, "getBoundingClientRect").mockReturnValue({
    bottom: 20, height: 20, left: 0, right: 120, top: 0, width: 120, x: 0, y: 0, toJSON: () => ({}),
  });
  return visual;
}

/** Advance one 16ms frame at a time; record text at the requested times. */
function framesAt(visual: HTMLElement, times: number[], onFrame?: (now: number) => void) {
  const frames: Record<number, string> = {};
  while (Date.now() < Math.max(...times)) {
    onFrame?.(Date.now());
    act(() => {
      vi.advanceTimersByTime(16);
    });
    if (times.includes(Date.now())) frames[Date.now()] = visual.textContent ?? "";
  }
  return times.map((time) => frames[time]);
}

const ripple = (props: object = {}) => (
  <AsciiRippleText characterSet="abcdefgh" durationMs={400} {...props}>{TEXT}</AsciiRippleText>
);

describe("AsciiRippleText timing", () => {
  it("ripples out from the pointer, keeps spaces, then restores the text", () => {
    const visual = mount(ripple());
    fireEvent.mouseEnter(visual, { clientX: 30 });

    expect(framesAt(visual, [32, 48, 112, 160, 224, 288, 352, 400])).toEqual([
      TEXT, "Hi ahere you", "Ha cfare you", "eb thbeh you",
      "Hi thera gou", "Hi there adg", "Hi there yoa", "Hi there you",
    ]);
    expect(visual.className).toContain("active");
    expect(visual.style.width).toBe("120px");

    framesAt(visual, [432]);
    expect(visual.textContent).toBe(TEXT);
    expect(visual.className).not.toContain("active");
    expect(visual.style.width).toBe("");
  });

  it("scrambles spaces when preserveSpaces is off", () => {
    const visual = mount(ripple({ preserveSpaces: false }));
    fireEvent.mouseEnter(visual, { clientX: 30 });
    expect(framesAt(visual, [64, 112, 192])).toEqual(["Hidadere you", "Hafcfare you", "fi thefadyou"]);
  });

  it("starts a focus ripple from the middle character", () => {
    const visual = mount(ripple());
    fireEvent.focus(visual);
    expect(framesAt(visual, [48, 112, 160, 224])).toEqual([
      "Hi theae you", "Hi tafcf you", "Hi ebgrg eou", "Hd fhere fad",
    ]);
  });

  it("slows the ring as spread grows", () => {
    const visual = mount(ripple({ spread: 2 }));
    fireEvent.mouseEnter(visual, { clientX: 30 });
    expect(framesAt(visual, [96, 160, 224])).toEqual(["Hi beere you", "Hb dgbre you", "fc thcfe you"]);
  });

  it("overlaps a second wave and stops only after the last one ends", () => {
    const visual = mount(ripple());
    fireEvent.mouseEnter(visual, { clientX: 30 });
    const frames = framesAt(visual, [128, 176, 272, 400, 448, 464], (now) => {
      if (now === 80) fireEvent.mouseMove(visual, { clientX: 110 });
    });
    expect(frames).toEqual([
      "da tfade yoa", "eb thbeh heb", "Hi thgda adu", "af there you", "bi there you", TEXT,
    ]);
    expect(visual.className).toContain("active");
    framesAt(visual, [512]);
    expect(visual.className).not.toContain("active");
  });

  it("never animates when disabled", () => {
    const visual = mount(ripple({ disabled: true }));
    fireEvent.mouseEnter(visual, { clientX: 30 });
    expect(new Set(framesAt(visual, [48, 112, 224]))).toEqual(new Set([TEXT]));
    expect(visual.className).not.toContain("active");
  });
});
