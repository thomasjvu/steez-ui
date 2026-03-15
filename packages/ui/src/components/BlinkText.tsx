import React from "react";

import styles from "./BlinkText.module.css";

type BlinkTrigger = "mount" | "hover" | "always";

export interface BlinkTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  trigger?: BlinkTrigger;
  durationMs?: number;
  iterations?: number | "infinite";
  delayMs?: number;
  dimOpacity?: number;
}

export function BlinkText({
  children,
  trigger = "hover",
  durationMs = 420,
  iterations = 3,
  delayMs = 0,
  dimOpacity = 0.12,
  className = "",
  style,
  ...props
}: BlinkTextProps) {
  const mergedStyle = {
    ...style,
    ["--blink-duration" as string]: `${durationMs}ms`,
    ["--blink-iterations" as string]:
      iterations === "infinite" ? "infinite" : String(iterations),
    ["--blink-delay" as string]: `${delayMs}ms`,
    ["--blink-dim-opacity" as string]: String(dimOpacity),
  } as React.CSSProperties;

  return (
    <span
      className={`${styles.root} ${styles[trigger]} ${className}`.trim()}
      style={mergedStyle}
      {...props}
    >
      {children}
    </span>
  );
}
