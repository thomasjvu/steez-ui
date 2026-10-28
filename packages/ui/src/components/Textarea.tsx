"use client";

import React, { TextareaHTMLAttributes } from "react";

import { Field } from "./Field.tsx";
import { useStableId } from "../hooks/useStableId.ts";
import styles from "./Textarea.module.css";

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "helperText"> {
  label?: string;
  labelStyle?: "plain" | "notch";
  variant?: "default" | "full";
  helperText?: string;
  error?: string;
}

export function Textarea({
  label,
  labelStyle = "plain",
  variant = "default",
  className = "",
  id,
  helperText,
  error,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  ...props
}: TextareaProps) {
  const textareaId = useStableId("textarea", id);

  return (
    <Field
      id={textareaId}
      label={label}
      labelStyle={labelStyle}
      helperText={helperText}
      error={error}
      describedBy={ariaDescribedBy}
      invalid={ariaInvalid}
      className={className}
      style={
        {
          "--field-width": variant === "full" ? "100%" : "400px",
        } as React.CSSProperties
      }
    >
      {(attributes) => (
        <>
          <div>
            <textarea
              id={textareaId}
              className={styles.textarea}
              {...props}
              {...attributes}
            />
          </div>
        </>
      )}
    </Field>
  );
}
