import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { StatusMessage } from "./StatusMessage";
afterEach(cleanup);
it("exposes an accessible message with a decorative icon", () => {
  render(<StatusMessage type="success" message="Saved" className="consumer" />);
  const status = screen.getByRole("status");
  expect(status).toHaveTextContent("Saved");
  expect(status.querySelector("span")).toHaveAttribute("aria-hidden", "true");
});
