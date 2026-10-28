"use client";

import React from "react";

import { CardFrame, type CardCompositionProps } from "./CardFrame.tsx";
import styles from "./CornerBracketCard.module.css";

export interface CornerBracketCardProps
  extends CardCompositionProps, Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: "default" | "featured";
}

export function CornerBracketCard({
  title,
  titleAs,
  titleClassName = "",
  variant = "default",
  className = "",
  children,
  ...props
}: CornerBracketCardProps) {
  return (
    <CardFrame
      className={`${styles.card} ${variant === "featured" ? styles.featured : ""} ${className}`}
      title={title}
      titleAs={titleAs}
      titleClassName={`${styles.title} ${titleClassName}`.trim()}
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
