"use client";

import React, { InputHTMLAttributes } from "react";

import { Field } from "./Field.tsx";
import { useFieldDescription } from "../hooks/useFieldDescription.ts";
import { useStableId } from "../hooks/useStableId.ts";
import { progressPercentage } from "../utils/numbers.ts";
import styles from "./Slider.module.css";

export interface SliderProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "helperText"> {
  label?: string;
  labelStyle?: "plain" | "notch";
  /** Diamond uses a slim track and a square thumb that rotates while held. */
  variant?: "default" | "diamond";
  min?: number;
  max?: number;
  step?: number;
  showValue?: boolean;
  helperText?: string;
  error?: string;
}

/** Fill percentage for the track; 0 when max===min or non-finite. Clamped to [0, 100]. */
export function sliderPercentage(
  value: number | string,
  min: number,
  max: number,
): number {
  return progressPercentage(Number(value), min, max);
}

export function Slider({
  label,
  labelStyle = "plain",
  variant = "default",
  className = "",
  id,
  min = 0,
  max = 100,
  step = 1,
  showValue = true,
  value,
  defaultValue,
  onChange,
  helperText,
  error,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  ...props
}: SliderProps) {
  const inputId = useStableId("slider", id);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [internalValue, setInternalValue] = React.useState<number | string>(
    (defaultValue as number | string | undefined) ?? min,
  );
  const currentValue = (value as number | string | undefined) ?? internalValue;
  const percentage = sliderPercentage(currentValue, min, max);

  React.useLayoutEffect(() => {
    const input = inputRef.current;
    if (!input || value !== undefined) return;
    const sync = () => setInternalValue(input.value);
    sync();
    // Form reset restores the DOM value after the reset event has been dispatched.
    const reset = () => queueMicrotask(sync);
    const form = input.form;
    form?.addEventListener("reset", reset);

    return () => form?.removeEventListener("reset", reset);
  }, [value, defaultValue, min, max, step, props.form]);
  const { errorId, hasError, helperId, describedBy } = useFieldDescription({
    prefix: "slider",
    helperText,
    error,
    describedBy: ariaDescribedBy,
  });

  const control = (<div className={styles.sliderContainer}>
        <div
          className={styles.track}
          style={
            {
              ["--slider-percentage" as string]: percentage,
            } as React.CSSProperties
          }
        >
          <div className={styles.trackBase} aria-hidden="true" />
          <div className={styles.fill} aria-hidden="true" />
          <input
            ref={inputRef}
            id={inputId}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            defaultValue={
              value === undefined ? (defaultValue ?? min) : undefined
            }
            className={styles.slider}
            {...props}
            onChange={(event) => {
              if (value === undefined)
                setInternalValue(event.currentTarget.value);
              onChange?.(event);
            }}
            aria-invalid={ariaInvalid ?? (hasError ? true : undefined)}
            aria-describedby={describedBy}
          />
        </div>
        {showValue ? (
          <span className={styles.value}>{currentValue}</span>
        ) : null}
      </div>);


  return (
    <div
      className={`${styles.wrapper} ${variant === "diamond" ? styles.diamond : ""} ${hasError ? styles.hasError : ""} ${className}`.trim()}
    >
      {label && labelStyle === "plain" ? (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      ) : null}
      {labelStyle === "notch" ? (
        <Field id={inputId} label={label} labelStyle="notch" invalid={ariaInvalid ?? (hasError ? true : undefined)}
          style={{ "--field-width": "100%" } as React.CSSProperties}>
          {() => <div className={styles.notchedControl}>{control}</div>}
        </Field>
      ) : control}
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
