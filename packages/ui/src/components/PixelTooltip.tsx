import React from "react";

import { useStableId } from "../hooks/useStableId.js";
import styles from "./PixelTooltip.module.css";

export type PixelTooltipPosition = "top" | "bottom" | "left" | "right";

export interface PixelTooltipProps {
  content: string;
  children: React.ReactNode;
  position?: PixelTooltipPosition;
  delay?: number;
}

/** Anchor point for fixed positioning; CSS transform classes handle offset from this point. */
export function coordsForPosition(
  rect: DOMRect,
  position: PixelTooltipPosition,
): { x: number; y: number; width: number } {
  const width = rect.width;
  switch (position) {
    case "bottom":
      return { x: rect.left + width / 2, y: rect.bottom, width };
    case "left":
      return { x: rect.left, y: rect.top + rect.height / 2, width };
    case "right":
      return { x: rect.right, y: rect.top + rect.height / 2, width };
    case "top":
    default:
      return { x: rect.left + width / 2, y: rect.top, width };
  }
}

export function PixelTooltip({
  content,
  children,
  position = "top",
  delay = 200,
}: PixelTooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [coords, setCoords] = React.useState({ x: 0, y: 0, width: 0 });
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const openIntentRef = React.useRef({ hover: false, focus: false });
  const tooltipId = useStableId("pixel-tooltip");

  const clearShowTimeout = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const scheduleShow = React.useCallback(() => {
    clearShowTimeout();
    timeoutRef.current = setTimeout(() => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setCoords(coordsForPosition(rect, position));
      }
      setIsVisible(true);
      timeoutRef.current = null;
    }, delay);
  }, [clearShowTimeout, delay, position]);

  const hideIfIdle = React.useCallback(() => {
    const { hover, focus } = openIntentRef.current;
    if (hover || focus) {
      return;
    }
    clearShowTimeout();
    setIsVisible(false);
  }, [clearShowTimeout]);

  const handleMouseEnter = React.useCallback(() => {
    openIntentRef.current.hover = true;
    scheduleShow();
  }, [scheduleShow]);

  const handleMouseLeave = React.useCallback(() => {
    openIntentRef.current.hover = false;
    hideIfIdle();
  }, [hideIfIdle]);

  const handleFocus = React.useCallback(() => {
    openIntentRef.current.focus = true;
    scheduleShow();
  }, [scheduleShow]);

  const handleBlur = React.useCallback(() => {
    openIntentRef.current.focus = false;
    hideIfIdle();
  }, [hideIfIdle]);

  React.useEffect(
    () => () => {
      clearShowTimeout();
    },
    [clearShowTimeout],
  );

  return (
    <>
      <div
        ref={triggerRef}
        className={styles.trigger}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-describedby={isVisible ? tooltipId : undefined}
      >
        {children}
      </div>

      {isVisible ? (
        <div
          id={tooltipId}
          role="tooltip"
          className={`${styles.tooltip} ${styles[position]} ${styles.show}`.trim()}
          style={{
            left: `${coords.x}px`,
            top: `${coords.y}px`,
            width: `${Math.max(coords.width - 20, 60)}px`,
          }}
        >
          <div className={styles.pixelContainer}>
            <div className={styles.content}>{content}</div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default PixelTooltip;
