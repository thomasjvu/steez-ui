import React from "react";

import styles from "./AccordionFeatureCard.module.css";

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
  const panelId = id ? `${id}-panel` : undefined;
  const [internalExpanded, setInternalExpanded] = React.useState(defaultExpanded);
  const isExpanded = collapsible ? expanded ?? internalExpanded : true;

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
      className={`${styles.card} ${className}`.trim()}
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
      <div className={`${styles.outerFrame} ${styles.mediaFrame}`}>
        <div className={`${styles.innerFrame} ${styles.mediaInner}`}>
          <img className={styles.image} src={imageSrc} alt={imageAlt} />
          <div className={styles.imageOverlay} aria-hidden="true" />
        </div>
      </div>

      <div className={`${styles.outerFrame} ${styles.contentFrame}`}>
        <div className={`${styles.innerFrame} ${styles.contentInner}`}>
          {badge ? <div className={styles.badge}>{badge}</div> : null}

          <div id={panelId} className={styles.layout}>
            <h2 className={styles.verticalTitle}>
              {verticalTitle ?? title}
            </h2>

            <div className={styles.copy}>
              {eyebrow ? <div className={styles.eyebrow}>{eyebrow}</div> : null}
              <h3 className={styles.title}>{title}</h3>
              {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
              {description ? (
                <p className={styles.description}>{description}</p>
              ) : null}
              {children ? <div className={styles.body}>{children}</div> : null}
              {footer ? <div className={styles.footer}>{footer}</div> : null}
            </div>
          </div>

          {collapsible ? (
            <button
              type="button"
              className={styles.toggle}
              aria-expanded={isExpanded}
              aria-controls={panelId}
              aria-label={toggleLabel}
              onClick={handleToggle}
            >
              <svg
                className={styles.toggleIcon}
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
