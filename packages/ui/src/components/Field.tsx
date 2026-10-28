"use client";

import React from "react";
import { useFieldDescription } from "../hooks/useFieldDescription.ts";
import styles from "./Field.module.css";

export interface FieldProps {
  id: string;
  label?: string;
  labelStyle?: "plain" | "notch";
  helperText?: string;
  error?: string;
  describedBy?: string;
  invalid?: React.AriaAttributes["aria-invalid"];
  className?: string;
  style?: React.CSSProperties;
  children: (attributes: {
    "aria-describedby": string | undefined;
    "aria-invalid": React.AriaAttributes["aria-invalid"];
  }) => React.ReactNode;
}

/** Shared label, control frame, and descriptions for text fields and selects. */
export function Field({
  id,
  label,
  labelStyle = "plain",
  helperText,
  error,
  describedBy,
  invalid,
  className = "",
  style,
  children,
}: FieldProps) {
  const description = useFieldDescription({
    prefix: id,
    helperText,
    error,
    describedBy,
  });
  return (
    <div
      className={`${styles.field} ${className}`.trim()}
      style={style}
      data-label-style={labelStyle}
      data-error={description.hasError || invalid === true || invalid === "true" || undefined}
    >
      {label && labelStyle === "plain" && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.control}>
        {label && labelStyle === "notch" && (
          <label htmlFor={id} className={`${styles.label} ${styles.notchLabel}`}>
            {label}
          </label>
        )}
        {children({
          "aria-describedby": description.describedBy,
          "aria-invalid": invalid ?? (description.hasError ? true : undefined),
        })}
      </div>
      {helperText && (
        <div id={description.helperId} className={styles.helper}>
          {helperText}
        </div>
      )}
      {description.hasError && (
        <div id={description.errorId} className={styles.error} role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
