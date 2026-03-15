import React from "react";

import type { SteezIconProps } from "@steez-ui/icons";

import styles from "./RuntimeOrbitDiagram.module.css";

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
      className={`${styles.root} ${className}`.trim()}
      style={{ "--orbit-duration": `${durationSeconds}s` } as React.CSSProperties}
    >
      <svg
        className={styles.svg}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {pathD ? <path className={styles.track} d={pathD} pathLength={100} /> : null}
        {pathD ? <path className={styles.pathLine} d={pathD} pathLength={100} /> : null}
        {pathD ? (
          <circle className={styles.dot} cx="0" cy="0" r="1.45">
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
            className={styles.node}
            style={
              {
                "--node-x": `${node.x}%`,
                "--node-y": `${node.y}%`,
                "--node-delay": `${nodeDelayMs}ms`,
              } as React.CSSProperties
            }
            title={node.label}
          >
            <div className={styles.nodeInner}>
              <IconComponent width={iconSize} height={iconSize} />
            </div>
            <span className={styles.srOnly}>{node.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default RuntimeOrbitDiagram;
