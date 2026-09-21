"use client";

import React from "react";

import { CardFrame } from "./CardFrame.js";
import styles from "./CornerBracketCard.module.css";

export interface CornerBracketCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  variant?: "default" | "featured";
}

export function CornerBracketCard({
  title,
  variant = "default",
  className = "",
  children,
  ...props
}: CornerBracketCardProps) {
  return (
    <CardFrame
      className={`${styles.card} ${variant === "featured" ? styles.featured : ""} ${className}`}
      title={title}
      titleClassName={styles.title}
      decoration={
        <>
          <span className={`${styles.corner} ${styles.cornerTopLeft}`} aria-hidden="true" />
          <span className={`${styles.corner} ${styles.cornerTopRight}`} aria-hidden="true" />
          <span className={`${styles.corner} ${styles.cornerBottomLeft}`} aria-hidden="true" />
          <span className={`${styles.corner} ${styles.cornerBottomRight}`} aria-hidden="true" />
        </>
      }
      {...props}
    >
      {children}
    </CardFrame>
  );
}
