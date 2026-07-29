import React from "react";

import styles from "./HexagonGrid.module.css";

export interface HexagonGridProps {
  width?: number;
  height?: number;
  pointerReactive?: boolean;
  backgroundOpacity?: number;
  tone?: "default" | "light" | "dark";
  autoTriggerBaseDelayMs?: number;
  autoTriggerJitterMs?: number;
}

const RADIUS = 25;
const RATE = 0.98;
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
}: HexagonGridProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const hexagonsRef = React.useRef<HexagonData[]>([]);
  const animationRef = React.useRef<number>(0);
  const lastPointerSelectionRef = React.useRef(0);
  const autoTriggerTimeoutRef = React.useRef<number | null>(null);
  const [dimensions, setDimensions] = React.useState({
    width: initialWidth,
    height: initialHeight,
  });

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return undefined;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          setDimensions({ width: Math.floor(width), height: Math.floor(height) });
        }
      }
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  const width = dimensions.width;
  const height = dimensions.height;

  const triggerHexSelection = React.useCallback((x: number, y: number) => {
    const hexagons = hexagonsRef.current;
    const hexWidth = RADIUS * Math.cos(Math.PI / 6) * 2;

    for (const hex of hexagons) {
      if (
        x < hex.x - hexWidth / 2 ||
        x > hex.x + hexWidth / 2 ||
        y < hex.y - RADIUS ||
        y > hex.y + RADIUS ||
        (y < hex.y &&
          Math.abs((x - hex.x) / (y - hex.y + RADIUS)) > Math.tan(Math.PI / 3)) ||
        (y > hex.y &&
          Math.abs((x - hex.x) / (y - hex.y - RADIUS)) > Math.tan(Math.PI / 3))
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

    const hexWidth = RADIUS * Math.cos(Math.PI / 6) * 2;
    const hexHeight = RADIUS * (2 - Math.sin(Math.PI / 6));

    const countX = Math.ceil(width / hexWidth) + 1;
    const countY = Math.ceil(height / hexHeight) + 1;
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

    const autoTrigger = () => {
      const activeHexagons = hexagonsRef.current;
      if (activeHexagons.length > 0) {
        const randomHex = activeHexagons[randomInt(0, activeHexagons.length - 1)];
        randomHex?.selections.push({
          count: 0,
          hue: randomInt(180, 220),
        });
      }
      autoTriggerTimeoutRef.current = window.setTimeout(
        autoTrigger,
        autoTriggerBaseDelayMs + randomFloat() * autoTriggerJitterMs,
      );
    };

    autoTriggerTimeoutRef.current = window.setTimeout(autoTrigger, autoTriggerBaseDelayMs);
  }, [autoTriggerBaseDelayMs, autoTriggerJitterMs, height, width]);

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

    const radius = RADIUS * RATE;

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

    animationRef.current = window.requestAnimationFrame(render);
  }, [backgroundOpacity, drawHexagon, height, tone, width]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    canvas.width = width;
    canvas.height = height;
    init();
    render();

    return () => {
      window.cancelAnimationFrame(animationRef.current);
      if (autoTriggerTimeoutRef.current !== null) {
        window.clearTimeout(autoTriggerTimeoutRef.current);
      }
    };
  }, [height, init, render, width]);

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
      className={styles.root}
      onMouseMove={handlePointerMove}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}

export default HexagonGrid;
