import React from "react";

import { LightCrossIcon } from "@steez-ui/icons";

import {
  LoadingProgressBar,
  LOADING_PROGRESS_SEGMENT_COUNT,
} from "./LoadingProgressBar.js";
import styles from "./LoadingScreen.module.css";

export interface LoadingScreenProps {
  progress: number;
  message?: string;
  logo?: React.ReactNode;
  title?: React.ReactNode;
  audioFeedback?: boolean;
  fullscreen?: boolean;
  themeMode?: "auto" | "light" | "dark";
}

interface Cross {
  id: number;
  x: number;
  rotation: number;
  scale: number;
  groundOffset: number;
  delay: number;
  opacity: number;
}

function randomFloat() {
  return Math.random();
}

function resolveIsLightMode(themeMode: LoadingScreenProps["themeMode"]) {
  if (themeMode === "light") {
    return true;
  }

  if (themeMode === "dark") {
    return false;
  }

  if (typeof window === "undefined") {
    return false;
  }

  return (
    document.documentElement.getAttribute("data-theme") === "light" ||
    window.localStorage.getItem("theme") === "light"
  );
}

export function LoadingScreen({
  progress,
  message,
  logo,
  title = "LOADING",
  audioFeedback = false,
  fullscreen = true,
  themeMode = "auto",
}: LoadingScreenProps) {
  const [displayProgress, setDisplayProgress] = React.useState(0);
  const [ellipsisCount, setEllipsisCount] = React.useState(0);
  const [crosses, setCrosses] = React.useState<Cross[]>([]);
  const [bounds, setBounds] = React.useState({ width: 0, height: 0 });
  const prevFilledBars = React.useRef(0);
  const crossIdRef = React.useRef(0);
  const isLoadingRef = React.useRef(true);
  const audioCtxRef = React.useRef<AudioContext | null>(null);
  const audioEnabledRef = React.useRef(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const updateBounds = React.useCallback(() => {
    const nextWidth =
      containerRef.current?.clientWidth || window.innerWidth || 0;
    const nextHeight =
      containerRef.current?.clientHeight || window.innerHeight || 0;

    setBounds((current) => {
      if (current.width === nextWidth && current.height === nextHeight) {
        return current;
      }

      return {
        width: nextWidth,
        height: nextHeight,
      };
    });
  }, []);

  const spawnCross = React.useCallback(() => {
    if (!isLoadingRef.current || typeof window === "undefined") {
      return;
    }

    const tilt = (randomFloat() - 0.5) * 6;
    const availableWidth = Math.max(bounds.width || window.innerWidth, 160);
    const nextCross: Cross = {
      id: crossIdRef.current += 1,
      x: randomFloat() * Math.max(availableWidth - 120, 24),
      rotation: tilt,
      scale: 0.4 + randomFloat() * 0.4,
      groundOffset: randomFloat() * 30,
      delay: 0,
      opacity: 0.4 + randomFloat() * 0.3,
    };
    setCrosses((current) => [...current.slice(-17), nextCross]);
  }, [bounds.width]);

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    updateBounds();
    window.addEventListener("resize", updateBounds);

    const observer =
      typeof ResizeObserver === "undefined" || !containerRef.current
        ? null
        : new ResizeObserver(() => {
            updateBounds();
          });

    if (observer && containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateBounds);
      observer?.disconnect();
    };
  }, [updateBounds]);

  React.useEffect(() => {
    isLoadingRef.current = true;

    const scheduleNextCross = () => {
      const delay = 400 + randomFloat() * 300;
      return setTimeout(() => {
        spawnCross();
        if (isLoadingRef.current) {
          scheduleNextCross();
        }
      }, delay);
    };

    const timeoutId = scheduleNextCross();
    return () => {
      clearTimeout(timeoutId);
      isLoadingRef.current = false;
    };
  }, [spawnCross]);

  React.useEffect(() => {
    if (!audioFeedback) {
      return undefined;
    }

    const enableAudio = async () => {
      const AudioContextClass =
        window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) {
        return;
      }

      try {
        const ctx = audioCtxRef.current ?? new AudioContextClass();
        audioCtxRef.current = ctx;
        if (ctx.state === "suspended") {
          await ctx.resume();
        }
        audioEnabledRef.current = ctx.state === "running";
      } catch {
        audioEnabledRef.current = false;
      }
    };

    window.addEventListener("pointerdown", enableAudio, {
      once: true,
      passive: true,
    });
    window.addEventListener("keydown", enableAudio, { once: true });

    return () => {
      window.removeEventListener("pointerdown", enableAudio);
      window.removeEventListener("keydown", enableAudio);
      if (audioCtxRef.current) {
        void audioCtxRef.current.close().catch(() => undefined);
        audioCtxRef.current = null;
      }
      audioEnabledRef.current = false;
    };
  }, [audioFeedback]);

  React.useEffect(() => {
    if (!audioFeedback) {
      return undefined;
    }

    const playBeep = () => {
      const audioCtx = audioCtxRef.current;
      if (!audioCtx || !audioEnabledRef.current) {
        return;
      }

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "triangle";
      osc.frequency.value = 523.25;
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    };

    const filledBars = Math.round(
      (displayProgress / 100) * LOADING_PROGRESS_SEGMENT_COUNT,
    );
    if (filledBars > prevFilledBars.current) {
      playBeep();
      prevFilledBars.current = filledBars;
    }

    return undefined;
  }, [audioFeedback, displayProgress]);

  React.useEffect(() => {
    const ellipsisInterval = setInterval(() => {
      setEllipsisCount((count) => (count + 1) % 4);
    }, 400);
    return () => clearInterval(ellipsisInterval);
  }, []);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayProgress(progress);
    }, 50);
    return () => clearTimeout(timeout);
  }, [progress]);

  const ellipsis = ".".repeat(ellipsisCount);
  const cleanMessage = message ? message.replace(/\.+$/, "") : "";
  const isLightMode = resolveIsLightMode(themeMode);
  const screenWidth =
    bounds.width || (typeof window === "undefined" ? 0 : window.innerWidth);
  const screenHeight =
    bounds.height || (typeof window === "undefined" ? 0 : window.innerHeight);

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
              "--cross-delay": `${cross.delay}ms`,
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

      <div className={styles.footerMessage}>
        {cleanMessage}
        {ellipsis}
      </div>
    </div>
  );
}

export type LoadingStage = "init" | "auth" | "agent" | "config" | "ready";

const STAGE_PROGRESS: Record<LoadingStage, number> = {
  init: 0,
  auth: 25,
  agent: 50,
  config: 75,
  ready: 100,
};

const STAGE_MESSAGES: Record<LoadingStage, string> = {
  init: "Initializing...",
  auth: "Authenticating...",
  agent: "Loading agent...",
  config: "Loading configuration...",
  ready: "Preparing interface...",
};

export function useLoadingProgress(
  isLoading: boolean,
  _phase?: string,
  stage: LoadingStage = "init",
) {
  const [progress, setProgress] = React.useState(0);
  const [currentMessage, setCurrentMessage] = React.useState("Initializing...");
  const progressRef = React.useRef(0);

  React.useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  React.useEffect(() => {
    if (!isLoading) {
      setProgress(100);
      progressRef.current = 100;
      setCurrentMessage("Complete!");
      return undefined;
    }

    const targetProgress = STAGE_PROGRESS[stage];
    const targetMessage = STAGE_MESSAGES[stage];
    setCurrentMessage(targetMessage);

    const currentProgressSnapshot = progressRef.current;
    const diff = targetProgress - currentProgressSnapshot;
    const steps = 20;
    const stepDuration = 100;
    let step = 0;

    const interval = setInterval(() => {
      step += 1;
      const easedStep = step / steps;
      const easedProgress = diff * easedStep;
      const nextProgress = Math.min(
        currentProgressSnapshot + easedProgress,
        targetProgress,
      );
      progressRef.current = nextProgress;
      setProgress(nextProgress);

      if (step >= steps) {
        clearInterval(interval);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [isLoading, stage]);

  return { progress, message: currentMessage };
}
