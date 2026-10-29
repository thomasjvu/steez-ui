// @vitest-environment node
import { describe, expect, it } from "vitest";

import {
  closestNodeIndex,
  nodeAngle,
  padOrdinal,
  readStick,
} from "./RadialMenuOverlay.geometry";

// Failure modes pinned here:
// - nodes drift from 12 o'clock or run counter-clockwise
// - the closest node is wrong across the -180/180 seam, or ties pick a later node
// - an empty menu selects a phantom node
// - the stick escapes its travel radius or loses its direction when clamped
// - a collapsed (zero-size) wheel divides by zero

describe("nodeAngle", () => {
  it("starts at 12 o'clock and steps clockwise", () => {
    expect(nodeAngle(0, 4)).toBe(-90);
    expect(nodeAngle(1, 4)).toBe(0);
    expect(nodeAngle(3, 4)).toBe(180);
    expect(nodeAngle(0, 0)).toBe(-90);
  });
});

describe("closestNodeIndex", () => {
  it("picks the nearest node, wrapping across the seam", () => {
    expect(closestNodeIndex(-80, 4)).toBe(0);
    expect(closestNodeIndex(10, 4)).toBe(1);
    expect(closestNodeIndex(-175, 4)).toBe(3);
    expect(closestNodeIndex(260, 4)).toBe(0);
  });

  it("breaks ties toward the earlier node", () => {
    expect(closestNodeIndex(-45, 4)).toBe(0);
  });

  it("returns -1 when there are no nodes", () => {
    expect(closestNodeIndex(0, 0)).toBe(-1);
  });
});

describe("readStick", () => {
  const rect = { left: 0, top: 0, width: 100, height: 100 };

  it("follows the pointer inside its travel radius", () => {
    const stick = readStick(rect, 60, 50);
    expect(stick.x).toBeCloseTo(10);
    expect(stick.y).toBeCloseTo(0);
    expect(stick.progress).toBeCloseTo(10 / 28);
  });

  it("clamps to the travel radius but keeps the direction", () => {
    const stick = readStick(rect, 50, 150);
    expect(stick.x).toBeCloseTo(0);
    expect(stick.y).toBeCloseTo(28);
    expect(stick.progress).toBeCloseTo(100 / 28);
  });

  it("uses the shorter side of a non-square wheel", () => {
    expect(readStick({ left: 0, top: 0, width: 200, height: 100 }, 200, 50).x).toBeCloseTo(28);
  });

  it("stays centred on a zero-size wheel", () => {
    expect(readStick({ left: 10, top: 10, width: 0, height: 0 }, 40, 40)).toEqual({
      x: 0,
      y: 0,
      progress: 0,
    });
  });
});

describe("padOrdinal", () => {
  it("pads to two digits", () => {
    expect(padOrdinal(3)).toBe("03");
    expect(padOrdinal(12)).toBe("12");
  });
});
