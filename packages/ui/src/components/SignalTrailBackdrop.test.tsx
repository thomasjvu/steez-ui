import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { SignalTrailBackdrop } from "./SignalTrailBackdrop";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("SignalTrailBackdrop browser fallbacks", () => {
  it("marks the surface unavailable instead of throwing without WebGL", () => {
    vi.stubGlobal("ResizeObserver", undefined);
    vi.stubGlobal("IntersectionObserver", undefined);
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);

    const { container } = render(
      <SignalTrailBackdrop linesCount={0} segments={0} />,
    );

    expect(container.firstElementChild).toHaveAttribute(
      "data-webgl-unavailable",
      "true",
    );
  });
});
