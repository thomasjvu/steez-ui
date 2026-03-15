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
  ...props
}: CyberpunkInputProps) {
  const inputId = useStableId("input", id);
  const isDisabledOrReadOnly = disabled || readOnly;

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
        <input id={inputId} className={styles.input} disabled={disabled} readOnly={readOnly} {...props} />
      </div>
      {helperText ? <div className={styles.helperText}>{helperText}</div> : null}
    </div>
  );
}
