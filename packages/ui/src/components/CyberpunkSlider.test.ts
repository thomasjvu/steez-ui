import { describe, expect, it } from "vitest";

import { sliderPercentage } from "./CyberpunkSlider";

describe("sliderPercentage", () => {
  it("returns 0 when max === min (avoids NaN)", () => {
    expect(sliderPercentage(5, 10, 10)).toBe(0);
    expect(sliderPercentage(0, 0, 0)).toBe(0);
  });

  it("returns mid-range percentage", () => {
    expect(sliderPercentage(50, 0, 100)).toBe(50);
    expect(sliderPercentage(25, 0, 100)).toBe(25);
  });

  it("clamps below 0 to 0", () => {
    expect(sliderPercentage(-10, 0, 100)).toBe(0);
  });

  it("clamps above 100 to 100", () => {
    expect(sliderPercentage(150, 0, 100)).toBe(100);
  });

  it("handles string values", () => {
    expect(sliderPercentage("75", 0, 100)).toBe(75);
  });

  it("returns 0 for non-finite results (e.g. non-numeric value)", () => {
    expect(sliderPercentage(Number.NaN, 0, 100)).toBe(0);
    expect(sliderPercentage("nope", 0, 100)).toBe(0);
  });
});
