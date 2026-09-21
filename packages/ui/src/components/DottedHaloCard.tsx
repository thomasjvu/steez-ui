"use client";

import React from "react";

import { CardFrame } from "./CardFrame.js";
import styles from "./DottedHaloCard.module.css";

export interface DottedHaloCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  bodyClassName?: string;
  patternInset?: string;
  patternSize?: string;
  patternDotSize?: string;
}

export function DottedHaloCard({
  title,
  children,
  className = "",
  bodyClassName = "",
  patternInset,
  patternSize,
  patternDotSize,
  style,
  ...props
}: DottedHaloCardProps) {
  return (
    <CardFrame
      className={`${styles.root} ${className}`.trim()}
      title={title}
      titleAs="h3"
      titleClassName={styles.title}
      bodyClassName={`${styles.body} ${bodyClassName}`.trim()}
      style={
        {
          "--dotted-halo-inset": patternInset,
          "--dotted-halo-pattern-size": patternSize,
          "--dotted-halo-dot-size": patternDotSize,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </CardFrame>
  );
}

export default DottedHaloCard;
