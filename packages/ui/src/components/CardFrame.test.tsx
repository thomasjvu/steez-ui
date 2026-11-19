import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { Card } from "./Card";

afterEach(cleanup);

it("preserves numeric card titles instead of hiding zero", () => {
  render(<Card title={0}>Body</Card>);
  expect(screen.getByText("0")).toHaveClass("title");
});
