import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { SteezIconProvider } from "./IconProvider.tsx";
import { STROKE_ICON_NODES } from "./icons.data.ts";
import { CheckIcon, GitHubIcon, LightCrossIcon, MoonIcon, SunIcon, TwitterIcon } from "./icons.tsx";

function render(element: React.ReactElement, provider?: { size: number; strokeWidth: number }) {
  const markup = renderToStaticMarkup(
    provider ? <SteezIconProvider {...provider}>{element}</SteezIconProvider> : element,
  );
  return new DOMParser().parseFromString(markup, "image/svg+xml").documentElement;
}

describe("steez icons", () => {
  it("draws every outline node from the icon data", () => {
    const svg = render(<SunIcon />);
    expect(svg.children).toHaveLength(STROKE_ICON_NODES.sun.length);
    expect(svg.children[0].getAttribute("r")).toBe("4");
  });

  it("takes size and stroke width from the provider unless props override them", () => {
    const fromProvider = render(<CheckIcon />, { size: 30, strokeWidth: 1.5 });
    expect(fromProvider.getAttribute("width")).toBe("30");
    expect(fromProvider.getAttribute("stroke-width")).toBe("1.5");

    const overridden = render(<CheckIcon width={10} color="red" aria-label="done" />, { size: 30, strokeWidth: 1.5 });
    expect(overridden.getAttribute("width")).toBe("10");
    expect(overridden.getAttribute("height")).toBe("30");
    expect(overridden.getAttribute("stroke")).toBe("red");
    expect(overridden.getAttribute("aria-label")).toBe("done");
  });

  it("fills the moon and brand marks instead of stroking them", () => {
    const moon = render(<MoonIcon color="blue" />);
    expect(moon.getAttribute("fill")).toBe("blue");
    expect(moon.getAttribute("stroke")).toBe("none");

    expect(render(<TwitterIcon color="red" />).firstElementChild?.getAttribute("fill")).toBe("red");
    expect(render(<GitHubIcon />).getAttribute("fill")).toBe("none");
    expect(render(<TwitterIcon />).hasAttribute("fill")).toBe(false);
  });

  it("keeps brand marks and the light cross at their own default sizes", () => {
    expect(render(<GitHubIcon />, { size: 30, strokeWidth: 1 }).getAttribute("width")).toBe("24");
    const cross = render(<LightCrossIcon />);
    expect([cross.getAttribute("width"), cross.getAttribute("height")]).toEqual(["116", "384"]);
  });
});
