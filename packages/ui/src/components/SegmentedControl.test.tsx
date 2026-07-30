import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { SegmentedControl } from "./SegmentedControl";

const options = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
];

afterEach(() => {
  cleanup();
});

describe("SegmentedControl", () => {
  it("exposes radiogroup + radio roles instead of tablist", () => {
    render(
      <SegmentedControl value="day" options={options} onChange={() => {}} ariaLabel="Range" />,
    );

    expect(screen.getByRole("radiogroup", { name: "Range" })).toBeTruthy();
    expect(screen.getAllByRole("radio")).toHaveLength(3);
    expect(screen.queryByRole("tablist")).toBeNull();
    expect(screen.queryByRole("tab")).toBeNull();
  });

  it("marks the selected option with aria-checked and roving tabIndex", () => {
    render(
      <SegmentedControl value="week" options={options} onChange={() => {}} ariaLabel="Range" />,
    );

    const day = screen.getByRole("radio", { name: "Day" });
    const week = screen.getByRole("radio", { name: "Week" });
    const month = screen.getByRole("radio", { name: "Month" });

    expect(day.getAttribute("aria-checked")).toBe("false");
    expect(week.getAttribute("aria-checked")).toBe("true");
    expect(month.getAttribute("aria-checked")).toBe("false");
    expect(day.tabIndex).toBe(-1);
    expect(week.tabIndex).toBe(0);
    expect(month.tabIndex).toBe(-1);
  });

  it("selects an option on click", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <SegmentedControl value="day" options={options} onChange={onChange} ariaLabel="Range" />,
    );

    await user.click(screen.getByRole("radio", { name: "Month" }));
    expect(onChange).toHaveBeenCalledWith("month");
  });

  it("moves selection with arrow keys", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    const { rerender } = render(
      <SegmentedControl value="day" options={options} onChange={onChange} ariaLabel="Range" />,
    );

    screen.getByRole("radio", { name: "Day" }).focus();
    await user.keyboard("{ArrowRight}");
    expect(onChange).toHaveBeenCalledWith("week");

    rerender(
      <SegmentedControl value="week" options={options} onChange={onChange} ariaLabel="Range" />,
    );

    screen.getByRole("radio", { name: "Week" }).focus();
    await user.keyboard("{ArrowLeft}");
    expect(onChange).toHaveBeenLastCalledWith("day");
  });

  it("supports Home and End for first and last options", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <SegmentedControl value="week" options={options} onChange={onChange} ariaLabel="Range" />,
    );

    screen.getByRole("radio", { name: "Week" }).focus();
    await user.keyboard("{End}");
    expect(onChange).toHaveBeenLastCalledWith("month");

    await user.keyboard("{Home}");
    expect(onChange).toHaveBeenLastCalledWith("day");
  });
});
