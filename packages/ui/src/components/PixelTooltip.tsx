import React from "react";

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

  const handleMouseEnter = React.useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setCoords(coordsForPosition(rect, position));
      }
      setIsVisible(true);
    }, delay);
  }, [delay, position]);

  const handleMouseLeave = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsVisible(false);
  }, []);

  React.useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    },
    [],
  );

  return (
    <>
      <div
        ref={triggerRef}
        className={styles.trigger}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>

      {isVisible ? (
        <div
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
