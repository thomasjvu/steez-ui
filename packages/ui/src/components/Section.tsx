import React from "react";

import styles from "./Section.module.css";

export interface SectionProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: React.ReactNode;
  titleClassName?: string;
  contentClassName?: string;
}

export function Section({
  title,
  children,
  className = "",
  titleClassName = "",
  contentClassName = "",
  ...props
}: SectionProps) {
  return (
    <section className={`${styles.section} ${className}`.trim()} {...props}>
      {title ? (
        <h3 className={`${styles.title} ${titleClassName}`.trim()}>{title}</h3>
      ) : null}
      <div className={`${styles.content} ${contentClassName}`.trim()}>
        {children}
      </div>
    </section>
  );
}

export default Section;
