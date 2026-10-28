import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { CodeBlock } from "../../src/code-block";

afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); });

it("shows success on the button, locks copying for one second, then restores it", async () => {
  vi.useFakeTimers();
  const writeText = vi.fn().mockResolvedValue(undefined);
  vi.stubGlobal("navigator", { clipboard: { writeText } });
  const { rerender } = render(<CodeBlock>first example</CodeBlock>);
  const button = screen.getByRole("button", { name: "Copy code" });
  await act(async () => { fireEvent.click(button); });
  expect(writeText).toHaveBeenCalledWith("first example");
  expect(button).toHaveTextContent("Copied!");
  expect(button).toBeDisabled();
  fireEvent.click(button);
  expect(writeText).toHaveBeenCalledTimes(1);
  act(() => vi.advanceTimersByTime(999));
  expect(button).toBeDisabled();
  act(() => vi.advanceTimersByTime(1));
  expect(button).toBeEnabled();
  expect(button).toHaveTextContent("Copy");
  rerender(<CodeBlock>updated example</CodeBlock>);
  await act(async () => { fireEvent.click(button); });
  expect(writeText).toHaveBeenLastCalledWith("updated example");
});

it("blocks pending writes and allows retry after a failure", async () => {
  let reject: (error: Error) => void = () => {};
  const writeText = vi.fn().mockImplementation(() => new Promise((_, fail) => { reject = fail; }));
  vi.stubGlobal("navigator", { clipboard: { writeText } });
  render(<CodeBlock>example</CodeBlock>);
  const button = screen.getByRole("button", { name: "Copy code" });
  fireEvent.click(button);
  fireEvent.click(button);
  expect(writeText).toHaveBeenCalledTimes(1);
  expect(button).toBeDisabled();
  await act(async () => { reject(new Error("denied")); });
  expect(button).toBeEnabled();
  expect(button).toHaveTextContent("Copy");
  expect(screen.getByRole("alert")).toHaveTextContent("Copy failed");
});
