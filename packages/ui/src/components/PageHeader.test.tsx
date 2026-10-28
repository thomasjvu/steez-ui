import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, it, vi } from "vitest";
import { PageHeader } from "./PageHeader";
afterEach(cleanup);
it("keeps a static brand out of keyboard navigation and forwards root attributes", () => {
  render(<PageHeader title="Library" brand={<svg><title>Logo</title></svg>} data-testid="header" />);
  expect(screen.queryByRole("button")).toBeNull();
  expect(screen.getByTestId("header")).toHaveTextContent("Library");
});
it("names interactive brands and exposes the viewer toggle state", async () => {
  const user = userEvent.setup();
  const click = vi.fn();
  render(<PageHeader title="Library" brand={<svg />} onBrandClick={click} onViewerToggle={vi.fn()} viewerVisible />);
  await user.click(screen.getByRole("button", { name: "Library" }));
  expect(click).toHaveBeenCalledTimes(1);
  expect(screen.getByRole("button", { name: "Hide viewer" })).toHaveAttribute("aria-pressed", "true");
});
