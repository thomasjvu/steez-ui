/**
 * Standalone Steez UI copy of Runtime Orbit Diagram.
 *
 * Generated from packages/ui/src/components/RuntimeOrbitDiagram.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";
import type { CSSProperties, SVGProps } from "react";

const __styles_steez_runtime_orbit_diagram_0: Record<string, string> = {
  "root": "steez-runtime-orbit-diagram-0-root",
  "svg": "steez-runtime-orbit-diagram-0-svg",
  "track": "steez-runtime-orbit-diagram-0-track",
  "pathLine": "steez-runtime-orbit-diagram-0-pathLine",
  "node": "steez-runtime-orbit-diagram-0-node",
  "nodeInner": "steez-runtime-orbit-diagram-0-nodeInner",
  "dot": "steez-runtime-orbit-diagram-0-dot",
  "srOnly": "steez-runtime-orbit-diagram-0-srOnly",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/RuntimeOrbitDiagram.module.css */
.steez-runtime-orbit-diagram-0-root {
  --orbit-duration: 5.4s;

  position: relative;
  width: min(100%, 38rem);
  aspect-ratio: 1;
  min-height: 22rem;
  isolation: isolate;
}

.steez-runtime-orbit-diagram-0-svg {
  width: 100%;
  height: 100%;
  display: block;
  overflow: visible;
}

.steez-runtime-orbit-diagram-0-track {
  fill: none;
  stroke: color-mix(in srgb, var(--text-primary, #cbcbcc) 14%, transparent);
  stroke-width: 0.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.steez-runtime-orbit-diagram-0-pathLine {
  fill: none;
  stroke: color-mix(in srgb, var(--accent-primary, #ee1401) 88%, transparent);
  stroke-width: 1.35;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 14 86;
  animation: steez-runtime-orbit-diagram-0-orbitPath var(--orbit-duration) linear infinite;
}

.steez-runtime-orbit-diagram-0-node {
  position: absolute;
  top: var(--node-y);
  left: var(--node-x);
  width: clamp(4.15rem, 8vw, 4.95rem);
  aspect-ratio: 1;
  translate: -50% -50%;
  display: grid;
  place-items: center;
  border-radius: 999px;
  color: color-mix(in srgb, var(--text-secondary, #999999) 92%, transparent);
  border: 1px solid color-mix(in srgb, var(--border-color, rgba(203, 203, 204, 0.2)) 78%, transparent);
  background: color-mix(in srgb, var(--bg-secondary, #0a0a0a) 94%, transparent);
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--bg-primary, #010607) 28%, transparent);
  animation: steez-runtime-orbit-diagram-0-orbitPulse var(--orbit-duration) linear infinite;
  animation-delay: var(--node-delay);
  transition:
    border-color var(--tile-hover-duration, 220ms) ease,
    transform var(--tile-hover-duration, 220ms) ease,
    background-color var(--tile-hover-duration, 220ms) ease;
}

.steez-runtime-orbit-diagram-0-node:hover {
  color: var(--text-primary, #cbcbcc);
  border-color: color-mix(in srgb, var(--accent-primary, #ee1401) 46%, var(--border-color, rgba(203, 203, 204, 0.2)));
  transform: translateY(-1px);
}

.steez-runtime-orbit-diagram-0-nodeInner {
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  display: grid;
  place-items: center;
  border-radius: inherit;
  background: color-mix(in srgb, var(--bg-primary, #010607) 96%, transparent);
}

.steez-runtime-orbit-diagram-0-nodeInner svg {
  width: 48%;
  height: 48%;
  color: currentColor;
  opacity: 0.88;
  transform: scale(0.86);
  transition:
    opacity var(--tile-hover-duration, 220ms) ease,
    transform var(--tile-hover-duration, 220ms) ease,
    color var(--tile-hover-duration, 220ms) ease;
}

.steez-runtime-orbit-diagram-0-node:hover .steez-runtime-orbit-diagram-0-nodeInner svg {
  opacity: 1;
  transform: scale(0.92);
}

.steez-runtime-orbit-diagram-0-dot {
  fill: var(--accent-primary, #ee1401);
  filter: drop-shadow(
    0 0 8px color-mix(in srgb, var(--accent-primary, #ee1401) 32%, transparent)
  );
}

.steez-runtime-orbit-diagram-0-srOnly {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@keyframes steez-runtime-orbit-diagram-0-orbitPath {
  from {
    stroke-dashoffset: 0;
  }

  to {
    stroke-dashoffset: -100;
  }
}

@keyframes steez-runtime-orbit-diagram-0-orbitPulse {
  0%,
  4%,
  16%,
  100% {
    color: color-mix(in srgb, var(--text-secondary, #999999) 92%, transparent);
    border-color: color-mix(in srgb, var(--border-color, rgba(203, 203, 204, 0.2)) 78%, transparent);
    background: color-mix(in srgb, var(--bg-secondary, #0a0a0a) 94%, transparent);
    box-shadow: 0 0 0 1px color-mix(in srgb, var(--bg-primary, #010607) 28%, transparent);
  }

  6%,
  13% {
    color: var(--text-primary, #cbcbcc);
    border-color: color-mix(in srgb, var(--accent-primary, #ee1401) 64%, var(--border-color, rgba(203, 203, 204, 0.2)));
    background: color-mix(in srgb, var(--accent-primary, #ee1401) 12%, var(--bg-secondary, #0a0a0a));
    box-shadow:
      0 0 0 1px color-mix(in srgb, var(--accent-primary, #ee1401) 24%, transparent),
      0 0 22px color-mix(in srgb, var(--accent-primary, #ee1401) 18%, transparent);
  }
}

@media (max-width: 720px) {
  .steez-runtime-orbit-diagram-0-root {
    min-height: 18rem;
  }

  .steez-runtime-orbit-diagram-0-node {
    width: clamp(3.55rem, 17vw, 4.25rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .steez-runtime-orbit-diagram-0-pathLine,
  .steez-runtime-orbit-diagram-0-node {
    animation: none;
  }

  .steez-runtime-orbit-diagram-0-dot {
    display: none;
  }
}
`;
const __steezStandaloneStyleKey = "runtime-orbit-diagram";

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

export interface SteezIconProps extends SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export type SteezIconName =
  | "copy"
  | "check"
  | "error"
  | "info"
  | "warning"
  | "refresh"
  | "close"
  | "menu"
  | "chevronLeft"
  | "sliders"
  | "eye"
  | "sun"
  | "moon"
  | "lightCross"
  | "github"
  | "twitter"
  | "instagram"
  | "youtube"
  | "tiktok"
  | "companion"
  | "globe"
  | "integrationsTile"
  | "status"
  | "workflowsTile";

export interface RuntimeOrbitNode {
  id: string;
  label: string;
  icon: React.ComponentType<SteezIconProps>;
  x: number;
  y: number;
}

export interface RuntimeOrbitDiagramProps {
  nodes: RuntimeOrbitNode[];
  className?: string;
  durationSeconds?: number;
  pathOrder?: readonly string[];
  iconSize?: number;
}

function buildPath(points: RuntimeOrbitNode[]) {
  if (points.length === 0) {
    return "";
  }

  return `${points
    .map((point, index) =>
      `${index === 0 ? "M" : "L"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`,
    )
    .join(" ")} Z`;
}

export function RuntimeOrbitDiagram({
  nodes,
  className = "",
  durationSeconds = 5.4,
  pathOrder,
  iconSize = 22,
}: RuntimeOrbitDiagramProps) {
  const orderedNodes = React.useMemo(() => {
    if (!pathOrder?.length) {
      return nodes;
    }

    const nodeMap = new Map(nodes.map((node) => [node.id, node] as const));
    const sequence = pathOrder
      .map((id) => nodeMap.get(id))
      .filter((node): node is RuntimeOrbitNode => Boolean(node));

    return sequence.length === nodes.length ? sequence : nodes;
  }, [nodes, pathOrder]);

  const pathD = React.useMemo(() => buildPath(orderedNodes), [orderedNodes]);
  const nodeSequenceIndex = React.useMemo(
    () => new Map(orderedNodes.map((node, index) => [node.id, index] as const)),
    [orderedNodes],
  );

  return (
    <div
      className={`${__styles_steez_runtime_orbit_diagram_0.root} ${className}`.trim()}
      style={{ "--orbit-duration": `${durationSeconds}s` } as React.CSSProperties}
    >
      <svg
        className={__styles_steez_runtime_orbit_diagram_0.svg}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {pathD ? <path className={__styles_steez_runtime_orbit_diagram_0.track} d={pathD} pathLength={100} /> : null}
        {pathD ? <path className={__styles_steez_runtime_orbit_diagram_0.pathLine} d={pathD} pathLength={100} /> : null}
        {pathD ? (
          <circle className={__styles_steez_runtime_orbit_diagram_0.dot} cx="0" cy="0" r="1.45">
            <animateMotion
              calcMode="linear"
              dur={`${durationSeconds}s`}
              path={pathD}
              repeatCount="indefinite"
            />
          </circle>
        ) : null}
      </svg>

      {nodes.map((node) => {
        const IconComponent = node.icon;
        const sequenceIndex = nodeSequenceIndex.get(node.id) ?? 0;
        const nodeDelayMs = Math.round(
          (durationSeconds * 1000 * sequenceIndex) /
            Math.max(orderedNodes.length, 1) -
            120,
        );

        return (
          <div
            key={node.id}
            className={__styles_steez_runtime_orbit_diagram_0.node}
            style={
              {
                "--node-x": `${node.x}%`,
                "--node-y": `${node.y}%`,
                "--node-delay": `${nodeDelayMs}ms`,
              } as React.CSSProperties
            }
            title={node.label}
          >
            <div className={__styles_steez_runtime_orbit_diagram_0.nodeInner}>
              <IconComponent width={iconSize} height={iconSize} />
            </div>
            <span className={__styles_steez_runtime_orbit_diagram_0.srOnly}>{node.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default RuntimeOrbitDiagram;
