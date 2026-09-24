/**
 * Standalone Steez UI copy of Quick Info Card.
 *
 * Generated from packages/ui/src/components/QuickInfoCard.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";

const __styles_steez_quick_info_card_0: Record<string, string> = {
  "card": "steez-quick-info-card-0-card",
  "cardWithBrackets": "steez-quick-info-card-0-cardWithBrackets",
  "item": "steez-quick-info-card-0-item",
  "icon": "steez-quick-info-card-0-icon",
  "info": "steez-quick-info-card-0-info",
  "label": "steez-quick-info-card-0-label",
  "value": "steez-quick-info-card-0-value",
  "valueMono": "steez-quick-info-card-0-valueMono",
  "valueSuccess": "steez-quick-info-card-0-valueSuccess",
  "valueWarning": "steez-quick-info-card-0-valueWarning",
  "valueDanger": "steez-quick-info-card-0-valueDanger",
  "storageProgress": "steez-quick-info-card-0-storageProgress",
  "storageProgressLabel": "steez-quick-info-card-0-storageProgressLabel",
  "storageProgressValue": "steez-quick-info-card-0-storageProgressValue",
  "storageProgressBar": "steez-quick-info-card-0-storageProgressBar",
  "storageProgressFill": "steez-quick-info-card-0-storageProgressFill",
  "storageWarning": "steez-quick-info-card-0-storageWarning",
  "storageDanger": "steez-quick-info-card-0-storageDanger",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/QuickInfoCard.module.css */
.steez-quick-info-card-0-card {
  display: flex;
  gap: 1.5rem;
  padding: 1rem 1.5rem;
  margin: 0.75rem;
  background: var(--bg-secondary, #0a0a0a);
  border: 1px solid var(--border-color, rgba(203, 203, 204, 0.2));
  flex-wrap: wrap;
  position: relative;
  overflow: visible;
}

.steez-quick-info-card-0-cardWithBrackets::before {
  content: "";
  position: absolute;
  top: -0.5rem;
  left: -0.5rem;
  width: 0.5rem;
  height: 0.5rem;
  border-top: 1px solid var(--border-color, rgba(203, 203, 204, 0.2));
  border-left: 1px solid var(--border-color, rgba(203, 203, 204, 0.2));
}

.steez-quick-info-card-0-cardWithBrackets::after {
  content: "";
  position: absolute;
  bottom: -0.5rem;
  right: -0.5rem;
  width: 0.5rem;
  height: 0.5rem;
  border-bottom: 1px solid var(--border-color, rgba(203, 203, 204, 0.2));
  border-right: 1px solid var(--border-color, rgba(203, 203, 204, 0.2));
}

.steez-quick-info-card-0-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  min-width: 150px;
}

.steez-quick-info-card-0-icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  color: var(--accent-primary, #ee1401);
}

.steez-quick-info-card-0-icon :global(svg) {
  width: 1.25rem;
  height: 1.25rem;
}

.steez-quick-info-card-0-info {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  flex: 1;
}

.steez-quick-info-card-0-label {
  color: var(--text-secondary, #999999);
  font-size: 0.6875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.steez-quick-info-card-0-value {
  color: var(--text-primary, #cbcbcc);
  font-size: 1rem;
  font-weight: 600;
}

.steez-quick-info-card-0-valueMono {
  font-family: var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
}

.steez-quick-info-card-0-valueSuccess {
  color: var(--color-success, #10b981);
}

.steez-quick-info-card-0-valueWarning {
  color: var(--color-warning, #f59e0b);
}

.steez-quick-info-card-0-valueDanger {
  color: var(--color-error, #ef4444);
}

.steez-quick-info-card-0-storageProgress {
  flex: 1;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.steez-quick-info-card-0-storageProgressLabel {
  display: flex;
  justify-content: space-between;
  color: var(--text-secondary, #999999);
  font-size: 0.6875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.steez-quick-info-card-0-storageProgressValue {
  color: var(--text-primary, #cbcbcc);
  font-family: var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
  font-weight: 600;
}

.steez-quick-info-card-0-storageProgressBar {
  height: 8px;
  background: color-mix(in srgb, var(--bg-primary, #010607) 82%, transparent);
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--border-color, rgba(203, 203, 204, 0.2));
}

.steez-quick-info-card-0-storageProgressFill {
  height: 100%;
  width: var(--storage-progress-width, 0%);
  background: var(--accent-primary, #ee1401);
  border-radius: 3px;
  transition: width 220ms ease;
}

.steez-quick-info-card-0-storageWarning {
  background: var(--color-warning, #f59e0b);
}

.steez-quick-info-card-0-storageDanger {
  background: var(--color-error, #ef4444);
}
`;
const __steezStandaloneStyleKey = "quick-info-card";

function __injectSteezStandaloneStyles() {
  if (typeof document === "undefined" || document.querySelector(`style[data-steez-standalone="${__steezStandaloneStyleKey}"]`)) {
    return;
  }

  const style = document.createElement("style");
  style.setAttribute("data-steez-standalone", __steezStandaloneStyleKey);
  style.textContent = __steezStandaloneStyles;
  document.head.appendChild(style);
}

__injectSteezStandaloneStyles();

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

export interface QuickInfoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  items: QuickInfoItem[];
  storageProgress?: StorageProgress;
  showCornerBrackets?: boolean;
}

function formatFileSize(bytes: number) {
  if (bytes === 0) {
    return "0 Bytes";
  }

  const base = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const unitIndex = Math.floor(Math.log(bytes) / Math.log(base));
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
    ? storageProgress.used / Math.max(storageProgress.limit, 1)
    : 0;
  const storageToneClass =
    storageRatio > 0.9
      ? __styles_steez_quick_info_card_0.storageDanger
      : storageRatio > 0.7
        ? __styles_steez_quick_info_card_0.storageWarning
        : "";

  const getValueToneClass = (color?: QuickInfoItem["valueColor"]) => {
    switch (color) {
      case "success":
        return __styles_steez_quick_info_card_0.valueSuccess;
      case "warning":
        return __styles_steez_quick_info_card_0.valueWarning;
      case "danger":
        return __styles_steez_quick_info_card_0.valueDanger;
      default:
        return "";
    }
  };

  return (
    <div
      className={`${__styles_steez_quick_info_card_0.card} ${showCornerBrackets ? __styles_steez_quick_info_card_0.cardWithBrackets : ""} ${className}`.trim()}
      {...props}
    >
      {items.map((item, index) => (
        <div key={`${item.label}-${index}`} className={__styles_steez_quick_info_card_0.item}>
          {item.icon ? <div className={__styles_steez_quick_info_card_0.icon}>{item.icon}</div> : null}
          <div className={__styles_steez_quick_info_card_0.info}>
            <span className={__styles_steez_quick_info_card_0.label}>{item.label}</span>
            <span
              className={`${__styles_steez_quick_info_card_0.value} ${item.mono ? __styles_steez_quick_info_card_0.valueMono : ""} ${getValueToneClass(item.valueColor)}`.trim()}
            >
              {item.value}
            </span>
          </div>
        </div>
      ))}
      {storageProgress ? (
        <div className={__styles_steez_quick_info_card_0.storageProgress}>
          <div className={__styles_steez_quick_info_card_0.storageProgressLabel}>
            <span>Storage</span>
            <span className={__styles_steez_quick_info_card_0.storageProgressValue}>
              {formatFileSize(storageProgress.used)} /{" "}
              {formatFileSize(storageProgress.limit)}
            </span>
          </div>
          <div className={__styles_steez_quick_info_card_0.storageProgressBar}>
            <div
              className={`${__styles_steez_quick_info_card_0.storageProgressFill} ${storageToneClass}`.trim()}
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
