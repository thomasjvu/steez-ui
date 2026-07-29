import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { CyberpunkInput } from "./CyberpunkInput";

afterEach(() => {
  cleanup();
});

describe("CyberpunkInput", () => {
  it("associates helperText via aria-describedby", () => {
    render(
      <CyberpunkInput
        label="Handle"
        helperText="Used in URLs and install paths."
        defaultValue="steez"
      />,
    );

    const input = screen.getByRole("textbox", { name: "Handle" });
    const describedBy = input.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();

    const helper = document.getElementById(describedBy!);
    expect(helper?.textContent).toBe("Used in URLs and install paths.");
  });

  it("omits aria-describedby when helperText is absent", () => {
    render(<CyberpunkInput label="Handle" defaultValue="steez" />);

    const input = screen.getByRole("textbox", { name: "Handle" });
    expect(input.getAttribute("aria-describedby")).toBeNull();
  });
});
