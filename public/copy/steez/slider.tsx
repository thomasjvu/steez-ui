/**
 * Standalone Steez UI copy of Slider.
 *
 * Generated from packages/ui/src/components/Slider.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";
import { useId } from "react";
import type { InputHTMLAttributes } from "react";

const __styles_steez_slider_0: Record<string, string> = {
  "field": "steez-slider-0-field",
  "label": "steez-slider-0-label",
  "control": "steez-slider-0-control",
  "notchLabel": "steez-slider-0-notchLabel",
  "error": "steez-slider-0-error",
  "helper": "steez-slider-0-helper",
};

const __styles_steez_slider_1: Record<string, string> = {
  "wrapper": "steez-slider-1-wrapper",
  "label": "steez-slider-1-label",
  "sliderContainer": "steez-slider-1-sliderContainer",
  "track": "steez-slider-1-track",
  "trackBase": "steez-slider-1-trackBase",
  "fill": "steez-slider-1-fill",
  "slider": "steez-slider-1-slider",
  "value": "steez-slider-1-value",
  "helperText": "steez-slider-1-helperText",
  "hasError": "steez-slider-1-hasError",
  "errorText": "steez-slider-1-errorText",
  "diamond": "steez-slider-1-diamond",
  "notchedControl": "steez-slider-1-notchedControl",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/Field.module.css */
.steez-slider-0-field {
  width: var(--field-width, 240px);
  max-width: 100%;
  font-size: var(--field-font-size, 1rem);
  margin-bottom: 1rem;
}
.steez-slider-0-label {
  display: block;
  font: 500 var(--label-font-size, 0.85rem) / 1.2 var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
  color: var(--text-secondary, #999999);
  margin-bottom: 0.5rem;
}
.steez-slider-0-control {
  position: relative;
  border: 1px solid var(--color-border-default, #2a2a2a);
  background: var(--field-background, var(--color-bg-tile, #0a0a0a));
  border-radius: var(--field-radius, 6px);
}
.steez-slider-0-control:hover {
  border-color: var(--color-border-hover, #3a3a3a);
}
.steez-slider-0-control:focus-within {
  border-color: var(--focus-border-color, var(--color-accent-primary, #ee1401));
  outline: 1px solid var(--focus-border-color, var(--color-accent-primary, #ee1401));
  outline-offset: 1px;
}
.steez-slider-0-field:focus-within .steez-slider-0-label {
  color: var(--focus-border-color, var(--color-accent-primary, #ee1401));
}
.steez-slider-0-field[data-label-style="notch"] {
  padding-top: 0.6rem;
}
.steez-slider-0-notchLabel {
  position: absolute;
  top: 0;
  left: var(--label-offset-left, 12px);
  transform: translateY(-50%);
  background: var(--field-background, var(--color-bg-tile, #0a0a0a));
  padding: var(--label-padding, 1px 8px);
  margin: 0;
  max-width: calc(100% - 24px);
  z-index: 1;
}
.steez-slider-0-control:has(input:disabled, select:disabled, textarea:disabled) {
  opacity: 0.6;
}
.steez-slider-0-control:has([readonly]) {
  background: var(--color-bg-secondary, #0a0a0a);
}
.steez-slider-0-field[data-error] .steez-slider-0-control {
  border-color: var(--danger, #ff5c5c);
}
.steez-slider-0-field[data-error] .steez-slider-0-label,
.steez-slider-0-error {
  color: var(--danger, #ff5c5c);
}
.steez-slider-0-helper,
.steez-slider-0-error {
  margin-top: 0.4rem;
  font: 0.75rem/1.4 var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
}
.steez-slider-0-helper {
  color: var(--text-secondary, #999999);
}

.steez-slider-0-field[data-error] .steez-slider-0-control:focus-within { outline-color: var(--danger, #ff5c5c); }


/* packages/ui/src/components/Slider.module.css */
.steez-slider-1-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.steez-slider-1-label {
  font-size: 0.875rem;
  color: var(--text-primary, #cbcbcc);
  font-weight: 500;
}

.steez-slider-1-sliderContainer {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.steez-slider-1-track {
  --thumb-size: 28px;
  position: relative;
  flex: 1;
  height: 32px;
  display: flex;
  align-items: center;
}

.steez-slider-1-trackBase {
  position: absolute;
  inset-inline: 0;
  height: var(--thumb-size);
  border: 2px solid var(--border, #2a2a2a);
  border-radius: calc(var(--thumb-size) / 2);
  background: var(--bg-primary, #010607);
  pointer-events: none;
  transition: border-color var(--transition-fast, 150ms ease);
}

.steez-slider-1-fill {
  position: absolute;
  left: 0;
  height: var(--thumb-size);
  border-radius: calc(var(--thumb-size) / 2);
  background: var(--success, #00ff88);
  /* Meet the thumb center at every value — no gap, no overshoot past the knob. */
  width: calc(
    (var(--thumb-size) / 2) +
      (100% - var(--thumb-size)) * var(--slider-percentage, 0) / 100
  );
  pointer-events: none;
  transition: width var(--transition-fast, 150ms ease);
}

.steez-slider-1-slider {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 32px;
  margin: 0;
  padding: 0;
  appearance: none;
  background: transparent;
  outline: none;
  cursor: pointer;
}

.steez-slider-1-slider::-webkit-slider-runnable-track {
  height: var(--thumb-size);
  background: transparent;
  border: none;
}

.steez-slider-1-slider::-webkit-slider-thumb {
  appearance: none;
  width: var(--thumb-size);
  height: var(--thumb-size);
  margin-top: 0;
  border-radius: 50%;
  background: var(--success, #00ff88);
  cursor: pointer;
  border: 2px solid color-mix(in srgb, var(--success, #00ff88) 35%, transparent);
  box-shadow: 0 0 10px color-mix(in srgb, var(--success, #00ff88) 40%, transparent);
  transition: box-shadow var(--transition-fast, 150ms ease), border-color var(--transition-fast, 150ms ease);
}

.steez-slider-1-slider::-moz-range-track {
  height: var(--thumb-size);
  background: transparent;
  border: none;
}

.steez-slider-1-slider::-moz-range-thumb {
  width: var(--thumb-size);
  height: var(--thumb-size);
  border-radius: 50%;
  background: var(--success, #00ff88);
  cursor: pointer;
  border: 2px solid color-mix(in srgb, var(--success, #00ff88) 35%, transparent);
  box-shadow: 0 0 10px color-mix(in srgb, var(--success, #00ff88) 40%, transparent);
  transition: box-shadow var(--transition-fast, 150ms ease), border-color var(--transition-fast, 150ms ease);
}

.steez-slider-1-track:hover .steez-slider-1-trackBase {
  border-color: var(--success, #00ff88);
}

.steez-slider-1-slider:focus-visible {
  box-shadow: none;
}

.steez-slider-1-slider:focus-visible::-webkit-slider-thumb {
  box-shadow:
    0 0 0 2px var(--bg-primary, #010607),
    0 0 0 4px color-mix(in srgb, var(--success, #00ff88) 55%, transparent),
    0 0 10px color-mix(in srgb, var(--success, #00ff88) 40%, transparent);
}

.steez-slider-1-slider:focus-visible::-moz-range-thumb {
  box-shadow:
    0 0 0 2px var(--bg-primary, #010607),
    0 0 0 4px color-mix(in srgb, var(--success, #00ff88) 55%, transparent),
    0 0 10px color-mix(in srgb, var(--success, #00ff88) 40%, transparent);
}

.steez-slider-1-slider:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.steez-slider-1-track:has(.steez-slider-1-slider:disabled) .steez-slider-1-fill,
.steez-slider-1-track:has(.steez-slider-1-slider:disabled) .steez-slider-1-trackBase {
  opacity: 0.5;
}

.steez-slider-1-value {
  font-size: 0.875rem;
  color: var(--success, #00ff88);
  font-weight: 600;
  min-width: 3rem;
  text-align: center;
  font-family: var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
}

.steez-slider-1-helperText {
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: var(--text-secondary, #999999);
  font-family: var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
}

.steez-slider-1-hasError .steez-slider-1-label {
  color: var(--danger, #ff5c5c);
}

.steez-slider-1-hasError .steez-slider-1-trackBase {
  border-color: var(--danger, #ff5c5c);
}

.steez-slider-1-errorText {
  margin-top: 0.35rem;
  font-family: var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
  font-size: 0.8rem;
  color: var(--danger, #ff5c5c);
  line-height: 1.3;
}

@media (prefers-reduced-motion: reduce) {
  .steez-slider-1-fill,
  .steez-slider-1-trackBase,
  .steez-slider-1-slider::-webkit-slider-thumb,
  .steez-slider-1-slider::-moz-range-thumb {
    transition: none;
  }
}

/* Slim native track; retain the range input's keyboard and pointer behavior. */
.steez-slider-1-diamond .steez-slider-1-track {
  --thumb-size: 20px;
  min-width: 0;
  height: 44px;
}

.steez-slider-1-diamond .steez-slider-1-trackBase,
.steez-slider-1-diamond .steez-slider-1-fill { display: none; }

.steez-slider-1-diamond .steez-slider-1-slider {
  height: 44px;
  touch-action: pan-y;
}

.steez-slider-1-diamond .steez-slider-1-slider::-webkit-slider-runnable-track {
  height: 5px;
  border-radius: 999px;
  background: linear-gradient(to right,
    var(--diamond-slider-accent, var(--color-accent, #ee1401)) 0%,
    var(--diamond-slider-accent, var(--color-accent, #ee1401)) calc(var(--slider-percentage, 0) * 1%),
    var(--diamond-slider-track, var(--color-border, #2a2a2a)) calc(var(--slider-percentage, 0) * 1%),
    var(--diamond-slider-track, var(--color-border, #2a2a2a)) 100%);
}

.steez-slider-1-diamond .steez-slider-1-slider::-moz-range-track {
  height: 5px;
  border-radius: 999px;
  background: var(--diamond-slider-track, var(--color-border, #2a2a2a));
}

.steez-slider-1-diamond .steez-slider-1-slider::-moz-range-progress {
  height: 5px;
  border-radius: 999px;
  background: var(--diamond-slider-accent, var(--color-accent, #ee1401));
}

.steez-slider-1-diamond .steez-slider-1-slider::-webkit-slider-thumb {
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  margin-top: -7.5px;
  border: 0;
  border-radius: 0;
  outline: none;
  background: var(--diamond-slider-accent, var(--color-accent, #ee1401));
  box-shadow: none;
  transform: rotate(0deg);
  transition: transform 160ms ease;
}

.steez-slider-1-diamond .steez-slider-1-slider::-moz-range-thumb {
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  border: 0;
  border-radius: 0;
  outline: none;
  background: var(--diamond-slider-accent, var(--color-accent, #ee1401));
  box-shadow: none;
  transform: rotate(0deg);
  transition: transform 160ms ease;
}

.steez-slider-1-diamond .steez-slider-1-slider:active:not(:disabled)::-webkit-slider-thumb { transform: rotate(45deg); }
.steez-slider-1-diamond .steez-slider-1-slider:active:not(:disabled)::-moz-range-thumb { transform: rotate(45deg); }

/* Focus belongs to the whole control; the thumb stays solid with no halo. */
.steez-slider-1-diamond .steez-slider-1-slider:focus-visible {
  outline: 2px solid var(--diamond-slider-accent, var(--color-accent, #ee1401));
  outline-offset: 2px;
  box-shadow: none;
}
.steez-slider-1-diamond .steez-slider-1-slider:focus-visible::-webkit-slider-thumb { box-shadow: none; }
.steez-slider-1-diamond .steez-slider-1-slider:focus-visible::-moz-range-thumb { box-shadow: none; }
.steez-slider-1-diamond .steez-slider-1-value { color: var(--diamond-slider-accent, var(--color-accent, #ee1401)); }
.steez-slider-1-diamond.hasError { --diamond-slider-track: var(--danger, #ff5c5c); }

@media (prefers-reduced-motion: reduce) {
  .steez-slider-1-diamond .steez-slider-1-slider::-webkit-slider-thumb { transition: none; }
  .steez-slider-1-diamond .steez-slider-1-slider::-moz-range-thumb { transition: none; }
}

.steez-slider-1-notchedControl { padding: 12px; }
`;
const __steezStandaloneStyleKey = "slider";

function __injectSteezStandaloneStyles() {
  if (typeof document === "undefined" || document.querySelector(`style[data-steez-standalone="${__steezStandaloneStyleKey}"]`)) {
    return;
  }

  const style = document.createElement("style");
  style.setAttribute("data-steez-standalone", __steezStandaloneStyleKey);
  style.textContent = __steezStandaloneStyles;
  document.head.appendChild(style);
}

__injectSteezStandaloneStyles();

export function useStableId(prefix: string, explicitId?: string): string {
  const reactId = useId().replace(/:/g, "");
  return explicitId || `${prefix}-${reactId}`;
}

export interface UseFieldDescriptionOptions {
  prefix: string;
  helperText?: string;
  error?: string;
  describedBy?: string;
}

export interface FieldDescriptionState {
  errorId: string;
  hasError: boolean;
  helperId: string;
  describedBy: string | undefined;
}

/**
 * Builds stable helper/error IDs and merges them with a consumer's
 * aria-describedby value without dropping any referenced description.
 */
export function useFieldDescription({
  prefix,
  helperText,
  error,
  describedBy: consumerDescribedBy,
}: UseFieldDescriptionOptions): FieldDescriptionState {
  const helperId = useStableId(`${prefix}-helper`);
  const errorId = useStableId(`${prefix}-error`);
  const hasError = Boolean(error);
  const describedBy = [
    consumerDescribedBy,
    helperText ? helperId : undefined,
    hasError ? errorId : undefined,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  return { errorId, hasError, helperId, describedBy };
}

export interface FieldProps {
  id: string;
  label?: string;
  labelStyle?: "plain" | "notch";
  helperText?: string;
  error?: string;
  describedBy?: string;
  invalid?: React.AriaAttributes["aria-invalid"];
  className?: string;
  style?: React.CSSProperties;
  children: (attributes: {
    "aria-describedby": string | undefined;
    "aria-invalid": React.AriaAttributes["aria-invalid"];
  }) => React.ReactNode;
}

/** Shared label, control frame, and descriptions for text fields and selects. */
export function Field({
  id,
  label,
  labelStyle = "plain",
  helperText,
  error,
  describedBy,
  invalid,
  className = "",
  style,
  children,
}: FieldProps) {
  const description = useFieldDescription({
    prefix: id,
    helperText,
    error,
    describedBy,
  });
  return (
    <div
      className={`${__styles_steez_slider_0.field} ${className}`.trim()}
      style={style}
      data-label-style={labelStyle}
      data-error={description.hasError || invalid === true || invalid === "true" || undefined}
    >
      {label && labelStyle === "plain" && (
        <label htmlFor={id} className={__styles_steez_slider_0.label}>
          {label}
        </label>
      )}
      <div className={__styles_steez_slider_0.control}>
        {label && labelStyle === "notch" && (
          <label htmlFor={id} className={`${__styles_steez_slider_0.label} ${__styles_steez_slider_0.notchLabel}`}>
            {label}
          </label>
        )}
        {children({
          "aria-describedby": description.describedBy,
          "aria-invalid": invalid ?? (description.hasError ? true : undefined),
        })}
      </div>
      {helperText && (
        <div id={description.helperId} className={__styles_steez_slider_0.helper}>
          {helperText}
        </div>
      )}
      {description.hasError && (
        <div id={description.errorId} className={__styles_steez_slider_0.error} role="alert">
          {error}
        </div>
      )}
    </div>
  );
}

/** Clamp finite inputs; malformed values use the component's documented default. */
export function clampFinite(
  value: number,
  min: number,
  max: number,
  fallback: number,
) {
  return Number.isFinite(value)
    ? Math.min(max, Math.max(min, value))
    : fallback;
}

/** Percentage shared by range inputs and progress displays. */
export function progressPercentage(value: number, min = 0, max = 100) {
  if (!Number.isFinite(min) || !Number.isFinite(max) || max <= min) return 0;
  return clampFinite(((value - min) / (max - min)) * 100, 0, 100, 0);
}

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

  const control = (<div className={__styles_steez_slider_1.sliderContainer}>
        <div
          className={__styles_steez_slider_1.track}
          style={
            {
              ["--slider-percentage" as string]: percentage,
            } as React.CSSProperties
          }
        >
          <div className={__styles_steez_slider_1.trackBase} aria-hidden="true" />
          <div className={__styles_steez_slider_1.fill} aria-hidden="true" />
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
            className={__styles_steez_slider_1.slider}
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
          <span className={__styles_steez_slider_1.value}>{currentValue}</span>
        ) : null}
      </div>);


  return (
    <div
      className={`${__styles_steez_slider_1.wrapper} ${variant === "diamond" ? __styles_steez_slider_1.diamond : ""} ${hasError ? __styles_steez_slider_1.hasError : ""} ${className}`.trim()}
    >
      {label && labelStyle === "plain" ? (
        <label htmlFor={inputId} className={__styles_steez_slider_1.label}>
          {label}
        </label>
      ) : null}
      {labelStyle === "notch" ? (
        <Field id={inputId} label={label} labelStyle="notch" invalid={ariaInvalid ?? (hasError ? true : undefined)}
          style={{ "--field-width": "100%" } as React.CSSProperties}>
          {() => <div className={__styles_steez_slider_1.notchedControl}>{control}</div>}
        </Field>
      ) : control}
      {helperText ? (
        <div id={helperId} className={__styles_steez_slider_1.helperText}>
          {helperText}
        </div>
      ) : null}
      {hasError ? (
        <div id={errorId} className={__styles_steez_slider_1.errorText} role="alert">
          {error}
        </div>
      ) : null}
    </div>
  );
}
