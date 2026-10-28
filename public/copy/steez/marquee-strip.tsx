/**
 * Standalone Steez UI copy of Marquee Strip.
 *
 * Generated from packages/ui/src/components/MarqueeStrip.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";

const __styles_steez_marquee_strip_0: Record<string, string> = {
  "root": "steez-marquee-strip-0-root",
  "track": "steez-marquee-strip-0-track",
  "pauseOnHover": "steez-marquee-strip-0-pauseOnHover",
  "item": "steez-marquee-strip-0-item",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/MarqueeStrip.module.css */
.steez-marquee-strip-0-root {
  position: relative;
  overflow: hidden;
}

.steez-marquee-strip-0-track {
  display: flex;
  align-items: center;
  gap: var(--marquee-gap, 0.7rem);
  width: max-content;
  animation: steez-marquee-strip-0-marqueeStrip var(--marquee-duration, 24s) linear infinite;
}

.steez-marquee-strip-0-pauseOnHover:hover .steez-marquee-strip-0-track {
  animation-play-state: paused;
}

.steez-marquee-strip-0-item {
  flex: 0 0 auto;
}

@keyframes steez-marquee-strip-0-marqueeStrip {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(calc(-50% - (var(--marquee-gap, 0.7rem) / 2)));
  }
}

@media (prefers-reduced-motion: reduce) {
  .steez-marquee-strip-0-track {
    animation: none;
  }
}

.steez-marquee-strip-0-root[data-running="false"] .steez-marquee-strip-0-track { animation-play-state: paused; }
`;
const __steezStandaloneStyleKey = "marquee-strip";

function __injectSteezStandaloneStyles() {
  if (typeof document === "undefined" || document.querySelector(`style[data-steez-standalone="${__steezStandaloneStyleKey}"]`)) {
    return;
  }

  const style = document.createElement("style");
  style.setAttribute("data-steez-standalone", __steezStandaloneStyleKey);
  style.textContent = __steezStandaloneStyles;
  document.head.appendChild(style);
}

__injectSteezStandaloneStyles();

const QUERY = "(prefers-reduced-motion: reduce)";

/** Live `prefers-reduced-motion` value; false where matchMedia is unavailable. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window.matchMedia !== "function") return undefined;
    const media = window.matchMedia(QUERY);
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  return reduced;
}

/** Shared lifecycle for ambient motion: explicit pause, visibility, and reduced motion. */
export function useMotionActivity<T extends HTMLElement = HTMLDivElement>(
  paused = false,
  visible = true,
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    const syncVisibility = () =>
      setPageVisible(document.visibilityState !== "hidden");
    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);
    const observer =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(([entry]) => {
            if (entry) setInView(entry.isIntersecting);
          });
    if (ref.current) observer?.observe(ref.current);
    return () => {
      document.removeEventListener("visibilitychange", syncVisibility);
      observer?.disconnect();
    };
  }, []);
  return {
    ref,
    running: visible && !paused && inView && pageVisible && !reduced,
  };
}

/** Clamp finite inputs; malformed values use the component's documented default. */
export function clampFinite(
  value: number,
  min: number,
  max: number,
  fallback: number,
) {
  return Number.isFinite(value)
    ? Math.min(max, Math.max(min, value))
    : fallback;
}

/** Percentage shared by range inputs and progress displays. */
export function progressPercentage(value: number, min = 0, max = 100) {
  if (!Number.isFinite(min) || !Number.isFinite(max) || max <= min) return 0;
  return clampFinite(((value - min) / (max - min)) * 100, 0, 100, 0);
}

export interface MarqueeStripProps<T>
  extends React.HTMLAttributes<HTMLDivElement> {
  items: readonly T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  ariaLabel?: string;
  /** Timing in milliseconds, consistent with other motion components. */
  durationMs?: number;
  paused?: boolean;
  gap?: number | string;
  pauseOnHover?: boolean;
  trackClassName?: string;
  itemClassName?: string;
}

export function MarqueeStrip<T>({
  items,
  renderItem,
  ariaLabel,
  durationMs = 24000,
  paused = false,
  gap = "0.7rem",
  pauseOnHover = false,
  className = "",
  trackClassName = "",
  itemClassName = "",
  style,
  ...props
}: MarqueeStripProps<T>) {
  const { ref, running } = useMotionActivity(paused);
  const doubledItems = [...items, ...items];
  const mergedStyle = {
    ...style,
    ["--marquee-duration" as string]: `${clampFinite(durationMs, 1000, 120000, 24000)}ms`,
    ["--marquee-gap" as string]: typeof gap === "number" ? `${gap}px` : gap,
  } as React.CSSProperties;

  return (
    <div
      ref={ref}
      data-running={running ? "true" : "false"}
      className={`${__styles_steez_marquee_strip_0.root} ${pauseOnHover ? __styles_steez_marquee_strip_0.pauseOnHover : ""} ${className}`.trim()}
      aria-label={ariaLabel}
      style={mergedStyle}
      {...props}
    >
      <div className={`${__styles_steez_marquee_strip_0.track} ${trackClassName}`.trim()}>
        {doubledItems.map((item, index) => (
          <div
            key={index}
            className={`${__styles_steez_marquee_strip_0.item} ${itemClassName}`.trim()}
            aria-hidden={index >= items.length}
            inert={index >= items.length}
          >
            {renderItem(item, index % items.length)}
          </div>
        ))}
      </div>
    </div>
  );
}
