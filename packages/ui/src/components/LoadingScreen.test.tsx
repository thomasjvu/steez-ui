import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { LoadingScreen } from "./LoadingScreen";

afterEach(() => {
  cleanup();
  document.documentElement.removeAttribute("data-theme");
  vi.restoreAllMocks();
});

describe("LoadingScreen", () => {
  it("falls back to the dark theme when localStorage is unavailable", () => {
    document.documentElement.setAttribute("data-theme", "dark");
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("Storage access blocked");
    });

    const { container } = render(<LoadingScreen progress={25} />);

    expect(screen.getByText("LOADING")).toBeTruthy();
    expect(container.firstElementChild?.className).toContain("darkTheme");
  });
});
