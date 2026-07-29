import React from "react";

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
    <div className={`${styles.card} ${variant === "featured" ? styles.featured : ""} ${className}`.trim()} {...props}>
      <span className={`${styles.corner} ${styles.cornerTopLeft}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.cornerTopRight}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.cornerBottomLeft}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.cornerBottomRight}`} aria-hidden="true" />
      {title ? <div className={styles.title}>{title}</div> : null}
      {children}
    </div>
  );
}
