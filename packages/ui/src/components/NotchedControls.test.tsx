import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import * as ui from "../index";
afterEach(cleanup);
const cases = [
  <ui.Input label="Caption" labelStyle="notch" />,
  <ui.Textarea label="Caption" labelStyle="notch" />,
  <ui.Select label="Caption" labelStyle="notch" options={[{ value: "a", label: "A" }]} />,
  <ui.Checkbox label="Caption" labelStyle="notch" />,
  <ui.Radio label="Caption" labelStyle="notch" />,
  <ui.Slider label="Caption" labelStyle="notch" />,
];
it.each(cases)("associates each notched control with its real label", element => {
  const { container } = render(element);
  const label = container.querySelector(".control > label");
  expect(label).toHaveTextContent("Caption");
  expect(screen.getByLabelText("Caption")).toHaveAttribute("id", label?.getAttribute("for"));
});
it("names a notched radio group and targets its first enabled option", () => {
  const { container } = render(<ui.RadioGroup name="choice" label="Caption" labelStyle="notch"
    options={[{ value: "a", label: "A", disabled: true }, { value: "b", label: "B" }]} />);
  expect(screen.getByRole("radiogroup", { name: "Caption" })).toBeTruthy();
  expect(container.querySelector(".notchLabel")).toHaveAttribute("for", screen.getByRole("radio", { name: /B/ }).id);
});
