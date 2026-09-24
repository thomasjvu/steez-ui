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

export interface HexagonGridProps {
  width?: number;
  height?: number;
  pointerReactive?: boolean;
  backgroundOpacity?: number;
  tone?: "default" | "light" | "dark";
  autoTriggerBaseDelayMs?: number;
  autoTriggerJitterMs?: number;
  /** Maximum number of cells rendered for one grid. Defaults to 512. */
  cellBudget?: number;
}

const RADIUS = 25;
const RATE = 0.98;
const DEFAULT_CELL_BUDGET = 512;
const COUNT_MIN = 5;
const COUNT_MAX = 50;
const LUMINANCE_MIN = 8;
const LUMINANCE_MAX = 50;

interface HexagonData {
  x: number;
  y: number;
  hue: number;
  selections: Array<{ count: number; hue: number }>;
  neighbors: Array<HexagonData | null>;
  sourceIndices: Array<{ indices: number[]; hue: number; count: number }>;
}

function randomFloat() {
  return Math.random();
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const hexagonsRef = React.useRef<HexagonData[]>([]);
  const gridRadiusRef = React.useRef(RADIUS);
  const animationRef = React.useRef<number>(0);
  const lastPointerSelectionRef = React.useRef(0);
  const autoTriggerTimeoutRef = React.useRef<number | null>(null);
  const pausedRef = React.useRef(false);
  const [dimensions, setDimensions] = React.useState({
    width: initialWidth,
    height: initialHeight,
  });

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return undefined;
    }

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver((entries) => {
            for (const entry of entries) {
              const { width, height } = entry.contentRect;
              if (width > 0 && height > 0) {
                setDimensions({ width: Math.floor(width), height: Math.floor(height) });
              }
            }
          });

    if (resizeObserver) {
      resizeObserver.observe(container);
    }

    return () => resizeObserver?.disconnect();
  }, []);

  const width = dimensions.width;
  const height = dimensions.height;

  const triggerHexSelection = React.useCallback((x: number, y: number) => {
    const hexagons = hexagonsRef.current;
    const radius = gridRadiusRef.current;
    const hexWidth = radius * Math.cos(Math.PI / 6) * 2;

    for (const hex of hexagons) {
      if (
        x < hex.x - hexWidth / 2 ||
        x > hex.x + hexWidth / 2 ||
        y < hex.y - radius ||
        y > hex.y + radius ||
        (y < hex.y &&
          Math.abs((x - hex.x) / (y - hex.y + radius)) > Math.tan(Math.PI / 3)) ||
        (y > hex.y &&
          Math.abs((x - hex.x) / (y - hex.y - radius)) > Math.tan(Math.PI / 3))
      ) {
        continue;
      }

      hex.selections.push({ count: 0, hue: randomInt(180, 220) });
      break;
    }
  }, []);

  const init = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const baseHexWidth = RADIUS * Math.cos(Math.PI / 6) * 2;
    const baseHexHeight = RADIUS * (2 - Math.sin(Math.PI / 6));

    const requestedCountX = Math.ceil(width / baseHexWidth) + 1;
    const requestedCountY = Math.ceil(height / baseHexHeight) + 1;
    const safeCellBudget = Number.isFinite(cellBudget)
      ? Math.max(1, Math.floor(cellBudget))
      : DEFAULT_CELL_BUDGET;
    const requestedCellCount = requestedCountX * requestedCountY;
    let countX = requestedCountX;
    let countY = requestedCountY;

    if (requestedCellCount > safeCellBudget) {
      countX = Math.min(
        requestedCountX,
        safeCellBudget,
        Math.max(
          1,
          Math.floor(
            Math.sqrt((safeCellBudget * requestedCountX) / requestedCountY),
          ),
        ),
      );
      countY = Math.min(
        requestedCountY,
        Math.max(1, Math.floor(safeCellBudget / countX)),
      );
    }

    const spacingScale = Math.max(
      1,
      width / (countX * baseHexWidth),
      height / (countY * baseHexHeight),
    );
    const hexWidth = baseHexWidth * spacingScale;
    const hexHeight = baseHexHeight * spacingScale;
    gridRadiusRef.current = RADIUS * spacingScale;

    const offsetX = -((countX * hexWidth - width) / 2);
    const offsetY = -((countY * hexHeight - height) / 2);

    const hexagons: HexagonData[] = [];

    for (let gridY = 0; gridY < countY; gridY += 1) {
      for (let gridX = 0; gridX < countX; gridX += 1) {
        hexagons.push({
          x:
            offsetX +
            (gridX + 0.5) * hexWidth -
            (gridY % 2 === 1 ? 0 : hexWidth / 2),
          y: offsetY + (gridY + 0.5) * hexHeight,
          hue: 0,
          selections: [],
          neighbors: new Array(6).fill(null),
          sourceIndices: [],
        });
      }
    }

    for (let gridY = 0; gridY < countY; gridY += 1) {
      for (let gridX = 0; gridX < countX; gridX += 1) {
        const hexagon = hexagons[gridY * countX + gridX];

        if (gridX < countX - 1) {
          hexagon.neighbors[0] = hexagons[gridY * countX + gridX + 1];
        }
        if ((gridX < countX - 1 || gridY % 2 === 0) && gridY < countY - 1) {
          hexagon.neighbors[1] =
            hexagons[(gridY + 1) * countX + gridX + (gridY % 2 === 1 ? 1 : 0)];
        }
        if ((gridX > 0 || gridY % 2 === 1) && gridY < countY - 1) {
          hexagon.neighbors[2] =
            hexagons[(gridY + 1) * countX + gridX + (gridY % 2 === 1 ? 0 : -1)];
        }
        if (gridX > 0) {
          hexagon.neighbors[3] = hexagons[gridY * countX + gridX - 1];
        }
        if ((gridX > 0 || gridY % 2 === 1) && gridY > 0) {
          hexagon.neighbors[4] =
            hexagons[(gridY - 1) * countX + gridX + (gridY % 2 === 1 ? 0 : -1)];
        }
        if ((gridX < countX - 1 || gridY % 2 === 0) && gridY > 0) {
          hexagon.neighbors[5] =
            hexagons[(gridY - 1) * countX + gridX + (gridY % 2 === 1 ? 1 : 0)];
        }
      }
    }

    hexagons[randomInt(0, hexagons.length - 1)]?.selections.push({
      count: 0,
      hue: randomInt(180, 220),
    });

    hexagonsRef.current = hexagons;
  }, [cellBudget, height, width]);

  const drawHexagon = React.useCallback(
    (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      radius: number,
      fillLightness: number,
      strokeLightness: number,
      hue: number,
      opacity: number,
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.beginPath();

      for (let index = 0; index < 6; index += 1) {
        const vertexX = radius * Math.sin((Math.PI / 3) * index);
        const vertexY = -radius * Math.cos((Math.PI / 3) * index);
        ctx[index === 0 ? "moveTo" : "lineTo"](vertexX, vertexY);
      }
      ctx.closePath();

      const isAccent = tone === "default" && hue > 0 && hue !== 210;
      const actualHue = isAccent ? hue : 0;
      const saturation = isAccent ? 15 : 0;

      ctx.fillStyle = `hsla(${actualHue}, ${saturation}%, ${fillLightness}%, ${
        opacity * 0.25
      })`;
      ctx.fill();
      ctx.strokeStyle = `hsla(${actualHue}, ${saturation}%, ${strokeLightness}%, ${
        opacity * 0.35
      })`;
      ctx.stroke();
      ctx.restore();
    },
    [tone],
  );

  const render = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const hexagons = hexagonsRef.current;
    if (hexagons.length === 0) {
      return;
    }

    if (backgroundOpacity > 0) {
      ctx.fillStyle = `rgba(0, 0, 0, ${backgroundOpacity})`;
      ctx.fillRect(0, 0, width, height);
    } else {
      ctx.clearRect(0, 0, width, height);
    }

    const radius = gridRadiusRef.current * RATE;

    for (const hex of hexagons) {
      const baseFillLightness =
        tone === "light" ? 88 : tone === "dark" ? 10 : LUMINANCE_MIN;
      const baseStrokeLightness =
        tone === "light" ? 96 : tone === "dark" ? 16 : LUMINANCE_MIN;
      const baseOpacity = tone === "default" ? 0.3 : 0.92;

      drawHexagon(
        ctx,
        hex.x,
        hex.y,
        radius,
        baseFillLightness,
        baseStrokeLightness,
        0,
        baseOpacity,
      );

      for (const selection of hex.selections) {
        let fillLightness: number;
        let opacity: number;

        if (selection.count < COUNT_MIN) {
          fillLightness =
            LUMINANCE_MIN +
            (LUMINANCE_MAX - LUMINANCE_MIN) *
              Math.pow(
                Math.sin((Math.PI / 2) * selection.count / COUNT_MIN),
                3,
              );
          opacity = selection.count / COUNT_MIN;
        } else if (selection.count < COUNT_MAX) {
          fillLightness =
            LUMINANCE_MIN +
            (LUMINANCE_MAX - LUMINANCE_MIN) *
              Math.sin(
                (Math.PI / 2) *
                  (1 + (selection.count - COUNT_MIN) / (COUNT_MAX - COUNT_MIN)),
              );
          opacity = 1;
        } else {
          fillLightness = LUMINANCE_MAX;
          opacity = 1;
        }

        drawHexagon(
          ctx,
          hex.x,
          hex.y,
          radius,
          fillLightness,
          fillLightness,
          selection.hue,
          opacity,
        );
        selection.count += 1;
      }

      hex.selections = hex.selections.filter(
        (selection) => selection.count <= COUNT_MAX + COUNT_MIN,
      );
    }

    for (const hex of hexagons) {
      if (hex.selections.length === 0) {
        continue;
      }

      for (const selection of hex.selections) {
        if (selection.count !== COUNT_MIN) {
          continue;
        }

        hex.sourceIndices.push({
          indices: [randomInt(0, 5)],
          hue: selection.hue,
          count: 0,
        });
      }
    }

    for (const hex of hexagons) {
      if (hex.sourceIndices.length === 0) {
        continue;
      }

      for (const sourceIndex of hex.sourceIndices) {
        if (sourceIndex.count >= 2) {
          continue;
        }

        const targetIndices: number[] = [];
        const currentIndices = sourceIndex.indices;

        for (const index of currentIndices) {
          const neighbor = hex.neighbors[index];
          if (!neighbor) {
            continue;
          }

          neighbor.selections.push({
            count: COUNT_MIN,
            hue: sourceIndex.hue,
          });
          targetIndices.push((index + 4) % 6, index, (index + 2) % 6);
        }

        sourceIndex.indices = targetIndices;
        sourceIndex.count += 1;
      }

      hex.sourceIndices = hex.sourceIndices.filter((sourceIndex) => sourceIndex.count < 2);
    }

    if (!pausedRef.current) {
      animationRef.current = window.requestAnimationFrame(render);
    }
  }, [backgroundOpacity, drawHexagon, height, tone, width]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas) {
      return undefined;
    }

    canvas.width = width;
    canvas.height = height;
    init();

    let isDocumentVisible =
      typeof document !== "undefined" ? !document.hidden : true;
    let isInViewport = true;
    const reducedMotionQuery =
      typeof window !== "undefined" && typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;
    let prefersReducedMotion = reducedMotionQuery?.matches ?? false;

    const clearAutoTrigger = () => {
      if (autoTriggerTimeoutRef.current !== null) {
        window.clearTimeout(autoTriggerTimeoutRef.current);
        autoTriggerTimeoutRef.current = null;
      }
    };

    const scheduleAutoTrigger = () => {
      if (pausedRef.current || autoTriggerTimeoutRef.current !== null) {
        return;
      }

      const autoTrigger = () => {
        autoTriggerTimeoutRef.current = null;
        if (pausedRef.current) {
          return;
        }

        const activeHexagons = hexagonsRef.current;
        if (activeHexagons.length > 0) {
          const randomHex = activeHexagons[randomInt(0, activeHexagons.length - 1)];
          randomHex?.selections.push({
            count: 0,
            hue: randomInt(180, 220),
          });
        }

        scheduleAutoTrigger();
      };

      autoTriggerTimeoutRef.current = window.setTimeout(
        autoTrigger,
        autoTriggerBaseDelayMs + randomFloat() * autoTriggerJitterMs,
      );
    };

    const updatePaused = () => {
      pausedRef.current =
        prefersReducedMotion || !isDocumentVisible || !isInViewport;
    };

    const stopLoop = () => {
      window.cancelAnimationFrame(animationRef.current);
      animationRef.current = 0;
    };

    const stopActivity = () => {
      stopLoop();
      clearAutoTrigger();
    };

    const startLoop = () => {
      updatePaused();
      if (pausedRef.current) {
        stopActivity();
        return;
      }
      if (animationRef.current === 0) {
        animationRef.current = window.requestAnimationFrame(render);
      }
      scheduleAutoTrigger();
    };

    updatePaused();
    // Always paint at least one frame (static under reduced-motion).
    render();
    if (!pausedRef.current) {
      scheduleAutoTrigger();
    } else {
      stopActivity();
    }

    const onVisibilityChange = () => {
      isDocumentVisible = !document.hidden;
      updatePaused();
      if (pausedRef.current) {
        stopActivity();
      } else {
        startLoop();
      }
    };

    const onReducedMotionChange = (event: MediaQueryListEvent) => {
      prefersReducedMotion = event.matches;
      updatePaused();
      if (pausedRef.current) {
        stopActivity();
        render();
        stopLoop();
      } else {
        startLoop();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    reducedMotionQuery?.addEventListener("change", onReducedMotionChange);

    let intersectionObserver: IntersectionObserver | null = null;
    if (container && typeof IntersectionObserver !== "undefined") {
      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          isInViewport = entry?.isIntersecting ?? true;
          updatePaused();
          if (pausedRef.current) {
            stopActivity();
          } else {
            startLoop();
          }
        },
        { threshold: 0 },
      );
      intersectionObserver.observe(container);
    }

    return () => {
      stopActivity();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reducedMotionQuery?.removeEventListener("change", onReducedMotionChange);
      intersectionObserver?.disconnect();
    };
  }, [
    autoTriggerBaseDelayMs,
    autoTriggerJitterMs,
    height,
    init,
    render,
    width,
  ]);

  const handlePointerMove = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!pointerReactive) {
        return;
      }

      const now = performance.now();
      if (now - lastPointerSelectionRef.current < 90) {
        return;
      }

      const container = containerRef.current;
      if (!container) {
        return;
      }

      const rect = container.getBoundingClientRect();
      triggerHexSelection(event.clientX - rect.left, event.clientY - rect.top);
      lastPointerSelectionRef.current = now;
    },
    [pointerReactive, triggerHexSelection],
  );

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
