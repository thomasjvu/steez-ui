/**
 * Standalone Steez UI copy of Widget Card.
 *
 * Generated from packages/ui/src/components/WidgetCard.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";

const __styles_steez_widget_card_0: Record<string, string> = {
  "widgetXsA": "steez-widget-card-0-widgetXsA",
  "widgetXsB": "steez-widget-card-0-widgetXsB",
  "widgetSmA": "steez-widget-card-0-widgetSmA",
  "widgetSmB": "steez-widget-card-0-widgetSmB",
  "header": "steez-widget-card-0-header",
  "titleRow": "steez-widget-card-0-titleRow",
  "icon": "steez-widget-card-0-icon",
  "title": "steez-widget-card-0-title",
  "body": "steez-widget-card-0-body",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/WidgetCard.module.css */
.steez-widget-card-0-widgetXsA,
.steez-widget-card-0-widgetXsB,
.steez-widget-card-0-widgetSmA,
.steez-widget-card-0-widgetSmB {
  background: var(--border-color, rgba(203, 203, 204, 0.2));
  border: none;
  border-radius: 2px;
  overflow: hidden;
  transition: background 200ms ease;
}

.steez-widget-card-0-widgetXsA:hover,
.steez-widget-card-0-widgetXsB:hover,
.steez-widget-card-0-widgetSmA:hover,
.steez-widget-card-0-widgetSmB:hover {
  background: var(--text-primary, #cbcbcc);
}

.steez-widget-card-0-widgetXsA {
  grid-column: span 1;
  grid-row: span 1;
  min-height: 180px;
}

.steez-widget-card-0-widgetXsB {
  grid-column: span 1;
  grid-row: span 2;
  min-height: 360px;
}

.steez-widget-card-0-widgetSmA {
  grid-column: span 2;
  grid-row: span 1;
  min-height: 180px;
}

.steez-widget-card-0-widgetSmB {
  grid-column: span 2;
  grid-row: span 2;
  min-height: 360px;
}

.steez-widget-card-0-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-color, rgba(203, 203, 204, 0.2));
}

.steez-widget-card-0-titleRow {
  display: flex;
  align-items: center;
  gap: 8px;
}

.steez-widget-card-0-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.steez-widget-card-0-title {
  margin: 0;
  color: var(--text-primary, #cbcbcc);
  font-family: var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.steez-widget-card-0-body {
  padding: 12px 16px;
}
`;
const __steezStandaloneStyleKey = "widget-card";

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

export type WidgetSize = "xs-a" | "xs-b" | "sm-a" | "sm-b";

export interface WidgetCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  size?: WidgetSize | "sm" | "md" | "lg";
  overlay?: React.ReactNode;
}

export function WidgetCard({
  title,
  icon,
  children,
  size = "sm-b",
  className = "",
  overlay,
  style,
  ...props
}: WidgetCardProps) {
  const sizeClassMap: Record<Exclude<WidgetCardProps["size"], undefined>, string> =
    {
      "xs-a": __styles_steez_widget_card_0.widgetXsA,
      "xs-b": __styles_steez_widget_card_0.widgetXsB,
      "sm-a": __styles_steez_widget_card_0.widgetSmA,
      "sm-b": __styles_steez_widget_card_0.widgetSmB,
      sm: __styles_steez_widget_card_0.widgetSmA,
      md: __styles_steez_widget_card_0.widgetSmB,
      lg: __styles_steez_widget_card_0.widgetSmB,
    };
  const sizeClass = sizeClassMap[size] || __styles_steez_widget_card_0.widgetSmB;

  return (
    <div
      className={`${sizeClass} ${className}`.trim()}
      style={{ position: "relative", ...style }}
      {...props}
    >
      {title ? (
        <div className={__styles_steez_widget_card_0.header}>
          <div className={__styles_steez_widget_card_0.titleRow}>
            {icon ? <div className={__styles_steez_widget_card_0.icon}>{icon}</div> : null}
            <h3 className={__styles_steez_widget_card_0.title}>{title}</h3>
          </div>
        </div>
      ) : null}
      <div className={__styles_steez_widget_card_0.body}>{children}</div>
      {overlay}
    </div>
  );
}

export default WidgetCard;
