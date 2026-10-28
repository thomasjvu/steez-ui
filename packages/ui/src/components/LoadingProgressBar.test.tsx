import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { LoadingProgressBar } from "./LoadingProgressBar";

afterEach(() => {
  cleanup();
});

describe("LoadingProgressBar", () => {
  it("renders the default rounded progress label", () => {
    render(<LoadingProgressBar progress={72.4} />);
    expect(screen.getByText("72%")).toBeTruthy();
  });



  it("clamps progress below 0 to 0%", () => {
    render(<LoadingProgressBar progress={-20} />);
    expect(screen.getByText("0%")).toBeTruthy();
  });

  it("clamps progress above 100 to 100%", () => {
    render(<LoadingProgressBar progress={150} />);
    expect(screen.getByText("100%")).toBeTruthy();
  });



  it("exposes progressbar semantics with aria value bounds", () => {
    render(<LoadingProgressBar progress={72.4} />);
    const bar = screen.getByRole("progressbar");
    expect(bar.getAttribute("aria-valuemin")).toBe("0");
    expect(bar.getAttribute("aria-valuemax")).toBe("100");
    expect(bar.getAttribute("aria-valuenow")).toBe("72.4");
    expect(bar.getAttribute("aria-label")).toBe("72%");
  });

  it("uses valueLabel as aria-label when provided", () => {
    render(<LoadingProgressBar progress={50} valueLabel="halfway" />);
    expect(screen.getByRole("progressbar").getAttribute("aria-label")).toBe(
      "halfway",
    );
  });

  it("coerces NaN progress to 0", () => {
    render(<LoadingProgressBar progress={Number.NaN} />);
    const bar = screen.getByRole("progressbar");
    expect(screen.getByText("0%")).toBeTruthy();
    expect(bar.getAttribute("aria-valuenow")).toBe("0");
  });

  it("coerces non-finite progress (Infinity) to 0", () => {
    render(<LoadingProgressBar progress={Number.POSITIVE_INFINITY} />);
    expect(screen.getByText("0%")).toBeTruthy();
    expect(screen.getByRole("progressbar").getAttribute("aria-valuenow")).toBe(
      "0",
    );
  });
});
