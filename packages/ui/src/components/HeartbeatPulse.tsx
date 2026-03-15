import React from "react";

import styles from "./HeartbeatPulse.module.css";

export interface HeartbeatPulseProps {
  intervalMinutes?: number;
  size?: number;
  width?: number;
  height?: number;
  color?: string;
  active?: boolean;
  variant?: "orb" | "line";
  className?: string;
}

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
  const baseDuration =
    variant === "line"
      ? Math.max(1.9, Math.min(2.4, intervalMinutes / 15))
      : 1.2;
  const animationDuration = active ? `${baseDuration}s` : "0s";
  const instanceId = React.useId().replace(/:/g, "-");

  if (variant === "line") {
    const lineWidth = width ?? Math.max(size * 3, 200);
    const lineHeight = height ?? Math.max(size, 72);
    const clipId = `heartbeat-line-clip-${instanceId}`;

    return (
      <div className={`${styles.pulseRoot} ${styles.lineRoot} ${className}`.trim()}>
        <svg
          viewBox="0 0 200 100"
          width={lineWidth}
          height={lineHeight}
          className={styles.svg}
          aria-hidden="true"
        >
          <defs>
            <clipPath id={clipId}>
              <rect x="0" y="0" width="0" height="100">
                <animate
                  attributeName="width"
                  values="0;200;200;0"
                  dur={animationDuration}
                  repeatCount="indefinite"
                  calcMode="linear"
                  keyTimes="0;0.48;0.52;1"
                />
                <animate
                  attributeName="x"
                  values="0;0;0;200"
                  dur={animationDuration}
                  repeatCount="indefinite"
                  calcMode="linear"
                  keyTimes="0;0.48;0.52;1"
                />
              </rect>
            </clipPath>
          </defs>

          <line
            x1="2"
            y1="58.7"
            x2="198"
            y2="58.7"
            stroke={color}
            strokeWidth="3"
            strokeOpacity={active ? "0.18" : "0.08"}
            strokeLinecap="round"
          />

          <g clipPath={`url(#${clipId})`}>
            <polyline
              fill="none"
              strokeWidth="3"
              stroke={active ? color : "var(--text-muted)"}
              strokeLinecap="round"
              strokeLinejoin="round"
              points="2.4,58.7 70.8,58.7 76.1,46.2 81.1,58.7 89.9,58.7 93.8,66.5 102.8,22.7 110.6,78.7 115.3,58.7 126.4,58.7 134.4,54.7 142.4,58.7 197.8,58.7"
              opacity={active ? "1" : "0.35"}
            />
          </g>
        </svg>
      </div>
    );
  }

  const viewBoxSize = 100;
  const center = viewBoxSize / 2;
  const radius = size / 2 - 4;
  const clipId = `heartbeat-clip-${instanceId}`;

  return (
    <div className={`${styles.pulseRoot} ${className}`.trim()}>
      <svg
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        width={size}
        height={size}
        className={styles.svg}
        aria-hidden="true"
      >
        <defs>
          <clipPath id={clipId}>
            <rect x="0" y="0" width={viewBoxSize} height={viewBoxSize}>
              <animate
                attributeName="x"
                values={`${viewBoxSize};0;0;${viewBoxSize}`}
                dur={animationDuration}
                repeatCount="indefinite"
                calcMode="spline"
                keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
                keyTimes="0;0.5;0.5;1"
              />
            </rect>
          </clipPath>
        </defs>

        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="2"
          opacity="0.3"
        />

        {active ? (
          <>
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth="2"
              opacity="0"
            >
              <animate
                attributeName="r"
                values={`${radius * 0.8};${radius}`}
                dur={animationDuration}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.6;0"
                dur={animationDuration}
                repeatCount="indefinite"
              />
            </circle>

            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth="1"
              opacity="0"
            >
              <animate
                attributeName="r"
                values={`${radius * 0.5};${radius}`}
                dur={animationDuration}
                repeatCount="indefinite"
                begin="0.2s"
              />
              <animate
                attributeName="opacity"
                values="0.4;0"
                dur={animationDuration}
                repeatCount="indefinite"
                begin="0.2s"
              />
            </circle>
          </>
        ) : null}

        <circle
          cx={center}
          cy={center}
          r={radius * 0.25}
          fill={active ? color : "var(--text-muted)"}
        >
          {active ? (
            <animate
              attributeName="r"
              values={`${radius * 0.25};${radius * 0.3};${radius * 0.25}`}
              dur={animationDuration}
              repeatCount="indefinite"
            />
          ) : null}
        </circle>

        {active ? (
          <g clipPath={`url(#${clipId})`}>
            <path
              d={`M 0 ${center}
                  L ${center * 0.3} ${center}
                  L ${center * 0.4} ${center}
                  L ${center * 0.5} ${center * 0.2}
                  L ${center * 0.6} ${center * 1.8}
                  L ${center * 0.7} ${center}
                  L ${viewBoxSize} ${center}`}
              fill="none"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.7"
            >
              <animate
                attributeName="opacity"
                values="0;0.7;0"
                dur={animationDuration}
                repeatCount="indefinite"
              />
            </path>
          </g>
        ) : null}
      </svg>
    </div>
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
