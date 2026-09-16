import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { PageTemplate } from "./PageTemplate";

const subTabs = [
  { id: "overview", label: "Overview" },
  { id: "details", label: "Details" },
  { id: "history", label: "History" },
];

afterEach(() => {
  cleanup();
});

describe("PageTemplate sub-tabs", () => {
  it("selects a sub-tab by click and calls onSubTabChange", async () => {
    const user = userEvent.setup();
    const onSubTabChange = vi.fn();

    render(
      <PageTemplate
        title="Inventory"
        subTabs={subTabs}
        activeSubTab="overview"
        onSubTabChange={onSubTabChange}
      >
        Panel body
      </PageTemplate>,
    );

    await user.click(screen.getByRole("tab", { name: "Details" }));

    expect(onSubTabChange).toHaveBeenCalledWith("details");
  });

  it("links tabs and content region with ids, aria-controls, and aria-labelledby", () => {
    render(
      <PageTemplate title="Inventory" subTabs={subTabs} activeSubTab="overview">
        Panel body
      </PageTemplate>,
    );

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

  it("uses roving tabIndex so only the selected sub-tab is tabbable", () => {
    render(
      <PageTemplate title="Inventory" subTabs={subTabs} activeSubTab="overview">
        Panel body
      </PageTemplate>,
    );

    expect(screen.getByRole("tab", { name: "Overview" }).tabIndex).toBe(0);
    expect(screen.getByRole("tab", { name: "Details" }).tabIndex).toBe(-1);
    expect(screen.getByRole("tab", { name: "History" }).tabIndex).toBe(-1);
  });

  it("moves selection with arrow keys via onSubTabChange", async () => {
    const user = userEvent.setup();
    const onSubTabChange = vi.fn();

    const { rerender } = render(
      <PageTemplate
        title="Inventory"
        subTabs={subTabs}
        activeSubTab="overview"
        onSubTabChange={onSubTabChange}
      >
        Panel body
      </PageTemplate>,
    );

    const overview = screen.getByRole("tab", { name: "Overview" });
    overview.focus();
    await user.keyboard("{ArrowRight}");

    expect(onSubTabChange).toHaveBeenCalledWith("details");

    // Controlled: parent updates activeSubTab
    rerender(
      <PageTemplate
        title="Inventory"
        subTabs={subTabs}
        activeSubTab="details"
        onSubTabChange={onSubTabChange}
      >
        Panel body
      </PageTemplate>,
    );

    expect(screen.getByRole("tab", { name: "Details" }).getAttribute("aria-selected")).toBe("true");
    expect(screen.getByRole("tab", { name: "Details" }).tabIndex).toBe(0);
    expect(document.activeElement).toBe(screen.getByRole("tab", { name: "Details" }));
  });

  it("supports Home and End for first and last sub-tabs", async () => {
    const user = userEvent.setup();
    const onSubTabChange = vi.fn();

    render(
      <PageTemplate
        title="Inventory"
        subTabs={subTabs}
        activeSubTab="details"
        onSubTabChange={onSubTabChange}
      >
        Panel body
      </PageTemplate>,
    );

    screen.getByRole("tab", { name: "Details" }).focus();
    await user.keyboard("{End}");
    expect(onSubTabChange).toHaveBeenLastCalledWith("history");

    await user.keyboard("{Home}");
    expect(onSubTabChange).toHaveBeenLastCalledWith("overview");
  });

  it("skips disabled sub-tabs when arrowing", async () => {
    const user = userEvent.setup();
    const onSubTabChange = vi.fn();
    const mixedSubTabs = [
      { id: "overview", label: "Overview" },
      { id: "details", label: "Details", disabled: true },
      { id: "history", label: "History" },
    ];

    render(
      <PageTemplate
        title="Inventory"
        subTabs={mixedSubTabs}
        activeSubTab="overview"
        onSubTabChange={onSubTabChange}
      >
        Panel body
      </PageTemplate>,
    );

    const disabledTab = screen.getByRole("tab", { name: "Details" });
    expect(disabledTab.hasAttribute("disabled")).toBe(true);

    screen.getByRole("tab", { name: "Overview" }).focus();
    await user.keyboard("{ArrowRight}");

    expect(onSubTabChange).toHaveBeenCalledWith("history");
  });

  it("does not expose tabpanel when there are no sub-tabs", () => {
    render(
      <PageTemplate title="Inventory">
        Body only
      </PageTemplate>,
    );

    expect(screen.queryByRole("tablist")).toBeNull();
    expect(screen.queryByRole("tabpanel")).toBeNull();
    expect(screen.getByText("Body only")).toBeTruthy();
  });
});
