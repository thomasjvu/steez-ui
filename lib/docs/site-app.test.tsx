import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { App } from "../../src/App";

vi.mock("../../components/docs/component-preview", () => ({
  ComponentPreview: () => <p>Interactive demo</p>,
}));
let matches = true;
let mediaChange: () => void;
beforeEach(() => {
  matches = true;
  localStorage.clear();
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({
      get matches() {
        return matches;
      },
      addEventListener: (_name: string, handler: () => void) => {
        mediaChange = handler;
      },
      removeEventListener: vi.fn(),
    })),
  );
  vi.stubGlobal("scrollTo", vi.fn());
  document.head.innerHTML =
    '<meta name="description" content=""><link rel="canonical" href="">';
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

it("navigates existing routes, updates metadata, and focuses the new page", () => {
  render(
    <MemoryRouter initialEntries={["/components"]}>
      <App />
    </MemoryRouter>,
  );
  const navigation = screen.getByRole("navigation", {
    name: "Component library",
  });
  fireEvent.click(
    within(navigation).getByRole("link", { name: "Button" }),
  );
  expect(
    screen.getByRole("heading", { level: 1, name: "Button" }),
  ).toBeInTheDocument();
  expect(document.title).toBe("Button — Steez UI");
  expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://steez-ui-6v5.pages.dev/components/button",
  );
  expect(screen.getByRole("main")).toHaveFocus();
  fireEvent.click(
    within(screen.getByRole("navigation", { name: "Documentation" })).getByRole(
      "link",
      { name: "Getting started" },
    ),
  );
  expect(
    screen.getByRole("heading", { level: 1, name: "Getting started" }),
  ).toBeInTheDocument();
});

it("follows system appearance until overridden and supports returning to system", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(document.documentElement.dataset.theme).toBe("dark");
  matches = false;
  fireEvent.change(screen.getByRole("combobox", { name: "Appearance" }), {
    target: { value: "light" },
  });
  expect(document.documentElement.dataset.theme).toBe("light");
  expect(localStorage.getItem("steez-site-theme")).toBe("light");
  matches = true;
  mediaChange();
  expect(document.documentElement.dataset.theme).toBe("light");
  fireEvent.change(screen.getByRole("combobox", { name: "Appearance" }), {
    target: { value: "system" },
  });
  expect(document.documentElement.dataset.theme).toBe("dark");
});

it("shows unknown URLs explicitly and filters sidebar navigation", () => {
  render(
    <MemoryRouter initialEntries={["/missing"]}>
      <App />
    </MemoryRouter>,
  );
  expect(
    screen.getByRole("heading", { name: "Page not found" }),
  ).toBeInTheDocument();
  fireEvent.change(
    screen.getByRole("searchbox", { name: "Find a component" }),
    { target: { value: "quartz" } },
  );
  const links = within(
    screen.getByRole("navigation", { name: "Component library" }),
  ).getAllByRole("link");
  expect(links).toHaveLength(1);
  expect(links[0]).toHaveTextContent("Quartz Crystal");
});
