"use client";

import React, { InputHTMLAttributes } from "react";

import { ChoiceLabel } from "./ChoiceLabel.tsx";
import { useStableId } from "../hooks/useStableId.ts";
import styles from "./ChoiceControl.module.css";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  labelStyle?: "plain" | "notch";
  onCheckedChange?: (checked: boolean) => void;
}

export function Checkbox({
  label,
  labelStyle,
  className = "",
  id,
  onChange,
  onCheckedChange,
  ...props
}: CheckboxProps) {
  const inputId = useStableId("checkbox", id);

  return (
    <ChoiceLabel id={inputId} label={label} labelStyle={labelStyle} className={className}>
      <input
        id={inputId}
        className={styles.control}
        onChange={(event) => {
          onCheckedChange?.(event.target.checked);
          onChange?.(event);
        }}
        {...props}
        type="checkbox"
      />
    </ChoiceLabel>
  );
}
