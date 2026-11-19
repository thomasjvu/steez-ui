import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { Button, type ButtonProps } from "./Button";

afterEach(cleanup);

// @ts-expect-error Explicit icon-only actions require an accessible name.
const unnamed: ButtonProps = { iconOnly: true, children: "x" };
void unnamed;

it("names icon-only actions independently of decorative content", () => {
  render(<Button iconOnly aria-label="Refresh"><svg><title>Decoration</title></svg></Button>);
  const button = screen.getByRole("button", { name: "Refresh" });
  expect(button.querySelector("svg")?.closest('[aria-hidden="true"]')).toBeTruthy();
  expect(button).not.toHaveAttribute("iconOnly");
});

it("allows naming by an external visible label", () => {
  render(<><span id="refresh-label">Refresh data</span><Button iconOnly aria-labelledby="refresh-label">↻</Button></>);
  expect(screen.getByRole("button", { name: "Refresh data" })).toBeTruthy();
});
