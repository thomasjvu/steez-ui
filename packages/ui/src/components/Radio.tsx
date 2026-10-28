"use client";

import React, { InputHTMLAttributes } from "react";

import { Field } from "./Field.tsx";
import { ChoiceLabel } from "./ChoiceLabel.tsx";
import { useStableId } from "../hooks/useStableId.ts";
import choiceStyles from "./ChoiceControl.module.css";
import styles from "./Radio.module.css";

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  labelStyle?: "plain" | "notch";
}

export function Radio({ label, labelStyle, className = "", id, ...props }: RadioProps) {
  const inputId = useStableId("radio", id);

  return (
    <ChoiceLabel id={inputId} label={label} labelStyle={labelStyle} className={className}>
      <input id={inputId} className={`${choiceStyles.control} ${choiceStyles.radio}`} {...props} type="radio" />
    </ChoiceLabel>
  );
}

export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  name: string;
  options: { value: string; label: string; disabled?: boolean }[];
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
  className?: string;
  labelStyle?: "plain" | "notch";
  /** Accessible name for the radiogroup (maps to aria-label). */
  label?: string;
}

export function RadioGroup({
  name,
  options,
  value,
  defaultValue,
  disabled,
  onValueChange,
  className = "",
  label,
  labelStyle = "plain",
  ...props
}: RadioGroupProps) {
  const groupId = useStableId("radio-group");
  const firstEnabled = Math.max(0, options.findIndex(option => !option.disabled));
  const group = (
    <div
      {...props}
      role="radiogroup"
      aria-label={props["aria-label"] ?? label ?? undefined}
      className={`${styles.radioGroup} ${labelStyle === "notch" ? styles.notchedGroup : className}`.trim()}
    >
      {options.map((option, index) => (
        <Radio
          key={option.value}
          id={`${groupId}-${index}`}
          name={name}
          value={option.value}
          label={option.label}
          checked={value === undefined ? undefined : value === option.value}
          defaultChecked={value === undefined ? defaultValue === option.value : undefined}
          disabled={disabled || option.disabled}
          onChange={(event) => {
            onValueChange?.(event.target.value);
                  }}
        />
      ))}
    </div>
  );
  return labelStyle === "notch" ? <Field id={`${groupId}-${firstEnabled}`} label={label}
    labelStyle="notch" className={className}>{() => group}</Field> : group;
}
