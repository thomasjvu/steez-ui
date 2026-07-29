import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  LOADING_PROGRESS_SEGMENT_COUNT,
  LoadingProgressBar,
} from "./LoadingProgressBar";

describe("LoadingProgressBar", () => {
  it("renders the default rounded progress label", () => {
    render(<LoadingProgressBar progress={72.4} />);
    expect(screen.getByText("72%")).toBeTruthy();
  });

  it("uses valueLabel when provided", () => {
    render(<LoadingProgressBar progress={50} valueLabel="halfway" />);
    expect(screen.getByText("halfway")).toBeTruthy();
  });

  it("clamps progress below 0 to 0%", () => {
    render(<LoadingProgressBar progress={-20} />);
    expect(screen.getByText("0%")).toBeTruthy();
  });

  it("clamps progress above 100 to 100%", () => {
    render(<LoadingProgressBar progress={150} />);
    expect(screen.getByText("100%")).toBeTruthy();
  });

  it("fills segments proportional to clamped progress", () => {
    const { container } = render(<LoadingProgressBar progress={50} />);
    const bars = container.querySelectorAll("[class*='bar']");
    // barGroup children: each segment has class "bar"; filled ones also get barFilled
    const segmentBars = Array.from(bars).filter((el) => {
      const className = el.className;
      return (
        typeof className === "string" &&
        className.includes("bar") &&
        !className.includes("barGroup")
      );
    });

    // With non-scoped CSS modules, class names are the original names
    const filled = segmentBars.filter((el) =>
      el.className.includes("barFilled"),
    );

    expect(segmentBars.length).toBe(LOADING_PROGRESS_SEGMENT_COUNT);
    expect(filled.length).toBe(
      Math.round((50 / 100) * LOADING_PROGRESS_SEGMENT_COUNT),
    );
  });
});
