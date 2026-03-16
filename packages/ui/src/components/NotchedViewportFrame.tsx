import React from "react";

import styles from "./NotchedViewportFrame.module.css";

const FRAME_SEGMENTS = [
  "M14 38V24L24 14H40",
  "M68 14H392",
  "M392 14L424 46",
  "M424 46H576",
  "M576 46L608 14",
  "M608 14H932",
  "M960 14H976V30L966 40",
  "M14 66V934",
  "M986 66V934",
  "M14 960V976H30L40 966",
  "M68 986H932",
  "M960 960L970 970V986H954",
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
