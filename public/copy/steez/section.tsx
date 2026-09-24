/**
 * Standalone Steez UI copy of Section.
 *
 * Generated from packages/ui/src/components/Section.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";

const __styles_steez_section_0: Record<string, string> = {
  "section": "steez-section-0-section",
  "title": "steez-section-0-title",
  "content": "steez-section-0-content",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/Section.module.css */
.steez-section-0-section {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  margin-bottom: 1.5rem;
}

.steez-section-0-title {
  margin: 0;
  color: var(--text-primary, #cbcbcc);
  font-family: var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.steez-section-0-content {
  min-width: 0;
}
`;
const __steezStandaloneStyleKey = "section";

function __injectSteezStandaloneStyles() {
  if (typeof document === "undefined" || document.querySelector(`style[data-steez-standalone="${__steezStandaloneStyleKey}"]`)) {
    return;
  }

  const style = document.createElement("style");
  style.setAttribute("data-steez-standalone", __steezStandaloneStyleKey);
  style.textContent = __steezStandaloneStyles;
  document.head.appendChild(style);
}

__injectSteezStandaloneStyles();

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
    <section className={`${__styles_steez_section_0.section} ${className}`.trim()} {...props}>
      {title ? (
        <h3 className={`${__styles_steez_section_0.title} ${titleClassName}`.trim()}>{title}</h3>
      ) : null}
      <div className={`${__styles_steez_section_0.content} ${contentClassName}`.trim()}>
        {children}
      </div>
    </section>
  );
}

export default Section;
