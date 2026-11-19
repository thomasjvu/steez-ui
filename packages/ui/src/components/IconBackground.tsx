"use client";

import React from "react";
import { useMotionActivity } from "../hooks/useMotionActivity.ts";
import { clampFinite } from "../utils/numbers.ts";
import styles from "./IconBackground.module.css";

export type IconBackgroundVariant = "static" | "magnetic" | "shrink" | "grow";

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
      className={`${styles.root} ${className}`.trim()}
      style={{
        "--icon-columns": columnCount, "--icon-size": `${iconSize}px`,
        "--icon-gap": `${spacing}px`, ...(color ? { color } : {}), ...style,
      } as React.CSSProperties}>
      {Array.from({ length: columnCount * rowCount }, (_, index) => (
        <span className={styles.cell} data-icon-cell key={index}>
          <span className={styles.icon}>{icon ?? <span className={styles.square} />}</span>
        </span>
      ))}
    </div>
  );
}
