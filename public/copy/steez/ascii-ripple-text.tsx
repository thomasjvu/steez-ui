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
import { useEffect, useState } from "react";

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

const QUERY = "(prefers-reduced-motion: reduce)";

/** Live `prefers-reduced-motion` value; false where matchMedia is unavailable. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window.matchMedia !== "function") return undefined;
    const media = window.matchMedia(QUERY);
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  return reduced;
}

/** Pure ripple math for AsciiRippleText: no DOM, no clock. Times are ms. */

/** Rings this close to their edge scramble; inner characters settle back. */
const WAVE_THRESHOLD = 3;
const CHARACTER_MULTIPLIER = 3;
/** A scrambled character changes glyph every step. */
const ANIMATION_STEP_MS = 40;
/** Extra reach so the ring clears the far end before it fades. */
const WAVE_BUFFER = 5;
export const MAX_ACTIVE_WAVES = 8;
export const DEFAULT_CHARACTER_SET =
  ".,·-─~+:;=*π\"\"┐┌┘┴┬╗╔╝╚╬╠╣╩╦║░▒▓█▄▀▌▐■!?&#$@0123456789*";
const DEFAULT_DURATION_MS = 900;

export interface Wave {
  startPos: number;
  startTime: number;
}

export interface RippleOptions {
  durationMs: number;
  characterSet: string;
  spread: number;
  preserveSpaces: boolean;
}

/** Falls back from an empty glyph set and a non-finite or sub-1ms duration. */
export function safeRippleOptions(options: RippleOptions): RippleOptions {
  return {
    ...options,
    characterSet: options.characterSet.length > 0 ? options.characterSet : DEFAULT_CHARACTER_SET,
    durationMs: Number.isFinite(options.durationMs) ? Math.max(options.durationMs, 1) : DEFAULT_DURATION_MS,
  };
}

/** Character index under a pointer, clamped to the text. */
export function pointerIndex(clientX: number, bounds: { left: number; width: number }, length: number) {
  const position = Math.round(((clientX - bounds.left) / Math.max(bounds.width, 1)) * length);
  return Math.max(0, Math.min(position, Math.max(length - 1, 0)));
}

/** Middle character, where keyboard focus starts a ripple. */
export const focusIndex = (length: number) => Math.max(0, Math.floor(length / 2));

/** Adds a wave, keeping at most MAX_ACTIVE_WAVES (oldest dropped). */
export function addWave(waves: readonly Wave[], startPos: number, now: number): Wave[] {
  return [...waves.slice(-(MAX_ACTIVE_WAVES - 1)), { startPos, startTime: now }];
}

/** Waves still inside their duration. */
export function liveWaves(waves: readonly Wave[], now: number, durationMs: number): Wave[] {
  return waves.filter((wave) => now - wave.startTime < durationMs);
}

function rippleCharacter(chars: readonly string[], index: number, waves: readonly Wave[], now: number, options: RippleOptions) {
  const { durationMs, characterSet, spread } = options;
  let character = chars[index]!;
  for (const wave of waves) {
    const age = now - wave.startTime;
    const progress = Math.min(age / durationMs, 1);
    const distance = Math.abs(index - wave.startPos);
    const maxDistance = Math.max(wave.startPos, chars.length - wave.startPos - 1);
    const radius = (progress * (maxDistance + WAVE_BUFFER)) / Math.max(spread, 0.001);
    const intensity = radius - distance;
    if (intensity > 0 && intensity <= WAVE_THRESHOLD) {
      const glyph = (distance * CHARACTER_MULTIPLIER + Math.floor(age / ANIMATION_STEP_MS)) % characterSet.length;
      character = characterSet[glyph] ?? character;
    }
  }
  return character;
}

/** The text as it looks at `now` under every live wave. Expects safe options. */
export function rippleFrame(text: string, waves: readonly Wave[], now: number, options: RippleOptions) {
  const chars = text.split("");
  return chars
    .map((character, index) =>
      options.preserveSpaces && character === " " ? " " : rippleCharacter(chars, index, waves, now, options),
    )
    .join("");
}

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
      element.classList.remove(__styles_steez_ascii_ripple_text_0.active);
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
