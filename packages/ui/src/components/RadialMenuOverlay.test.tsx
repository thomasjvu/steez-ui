import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { RadialMenuOverlay, type RadialMenuItem } from "./RadialMenuOverlay";

const items: readonly RadialMenuItem[] = [
  {
    id: "studio",
    label: "Studio",
    shortLabel: "01",
    eyebrow: "Creative studio",
    body: "Launch clips and media.",
  },
  {
    id: "runtime",
    label: "Runtime",
    shortLabel: "02",
    eyebrow: "One runtime",
    body: "Workspaces that hold the system together.",
  },
];

afterEach(() => {
  cleanup();
  document.body.style.overflow = "";
});

function ControlledMenu({
  contained = false,
  initiallyOpen = true,
}: {
  contained?: boolean;
  initiallyOpen?: boolean;
}) {
  const [open, setOpen] = React.useState(initiallyOpen);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Open menu
      </button>
      <RadialMenuOverlay
        open={open}
        contained={contained}
        items={items}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

describe("RadialMenuOverlay focus trap", () => {
  it("focuses the close control when opened as a modal", async () => {
    const user = userEvent.setup();
    render(<ControlledMenu initiallyOpen={false} />);

    const opener = screen.getByRole("button", { name: "Open menu" });
    opener.focus();
    expect(document.activeElement).toBe(opener);

    await user.click(opener);

    const closeControl = screen.getByTitle("Close navigation");
    expect(document.activeElement).toBe(closeControl);
    expect(screen.getByRole("dialog").getAttribute("aria-modal")).toBe("true");
  });

  it("restores focus to the previously focused element on close", async () => {
    const user = userEvent.setup();
    render(<ControlledMenu initiallyOpen={false} />);

    const opener = screen.getByRole("button", { name: "Open menu" });
    opener.focus();
    await user.click(opener);

    expect(document.activeElement).toBe(screen.getByTitle("Close navigation"));

    await user.click(screen.getByTitle("Close navigation"));

    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(opener);
  });

  it("keeps Escape closing the modal and restores focus", async () => {
    const user = userEvent.setup();
    render(<ControlledMenu initiallyOpen={false} />);

    const opener = screen.getByRole("button", { name: "Open menu" });
    opener.focus();
    await user.click(opener);

    expect(screen.getByRole("dialog")).toBeTruthy();
    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(opener);
  });

  it("traps Tab within the dialog when open and not contained", async () => {
    const user = userEvent.setup();
    render(<ControlledMenu />);

    const dialog = screen.getByRole("dialog");
    const focusable = Array.from(
      dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((element) => element.tabIndex >= 0);

    expect(focusable.length).toBeGreaterThan(1);

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    last.focus();
    expect(document.activeElement).toBe(last);

    await user.tab();
    expect(document.activeElement).toBe(first);

    await user.tab({ shift: true });
    expect(document.activeElement).toBe(last);
  });

  it("does not steal focus when contained", async () => {
    const user = userEvent.setup();
    render(<ControlledMenu contained initiallyOpen={false} />);

    const opener = screen.getByRole("button", { name: "Open menu" });
    opener.focus();
    await user.click(opener);

    const dialog = screen.getByRole("dialog");
    expect(dialog.getAttribute("aria-modal")).toBeNull();
    // Contained previews leave focus where the user put it.
    expect(document.activeElement).toBe(opener);
    expect(document.activeElement).not.toBe(screen.getByTitle("Close navigation"));
  });

  it("still invokes onClose from Escape while contained", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <RadialMenuOverlay open contained items={items} onClose={onClose} />,
    );

    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("keeps focus in place when the onClose callback changes while open", () => {
    const openerFocus = vi.fn();
    const firstOnClose = vi.fn();
    const { rerender } = render(
      <>
        <button type="button" onFocus={openerFocus}>
          Open menu
        </button>
        <RadialMenuOverlay
          open={false}
          items={items}
          onClose={firstOnClose}
        />
      </>,
    );

    const opener = screen.getByRole("button", { name: "Open menu" });
    opener.focus();
    rerender(
      <>
        <button type="button" onFocus={openerFocus}>
          Open menu
        </button>
        <RadialMenuOverlay
          open
          items={items}
          onClose={() => undefined}
        />
      </>,
    );

    const closeControl = screen.getByTitle("Close navigation");
    closeControl.focus();
    const focusCountBeforeRerender = openerFocus.mock.calls.length;

    rerender(
      <>
        <button type="button" onFocus={openerFocus}>
          Open menu
        </button>
        <RadialMenuOverlay
          open
          items={items}
          onClose={() => undefined}
        />
      </>,
    );

    expect(openerFocus).toHaveBeenCalledTimes(focusCountBeforeRerender);
    expect(document.activeElement).toBe(closeControl);
  });
});
