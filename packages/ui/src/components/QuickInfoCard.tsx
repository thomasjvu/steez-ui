"use client";

import React from "react";

import { clampFinite, progressPercentage } from "../utils/numbers.ts";
import toneStyles from "../styles/ValueTone.module.css";
import styles from "./QuickInfoCard.module.css";

export interface QuickInfoItem {
  icon?: React.ReactNode;
  label: string;
  value: string | number;
  valueColor?: "default" | "success" | "warning" | "danger";
  mono?: boolean;
}

export interface StorageProgress {
  used: number;
  limit: number;
}

export interface QuickInfoCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: QuickInfoItem[];
  storageProgress?: StorageProgress;
  showCornerBrackets?: boolean;
}

function formatFileSize(bytes: number) {
  bytes = clampFinite(bytes, 0, Number.MAX_SAFE_INTEGER, 0);
  if (bytes === 0) {
    return "0 Bytes";
  }

  const base = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const unitIndex = Math.min(
    sizes.length - 1,
    Math.max(0, Math.floor(Math.log(bytes) / Math.log(base))),
  );
  return `${parseFloat((bytes / Math.pow(base, unitIndex)).toFixed(2))} ${
    sizes[unitIndex]
  }`;
}

export function QuickInfoCard({
  items,
  storageProgress,
  className = "",
  showCornerBrackets = true,
  ...props
}: QuickInfoCardProps) {
  const storageRatio = storageProgress
    ? progressPercentage(storageProgress.used, 0, storageProgress.limit) / 100
    : 0;
  const storageToneClass =
    storageRatio > 0.9
      ? styles.storageDanger
      : storageRatio > 0.7
        ? styles.storageWarning
        : "";

  const getValueToneClass = (color?: QuickInfoItem["valueColor"]) => {
    switch (color) {
      case "success":
        return toneStyles.success;
      case "warning":
        return toneStyles.warning;
      case "danger":
        return toneStyles.danger;
      default:
        return "";
    }
  };

  return (
    <div
      className={`${styles.card} ${showCornerBrackets ? styles.cardWithBrackets : ""} ${className}`.trim()}
      {...props}
    >
      {items.map((item, index) => (
        <div key={`${item.label}-${index}`} className={styles.item}>
          {item.icon ? <div className={styles.icon}>{item.icon}</div> : null}
          <div className={styles.info}>
            <span className={styles.label}>{item.label}</span>
            <span
              className={`${styles.value} ${item.mono ? styles.valueMono : ""} ${getValueToneClass(item.valueColor)}`.trim()}
            >
              {item.value}
            </span>
          </div>
        </div>
      ))}
      {storageProgress ? (
        <div className={styles.storageProgress}>
          <div className={styles.storageProgressLabel}>
            <span>Storage</span>
            <span className={styles.storageProgressValue}>
              {formatFileSize(storageProgress.used)} /{" "}
              {formatFileSize(storageProgress.limit)}
            </span>
          </div>
          <div
            className={styles.storageProgressBar}
            role="progressbar"
            aria-label="Storage used"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={storageRatio * 100}
          >
            <div
              className={`${styles.storageProgressFill} ${storageToneClass}`.trim()}
              style={
                {
                  "--storage-progress-width": `${Math.min(storageRatio * 100, 100)}%`,
                } as React.CSSProperties
              }
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default QuickInfoCard;
