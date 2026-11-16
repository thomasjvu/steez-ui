// @vitest-environment node
import { describe, expect, it } from "vitest";

import {
  LINE_TRACE_POINTS,
  LINE_VIEWBOX,
  ORB_VIEWBOX,
  beatSeconds,
  lineSize,
  orbGeometry,
} from "./HeartbeatPulse.geometry";

// Failure modes pinned here:
// - the line beat drifts outside its 1.9s-2.4s band or the orb off 1.2s
// - default line sizes change or ignore explicit width/height
// - the orb radii stop tracking size
// - tiny or malformed sizes produce negative or NaN radii (invalid SVG)
// - the orb trace or line spikes leave their viewBox

const numbers = (value: string) => value.match(/-?\d+(\.\d+)?/g)!.map(Number);

describe("beatSeconds", () => {
  it("clamps the line to the interval band and fixes the orb", () => {
    expect([10, 30, 120].map((minutes) => beatSeconds("line", minutes))).toEqual([1.9, 2, 2.4]);
    expect(beatSeconds("orb", 120)).toBe(1.2);
  });
});

describe("lineSize", () => {
  it("grows from size with a 200x72 floor; explicit sizes win", () => {
    expect(lineSize(24)).toEqual({ width: 200, height: 72 });
    expect(lineSize(100)).toEqual({ width: 300, height: 100 });
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
  it("derives ring, ripple and core radii from size", () => {
    const orb = orbGeometry(48);
    expect(orb).toMatchObject({ center: 50, radius: 20, ripples: [16, 10], core: 5, corePeak: 6 });
  });

  it("keeps every radius positive for tiny or malformed sizes", () => {
    for (const size of [0, 4, 7.9, -10]) {
      const { radius, ripples, core, corePeak } = orbGeometry(size);
      expect(radius).toBe(1);
      for (const value of [...ripples, core, corePeak]) expect(value).toBeGreaterThan(0);
    }
    expect(orbGeometry(Number.NaN).radius).toBe(orbGeometry(24).radius);
    expect(orbGeometry(10).radius).toBe(1);
  });

  it("keeps the trace inside the viewBox", () => {
    const coords = numbers(orbGeometry(24).tracePath);
    expect(coords).toEqual([0, 50, 15, 50, 20, 50, 25, 10, 30, 90, 35, 50, 100, 50]);
    for (const value of coords) expect(value).toBeLessThanOrEqual(ORB_VIEWBOX);
  });
});
