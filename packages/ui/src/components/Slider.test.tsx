import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Slider } from "./Slider";

const noop = () => {};

afterEach(() => {
  cleanup();
});

describe("Slider aria-describedby", () => {
  it("associates helperText via aria-describedby", () => {
    render(
      <Slider
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
    render(<Slider label="Volume" value={40} onChange={noop} />);

    const slider = screen.getByRole("slider", { name: "Volume" });
    expect(slider.getAttribute("aria-describedby")).toBeNull();
  });

  it("preserves consumer aria-describedby when helperText is absent", () => {
    render(
      <Slider
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
      <Slider
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

  it("associates an error message and marks the slider invalid", () => {
    render(
      <Slider
        label="Volume"
        error="Volume must be within range."
        value={40}
        onChange={noop}
      />,
    );

    const slider = screen.getByRole("slider", { name: "Volume" });
    const error = screen.getByRole("alert");

    expect(slider.getAttribute("aria-invalid")).toBe("true");
    expect(slider.getAttribute("aria-describedby")).toBe(error.id);
    expect(error.textContent).toBe("Volume must be within range.");
  });
});

describe("Slider diamond and native values", () => {
  it("updates an uncontrolled range, progress, visible value, and submitted value", () => {
    render(<form data-testid="volume-form"><Slider variant="diamond" label="Volume" name="volume" defaultValue={25} min={0} max={100} step={5} /></form>);
    const slider = screen.getByRole("slider", { name: "Volume" });
    expect(slider).toHaveValue("25");
    fireEvent.change(slider, { target: { value: "70" } });
    expect(slider).toHaveValue("70");
    expect(screen.getByText("70")).toBeInTheDocument();
    expect(slider.parentElement?.style.getPropertyValue("--slider-percentage")).toBe("70");
    expect(new FormData(screen.getByTestId("volume-form") as HTMLFormElement).get("volume")).toBe("70");
  });

  it("keeps controlled state with the caller and forwards change events", () => {
    const change = vi.fn();
    const { rerender } = render(<Slider variant="diamond" label="Volume" value={30} onChange={change} />);
    fireEvent.change(screen.getByRole("slider"), { target: { value: "80" } });
    expect(change).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("slider")).toHaveValue("30");
    expect(screen.getByText("30")).toBeInTheDocument();
    rerender(<Slider variant="diamond" label="Volume" value={80} onChange={change} />);
    expect(screen.getByRole("slider")).toHaveValue("80");
    expect(screen.getByText("80")).toBeInTheDocument();
  });

  it("synchronizes uncontrolled progress and value after a native form reset", async () => {
    render(<form data-testid="volume-form"><Slider variant="diamond" label="Volume" defaultValue={20} /></form>);
    fireEvent.change(screen.getByRole("slider"), { target: { value: "90" } });
    (screen.getByTestId("volume-form") as HTMLFormElement).reset();
    await waitFor(() => expect(screen.getByText("20")).toBeInTheDocument());
    expect(screen.getByRole("slider")).toHaveValue("20");
    expect(screen.getByRole("slider").parentElement?.style.getPropertyValue("--slider-percentage")).toBe("20");
  });

  it("uses native range clamping for defaults and retains accessible errors and disabled state", () => {
    render(<Slider variant="diamond" label="Volume" min={10} max={50} defaultValue={100} step={5} error="Check volume." disabled />);
    const slider = screen.getByRole("slider", { name: "Volume" });
    expect(slider).toHaveValue("50");
    expect(screen.getByText("50")).toBeInTheDocument();
    expect(slider).toBeDisabled();
    expect(slider).toHaveAttribute("aria-invalid", "true");
    expect(slider).toHaveAccessibleDescription("Check volume.");
  });
});
