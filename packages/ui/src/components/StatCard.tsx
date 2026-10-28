"use client";

import React from "react";

import toneStyles from "../styles/ValueTone.module.css";
import styles from "./StatCard.module.css";

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
      ? toneStyles.success
      : color === "danger"
        ? toneStyles.danger
        : color === "warning"
          ? toneStyles.warning
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
      className={`${styles.root} ${onClick ? styles.interactive : ""} ${className}`.trim()}
      role={onClick ? (roleProp ?? "button") : roleProp}
      tabIndex={onClick ? (tabIndexProp ?? 0) : tabIndexProp}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.label}>{label}</div>
      <div className={`${styles.value} ${valueToneClass}`.trim()}>{value}</div>
      {subvalue ? <div className={styles.subvalue}>{subvalue}</div> : null}
    </div>
  );
}

export default StatCard;
