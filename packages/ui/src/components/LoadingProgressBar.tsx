import React from "react";

import styles from "./LoadingProgressBar.module.css";

export const LOADING_PROGRESS_SEGMENT_COUNT = 20;

const BAR_INDEXES = Array.from({ length: LOADING_PROGRESS_SEGMENT_COUNT }, (_, index) => index);

export interface LoadingProgressBarProps {
  progress: number;
  className?: string;
  valueLabel?: string;
}

export function LoadingProgressBar({
  progress,
  className,
  valueLabel,
}: LoadingProgressBarProps) {
  const clampedProgress = Math.max(0, Math.min(100, progress));
  const filledBars = Math.round((clampedProgress / 100) * LOADING_PROGRESS_SEGMENT_COUNT);

  return (
    <div className={className ? `${styles.root} ${className}` : styles.root}>
      <div className={styles.barGroup}>
        {BAR_INDEXES.map((index) => {
          const isFilled = index < filledBars;
          return (
            <div
              key={index}
              className={`${styles.bar} ${isFilled ? styles.barFilled : ""}`.trim()}
              style={{ ["--bar-delay" as string]: `${index * 20}ms` }}
            />
          );
        })}
      </div>
      <div className={styles.value}>{valueLabel ?? `${Math.round(clampedProgress)}%`}</div>
    </div>
  );
}

