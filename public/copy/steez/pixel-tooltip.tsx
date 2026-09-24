/**
 * Standalone Steez UI copy of Pixel Tooltip.
 *
 * Generated from packages/ui/src/components/PixelTooltip.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";
import { useId } from "react";

const __styles_steez_pixel_tooltip_0: Record<string, string> = {
  "trigger": "steez-pixel-tooltip-0-trigger",
  "tooltip": "steez-pixel-tooltip-0-tooltip",
  "pixelContainer": "steez-pixel-tooltip-0-pixelContainer",
  "content": "steez-pixel-tooltip-0-content",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/PixelTooltip.module.css */
.steez-pixel-tooltip-0-trigger {
  display: inline-flex;
  align-items: center;
  cursor: help;
}

.steez-pixel-tooltip-0-tooltip {
  position: fixed;
  z-index: var(--z-tooltip, 70);
  pointer-events: none;
  opacity: 0;
  /* Opacity-only transition so placement transforms are not overridden on show */
  transition: opacity 250ms ease-in-out;
}

.steez-pixel-tooltip-0-tooltip.show {
  opacity: 1;
}

.steez-pixel-tooltip-0-pixelContainer {
  position: relative;
  width: fit-content;
  max-width: 150px;
  padding: 6px 10px;
  background: var(--accent-primary, #ee1401);
  border: 1px solid var(--accent-primary, #ee1401);
  white-space: normal;
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
}

.steez-pixel-tooltip-0-content {
  position: relative;
  z-index: 1;
  color: #fff;
  font-family: var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
  font-size: 11px;
  line-height: 1.3;
  text-align: left;
}

/* Placement transforms relative to anchor (coords.x/y from getBoundingClientRect) */
.steez-pixel-tooltip-0-tooltip.top {
  transform: translate(-50%, calc(-100% - 8px));
}

.steez-pixel-tooltip-0-tooltip.bottom {
  transform: translate(-50%, 8px);
}

.steez-pixel-tooltip-0-tooltip.left {
  transform: translate(calc(-100% - 8px), -50%);
}

.steez-pixel-tooltip-0-tooltip.right {
  transform: translate(8px, -50%);
}

@media (max-width: 768px) {
  .steez-pixel-tooltip-0-tooltip {
    display: none;
  }
}
`;
const __steezStandaloneStyleKey = "pixel-tooltip";

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
        className={__styles_steez_pixel_tooltip_0.trigger}
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
          className={`${__styles_steez_pixel_tooltip_0.tooltip} ${__styles_steez_pixel_tooltip_0[position]} ${__styles_steez_pixel_tooltip_0.show}`.trim()}
          style={{
            left: `${coords.x}px`,
            top: `${coords.y}px`,
            width: `${Math.max(coords.width - 20, 60)}px`,
          }}
        >
          <div className={__styles_steez_pixel_tooltip_0.pixelContainer}>
            <div className={__styles_steez_pixel_tooltip_0.content}>{content}</div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default PixelTooltip;
