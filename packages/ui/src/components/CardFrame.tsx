"use client";

import React from "react";

import styles from "./CardFrame.module.css";

export interface CardFrameProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  titleAs?: "div" | "h3";
  titleClassName?: string;
  bodyClassName?: string;
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
  className = "",
  children,
  ...props
}: CardFrameProps) {
  const Title = titleAs;

  return (
    <div className={className.trim()} {...props}>
      {decoration}
      {title ? <Title className={titleClassName.trim()}>{title}</Title> : null}
      <div className={`${styles.body} ${bodyClassName}`.trim()}>{children}</div>
    </div>
  );
}
