import { act, cleanup, fireEvent, render } from "@testing-library/react";
import type { ReactElement } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { AsciiRippleText } from "./AsciiRippleText";

// Pinned before the wave logic moved out of the component. Time is fully
// deterministic: Date is faked from 0 and requestAnimationFrame is a manual
// queue, so a frame at time T runs exactly the callbacks requested before it,
// with Date.now() === T. Nothing depends on the wall clock or timer phase.
// Failure modes:
// - a frame renders different glyphs at the same time and position
// - spaces stop being preserved (or are preserved when they should not be)
// - focus does not start from the middle character
// - spread no longer slows the ring
// - a second wave replaces the first instead of overlapping it
// - the text, width lock or active class outlive the waves
// - disabled text animates

const TEXT = "Hi there you";
const FRAME_MS = 16;

let frames = new Map<number, FrameRequestCallback>();
let nextFrameId = 1;

beforeEach(() => {
  vi.useFakeTimers({ now: 0, toFake: ["Date"] });
  frames = new Map();
  nextFrameId = 1;
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
    const id = nextFrameId++;
    frames.set(id, callback);
    return id;
  });
  vi.stubGlobal("cancelAnimationFrame", (id: number) => {
    frames.delete(id);
  });
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
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

/** Move the clock one frame and run the callbacks that were due for it. */
function stepFrame() {
  vi.setSystemTime(Date.now() + FRAME_MS);
  const due = [...frames.keys()];
  act(() => {
    for (const id of due) {
      const callback = frames.get(id);
      if (!callback) continue; // cancelled by an earlier callback this frame
      frames.delete(id);
      callback(Date.now());
    }
  });
}

/** Step frame by frame; record text at the requested times. */
function framesAt(visual: HTMLElement, times: number[], onFrame?: (now: number) => void) {
  const recorded: Record<number, string> = {};
  while (Date.now() < Math.max(...times)) {
    onFrame?.(Date.now());
    stepFrame();
    if (times.includes(Date.now())) recorded[Date.now()] = visual.textContent ?? "";
  }
  return times.map((time) => recorded[time]);
}

const ripple = (props: object = {}) => (
  <AsciiRippleText characterSet="abcdefgh" durationMs={400} {...props}>{TEXT}</AsciiRippleText>
);

describe("AsciiRippleText timing", () => {
  it("ripples out from the pointer, keeps spaces, then restores the text", () => {
    const visual = mount(ripple());
    fireEvent.mouseEnter(visual, { clientX: 30 });

    // The queued wave starts on the first frame (16ms) and paints from the next.
    expect(framesAt(visual, [16, 32, 48, 112, 160, 224, 288, 352, 400])).toEqual([
      TEXT, "Hi ahere you", "Hi adere you", "da tfade you", "eb thbeh you",
      "Hi therb hou", "Hi there adg", "Hi there yoa", "Hi there you",
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
    expect(framesAt(visual, [64, 112, 192])).toEqual(["Hiebeere you", "daftfade you", "fi thefadyou"]);
  });

  it("starts a focus ripple from the middle character", () => {
    const visual = mount(ripple());
    fireEvent.focus(visual);
    expect(framesAt(visual, [48, 112, 160, 224])).toEqual([
      "Hi theae you", "Hi tafcf you", "Hi ebgrg eou", "He ghere gbe",
    ]);
  });

  it("slows the ring as spread grows", () => {
    const visual = mount(ripple({ spread: 2 }));
    fireEvent.mouseEnter(visual, { clientX: 30 });
    expect(framesAt(visual, [96, 160, 224])).toEqual(["Hi cfere you", "Hb dgbre you", "gd tadge you"]);
  });

  it("overlaps a second wave and stops only after the last one ends", () => {
    const visual = mount(ripple());
    fireEvent.mouseEnter(visual, { clientX: 30 });
    const frames = framesAt(visual, [128, 176, 272, 400, 448, 464], (now) => {
      if (now === 80) fireEvent.mouseMove(visual, { clientX: 110 });
    });
    expect(frames).toEqual([
      "da tfade yda", "fi thefa afu", "Hi tbgde adg", "af there you", TEXT, TEXT,
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
