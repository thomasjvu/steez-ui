"use client";

import React from "react";
import { useMotionActivity } from "../hooks/useMotionActivity.ts";
import { clampFinite } from "../utils/numbers.ts";
import styles from "./IconBackground.module.css";

export interface IconBackgroundProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "color" | "role" | "aria-hidden" | "tabIndex"> {
  /** Decorative artwork repeated in each cell. Defaults to a solid square. */
  icon?: React.ReactNode;
  variant?: "static" | "magnetic";
  columns?: number;
  rows?: number;
  size?: number;
  gap?: number;
  color?: string;
  paused?: boolean;
}

/** Decorative icon grid; magnetic cells point toward the viewport pointer. */
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
    if (!root || variant !== "magnetic" || !running) return;
    const cells = Array.from(root.querySelectorAll<HTMLElement>(`[data-icon-cell]`));
    const icons = cells.map(cell => cell.firstElementChild as HTMLElement);
    const rotations = cells.map(() => 0);
    let frame: number | null = null;
    let pointer = { x: 0, y: 0 };
    function move(event: PointerEvent) {
      if (event.pointerType === "touch") return;
      pointer = { x: event.clientX, y: event.clientY };
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        // Read unrotated cell geometry before writing transforms; scroll stays accurate.
        const angles = cells.map(cell => {
          const rect = cell.getBoundingClientRect();
          return Math.atan2(pointer.y - rect.top - rect.height / 2,
            pointer.x - rect.left - rect.width / 2) * 180 / Math.PI;
        });
        icons.forEach((element, index) => {
          const previous = rotations[index];
          const delta = ((angles[index] - previous) % 360 + 540) % 360 - 180;
          rotations[index] = previous + delta;
          element.style.transform = `rotate(${rotations[index]}deg)`;
        });
      });
    }
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      if (frame !== null) cancelAnimationFrame(frame);
      icons.forEach(element => { element.style.transform = ""; });
    };
  }, [variant, running, columnCount, rowCount, icon, ref]);

  return (
    <div {...props} ref={ref} aria-hidden="true" data-variant={variant}
      data-running={variant === "magnetic" && running ? "true" : "false"}
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
