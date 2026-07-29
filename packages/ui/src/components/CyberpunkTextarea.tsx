import React, { TextareaHTMLAttributes } from "react";

import { useStableId } from "../hooks/useStableId.js";
import styles from "./CyberpunkTextarea.module.css";

export interface CyberpunkTextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "helperText"> {
  label?: string;
  variant?: "default" | "full";
  helperText?: string;
}

export function CyberpunkTextarea({
  label,
  variant = "default",
  className = "",
  id,
  helperText,
  ...props
}: CyberpunkTextareaProps) {
  const textareaId = useStableId("textarea", id);
  const helperId = useStableId("textarea-helper");

  return (
    <div className={`${styles.cyberTextarea} ${styles[variant]} ${className}`.trim()}>
      {label ? (
        <label htmlFor={textareaId} className={styles.label}>
          {label}
        </label>
      ) : null}
      <div className={styles.textareaContainer}>
        <textarea
          id={textareaId}
          className={styles.textarea}
          {...props}
          aria-describedby={helperText ? helperId : undefined}
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
