import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { CyberpunkTextarea } from "./CyberpunkTextarea";

afterEach(() => {
  cleanup();
});

describe("CyberpunkTextarea", () => {
  it("associates helperText via aria-describedby", () => {
    render(
      <CyberpunkTextarea
        label="Notes"
        helperText="Markdown is not supported."
        defaultValue="hello"
      />,
    );

    const textarea = screen.getByRole("textbox", { name: "Notes" });
    const describedBy = textarea.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();

    const helper = document.getElementById(describedBy!);
    expect(helper?.textContent).toBe("Markdown is not supported.");
  });

  it("omits aria-describedby when helperText is absent", () => {
    render(<CyberpunkTextarea label="Notes" defaultValue="hello" />);

    const textarea = screen.getByRole("textbox", { name: "Notes" });
    expect(textarea.getAttribute("aria-describedby")).toBeNull();
  });
});
