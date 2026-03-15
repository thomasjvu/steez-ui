import React, { TextareaHTMLAttributes } from "react";

import { useStableId } from "../hooks/useStableId.js";
import styles from "./CyberpunkTextarea.module.css";

export interface CyberpunkTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  variant?: "default" | "full";
}

export function CyberpunkTextarea({
  label,
  variant = "default",
  className = "",
  id,
  ...props
}: CyberpunkTextareaProps) {
  const textareaId = useStableId("textarea", id);

  return (
    <div className={`${styles.cyberTextarea} ${styles[variant]} ${className}`.trim()}>
      {label ? (
        <label htmlFor={textareaId} className={styles.label}>
          {label}
        </label>
      ) : null}
      <div className={styles.textareaContainer}>
        <textarea id={textareaId} className={styles.textarea} {...props} />
      </div>
    </div>
  );
}
