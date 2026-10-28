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
