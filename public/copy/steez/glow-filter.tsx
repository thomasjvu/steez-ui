/**
 * Standalone Steez UI copy of Glow Filter.
 *
 * Generated from packages/ui/src/components/GlowFilter.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";
import { useEffect, useId, useRef, useState } from "react";

const __styles_steez_glow_filter_0: Record<string, string> = {
  "root": "steez-glow-filter-0-root",
  "filters": "steez-glow-filter-0-filters",
  "content": "steez-glow-filter-0-content",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/FilterFrame.module.css */
.steez-glow-filter-0-root { position: relative; }
.steez-glow-filter-0-filters { position: absolute; width: 0; height: 0; pointer-events: none; }
.steez-glow-filter-0-content { width: 100%; filter: var(--filter-frame-0); }
.steez-glow-filter-0-root[data-trigger="always"] > .steez-glow-filter-0-content,
.steez-glow-filter-0-root[data-trigger="hover"]:hover > .steez-glow-filter-0-content,
.steez-glow-filter-0-root[data-trigger="hover"]:focus-within > .steez-glow-filter-0-content {
  animation: steez-glow-filter-0-filter-frames var(--filter-duration, 2700ms) steps(1, end) infinite;
}
.steez-glow-filter-0-root[data-trigger="hover"] > .steez-glow-filter-0-content { filter: none; }
.steez-glow-filter-0-root[data-running="false"] > .steez-glow-filter-0-content { animation-play-state: paused !important; }
@keyframes steez-glow-filter-0-filter-frames {
  0%, 100% { filter: var(--filter-frame-0); }
  33.333% { filter: var(--filter-frame-1); }
  66.666% { filter: var(--filter-frame-2); }
}
@media (prefers-reduced-motion: reduce) {
  .steez-glow-filter-0-root > .steez-glow-filter-0-content { animation: none !important; filter: var(--filter-frame-0); }
  .steez-glow-filter-0-root[data-trigger="hover"] > .steez-glow-filter-0-content { filter: none; }
  .steez-glow-filter-0-root[data-reduced-motion="none"] > .steez-glow-filter-0-content { filter: none !important; }
}
`;
const __steezStandaloneStyleKey = "glow-filter";

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
  return <div {...props} ref={ref} className={`${__styles_steez_glow_filter_0.root} ${className}`.trim()}
    style={effectStyle} data-trigger={trigger} data-running={running}
    data-reduced-motion={reducedMotion}>
    <svg className={__styles_steez_glow_filter_0.filters} aria-hidden="true" focusable="false">
      <defs>{[0, 1, 2].map(frame => <filter key={frame} id={`${id}-${frame}`}
        x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB">
        {renderFilter(frame)}
      </filter>)}</defs>
    </svg>
    <div className={__styles_steez_glow_filter_0.content}>{children}</div>
  </div>;
}

export interface GlowFilterProps extends ContentFilterProps {
  /** Halo blur radius in CSS pixels. */
  radius?: number;
  color?: string;
  opacity?: number;
}
const radii = { subtle: 2, default: 5, intense: 10 };

/** Colored halo derived from the content's alpha, with a crisp source layer. */
export function GlowFilter({
  radius, color = "currentColor", opacity = 0.65,
  intensity = "default", trigger = "static", ...props
}: GlowFilterProps) {
  const blur = clampFinite(radius ?? radii[intensity], 0, 24, radii.default);
  const strength = clampFinite(opacity, 0, 1, 0.65);
  return <FilterFrame {...props} trigger={trigger} renderFilter={frame => <>
    <feGaussianBlur in="SourceAlpha" stdDeviation={blur * [1, 0.7, 1.2][frame]} result="blur" />
    <feFlood floodColor={color} floodOpacity={strength} result="color" />
    <feComposite in="color" in2="blur" operator="in" result="halo" />
    <feMerge><feMergeNode in="halo" /><feMergeNode in="SourceGraphic" /></feMerge>
  </>} />;
}
