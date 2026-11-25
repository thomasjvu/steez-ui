/**
 * Standalone Steez UI copy of Icon Background.
 *
 * Generated from packages/ui/src/components/IconBackground.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";

const __styles_steez_icon_background_0: Record<string, string> = {
  "root": "steez-icon-background-0-root",
  "cell": "steez-icon-background-0-cell",
  "icon": "steez-icon-background-0-icon",
  "square": "steez-icon-background-0-square",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/IconBackground.module.css */
.steez-icon-background-0-root[data-variant] {
  display: grid;
  grid-template-columns: repeat(var(--icon-columns, 9), minmax(0, 1fr));
  gap: min(var(--icon-gap, 24px), 3vw);
  width: 100%;
  max-width: calc(var(--icon-columns, 9) * var(--icon-size, 40px) + (var(--icon-columns, 9) - 1) * var(--icon-gap, 24px));
  color: var(--color-accent, #fece00);
  pointer-events: none;
  user-select: none;
}
.steez-icon-background-0-cell { container-type: inline-size; display: grid; place-items: center; aspect-ratio: 1; min-width: 0; }
.steez-icon-background-0-icon { display: grid; place-items: center; width: 100%; height: 100%; font-size: min(var(--icon-size, 40px), 100cqw); line-height: 1; transform-origin: center; }
.steez-icon-background-0-icon > svg, .steez-icon-background-0-icon > img { width: 100%; height: 100%; object-fit: contain; }
.steez-icon-background-0-square { width: 100%; height: 100%; background: currentColor; }
.steez-icon-background-0-root[data-variant="shrink"] .steez-icon-background-0-icon, .steez-icon-background-0-root[data-variant="grow"] .steez-icon-background-0-icon { transition: transform 180ms ease-out; }
@media (prefers-reduced-motion: reduce) { .steez-icon-background-0-icon { transform: none !important; } }
`;
const __steezStandaloneStyleKey = "icon-background";

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

type IconBackgroundVariant = "static" | "magnetic" | "shrink" | "grow";

/** Pointer influence radius, in cell widths, and peak scale change for proximity variants. */
const SCALE_RADIUS = 3;
const SCALE_AMOUNT = { shrink: -0.7, grow: 0.5 } as const;

function proximityScale(variant: keyof typeof SCALE_AMOUNT, distance: number, cellSize: number) {
  const falloff = Math.max(0, 1 - distance / Math.max(cellSize * SCALE_RADIUS, 1));
  return Math.round((1 + SCALE_AMOUNT[variant] * falloff) * 1000) / 1000;
}

export interface IconBackgroundProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "color" | "role" | "aria-hidden" | "tabIndex"> {
  /** Decorative artwork repeated in each cell. Defaults to a solid square. */
  icon?: React.ReactNode;
  /** `magnetic` rotates cells toward the pointer; `shrink` / `grow` scale cells near it. */
  variant?: IconBackgroundVariant;
  columns?: number;
  rows?: number;
  size?: number;
  gap?: number;
  color?: string;
  paused?: boolean;
}

/** Decorative icon grid; cells can rotate toward, or shrink / grow near, the viewport pointer. */
export function IconBackground({
  icon, variant = "static", columns = 9, rows = 7, size = 40, gap = 24,
  color, paused = false, className = "", style, ...props
}: IconBackgroundProps) {
  const columnCount = Math.round(clampFinite(columns, 1, 24, 9));
  const rowCount = Math.round(clampFinite(rows, 1, 24, 7));
  const iconSize = clampFinite(size, 4, 200, 40);
  const spacing = clampFinite(gap, 0, 100, 24);
  const { ref, running } = useMotionActivity(paused);

  React.useEffect(() => {
    const root = ref.current;
    if (!root || variant === "static" || !running) return;
    const mode = variant;
    const cells = Array.from(root.querySelectorAll<HTMLElement>(`[data-icon-cell]`));
    const icons = cells.map(cell => cell.firstElementChild as HTMLElement);
    const rotations = cells.map(() => 0);
    let frame: number | null = null;
    let pointer = { x: 0, y: 0 };
    function paint() {
      frame = null;
      // Read unrotated cell geometry before writing transforms; scroll stays accurate.
      const offsets = cells.map(cell => {
        const rect = cell.getBoundingClientRect();
        return { dx: pointer.x - rect.left - rect.width / 2, dy: pointer.y - rect.top - rect.height / 2, size: rect.width };
      });
      icons.forEach((element, index) => {
        const { dx, dy, size: cellSize } = offsets[index];
        if (mode === "magnetic") {
          const angle = Math.atan2(dy, dx) * 180 / Math.PI;
          const previous = rotations[index];
          rotations[index] = previous + ((angle - previous) % 360 + 540) % 360 - 180;
          element.style.transform = `rotate(${rotations[index]}deg)`;
        } else {
          element.style.transform = `scale(${proximityScale(mode, Math.hypot(dx, dy), cellSize)})`;
        }
      });
    }
    function move(event: PointerEvent) {
      if (event.pointerType === "touch") return;
      pointer = { x: event.clientX, y: event.clientY };
      if (frame === null) frame = requestAnimationFrame(paint);
    }
    function reset() {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      icons.forEach(element => { element.style.transform = ""; });
    }
    const page = document.documentElement;
    window.addEventListener("pointermove", move, { passive: true });
    if (mode !== "magnetic") page.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("pointermove", move);
      page.removeEventListener("pointerleave", reset);
      reset();
    };
  }, [variant, running, columnCount, rowCount, icon, ref]);

  return (
    <div {...props} ref={ref} aria-hidden="true" data-variant={variant}
      data-running={variant !== "static" && running ? "true" : "false"}
      className={`${__styles_steez_icon_background_0.root} ${className}`.trim()}
      style={{
        "--icon-columns": columnCount, "--icon-size": `${iconSize}px`,
        "--icon-gap": `${spacing}px`, ...(color ? { color } : {}), ...style,
      } as React.CSSProperties}>
      {Array.from({ length: columnCount * rowCount }, (_, index) => (
        <span className={__styles_steez_icon_background_0.cell} data-icon-cell key={index}>
          <span className={__styles_steez_icon_background_0.icon}>{icon ?? <span className={__styles_steez_icon_background_0.square} />}</span>
        </span>
      ))}
    </div>
  );
}
