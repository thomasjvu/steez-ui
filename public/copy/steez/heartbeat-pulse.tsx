/**
 * Standalone Steez UI copy of Heartbeat Pulse.
 *
 * Generated from packages/ui/src/components/HeartbeatPulse.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";
import { useEffect, useState } from "react";

const __styles_steez_heartbeat_pulse_0: Record<string, string> = {
  "pulseRoot": "steez-heartbeat-pulse-0-pulseRoot",
  "lineRoot": "steez-heartbeat-pulse-0-lineRoot",
  "svg": "steez-heartbeat-pulse-0-svg",
  "indicator": "steez-heartbeat-pulse-0-indicator",
  "indicatorLabel": "steez-heartbeat-pulse-0-indicatorLabel",
  "indicatorLabelActive": "steez-heartbeat-pulse-0-indicatorLabelActive",
  "indicatorLabelInactive": "steez-heartbeat-pulse-0-indicatorLabelInactive",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/HeartbeatPulse.module.css */
.steez-heartbeat-pulse-0-pulseRoot {
  display: inline-block;
}

.steez-heartbeat-pulse-0-lineRoot {
  line-height: 0;
}

.steez-heartbeat-pulse-0-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.steez-heartbeat-pulse-0-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.steez-heartbeat-pulse-0-indicatorLabel {
  font-family: var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.04em;
}

.steez-heartbeat-pulse-0-indicatorLabelActive {
  color: var(--heartbeat-indicator-color, var(--accent-primary, #ee1401));
}

.steez-heartbeat-pulse-0-indicatorLabelInactive {
  color: var(--text-muted, #666666);
}
`;
const __steezStandaloneStyleKey = "heartbeat-pulse";

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

/** Clamp finite inputs; malformed values use the component's documented default. */
export function clampFinite(
  value: number,
  min: number,
  max: number,
  fallback: number,
) {
  return Number.isFinite(value)
    ? Math.min(max, Math.max(min, value))
    : fallback;
}

/** Percentage shared by range inputs and progress displays. */
export function progressPercentage(value: number, min = 0, max = 100) {
  if (!Number.isFinite(min) || !Number.isFinite(max) || max <= min) return 0;
  return clampFinite(((value - min) / (max - min)) * 100, 0, 100, 0);
}

/** Pure sizes, timings and paths for HeartbeatPulse. Units are viewBox units. */



export type HeartbeatVariant = "orb" | "line";

export const LINE_VIEWBOX = { width: 200, height: 100 } as const;
export const LINE_BASELINE_Y = 58.7;
/** One ECG beat across the 200x100 line viewBox. */
export const LINE_TRACE_POINTS =
  "2.4,58.7 70.8,58.7 76.1,46.2 81.1,58.7 89.9,58.7 93.8,66.5 102.8,22.7 110.6,78.7 115.3,58.7 126.4,58.7 134.4,54.7 142.4,58.7 197.8,58.7";

export const ORB_VIEWBOX = 100;
const MIN_ORB_RADIUS = 1;

/** Seconds per beat: the line follows the interval within 1.9s-2.4s; the orb is fixed. */
export function beatSeconds(variant: HeartbeatVariant, intervalMinutes: number) {
  return variant === "line" ? Math.max(1.9, Math.min(2.4, intervalMinutes / 15)) : 1.2;
}

/** Rendered line size in px; explicit width/height win. */
export function lineSize(size: number, width?: number, height?: number) {
  return { width: width ?? Math.max(size * 3, 200), height: height ?? Math.max(size, 72) };
}

export interface OrbGeometry {
  center: number;
  /** Outer ring radius. */
  radius: number;
  /** Start radii of the two expanding ripples. */
  ripples: readonly [number, number];
  /** Core dot radius at rest and at the top of the beat. */
  core: number;
  corePeak: number;
  /** ECG spike drawn across the orb. */
  tracePath: string;
}

export function orbGeometry(size: number): OrbGeometry {
  const center = ORB_VIEWBOX / 2;
  // Sizes under 10 would give a zero or negative ring; NaN falls back to the default 24.
  const radius = clampFinite(size / 2 - 4, MIN_ORB_RADIUS, Number.POSITIVE_INFINITY, 8);
  const trace: Array<[number, number]> = [
    [0, center],
    [center * 0.3, center],
    [center * 0.4, center],
    [center * 0.5, center * 0.2],
    [center * 0.6, center * 1.8],
    [center * 0.7, center],
    [ORB_VIEWBOX, center],
  ];
  return {
    center,
    radius,
    ripples: [radius * 0.8, radius * 0.5],
    core: radius * 0.25,
    corePeak: radius * 0.3,
    tracePath: trace.map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x} ${y}`).join(" "),
  };
}

export interface HeartbeatPulseProps {
  intervalMinutes?: number;
  size?: number;
  width?: number;
  height?: number;
  color?: string;
  active?: boolean;
  variant?: HeartbeatVariant;
  className?: string;
}

interface PulseShapeProps {
  active: boolean;
  color: string;
  /** Shared by every <animate>: loops forever at the beat duration. */
  loop: { dur: string; repeatCount: "indefinite" };
  clipId: string;
}

const MUTED = "var(--text-muted)";

export function HeartbeatPulse({
  intervalMinutes = 30,
  size = 24,
  width,
  height,
  color = "var(--accent-primary)",
  active = true,
  variant = "orb",
  className = "",
}: HeartbeatPulseProps) {
  const instanceId = React.useId().replace(/:/g, "-");
  const prefersReducedMotion = usePrefersReducedMotion();
  const motionActive = active && !prefersReducedMotion;
  const shape: PulseShapeProps = {
    active,
    color,
    loop: { dur: motionActive ? `${beatSeconds(variant, intervalMinutes)}s` : "0s", repeatCount: "indefinite" },
    clipId: `heartbeat-${variant === "line" ? "line-" : ""}clip-${instanceId}`,
  };

  if (variant === "line") {
    return (
      <div className={`${__styles_steez_heartbeat_pulse_0.pulseRoot} ${__styles_steez_heartbeat_pulse_0.lineRoot} ${className}`.trim()}>
        <HeartbeatLine {...shape} {...lineSize(size, width, height)} />
      </div>
    );
  }

  return (
    <div className={`${__styles_steez_heartbeat_pulse_0.pulseRoot} ${className}`.trim()}>
      <HeartbeatOrb {...shape} size={size} />
    </div>
  );
}

function HeartbeatLine({ active, color, loop, clipId, width, height }: PulseShapeProps & { width: number; height: number }) {
  const sweep = { ...loop, calcMode: "linear", keyTimes: "0;0.48;0.52;1" } as const;
  return (
    <svg
      viewBox={`0 0 ${LINE_VIEWBOX.width} ${LINE_VIEWBOX.height}`}
      width={width}
      height={height}
      className={__styles_steez_heartbeat_pulse_0.svg}
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clipId}>
          <rect x="0" y="0" width="0" height={LINE_VIEWBOX.height}>
            <animate attributeName="width" values="0;200;200;0" {...sweep} />
            <animate attributeName="x" values="0;0;0;200" {...sweep} />
          </rect>
        </clipPath>
      </defs>

      <line
        x1="2"
        y1={LINE_BASELINE_Y}
        x2="198"
        y2={LINE_BASELINE_Y}
        stroke={color}
        strokeWidth="3"
        strokeOpacity={active ? "0.18" : "0.08"}
        strokeLinecap="round"
      />

      <g clipPath={`url(#${clipId})`}>
        <polyline
          fill="none"
          strokeWidth="3"
          stroke={active ? color : MUTED}
          strokeLinecap="round"
          strokeLinejoin="round"
          points={LINE_TRACE_POINTS}
          opacity={active ? "1" : "0.35"}
        />
      </g>
    </svg>
  );
}

function HeartbeatOrb({ active, color, loop, clipId, size }: PulseShapeProps & { size: number }) {
  const { center, radius, ripples, core, corePeak, tracePath } = orbGeometry(size);
  const ring = { cx: center, cy: center, r: radius, fill: "none", stroke: color };
  return (
    <svg
      viewBox={`0 0 ${ORB_VIEWBOX} ${ORB_VIEWBOX}`}
      width={size}
      height={size}
      className={__styles_steez_heartbeat_pulse_0.svg}
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clipId}>
          <rect x="0" y="0" width={ORB_VIEWBOX} height={ORB_VIEWBOX}>
            <animate
              attributeName="x"
              values={`${ORB_VIEWBOX};0;0;${ORB_VIEWBOX}`}
              {...loop}
              calcMode="spline"
              keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
              keyTimes="0;0.5;0.5;1"
            />
          </rect>
        </clipPath>
      </defs>

      <circle {...ring} strokeWidth="2" opacity="0.3" />

      {active ? (
        <>
          <circle {...ring} strokeWidth="2" opacity="0">
            <animate attributeName="r" values={`${ripples[0]};${radius}`} {...loop} />
            <animate attributeName="opacity" values="0.6;0" {...loop} />
          </circle>
          <circle {...ring} strokeWidth="1" opacity="0">
            <animate attributeName="r" values={`${ripples[1]};${radius}`} {...loop} begin="0.2s" />
            <animate attributeName="opacity" values="0.4;0" {...loop} begin="0.2s" />
          </circle>
        </>
      ) : null}

      <circle cx={center} cy={center} r={core} fill={active ? color : MUTED}>
        {active ? <animate attributeName="r" values={`${core};${corePeak};${core}`} {...loop} /> : null}
      </circle>

      {active ? (
        <g clipPath={`url(#${clipId})`}>
          <path
            d={tracePath}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.7"
          >
            <animate attributeName="opacity" values="0;0.7;0" {...loop} />
          </path>
        </g>
      ) : null}
    </svg>
  );
}

export interface HeartbeatIndicatorProps {
  intervalMinutes?: number;
  active?: boolean;
  label?: string;
  color?: string;
}

export function HeartbeatIndicator({
  intervalMinutes = 30,
  active = true,
  label,
  color,
}: HeartbeatIndicatorProps) {
  return (
    <div className={__styles_steez_heartbeat_pulse_0.indicator}>
      <HeartbeatPulse
        intervalMinutes={intervalMinutes}
        active={active}
        size={20}
        color={color}
      />
      {label !== undefined ? (
        <span
          className={`${__styles_steez_heartbeat_pulse_0.indicatorLabel} ${
            active ? __styles_steez_heartbeat_pulse_0.indicatorLabelActive : __styles_steez_heartbeat_pulse_0.indicatorLabelInactive
          }`.trim()}
          style={
            color
              ? ({ ["--heartbeat-indicator-color" as string]: color } as React.CSSProperties)
              : undefined
          }
        >
          {label}
        </span>
      ) : null}
    </div>
  );
}
