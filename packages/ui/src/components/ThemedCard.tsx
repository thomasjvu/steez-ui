import React from "react";

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
    <div className={`${styles.card} ${variant === "featured" ? styles.featured : ""} ${className}`.trim()} {...props}>
      {title ? <div className={styles.title}>{title}</div> : null}
      {children}
    </div>
  );
}
