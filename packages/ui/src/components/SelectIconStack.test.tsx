import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { Select } from "./Select";
const options = [
  {
    value: "alpha",
    label: "Alpha",
    icons: [
      { id: "one", label: "Provider one", icon: <span>1</span> },
      { id: "two", label: "Provider two", icon: <span>2</span> },
    ],
  },
  { value: "beta", label: "Beta", disabled: true },
  { value: "charlie", label: "Charlie" },
];
afterEach(cleanup);
it("uses native selection with decorative icons outside its accessible name", () => {
  const { container } = render(
    <Select iconStack label="Model" options={options} defaultValue="alpha" />,
  );
  expect(screen.getByRole("combobox", { name: "Model" }).tagName).toBe(
    "SELECT",
  );
  expect(container.querySelectorAll('[title^="Provider"]')).toHaveLength(2);
  expect(
    container.querySelector('[title="Provider one"]')?.parentElement,
  ).toHaveAttribute("aria-hidden", "true");
  expect(screen.getByRole("option", { name: "Beta" })).toBeDisabled();
});
it("updates icons and submits native values, including form reset", async () => {
  const { container } = render(
    <form data-testid="form">
      <Select iconStack
        name="model"
        label="Model"
        options={options}
        defaultValue="alpha"
      />
    </form>,
  );
  fireEvent.change(screen.getByRole("combobox"), {
    target: { value: "charlie" },
  });
  expect(container.querySelectorAll('[title^="Provider"]')).toHaveLength(0);
  expect(
    new FormData(screen.getByTestId("form") as HTMLFormElement).get("model"),
  ).toBe("charlie");
  const { act } = await import("@testing-library/react");
  await act(async () => {
    (screen.getByTestId("form") as HTMLFormElement).reset();
  });
  expect(screen.getByRole("combobox")).toHaveValue("alpha");
  expect(container.querySelectorAll('[title^="Provider"]')).toHaveLength(2);
});
it("supports controlled values and forwards native and value callbacks", () => {
  const change = vi.fn();
  const native = vi.fn();
  render(
    <Select iconStack
      label="Model"
      options={options}
      value="alpha"
      onValueChange={change}
      onChange={native}
      labelStyle="notch"
    />,
  );
  fireEvent.change(screen.getByRole("combobox"), {
    target: { value: "charlie" },
  });
  expect(change).toHaveBeenCalledWith("charlie");
  expect(native).toHaveBeenCalledTimes(1);
  expect(screen.getByRole("combobox")).toHaveValue("alpha");
});
