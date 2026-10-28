/**
 * Standalone Steez UI copy of Radio.
 *
 * Generated from packages/ui/src/components/Radio.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";
import { useId } from "react";
import type { InputHTMLAttributes } from "react";

const __styles_steez_radio_0: Record<string, string> = {
  "field": "steez-radio-0-field",
  "label": "steez-radio-0-label",
  "control": "steez-radio-0-control",
  "notchLabel": "steez-radio-0-notchLabel",
  "error": "steez-radio-0-error",
  "helper": "steez-radio-0-helper",
};

const __styles_steez_radio_1: Record<string, string> = {
  "wrapper": "steez-radio-1-wrapper",
  "control": "steez-radio-1-control",
  "label": "steez-radio-1-label",
  "radio": "steez-radio-1-radio",
  "framed": "steez-radio-1-framed",
};

const __styles_steez_radio_2: Record<string, string> = {
  "radioGroup": "steez-radio-2-radioGroup",
  "notchedGroup": "steez-radio-2-notchedGroup",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/Field.module.css */
.steez-radio-0-field {
  width: var(--field-width, 240px);
  max-width: 100%;
  font-size: var(--field-font-size, 1rem);
  margin-bottom: 1rem;
}
.steez-radio-0-label {
  display: block;
  font: 500 var(--label-font-size, 0.85rem) / 1.2 var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
  color: var(--text-secondary, #999999);
  margin-bottom: 0.5rem;
}
.steez-radio-0-control {
  position: relative;
  border: 1px solid var(--color-border-default, #2a2a2a);
  background: var(--field-background, var(--color-bg-tile, #0a0a0a));
  border-radius: var(--field-radius, 6px);
}
.steez-radio-0-control:hover {
  border-color: var(--color-border-hover, #3a3a3a);
}
.steez-radio-0-control:focus-within {
  border-color: var(--focus-border-color, var(--color-accent-primary, #ee1401));
  outline: 1px solid var(--focus-border-color, var(--color-accent-primary, #ee1401));
  outline-offset: 1px;
}
.steez-radio-0-field:focus-within .steez-radio-0-label {
  color: var(--focus-border-color, var(--color-accent-primary, #ee1401));
}
.steez-radio-0-field[data-label-style="notch"] {
  padding-top: 0.6rem;
}
.steez-radio-0-notchLabel {
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
.steez-radio-0-control:has(input:disabled, select:disabled, textarea:disabled) {
  opacity: 0.6;
}
.steez-radio-0-control:has([readonly]) {
  background: var(--color-bg-secondary, #0a0a0a);
}
.steez-radio-0-field[data-error] .steez-radio-0-control {
  border-color: var(--danger, #ff5c5c);
}
.steez-radio-0-field[data-error] .steez-radio-0-label,
.steez-radio-0-error {
  color: var(--danger, #ff5c5c);
}
.steez-radio-0-helper,
.steez-radio-0-error {
  margin-top: 0.4rem;
  font: 0.75rem/1.4 var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
}
.steez-radio-0-helper {
  color: var(--text-secondary, #999999);
}

.steez-radio-0-field[data-error] .steez-radio-0-control:focus-within { outline-color: var(--danger, #ff5c5c); }


/* packages/ui/src/components/ChoiceControl.module.css */
.steez-radio-1-wrapper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  user-select: none;
}

.steez-radio-1-control {
  width: 28px;
  height: 28px;
  border: 2px solid var(--border, #2a2a2a);
  border-radius: var(--choice-radius, 3px);
  appearance: none;
  outline: none;
  margin: 0;
  cursor: pointer;
  position: relative;
  background-color: var(--bg-primary, #010607);
  transition: border-color var(--transition-fast, 150ms ease), box-shadow var(--transition-fast, 150ms ease);
}

.steez-radio-1-control::before {
  content: "";
  width: 16px;
  height: 16px;
  background-color: var(--success, #00ff88);
  border-radius: var(--choice-mark-radius, 0);
  position: absolute;
  top: 4px;
  left: 4px;
  display: block;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
}

.steez-radio-1-control:checked::before {
  transform: scale(1);
}

.steez-radio-1-control:hover:not(:disabled) {
  border-color: var(--success, #00ff88);
}

.steez-radio-1-control:focus-visible {
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--success, #00ff88) 25%, transparent);
}

.steez-radio-1-control:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.steez-radio-1-label {
  font-family: var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
  font-size: 0.875rem;
  color: var(--text-primary, #cbcbcc);
}


.steez-radio-1-radio { --choice-radius: 50%; --choice-mark-radius: 50%; }
.steez-radio-1-wrapper:has(input:disabled) { cursor: not-allowed; }
@media (prefers-reduced-motion: reduce) {
  .steez-radio-1-control, .steez-radio-1-control::before { transition: none; }
}

@media (forced-colors: active) {
  .steez-radio-1-control { appearance: auto; }
  .steez-radio-1-control::before { display: none; }
}

.steez-radio-1-framed { display: flex; align-items: center; min-height: 52px; padding: 12px; }


/* packages/ui/src/components/Radio.module.css */
.steez-radio-2-radioGroup {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.steez-radio-2-notchedGroup { padding: 12px; }
`;
const __steezStandaloneStyleKey = "radio";

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
      className={`${__styles_steez_radio_0.field} ${className}`.trim()}
      style={style}
      data-label-style={labelStyle}
      data-error={description.hasError || invalid === true || invalid === "true" || undefined}
    >
      {label && labelStyle === "plain" && (
        <label htmlFor={id} className={__styles_steez_radio_0.label}>
          {label}
        </label>
      )}
      <div className={__styles_steez_radio_0.control}>
        {label && labelStyle === "notch" && (
          <label htmlFor={id} className={`${__styles_steez_radio_0.label} ${__styles_steez_radio_0.notchLabel}`}>
            {label}
          </label>
        )}
        {children({
          "aria-describedby": description.describedBy,
          "aria-invalid": invalid ?? (description.hasError ? true : undefined),
        })}
      </div>
      {helperText && (
        <div id={description.helperId} className={__styles_steez_radio_0.helper}>
          {helperText}
        </div>
      )}
      {description.hasError && (
        <div id={description.errorId} className={__styles_steez_radio_0.error} role="alert">
          {error}
        </div>
      )}
    </div>
  );
}

interface ChoiceLabelProps {
  id: string;
  label?: string;
  labelStyle?: "plain" | "notch";
  className?: string;
  children: React.ReactNode;
}
/** Inline choice label, with an optional notched outline from the shared field. */
export function ChoiceLabel({ id, label, labelStyle = "plain", className = "", children }: ChoiceLabelProps) {
  if (labelStyle === "notch") return <Field id={id} label={label} labelStyle="notch" className={className}>
    {() => <div className={__styles_steez_radio_1.framed}>{children}</div>}
  </Field>;
  return <label htmlFor={id} className={`${__styles_steez_radio_1.wrapper} ${className}`.trim()}>
    {children}{label ? <span className={__styles_steez_radio_1.label}>{label}</span> : null}
  </label>;
}

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  labelStyle?: "plain" | "notch";
}

export function Radio({ label, labelStyle, className = "", id, ...props }: RadioProps) {
  const inputId = useStableId("radio", id);

  return (
    <ChoiceLabel id={inputId} label={label} labelStyle={labelStyle} className={className}>
      <input id={inputId} className={`${__styles_steez_radio_1.control} ${__styles_steez_radio_1.radio}`} {...props} type="radio" />
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
      className={`${__styles_steez_radio_2.radioGroup} ${labelStyle === "notch" ? __styles_steez_radio_2.notchedGroup : className}`.trim()}
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
