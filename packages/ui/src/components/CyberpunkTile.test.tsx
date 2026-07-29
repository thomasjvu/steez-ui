import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CyberpunkTile } from "./CyberpunkTile";

afterEach(() => {
  cleanup();
});

describe("CyberpunkTile", () => {
  it("activates onClick via Enter when interactive", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<CyberpunkTile onClick={onClick}>Launch</CyberpunkTile>);

    const tile = screen.getByRole("button", { name: "Launch" });
    tile.focus();
    await user.keyboard("{Enter}");

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("activates onClick via Space when interactive", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<CyberpunkTile onClick={onClick}>Launch</CyberpunkTile>);

    const tile = screen.getByRole("button", { name: "Launch" });
    tile.focus();
    await user.keyboard(" ");

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("composes user onKeyDown before activation", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const onKeyDown = vi.fn();
    render(
      <CyberpunkTile onClick={onClick} onKeyDown={onKeyDown}>
        Launch
      </CyberpunkTile>,
    );

    const tile = screen.getByRole("button", { name: "Launch" });
    tile.focus();
    await user.keyboard("{Enter}");

    expect(onKeyDown).toHaveBeenCalled();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("skips activation when user onKeyDown prevents default", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <CyberpunkTile
        onClick={onClick}
        onKeyDown={(e) => e.preventDefault()}
      >
        Launch
      </CyberpunkTile>,
    );

    const tile = screen.getByRole("button", { name: "Launch" });
    tile.focus();
    await user.keyboard("{Enter}");

    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not set button role without onClick", () => {
    render(<CyberpunkTile>Static</CyberpunkTile>);
    expect(screen.queryByRole("button")).toBeNull();
  });
});
