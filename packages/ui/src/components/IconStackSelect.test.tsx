import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { IconStackSelect } from "./IconStackSelect";

const options = [
  { value: "alpha", label: "Alpha", icons: [
    { id: "one", label: "Provider one", icon: <span>1</span> },
    { id: "two", label: "Provider two", icon: <span>2</span> },
    { id: "three", label: "Provider three", icon: <span>3</span> },
  ] },
  { value: "beta", label: "Beta", disabled: true },
  { value: "charlie", label: "Charlie" },
  { value: "delta", label: "Delta" },
];
afterEach(cleanup);

function key(key: string) {
  fireEvent.keyDown(screen.getByRole("combobox"), { key });
}

describe("IconStackSelect", () => {
  it("keeps every icon visible and outside the accessible name, with no nested buttons", () => {
    render(<IconStackSelect label="Model" options={options} defaultValue="alpha" />);
    const trigger = screen.getByRole("combobox", { name: "Model" });
    expect(trigger).toHaveTextContent("Alpha");
    expect(trigger.querySelectorAll('[title^="Provider"]')).toHaveLength(3);
    expect(trigger.querySelector("button")).toBeNull();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("navigates enabled options, commits, and submits the selected value", () => {
    render(<form data-testid="form"><IconStackSelect label="Model" name="model" options={options} defaultValue="alpha" /></form>);
    key("ArrowDown");
    key("ArrowDown");
    const trigger = screen.getByRole("combobox");
    const activeId = trigger.getAttribute("aria-activedescendant")!;
    expect(document.getElementById(activeId)).toHaveTextContent("Charlie");
    key("Enter");
    expect(trigger).toHaveTextContent("Charlie");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(new FormData(screen.getByTestId("form") as HTMLFormElement).get("model")).toBe("charlie");
  });

  it("supports Home, End, Escape, typing, and Tab without trapping focus", () => {
    render(<IconStackSelect label="Model" options={options} defaultValue="alpha" />);
    key("End"); key("Escape");
    expect(screen.getByRole("combobox")).toHaveTextContent("Alpha");
    key("c"); key("Enter");
    expect(screen.getByRole("combobox")).toHaveTextContent("Charlie");
    key("Home"); key("Tab");
    expect(screen.getByRole("combobox")).toHaveTextContent("Alpha");
    key("End"); key("Enter");
    expect(screen.getByRole("combobox")).toHaveTextContent("Delta");
  });

  it("supports controlled selection and mouse input while ignoring disabled options", () => {
    const change = vi.fn();
    const { rerender } = render(<IconStackSelect label="Model" options={options} value="alpha" onValueChange={change} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByText("Beta").closest('[role="option"]')!);
    expect(change).not.toHaveBeenCalled();
    fireEvent.click(screen.getByText("Charlie").closest('[role="option"]')!);
    expect(change).toHaveBeenCalledWith("charlie");
    expect(screen.getByRole("combobox")).toHaveTextContent("Alpha");
    rerender(<IconStackSelect label="Model" options={options} value="charlie" onValueChange={change} />);
    expect(screen.getByRole("combobox")).toHaveTextContent("Charlie");
  });

  it("dismisses on outside click and blur without changing selection", () => {
    render(<IconStackSelect label="Model" options={options} defaultValue="alpha" />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.pointerDown(document.body);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.blur(screen.getByRole("combobox"));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveTextContent("Alpha");
  });

  it("handles empty lists, disabled controls, and accessible descriptions", () => {
    const { rerender } = render(<IconStackSelect aria-label="Model" options={[]} />);
    key("ArrowDown");
    expect(screen.getByText("No options available")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).not.toHaveAttribute("aria-activedescendant");
    rerender(<form data-testid="form"><p id="hint">Pick a model.</p><IconStackSelect aria-label="Model" aria-describedby="hint" name="model" disabled options={options} defaultValue="alpha" /></form>);
    expect(screen.getByRole("combobox")).toBeDisabled();
    expect(screen.getByRole("combobox")).toHaveAccessibleDescription("Pick a model.");
    expect(new FormData(screen.getByTestId("form") as HTMLFormElement).has("model")).toBe(false);
  });
});
