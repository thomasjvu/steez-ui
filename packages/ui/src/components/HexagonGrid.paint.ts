import { LUMINANCE_MIN, selectionLook, type HexGrid } from "./HexagonGrid.model";

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
