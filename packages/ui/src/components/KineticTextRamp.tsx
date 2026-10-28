"use client";

import React from "react";

import { useMotionActivity } from "../hooks/useMotionActivity.ts";
import { clampFinite } from "../utils/numbers.ts";

import styles from "./KineticTextRamp.module.css";

export type KineticTextRampTrigger = "always" | "hover" | "mount";

export interface KineticTextRampProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children: string;
  trigger?: KineticTextRampTrigger;
  rows?: number;
  durationMs?: number;
  /** Freeze motion; offscreen, hidden tabs, and reduced motion also pause it. */
  paused?: boolean;
  delayMs?: number;
}

export function KineticTextRamp({
  children,
  trigger = "always",
  rows = 8,
  durationMs = 9000,
  delayMs = 0,
  paused = false,
  className = "",
  style,
  ...props
}: KineticTextRampProps) {
  const { ref, running } = useMotionActivity(paused);
  const safeRows = Math.floor(clampFinite(rows, 4, 14, 8));
  const safeDuration = clampFinite(durationMs, 1, 120000, 9000);
  const safeDelay = clampFinite(delayMs, -120000, 120000, 0);
  const mergedStyle = {
    ...style,
    ["--kinetic-text-ramp-rows" as string]: safeRows,
    ["--kinetic-text-ramp-duration" as string]: `${safeDuration}ms`,
    ["--kinetic-text-ramp-delay" as string]: `${safeDelay}ms`,
  } as React.CSSProperties;

  return (
    <div
      ref={ref}
      data-running={running ? "true" : "false"}
      {...props}
      className={`${styles.root} ${className}`.trim()}
      data-trigger={trigger}
      role="img"
      aria-label={props["aria-label"] ?? children}
      style={mergedStyle}
    >
      <div className={styles.viewport} aria-hidden="true">
        <div className={styles.plane}>
          <div className={styles.track}>
            {[0, 1].map((loop) => (
              <div className={styles.loop} key={loop}>
                {Array.from({ length: safeRows }, (_, index) => (
                  <span className={styles.row} key={index}>
                    {children}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
