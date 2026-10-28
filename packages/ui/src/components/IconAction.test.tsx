import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { Button, type ButtonProps } from "./Button";
import { OverlayButton } from "./OverlayButton";

afterEach(cleanup);

// @ts-expect-error Explicit icon-only actions require an accessible name.
const unnamed: ButtonProps = { iconOnly: true, children: "x" };
void unnamed;

it.each([Button, OverlayButton])("names icon-only actions independently of decorative content", (Action) => {
  render(<Action iconOnly aria-label="Refresh"><svg><title>Decoration</title></svg></Action>);
  const button = screen.getByRole("button", { name: "Refresh" });
  expect(button.querySelector("svg")?.closest('[aria-hidden="true"]')).toBeTruthy();
  expect(button).not.toHaveAttribute("iconOnly");
});

it("allows naming by an external visible label", () => {
  render(<><span id="refresh-label">Refresh data</span><Button iconOnly aria-labelledby="refresh-label">↻</Button></>);
  expect(screen.getByRole("button", { name: "Refresh data" })).toBeTruthy();
});
