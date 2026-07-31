import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import { PixelTooltip } from "./PixelTooltip";

afterEach(() => {
  cleanup();
});

describe("PixelTooltip focus + a11y", () => {
  it("shows on focus with role=tooltip and aria-describedby", async () => {
    const user = userEvent.setup();
    render(
      <PixelTooltip content="Save configuration" delay={0}>
        <button type="button">Save</button>
      </PixelTooltip>,
    );

    const trigger = screen.getByRole("button", { name: "Save" });
    expect(screen.queryByRole("tooltip")).toBeNull();
    expect(trigger.parentElement?.getAttribute("aria-describedby")).toBeNull();

    await user.tab();
    expect(trigger).toHaveFocus();

    const tooltip = await screen.findByRole("tooltip");
    expect(tooltip).toHaveTextContent("Save configuration");
    expect(tooltip.id).toBeTruthy();

    await waitFor(() => {
      expect(trigger.parentElement?.getAttribute("aria-describedby")).toBe(
        tooltip.id,
      );
    });
  });

  it("hides on blur and clears aria-describedby", async () => {
    const user = userEvent.setup();
    render(
      <>
        <PixelTooltip content="Hint" delay={0}>
          <button type="button">Target</button>
        </PixelTooltip>
        <button type="button">Away</button>
      </>,
    );

    const target = screen.getByRole("button", { name: "Target" });
    await user.tab();
    expect(target).toHaveFocus();

    expect(await screen.findByRole("tooltip")).toBeTruthy();

    await user.tab();
    expect(screen.getByRole("button", { name: "Away" })).toHaveFocus();

    await waitFor(() => {
      expect(screen.queryByRole("tooltip")).toBeNull();
    });
    expect(target.parentElement?.getAttribute("aria-describedby")).toBeNull();
  });

  it("keeps tooltip open when focused after mouse leave", async () => {
    const user = userEvent.setup();
    render(
      <PixelTooltip content="Still here" delay={0}>
        <button type="button">Mixed</button>
      </PixelTooltip>,
    );

    const trigger = screen.getByRole("button", { name: "Mixed" });
    const wrapper = trigger.parentElement!;

    await user.hover(wrapper);
    const tooltip = await screen.findByRole("tooltip");

    trigger.focus();
    await user.unhover(wrapper);

    expect(screen.getByRole("tooltip")).toBeTruthy();
    expect(wrapper.getAttribute("aria-describedby")).toBe(tooltip.id);
  });
});
