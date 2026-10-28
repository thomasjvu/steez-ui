import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CopyButton } from "./CopyButton";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
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

it("blocks overlapping clipboard writes", async () => {
  const user = userEvent.setup();
  let finish!: () => void;
  const writeText = vi.fn(() => new Promise<void>(resolve => { finish = resolve; }));
  vi.stubGlobal("navigator", { ...navigator, clipboard: { writeText } });
  render(<CopyButton value="Text" data-testid="copy" aria-describedby="help" />);
  const button = screen.getByTestId("copy");
  await user.click(button);
  expect(button).toBeDisabled();
  expect(button).toHaveAttribute("aria-busy", "true");
  await user.click(button);
  expect(writeText).toHaveBeenCalledTimes(1);
  finish();
  await waitFor(() => expect(button).not.toBeDisabled());
});

it("allows consumer cancellation and native disabled behavior", async () => {
  const user = userEvent.setup();
  const writeText = vi.fn();
  vi.stubGlobal("navigator", { ...navigator, clipboard: { writeText } });
  const { rerender } = render(<CopyButton value="Text" onClick={event => event.preventDefault()} />);
  await user.click(screen.getByRole("button"));
  expect(writeText).not.toHaveBeenCalled();
  rerender(<CopyButton value="Text" disabled />);
  await user.click(screen.getByRole("button"));
  expect(writeText).not.toHaveBeenCalled();
});

it("restarts the feedback window after a second successful copy", async () => {
  vi.useFakeTimers();
  vi.stubGlobal("navigator", { ...navigator, clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } });
  render(<CopyButton value="Text" feedbackDuration={2000} />);
  await act(async () => { fireEvent.click(screen.getByRole("button")); });
  act(() => { vi.advanceTimersByTime(1500); });
  await act(async () => { fireEvent.click(screen.getByRole("button")); });
  act(() => { vi.advanceTimersByTime(1000); });
  expect(screen.getByRole("button", { name: "Copied to clipboard" })).toBeTruthy();
  act(() => { vi.advanceTimersByTime(1000); });
  expect(screen.getByRole("button", { name: "Copy to clipboard" })).toBeTruthy();
});
