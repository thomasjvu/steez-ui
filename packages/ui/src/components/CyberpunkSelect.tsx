import React, { SelectHTMLAttributes } from "react";

import { useStableId } from "../hooks/useStableId";
import styles from "./CyberpunkSelect.module.css";

export interface CyberpunkSelectOption {
  value: string;
  label: string;
}

export interface CyberpunkSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  variant?: "default" | "long" | "full";
  options?: CyberpunkSelectOption[];
}

export function CyberpunkSelect({
  label,
  variant = "default",
  options = [],
  className = "",
  id,
  value,
  ...props
}: CyberpunkSelectProps) {
  const selectId = useStableId("select", id);

  return (
    <div className={`${styles.cyberSelect} ${styles[variant]} ${className}`.trim()}>
      {label ? (
        <label htmlFor={selectId} className={styles.label}>
          {label}
        </label>
      ) : null}
      <select id={selectId} className={styles.select} value={value} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className={styles.arrow}>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
          <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

