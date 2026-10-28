"use client";

import React, { InputHTMLAttributes, ReactNode } from "react";

import { Field } from "./Field.tsx";
import { useStableId } from "../hooks/useStableId.ts";
import styles from "./Input.module.css";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "helperText"> {
  label?: string;
  labelStyle?: "plain" | "notch";
  variant?: "default" | "long" | "full";
  helperText?: string;
  /** Field-level error message; sets aria-invalid and joins aria-describedby. */
  error?: string;
  icon?: ReactNode;
}

export function Input({
  label,
  labelStyle = "plain",
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
}: InputProps) {
  const inputId = useStableId("input", id);

  return (
    <Field
      id={inputId}
      label={label}
      labelStyle={labelStyle}
      helperText={helperText}
      error={error}
      describedBy={ariaDescribedBy}
      invalid={ariaInvalid}
      className={className}
      style={
        {
          "--field-width":
            variant === "full"
              ? "100%"
              : variant === "long"
                ? "360px"
                : "240px",
        } as React.CSSProperties
      }
    >
      {(attributes) => (
        <>
          <div className={icon ? styles.withIcon : undefined}>
            {icon ? <div className={styles.icon}>{icon}</div> : null}
            <input
              id={inputId}
              className={styles.input}
              disabled={disabled}
              readOnly={readOnly}
              {...props}
              {...attributes}
            />
          </div>
        </>
      )}
    </Field>
  );
}
