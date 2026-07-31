import React, { SelectHTMLAttributes } from "react";

import { useStableId } from "../hooks/useStableId.js";
import styles from "./CyberpunkSelect.module.css";

export interface CyberpunkSelectOption {
  value: string;
  label: string;
}

export interface CyberpunkSelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "helperText"> {
  label?: string;
  variant?: "default" | "long" | "full";
  options?: CyberpunkSelectOption[];
  helperText?: string;
}

export function CyberpunkSelect({
  label,
  variant = "default",
  options = [],
  className = "",
  id,
  value,
  helperText,
  "aria-describedby": ariaDescribedBy,
  ...props
}: CyberpunkSelectProps) {
  const selectId = useStableId("select", id);
  const helperId = useStableId("select-helper");
  const describedBy =
    [ariaDescribedBy, helperText ? helperId : undefined].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className={`${styles.cyberSelect} ${styles[variant]} ${className}`.trim()}>
      {label ? (
        <label htmlFor={selectId} className={styles.label}>
          {label}
        </label>
      ) : null}
      <select
        id={selectId}
        className={styles.select}
        value={value}
        {...props}
        aria-describedby={describedBy}
      >
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
      {helperText ? (
        <div id={helperId} className={styles.helperText}>
          {helperText}
        </div>
      ) : null}
    </div>
  );
}
