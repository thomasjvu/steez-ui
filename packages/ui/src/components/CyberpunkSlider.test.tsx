import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { CyberpunkSlider } from "./CyberpunkSlider";

const noop = () => {};

afterEach(() => {
  cleanup();
});

describe("CyberpunkSlider aria-describedby", () => {
  it("associates helperText via aria-describedby", () => {
    render(
      <CyberpunkSlider
        label="Volume"
        helperText="0 is silent."
        value={40}
        onChange={noop}
      />,
    );

    const slider = screen.getByRole("slider", { name: "Volume" });
    const describedBy = slider.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();

    const helper = document.getElementById(describedBy!);
    expect(helper?.textContent).toBe("0 is silent.");
  });

  it("omits aria-describedby when helperText is absent", () => {
    render(<CyberpunkSlider label="Volume" value={40} onChange={noop} />);

    const slider = screen.getByRole("slider", { name: "Volume" });
    expect(slider.getAttribute("aria-describedby")).toBeNull();
  });

  it("preserves consumer aria-describedby when helperText is absent", () => {
    render(
      <CyberpunkSlider
        label="Volume"
        aria-describedby="err-volume"
        value={40}
        onChange={noop}
      />,
    );

    const slider = screen.getByRole("slider", { name: "Volume" });
    expect(slider.getAttribute("aria-describedby")).toBe("err-volume");
  });

  it("merges consumer aria-describedby with helperId", () => {
    render(
      <CyberpunkSlider
        label="Volume"
        helperText="0 is silent."
        aria-describedby="err-volume"
        value={40}
        onChange={noop}
      />,
    );

    const slider = screen.getByRole("slider", { name: "Volume" });
    const describedBy = slider.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();

    const ids = describedBy!.split(/\s+/);
    expect(ids).toContain("err-volume");
    expect(ids).toHaveLength(2);

    const helperId = ids.find((id) => id !== "err-volume")!;
    expect(document.getElementById(helperId)?.textContent).toBe("0 is silent.");
  });
});
