"use client";

import React from "react";

import { progressPercentage } from "../utils/numbers.ts";
import styles from "./LoadingProgressBar.module.css";

export const LOADING_PROGRESS_SEGMENT_COUNT = 20;

const BAR_INDEXES = Array.from(
  { length: LOADING_PROGRESS_SEGMENT_COUNT },
  (_, index) => index,
);

export interface LoadingProgressBarProps {
  progress: number;
  variant?: "default" | "hp";
  className?: string;
  valueLabel?: string;
}

export function LoadingProgressBar({
  progress,
  variant = "default",
  className,
  valueLabel,
}: LoadingProgressBarProps) {
  const clampedProgress = progressPercentage(progress);
  const filledBars = Math.round(
    (clampedProgress / 100) * LOADING_PROGRESS_SEGMENT_COUNT,
  );
  const displayLabel = valueLabel ?? `${Math.round(clampedProgress)}%`;

  return (
    <div
      className={className ? `${styles.root} ${className}` : styles.root}
      data-variant={variant}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clampedProgress}
      aria-label={displayLabel}
    >
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
      <div className={styles.value}>{displayLabel}</div>
    </div>
  );
}
