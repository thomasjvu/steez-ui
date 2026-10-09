import React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { ComponentDetail } from "../../components/docs/component-detail";

vi.mock("../../components/docs/component-preview", () => ({
  ComponentPreview: () => null,
}));

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

it("reports a failed standalone download and shows install files without fetching metadata", async () => {
  const fetchMock = vi.fn().mockResolvedValue({ ok: false, status: 404 });
  vi.stubGlobal("fetch", fetchMock);
  render(<ComponentDetail slug="button" />);

  expect(screen.getByText("components/steez/Button.tsx")).toBeInTheDocument();
  expect(await screen.findByRole("status")).toHaveTextContent("Could not load source");
  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect(fetchMock).toHaveBeenCalledWith("/copy/steez/button.tsx", expect.objectContaining({ signal: expect.any(AbortSignal) }));
});

it("cancels the old download and hides its copy control when the slug changes", async () => {
  const fetchMock = vi.fn()
    .mockResolvedValueOnce({ ok: true, text: async () => "button source" })
    .mockImplementationOnce(() => new Promise(() => {}));
  vi.stubGlobal("fetch", fetchMock);
  const { rerender } = render(<ComponentDetail slug="button" />);
  await screen.findByTitle("Copy standalone component");
  const signal = fetchMock.mock.calls[0][1].signal as AbortSignal;

  rerender(<ComponentDetail slug="cyberpunk-input" />);

  expect(signal.aborted).toBe(true);
  expect(screen.queryByTitle("Copy standalone component")).not.toBeInTheDocument();
  expect(screen.getByRole("status")).toHaveTextContent("Loading…");
  await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
});
