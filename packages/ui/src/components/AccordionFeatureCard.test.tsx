import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import { AccordionFeatureCard } from "./AccordionFeatureCard";

const PLACEHOLDER_IMAGE =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

afterEach(() => {
  cleanup();
});

describe("AccordionFeatureCard", () => {
  it("always sets aria-controls to a stable panel id", () => {
    render(
      <AccordionFeatureCard
        title="Signal mesh"
        description="Details for assistive tech"
        imageSrc={PLACEHOLDER_IMAGE}
        expanded={false}
      />,
    );

    const toggle = screen.getByRole("button", { name: "Toggle card details" });
    const panelId = toggle.getAttribute("aria-controls");
    expect(panelId).toBeTruthy();

    const panel = document.getElementById(panelId!);
    expect(panel).toBeTruthy();
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
  });

  it("uses user id as panel id prefix when provided", () => {
    render(
      <AccordionFeatureCard
        id="feature-a"
        title="Signal mesh"
        imageSrc={PLACEHOLDER_IMAGE}
        expanded={false}
      />,
    );

    const toggle = screen.getByRole("button", { name: "Toggle card details" });
    expect(toggle.getAttribute("aria-controls")).toBe("feature-a-panel");
    expect(document.getElementById("feature-a-panel")).toBeTruthy();
  });

  it("marks the panel hidden when collapsed so content is out of the a11y tree", () => {
    render(
      <AccordionFeatureCard
        title="Signal mesh"
        description="Collapsed description should not be exposed"
        imageSrc={PLACEHOLDER_IMAGE}
        expanded={false}
      >
        <p>Collapsed body</p>
      </AccordionFeatureCard>,
    );

    const toggle = screen.getByRole("button", { name: "Toggle card details" });
    const panel = document.getElementById(toggle.getAttribute("aria-controls")!);
    expect(panel?.hidden).toBe(true);
    expect(panel?.hasAttribute("hidden")).toBe(true);

    // hidden regions are excluded from the accessibility tree
    expect(
      screen.queryByRole("heading", { name: "Signal mesh", level: 3 }),
    ).toBeNull();
  });

  it("reveals the panel when expanded", async () => {
    const user = userEvent.setup();
    render(
      <AccordionFeatureCard
        title="Signal mesh"
        description="Open description"
        imageSrc={PLACEHOLDER_IMAGE}
        defaultExpanded={false}
      />,
    );

    const toggle = screen.getByRole("button", { name: "Toggle card details" });
    await user.click(toggle);

    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    const panel = document.getElementById(toggle.getAttribute("aria-controls")!);
    expect(panel?.hidden).toBe(false);
    expect(
      screen.getByRole("heading", { name: "Signal mesh", level: 3 }),
    ).toBeTruthy();
  });

  it("keeps the toggle accessible while collapsed", () => {
    render(
      <AccordionFeatureCard
        title="Signal mesh"
        imageSrc={PLACEHOLDER_IMAGE}
        expanded={false}
      />,
    );

    const toggle = screen.getByRole("button", { name: "Toggle card details" });
    expect(toggle).toBeTruthy();
    expect(toggle.hasAttribute("hidden")).toBe(false);
  });
});
