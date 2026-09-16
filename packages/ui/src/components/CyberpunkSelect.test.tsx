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

  it("preserves consumer aria-describedby when helperText is absent", () => {
    render(
      <CyberpunkSelect
        label="Region"
        options={options}
        defaultValue="alpha"
        aria-describedby="err-region"
      />,
    );

    const select = screen.getByRole("combobox", { name: "Region" });
    expect(select.getAttribute("aria-describedby")).toBe("err-region");
  });

  it("merges consumer aria-describedby with helperId", () => {
    render(
      <CyberpunkSelect
        label="Region"
        helperText="Affects latency and pricing."
        options={options}
        defaultValue="alpha"
        aria-describedby="err-region"
      />,
    );

    const select = screen.getByRole("combobox", { name: "Region" });
    const describedBy = select.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();

    const ids = describedBy!.split(/\s+/);
    expect(ids).toContain("err-region");
    expect(ids).toHaveLength(2);

    const helperId = ids.find((id) => id !== "err-region")!;
    expect(document.getElementById(helperId)?.textContent).toBe(
      "Affects latency and pricing.",
    );
  });

  it("associates an error message and marks the select invalid", () => {
    render(
      <CyberpunkSelect
        label="Region"
        error="Choose a supported region."
        options={options}
        defaultValue="alpha"
      />,
    );

    const select = screen.getByRole("combobox", { name: "Region" });
    const error = screen.getByRole("alert");

    expect(select.getAttribute("aria-invalid")).toBe("true");
    expect(select.getAttribute("aria-describedby")).toBe(error.id);
    expect(error.textContent).toBe("Choose a supported region.");
  });
});
