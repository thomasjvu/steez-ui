"use client";

import React from "react";

import styles from "./CyberpunkTile.module.css";

export interface CyberpunkTileProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "small" | "big" | "scrollable" | "ios";
  center?: boolean;
  contentClassName?: string;
}

export function CyberpunkTile({
  children,
  className = "",
  variant = "default",
  onClick,
  onKeyDown,
  style,
  center = false,
  contentClassName = "",
  ...props
}: CyberpunkTileProps) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || !onClick) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick(event as unknown as React.MouseEvent<HTMLDivElement>);
    }
  };

  return (
    <div
      className={`${styles.tile} ${variant !== "default" ? styles[variant] : ""} ${onClick ? styles.tileInteractive : ""} ${className}`.trim()}
      onClick={onClick}
      onKeyDown={onClick || onKeyDown ? handleKeyDown : undefined}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      style={style}
      {...props}
    >
      <div className={`${styles.content} ${center ? styles.centerContent : ""} ${contentClassName}`.trim()}>
        {children}
      </div>
      <div className={styles.cornerAccent} data-corner="top-right" />
      <div className={styles.cornerAccent} data-corner="bottom-left" />
    </div>
  );
}

