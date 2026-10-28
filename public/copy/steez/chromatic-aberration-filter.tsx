/**
 * Standalone Steez UI copy of Chromatic Aberration Filter.
 *
 * Generated from packages/ui/src/components/ChromaticAberrationFilter.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";
import { useEffect, useId, useRef, useState } from "react";

const __styles_steez_chromatic_aberration_filter_0: Record<string, string> = {
  "root": "steez-chromatic-aberration-filter-0-root",
  "filters": "steez-chromatic-aberration-filter-0-filters",
  "content": "steez-chromatic-aberration-filter-0-content",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/FilterFrame.module.css */
.steez-chromatic-aberration-filter-0-root { position: relative; }
.steez-chromatic-aberration-filter-0-filters { position: absolute; width: 0; height: 0; pointer-events: none; }
.steez-chromatic-aberration-filter-0-content { width: 100%; filter: var(--filter-frame-0); }
.steez-chromatic-aberration-filter-0-root[data-trigger="always"] > .steez-chromatic-aberration-filter-0-content,
.steez-chromatic-aberration-filter-0-root[data-trigger="hover"]:hover > .steez-chromatic-aberration-filter-0-content,
.steez-chromatic-aberration-filter-0-root[data-trigger="hover"]:focus-within > .steez-chromatic-aberration-filter-0-content {
  animation: steez-chromatic-aberration-filter-0-filter-frames var(--filter-duration, 2700ms) steps(1, end) infinite;
}
.steez-chromatic-aberration-filter-0-root[data-trigger="hover"] > .steez-chromatic-aberration-filter-0-content { filter: none; }
.steez-chromatic-aberration-filter-0-root[data-running="false"] > .steez-chromatic-aberration-filter-0-content { animation-play-state: paused !important; }
@keyframes steez-chromatic-aberration-filter-0-filter-frames {
  0%, 100% { filter: var(--filter-frame-0); }
  33.333% { filter: var(--filter-frame-1); }
  66.666% { filter: var(--filter-frame-2); }
}
@media (prefers-reduced-motion: reduce) {
  .steez-chromatic-aberration-filter-0-root > .steez-chromatic-aberration-filter-0-content { animation: none !important; filter: var(--filter-frame-0); }
  .steez-chromatic-aberration-filter-0-root[data-trigger="hover"] > .steez-chromatic-aberration-filter-0-content { filter: none; }
  .steez-chromatic-aberration-filter-0-root[data-reduced-motion="none"] > .steez-chromatic-aberration-filter-0-content { filter: none !important; }
}
`;
const __steezStandaloneStyleKey = "chromatic-aberration-filter";

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

export type FilterTrigger = "always" | "hover" | "static";
export interface ContentFilterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  trigger?: FilterTrigger;
  /** Milliseconds per frame; bounded to 16–40,000ms. */
  speedMs?: number;
  intensity?: "subtle" | "default" | "intense";
  paused?: boolean;
}
interface FilterFrameProps extends Omit<ContentFilterProps, "intensity"> {
  renderFilter: (frame: number) => React.ReactNode;
  /** Decorative color effects can remain static under reduced motion. */
  reducedMotion?: "static" | "none";
}

/** One DOM, id, trigger, and motion contract for content filters. */
export function FilterFrame({
  children, renderFilter, trigger = "static", speedMs = 900,
  paused = false, reducedMotion = "static", className = "", style,
  ...props
}: FilterFrameProps) {
  const id = `steez-filter-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const { ref, running } = useMotionActivity(paused);
  const effectStyle = {
    ...style,
    "--filter-duration": `${clampFinite(speedMs, 16, 40000, 900) * 3}ms`,
    ...Object.fromEntries([0, 1, 2].map(frame => [
      `--filter-frame-${frame}`, `url(#${id}-${frame})`,
    ])),
  } as React.CSSProperties;
  return <div {...props} ref={ref} className={`${__styles_steez_chromatic_aberration_filter_0.root} ${className}`.trim()}
    style={effectStyle} data-trigger={trigger} data-running={running}
    data-reduced-motion={reducedMotion}>
    <svg className={__styles_steez_chromatic_aberration_filter_0.filters} aria-hidden="true" focusable="false">
      <defs>{[0, 1, 2].map(frame => <filter key={frame} id={`${id}-${frame}`}
        x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB">
        {renderFilter(frame)}
      </filter>)}</defs>
    </svg>
    <div className={__styles_steez_chromatic_aberration_filter_0.content}>{children}</div>
  </div>;
}

export interface ChromaticAberrationFilterProps extends ContentFilterProps {
  /** Color-channel separation in CSS pixels. */
  offset?: number;
  axis?: "horizontal" | "vertical";
}
const offsets = { subtle: 1, default: 3, intense: 6 };

/** Separate red and cyan channels without duplicating interactive content. */
export function ChromaticAberrationFilter({
  offset, axis = "horizontal", intensity = "default", trigger = "static", ...props
}: ChromaticAberrationFilterProps) {
  const amount = clampFinite(offset ?? offsets[intensity], 0, 24, offsets.default);
  return <FilterFrame {...props} trigger={trigger} renderFilter={frame => {
    const shift = amount * [1, -0.65, 0.4][frame];
    const dx = axis === "horizontal" ? shift : 0;
    const dy = axis === "vertical" ? shift : 0;
    return <>
      <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red" />
      <feOffset in="red" dx={dx} dy={dy} result="red-shift" />
      <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" result="cyan" />
      <feOffset in="cyan" dx={-dx} dy={-dy} result="cyan-shift" />
      <feBlend in="red-shift" in2="cyan-shift" mode="screen" />
    </>;
  }} />;
}
