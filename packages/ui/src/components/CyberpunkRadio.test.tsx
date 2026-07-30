import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { CyberpunkRadioGroup } from "./CyberpunkRadio";

const options = [
  { value: "left", label: "Left" },
  { value: "right", label: "Right" },
];

afterEach(() => {
  cleanup();
});

describe("CyberpunkRadioGroup", () => {
  it("exposes role=radiogroup", () => {
    render(
      <CyberpunkRadioGroup
        name="align"
        label="Alignment"
        options={options}
        value="left"
      />,
    );

    expect(screen.getByRole("radiogroup", { name: "Alignment" })).toBeTruthy();
    expect(screen.getAllByRole("radio")).toHaveLength(2);
  });
});
