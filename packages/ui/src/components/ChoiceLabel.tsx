"use client";
import React from "react";
import { Field } from "./Field.tsx";
import styles from "./ChoiceControl.module.css";

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
    {() => <div className={styles.framed}>{children}</div>}
  </Field>;
  return <label htmlFor={id} className={`${styles.wrapper} ${className}`.trim()}>
    {children}{label ? <span className={styles.label}>{label}</span> : null}
  </label>;
}
