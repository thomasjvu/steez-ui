import React from "react";

import styles from "./PixelTooltip.module.css";

export interface PixelTooltipProps {
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
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
        setCoords({
          x: rect.left,
          y: rect.bottom,
          width: rect.width,
        });
      }
      setIsVisible(true);
    }, delay);
  }, [delay]);

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
            left: `${coords.x + 5}px`,
            top: `${coords.y + 8}px`,
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
