/**
 * Standalone Steez UI copy of Stat Card.
 *
 * Generated from packages/ui/src/components/StatCard.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";

const __styles_steez_stat_card_0: Record<string, string> = {
  "brackets": "steez-stat-card-0-brackets",
};

const __styles_steez_stat_card_1: Record<string, string> = {
  "success": "steez-stat-card-1-success",
  "warning": "steez-stat-card-1-warning",
  "danger": "steez-stat-card-1-danger",
};

const __styles_steez_stat_card_2: Record<string, string> = {
  "root": "steez-stat-card-2-root",
  "bracketed": "steez-stat-card-2-bracketed",
  "interactive": "steez-stat-card-2-interactive",
  "label": "steez-stat-card-2-label",
  "value": "steez-stat-card-2-value",
  "subvalue": "steez-stat-card-2-subvalue",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/styles/CornerBrackets.module.css */
/*
 * Shared card treatment: offset L-brackets outside the top-left and
 * bottom-right corners. Used by Card (variant="brackets"), QuickInfoCard and
 * StatCard. Override --bracket-size / --bracket-color per surface.
 */
.steez-stat-card-0-brackets {
  position: relative;
  overflow: visible;
}

.steez-stat-card-0-brackets::before,
.steez-stat-card-0-brackets::after {
  content: "";
  position: absolute;
  width: var(--bracket-size, 0.5rem);
  height: var(--bracket-size, 0.5rem);
  border: 0 solid var(--bracket-color, var(--border-color, rgba(203, 203, 204, 0.2)));
  pointer-events: none;
}

.steez-stat-card-0-brackets::before {
  top: calc(var(--bracket-size, 0.5rem) * -1);
  left: calc(var(--bracket-size, 0.5rem) * -1);
  border-top-width: 1px;
  border-left-width: 1px;
}

.steez-stat-card-0-brackets::after {
  right: calc(var(--bracket-size, 0.5rem) * -1);
  bottom: calc(var(--bracket-size, 0.5rem) * -1);
  border-right-width: 1px;
  border-bottom-width: 1px;
}


/* packages/ui/src/styles/ValueTone.module.css */
.steez-stat-card-1-success { color: var(--color-status-success, #00ff88); }
.steez-stat-card-1-warning { color: var(--color-status-warning, #ff9800); }
.steez-stat-card-1-danger { color: var(--color-status-error, #ee1401); }


/* packages/ui/src/components/StatCard.module.css */
.steez-stat-card-2-root {
  cursor: default;
  transition: color 220ms ease;
}

.steez-stat-card-2-bracketed {
  padding: 0.75rem 1rem;
}

.steez-stat-card-2-interactive {
  cursor: pointer;
}

.steez-stat-card-2-label {
  margin-bottom: 0.25rem;
  color: var(--text-secondary, #999999);
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.steez-stat-card-2-value {
  color: var(--text-primary, #cbcbcc);
  font-size: 1.5rem;
  font-weight: 600;
}

.steez-stat-card-2-subvalue {
  margin-top: 0.125rem;
  color: var(--text-secondary, #999999);
  font-size: 0.75rem;
}
`;
const __steezStandaloneStyleKey = "stat-card";

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

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  subvalue?: string;
  onClick?: () => void;
  color?: "default" | "success" | "danger" | "warning";
  /** Offset corner brackets shared with Card and QuickInfoCard. */
  brackets?: boolean;
}

export function StatCard({
  label,
  value,
  subvalue,
  onClick,
  color = "default",
  brackets = false,
  className = "",
  onKeyDown: onKeyDownProp,
  role: roleProp,
  tabIndex: tabIndexProp,
  ...props
}: StatCardProps) {
  const valueToneClass =
    color === "success"
      ? __styles_steez_stat_card_1.success
      : color === "danger"
        ? __styles_steez_stat_card_1.danger
        : color === "warning"
          ? __styles_steez_stat_card_1.warning
          : "";
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDownProp?.(event);
    if (
      !onClick ||
      event.defaultPrevented ||
      event.target !== event.currentTarget
    ) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div
      {...props}
      className={`${__styles_steez_stat_card_2.root} ${onClick ? __styles_steez_stat_card_2.interactive : ""} ${brackets ? `${__styles_steez_stat_card_2.bracketed} ${__styles_steez_stat_card_0.brackets}` : ""} ${className}`.trim()}
      role={onClick ? (roleProp ?? "button") : roleProp}
      tabIndex={onClick ? (tabIndexProp ?? 0) : tabIndexProp}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <div className={__styles_steez_stat_card_2.label}>{label}</div>
      <div className={`${__styles_steez_stat_card_2.value} ${valueToneClass}`.trim()}>{value}</div>
      {subvalue ? <div className={__styles_steez_stat_card_2.subvalue}>{subvalue}</div> : null}
    </div>
  );
}

export default StatCard;
