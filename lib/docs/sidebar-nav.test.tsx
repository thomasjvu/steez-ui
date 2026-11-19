import React from "react";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, expect, it } from "vitest";
import { ComponentNav } from "../../src/sidebar-nav";

afterEach(cleanup);

const nav = (path: string, query = "") =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <ComponentNav query={query} />
    </MemoryRouter>,
  );
const category = (name: string) => screen.getByRole("button", { name });
const links = () =>
  within(screen.getByRole("navigation", { name: "Component library" }))
    .queryAllByRole("link")
    .map((link) => link.textContent);

it("opens only the current page's category and toggles others on demand", () => {
  nav("/components/button");
  expect(category("Actions")).toHaveAttribute("aria-expanded", "true");
  expect(category("Forms")).toHaveAttribute("aria-expanded", "false");
  expect(links()).toContain("Button");
  expect(links()).not.toContain("Input");
  fireEvent.click(category("Forms"));
  expect(category("Forms")).toHaveAttribute("aria-expanded", "true");
  expect(links()).toContain("Input");
  fireEvent.click(category("Actions"));
  expect(category("Actions")).toHaveAttribute("aria-expanded", "false");
  expect(links()).not.toContain("Button");
});

it("opens every category off a component page and while searching", () => {
  nav("/docs");
  for (const button of screen.getAllByRole("button"))
    expect(button).toHaveAttribute("aria-expanded", "true");
  cleanup();
  nav("/components/button", "input");
  expect(category("Forms")).toHaveAttribute("aria-expanded", "true");
  expect(links()).toEqual(["Input"]);
});
