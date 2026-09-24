/**
 * Standalone Steez UI copy of ASCII Ripple Text.
 *
 * Generated from packages/ui/src/components/AsciiRippleText.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";

const __styles_steez_ascii_ripple_text_0: Record<string, string> = {
  "root": "steez-ascii-ripple-text-0-root",
  "wrap": "steez-ascii-ripple-text-0-wrap",
  "visual": "steez-ascii-ripple-text-0-visual",
  "active": "steez-ascii-ripple-text-0-active",
  "srOnly": "steez-ascii-ripple-text-0-srOnly",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/AsciiRippleText.module.css */
.steez-ascii-ripple-text-0-root {
  position: relative;
  display: inline-grid;
  min-width: 0;
  vertical-align: baseline;
}

.steez-ascii-ripple-text-0-wrap {
  display: block;
  width: 100%;
}

.steez-ascii-ripple-text-0-visual {
  display: inline-block;
  min-width: 0;
  white-space: pre;
  line-height: inherit;
}

.steez-ascii-ripple-text-0-wrap .steez-ascii-ripple-text-0-visual {
  display: block;
  width: 100%;
  white-space: pre-wrap;
}

.steez-ascii-ripple-text-0-active {
  user-select: none;
}

.steez-ascii-ripple-text-0-active::selection {
  background: transparent;
  color: inherit;
}

.steez-ascii-ripple-text-0-srOnly {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
`;
const __steezStandaloneStyleKey = "ascii-ripple-text";

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

const WAVE_THRESHOLD = 3;
const CHARACTER_MULTIPLIER = 3;
const ANIMATION_STEP_MS = 40;
const WAVE_BUFFER = 5;
const MAX_ACTIVE_WAVES = 8;
const DEFAULT_CHARACTER_SET =
  ".,·-─~+:;=*π\"\"┐┌┘┴┬╗╔╝╚╬╠╣╩╦║░▒▓█▄▀▌▐■!?&#$@0123456789*";

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

interface WaveState {
  startPos: number;
  startTime: number;
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

  React.useEffect(() => {
    const element = visualRef.current;
    if (!element) {
      return undefined;
    }

    element.textContent = text;

    if (disabled || text.length === 0) {
      element.style.width = "";
      element.classList.remove(__styles_steez_ascii_ripple_text_0.active);
      return undefined;
    }

    const reducedMotion =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      return undefined;
    }

    let originalText = text;
    let originalChars = originalText.split("");
    let isAnimating = false;
    let isHovering = false;
    let cursorPosition = 0;
    let waves: WaveState[] = [];
    let animationId: number | null = null;
    let queuedWaveFrame: number | null = null;
    let queuedWavePosition: number | null = null;
    let lockedWidth: number | null = null;
    const safeCharacterSet = characterSet.length > 0 ? characterSet : DEFAULT_CHARACTER_SET;
    const safeDurationMs = Number.isFinite(durationMs) ? Math.max(durationMs, 1) : 900;

    const setRenderedText = (nextText: string) => {
      if (element.textContent !== nextText) {
        element.textContent = nextText;
      }
    };

    const updateCursorPosition = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const nextPosition = Math.round((x / Math.max(rect.width, 1)) * originalText.length);
      cursorPosition = Math.max(0, Math.min(nextPosition, Math.max(originalText.length - 1, 0)));
    };

    const cleanupWaves = (timestamp: number) => {
      waves = waves.filter((wave) => timestamp - wave.startTime < safeDurationMs);
    };

    const calculateWaveEffect = (characterIndex: number, timestamp: number) => {
      let shouldAnimate = false;
      let nextCharacter = originalChars[characterIndex];

      for (const wave of waves) {
        const age = timestamp - wave.startTime;
        const progress = Math.min(age / safeDurationMs, 1);
        const distance = Math.abs(characterIndex - wave.startPos);
        const maxDistance = Math.max(wave.startPos, originalChars.length - wave.startPos - 1);
        const radius = (progress * (maxDistance + WAVE_BUFFER)) / Math.max(spread, 0.001);

        if (distance <= radius) {
          shouldAnimate = true;
          const intensity = Math.max(0, radius - distance);

          if (intensity <= WAVE_THRESHOLD && intensity > 0) {
            const glyphIndex =
              (distance * CHARACTER_MULTIPLIER + Math.floor(age / ANIMATION_STEP_MS)) %
              safeCharacterSet.length;
            nextCharacter = safeCharacterSet[glyphIndex] ?? nextCharacter;
          }
        }
      }

      return { shouldAnimate, nextCharacter };
    };

    const generateRippleFrame = (timestamp: number) =>
      originalChars
        .map((character, index) => {
          if (preserveSpaces && character === " ") {
            return " ";
          }

          const { shouldAnimate, nextCharacter } = calculateWaveEffect(index, timestamp);
          return shouldAnimate ? nextCharacter : character;
        })
        .join("");

    const stop = () => {
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }

      setRenderedText(originalText);
      element.classList.remove(__styles_steez_ascii_ripple_text_0.active);
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
      element.classList.add(__styles_steez_ascii_ripple_text_0.active);

      const animate = () => {
        const timestamp = Date.now();
        cleanupWaves(timestamp);

        if (waves.length === 0) {
          stop();
          return;
        }

        setRenderedText(generateRippleFrame(timestamp));
        animationId = requestAnimationFrame(animate);
      };

      animationId = requestAnimationFrame(animate);
    };

    const appendWave = (startPos: number) => {
      waves = [
        ...waves.slice(-(MAX_ACTIVE_WAVES - 1)),
        {
          startPos,
          startTime: Date.now(),
        },
      ];
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
      cursorPosition = Math.max(0, Math.floor(originalChars.length / 2));
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
      originalText = text;
      originalChars = text.split("");
      waves = [];
    };
  }, [characterSet, disabled, durationMs, preserveSpaces, spread, text]);

  return (
    <span
      className={`${__styles_steez_ascii_ripple_text_0.root} ${wrap ? __styles_steez_ascii_ripple_text_0.wrap : ""} ${className}`.trim()}
      {...props}
    >
      <span className={__styles_steez_ascii_ripple_text_0.srOnly}>{text}</span>
      <span ref={visualRef} className={__styles_steez_ascii_ripple_text_0.visual} aria-hidden="true">
        {text}
      </span>
    </span>
  );
}

export default AsciiRippleText;
