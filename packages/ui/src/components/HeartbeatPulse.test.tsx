import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { HeartbeatPulse } from "./HeartbeatPulse";

// Failure modes pinned here (geometry numbers live in HeartbeatPulse.geometry.test):
// - the beat duration or size never reaches the SVG
// - an inactive pulse keeps animating or loses its dimmed look
// - two pulses share one clip-path id

afterEach(cleanup);

const durations = (root: HTMLElement) =>
  [...new Set([...root.querySelectorAll("animate")].map((node) => node.getAttribute("dur")))];

describe("HeartbeatPulse", () => {
  it("drives every line animation from the interval and sizes the svg", () => {
    const { container } = render(<HeartbeatPulse variant="line" intervalMinutes={120} size={100} />);
    expect(durations(container)).toEqual(["2.4s"]);
    const svg = container.querySelector("svg")!;
    expect([svg.getAttribute("width"), svg.getAttribute("height"), svg.getAttribute("viewBox")])
      .toEqual(["300", "100", "0 0 200 100"]);
  });

  it("stops and dims an inactive line", () => {
    const { container } = render(<HeartbeatPulse variant="line" active={false} />);
    expect(durations(container)).toEqual(["0s"]);
    expect(container.querySelector("polyline")!.getAttribute("opacity")).toBe("0.35");
  });

  it("draws the orb ring, ripples and core from size", () => {
    const { container } = render(<HeartbeatPulse size={48} />);
    expect(durations(container)).toEqual(["1.2s"]);
    const circles = [...container.querySelectorAll("circle")];
    expect(circles.map((node) => node.getAttribute("r"))).toEqual(["20", "20", "20", "5"]);
    expect(circles[1]!.querySelector("animate")!.getAttribute("values")).toBe("16;20");
    expect(container.querySelector("path")).not.toBeNull();
  });

  it("renders a still orb core with no ripples or trace when inactive", () => {
    const { container } = render(<HeartbeatPulse active={false} />);
    expect(container.querySelectorAll("circle")).toHaveLength(2);
    expect(container.querySelector("path")).toBeNull();
    expect(container.querySelectorAll("animate")).toHaveLength(1);
  });

  it("gives each instance its own clip path", () => {
    const { container } = render(<><HeartbeatPulse /><HeartbeatPulse variant="line" /><HeartbeatPulse /></>);
    const ids = [...container.querySelectorAll("clipPath")].map((node) => node.id);
    expect(new Set(ids).size).toBe(3);
  });
});
