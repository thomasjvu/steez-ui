/**
 * Standalone Steez UI copy of Select.
 *
 * Generated from packages/ui/src/components/Select.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";
import { useId } from "react";

const __styles_steez_select_0: Record<string, string> = {
  "field": "steez-select-0-field",
  "label": "steez-select-0-label",
  "control": "steez-select-0-control",
  "notchLabel": "steez-select-0-notchLabel",
  "error": "steez-select-0-error",
  "helper": "steez-select-0-helper",
};

const __styles_steez_select_1: Record<string, string> = {
  "select": "steez-select-1-select",
  "chevron": "steez-select-1-chevron",
  "stack": "steez-select-1-stack",
  "icon": "steez-select-1-icon",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/Field.module.css */
.steez-select-0-field {
  width: var(--field-width, 240px);
  max-width: 100%;
  font-size: var(--field-font-size, 1rem);
  margin-bottom: 1rem;
}
.steez-select-0-label {
  display: block;
  font: 500 var(--label-font-size, 0.85rem) / 1.2 var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
  color: var(--text-secondary, #999999);
  margin-bottom: 0.5rem;
}
.steez-select-0-control {
  position: relative;
  border: 1px solid var(--color-border-default, #2a2a2a);
  background: var(--field-background, var(--color-bg-tile, #0a0a0a));
  border-radius: var(--field-radius, 6px);
}
.steez-select-0-control:hover {
  border-color: var(--color-border-hover, #3a3a3a);
}
.steez-select-0-control:focus-within {
  border-color: var(--focus-border-color, var(--color-accent-primary, #ee1401));
  outline: 1px solid var(--focus-border-color, var(--color-accent-primary, #ee1401));
  outline-offset: 1px;
}
.steez-select-0-field:focus-within .steez-select-0-label {
  color: var(--focus-border-color, var(--color-accent-primary, #ee1401));
}
.steez-select-0-field[data-label-style="notch"] {
  padding-top: 0.6rem;
}
.steez-select-0-notchLabel {
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
.steez-select-0-control:has(input:disabled, select:disabled, textarea:disabled) {
  opacity: 0.6;
}
.steez-select-0-control:has([readonly]) {
  background: var(--color-bg-secondary, #0a0a0a);
}
.steez-select-0-field[data-error] .steez-select-0-control {
  border-color: var(--danger, #ff5c5c);
}
.steez-select-0-field[data-error] .steez-select-0-label,
.steez-select-0-error {
  color: var(--danger, #ff5c5c);
}
.steez-select-0-helper,
.steez-select-0-error {
  margin-top: 0.4rem;
  font: 0.75rem/1.4 var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
}
.steez-select-0-helper {
  color: var(--text-secondary, #999999);
}

.steez-select-0-field[data-error] .steez-select-0-control:focus-within { outline-color: var(--danger, #ff5c5c); }


/* packages/ui/src/components/Select.module.css */
.steez-select-1-select {
  display: block;
  box-sizing: border-box;
  width: 100%;
  min-height: 44px;
  border: 0;
  outline: none;
  border-radius: inherit;
  background: transparent;
  color: var(--text-primary, #cbcbcc);
  font: 500 1rem/1.4 var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
  appearance: none;
  padding: 12px calc(2.5rem + var(--select-stack-width, 0px)) 12px 12px;
  cursor: pointer;
}
.steez-select-1-select:disabled {
  cursor: not-allowed;
}
.steez-select-1-select option {
  background: var(--bg-primary, #010607);
  color: var(--text-primary, #cbcbcc);
}
.steez-select-1-chevron {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary, #999999);
  pointer-events: none;
}
.steez-select-1-stack {
  position: absolute;
  right: 2.5rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  pointer-events: none;
}
.steez-select-1-icon {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--select-icon-background, #fff);
  border: 1px solid var(--color-border-default, #2a2a2a);
  overflow: hidden;
}
.steez-select-1-icon + .steez-select-1-icon {
  margin-left: -12px;
}
.steez-select-1-icon > * {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@supports (appearance: base-select) {
  .steez-select-1-select:not([multiple]):not([size]), .steez-select-1-select:not([multiple]):not([size])::picker(select) { appearance: base-select; }
  .steez-select-1-select::picker-icon { display: none; }
  .steez-select-1-select::picker(select) {
    margin-top: 6px; padding: 4px; border: 1px solid var(--color-border-default, #2a2a2a);
    border-radius: var(--field-radius, 6px); background: var(--field-background, var(--color-bg-tile, #0a0a0a)); color: var(--text-primary, #cbcbcc);
    font: 500 1rem/1.4 var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace); max-height: 320px; overflow-y: auto;
  }
  .steez-select-1-select option { padding: 10px 12px; border-radius: 2px; cursor: pointer; justify-content: flex-start; text-align: left; background: transparent; }
  .steez-select-1-select option:hover, .steez-select-1-select option:focus { background: var(--interactive-secondary-bg, #010607); outline: none; }
  .steez-select-1-select option:checked { color: var(--color-accent, #ee1401); }
  .steez-select-1-select option:disabled { opacity: .45; cursor: not-allowed; }
  .steez-select-1-select option::checkmark { order: 1; margin-left: auto; }
}
`;
const __steezStandaloneStyleKey = "select";

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
      className={`${__styles_steez_select_0.field} ${className}`.trim()}
      style={style}
      data-label-style={labelStyle}
      data-error={description.hasError || invalid === true || invalid === "true" || undefined}
    >
      {label && labelStyle === "plain" && (
        <label htmlFor={id} className={__styles_steez_select_0.label}>
          {label}
        </label>
      )}
      <div className={__styles_steez_select_0.control}>
        {label && labelStyle === "notch" && (
          <label htmlFor={id} className={`${__styles_steez_select_0.label} ${__styles_steez_select_0.notchLabel}`}>
            {label}
          </label>
        )}
        {children({
          "aria-describedby": description.describedBy,
          "aria-invalid": invalid ?? (description.hasError ? true : undefined),
        })}
      </div>
      {helperText && (
        <div id={description.helperId} className={__styles_steez_select_0.helper}>
          {helperText}
        </div>
      )}
      {description.hasError && (
        <div id={description.errorId} className={__styles_steez_select_0.error} role="alert">
          {error}
        </div>
      )}
    </div>
  );
}

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
            className={`${__styles_steez_select_1.select} ${controlClassName}`.trim()}
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
            <span className={__styles_steez_select_1.stack} aria-hidden="true">
              {icons.map((item) => (
                <span className={__styles_steez_select_1.icon} key={item.id} title={item.label}>
                  {item.icon}
                </span>
              ))}
            </span>
          )}
          <svg
            className={__styles_steez_select_1.chevron}
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
