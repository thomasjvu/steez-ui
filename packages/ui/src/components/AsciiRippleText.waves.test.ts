// @vitest-environment node
import { describe, expect, it } from "vitest";

import {
  DEFAULT_CHARACTER_SET,
  MAX_ACTIVE_WAVES,
  addWave,
  focusIndex,
  liveWaves,
  pointerIndex,
  rippleFrame,
  safeRippleOptions,
} from "./AsciiRippleText.waves";

// Failure modes pinned here (frame-by-frame output is pinned in
// AsciiRippleText.timing.test):
// - a fast pointer grows the wave list without bound
// - a wave outlives its duration, or ends a frame early
// - the pointer maps outside the text, or a zero-width box divides by zero
// - an empty glyph set or bad duration reaches the frame math
// - characters behind the ring stay scrambled instead of settling

const options = safeRippleOptions({ characterSet: "ab", durationMs: 100, spread: 1, preserveSpaces: true });

describe("waves", () => {
  it("keeps only the newest MAX_ACTIVE_WAVES", () => {
    let waves = addWave([], 0, 0);
    for (let index = 1; index < 20; index += 1) waves = addWave(waves, index, index);
    expect(waves).toHaveLength(MAX_ACTIVE_WAVES);
    expect(waves.map((wave) => wave.startPos)).toEqual([12, 13, 14, 15, 16, 17, 18, 19]);
  });

  it("drops a wave exactly at its duration", () => {
    const waves = addWave([], 0, 1000);
    expect(liveWaves(waves, 1099, 100)).toHaveLength(1);
    expect(liveWaves(waves, 1100, 100)).toHaveLength(0);
  });
});

describe("positions", () => {
  it("clamps the pointer to the text and survives a zero-width box", () => {
    const box = { left: 10, width: 100 };
    expect([pointerIndex(0, box, 5), pointerIndex(60, box, 5), pointerIndex(500, box, 5)]).toEqual([0, 3, 4]);
    expect(pointerIndex(10, { left: 10, width: 0 }, 5)).toBe(0);
    expect(pointerIndex(50, box, 0)).toBe(0);
  });

  it("starts focus ripples in the middle", () => {
    expect([focusIndex(0), focusIndex(1), focusIndex(12)]).toEqual([0, 0, 6]);
  });
});

describe("safeRippleOptions", () => {
  it("falls back from an empty glyph set and a bad duration", () => {
    const safe = safeRippleOptions({ characterSet: "", durationMs: Number.NaN, spread: 1, preserveSpaces: true });
    expect(safe.characterSet).toBe(DEFAULT_CHARACTER_SET);
    expect(safe.durationMs).toBe(900);
    expect(safeRippleOptions({ ...safe, durationMs: -5 }).durationMs).toBe(1);
  });
});

describe("rippleFrame", () => {
  it("scrambles only the ring edge and leaves text untouched with no waves", () => {
    const text = "xxxxxxxxx";
    expect(rippleFrame(text, [], 0, options)).toBe(text);
    // Halfway through, the ring around index 0 has radius (0.5 * (8 + 5)) = 6.5:
    // distances 4-6 are on the edge (scrambled), 0-3 have settled.
    const frame = rippleFrame(text, [{ startPos: 0, startTime: 0 }], 50, options);
    expect(frame.slice(0, 4)).toBe("xxxx");
    expect(frame.slice(4, 7)).toMatch(/^[ab]{3}$/);
    expect(frame.slice(7)).toBe("xx");
  });
});
