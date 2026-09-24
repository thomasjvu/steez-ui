/**
 * Standalone Steez UI copy of Section Header.
 *
 * Generated from packages/ui/src/components/SectionHeader.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";

const __styles_steez_section_header_0: Record<string, string> = {
  "sectionHeader": "steez-section-header-0-sectionHeader",
  "headerContent": "steez-section-header-0-headerContent",
  "textContent": "steez-section-header-0-textContent",
  "title": "steez-section-header-0-title",
  "description": "steez-section-header-0-description",
  "actions": "steez-section-header-0-actions",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/SectionHeader.module.css */
.steez-section-header-0-sectionHeader {
  background: var(--bg-secondary, #0a0a0a);
  border: 1px solid var(--border-color, rgba(203, 203, 204, 0.2));
  border-radius: 8px;
  padding: 1rem 1.25rem;
  margin-bottom: 1.25rem;
}

.steez-section-header-0-headerContent {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.steez-section-header-0-textContent {
  flex: 1;
  min-width: 0;
}

.steez-section-header-0-title {
  margin: 0 0 0.25rem;
  color: var(--text-primary, #cbcbcc);
  font-family: var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.steez-section-header-0-description {
  margin: 0;
  color: var(--text-secondary, #999999);
  font-size: 0.8125rem;
  line-height: 1.5;
}

.steez-section-header-0-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .steez-section-header-0-headerContent {
    flex-direction: column;
    align-items: stretch;
  }

  .steez-section-header-0-actions {
    justify-content: flex-end;
  }
}
`;
const __steezStandaloneStyleKey = "section-header";

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

export interface SectionHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function SectionHeader({
  title,
  description,
  actions,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`${__styles_steez_section_header_0.sectionHeader} ${className}`.trim()}>
      <div className={__styles_steez_section_header_0.headerContent}>
        <div className={__styles_steez_section_header_0.textContent}>
          <h2 className={__styles_steez_section_header_0.title}>{title}</h2>
          {description ? (
            <p className={__styles_steez_section_header_0.description}>{description}</p>
          ) : null}
        </div>
        {actions ? <div className={__styles_steez_section_header_0.actions}>{actions}</div> : null}
      </div>
    </div>
  );
}

export default SectionHeader;
