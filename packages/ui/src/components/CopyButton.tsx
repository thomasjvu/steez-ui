"use client";

import React, { useEffect, useRef, useState } from "react";

import { CheckIcon, CopyIcon } from "@steez-ui/icons";

import { clampFinite } from "../utils/numbers.ts";

import styles from "./CopyButton.module.css";

export interface CopyButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value" | "children"> {
  value: string;
  size?: number;
  className?: string;
  title?: string;
  feedbackDuration?: number;
  onCopyError?: (error: unknown) => void;
}

type CopyFeedback = "idle" | "copied" | "error";

export function CopyButton({
  value,
  size = 16,
  className = "",
  title = "Copy to clipboard",
  feedbackDuration = 2000,
  onCopyError,
  onClick,
  disabled,
  type = "button",
  ...props
}: CopyButtonProps) {
  const [feedback, setFeedback] = useState<CopyFeedback>("idle");
  const [pending, setPending] = useState(false);
  const pendingRef = useRef(false);
  const mounted = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      if (timer.current !== null) clearTimeout(timer.current);
    };
  }, []);

  const handleCopy = async (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || disabled || pendingRef.current) return;
    pendingRef.current = true;
    setPending(true);
    if (timer.current !== null) clearTimeout(timer.current);
    setFeedback("idle");
    try {
      await navigator.clipboard.writeText(value);
      if (mounted.current) setFeedback("copied");
    } catch (error) {
      if (mounted.current) {
        setFeedback("error");
        onCopyError?.(error);
      }
    } finally {
      pendingRef.current = false;
      if (mounted.current) {
        setPending(false);
        timer.current = setTimeout(() => setFeedback("idle"),
          clampFinite(feedbackDuration, 0, 60000, 2000));
      }
    }
  };
  const iconSize = clampFinite(size, 1, 128, 16);
  const idleLabel = title.trim() || "Copy to clipboard";

  const isCopied = feedback === "copied";
  const isError = feedback === "error";
  const accessibleLabel = isCopied
    ? "Copied to clipboard"
    : isError
      ? "Failed to copy"
      : idleLabel;
  const nativeTitle = isCopied ? "Copied!" : isError ? "Failed to copy" : idleLabel;

  return (
    <button
      {...props}
      type={type}
      disabled={disabled || pending}
      aria-busy={pending || undefined}
      className={`${styles.copyButton} ${isCopied ? styles.copied : ""} ${isError ? styles.error : ""} ${className}`.trim()}
      onClick={handleCopy}
      title={nativeTitle}
      aria-label={props["aria-label"] ?? accessibleLabel}
    >
      {isCopied ? <CheckIcon width={iconSize} height={iconSize} aria-hidden="true" /> : <CopyIcon width={iconSize} height={iconSize} aria-hidden="true" />}
      <span className={styles.visuallyHidden} aria-live="polite">
        {isCopied ? "Copied to clipboard" : isError ? "Failed to copy" : ""}
      </span>
    </button>
  );
}
