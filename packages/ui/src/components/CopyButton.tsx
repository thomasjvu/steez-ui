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

export function CopyButton({
  value,
  size = 16,
  className = "",
  title = "Copy to clipboard",
  feedbackDuration = 2000,
  onCopyError,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return undefined;
    }

    const timer = window.setTimeout(() => setCopied(false), feedbackDuration);
    return () => window.clearTimeout(timer);
  }, [copied, feedbackDuration]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch (error) {
      onCopyError?.(error);
    }
  };

  return (
    <button
      type="button"
      className={`${styles.copyButton} ${copied ? styles.copied : ""} ${className}`.trim()}
      onClick={handleCopy}
      title={copied ? "Copied!" : title}
      aria-label={copied ? "Copied to clipboard" : title}
    >
      {copied ? <CheckIcon width={size} height={size} /> : <CopyIcon width={size} height={size} />}
    </button>
  );
}

