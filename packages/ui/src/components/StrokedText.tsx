import React from "react";

import styles from "./StrokedText.module.css";

export interface StrokedTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  color?: string;
  strokeWidth?: number | string;
  animateOnMount?: boolean;
  fallbackOpacity?: number;
}

export function StrokedText({
  children,
  color,
  strokeWidth = "clamp(1px, 0.11vw, 1.8px)",
  animateOnMount = false,
  fallbackOpacity = 0.18,
  className = "",
  style,
  ...props
}: StrokedTextProps) {
  const mergedStyle = {
    ...style,
    ["--stroked-text-color" as string]: color,
    ["--stroked-text-width" as string]:
      typeof strokeWidth === "number" ? `${strokeWidth}px` : strokeWidth,
    ["--stroked-text-fallback-opacity" as string]: String(fallbackOpacity),
  } as React.CSSProperties;

  return (
    <span
      className={`${styles.root} ${animateOnMount ? styles.animateOnMount : ""} ${className}`.trim()}
      style={mergedStyle}
      {...props}
    >
      {children}
    </span>
  );
}
