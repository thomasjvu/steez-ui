import React, { useEffect, useState } from "react";

import { CheckIcon, CopyIcon } from "@steez-ui/icons";

import styles from "./CopyButton.module.css";

export interface CopyButtonProps {
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
}: CopyButtonProps) {
  const [feedback, setFeedback] = useState<CopyFeedback>("idle");

  useEffect(() => {
    if (feedback === "idle") {
      return undefined;
    }

    const timer = window.setTimeout(() => setFeedback("idle"), feedbackDuration);
    return () => window.clearTimeout(timer);
  }, [feedback, feedbackDuration]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setFeedback("copied");
    } catch (error) {
      setFeedback("error");
      onCopyError?.(error);
    }
  };

  const isCopied = feedback === "copied";
  const isError = feedback === "error";
  const accessibleLabel = isCopied
    ? "Copied to clipboard"
    : isError
      ? "Failed to copy"
      : title;
  const nativeTitle = isCopied ? "Copied!" : isError ? "Failed to copy" : title;

  return (
    <button
      type="button"
      className={`${styles.copyButton} ${isCopied ? styles.copied : ""} ${isError ? styles.error : ""} ${className}`.trim()}
      onClick={handleCopy}
      title={nativeTitle}
      aria-label={accessibleLabel}
    >
      {isCopied ? <CheckIcon width={size} height={size} /> : <CopyIcon width={size} height={size} />}
      <span className={styles.visuallyHidden} aria-live="polite">
        {isCopied ? "Copied to clipboard" : isError ? "Failed to copy" : ""}
      </span>
    </button>
  );
}
