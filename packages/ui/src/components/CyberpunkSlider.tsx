import React, { InputHTMLAttributes } from "react";

import { useStableId } from "../hooks/useStableId.js";
import styles from "./CyberpunkSlider.module.css";

export interface CyberpunkSliderProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  showValue?: boolean;
}

export function CyberpunkSlider({
  label,
  className = "",
  id,
  min = 0,
  max = 100,
  step = 1,
  showValue = true,
  value = 0,
  ...props
}: CyberpunkSliderProps) {
  const inputId = useStableId("slider", id);
  const percentage = ((Number(value) - min) / (max - min)) * 100;

  return (
    <div className={`${styles.wrapper} ${className}`.trim()}>
      {label ? (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      ) : null}
      <div className={styles.sliderContainer}>
        <input
          id={inputId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          className={styles.slider}
          style={{ ["--slider-percentage" as string]: `${percentage}%` } as React.CSSProperties}
          {...props}
        />
        {showValue ? <span className={styles.value}>{value}</span> : null}
      </div>
    </div>
  );
}
