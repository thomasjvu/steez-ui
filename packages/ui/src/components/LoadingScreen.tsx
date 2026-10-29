"use client";

import React from "react";

import { LightCrossIcon } from "@steez-ui/icons";

import { useElementSize } from "../hooks/useElementSize";
import { LoadingProgressBar } from "./LoadingProgressBar.tsx";
import { useProgressBeep } from "./LoadingScreen.audio";
import { useFallingCrosses } from "./LoadingScreen.crosses";
import styles from "./LoadingScreen.module.css";

export interface LoadingScreenProps {
  progress: number;
  message?: string;
  logo?: React.ReactNode;
  title?: React.ReactNode;
  footerBrand?: React.ReactNode;
  audioFeedback?: boolean;
  fullscreen?: boolean;
  themeMode?: "auto" | "light" | "dark";
}

function resolveIsLightMode(themeMode: LoadingScreenProps["themeMode"]) {
  if (themeMode !== "auto") {
    return themeMode === "light";
  }

  if (typeof window === "undefined") {
    return false;
  }

  if (document.documentElement.getAttribute("data-theme") === "light") {
    return true;
  }

  try {
    return window.localStorage.getItem("theme") === "light";
  } catch {
    // Storage can be unavailable in privacy-restricted or sandboxed contexts.
    return false;
  }
}

/** Cycles 0–3 trailing dots every 400ms. */
function useEllipsis() {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => setCount((current) => (current + 1) % 4), 400);
    return () => clearInterval(interval);
  }, []);
  return ".".repeat(count);
}

/** Follows `value` one short beat behind so the bar animates from its last value. */
function useDeferredProgress(value: number) {
  const [display, setDisplay] = React.useState(0);
  React.useEffect(() => {
    const timeout = setTimeout(() => setDisplay(value), 50);
    return () => clearTimeout(timeout);
  }, [value]);
  return display;
}

export function LoadingScreen({
  progress,
  message,
  logo,
  title = "LOADING",
  footerBrand,
  audioFeedback = false,
  fullscreen = true,
  themeMode = "auto",
}: LoadingScreenProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const bounds = useElementSize(containerRef);
  const hasWindow = typeof window !== "undefined";
  const screenWidth = bounds.width || (hasWindow ? window.innerWidth : 0);
  const screenHeight = bounds.height || (hasWindow ? window.innerHeight : 0);

  const crosses = useFallingCrosses(screenWidth);
  const displayProgress = useDeferredProgress(progress);
  const ellipsis = useEllipsis();
  useProgressBeep(audioFeedback, displayProgress);

  const cleanMessage = message ? message.replace(/\.+$/, "") : "";
  const isLightMode = resolveIsLightMode(themeMode);

  return (
    <div
      ref={containerRef}
      className={`${styles.screen} ${fullscreen ? styles.fullscreen : styles.contained} ${
        isLightMode ? styles.lightTheme : styles.darkTheme
      }`.trim()}
      style={
        {
          "--screen-height": `${screenHeight}px`,
          "--screen-width": `${screenWidth}px`,
        } as React.CSSProperties
      }
    >
      {crosses.map((cross) => (
        <div
          key={cross.id}
          className={styles.crossContainer}
          style={
            {
              "--cross-left": `${cross.x}px`,
              "--rotation": `${cross.rotation}deg`,
              "--ground": `${cross.groundOffset}%`,
              "--cross-scale": String(cross.scale),
              "--cross-opacity": String(cross.opacity),
            } as React.CSSProperties
          }
          onAnimationEnd={(event) => {
            if (event.animationName === "crossFall") {
              event.currentTarget.classList.add(styles.crossLanded);
            }
          }}
        >
          <div className={styles.crossSvg}>
            <LightCrossIcon className={styles.crossShape} />
          </div>
        </div>
      ))}

      <div className={styles.centerStack}>
        {logo ? <div className={styles.logoWrap}>{logo}</div> : null}
        <div className={styles.title}>{title}</div>
      </div>

      <LoadingProgressBar progress={displayProgress} className={styles.progressRow} />

      <div className={styles.footerStack}>
        {footerBrand ? (
          <div className={styles.footerBrand}>{footerBrand}</div>
        ) : null}
        <div className={styles.footerMessage}>
          {cleanMessage}
          {ellipsis}
        </div>
      </div>
    </div>
  );
}
