import React from "react";

import { CloseIcon } from "@steez-ui/icons";

import { NotchedViewportFrame } from "./NotchedViewportFrame.js";
import styles from "./RadialMenuOverlay.module.css";

const FULL_CIRCLE_DEGREES = 360;
const JOYSTICK_MAX_RADIUS_RATIO = 0.28;
const JOYSTICK_ACTIVATION_RATIO = 0.34;
const JOYSTICK_COMMIT_RATIO = 0.78;

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
  const [isPending, startTransition] = React.useTransition();
  const [activeId, setActiveId] = React.useState(items[0]?.id ?? "");
  const [isDragging, setIsDragging] = React.useState(false);
  const [stickOffset, setStickOffset] = React.useState({ x: 0, y: 0 });
  const wheelRef = React.useRef<HTMLDivElement | null>(null);
  const activeIdRef = React.useRef(activeId);
  const dragPointerIdRef = React.useRef<number | null>(null);
  const itemsRef = React.useRef(items);
  const onCloseRef = React.useRef(onClose);

  itemsRef.current = items;
  onCloseRef.current = onClose;

  React.useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  React.useEffect(() => {
    if (!open) {
      return undefined;
    }

    setActiveId(items[0]?.id ?? "");
    setStickOffset({ x: 0, y: 0 });
    setIsDragging(false);
    dragPointerIdRef.current = null;
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

  const getClosestItem = (angle: number) => {
    let closest = items[0];
    let closestDistance = Number.POSITIVE_INFINITY;

    items.forEach((item, index) => {
      const itemAngle = -90 + (FULL_CIRCLE_DEGREES / Math.max(items.length, 1)) * index;
      const normalizedDistance = Math.abs(
        ((((angle - itemAngle) % FULL_CIRCLE_DEGREES) + 540) % FULL_CIRCLE_DEGREES) - 180,
      );

      if (normalizedDistance < closestDistance) {
        closest = item;
        closestDistance = normalizedDistance;
      }
    });

    return closest;
  };

  const resetStick = React.useCallback(() => {
    dragPointerIdRef.current = null;
    setIsDragging(false);
    setStickOffset({ x: 0, y: 0 });
  }, []);

  const triggerItem = React.useCallback((item: RadialMenuItem) => {
    item.onSelect?.();

    if (item.href && typeof window !== "undefined") {
      if (item.href.startsWith("#")) {
        const target = document.querySelector<HTMLElement>(item.href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.location.hash = item.href;
        }
      } else {
        window.location.assign(item.href);
      }
    }

    onCloseRef.current();
  }, []);

  const updateStickFromPointer = React.useCallback(
    (clientX: number, clientY: number) => {
      const wheel = wheelRef.current;
      if (!wheel) {
        return 0;
      }

      const rect = wheel.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);
      const maxDistance = Math.min(rect.width, rect.height) * JOYSTICK_MAX_RADIUS_RATIO;
      const clampRatio = distance > maxDistance && distance > 0 ? maxDistance / distance : 1;
      const x = deltaX * clampRatio;
      const y = deltaY * clampRatio;
      const normalizedDistance = maxDistance > 0 ? distance / maxDistance : 0;

      setStickOffset({ x, y });

      if (normalizedDistance >= JOYSTICK_ACTIVATION_RATIO) {
        const nextItem = getClosestItem((Math.atan2(y, x) * 180) / Math.PI);
        if (nextItem.id !== activeIdRef.current) {
          activeIdRef.current = nextItem.id;
          startTransition(() => {
            setActiveId(nextItem.id);
          });
        }
      }

      return normalizedDistance;
    },
    [getClosestItem],
  );

  React.useEffect(() => {
    if (!isDragging || typeof window === "undefined") {
      return undefined;
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (dragPointerIdRef.current !== null && event.pointerId !== dragPointerIdRef.current) {
        return;
      }

      updateStickFromPointer(event.clientX, event.clientY);
    };

    const handlePointerEnd = (event: PointerEvent) => {
      if (dragPointerIdRef.current !== null && event.pointerId !== dragPointerIdRef.current) {
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

  const activeItem = items.find((item) => item.id === activeId) ?? items[0];
  const activeIndex = Math.max(
    0,
    items.findIndex((item) => item.id === activeItem.id),
  );
  const angleStep = FULL_CIRCLE_DEGREES / Math.max(items.length, 1);
  const stickLength = Math.hypot(stickOffset.x, stickOffset.y);
  const stickAngle = Math.atan2(stickOffset.y, stickOffset.x);

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
                <div className={styles.axisHorizontal} aria-hidden="true" />
                <div className={styles.axisVertical} aria-hidden="true" />

                {items.map((item, index) => {
                  const angle = -90 + angleStep * index;
                  const isActive = item.id === activeItem.id;

                  return (
                    <button
                      type="button"
                      key={item.id}
                      className={`${styles.node} ${isActive ? styles.nodeActive : ""}`}
                      style={
                        {
                          "--wheel-angle": `${angle}deg`,
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
                        {item.shortLabel ?? String(index + 1).padStart(2, "0")}
                      </span>
                      <span className={styles.nodeLabel}>{item.label}</span>
                    </button>
                  );
                })}

                <div className={styles.core}>
                  <div className={styles.coreKicker}>Control stick</div>
                  <div className={styles.coreTitle}>{activeItem.label}</div>
                  <div className={styles.coreMeta}>
                    Drag out. Release at the edge.
                  </div>
                </div>
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
