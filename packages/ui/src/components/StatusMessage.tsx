"use client";

import React from "react";

import { CheckIcon, ErrorIcon, InfoIcon } from "@steez-ui/icons";

import styles from "./StatusMessage.module.css";

export interface StatusMessageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  message: string;
  type: "success" | "error" | "info";
  /** Inline by default; toast positioning is explicitly opt-in. */
  placement?: "inline" | "toast";
}

export function StatusMessage({
  message,
  type,
  placement = "inline",
  className = "",
  ...props
}: StatusMessageProps) {
  return (
    <div
      className={`${styles.message} ${styles[type]} ${placement === "toast" ? styles.toast : ""} ${className}`.trim()}
      {...props}
      role={props.role ?? (type === "error" ? "alert" : "status")}
      aria-live={
        props["aria-live"] ?? (type === "error" ? "assertive" : "polite")
      }
    >
      <span className={styles.icon} aria-hidden="true">
        {type === "success" ? <CheckIcon width={16} height={16} /> : null}
        {type === "error" ? <ErrorIcon width={16} height={16} /> : null}
        {type === "info" ? <InfoIcon width={16} height={16} /> : null}
      </span>
      <span className={styles.text}>{message}</span>
    </div>
  );
}
