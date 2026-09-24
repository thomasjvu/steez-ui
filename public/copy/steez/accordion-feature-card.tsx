/**
 * Standalone Steez UI copy of Accordion Feature Card.
 *
 * Generated from packages/ui/src/components/AccordionFeatureCard.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";
import { useId } from "react";

const __styles_steez_accordion_feature_card_0: Record<string, string> = {
  "card": "steez-accordion-feature-card-0-card",
  "outerFrame": "steez-accordion-feature-card-0-outerFrame",
  "innerFrame": "steez-accordion-feature-card-0-innerFrame",
  "mediaFrame": "steez-accordion-feature-card-0-mediaFrame",
  "mediaInner": "steez-accordion-feature-card-0-mediaInner",
  "image": "steez-accordion-feature-card-0-image",
  "imageOverlay": "steez-accordion-feature-card-0-imageOverlay",
  "contentFrame": "steez-accordion-feature-card-0-contentFrame",
  "contentInner": "steez-accordion-feature-card-0-contentInner",
  "badge": "steez-accordion-feature-card-0-badge",
  "layout": "steez-accordion-feature-card-0-layout",
  "verticalTitle": "steez-accordion-feature-card-0-verticalTitle",
  "copy": "steez-accordion-feature-card-0-copy",
  "eyebrow": "steez-accordion-feature-card-0-eyebrow",
  "title": "steez-accordion-feature-card-0-title",
  "subtitle": "steez-accordion-feature-card-0-subtitle",
  "description": "steez-accordion-feature-card-0-description",
  "body": "steez-accordion-feature-card-0-body",
  "footer": "steez-accordion-feature-card-0-footer",
  "toggle": "steez-accordion-feature-card-0-toggle",
  "toggleIcon": "steez-accordion-feature-card-0-toggleIcon",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/AccordionFeatureCard.module.css */
.steez-accordion-feature-card-0-card {
  --accordion-feature-card-corner-size: 1.6rem;
  --accordion-feature-card-border-width: 1px;
  --accordion-feature-card-image-width: clamp(7rem, 26vw, 10rem);
  --accordion-feature-card-collapsed-width: clamp(3.5rem, 10vw, 4.5rem);
  --accordion-feature-card-min-height: 26rem;
  --accordion-feature-card-border-color: color-mix(in srgb, var(--text-primary, #cbcbcc) 88%, transparent);
  --accordion-feature-card-media-surface: linear-gradient(
    180deg,
    color-mix(in srgb, var(--bg-secondary, #0a0a0a) 82%, transparent),
    color-mix(in srgb, var(--bg-primary, #010607) 94%, transparent)
  );
  --accordion-feature-card-content-surface: linear-gradient(
    180deg,
    color-mix(in srgb, var(--bg-secondary, #0a0a0a) 95%, transparent),
    color-mix(in srgb, var(--bg-primary, #010607) 98%, transparent)
  );
  --accordion-feature-card-image-overlay: linear-gradient(
    140deg,
    rgba(1, 6, 7, 0.18) 0%,
    rgba(1, 6, 7, 0.6) 55%,
    rgba(1, 6, 7, 0.9) 100%
  );
  --accordion-feature-card-title-color: var(--text-primary, #cbcbcc);
  --accordion-feature-card-subtitle-color: color-mix(in srgb, var(--text-primary, #cbcbcc) 84%, transparent);
  --accordion-feature-card-body-color: var(--text-secondary, #999999);
  --accordion-feature-card-accent: var(--accent-primary, #ee1401);
  --accordion-feature-card-toggle-background: color-mix(in srgb, var(--bg-primary, #010607) 92%, transparent);
  --accordion-feature-card-toggle-foreground: var(--text-primary, #cbcbcc);

  display: grid;
  grid-template-columns:
    minmax(6.5rem, var(--accordion-feature-card-image-width))
    minmax(3.5rem, var(--accordion-feature-card-collapsed-width));
  position: relative;
  min-height: var(--accordion-feature-card-min-height);
  height: 100%;
  overflow: clip;
  color: var(--text-primary, #cbcbcc);
  transition: grid-template-columns 450ms var(--ease-out-expo, cubic-bezier(0.16, 1, 0.3, 1));
}

.steez-accordion-feature-card-0-card > * {
  min-width: 0;
  grid-row: 1;
}

.steez-accordion-feature-card-0-outerFrame,
.steez-accordion-feature-card-0-innerFrame {
  clip-path: polygon(
    var(--accordion-feature-card-corner-size) 0%,
    calc(100% - var(--accordion-feature-card-corner-size)) 0%,
    100% var(--accordion-feature-card-corner-size),
    100% calc(100% - var(--accordion-feature-card-corner-size)),
    calc(100% - var(--accordion-feature-card-corner-size)) 100%,
    var(--accordion-feature-card-corner-size) 100%,
    0% calc(100% - var(--accordion-feature-card-corner-size)),
    0% var(--accordion-feature-card-corner-size)
  );
}

.steez-accordion-feature-card-0-outerFrame {
  background: var(--accordion-feature-card-border-color);
  padding: var(--accordion-feature-card-border-width);
  display: flex;
}

.steez-accordion-feature-card-0-innerFrame {
  flex: 1 1 auto;
  min-height: 0;
}

.steez-accordion-feature-card-0-mediaFrame {
  grid-column: 1 / -1;
}

.steez-accordion-feature-card-0-mediaInner {
  position: relative;
  background: var(--accordion-feature-card-media-surface);
  overflow: hidden;
}

.steez-accordion-feature-card-0-image {
  display: block;
  width: calc(var(--accordion-feature-card-image-width) + var(--accordion-feature-card-corner-size));
  min-width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: var(--accordion-feature-card-image-position, center center);
  filter: saturate(0.88) contrast(1.04) brightness(0.92);
}

.steez-accordion-feature-card-0-imageOverlay {
  position: absolute;
  inset: 0;
  background: var(--accordion-feature-card-image-overlay);
  pointer-events: none;
}

.steez-accordion-feature-card-0-contentFrame {
  grid-column: 2;
  position: relative;
}

.steez-accordion-feature-card-0-contentInner {
  position: relative;
  background: var(--accordion-feature-card-content-surface);
  overflow: hidden;
}

.steez-accordion-feature-card-0-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 2;
}

.steez-accordion-feature-card-0-layout {
  position: absolute;
  inset: var(--accordion-feature-card-corner-size) auto auto var(--accordion-feature-card-corner-size);
  display: flex;
  align-items: stretch;
  gap: 1.35rem;
  width: min(24rem, calc(100vw - 7rem));
  height: calc(100% - 5.4rem);
  padding-right: 1.25rem;
  padding-bottom: 0.5rem;
  transform: translateX(-0.95rem);
  transition: transform 450ms var(--ease-out-expo, cubic-bezier(0.16, 1, 0.3, 1));
}

/*
 * Keep the collapsed panel painted for the vertical title strip and width
 * transitions. The HTML \`hidden\` attribute still removes the region from the
 * accessibility tree (and blocks focus), which is the a11y goal.
 */
.steez-accordion-feature-card-0-layout[hidden] {
  display: flex;
}

.steez-accordion-feature-card-0-verticalTitle {
  margin: 0;
  font-family: var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  color: color-mix(in srgb, var(--accordion-feature-card-title-color) 54%, transparent);
}

.steez-accordion-feature-card-0-copy {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: min(100%, 18rem);
  min-width: 0;
  padding-top: 0.15rem;
}

.steez-accordion-feature-card-0-eyebrow {
  font-family: var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accordion-feature-card-accent);
}

.steez-accordion-feature-card-0-title {
  margin: 0;
  font-family: var(--font-display, "BBH Bartle", "Zed Sans", "Inter", "Segoe UI", system-ui, -apple-system, sans-serif);
  font-size: clamp(1.45rem, 1.1rem + 0.9vw, 1.9rem);
  line-height: 0.96;
  text-transform: uppercase;
  color: var(--accordion-feature-card-title-color);
}

.steez-accordion-feature-card-0-subtitle,
.steez-accordion-feature-card-0-description {
  margin: 0;
}

.steez-accordion-feature-card-0-subtitle {
  font-size: 0.86rem;
  line-height: 1.45;
  color: var(--accordion-feature-card-subtitle-color);
}

.steez-accordion-feature-card-0-description {
  font-size: 0.82rem;
  line-height: 1.62;
  color: var(--accordion-feature-card-body-color);
}

.steez-accordion-feature-card-0-body {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  color: var(--accordion-feature-card-body-color);
  min-height: 0;
}

.steez-accordion-feature-card-0-footer {
  margin-top: auto;
  padding-top: 0.2rem;
}

.steez-accordion-feature-card-0-toggle {
  position: absolute;
  left: 0.8rem;
  bottom: 0.8rem;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  padding: 0;
  border: 1px solid color-mix(in srgb, var(--accordion-feature-card-border-color) 92%, transparent);
  border-radius: 999px;
  background: var(--accordion-feature-card-toggle-background);
  color: var(--accordion-feature-card-toggle-foreground);
  cursor: pointer;
  transition:
    transform var(--transition-normal, 220ms ease),
    border-color var(--transition-normal, 220ms ease),
    background-color var(--transition-normal, 220ms ease);
}

.steez-accordion-feature-card-0-toggle:hover {
  transform: translateY(-1px);
  border-color: var(--accordion-feature-card-accent);
}

.steez-accordion-feature-card-0-toggleIcon {
  width: 1rem;
  height: 1rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform var(--transition-normal, 220ms ease);
}

.steez-accordion-feature-card-0-card[data-expanded="true"] {
  grid-template-columns:
    minmax(6.5rem, var(--accordion-feature-card-image-width))
    minmax(15rem, 1fr);
}

.steez-accordion-feature-card-0-card[data-expanded="true"] .steez-accordion-feature-card-0-layout {
  transform: translateX(-3.35rem);
}

.steez-accordion-feature-card-0-card[data-expanded="true"] .steez-accordion-feature-card-0-toggleIcon {
  transform: rotate(45deg);
}

.steez-accordion-feature-card-0-card[data-collapsible="false"] .steez-accordion-feature-card-0-layout {
  transform: translateX(-3.35rem);
}

@media (max-width: 720px) {
  .steez-accordion-feature-card-0-card,
  .steez-accordion-feature-card-0-card[data-expanded="true"] {
    grid-template-columns: 1fr;
    min-height: auto;
  }

  .steez-accordion-feature-card-0-mediaFrame {
    grid-column: 1;
    min-height: 13.5rem;
  }

  .steez-accordion-feature-card-0-contentFrame {
    grid-column: 1;
    grid-row: 2;
    margin-top: -1.6rem;
  }

  .steez-accordion-feature-card-0-layout,
  .steez-accordion-feature-card-0-card[data-expanded="true"] .steez-accordion-feature-card-0-layout,
  .steez-accordion-feature-card-0-card[data-collapsible="false"] .steez-accordion-feature-card-0-layout {
    position: relative;
    inset: auto;
    width: auto;
    height: auto;
    min-height: 100%;
    padding: 1.35rem 1.2rem 4.35rem;
    transform: none;
    gap: 0.95rem;
  }

  .steez-accordion-feature-card-0-verticalTitle {
    writing-mode: horizontal-tb;
    transform: none;
    letter-spacing: 0.18em;
  }

  .steez-accordion-feature-card-0-copy {
    width: 100%;
  }

  .steez-accordion-feature-card-0-body,
  .steez-accordion-feature-card-0-footer {
    transition:
      opacity var(--transition-normal, 220ms ease),
      max-height var(--transition-normal, 220ms ease);
    overflow: hidden;
  }

  .steez-accordion-feature-card-0-card[data-expanded="false"] .steez-accordion-feature-card-0-body,
  .steez-accordion-feature-card-0-card[data-expanded="false"] .steez-accordion-feature-card-0-footer {
    max-height: 0;
    opacity: 0;
    padding-top: 0;
  }

  .steez-accordion-feature-card-0-card[data-expanded="true"] .steez-accordion-feature-card-0-body,
  .steez-accordion-feature-card-0-card[data-expanded="true"] .steez-accordion-feature-card-0-footer,
  .steez-accordion-feature-card-0-card[data-collapsible="false"] .steez-accordion-feature-card-0-body,
  .steez-accordion-feature-card-0-card[data-collapsible="false"] .steez-accordion-feature-card-0-footer {
    max-height: 24rem;
    opacity: 1;
  }

  .steez-accordion-feature-card-0-toggle {
    left: auto;
    right: 0.9rem;
    bottom: 0.9rem;
  }
}
`;
const __steezStandaloneStyleKey = "accordion-feature-card";

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

export function useStableId(prefix: string, explicitId?: string): string {
  const reactId = useId().replace(/:/g, "");
  return explicitId || `${prefix}-${reactId}`;
}

export interface AccordionFeatureCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  eyebrow?: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  verticalTitle?: React.ReactNode;
  badge?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  imageSrc: string;
  imageAlt?: string;
  imageObjectPosition?: string;
  defaultExpanded?: boolean;
  expanded?: boolean;
  collapsible?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  toggleLabel?: string;
}

export function AccordionFeatureCard({
  title,
  eyebrow,
  subtitle,
  description,
  verticalTitle,
  badge,
  footer,
  children,
  imageSrc,
  imageAlt = "",
  imageObjectPosition,
  defaultExpanded = false,
  expanded,
  collapsible = true,
  onExpandedChange,
  toggleLabel = "Toggle card details",
  id,
  className = "",
  style,
  ...props
}: AccordionFeatureCardProps) {
  // Always generate a stable panel id so aria-controls is set even without a user id.
  const panelId = useStableId(
    "accordion-feature-panel",
    id ? `${id}-panel` : undefined,
  );
  const [internalExpanded, setInternalExpanded] = React.useState(defaultExpanded);
  const isExpanded = collapsible ? expanded ?? internalExpanded : true;
  const isPanelCollapsed = collapsible && !isExpanded;

  const handleToggle = React.useCallback(() => {
    if (!collapsible) {
      return;
    }

    const next = !isExpanded;

    if (expanded === undefined) {
      setInternalExpanded(next);
    }

    onExpandedChange?.(next);
  }, [collapsible, expanded, isExpanded, onExpandedChange]);

  return (
    <article
      className={`${__styles_steez_accordion_feature_card_0.card} ${className}`.trim()}
      id={id}
      data-expanded={isExpanded ? "true" : "false"}
      data-collapsible={collapsible ? "true" : "false"}
      style={
        {
          "--accordion-feature-card-image-position": imageObjectPosition,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      <div className={`${__styles_steez_accordion_feature_card_0.outerFrame} ${__styles_steez_accordion_feature_card_0.mediaFrame}`}>
        <div className={`${__styles_steez_accordion_feature_card_0.innerFrame} ${__styles_steez_accordion_feature_card_0.mediaInner}`}>
          <img className={__styles_steez_accordion_feature_card_0.image} src={imageSrc} alt={imageAlt} />
          <div className={__styles_steez_accordion_feature_card_0.imageOverlay} aria-hidden="true" />
        </div>
      </div>

      <div className={`${__styles_steez_accordion_feature_card_0.outerFrame} ${__styles_steez_accordion_feature_card_0.contentFrame}`}>
        <div className={`${__styles_steez_accordion_feature_card_0.innerFrame} ${__styles_steez_accordion_feature_card_0.contentInner}`}>
          {badge ? <div className={__styles_steez_accordion_feature_card_0.badge}>{badge}</div> : null}

          {/*
            Prefer `hidden` on the expandable content region so collapsed copy is
            out of the a11y tree. Override UA `display: none` in CSS so the
            vertical title strip / transitions stay painted.
          */}
          <div
            id={panelId}
            className={__styles_steez_accordion_feature_card_0.layout}
            hidden={isPanelCollapsed || undefined}
          >
            <h2 className={__styles_steez_accordion_feature_card_0.verticalTitle}>
              {verticalTitle ?? title}
            </h2>

            <div className={__styles_steez_accordion_feature_card_0.copy}>
              {eyebrow ? <div className={__styles_steez_accordion_feature_card_0.eyebrow}>{eyebrow}</div> : null}
              <h3 className={__styles_steez_accordion_feature_card_0.title}>{title}</h3>
              {subtitle ? <p className={__styles_steez_accordion_feature_card_0.subtitle}>{subtitle}</p> : null}
              {description ? (
                <p className={__styles_steez_accordion_feature_card_0.description}>{description}</p>
              ) : null}
              {children ? <div className={__styles_steez_accordion_feature_card_0.body}>{children}</div> : null}
              {footer ? <div className={__styles_steez_accordion_feature_card_0.footer}>{footer}</div> : null}
            </div>
          </div>

          {collapsible ? (
            <button
              type="button"
              className={__styles_steez_accordion_feature_card_0.toggle}
              aria-expanded={isExpanded}
              aria-controls={panelId}
              aria-label={toggleLabel}
              onClick={handleToggle}
            >
              <svg
                className={__styles_steez_accordion_feature_card_0.toggleIcon}
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default AccordionFeatureCard;
