import React from "react";

import styles from "./NotchedViewportFrame.module.css";

const FRAME_SEGMENTS = [
  "M18 34V18H34",
  "M62 18H408",
  "M408 18L438 48",
  "M438 48H562",
  "M562 48L592 18",
  "M592 18H938",
  "M966 18H982V34",
  "M18 62V938",
  "M982 62V938",
  "M18 966V982H34",
  "M62 982H938",
  "M966 982H982V966",
] as const;

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
        {FRAME_SEGMENTS.map((segment) => (
          <path key={segment} className={styles.segment} d={segment} />
        ))}
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
