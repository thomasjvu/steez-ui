import React, { InputHTMLAttributes } from "react";

import { useStableId } from "../hooks/useStableId.js";
import styles from "./CyberpunkRadio.module.css";

export interface CyberpunkRadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function CyberpunkRadio({ label, className = "", id, ...props }: CyberpunkRadioProps) {
  const inputId = useStableId("radio", id);

  return (
    <label htmlFor={inputId} className={`${styles.wrapper} ${className}`.trim()}>
      <input id={inputId} type="radio" className={styles.radio} {...props} />
      {label ? <span className={styles.label}>{label}</span> : null}
    </label>
  );
}

export interface CyberpunkRadioGroupProps {
  name: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function CyberpunkRadioGroup({
  name,
  options,
  value,
  onChange,
  className = "",
}: CyberpunkRadioGroupProps) {
  return (
    <div className={`${styles.radioGroup} ${className}`.trim()}>
      {options.map((option) => (
        <CyberpunkRadio
          key={option.value}
          name={name}
          value={option.value}
          label={option.label}
          checked={value === option.value}
          onChange={(event) => onChange?.(event.target.value)}
        />
      ))}
    </div>
  );
}
