import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { CyberpunkSelect } from "./CyberpunkSelect";

const options = [
  { value: "alpha", label: "Alpha" },
  { value: "beta", label: "Beta" },
];

afterEach(() => {
  cleanup();
});

describe("CyberpunkSelect", () => {
  it("associates helperText via aria-describedby", () => {
    render(
      <CyberpunkSelect
        label="Region"
        helperText="Affects latency and pricing."
        options={options}
        defaultValue="alpha"
      />,
    );

    const select = screen.getByRole("combobox", { name: "Region" });
    const describedBy = select.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();

    const helper = document.getElementById(describedBy!);
    expect(helper?.textContent).toBe("Affects latency and pricing.");
  });

  it("omits aria-describedby when helperText is absent", () => {
    render(
      <CyberpunkSelect label="Region" options={options} defaultValue="alpha" />,
    );

    const select = screen.getByRole("combobox", { name: "Region" });
    expect(select.getAttribute("aria-describedby")).toBeNull();
  });
});
