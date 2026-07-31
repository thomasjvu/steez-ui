import React, { InputHTMLAttributes, ReactNode } from "react";

import { useStableId } from "../hooks/useStableId.js";
import styles from "./CyberpunkInput.module.css";

export interface CyberpunkInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "helperText"> {
  label?: string;
  variant?: "default" | "long" | "full";
  helperText?: string;
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
  icon,
  "aria-describedby": ariaDescribedBy,
  ...props
}: CyberpunkInputProps) {
  const inputId = useStableId("input", id);
  const helperId = useStableId("input-helper");
  const isDisabledOrReadOnly = disabled || readOnly;
  const describedBy =
    [ariaDescribedBy, helperText ? helperId : undefined].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className={`${styles.cyberInput} ${styles[variant]} ${className}`.trim()}>
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
          aria-describedby={describedBy}
        />
      </div>
      {helperText ? (
        <div id={helperId} className={styles.helperText}>
          {helperText}
        </div>
      ) : null}
    </div>
  );
}
