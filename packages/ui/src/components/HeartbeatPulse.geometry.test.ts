// @vitest-environment node
import { describe, expect, it } from "vitest";

import {
  LINE_TRACE_POINTS,
  LINE_VIEWBOX,
  ORB_VIEWBOX,
  beatSeconds,
  lineSize,
  orbGeometry,
  pulseSize,
} from "./HeartbeatPulse.geometry";

// Failure modes pinned here:
// - the line beat drifts outside its 1.9s-2.4s band or the orb off 1.2s
// - default sizes shrink back to tiny or ignore explicit width/height
// - the orb is drawn in px instead of viewBox units (tiny at any size)
// - tiny or malformed sizes produce a zero, negative or NaN svg size
// - the orb trace or line spikes leave their viewBox

const numbers = (value: string) => value.match(/-?\d+(\.\d+)?/g)!.map(Number);

describe("beatSeconds", () => {
  it("clamps the line to the interval band and fixes the orb", () => {
    expect([10, 30, 120].map((minutes) => beatSeconds("line", minutes))).toEqual([1.9, 2, 2.4]);
    expect(beatSeconds("orb", 120)).toBe(1.2);
  });
});

describe("lineSize", () => {
  it("grows from size with a 280x96 floor; explicit sizes win", () => {
    expect(lineSize(24)).toEqual({ width: 280, height: 96 });
    expect(lineSize(100)).toEqual({ width: 400, height: 150 });
    expect(lineSize(100, 40, 10)).toEqual({ width: 40, height: 10 });
  });

  it("keeps the trace inside the viewBox", () => {
    const points = numbers(LINE_TRACE_POINTS);
    expect(points).toHaveLength(26);
    points.forEach((value, index) => {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(index % 2 === 0 ? LINE_VIEWBOX.width : LINE_VIEWBOX.height);
    });
  });
});

describe("orbGeometry", () => {
  it("fills 80% of the viewBox regardless of rendered size", () => {
    expect(orbGeometry()).toMatchObject({ center: 50, radius: 40, ripples: [32, 20], core: 10, corePeak: 12 });
  });

  it("keeps the rendered size positive and finite", () => {
    expect([0, -10, 7.9].map(pulseSize)).toEqual([8, 8, 8]);
    expect(pulseSize(Number.NaN)).toBe(64);
    expect(pulseSize(10_000)).toBe(512);
  });

  it("keeps the trace inside the viewBox", () => {
    const coords = numbers(orbGeometry().tracePath);
    expect(coords).toEqual([0, 50, 15, 50, 20, 50, 25, 10, 30, 90, 35, 50, 100, 50]);
    for (const value of coords) expect(value).toBeLessThanOrEqual(ORB_VIEWBOX);
  });
});
