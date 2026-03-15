import React from "react";

import styles from "../styles/Buttons.module.css";

type ButtonVariant = "primary" | "secondary" | "danger";
type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "medium",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const sizeClass = size === "small" ? styles.small : size === "large" ? styles.large : "";

  return (
    <button className={`${styles[variant]} ${sizeClass} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}

export default Button;

