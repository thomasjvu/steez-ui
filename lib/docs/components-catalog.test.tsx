import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ComponentsCatalog } from "../../components/docs/components-catalog";
import { COMPONENT_DOCS } from "./component-catalog";

afterEach(cleanup);

describe("catalog category filters", () => {
  it("shows each matching component once under its own heading and restores all categories", () => {
    render(<ComponentsCatalog />);

    fireEvent.click(screen.getByRole("button", { name: "Forms" }));

    expect(screen.getAllByRole("heading", { level: 2 }).map((heading) => heading.textContent)).toEqual(["Forms"]);
    const forms = COMPONENT_DOCS.filter((component) => component.category === "forms");
    expect(screen.getAllByRole("link")).toHaveLength(forms.length);
    expect(screen.getAllByRole("link").map((link) => link.getAttribute("href"))).toEqual(
      forms.map((component) => `/components/${component.slug}`),
    );
    expect(screen.getByRole("button", { name: "Forms" })).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(screen.getByRole("button", { name: "All" }));

    expect(screen.getAllByRole("link")).toHaveLength(COMPONENT_DOCS.length);
  }, 30000);
});
