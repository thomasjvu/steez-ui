import React from "react";

import styles from "./NotchedViewportFrame.module.css";

export interface NotchedViewportFrameProps {
  className?: string;
  contentClassName?: string;
  children?: React.ReactNode;
  fixed?: boolean;
  tone?: "default" | "strong";
}

export function NotchedViewportFrame({
  className = "",
  contentClassName = "",
  children,
  fixed = false,
  tone = "default",
}: NotchedViewportFrameProps) {
  return (
    <div
      className={`${styles.root} ${fixed ? styles.fixed : styles.absolute} ${
        tone === "strong" ? styles.strong : ""
      } ${className}`.trim()}
      aria-hidden={children ? undefined : "true"}
    >
      <svg
        className={styles.svg}
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <path
          className={styles.path}
          d="M26 12H430L454 38H546L570 12H974L988 26V974L974 988H26L12 974V26L26 12Z"
        />
      </svg>
      {children ? (
        <div className={`${styles.content} ${contentClassName}`.trim()}>
          {children}
        </div>
      ) : null}
    </div>
  );
}

export default NotchedViewportFrame;
