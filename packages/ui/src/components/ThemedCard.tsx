"use client";

import React from "react";

import { CardFrame } from "./CardFrame.js";
import styles from "./ThemedCard.module.css";

export interface ThemedCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  variant?: "default" | "featured";
}

export function ThemedCard({
  title,
  variant = "default",
  className = "",
  children,
  ...props
}: ThemedCardProps) {
  return (
    <CardFrame
      className={`${styles.card} ${variant === "featured" ? styles.featured : ""} ${className}`}
      title={title}
      titleClassName={styles.title}
      {...props}
    >
      {children}
    </CardFrame>
  );
}
