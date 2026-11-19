"use client";

import React from "react";

import { CardFrame, type CardCompositionProps } from "./CardFrame.tsx";
import bracketStyles from "../styles/CornerBrackets.module.css";
import styles from "./Card.module.css";

export type CardVariant = "default" | "featured" | "brackets" | "ghost";

export interface CardProps
  extends CardCompositionProps, Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** `featured` adds accent emphasis, `brackets` offset corner brackets, `ghost` a dashed transparent outline. */
  variant?: CardVariant;
}

const VARIANT_CLASSES: Record<CardVariant, string> = {
  default: "",
  featured: styles.featured,
  brackets: `${styles.bracketed} ${bracketStyles.brackets}`,
  ghost: styles.ghost,
};

export function Card({
  title,
  titleAs,
  titleClassName = "",
  variant = "default",
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <CardFrame
      className={`${styles.card} ${VARIANT_CLASSES[variant] ?? ""} ${className}`}
      data-variant={variant}
      title={title}
      titleAs={titleAs}
      titleClassName={`${styles.title} ${titleClassName}`.trim()}
      {...props}
    >
      {children}
    </CardFrame>
  );
}
