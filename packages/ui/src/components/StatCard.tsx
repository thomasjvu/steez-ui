import React from "react";

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
  ...props
}: StatCardProps) {
  const valueToneClass =
    color === "success"
      ? styles.valueSuccess
      : color === "danger"
        ? styles.valueDanger
        : color === "warning"
          ? styles.valueWarning
          : "";

  return (
    <div
      className={`${styles.root} ${onClick ? styles.interactive : ""} ${className}`.trim()}
      onClick={onClick}
      {...props}
    >
      <div className={styles.label}>{label}</div>
      <div className={`${styles.value} ${valueToneClass}`.trim()}>{value}</div>
      {subvalue ? <div className={styles.subvalue}>{subvalue}</div> : null}
    </div>
  );
}

export default StatCard;
