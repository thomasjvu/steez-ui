import React from "react";

import { CheckIcon, ErrorIcon, InfoIcon } from "@steez-ui/icons";

import styles from "./StatusMessage.module.css";

export interface StatusMessageProps {
  message: string;
  type: "success" | "error" | "info";
}

export function StatusMessage({ message, type }: StatusMessageProps) {
  return (
    <div
      className={`${styles.message} ${styles[type]}`.trim()}
      role={type === "error" ? "alert" : "status"}
      aria-live={type === "error" ? "assertive" : "polite"}
    >
      <span className={styles.icon}>
        {type === "success" ? <CheckIcon width={16} height={16} /> : null}
        {type === "error" ? <ErrorIcon width={16} height={16} /> : null}
        {type === "info" ? <InfoIcon width={16} height={16} /> : null}
      </span>
      <span className={styles.text}>{message}</span>
    </div>
  );
}

