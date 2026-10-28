import React from "react";
import { MemoryRouter } from "react-router";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { ComponentDetail } from "../../components/docs/component-detail";

vi.mock("../../components/docs/component-preview", () => ({
  ComponentPreview: () => null,
}));
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
const detail = (slug: string) => (
  <MemoryRouter>
    <ComponentDetail slug={slug} />
  </MemoryRouter>
);

it("loads source only on demand, reports a failed download, and supports retry", async () => {
  const fetchMock = vi
    .fn()
    .mockResolvedValueOnce({ ok: false, status: 404 })
    .mockResolvedValueOnce({ ok: true, text: async () => "button source" });
  vi.stubGlobal("fetch", fetchMock);
  render(detail("button"));
  expect(fetchMock).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole("tab", { name: "Install" }));
  expect(screen.getByText("components/steez/Button.tsx")).toBeInTheDocument();
  expect(fetchMock).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole("tab", { name: "Source" }));
  expect(await screen.findByRole("status")).toHaveTextContent(
    "Could not load source",
  );
  fireEvent.click(screen.getByRole("button", { name: "Retry" }));
  expect(
    await screen.findByRole("button", { name: "Copy standalone component" }),
  ).toBeInTheDocument();
  expect(fetchMock).toHaveBeenCalledWith(
    "/copy/steez/button.tsx",
    expect.objectContaining({ signal: expect.any(AbortSignal) }),
  );
});

it("cancels the old download and hides its copy control when the slug changes", async () => {
  const fetchMock = vi
    .fn()
    .mockResolvedValueOnce({ ok: true, text: async () => "button source" })
    .mockImplementationOnce(() => new Promise(() => {}));
  vi.stubGlobal("fetch", fetchMock);
  const { rerender } = render(detail("button"));
  fireEvent.click(screen.getByRole("tab", { name: "Source" }));
  await screen.findByRole("button", { name: "Copy standalone component" });
  const signal = fetchMock.mock.calls[0][1].signal as AbortSignal;
  rerender(detail("input"));
  expect(signal.aborted).toBe(true);
  expect(
    screen.queryByRole("button", { name: "Copy standalone component" }),
  ).not.toBeInTheDocument();
  expect(screen.getByRole("status")).toHaveTextContent("Loading…");
  await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
});

it("supports keyboard tab navigation and shows an unknown component explicitly", () => {
  const { rerender } = render(detail("button"));
  fireEvent.keyDown(screen.getByRole("tab", { name: "Usage" }), {
    key: "ArrowRight",
  });
  expect(screen.getByRole("tab", { name: "Install" })).toHaveFocus();
  expect(screen.getByRole("tabpanel")).toHaveAccessibleName("Install");
  rerender(detail("unknown"));
  expect(
    screen.getByRole("heading", { name: "Component not found" }),
  ).toBeInTheDocument();
});

it("updates the copyable example with the chosen shape and corners, and resets it", () => {
  render(detail("button"));
  fireEvent.change(screen.getByLabelText("Shape"), { target: { value: "cut" } });
  expect(screen.getByRole("tabpanel")).toHaveTextContent('shape="cut"');
  fireEvent.click(screen.getByLabelText("top left"));
  expect(screen.getByRole("tabpanel")).toHaveTextContent('"top-left"');
  fireEvent.change(screen.getByLabelText("Shape"), { target: { value: "crystal" } });
  expect(screen.getByRole("tabpanel")).not.toHaveTextContent("cutCorners");
  expect(screen.queryByRole("group", { name: "Cut corners" })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Reset preview" }));
  expect(screen.getByLabelText("Shape")).toHaveValue("default");
});

it("updates the HP bar example and progress without leaving the preview", () => {
  render(detail("loading-progress-bar"));
  fireEvent.change(screen.getByLabelText("Style"), { target: { value: "hp" } });
  fireEvent.change(screen.getByRole("slider"), { target: { value: "40" } });
  expect(screen.getByRole("tabpanel")).toHaveTextContent('variant="hp"');
  expect(screen.getByRole("tabpanel")).toHaveTextContent('progress={40}');
});
