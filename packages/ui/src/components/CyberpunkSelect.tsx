"use client";

import React, { SelectHTMLAttributes } from "react";

import { useFieldDescription } from "../hooks/useFieldDescription.js";
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
  error?: string;
}

export function CyberpunkSelect({
  label,
  variant = "default",
  options = [],
  className = "",
  id,
  value,
  helperText,
  error,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  ...props
}: CyberpunkSelectProps) {
  const selectId = useStableId("select", id);
  const { errorId, hasError, helperId, describedBy } = useFieldDescription({
    prefix: "select",
    helperText,
    error,
    describedBy: ariaDescribedBy,
  });

  return (
    <div
      className={`${styles.cyberSelect} ${styles[variant]} ${hasError ? styles.hasError : ""} ${className}`.trim()}
    >
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
        aria-invalid={ariaInvalid ?? (hasError ? true : undefined)}
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
      {hasError ? (
        <div id={errorId} className={styles.errorText} role="alert">
          {error}
        </div>
      ) : null}
    </div>
  );
}
