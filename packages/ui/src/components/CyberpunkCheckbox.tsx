import React, { InputHTMLAttributes } from "react";

import { useStableId } from "../hooks/useStableId";
import styles from "./CyberpunkCheckbox.module.css";

export interface CyberpunkCheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "type"> {
  label?: string;
  onChange?: (checked: boolean) => void;
}

export function CyberpunkCheckbox({
  label,
  className = "",
  id,
  onChange,
  ...props
}: CyberpunkCheckboxProps) {
  const inputId = useStableId("checkbox", id);

  return (
    <label htmlFor={inputId} className={`${styles.wrapper} ${className}`.trim()}>
      <input
        id={inputId}
        type="checkbox"
        className={styles.checkbox}
        onChange={(event) => onChange?.(event.target.checked)}
        {...props}
      />
      {label ? <span className={styles.label}>{label}</span> : null}
    </label>
  );
}

