import React from "react";

import styles from "./WidgetCard.module.css";

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
      "xs-a": styles.widgetXsA,
      "xs-b": styles.widgetXsB,
      "sm-a": styles.widgetSmA,
      "sm-b": styles.widgetSmB,
      sm: styles.widgetSmA,
      md: styles.widgetSmB,
      lg: styles.widgetSmB,
    };
  const sizeClass = sizeClassMap[size] || styles.widgetSmB;

  return (
    <div
      className={`${sizeClass} ${className}`.trim()}
      style={{ position: "relative", ...style }}
      {...props}
    >
      {title ? (
        <div className={styles.header}>
          <div className={styles.titleRow}>
            {icon ? <div className={styles.icon}>{icon}</div> : null}
            <h3 className={styles.title}>{title}</h3>
          </div>
        </div>
      ) : null}
      <div className={styles.body}>{children}</div>
      {overlay}
    </div>
  );
}

export default WidgetCard;
