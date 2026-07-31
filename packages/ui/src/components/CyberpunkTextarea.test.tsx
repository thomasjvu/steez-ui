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

  it("preserves consumer aria-describedby when helperText is absent", () => {
    render(
      <CyberpunkTextarea
        label="Notes"
        aria-describedby="err-notes"
        defaultValue="hello"
      />,
    );

    const textarea = screen.getByRole("textbox", { name: "Notes" });
    expect(textarea.getAttribute("aria-describedby")).toBe("err-notes");
  });

  it("merges consumer aria-describedby with helperId", () => {
    render(
      <CyberpunkTextarea
        label="Notes"
        helperText="Markdown is not supported."
        aria-describedby="err-notes"
        defaultValue="hello"
      />,
    );

    const textarea = screen.getByRole("textbox", { name: "Notes" });
    const describedBy = textarea.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();

    const ids = describedBy!.split(/\s+/);
    expect(ids).toContain("err-notes");
    expect(ids).toHaveLength(2);

    const helperId = ids.find((id) => id !== "err-notes")!;
    expect(document.getElementById(helperId)?.textContent).toBe(
      "Markdown is not supported.",
    );
  });
});
