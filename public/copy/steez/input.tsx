/**
 * Standalone Steez UI copy of Input.
 *
 * Generated from packages/ui/src/components/Input.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";
import { useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

const __styles_steez_input_0: Record<string, string> = {
  "field": "steez-input-0-field",
  "label": "steez-input-0-label",
  "control": "steez-input-0-control",
  "notchLabel": "steez-input-0-notchLabel",
  "error": "steez-input-0-error",
  "helper": "steez-input-0-helper",
};

const __styles_steez_input_1: Record<string, string> = {
  "input": "steez-input-1-input",
  "icon": "steez-input-1-icon",
  "withIcon": "steez-input-1-withIcon",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/Field.module.css */
.steez-input-0-field {
  width: var(--field-width, 240px);
  max-width: 100%;
  font-size: var(--field-font-size, 1rem);
  margin-bottom: 1rem;
}
.steez-input-0-label {
  display: block;
  font: 500 var(--label-font-size, 0.85rem) / 1.2 var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
  color: var(--text-secondary, #999999);
  margin-bottom: 0.5rem;
}
.steez-input-0-control {
  position: relative;
  border: 1px solid var(--color-border-default, #2a2a2a);
  background: var(--field-background, var(--color-bg-tile, #0a0a0a));
  border-radius: var(--field-radius, 6px);
}
.steez-input-0-control:hover {
  border-color: var(--color-border-hover, #3a3a3a);
}
.steez-input-0-control:focus-within {
  border-color: var(--focus-border-color, var(--color-accent-primary, #ee1401));
  outline: 1px solid var(--focus-border-color, var(--color-accent-primary, #ee1401));
  outline-offset: 1px;
}
.steez-input-0-field:focus-within .steez-input-0-label {
  color: var(--focus-border-color, var(--color-accent-primary, #ee1401));
}
.steez-input-0-field[data-label-style="notch"] {
  padding-top: 0.6rem;
}
.steez-input-0-notchLabel {
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
.steez-input-0-control:has(input:disabled, select:disabled, textarea:disabled) {
  opacity: 0.6;
}
.steez-input-0-control:has([readonly]) {
  background: var(--color-bg-secondary, #0a0a0a);
}
.steez-input-0-field[data-error] .steez-input-0-control {
  border-color: var(--danger, #ff5c5c);
}
.steez-input-0-field[data-error] .steez-input-0-label,
.steez-input-0-error {
  color: var(--danger, #ff5c5c);
}
.steez-input-0-helper,
.steez-input-0-error {
  margin-top: 0.4rem;
  font: 0.75rem/1.4 var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
}
.steez-input-0-helper {
  color: var(--text-secondary, #999999);
}

.steez-input-0-field[data-error] .steez-input-0-control:focus-within { outline-color: var(--danger, #ff5c5c); }


/* packages/ui/src/components/Input.module.css */
.steez-input-1-input {
  display: block;
  width: 100%;
  min-height: 44px;
  box-sizing: border-box;
  border: 0;
  outline: none;
  background: transparent;
  color: var(--text-primary, #cbcbcc);
  font: 1rem/1.4 var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
  padding: 12px;
}
.steez-input-1-input:disabled {
  cursor: not-allowed;
}
.steez-input-1-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  color: var(--text-secondary, #999999);
  pointer-events: none;
}
.steez-input-1-withIcon .steez-input-1-input {
  padding-right: 44px;
}
`;
const __steezStandaloneStyleKey = "input";

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
      className={`${__styles_steez_input_0.field} ${className}`.trim()}
      style={style}
      data-label-style={labelStyle}
      data-error={description.hasError || invalid === true || invalid === "true" || undefined}
    >
      {label && labelStyle === "plain" && (
        <label htmlFor={id} className={__styles_steez_input_0.label}>
          {label}
        </label>
      )}
      <div className={__styles_steez_input_0.control}>
        {label && labelStyle === "notch" && (
          <label htmlFor={id} className={`${__styles_steez_input_0.label} ${__styles_steez_input_0.notchLabel}`}>
            {label}
          </label>
        )}
        {children({
          "aria-describedby": description.describedBy,
          "aria-invalid": invalid ?? (description.hasError ? true : undefined),
        })}
      </div>
      {helperText && (
        <div id={description.helperId} className={__styles_steez_input_0.helper}>
          {helperText}
        </div>
      )}
      {description.hasError && (
        <div id={description.errorId} className={__styles_steez_input_0.error} role="alert">
          {error}
        </div>
      )}
    </div>
  );
}

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "helperText"> {
  label?: string;
  labelStyle?: "plain" | "notch";
  variant?: "default" | "long" | "full";
  helperText?: string;
  /** Field-level error message; sets aria-invalid and joins aria-describedby. */
  error?: string;
  icon?: ReactNode;
}

export function Input({
  label,
  labelStyle = "plain",
  variant = "default",
  className = "",
  id,
  disabled,
  readOnly,
  helperText,
  error,
  icon,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  ...props
}: InputProps) {
  const inputId = useStableId("input", id);

  return (
    <Field
      id={inputId}
      label={label}
      labelStyle={labelStyle}
      helperText={helperText}
      error={error}
      describedBy={ariaDescribedBy}
      invalid={ariaInvalid}
      className={className}
      style={
        {
          "--field-width":
            variant === "full"
              ? "100%"
              : variant === "long"
                ? "360px"
                : "240px",
        } as React.CSSProperties
      }
    >
      {(attributes) => (
        <>
          <div className={icon ? __styles_steez_input_1.withIcon : undefined}>
            {icon ? <div className={__styles_steez_input_1.icon}>{icon}</div> : null}
            <input
              id={inputId}
              className={__styles_steez_input_1.input}
              disabled={disabled}
              readOnly={readOnly}
              {...props}
              {...attributes}
            />
          </div>
        </>
      )}
    </Field>
  );
}
