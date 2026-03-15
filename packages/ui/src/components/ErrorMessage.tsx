import React from "react";

import { CloseIcon, RefreshIcon, WarningIcon } from "@steez-ui/icons";

import buttonStyles from "../styles/Buttons.module.css";
import styles from "./ErrorMessage.module.css";

export interface ErrorMessageProps {
  title?: string;
  message: string;
  details?: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  variant?: "inline" | "card" | "fullScreen";
}

export const ErrorMessage = React.memo(function ErrorMessage({
  title = "Error",
  message,
  details,
  onRetry,
  onDismiss,
  variant = "card",
}: ErrorMessageProps) {
  const content = (
    <>
      <div className={styles.header}>
        <WarningIcon width={24} height={24} />
        <h3>{title}</h3>
      </div>
      <p className={styles.message}>{message}</p>
      {details ? (
        <details className={styles.details}>
          <summary>Details</summary>
          <pre>{details}</pre>
        </details>
      ) : null}
      {onRetry || onDismiss ? (
        <div className={styles.actions}>
          {onRetry ? (
            <button type="button" onClick={onRetry} className={buttonStyles.secondary}>
              <RefreshIcon width={16} height={16} />
              {" "}
              Try Again
            </button>
          ) : null}
          {onDismiss ? (
            <button type="button" onClick={onDismiss} className={buttonStyles.secondary}>
              <CloseIcon width={16} height={16} />
              {" "}
              Dismiss
            </button>
          ) : null}
        </div>
      ) : null}
    </>
  );

  if (variant === "fullScreen") {
    return (
      <div className={styles.fullScreen} role="alert" aria-live="assertive">
        <div className={styles.card}>{content}</div>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className={styles.inline} role="alert" aria-live="assertive">
        {content}
      </div>
    );
  }

  return (
    <div className={styles.card} role="alert" aria-live="assertive">
      {content}
    </div>
  );
});

