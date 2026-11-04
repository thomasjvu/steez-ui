"use client";

import React from "react";

import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import styles from "./AsciiRippleText.module.css";
import {
  DEFAULT_CHARACTER_SET,
  addWave,
  focusIndex,
  liveWaves,
  pointerIndex,
  rippleFrame,
  safeRippleOptions,
  type Wave,
} from "./AsciiRippleText.waves";

export interface AsciiRippleTextProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  children: string;
  durationMs?: number;
  characterSet?: string;
  preserveSpaces?: boolean;
  spread?: number;
  disabled?: boolean;
  wrap?: boolean;
}

export function AsciiRippleText({
  children,
  durationMs = 900,
  characterSet = DEFAULT_CHARACTER_SET,
  preserveSpaces = true,
  spread = 1,
  disabled = false,
  wrap = false,
  className = "",
  ...props
}: AsciiRippleTextProps) {
  const visualRef = React.useRef<HTMLSpanElement | null>(null);
  const text = React.useMemo(() => String(children), [children]);
  const reducedMotion = usePrefersReducedMotion();

  React.useEffect(() => {
    const element = visualRef.current;
    if (!element) {
      return undefined;
    }

    element.textContent = text;

    if (disabled || text.length === 0) {
      element.style.width = "";
      element.classList.remove(styles.active);
      return undefined;
    }

    if (reducedMotion) {
      return undefined;
    }

    let isAnimating = false;
    let isHovering = false;
    let cursorPosition = 0;
    let waves: Wave[] = [];
    let animationId: number | null = null;
    let queuedWaveFrame: number | null = null;
    let queuedWavePosition: number | null = null;
    let lockedWidth: number | null = null;
    const options = safeRippleOptions({ characterSet, durationMs, preserveSpaces, spread });

    const setRenderedText = (nextText: string) => {
      if (element.textContent !== nextText) {
        element.textContent = nextText;
      }
    };

    const updateCursorPosition = (event: MouseEvent) => {
      cursorPosition = pointerIndex(event.clientX, element.getBoundingClientRect(), text.length);
    };

    const stop = () => {
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }

      setRenderedText(text);
      element.classList.remove(styles.active);
      element.style.width = "";
      lockedWidth = null;
      isAnimating = false;
    };

    const start = () => {
      if (isAnimating) {
        return;
      }

      if (lockedWidth === null) {
        lockedWidth = element.getBoundingClientRect().width;
        element.style.width = `${lockedWidth}px`;
      }

      isAnimating = true;
      element.classList.add(styles.active);

      const animate = () => {
        const now = Date.now();
        waves = liveWaves(waves, now, options.durationMs);

        if (waves.length === 0) {
          stop();
          return;
        }

        setRenderedText(rippleFrame(text, waves, now, options));
        animationId = requestAnimationFrame(animate);
      };

      animationId = requestAnimationFrame(animate);
    };

    const appendWave = (startPos: number) => {
      waves = addWave(waves, startPos, Date.now());
      if (!isAnimating) {
        start();
      }
    };

    const flushQueuedWave = () => {
      queuedWaveFrame = null;
      if (queuedWavePosition === null) {
        return;
      }

      const nextPosition = queuedWavePosition;
      queuedWavePosition = null;
      appendWave(nextPosition);
    };

    const startWave = () => {
      // Pointer events can arrive several times between paint frames. Keep only
      // the latest position so a fast pointer cannot create an unbounded queue.
      queuedWavePosition = cursorPosition;
      if (queuedWaveFrame === null) {
        queuedWaveFrame = requestAnimationFrame(flushQueuedWave);
      }
    };

    const handleEnter = (event: MouseEvent) => {
      isHovering = true;
      updateCursorPosition(event);
      startWave();
    };

    const handleMove = (event: MouseEvent) => {
      if (!isHovering) {
        return;
      }

      const previousPosition = cursorPosition;
      updateCursorPosition(event);
      if (cursorPosition !== previousPosition) {
        startWave();
      }
    };

    const handleLeave = () => {
      isHovering = false;
    };

    const handleFocus = () => {
      cursorPosition = focusIndex(text.length);
      startWave();
    };

    const handleBlur = () => {
      isHovering = false;
    };

    element.addEventListener("mouseenter", handleEnter);
    element.addEventListener("mousemove", handleMove);
    element.addEventListener("mouseleave", handleLeave);
    element.addEventListener("focus", handleFocus);
    element.addEventListener("blur", handleBlur);

    return () => {
      element.removeEventListener("mouseenter", handleEnter);
      element.removeEventListener("mousemove", handleMove);
      element.removeEventListener("mouseleave", handleLeave);
      element.removeEventListener("focus", handleFocus);
      element.removeEventListener("blur", handleBlur);
      if (queuedWaveFrame !== null) {
        cancelAnimationFrame(queuedWaveFrame);
        queuedWaveFrame = null;
      }
      queuedWavePosition = null;
      stop();
      waves = [];
    };
  }, [characterSet, disabled, durationMs, preserveSpaces, reducedMotion, spread, text]);

  return (
    <span
      className={`${styles.root} ${wrap ? styles.wrap : ""} ${className}`.trim()}
      {...props}
    >
      <span className={styles.srOnly}>{text}</span>
      <span ref={visualRef} className={styles.visual} aria-hidden="true">
        {text}
      </span>
    </span>
  );
}

export default AsciiRippleText;
