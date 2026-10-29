/**
 * Standalone Steez UI copy of Hexagon Grid.
 *
 * Generated from packages/ui/src/components/HexagonGrid.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";

const __styles_steez_hexagon_grid_0: Record<string, string> = {
  "root": "steez-hexagon-grid-0-root",
  "canvas": "steez-hexagon-grid-0-canvas",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/HexagonGrid.module.css */
.steez-hexagon-grid-0-root {
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
}

.steez-hexagon-grid-0-canvas {
  display: block;
  background: transparent;
  cursor: pointer;
  width: 100%;
  height: 100%;
}
`;
const __steezStandaloneStyleKey = "hexagon-grid";

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

export interface ElementSize {
  width: number;
  height: number;
}

const NO_SIZE: ElementSize = { width: 0, height: 0 };

/**
 * Tracks an element's client size (content plus padding) with ResizeObserver.
 * Keeps `fallback` until the element has a non-zero size, and keeps the last
 * good size if it later collapses to zero.
 */
export function useElementSize(
  ref: React.RefObject<HTMLElement | null>,
  fallback: ElementSize = NO_SIZE,
): ElementSize {
  const [size, setSize] = React.useState(fallback);

  React.useEffect(() => {
    const element = ref.current;
    if (!element || typeof ResizeObserver === "undefined") return undefined;

    const observer = new ResizeObserver(() => {
      const width = ref.current?.clientWidth ?? 0;
      const height = ref.current?.clientHeight ?? 0;
      if (width <= 0 || height <= 0) return;
      setSize((current) =>
        current.width === width && current.height === height ? current : { width, height },
      );
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  return size;
}

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

/** Shared lifecycle for ambient motion: explicit pause, visibility, and reduced motion. */
export function useMotionActivity<T extends HTMLElement = HTMLDivElement>(
  paused = false,
  visible = true,
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    const syncVisibility = () =>
      setPageVisible(document.visibilityState !== "hidden");
    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);
    const observer =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(([entry]) => {
            if (entry) setInView(entry.isIntersecting);
          });
    if (ref.current) observer?.observe(ref.current);
    return () => {
      document.removeEventListener("visibilitychange", syncVisibility);
      observer?.disconnect();
    };
  }, []);
  return {
    ref,
    running: visible && !paused && inView && pageVisible && !reduced,
  };
}

/** Pure state for HexagonGrid: layout, hit testing, and the ripple simulation. */

export const HEX_RADIUS = 25;
export const DEFAULT_CELL_BUDGET = 512;
/** Frames a selection takes to fade in; it starts spreading when it finishes. */
export const COUNT_MIN = 5;
/** Frames a selection holds before it fades out. */
export const COUNT_MAX = 50;
export const LUMINANCE_MIN = 8;
export const LUMINANCE_MAX = 50;

/** Ripples only spread two rings out from their source. */
const SPREAD_STEPS = 2;
const HUE_MIN = 180;
const HUE_MAX = 220;

export type Random = () => number;

export interface Selection {
  count: number;
  hue: number;
}

interface Spread {
  directions: number[];
  hue: number;
  step: number;
}

export interface Hexagon {
  x: number;
  y: number;
  selections: Selection[];
  /** Six neighbors, clockwise from the right; null at the grid edge. */
  neighbors: Array<Hexagon | null>;
  spreads: Spread[];
}

export interface HexGrid {
  cells: Hexagon[];
  radius: number;
}

export function randomInt(random: Random, min: number, max: number) {
  return Math.floor(random() * (max - min + 1)) + min;
}

const BASE_WIDTH = HEX_RADIUS * Math.cos(Math.PI / 6) * 2;
const BASE_HEIGHT = HEX_RADIUS * (2 - Math.sin(Math.PI / 6));

/** Columns and rows that cover the surface, shrunk to fit the cell budget. */
export function gridSize(width: number, height: number, cellBudget: number) {
  const wantX = Math.ceil(width / BASE_WIDTH) + 1;
  const wantY = Math.ceil(height / BASE_HEIGHT) + 1;
  const budget = Number.isFinite(cellBudget)
    ? Math.max(1, Math.floor(cellBudget))
    : DEFAULT_CELL_BUDGET;
  if (wantX * wantY <= budget) {
    return { countX: wantX, countY: wantY };
  }
  const countX = Math.min(
    wantX,
    budget,
    Math.max(1, Math.floor(Math.sqrt((budget * wantX) / wantY))),
  );
  const countY = Math.min(wantY, Math.max(1, Math.floor(budget / countX)));
  return { countX, countY };
}

/** Builds an offset-row hex grid centered on the surface, with one seeded ripple. */
export function buildHexGrid(
  width: number,
  height: number,
  cellBudget = DEFAULT_CELL_BUDGET,
  random: Random = Math.random,
): HexGrid {
  const { countX, countY } = gridSize(width, height, cellBudget);
  // Stretch cells when the budget leaves gaps, so the surface stays covered.
  const scale = Math.max(1, width / (countX * BASE_WIDTH), height / (countY * BASE_HEIGHT));
  const hexWidth = BASE_WIDTH * scale;
  const hexHeight = BASE_HEIGHT * scale;
  const offsetX = (width - countX * hexWidth) / 2;
  const offsetY = (height - countY * hexHeight) / 2;

  const cells: Hexagon[] = [];
  for (let row = 0; row < countY; row += 1) {
    for (let col = 0; col < countX; col += 1) {
      cells.push({
        x: offsetX + (col + 0.5) * hexWidth - (row % 2 === 1 ? 0 : hexWidth / 2),
        y: offsetY + (row + 0.5) * hexHeight,
        selections: [],
        neighbors: [],
        spreads: [],
      });
    }
  }

  const at = (col: number, row: number) =>
    col >= 0 && col < countX && row >= 0 && row < countY
      ? cells[row * countX + col]
      : null;
  cells.forEach((cell, index) => {
    const col = index % countX;
    const row = Math.floor(index / countX);
    // Odd rows sit half a cell right, so their diagonal neighbors shift by one.
    const shift = row % 2;
    cell.neighbors = [
      at(col + 1, row),
      at(col + shift, row + 1),
      at(col + shift - 1, row + 1),
      at(col - 1, row),
      at(col + shift - 1, row - 1),
      at(col + shift, row - 1),
    ];
  });

  const grid = { cells, radius: HEX_RADIUS * scale };
  selectRandomHex(grid, random);
  return grid;
}

/** The cell under a point, or undefined between cells and off the grid. */
export function findHexAt({ cells, radius }: HexGrid, x: number, y: number) {
  const halfWidth = radius * Math.cos(Math.PI / 6);
  const slope = Math.tan(Math.PI / 3);
  return cells.find((hex) => {
    if (Math.abs(x - hex.x) > halfWidth || Math.abs(y - hex.y) > radius) {
      return false;
    }
    if (y < hex.y) return Math.abs((x - hex.x) / (y - hex.y + radius)) <= slope;
    if (y > hex.y) return Math.abs((x - hex.x) / (y - hex.y - radius)) <= slope;
    return true;
  });
}

export function selectHex(hex: Hexagon | undefined, random: Random = Math.random) {
  hex?.selections.push({ count: 0, hue: randomInt(random, HUE_MIN, HUE_MAX) });
}

export function selectRandomHex(grid: HexGrid, random: Random = Math.random) {
  if (grid.cells.length > 0) {
    selectHex(grid.cells[randomInt(random, 0, grid.cells.length - 1)], random);
  }
}

/** Fill lightness and opacity for a selection at a given age in frames. */
export function selectionLook(count: number) {
  const range = LUMINANCE_MAX - LUMINANCE_MIN;
  if (count < COUNT_MIN) {
    return {
      lightness: LUMINANCE_MIN + range * Math.sin((Math.PI / 2) * (count / COUNT_MIN)) ** 3,
      opacity: count / COUNT_MIN,
    };
  }
  if (count < COUNT_MAX) {
    const fade = (count - COUNT_MIN) / (COUNT_MAX - COUNT_MIN);
    return {
      lightness: LUMINANCE_MIN + range * Math.sin((Math.PI / 2) * (1 + fade)),
      opacity: 1,
    };
  }
  return { lightness: LUMINANCE_MAX, opacity: 1 };
}

/** Advances one frame: ages selections, then spreads newly lit cells outward. */
export function stepHexGrid({ cells }: HexGrid, random: Random = Math.random) {
  for (const hex of cells) {
    for (const selection of hex.selections) selection.count += 1;
    hex.selections = hex.selections.filter(
      (selection) => selection.count <= COUNT_MAX + COUNT_MIN,
    );
  }

  for (const hex of cells) {
    for (const selection of hex.selections) {
      if (selection.count === COUNT_MIN) {
        hex.spreads.push({ directions: [randomInt(random, 0, 5)], hue: selection.hue, step: 0 });
      }
    }
  }

  for (const hex of cells) {
    for (const spread of hex.spreads) {
      const next: number[] = [];
      for (const direction of spread.directions) {
        const neighbor = hex.neighbors[direction];
        if (!neighbor) continue;
        neighbor.selections.push({ count: COUNT_MIN, hue: spread.hue });
        // Fan out: keep heading the same way and branch 60° to either side.
        next.push((direction + 4) % 6, direction, (direction + 2) % 6);
      }
      spread.directions = next;
      spread.step += 1;
    }
    hex.spreads = hex.spreads.filter((spread) => spread.step < SPREAD_STEPS);
  }
}

export type HexagonGridTone = "default" | "light" | "dark";

export interface PaintOptions {
  width: number;
  height: number;
  tone: HexagonGridTone;
  backgroundOpacity: number;
}

/** Gap between cells, as a share of the cell radius. */
const CELL_FILL = 0.98;
/** Selections at this hue stay gray, even in the default tone. */
const NEUTRAL_HUE = 210;

const BASE_LOOK: Record<HexagonGridTone, { fill: number; stroke: number; opacity: number }> = {
  default: { fill: LUMINANCE_MIN, stroke: LUMINANCE_MIN, opacity: 0.3 },
  light: { fill: 88, stroke: 96, opacity: 0.92 },
  dark: { fill: 10, stroke: 16, opacity: 0.92 },
};

interface CellPaint {
  fill: number;
  stroke: number;
  hue: number;
  opacity: number;
}

function paintCell(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  tone: HexagonGridTone,
  { fill, stroke, hue, opacity }: CellPaint,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.beginPath();
  for (let index = 0; index < 6; index += 1) {
    const angle = (Math.PI / 3) * index;
    ctx[index === 0 ? "moveTo" : "lineTo"](radius * Math.sin(angle), -radius * Math.cos(angle));
  }
  ctx.closePath();

  const accent = tone === "default" && hue > 0 && hue !== NEUTRAL_HUE;
  const color = (lightness: number, alpha: number) =>
    `hsla(${accent ? hue : 0}, ${accent ? 15 : 0}%, ${lightness}%, ${alpha})`;
  ctx.fillStyle = color(fill, opacity * 0.25);
  ctx.fill();
  ctx.strokeStyle = color(stroke, opacity * 0.35);
  ctx.stroke();
  ctx.restore();
}

/** Draws the grid's current state; it never changes the grid. */
export function paintHexGrid(
  ctx: CanvasRenderingContext2D,
  grid: HexGrid,
  { width, height, tone, backgroundOpacity }: PaintOptions,
) {
  if (backgroundOpacity > 0) {
    ctx.fillStyle = `rgba(0, 0, 0, ${backgroundOpacity})`;
    ctx.fillRect(0, 0, width, height);
  } else {
    ctx.clearRect(0, 0, width, height);
  }

  const radius = grid.radius * CELL_FILL;
  const base = BASE_LOOK[tone];
  for (const hex of grid.cells) {
    paintCell(ctx, hex.x, hex.y, radius, tone, { ...base, hue: 0 });
    for (const selection of hex.selections) {
      const { lightness, opacity } = selectionLook(selection.count);
      paintCell(ctx, hex.x, hex.y, radius, tone, {
        fill: lightness,
        stroke: lightness,
        hue: selection.hue,
        opacity,
      });
    }
  }
}

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
      className={__styles_steez_hexagon_grid_0.root}
      onMouseMove={handlePointerMove}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className={__styles_steez_hexagon_grid_0.canvas} />
    </div>
  );
}

export default HexagonGrid;
