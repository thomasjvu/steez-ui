"use client";

import React, { InputHTMLAttributes, ReactNode } from "react";

import { useFieldDescription } from "../hooks/useFieldDescription.js";
import { useStableId } from "../hooks/useStableId.js";
import styles from "./CyberpunkInput.module.css";

export interface CyberpunkInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "helperText"> {
  label?: string;
  variant?: "default" | "long" | "full";
  helperText?: string;
  /** Field-level error message; sets aria-invalid and joins aria-describedby. */
  error?: string;
  icon?: ReactNode;
}

export function CyberpunkInput({
  label,
  variant = "default",
  className = "",
  id,
  disabled,
  readOnly,
  helperText,
  error,
  icon,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  ...props
}: CyberpunkInputProps) {
  const inputId = useStableId("input", id);
  const isDisabledOrReadOnly = disabled || readOnly;
  const { errorId, hasError, helperId, describedBy } = useFieldDescription({
    prefix: "input",
    helperText,
    error,
    describedBy: ariaDescribedBy,
  });

  return (
    <div
      className={`${styles.cyberInput} ${styles[variant]} ${hasError ? styles.hasError : ""} ${className}`.trim()}
    >
      {label ? (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      ) : null}
      <div
        className={`${styles.inputContainer} ${isDisabledOrReadOnly ? styles.disabledContainer : ""} ${icon ? styles.withIcon : ""}`.trim()}
      >
        {icon ? <div className={styles.icon}>{icon}</div> : null}
        <input
          id={inputId}
          className={styles.input}
          disabled={disabled}
          readOnly={readOnly}
          {...props}
          aria-invalid={ariaInvalid ?? (hasError ? true : undefined)}
          aria-describedby={describedBy}
        />
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
