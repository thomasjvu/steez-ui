"use client";

import React from "react";

import { CardFrame, type CardCompositionProps } from "./CardFrame.tsx";
import styles from "./DottedHaloCard.module.css";

export interface DottedHaloCardProps
  extends CardCompositionProps, Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  patternInset?: string;
  patternSize?: string;
  patternDotSize?: string;
}

export function DottedHaloCard({
  title,
  titleAs,
  titleClassName = "",
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
      titleAs={titleAs ?? "h3"}
      titleClassName={`${styles.title} ${titleClassName}`.trim()}
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
