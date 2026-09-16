import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { StatCard } from "./StatCard";

afterEach(() => {
  cleanup();
});

describe("StatCard", () => {
  it("exposes button semantics and activates from Enter and Space", () => {
    const onClick = vi.fn();
    render(<StatCard label="Projects" value={12} onClick={onClick} />);

    const card = screen.getByRole("button", { name: /Projects 12/ });
    expect(card.getAttribute("tabindex")).toBe("0");

    fireEvent.keyDown(card, { key: "Enter" });
    fireEvent.keyDown(card, { key: " " });

    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("does not make a display-only card keyboard interactive", () => {
    const { container } = render(<StatCard label="Projects" value={12} />);
    const card = container.firstElementChild;

    expect(card?.getAttribute("role")).toBeNull();
    expect(card?.getAttribute("tabindex")).toBeNull();
  });

  it("respects a consumer key handler that prevents activation", () => {
    const onClick = vi.fn();
    const onKeyDown = vi.fn((event: React.KeyboardEvent<HTMLDivElement>) => {
      event.preventDefault();
    });
    render(
      <StatCard
        label="Projects"
        value={12}
        onClick={onClick}
        onKeyDown={onKeyDown}
      />,
    );

    fireEvent.keyDown(screen.getByRole("button", { name: /Projects 12/ }), {
      key: "Enter",
    });

    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled();
  });
});
