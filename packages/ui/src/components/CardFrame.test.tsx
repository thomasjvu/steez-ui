import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { ThemedCard } from "./ThemedCard";

afterEach(cleanup);

it("preserves numeric card titles instead of hiding zero", () => {
  render(<ThemedCard title={0}>Body</ThemedCard>);
  expect(screen.getByText("0")).toHaveClass("title");
});
