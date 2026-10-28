import React from "react";
import { MemoryRouter } from "react-router";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ComponentsCatalog } from "../../components/docs/components-catalog";
import { COMPONENT_DOCS } from "./component-catalog";

afterEach(cleanup);

describe("catalog discovery", () => {
  it("filters by category and restores all categories", () => {
    render(
      <MemoryRouter>
        <ComponentsCatalog />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Forms" }));
    expect(
      screen
        .getAllByRole("heading", { level: 2 })
        .map((heading) => heading.textContent),
    ).toEqual([
      `Forms ${COMPONENT_DOCS.filter((item) => item.category === "forms").length}`,
    ]);
    const forms = COMPONENT_DOCS.filter((item) => item.category === "forms");
    expect(
      screen.getAllByRole("link").map((link) => link.getAttribute("href")),
    ).toEqual(forms.map((item) => `/components/${item.slug}`));
    expect(screen.getByRole("button", { name: "Forms" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    fireEvent.click(screen.getByRole("button", { name: "All" }));
    expect(screen.getAllByRole("link")).toHaveLength(COMPONENT_DOCS.length);
  });
  it("combines text search with category filters and clears an empty result", () => {
    render(
      <MemoryRouter>
        <ComponentsCatalog />
      </MemoryRouter>,
    );
    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "crystal" },
    });
    expect(
      screen.getByRole("link", { name: /Quartz Crystal/ }),
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Forms" }));
    expect(screen.getByText("No matching components")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Clear filters" }));
    expect(screen.getAllByRole("link")).toHaveLength(COMPONENT_DOCS.length);
  });
});
