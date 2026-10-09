"use client";

import React from "react";

import styles from "./QuartzCrystal.module.css";

export interface QuartzCrystalProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "color" | "role" | "aria-hidden" | "tabIndex"> {
  color?: string;
  /** Width of the body in pixels; the pointed tips each add width / 2 to its height. */
  width?: number;
  /** Height of the body, excluding the tips. */
  height?: number;
  durationMs?: number;
  floatDistance?: number;
  /** Optional liquid distortion from 0 to 500; defaults to crisp facets. */
  distortion?: number;
  paused?: boolean;
  visible?: boolean;
  /** Pointer parallax is opt-in, bounded, and disabled for reduced motion. */
  parallax?: boolean | { strength?: number; maxX?: number; maxY?: number };
}

function bounded(value: number, min: number, max: number, fallback: number) {
  return Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : fallback;
}

/** Decorative nine-facet quartz, with local layout and no app-specific page positioning. */
export function QuartzCrystal({
  color, width = 120, height = 240, durationMs = 5000, floatDistance = 15,
  distortion = 0, paused = false, visible = true, parallax = false,
  className = "", style, ...props
}: QuartzCrystalProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const offsetRef = React.useRef<HTMLDivElement>(null);
  const filterId = `quartz-${React.useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const [inView, setInView] = React.useState(true);
  const [pageVisible, setPageVisible] = React.useState(true);
  const [reduced, setReduced] = React.useState(false);
  const safeWidth = bounded(width, 1, 1000, 120);
  const safeHeight = bounded(height, 1, 2000, 240);
  const safeFloat = bounded(floatDistance, 0, 100, 15);
  const safeDistortion = bounded(distortion, 0, 500, 0);
  const running = visible && !paused && inView && pageVisible && !reduced;
  const parallaxEnabled = Boolean(parallax);
  const config = typeof parallax === "object" ? parallax : {};
  const strength = bounded(config.strength ?? .03, 0, 1, .03);
  const maxX = bounded(config.maxX ?? 60, 0, 200, 60);
  const maxY = bounded(config.maxY ?? 40, 0, 200, 40);

  React.useEffect(() => {
    const media = typeof window.matchMedia === "function" ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
    const syncMotion = () => setReduced(media?.matches ?? false);
    const syncVisibility = () => setPageVisible(document.visibilityState !== "hidden");
    syncMotion();
    syncVisibility();
    media?.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", syncVisibility);
    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
    );
    if (rootRef.current) observer?.observe(rootRef.current);
    return () => {
      media?.removeEventListener("change", syncMotion);
      document.removeEventListener("visibilitychange", syncVisibility);
      observer?.disconnect();
    };
  }, []);

  React.useEffect(() => {
    if (!parallaxEnabled || !running) return;
    let frame: number | null = null;
    let pointer = { x: 0, y: 0 };
    function move(event: PointerEvent) {
      if (event.pointerType === "touch") return;
      pointer = { x: event.clientX, y: event.clientY };
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        const root = rootRef.current;
        const offset = offsetRef.current;
        if (!root || !offset) return;
        const rect = root.getBoundingClientRect();
        const x = Math.max(-maxX, Math.min(maxX, (pointer.x - rect.left - rect.width / 2) * strength));
        const y = Math.max(-maxY, Math.min(maxY, (pointer.y - rect.top - rect.height / 2) * strength));
        offset.style.transform = `translate(${x}px, ${y}px)`;
      });
    }
    const offset = offsetRef.current;
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      if (frame !== null) cancelAnimationFrame(frame);
      if (offset) offset.style.transform = "";
    };
  }, [parallaxEnabled, running, strength, maxX, maxY]);

  return (
    <div {...props} ref={rootRef} className={`${styles.root} ${className}`.trim()} aria-hidden="true"
      data-running={running ? "true" : "false"} data-visible={visible ? "true" : "false"}
      style={{
        ...style,
        ...(color ? { "--quartz-color": color } : {}),
        "--quartz-width": `${safeWidth}px`,
        "--quartz-height": `${safeHeight}px`,
        "--quartz-speed": `${bounded(durationMs, 1000, 120000, 5000)}ms`,
        "--quartz-float-distance": `${safeFloat}px`,
        "--quartz-distortion": safeDistortion > 0 ? `url(#${filterId})` : "blur(0px)",
      } as React.CSSProperties}>
      {safeDistortion > 0 && <svg className={styles.filters} focusable="false" aria-hidden="true"><defs>
        <filter id={filterId} x="-100%" y="-100%" width="300%" height="300%" filterUnits="objectBoundingBox">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.01" numOctaves={1} seed={17} result="turbulence" />
          <feGaussianBlur in="turbulence" stdDeviation={3} result="softMap" />
          <feDisplacementMap in="SourceGraphic" in2="softMap" scale={safeDistortion} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs></svg>}
      <div ref={offsetRef} className={styles.offset}>
        <div className={styles.quartz}>
          <div className={styles.upTriLeft} /><div className={styles.upTriCenter} /><div className={styles.upTriRight} />
          <div className={styles.downTriLeft} /><div className={styles.downTriCenter} /><div className={styles.downTriRight} />
          <div className={styles.left} /><div className={styles.center} /><div className={styles.right} />
        </div>
      </div>
    </div>
  );
}
