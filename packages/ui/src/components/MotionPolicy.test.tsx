import React from "react";
import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { KineticTextRing } from "./KineticTextRing";
import { KineticTextGlobe } from "./KineticTextGlobe";
import { KineticTextVolume } from "./KineticTextVolume";
import { KineticTextRamp } from "./KineticTextRamp";
import { KineticSwipeText } from "./KineticSwipeText";
import { MarqueeStrip } from "./MarqueeStrip";
import { BoilingLines } from "./BoilingLines";
import { DisplacementFilter } from "./DisplacementFilter";
import { ChromaticAberrationFilter } from "./ChromaticAberrationFilter";
import { GlowFilter } from "./GlowFilter";
import { GrainFilter } from "./GrainFilter";
let intersect: IntersectionObserverCallback;
let mediaChange: () => void;
let reduced = false;
const disconnect = vi.fn();
beforeEach(() => {
  reduced = false;
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({
      get matches() {
        return reduced;
      },
      addEventListener: (_type: string, handler: () => void) => {
        mediaChange = handler;
      },
      removeEventListener: vi.fn(),
    })),
  );
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback: IntersectionObserverCallback) {
        intersect = callback;
      }
      observe() {}
      disconnect = disconnect;
    },
  );
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  vi.clearAllMocks();
});
const effects = [
  DisplacementFilter,
  ChromaticAberrationFilter,
  GlowFilter,
  GrainFilter,
  KineticTextRing,
  KineticTextGlobe,
  KineticTextVolume,
  KineticTextRamp,
  KineticSwipeText,
];
it.each(effects)("applies lifecycle and explicit pause to %s", (Effect) => {
  const { rerender, unmount } = render(
    <Effect data-testid="effect">Steez</Effect>,
  );
  const root = screen.getByTestId("effect");
  expect(root).toHaveAttribute("data-running", "true");
  act(() =>
    intersect(
      [{ isIntersecting: false } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    ),
  );
  expect(root).toHaveAttribute("data-running", "false");
  act(() =>
    intersect(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    ),
  );
  act(() => {
    reduced = true;
    mediaChange();
  });
  expect(root).toHaveAttribute("data-running", "false");
  act(() => {
    reduced = false;
    mediaChange();
  });
  rerender(
    <Effect data-testid="effect" paused>
      Steez
    </Effect>,
  );
  expect(root).toHaveAttribute("data-running", "false");
  unmount();
  expect(disconnect).toHaveBeenCalledTimes(1);
});
it("uses the same visibility policy for marquee and boiling artwork", () => {
  const { rerender } = render(
    <MarqueeStrip
      data-testid="effect"
      items={["one"]}
      renderItem={(item) => item}
      paused
      durationMs={5000}
    />,
  );
  expect(screen.getByTestId("effect")).toHaveAttribute("data-running", "false");
  expect(
    screen.getByTestId("effect").style.getPropertyValue("--marquee-duration"),
  ).toBe("5000ms");
  rerender(
    <BoilingLines data-testid="effect" paused>
      <span>Art</span>
    </BoilingLines>,
  );
  expect(screen.getByText("Art").parentElement).toHaveAttribute(
    "data-paused",
    "true",
  );
});

it("keeps repeated marquee links out of keyboard navigation", () => {
  const { container } = render(<MarqueeStrip items={["Docs"]} renderItem={(item) => <a href="/docs">{item}</a>} />);
  const links = container.querySelectorAll("a");
  expect(links).toHaveLength(2);
  expect(links[0].parentElement).not.toHaveAttribute("inert");
  expect(links[1].parentElement).toHaveAttribute("inert");
  expect(links[1].parentElement).toHaveAttribute("aria-hidden", "true");
});
