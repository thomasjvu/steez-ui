import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { QuickInfoCard } from "./QuickInfoCard";
afterEach(cleanup);
it.each([
  { used: -1, limit: 100, expected: 0 },
  { used: 200, limit: 100, expected: 100 },
  { used: NaN, limit: 0, expected: 0 },
  { used: 1, limit: Infinity, expected: 0 },
])("normalizes storage progress %o", ({ used, limit, expected }) => {
  const { container } = render(
    <QuickInfoCard items={[]} storageProgress={{ used, limit }} />,
  );
  expect(
    screen.getByRole("progressbar", { name: "Storage used" }),
  ).toHaveAttribute("aria-valuenow", String(expected));
  expect(container.textContent).not.toMatch(/NaN|undefined|Infinity/);
});
it("formats large storage values without exceeding the supported units", () => {
  render(
    <QuickInfoCard
      items={[]}
      storageProgress={{ used: 1024 ** 5, limit: 1024 ** 6 }}
    />,
  );
  expect(screen.getByText(/Storage/).parentElement).not.toHaveTextContent(
    "undefined",
  );
});
