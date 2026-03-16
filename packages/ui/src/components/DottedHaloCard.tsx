import React from "react";

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
    <div
      className={`${styles.root} ${className}`.trim()}
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
      {title ? <h3 className={styles.title}>{title}</h3> : null}
      <div className={`${styles.body} ${bodyClassName}`.trim()}>{children}</div>
    </div>
  );
}

export default DottedHaloCard;
