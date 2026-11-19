"use client";

import React from "react";

import { CardFrame, type CardCompositionProps } from "./CardFrame.tsx";
import styles from "./Card.module.css";

export interface CardProps
  extends CardCompositionProps, Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: "default" | "featured";
}

export function Card({
  title,
  titleAs,
  titleClassName = "",
  variant = "default",
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <CardFrame
      className={`${styles.card} ${variant === "featured" ? styles.featured : ""} ${className}`}
      title={title}
      titleAs={titleAs}
      titleClassName={`${styles.title} ${titleClassName}`.trim()}
      {...props}
    >
      {children}
    </CardFrame>
  );
}
