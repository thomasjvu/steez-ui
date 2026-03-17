import React from "react";

import styles from "./AsciiRippleText.module.css";

const WAVE_THRESHOLD = 3;
const CHARACTER_MULTIPLIER = 3;
const ANIMATION_STEP_MS = 40;
const WAVE_BUFFER = 5;
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
      element.classList.remove(styles.active);
      return undefined;
    }

    let originalText = text;
    let originalChars = originalText.split("");
    let isAnimating = false;
    let isHovering = false;
    let cursorPosition = 0;
    let waves: WaveState[] = [];
    let animationId: number | null = null;
    let lockedWidth: number | null = null;

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
      waves = waves.filter((wave) => timestamp - wave.startTime < durationMs);
    };

    const calculateWaveEffect = (characterIndex: number, timestamp: number) => {
      let shouldAnimate = false;
      let nextCharacter = originalChars[characterIndex];

      for (const wave of waves) {
        const age = timestamp - wave.startTime;
        const progress = Math.min(age / durationMs, 1);
        const distance = Math.abs(characterIndex - wave.startPos);
        const maxDistance = Math.max(wave.startPos, originalChars.length - wave.startPos - 1);
        const radius = (progress * (maxDistance + WAVE_BUFFER)) / Math.max(spread, 0.001);

        if (distance <= radius) {
          shouldAnimate = true;
          const intensity = Math.max(0, radius - distance);

          if (intensity <= WAVE_THRESHOLD && intensity > 0) {
            const glyphIndex =
              (distance * CHARACTER_MULTIPLIER + Math.floor(age / ANIMATION_STEP_MS)) %
              characterSet.length;
            nextCharacter = characterSet[glyphIndex];
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

    const startWave = () => {
      waves.push({
        startPos: cursorPosition,
        startTime: Date.now(),
      });

      if (!isAnimating) {
        start();
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
      stop();
      originalText = text;
      originalChars = text.split("");
      waves = [];
    };
  }, [characterSet, disabled, durationMs, preserveSpaces, spread, text]);

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
