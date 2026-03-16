import React from "react";

import { CloseIcon } from "@steez-ui/icons";

import { NotchedViewportFrame } from "./NotchedViewportFrame.js";
import styles from "./RadialMenuOverlay.module.css";

export interface RadialMenuItem {
  id: string;
  label: string;
  eyebrow: string;
  body: string;
  href?: string;
  shortLabel?: string;
  onSelect?: () => void;
}

export interface RadialMenuOverlayProps {
  open: boolean;
  items: readonly RadialMenuItem[];
  onClose: () => void;
  className?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  brand?: React.ReactNode;
  footer?: React.ReactNode;
  contained?: boolean;
  closeLabel?: string;
  ariaLabel?: string;
}

export function RadialMenuOverlay({
  open,
  items,
  onClose,
  className = "",
  title = "Navigate the runtime",
  description = "One radial control surface for the sections that matter most.",
  brand,
  footer,
  contained = false,
  closeLabel = "Close navigation",
  ariaLabel = "Site navigation",
}: RadialMenuOverlayProps) {
  const [activeId, setActiveId] = React.useState(items[0]?.id ?? "");

  React.useEffect(() => {
    if (!open) {
      return undefined;
    }

    setActiveId(items[0]?.id ?? "");
    return undefined;
  }, [items, open]);

  React.useEffect(() => {
    if (!open || typeof window === "undefined") {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, open]);

  if (!open || items.length === 0) {
    return null;
  }

  const activeItem = items.find((item) => item.id === activeId) ?? items[0];
  const activeIndex = Math.max(
    0,
    items.findIndex((item) => item.id === activeItem.id),
  );
  const angleStep = 360 / Math.max(items.length, 1);

  return (
    <div
      className={`${styles.overlay} ${contained ? styles.contained : ""} ${className}`.trim()}
      role="dialog"
      aria-modal={contained ? undefined : "true"}
      aria-label={ariaLabel}
    >
      <button
        type="button"
        className={styles.backdrop}
        aria-label={closeLabel}
        onClick={onClose}
      />
      <div className={styles.panel}>
        <NotchedViewportFrame className={styles.frame} tone="strong" />
        <div className={styles.chrome}>
          <div className={styles.header}>
            <div className={styles.headerBlock}>
              <div className={styles.headerKicker}>Navigation</div>
              {brand ? <div className={styles.brand}>{brand}</div> : null}
            </div>
            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
              aria-label={closeLabel}
              title={closeLabel}
            >
              <CloseIcon width={16} height={16} />
            </button>
          </div>

          <div className={styles.layout}>
            <div className={styles.copy}>
              <div className={styles.copyEyebrow}>{activeItem.eyebrow}</div>
              <h2 className={styles.copyTitle}>{title}</h2>
              <p className={styles.copyBody}>{description}</p>

              <div className={styles.detailPanel}>
                <div className={styles.detailMeta}>
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(items.length).padStart(2, "0")}
                </div>
                <div className={styles.detailTitle}>{activeItem.label}</div>
                <p className={styles.detailBody}>{activeItem.body}</p>
                {activeItem.href ? (
                  <a
                    className={styles.detailLink}
                    href={activeItem.href}
                    onClick={() => {
                      activeItem.onSelect?.();
                      onClose();
                    }}
                  >
                    Open section
                  </a>
                ) : null}
              </div>
            </div>

            <div className={styles.wheelWrap}>
              <div className={styles.wheel}>
                <div className={styles.outerRing} aria-hidden="true" />
                <div className={styles.innerRing} aria-hidden="true" />
                <div className={styles.axisHorizontal} aria-hidden="true" />
                <div className={styles.axisVertical} aria-hidden="true" />

                {items.map((item, index) => {
                  const angle = -90 + angleStep * index;
                  const isActive = item.id === activeItem.id;

                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      className={`${styles.node} ${isActive ? styles.nodeActive : ""}`}
                      style={
                        {
                          "--wheel-angle": `${angle}deg`,
                        } as React.CSSProperties
                      }
                      onMouseEnter={() => setActiveId(item.id)}
                      onFocus={() => setActiveId(item.id)}
                      onClick={() => {
                        setActiveId(item.id);
                        item.onSelect?.();
                        onClose();
                      }}
                      aria-current={isActive ? "true" : undefined}
                    >
                      <span className={styles.nodeConnector} aria-hidden="true" />
                      <span className={styles.nodeMarker}>
                        {item.shortLabel ?? String(index + 1).padStart(2, "0")}
                      </span>
                      <span className={styles.nodeLabel}>{item.label}</span>
                    </a>
                  );
                })}

                <div className={styles.core}>
                  <div className={styles.coreKicker}>Quick jump</div>
                  <div className={styles.coreTitle}>{activeItem.label}</div>
                  <div className={styles.coreMeta}>
                    {String(activeIndex + 1).padStart(2, "0")} /{" "}
                    {String(items.length).padStart(2, "0")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.footer}>
            <div className={styles.footerHint}>Press Esc to close</div>
            {footer ? <div className={styles.footerContent}>{footer}</div> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RadialMenuOverlay;
