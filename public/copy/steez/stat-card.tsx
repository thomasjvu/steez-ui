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
  "root": "steez-stat-card-0-root",
  "interactive": "steez-stat-card-0-interactive",
  "label": "steez-stat-card-0-label",
  "value": "steez-stat-card-0-value",
  "valueSuccess": "steez-stat-card-0-valueSuccess",
  "valueDanger": "steez-stat-card-0-valueDanger",
  "valueWarning": "steez-stat-card-0-valueWarning",
  "subvalue": "steez-stat-card-0-subvalue",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/StatCard.module.css */
.steez-stat-card-0-root {
  cursor: default;
  transition: color 220ms ease;
}

.steez-stat-card-0-interactive {
  cursor: pointer;
}

.steez-stat-card-0-label {
  margin-bottom: 0.25rem;
  color: var(--text-secondary, #999999);
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.steez-stat-card-0-value {
  color: var(--text-primary, #cbcbcc);
  font-size: 1.5rem;
  font-weight: 600;
}

.steez-stat-card-0-valueSuccess {
  color: var(--color-success, #10b981);
}

.steez-stat-card-0-valueDanger {
  color: var(--color-error, #ef4444);
}

.steez-stat-card-0-valueWarning {
  color: var(--color-warning, #f59e0b);
}

.steez-stat-card-0-subvalue {
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
}

export function StatCard({
  label,
  value,
  subvalue,
  onClick,
  color = "default",
  className = "",
  onKeyDown: onKeyDownProp,
  role: roleProp,
  tabIndex: tabIndexProp,
  ...props
}: StatCardProps) {
  const valueToneClass =
    color === "success"
      ? __styles_steez_stat_card_0.valueSuccess
      : color === "danger"
        ? __styles_steez_stat_card_0.valueDanger
        : color === "warning"
          ? __styles_steez_stat_card_0.valueWarning
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
      className={`${__styles_steez_stat_card_0.root} ${onClick ? __styles_steez_stat_card_0.interactive : ""} ${className}`.trim()}
      role={onClick ? roleProp ?? "button" : roleProp}
      tabIndex={onClick ? tabIndexProp ?? 0 : tabIndexProp}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <div className={__styles_steez_stat_card_0.label}>{label}</div>
      <div className={`${__styles_steez_stat_card_0.value} ${valueToneClass}`.trim()}>{value}</div>
      {subvalue ? <div className={__styles_steez_stat_card_0.subvalue}>{subvalue}</div> : null}
    </div>
  );
}

export default StatCard;
