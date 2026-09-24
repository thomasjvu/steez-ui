/**
 * Standalone Steez UI copy of Cyberpunk Textarea.
 *
 * Generated from packages/ui/src/components/CyberpunkTextarea.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";
import { useId } from "react";
import type { TextareaHTMLAttributes } from "react";

const __styles_steez_cyberpunk_textarea_0: Record<string, string> = {
  "cyberTextarea": "steez-cyberpunk-textarea-0-cyberTextarea",
  "textareaContainer": "steez-cyberpunk-textarea-0-textareaContainer",
  "textarea": "steez-cyberpunk-textarea-0-textarea",
  "label": "steez-cyberpunk-textarea-0-label",
  "full": "steez-cyberpunk-textarea-0-full",
  "helperText": "steez-cyberpunk-textarea-0-helperText",
  "hasError": "steez-cyberpunk-textarea-0-hasError",
  "errorText": "steez-cyberpunk-textarea-0-errorText",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/CyberpunkTextarea.module.css */
.steez-cyberpunk-textarea-0-cyberTextarea {
  --textarea-width: 400px;
  --textarea-font-size: 1rem;
  --textarea-padding-top: 12px;
  --textarea-padding-right: 12px;
  --textarea-padding-bot: 12px;
  --textarea-padding-left: 12px;
  --focus-border-color: var(--color-accent-primary, var(--text-primary, #cbcbcc));
  --label-offset-top: -2px;
  --label-offset-left: 12px;
  --label-padding: 1px 8px;
  --label-font-size: 0.85rem;

  position: relative;
  margin-bottom: 1rem;
  font-size: var(--textarea-font-size);
}

.steez-cyberpunk-textarea-0-textareaContainer {
  position: relative;
  width: var(--textarea-width);
  border: 1px solid var(--color-border-default, #2a2a2a);
  background: var(--color-bg-tile, #0a0a0a);
  margin-top: 6px;
}

.steez-cyberpunk-textarea-0-textarea {
  width: 100%;
  min-height: 100px;
  color: var(--text-primary, #cbcbcc);
  font-family: var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
  font-size: inherit;
  background: transparent;
  padding: var(--textarea-padding-top) var(--textarea-padding-right) var(--textarea-padding-bot) var(--textarea-padding-left);
  border: none;
  outline: none;
  resize: vertical;
  box-sizing: border-box;
}

.steez-cyberpunk-textarea-0-cyberTextarea:focus-within .steez-cyberpunk-textarea-0-label {
  color: var(--focus-border-color);
}

.steez-cyberpunk-textarea-0-cyberTextarea:focus-within .steez-cyberpunk-textarea-0-textareaContainer {
  border-color: var(--focus-border-color);
}

.steez-cyberpunk-textarea-0-label {
  position: absolute;
  top: var(--label-offset-top);
  left: var(--label-offset-left);
  background: var(--color-bg-tile, #0a0a0a);
  padding: var(--label-padding);
  font-family: var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
  font-size: var(--label-font-size);
  font-weight: 500;
  color: var(--text-secondary, #999999);
  z-index: 1;
}

.steez-cyberpunk-textarea-0-full {
  --textarea-width: 100%;
  width: 100%;
  display: block;
}

.steez-cyberpunk-textarea-0-textarea:disabled {
  color: var(--text-muted, #666666);
  cursor: not-allowed;
  opacity: 0.6;
}

.steez-cyberpunk-textarea-0-helperText {
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: var(--text-secondary, #999999);
  font-family: var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
}

.steez-cyberpunk-textarea-0-hasError .steez-cyberpunk-textarea-0-textareaContainer {
  border-color: var(--danger, #ff5c5c);
}

.steez-cyberpunk-textarea-0-hasError .steez-cyberpunk-textarea-0-label {
  color: var(--danger, #ff5c5c);
}

.steez-cyberpunk-textarea-0-errorText {
  margin-top: 0.35rem;
  font-family: var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
  font-size: 0.8rem;
  color: var(--danger, #ff5c5c);
  line-height: 1.3;
}


`;
const __steezStandaloneStyleKey = "cyberpunk-textarea";

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

export interface CyberpunkTextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "helperText"> {
  label?: string;
  variant?: "default" | "full";
  helperText?: string;
  error?: string;
}

export function CyberpunkTextarea({
  label,
  variant = "default",
  className = "",
  id,
  helperText,
  error,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  ...props
}: CyberpunkTextareaProps) {
  const textareaId = useStableId("textarea", id);
  const { errorId, hasError, helperId, describedBy } = useFieldDescription({
    prefix: "textarea",
    helperText,
    error,
    describedBy: ariaDescribedBy,
  });

  return (
    <div
      className={`${__styles_steez_cyberpunk_textarea_0.cyberTextarea} ${__styles_steez_cyberpunk_textarea_0[variant]} ${hasError ? __styles_steez_cyberpunk_textarea_0.hasError : ""} ${className}`.trim()}
    >
      {label ? (
        <label htmlFor={textareaId} className={__styles_steez_cyberpunk_textarea_0.label}>
          {label}
        </label>
      ) : null}
      <div className={__styles_steez_cyberpunk_textarea_0.textareaContainer}>
        <textarea
          id={textareaId}
          className={__styles_steez_cyberpunk_textarea_0.textarea}
          {...props}
          aria-invalid={ariaInvalid ?? (hasError ? true : undefined)}
          aria-describedby={describedBy}
        />
      </div>
      {helperText ? (
        <div id={helperId} className={__styles_steez_cyberpunk_textarea_0.helperText}>
          {helperText}
        </div>
      ) : null}
      {hasError ? (
        <div id={errorId} className={__styles_steez_cyberpunk_textarea_0.errorText} role="alert">
          {error}
        </div>
      ) : null}
    </div>
  );
}
