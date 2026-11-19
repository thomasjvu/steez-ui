"use client";

import React from "react";

import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import {
  LINE_BASELINE_Y,
  LINE_TRACE_POINTS,
  LINE_VIEWBOX,
  ORB_VIEWBOX,
  DEFAULT_SIZE,
  beatSeconds,
  lineSize,
  orbGeometry,
  pulseSize,
  type HeartbeatVariant,
} from "./HeartbeatPulse.geometry";
import styles from "./HeartbeatPulse.module.css";

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
  size = DEFAULT_SIZE,
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
      <div className={`${styles.pulseRoot} ${styles.lineRoot} ${className}`.trim()}>
        <HeartbeatLine {...shape} {...lineSize(size, width, height)} />
      </div>
    );
  }

  return (
    <div className={`${styles.pulseRoot} ${className}`.trim()}>
      <HeartbeatOrb {...shape} size={pulseSize(size)} />
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
      className={styles.svg}
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
  const { center, radius, ripples, core, corePeak, tracePath } = orbGeometry();
  const ring = { cx: center, cy: center, r: radius, fill: "none", stroke: color };
  return (
    <svg
      viewBox={`0 0 ${ORB_VIEWBOX} ${ORB_VIEWBOX}`}
      width={size}
      height={size}
      className={styles.svg}
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
    <div className={styles.indicator}>
      <HeartbeatPulse
        intervalMinutes={intervalMinutes}
        active={active}
        size={20}
        color={color}
      />
      {label !== undefined ? (
        <span
          className={`${styles.indicatorLabel} ${
            active ? styles.indicatorLabelActive : styles.indicatorLabelInactive
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
