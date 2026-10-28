"use client";

import React from "react";

import { useMotionActivity } from "../hooks/useMotionActivity.ts";
import { clampFinite } from "../utils/numbers.ts";

import styles from "./KineticSwipeText.module.css";

export type KineticSwipeTextTrigger = "always" | "hover" | "mount";
export type KineticSwipeTextDirection = "horizontal" | "vertical";

export interface KineticSwipeTextProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children: string;
  direction?: KineticSwipeTextDirection;
  trigger?: KineticSwipeTextTrigger;
  durationMs?: number;
  /** Freeze motion; offscreen, hidden tabs, and reduced motion also pause it. */
  paused?: boolean;
  delayMs?: number;
}

export function KineticSwipeText({
  children,
  direction = "horizontal",
  trigger = "always",
  durationMs = 2400,
  delayMs = 0,
  paused = false,
  className = "",
  style,
  ...props
}: KineticSwipeTextProps) {
  const { ref, running } = useMotionActivity(paused);
  const safeDuration = clampFinite(durationMs, 1, 120000, 2400);
  const safeDelay = clampFinite(delayMs, -120000, 120000, 0);
  const mergedStyle = {
    ...style,
    ["--kinetic-swipe-duration" as string]: `${safeDuration}ms`,
    ["--kinetic-swipe-delay" as string]: `${safeDelay}ms`,
  } as React.CSSProperties;

  return (
    <div
      ref={ref}
      data-running={running ? "true" : "false"}
      className={`${styles.root} ${className}`.trim()}
      data-direction={direction}
      data-trigger={trigger}
      style={mergedStyle}
      {...props}
    >
      <span className={styles.srOnly}>{children}</span>
      <span className={styles.word} aria-hidden="true">
        <span className={styles.base}>{children}</span>
        <span className={`${styles.slice} ${styles.firstSlice}`}>
          {children}
        </span>
        <span className={`${styles.slice} ${styles.secondSlice}`}>
          {children}
        </span>
      </span>
    </div>
  );
}
