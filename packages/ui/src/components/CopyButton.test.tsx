import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CopyButton } from "./CopyButton";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("CopyButton", () => {
  it("shows success feedback after a successful copy", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", {
      ...navigator,
      clipboard: { writeText },
    });

    render(<CopyButton value="pnpm add @steez-ui/ui" />);

    const button = screen.getByRole("button", { name: "Copy to clipboard" });
    await user.click(button);

    expect(writeText).toHaveBeenCalledWith("pnpm add @steez-ui/ui");
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Copied to clipboard" }),
      ).toBeTruthy();
    });
  });

  it("surfaces error feedback when clipboard write fails", async () => {
    const user = userEvent.setup();
    const error = new Error("denied");
    const onCopyError = vi.fn();
    const writeText = vi.fn().mockRejectedValue(error);
    vi.stubGlobal("navigator", {
      ...navigator,
      clipboard: { writeText },
    });

    render(
      <CopyButton value="secret-token" onCopyError={onCopyError} />,
    );

    const button = screen.getByRole("button", { name: "Copy to clipboard" });
    await user.click(button);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Failed to copy" }),
      ).toBeTruthy();
    });
    expect(onCopyError).toHaveBeenCalledWith(error);
    expect(button.className).toMatch(/error/);
  });
});
