"use client";

import React from "react";

import styles from "./KineticSwipeText.module.css";

export type KineticSwipeTextTrigger = "always" | "hover" | "mount";
export type KineticSwipeTextDirection = "horizontal" | "vertical";

export interface KineticSwipeTextProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children: string;
  direction?: KineticSwipeTextDirection;
  trigger?: KineticSwipeTextTrigger;
  durationMs?: number;
  delayMs?: number;
}

export function KineticSwipeText({
  children,
  direction = "horizontal",
  trigger = "always",
  durationMs = 2400,
  delayMs = 0,
  className = "",
  style,
  ...props
}: KineticSwipeTextProps) {
  const safeDuration = Number.isFinite(durationMs)
    ? Math.max(durationMs, 1)
    : 2400;
  const safeDelay = Number.isFinite(delayMs) ? delayMs : 0;
  const mergedStyle = {
    ...style,
    ["--kinetic-swipe-duration" as string]: `${safeDuration}ms`,
    ["--kinetic-swipe-delay" as string]: `${safeDelay}ms`,
  } as React.CSSProperties;

  return (
    <div
      className={`${styles.root} ${className}`.trim()}
      data-direction={direction}
      data-trigger={trigger}
      style={mergedStyle}
      {...props}
    >
      <span className={styles.srOnly}>{children}</span>
      <span className={styles.word} aria-hidden="true">
        <span className={styles.base}>{children}</span>
        <span className={`${styles.slice} ${styles.firstSlice}`}>{children}</span>
        <span className={`${styles.slice} ${styles.secondSlice}`}>{children}</span>
      </span>
    </div>
  );
}
