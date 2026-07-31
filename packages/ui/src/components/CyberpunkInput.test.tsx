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

  it("preserves consumer aria-describedby when helperText is absent", () => {
    render(
      <CyberpunkInput
        label="Handle"
        aria-describedby="err-handle"
        defaultValue="steez"
      />,
    );

    const input = screen.getByRole("textbox", { name: "Handle" });
    expect(input.getAttribute("aria-describedby")).toBe("err-handle");
  });

  it("merges consumer aria-describedby with helperId", () => {
    render(
      <CyberpunkInput
        label="Handle"
        helperText="Used in URLs and install paths."
        aria-describedby="err-handle"
        defaultValue="steez"
      />,
    );

    const input = screen.getByRole("textbox", { name: "Handle" });
    const describedBy = input.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();

    const ids = describedBy!.split(/\s+/);
    expect(ids).toContain("err-handle");
    expect(ids).toHaveLength(2);

    const helperId = ids.find((id) => id !== "err-handle")!;
    expect(document.getElementById(helperId)?.textContent).toBe(
      "Used in URLs and install paths.",
    );
  });
});
