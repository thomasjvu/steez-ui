import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, it, vi } from "vitest";
import { DisplacementFilter } from "./DisplacementFilter";
import { ChromaticAberrationFilter } from "./ChromaticAberrationFilter";
import { GlowFilter } from "./GlowFilter";
import { GrainFilter } from "./GrainFilter";

import { DuotoneFilter } from "./DuotoneFilter";
import { PosterizeFilter } from "./PosterizeFilter";
import { EmbossFilter } from "./EmbossFilter";

afterEach(cleanup);

it.each([DisplacementFilter, ChromaticAberrationFilter, GlowFilter, GrainFilter, DuotoneFilter, PosterizeFilter, EmbossFilter])(
  "preserves interactive content and native attributes without duplicating it", async (Filter) => {
    const user = userEvent.setup();
    const click = vi.fn();
    render(<Filter data-testid="filter" className="custom-filter" aria-label="Artwork" paused>
      <button type="button" onClick={click}>Open</button>
    </Filter>);
    const root = screen.getByTestId("filter");
    expect(root).toHaveAttribute("data-running", "false");
    expect(screen.getAllByRole("button", { name: "Open" })).toHaveLength(1);
    await user.tab();
    expect(screen.getByRole("button")).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(click).toHaveBeenCalledTimes(1);
    expect(root.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  },
);

it("creates unique references across nested and repeated filters", () => {
  const { container } = render(<>
    <GlowFilter><ChromaticAberrationFilter>Signal</ChromaticAberrationFilter></GlowFilter>
    <GlowFilter>Another signal</GlowFilter>
  </>);
  const ids = Array.from(container.querySelectorAll("filter")).map(node => node.id);
  expect(ids).toHaveLength(9);
  expect(new Set(ids).size).toBe(9);
  for (const root of container.querySelectorAll<HTMLElement>("[data-trigger]")) {
    const references = root.style.cssText.match(/url\(#[^)]+\)/g) ?? [];
    expect(references).toHaveLength(3);
    for (const reference of references) expect(ids).toContain(reference.slice(5, -1));
  }
});

it("uses static defaults for new filters and preserves animated displacement", () => {
  render(<><GlowFilter data-testid="glow">Glow</GlowFilter>
    <GrainFilter data-testid="grain">Grain</GrainFilter>
    <ChromaticAberrationFilter data-testid="chromatic">Split</ChromaticAberrationFilter>
    <DisplacementFilter data-testid="warp">Warp</DisplacementFilter></>);
  for (const id of ["glow", "grain", "chromatic"]) {
    expect(screen.getByTestId(id)).toHaveAttribute("data-trigger", "static");
    expect(screen.getByTestId(id)).toHaveAttribute("data-reduced-motion", "static");
  }
  expect(screen.getByTestId("warp")).toHaveAttribute("data-trigger", "always");
  expect(screen.getByTestId("warp")).toHaveAttribute("data-running", "true");
  expect(screen.getByTestId("warp")).toHaveAttribute("data-reduced-motion", "none");
});

it("bounds invalid and extreme filter parameters", () => {
  const { container } = render(<>
    <DisplacementFilter scale={Infinity} speedMs={NaN}>Warp</DisplacementFilter>
    <ChromaticAberrationFilter offset={-10} axis="vertical">Split</ChromaticAberrationFilter>
    <GlowFilter radius={NaN} opacity={5}>Glow</GlowFilter>
    <GrainFilter amount={NaN} frequency={-2}>Grain</GrainFilter>
  </>);
  expect(container.innerHTML).not.toMatch(/NaN|Infinity/);
  expect(container.querySelector("feDisplacementMap")).toHaveAttribute("scale", "12");
  expect(container.querySelector("feOffset")).toHaveAttribute("dy", "0");
  expect(container.querySelector("feGaussianBlur")).toHaveAttribute("stdDeviation", "5");
  expect(container.querySelector("feFlood")).toHaveAttribute("flood-opacity", "1");
  const frequencies = Array.from(container.querySelectorAll("feTurbulence")).map(node => node.getAttribute("baseFrequency"));
  expect(frequencies).toContain("0.05");
});

it("keeps custom glow color and vertical channel displacement", () => {
  const { container } = render(<GlowFilter color="#ff00aa">
    <ChromaticAberrationFilter offset={4} axis="vertical" trigger="hover">Artwork</ChromaticAberrationFilter>
  </GlowFilter>);
  expect(container.querySelector("feFlood")).toHaveAttribute("flood-color", "#ff00aa");
  const offsets = Array.from(container.querySelectorAll("feOffset"));
  expect(offsets[0]).toHaveAttribute("dx", "0");
  expect(offsets[0]).toHaveAttribute("dy", "4");
  expect(offsets[1]).toHaveAttribute("dy", "-4");
});

it("keeps new filters finite with invalid inputs and preserves alpha", () => {
  const { container } = render(<>
    <DuotoneFilter shadowColor="invalid" highlightColor="#ffffff">Palette</DuotoneFilter>
    <PosterizeFilter levels={NaN}>Bands</PosterizeFilter>
    <EmbossFilter strength={Infinity}>Relief</EmbossFilter>
  </>);
  expect(container.innerHTML).not.toMatch(/NaN|Infinity/);
  const transfer = container.querySelector("feFuncR");
  expect(transfer?.getAttribute("tableValues")?.split(" ")).toEqual([String(34 / 255), "1"]);
  const discrete = container.querySelector('feFuncR[type="discrete"]');
  expect(discrete).toHaveAttribute("tableValues", "0 0.25 0.5 0.75 1");
  expect(container.querySelector("feFuncA")).toBeNull();
  expect(container.querySelector("feConvolveMatrix")).toHaveAttribute("preserveAlpha", "true");
});

it("bounds posterize shades and allows zero emboss strength", () => {
  const { container } = render(<><PosterizeFilter levels={100}>Bands</PosterizeFilter>
    <EmbossFilter strength={0}>Original</EmbossFilter></>);
  expect(container.querySelector("feFuncR")?.getAttribute("tableValues")?.split(" ")).toHaveLength(16);
  expect(container.querySelector("feConvolveMatrix")).toHaveAttribute("kernelMatrix", "0 0 0 0 1 0 0 0 0");
  expect(container.querySelector("feConvolveMatrix")).toHaveAttribute("bias", "0");
});
