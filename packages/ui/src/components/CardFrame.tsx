"use client";

import React from "react";

import styles from "./CardFrame.module.css";

export interface CardCompositionProps {
  title?: React.ReactNode;
  titleAs?: "div" | "h3";
  titleClassName?: string;
  bodyClassName?: string;
  actions?: React.ReactNode;
  headerClassName?: string;
}

export interface CardFrameProps extends CardCompositionProps,
  Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  decoration?: React.ReactNode;
}

/**
 * Shared private frame for cards with an optional title, body, and decoration.
 * Public cards supply their own root/title/body classes so each visual variant
 * keeps its existing CSS contract.
 */
export function CardFrame({
  title,
  titleAs = "div",
  titleClassName = "",
  bodyClassName = "",
  decoration,
  actions,
  headerClassName = "",
  className = "",
  children,
  ...props
}: CardFrameProps) {
  const Title = titleAs;

  const heading = title !== undefined && title !== null
    ? <Title className={titleClassName.trim()}>{title}</Title> : null;

  return (
    <div className={className.trim()} {...props}>
      {decoration}
      {actions !== undefined && actions !== null ? (
        <div className={`${styles.header} ${headerClassName}`.trim()}>
          {heading}
          <div className={styles.actions}>{actions}</div>
        </div>
      ) : heading}
      <div className={`${styles.body} ${bodyClassName}`.trim()}>{children}</div>
    </div>
  );
}
