/**
 * Standalone Steez UI copy of Duotone Filter.
 *
 * Generated from packages/ui/src/components/DuotoneFilter.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";
import { useEffect, useId, useRef, useState } from "react";

const __styles_steez_duotone_filter_0: Record<string, string> = {
  "root": "steez-duotone-filter-0-root",
  "filters": "steez-duotone-filter-0-filters",
  "content": "steez-duotone-filter-0-content",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/FilterFrame.module.css */
.steez-duotone-filter-0-root { position: relative; }
.steez-duotone-filter-0-filters { position: absolute; width: 0; height: 0; pointer-events: none; }
.steez-duotone-filter-0-content { width: 100%; filter: var(--filter-frame-0); }
.steez-duotone-filter-0-root[data-trigger="always"] > .steez-duotone-filter-0-content,
.steez-duotone-filter-0-root[data-trigger="hover"]:hover > .steez-duotone-filter-0-content,
.steez-duotone-filter-0-root[data-trigger="hover"]:focus-within > .steez-duotone-filter-0-content {
  animation: steez-duotone-filter-0-filter-frames var(--filter-duration, 2700ms) steps(1, end) infinite;
}
.steez-duotone-filter-0-root[data-trigger="hover"] > .steez-duotone-filter-0-content { filter: none; }
.steez-duotone-filter-0-root[data-running="false"] > .steez-duotone-filter-0-content { animation-play-state: paused !important; }
@keyframes steez-duotone-filter-0-filter-frames {
  0%, 100% { filter: var(--filter-frame-0); }
  33.333% { filter: var(--filter-frame-1); }
  66.666% { filter: var(--filter-frame-2); }
}
@media (prefers-reduced-motion: reduce) {
  .steez-duotone-filter-0-root > .steez-duotone-filter-0-content { animation: none !important; filter: var(--filter-frame-0); }
  .steez-duotone-filter-0-root[data-trigger="hover"] > .steez-duotone-filter-0-content { filter: none; }
  .steez-duotone-filter-0-root[data-reduced-motion="none"] > .steez-duotone-filter-0-content { filter: none !important; }
}
`;
const __steezStandaloneStyleKey = "duotone-filter";

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

/** Shared lifecycle for ambient motion: explicit pause, visibility, and reduced motion. */
export function useMotionActivity<T extends HTMLElement = HTMLDivElement>(
  paused = false,
  visible = true,
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media =
      typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;
    const syncMotion = () => setReduced(media?.matches ?? false);
    const syncVisibility = () =>
      setPageVisible(document.visibilityState !== "hidden");
    syncMotion();
    syncVisibility();
    media?.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", syncVisibility);
    const observer =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(([entry]) => {
            if (entry) setInView(entry.isIntersecting);
          });
    if (ref.current) observer?.observe(ref.current);
    return () => {
      media?.removeEventListener("change", syncMotion);
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
  return <div {...props} ref={ref} className={`${__styles_steez_duotone_filter_0.root} ${className}`.trim()}
    style={effectStyle} data-trigger={trigger} data-running={running}
    data-reduced-motion={reducedMotion}>
    <svg className={__styles_steez_duotone_filter_0.filters} aria-hidden="true" focusable="false">
      <defs>{[0, 1, 2].map(frame => <filter key={frame} id={`${id}-${frame}`}
        x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB">
        {renderFilter(frame)}
      </filter>)}</defs>
    </svg>
    <div className={__styles_steez_duotone_filter_0.content}>{children}</div>
  </div>;
}

export interface DuotoneFilterProps extends ContentFilterProps {
  /** Six-digit hex colors for the darkest and lightest luminance values. */
  shadowColor?: string;
  highlightColor?: string;
}
const strengths = { subtle: 0.35, default: 0.7, intense: 1 };
function channels(color: string, fallback: string) {
  const hex = /^#[\da-f]{6}$/i.test(color) ? color : fallback;
  return [1, 3, 5].map(index => parseInt(hex.slice(index, index + 2), 16) / 255);
}

/** Map luminance to a two-color palette while preserving source transparency. */
export function DuotoneFilter({
  shadowColor = "#222244", highlightColor = "#ffb87a",
  intensity = "default", trigger = "static", ...props
}: DuotoneFilterProps) {
  const shadows = channels(shadowColor, "#222244");
  const highlights = channels(highlightColor, "#ffb87a");
  return <FilterFrame {...props} trigger={trigger} renderFilter={frame => {
    const strength = strengths[intensity] * [1, 0.85, 0.7][frame];
    return <>
      <feColorMatrix in="SourceGraphic" type="saturate" values="0" result="luminance" />
      <feComponentTransfer in="luminance" result="duotone">
        <feFuncR type="table" tableValues={`${shadows[0]} ${highlights[0]}`} />
        <feFuncG type="table" tableValues={`${shadows[1]} ${highlights[1]}`} />
        <feFuncB type="table" tableValues={`${shadows[2]} ${highlights[2]}`} />
      </feComponentTransfer>
      <feComposite in="duotone" in2="SourceGraphic" operator="arithmetic"
        k1={0} k2={strength} k3={1 - strength} k4={0} />
    </>;
  }} />;
}
