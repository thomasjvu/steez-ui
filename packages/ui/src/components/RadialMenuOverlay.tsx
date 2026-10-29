"use client";

import React from "react";

import { CloseIcon } from "@steez-ui/icons";

import { NotchedViewportFrame } from "./NotchedViewportFrame.tsx";
import { useModalOverlay } from "./RadialMenuOverlay.focus";
import {
  closestNodeIndex,
  JOYSTICK_ACTIVATION_RATIO,
  JOYSTICK_COMMIT_RATIO,
  nodeAngle,
  padOrdinal,
  readStick,
  stickAngleDegrees,
} from "./RadialMenuOverlay.geometry";
import styles from "./RadialMenuOverlay.module.css";

const EMPTY_ITEMS: readonly RadialMenuItem[] = [];
const CENTERED = { x: 0, y: 0 };

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

/** Scrolls to an in-page hash target or navigates to the href. */
function followHref(href: string) {
  if (!href.startsWith("#")) {
    window.location.assign(href);
    return;
  }
  const target = document.querySelector<HTMLElement>(href);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.location.hash = href;
  }
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
  const safeItems = items.length > 0 ? items : EMPTY_ITEMS;
  const [isPending, startTransition] = React.useTransition();
  const [activeId, setActiveId] = React.useState(safeItems[0]?.id ?? "");
  const [isDragging, setIsDragging] = React.useState(false);
  const [stickOffset, setStickOffset] = React.useState(CENTERED);
  const overlayRef = React.useRef<HTMLDivElement | null>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const wheelRef = React.useRef<HTMLDivElement | null>(null);
  const activeIdRef = React.useRef(activeId);
  const dragPointerIdRef = React.useRef<number | null>(null);
  const itemsRef = React.useRef(items);
  const onCloseRef = React.useRef(onClose);

  itemsRef.current = items;
  onCloseRef.current = onClose;

  useModalOverlay({ open, contained, overlayRef, initialFocusRef: closeButtonRef, onClose });

  React.useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  const resetStick = React.useCallback(() => {
    dragPointerIdRef.current = null;
    setIsDragging(false);
    setStickOffset(CENTERED);
  }, []);

  React.useEffect(() => {
    if (open) {
      setActiveId(safeItems[0]?.id ?? "");
      resetStick();
    }
  }, [open, resetStick, safeItems]);

  const triggerItem = React.useCallback((item: RadialMenuItem) => {
    item.onSelect?.();
    if (item.href && typeof window !== "undefined") {
      followHref(item.href);
    }
    onCloseRef.current();
  }, []);

  /** Moves the stick to the pointer and returns how far it reached. */
  const updateStickFromPointer = React.useCallback((clientX: number, clientY: number) => {
    const wheel = wheelRef.current;
    if (!wheel) {
      return 0;
    }

    const { x, y, progress } = readStick(wheel.getBoundingClientRect(), clientX, clientY);
    setStickOffset({ x, y });

    if (progress >= JOYSTICK_ACTIVATION_RATIO) {
      const currentItems = itemsRef.current;
      const nextItem = currentItems[closestNodeIndex(stickAngleDegrees(x, y), currentItems.length)];
      if (nextItem && nextItem.id !== activeIdRef.current) {
        activeIdRef.current = nextItem.id;
        startTransition(() => {
          setActiveId(nextItem.id);
        });
      }
    }

    return progress;
  }, []);

  React.useEffect(() => {
    if (!isDragging || typeof window === "undefined") {
      return undefined;
    }

    const isDragPointer = (event: PointerEvent) =>
      dragPointerIdRef.current === null || event.pointerId === dragPointerIdRef.current;

    const handlePointerMove = (event: PointerEvent) => {
      if (isDragPointer(event)) {
        updateStickFromPointer(event.clientX, event.clientY);
      }
    };

    const handlePointerEnd = (event: PointerEvent) => {
      if (!isDragPointer(event)) {
        return;
      }

      const progress = updateStickFromPointer(event.clientX, event.clientY);
      const selectedItem =
        itemsRef.current.find((item) => item.id === activeIdRef.current) ?? itemsRef.current[0];

      resetStick();

      if (progress >= JOYSTICK_COMMIT_RATIO && selectedItem) {
        triggerItem(selectedItem);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerEnd);
    window.addEventListener("pointercancel", handlePointerEnd);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerEnd);
      window.removeEventListener("pointercancel", handlePointerEnd);
    };
  }, [isDragging, resetStick, triggerItem, updateStickFromPointer]);

  if (!open || safeItems.length === 0) {
    return null;
  }

  const activeItem = safeItems.find((item) => item.id === activeId) ?? safeItems[0];
  const activeIndex = Math.max(
    0,
    safeItems.findIndex((item) => item.id === activeItem.id),
  );
  const stickLength = Math.hypot(stickOffset.x, stickOffset.y);
  const stickAngle = Math.atan2(stickOffset.y, stickOffset.x);

  return (
    <div
      ref={overlayRef}
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
              ref={closeButtonRef}
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
                  {padOrdinal(activeIndex + 1)} / {padOrdinal(safeItems.length)}
                </div>
                <div className={styles.detailTitle}>{activeItem.label}</div>
                <p className={styles.detailBody}>{activeItem.body}</p>
                <button
                  type="button"
                  className={styles.detailLink}
                  onClick={() => triggerItem(activeItem)}
                >
                  Open section
                </button>
              </div>
            </div>

            <div className={styles.wheelWrap}>
              <div ref={wheelRef} className={styles.wheel}>
                <div className={styles.outerRing} aria-hidden="true" />
                <div className={styles.innerRing} aria-hidden="true" />
                <div className={styles.sweepRingOuter} aria-hidden="true" />
                <div className={styles.sweepRingInner} aria-hidden="true" />
                <div className={styles.radarTicks} aria-hidden="true" />

                {safeItems.map((item, index) => {
                  const isActive = item.id === activeItem.id;

                  return (
                    <button
                      type="button"
                      key={item.id}
                      className={`${styles.node} ${isActive ? styles.nodeActive : ""}`}
                      style={
                        {
                          "--wheel-angle": `${nodeAngle(index, safeItems.length)}deg`,
                        } as React.CSSProperties
                      }
                      onMouseEnter={() => {
                        if (!isDragging) {
                          setActiveId(item.id);
                        }
                      }}
                      onFocus={() => setActiveId(item.id)}
                      onClick={() => {
                        setActiveId(item.id);
                        triggerItem(item);
                      }}
                      aria-current={isActive ? "true" : undefined}
                    >
                      <span className={styles.nodeConnector} aria-hidden="true" />
                      <span className={styles.nodeMarker}>
                        {item.shortLabel ?? padOrdinal(index + 1)}
                      </span>
                      <span className={styles.nodeLabel}>{item.label}</span>
                    </button>
                  );
                })}

                <div className={styles.core} aria-hidden="true" />
                <div
                  className={styles.stickZone}
                  onPointerDown={(event) => {
                    dragPointerIdRef.current = event.pointerId;
                    setIsDragging(true);
                    updateStickFromPointer(event.clientX, event.clientY);
                  }}
                >
                  <div
                    className={styles.stickStem}
                    style={
                      {
                        "--stick-angle": `${stickAngle}rad`,
                        "--stick-length": `${stickLength}px`,
                      } as React.CSSProperties
                    }
                    aria-hidden="true"
                  />
                  <div
                    className={`${styles.stickKnob} ${isDragging ? styles.stickKnobDragging : ""} ${
                      isPending ? styles.stickKnobPending : ""
                    }`}
                    style={
                      {
                        "--stick-x": `${stickOffset.x}px`,
                        "--stick-y": `${stickOffset.y}px`,
                      } as React.CSSProperties
                    }
                    aria-hidden="true"
                  />
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
