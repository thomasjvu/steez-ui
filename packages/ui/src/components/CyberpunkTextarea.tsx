"use client";

import React, { TextareaHTMLAttributes } from "react";

import { useFieldDescription } from "../hooks/useFieldDescription.ts";
import { useStableId } from "../hooks/useStableId.ts";
import styles from "./CyberpunkTextarea.module.css";

export interface CyberpunkTextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "helperText"> {
  label?: string;
  variant?: "default" | "full";
  helperText?: string;
  error?: string;
}

export function CyberpunkTextarea({
  label,
  variant = "default",
  className = "",
  id,
  helperText,
  error,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  ...props
}: CyberpunkTextareaProps) {
  const textareaId = useStableId("textarea", id);
  const { errorId, hasError, helperId, describedBy } = useFieldDescription({
    prefix: "textarea",
    helperText,
    error,
    describedBy: ariaDescribedBy,
  });

  return (
    <div
      className={`${styles.cyberTextarea} ${styles[variant]} ${hasError ? styles.hasError : ""} ${className}`.trim()}
    >
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
