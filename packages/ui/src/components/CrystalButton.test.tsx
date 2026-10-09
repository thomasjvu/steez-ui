import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CrystalButton } from "./CrystalButton";

afterEach(cleanup);

describe("CrystalButton", () => {
  it("defaults to a non-submit button and forwards native click behavior", () => {
    const click = vi.fn();
    render(<CrystalButton onClick={click}>New thread</CrystalButton>);
    const button = screen.getByRole("button", { name: "New thread" });
    expect(button).toHaveAttribute("type", "button");
    fireEvent.click(button);
    expect(click).toHaveBeenCalledTimes(1);
  });

  it("keeps icon-only vertical controls named and the shape decorative", () => {
    render(<CrystalButton orientation="vertical" aria-label="New thread"><svg aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg></CrystalButton>);
    const button = screen.getByRole("button", { name: "New thread" });
    expect(button.querySelector('.shape')).toHaveAttribute("aria-hidden", "true");
    expect(button).toHaveClass("vertical");
  });

  it("renders links with their native attributes, and disables navigation and callbacks", () => {
    const click = vi.fn();
    const { rerender } = render(<CrystalButton href="/app" target="_blank" rel="noreferrer" tone="loud">Open app</CrystalButton>);
    expect(screen.getByRole("link", { name: "Open app" })).toHaveAttribute("href", "/app");
    expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
    rerender(<CrystalButton href="/app" disabled onClick={click}>Open app</CrystalButton>);
    const link = screen.getByRole("link", { name: "Open app" });
    expect(link).not.toHaveAttribute("href");
    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(link).toHaveAttribute("tabindex", "-1");
    fireEvent.click(link);
    expect(click).not.toHaveBeenCalled();
  });

  it("retains native disabled and explicit submit behavior", () => {
    const click = vi.fn();
    render(<CrystalButton type="submit" disabled onClick={click}>Submit</CrystalButton>);
    const button = screen.getByRole("button", { name: "Submit" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("type", "submit");
    fireEvent.click(button);
    expect(click).not.toHaveBeenCalled();
  });
});
