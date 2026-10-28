import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, it, vi } from "vitest";
import { Checkbox } from "./Checkbox";
import { Radio, RadioGroup } from "./Radio";

afterEach(cleanup);
it("reports boolean and native checkbox events with native change semantics", async () => {
  const user = userEvent.setup();
  const change = vi.fn();
  const native = vi.fn();
  render(<Checkbox label="Enabled" onChange={native} onCheckedChange={change} />);
  await user.click(screen.getByRole("checkbox"));
  expect(change).toHaveBeenCalledExactlyOnceWith(true);
  expect(native).toHaveBeenCalledTimes(1);
  expect(native.mock.calls[0][0].target.checked).toBe(true);
});
it("supports native radio selection, submission, disabled options, and reset", async () => {
  const user = userEvent.setup();
  const change = vi.fn();
  const { container } = render(<form><RadioGroup name="choice" label="Choice" defaultValue="a"
    onValueChange={change} options={[
      { value: "a", label: "A" }, { value: "b", label: "B" }, { value: "c", label: "C", disabled: true },
    ]} /><button type="reset">Reset</button></form>);
  expect(screen.getByRole("radio", { name: "A" })).toBeChecked();
  await user.click(screen.getByRole("radio", { name: "C" }));
  expect(change).not.toHaveBeenCalled();
  await user.click(screen.getByRole("radio", { name: "B" }));
  expect(change).toHaveBeenCalledExactlyOnceWith("b");
  expect(new FormData(container.querySelector("form")!).get("choice")).toBe("b");
  await user.click(screen.getByRole("button", { name: "Reset" }));
  expect(screen.getByRole("radio", { name: "A" })).toBeChecked();
});
it("keeps controlled radio selection and disables an entire group", async () => {
  const user = userEvent.setup();
  const change = vi.fn();
  const { rerender } = render(<RadioGroup name="choice" value="a" onValueChange={change} options={[
    { value: "a", label: "A" }, { value: "b", label: "B" },
  ]} />);
  await user.click(screen.getByRole("radio", { name: "B" }));
  expect(change).toHaveBeenCalledWith("b");
  expect(screen.getByRole("radio", { name: "A" })).toBeChecked();
  rerender(<RadioGroup name="choice" disabled options={[{ value: "a", label: "A" }]} />);
  expect(screen.getByRole("radio")).toBeDisabled();
});
it("prevents a runtime type override from changing a radio into another input", () => {
  const props = { type: "text" } as object;
  render(<Radio {...props} label="Choice" />);
  expect(screen.getByRole("radio")).toHaveAttribute("type", "radio");
});
