import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { TabbedPanel } from "./TabbedPanel";

const tabs = [
  { id: "overview", label: "Overview", content: "Overview body" },
  { id: "details", label: "Details", content: "Details body" },
  { id: "history", label: "History", content: "History body" },
];

afterEach(() => {
  cleanup();
});

describe("TabbedPanel", () => {
  it("selects a tab by click and shows its panel content", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<TabbedPanel tabs={tabs} defaultTab="overview" onChange={onChange} ariaLabel="Sections" />);

    expect(screen.getByText("Overview body")).toBeTruthy();
    expect(screen.queryByText("Details body")).toBeNull();

    await user.click(screen.getByRole("tab", { name: "Details" }));

    expect(onChange).toHaveBeenCalledWith("details");
    expect(screen.getByText("Details body")).toBeTruthy();
    expect(screen.queryByText("Overview body")).toBeNull();
  });

  it("links tabs and panels with ids, aria-controls, and aria-labelledby", () => {
    render(<TabbedPanel tabs={tabs} defaultTab="overview" ariaLabel="Sections" />);

    const activeTab = screen.getByRole("tab", { name: "Overview" });
    const inactiveTab = screen.getByRole("tab", { name: "Details" });
    const panel = screen.getByRole("tabpanel");

    const tabId = activeTab.getAttribute("id");
    const panelId = panel.getAttribute("id");
    const controlsId = activeTab.getAttribute("aria-controls");

    expect(tabId).toBeTruthy();
    expect(panelId).toBeTruthy();
    expect(controlsId).toBe(panelId);
    expect(panel.getAttribute("aria-labelledby")).toBe(tabId);
    expect(inactiveTab.getAttribute("aria-controls")).toBeTruthy();
    expect(inactiveTab.getAttribute("aria-controls")).not.toBe(panelId);
  });

  it("uses roving tabIndex so only the selected tab is tabbable", () => {
    render(<TabbedPanel tabs={tabs} defaultTab="overview" ariaLabel="Sections" />);

    expect(screen.getByRole("tab", { name: "Overview" }).tabIndex).toBe(0);
    expect(screen.getByRole("tab", { name: "Details" }).tabIndex).toBe(-1);
    expect(screen.getByRole("tab", { name: "History" }).tabIndex).toBe(-1);
  });

  it("moves selection with arrow keys and updates the panel", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<TabbedPanel tabs={tabs} defaultTab="overview" onChange={onChange} ariaLabel="Sections" />);

    const overview = screen.getByRole("tab", { name: "Overview" });
    overview.focus();
    await user.keyboard("{ArrowRight}");

    expect(onChange).toHaveBeenCalledWith("details");
    expect(screen.getByRole("tab", { name: "Details" }).getAttribute("aria-selected")).toBe("true");
    expect(screen.getByRole("tab", { name: "Details" }).tabIndex).toBe(0);
    expect(screen.getByText("Details body")).toBeTruthy();
    expect(document.activeElement).toBe(screen.getByRole("tab", { name: "Details" }));
  });

  it("supports Home and End for first and last enabled tabs", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<TabbedPanel tabs={tabs} defaultTab="details" onChange={onChange} ariaLabel="Sections" />);

    screen.getByRole("tab", { name: "Details" }).focus();
    await user.keyboard("{End}");
    expect(onChange).toHaveBeenLastCalledWith("history");
    expect(screen.getByText("History body")).toBeTruthy();

    await user.keyboard("{Home}");
    expect(onChange).toHaveBeenLastCalledWith("overview");
    expect(screen.getByText("Overview body")).toBeTruthy();
  });

  it("skips disabled tabs when arrowing", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const mixedTabs = [
      { id: "a", label: "A", content: "A body" },
      { id: "b", label: "B", content: "B body", disabled: true },
      { id: "c", label: "C", content: "C body" },
    ];

    render(<TabbedPanel tabs={mixedTabs} defaultTab="a" onChange={onChange} ariaLabel="Mixed" />);

    screen.getByRole("tab", { name: "A" }).focus();
    await user.keyboard("{ArrowRight}");

    expect(onChange).toHaveBeenCalledWith("c");
    expect(screen.getByText("C body")).toBeTruthy();
  });
});
