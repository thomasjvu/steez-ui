"use client";

import React from "react";
import { useStableId } from "../hooks/useStableId.ts";
import { Field } from "./Field.tsx";
import styles from "./Select.module.css";

export interface SelectIcon {
  id: string;
  label: string;
  icon: React.ReactNode;
}
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  icons?: readonly SelectIcon[];
}
export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  labelStyle?: "plain" | "notch";
  variant?: "default" | "long" | "full";
  options?: readonly SelectOption[];
  helperText?: string;
  error?: string;
  /** Show decorative icons associated with the selected option. */
  iconStack?: boolean;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  /** className applies to the field; controlClassName applies to the native select. */
  controlClassName?: string;
}

/** Native selection, with optional cut label and selected-option icon stack. */
export function Select({
  label,
  labelStyle = "plain",
  variant = "default",
  options = [],
  helperText,
  error,
  iconStack = false,
  onValueChange,
  placeholder,
  className = "",
  controlClassName = "",
  id,
  value,
  defaultValue,
  onChange,
  children,
  style,
  "aria-describedby": describedBy,
  "aria-invalid": invalid,
  ...props
}: SelectProps) {
  const selectId = useStableId("select", id);
  const ref = React.useRef<HTMLSelectElement>(null);
  const [internalValue, setInternalValue] = React.useState(
    String(
      defaultValue ?? options.find((option) => !option.disabled)?.value ?? "",
    ),
  );
  const selectedValue = value === undefined ? internalValue : String(value);
  const icons = iconStack && !props.multiple
    ? (options.find((option) => option.value === selectedValue)?.icons ?? [])
    : [];
  React.useLayoutEffect(() => {
    const select = ref.current;
    if (!select || value !== undefined) return;
    const sync = () => setInternalValue(select.value);
    sync();
    const form = select.form;
    const reset = () => queueMicrotask(sync);
    form?.addEventListener("reset", reset);
    return () => form?.removeEventListener("reset", reset);
  }, [value, options, children]);
  return (
    <Field
      id={selectId}
      label={label}
      labelStyle={labelStyle}
      helperText={helperText}
      error={error}
      describedBy={describedBy}
      invalid={invalid}
      className={className}
      style={
        {
          "--field-width":
            variant === "full"
              ? "100%"
              : variant === "long"
                ? "360px"
                : "240px",
          ...style,
        } as React.CSSProperties
      }
    >
      {(attributes) => (
        <>
          <select
            {...props}
            {...attributes}
            ref={ref}
            id={selectId}
            value={value}
            defaultValue={defaultValue}
            className={`${styles.select} ${controlClassName}`.trim()}
            style={
              {
                "--select-stack-width": `${icons.length ? 28 + (icons.length - 1) * 16 + 12 : 0}px`,
              } as React.CSSProperties
            }
            onChange={(event) => {
              setInternalValue(event.target.value);
              onChange?.(event);
              onValueChange?.(event.target.value);
            }}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {children ??
              options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </option>
              ))}
          </select>
          {icons.length > 0 && (
            <span className={styles.stack} aria-hidden="true">
              {icons.map((item) => (
                <span className={styles.icon} key={item.id} title={item.label}>
                  {item.icon}
                </span>
              ))}
            </span>
          )}
          <svg
            className={styles.chevron}
            aria-hidden="true"
            width="10"
            height="8"
            viewBox="0 0 10 8"
            fill="none"
          >
            <path
              d="m1 2 4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </>
      )}
    </Field>
  );
}
