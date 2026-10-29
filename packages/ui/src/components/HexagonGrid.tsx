"use client";

import React from "react";

import { useElementSize } from "../hooks/useElementSize";
import { useMotionActivity } from "../hooks/useMotionActivity";
import styles from "./HexagonGrid.module.css";
import {
  buildHexGrid,
  DEFAULT_CELL_BUDGET,
  findHexAt,
  selectHex,
  selectRandomHex,
  stepHexGrid,
  type HexGrid,
} from "./HexagonGrid.model";
import { paintHexGrid, type HexagonGridTone } from "./HexagonGrid.paint";

export interface HexagonGridProps {
  width?: number;
  height?: number;
  pointerReactive?: boolean;
  backgroundOpacity?: number;
  tone?: HexagonGridTone;
  autoTriggerBaseDelayMs?: number;
  autoTriggerJitterMs?: number;
  /** Maximum number of cells rendered for one grid. Defaults to 512. */
  cellBudget?: number;
}

/** Minimum time between pointer-triggered ripples. */
const POINTER_THROTTLE_MS = 90;
const EMPTY_GRID: HexGrid = { cells: [], radius: 0 };

export function HexagonGrid({
  width: initialWidth = 800,
  height: initialHeight = 600,
  pointerReactive = false,
  backgroundOpacity = 0.4,
  tone = "default",
  autoTriggerBaseDelayMs = 2000,
  autoTriggerJitterMs = 1000,
  cellBudget = DEFAULT_CELL_BUDGET,
}: HexagonGridProps) {
  const { ref: containerRef, running } = useMotionActivity();
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const gridRef = React.useRef<HexGrid>(EMPTY_GRID);
  const lastPointerRef = React.useRef(0);
  const { width, height } = useElementSize(containerRef, {
    width: initialWidth,
    height: initialHeight,
  });

  const paint = React.useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx && gridRef.current.cells.length > 0) {
      paintHexGrid(ctx, gridRef.current, { width, height, tone, backgroundOpacity });
    }
  }, [backgroundOpacity, height, tone, width]);

  // Rebuild on any surface change and always paint one frame, so paused and
  // reduced-motion grids are still visible.
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = width;
    canvas.height = height;
    gridRef.current = buildHexGrid(width, height, cellBudget);
    paint();
  }, [cellBudget, height, paint, width]);

  // Animate and auto-trigger ripples only while motion is allowed.
  React.useEffect(() => {
    if (!running) return undefined;
    let frame = 0;
    let timeout = 0;
    const tick = () => {
      paint();
      stepHexGrid(gridRef.current);
      frame = window.requestAnimationFrame(tick);
    };
    const schedule = () => {
      timeout = window.setTimeout(() => {
        selectRandomHex(gridRef.current);
        schedule();
      }, autoTriggerBaseDelayMs + Math.random() * autoTriggerJitterMs);
    };
    frame = window.requestAnimationFrame(tick);
    schedule();
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [autoTriggerBaseDelayMs, autoTriggerJitterMs, paint, running]);

  const handlePointerMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    const now = performance.now();
    if (!pointerReactive || !container || now - lastPointerRef.current < POINTER_THROTTLE_MS) {
      return;
    }
    const rect = container.getBoundingClientRect();
    selectHex(findHexAt(gridRef.current, event.clientX - rect.left, event.clientY - rect.top));
    lastPointerRef.current = now;
  };

  return (
    <div
      ref={containerRef}
      className={styles.root}
      onMouseMove={handlePointerMove}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}

export default HexagonGrid;
