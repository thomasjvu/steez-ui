import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

afterEach(cleanup);

describe("Button", () => {
  it("defaults to a non-submit button and forwards native click behavior", () => {
    const click = vi.fn();
    render(<Button shape="crystal" onClick={click}>New thread</Button>);
    const button = screen.getByRole("button", { name: "New thread" });
    expect(button).toHaveAttribute("type", "button");
    fireEvent.click(button);
    expect(click).toHaveBeenCalledTimes(1);
  });



  it("renders links with their native attributes, and disables navigation and callbacks", () => {
    const click = vi.fn();
    const { rerender } = render(<Button shape="crystal" href="/app" target="_blank" rel="noreferrer">Open app</Button>);
    expect(screen.getByRole("link", { name: "Open app" })).toHaveAttribute("href", "/app");
    expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
    rerender(<Button shape="crystal" href="/app" disabled onClick={click}>Open app</Button>);
    const link = screen.getByRole("link", { name: "Open app" });
    expect(link).not.toHaveAttribute("href");
    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(link).toHaveAttribute("tabindex", "-1");
    fireEvent.click(link);
    expect(click).not.toHaveBeenCalled();
  });

  it("retains native disabled and explicit submit behavior", () => {
    const click = vi.fn();
    render(<Button shape="crystal" type="submit" disabled onClick={click}>Submit</Button>);
    const button = screen.getByRole("button", { name: "Submit" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("type", "submit");
    fireEvent.click(button);
    expect(click).not.toHaveBeenCalled();
  });
});
