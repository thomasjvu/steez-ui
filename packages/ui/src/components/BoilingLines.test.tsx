import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { BoilingLines } from "./BoilingLines";

afterEach(cleanup);

describe("BoilingLines", () => {
  it("keeps artwork accessible and filter IDs unique across instances", () => {
    const { container } = render(<>
      <BoilingLines><img src="/a.svg" alt="Studio mark" /></BoilingLines>
      <BoilingLines><span>Second artwork</span></BoilingLines>
    </>);
    expect(screen.getByRole("img", { name: "Studio mark" })).toBeVisible();
    const ids = [...container.querySelectorAll("filter")].map((filter) => filter.id);
    expect(new Set(ids).size).toBe(6);
    for (const root of container.querySelectorAll<HTMLElement>(".root")) {
      for (let frame = 0; frame < 3; frame++) {
        const reference = root.style.getPropertyValue(`--boil-frame-${frame}`);
        expect(ids.some((id) => reference === `url(#${id})`)).toBe(true);
      }
    }
  });

  it("supports presets, pause, custom scale and safe timing without replacing children", () => {
    const { container, rerender } = render(<BoilingLines intensity="intense" paused speedMs={-10} data-testid="effect"><button>Action</button></BoilingLines>);
    expect(container.querySelector("feDisplacementMap")).toHaveAttribute("scale", "8");
    expect(container.querySelector("[data-paused]")).toBeTruthy();
    expect(screen.getByTestId("effect").style.getPropertyValue("--boil-duration")).toBe("48ms");
    const button = screen.getByRole("button");
    rerender(<BoilingLines scale={3}><button>Action</button></BoilingLines>);
    expect(screen.getByRole("button")).toBe(button);
    expect(container.querySelector("feDisplacementMap")).toHaveAttribute("scale", "3");
    expect(container.querySelector("[data-paused]")).toBeNull();
  });
});
