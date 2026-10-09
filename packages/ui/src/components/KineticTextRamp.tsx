"use client";

import React from "react";

import styles from "./KineticTextRamp.module.css";

export type KineticTextRampTrigger = "always" | "hover" | "mount";

export interface KineticTextRampProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children: string;
  trigger?: KineticTextRampTrigger;
  rows?: number;
  durationMs?: number;
  delayMs?: number;
}

export function KineticTextRamp({
  children,
  trigger = "always",
  rows = 8,
  durationMs = 9000,
  delayMs = 0,
  className = "",
  style,
  ...props
}: KineticTextRampProps) {
  const safeRows = Number.isFinite(rows)
    ? Math.min(14, Math.max(4, Math.floor(rows)))
    : 8;
  const safeDuration = Number.isFinite(durationMs)
    ? Math.max(durationMs, 1)
    : 9000;
  const safeDelay = Number.isFinite(delayMs) ? delayMs : 0;
  const mergedStyle = {
    ...style,
    ["--kinetic-text-ramp-rows" as string]: safeRows,
    ["--kinetic-text-ramp-duration" as string]: `${safeDuration}ms`,
    ["--kinetic-text-ramp-delay" as string]: `${safeDelay}ms`,
  } as React.CSSProperties;

  return (
    <div
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
