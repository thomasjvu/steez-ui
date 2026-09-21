import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { CornerBracketCard } from "./CornerBracketCard";
import { DottedHaloCard } from "./DottedHaloCard";
import { ThemedCard } from "./ThemedCard";

afterEach(() => {
  cleanup();
});

describe("card frames", () => {
  it("keeps the themed card title, body, classes, and attributes together", () => {
    render(
      <ThemedCard
        title="Deployment"
        variant="featured"
        className="custom-card"
        data-testid="themed-card"
      >
        Body copy
      </ThemedCard>,
    );

    const card = screen.getByTestId("themed-card");
    expect(card).toHaveClass("card", "featured", "custom-card");
    expect(card).toHaveTextContent("Deployment");
    expect(card).toHaveTextContent("Body copy");
    expect(card.querySelector(".title")).toHaveTextContent("Deployment");
    expect(card.querySelector(".body")).toHaveTextContent("Body copy");
  });

  it("renders the corner bracket decoration through the shared frame", () => {
    render(
      <CornerBracketCard title="Foundation" className="custom-card">
        Body copy
      </CornerBracketCard>,
    );

    const corners = document.querySelectorAll(".corner");
    expect(corners).toHaveLength(4);
    expect(Array.from(corners).every((corner) => corner.getAttribute("aria-hidden") === "true")).toBe(
      true,
    );
    expect(screen.getByText("Foundation")).toBeTruthy();
    expect(screen.getByText("Body copy")).toBeTruthy();
    expect(document.querySelector(".card")).toHaveClass("custom-card");
  });

  it("preserves the dotted card title and body class hooks", () => {
    render(
      <DottedHaloCard
        title="Signal"
        className="custom-card"
        bodyClassName="custom-body"
        data-testid="dotted-card"
      >
        Body copy
      </DottedHaloCard>,
    );

    const card = screen.getByTestId("dotted-card");
    expect(card).toHaveClass("root", "custom-card");
    expect(card.querySelector("h3")).toHaveTextContent("Signal");
    expect(card.querySelector(".body")).toHaveClass("custom-body");
    expect(card.querySelector(".body")).toHaveTextContent("Body copy");
  });
});
