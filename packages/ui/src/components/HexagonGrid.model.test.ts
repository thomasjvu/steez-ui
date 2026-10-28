import { describe, expect, it } from "vitest";

import {
  buildHexGrid,
  COUNT_MAX,
  COUNT_MIN,
  findHexAt,
  gridSize,
  LUMINANCE_MAX,
  LUMINANCE_MIN,
  selectionLook,
  stepHexGrid,
  type HexGrid,
} from "./HexagonGrid.model";

/** Deterministic random source: always returns the same value. */
const fixed = (value: number) => () => value;

function clearSelections(grid: HexGrid) {
  for (const cell of grid.cells) cell.selections = [];
  return grid;
}

describe("gridSize", () => {
  it("covers the surface when it fits the budget", () => {
    expect(gridSize(120, 80, 512)).toEqual({ countX: 4, countY: 4 });
  });

  it("shrinks to the budget and treats bad budgets as the default", () => {
    const small = gridSize(4000, 3000, 12);
    expect(small.countX * small.countY).toBeLessThanOrEqual(12);
    const fallback = gridSize(4000, 3000, Number.NaN);
    expect(fallback.countX * fallback.countY).toBeLessThanOrEqual(512);
  });
});

describe("buildHexGrid", () => {
  it("wires neighbors both ways", () => {
    const grid = buildHexGrid(300, 200, 512, fixed(0));
    for (const cell of grid.cells) {
      cell.neighbors.forEach((neighbor, direction) => {
        expect(neighbor?.neighbors[(direction + 3) % 6] ?? cell).toBe(cell);
      });
    }
    const interior = grid.cells.filter((cell) => cell.neighbors.every(Boolean));
    expect(interior.length).toBeGreaterThan(0);
  });

  it("seeds exactly one ripple", () => {
    const grid = buildHexGrid(300, 200, 512, fixed(0));
    expect(grid.cells.flatMap((cell) => cell.selections)).toHaveLength(1);
  });
});

describe("findHexAt", () => {
  const grid = buildHexGrid(300, 200, 512, fixed(0));

  it("finds the cell under its center", () => {
    for (const cell of grid.cells) expect(findHexAt(grid, cell.x, cell.y)).toBe(cell);
  });

  it("misses points off the grid", () => {
    expect(findHexAt(grid, -1000, -1000)).toBeUndefined();
  });
});

describe("selectionLook", () => {
  it("fades in, holds, then settles at full lightness", () => {
    expect(selectionLook(0)).toEqual({ lightness: LUMINANCE_MIN, opacity: 0 });
    expect(selectionLook(COUNT_MIN).opacity).toBe(1);
    expect(selectionLook(COUNT_MIN).lightness).toBeCloseTo(LUMINANCE_MAX);
    expect(selectionLook(COUNT_MAX)).toEqual({ lightness: LUMINANCE_MAX, opacity: 1 });
  });
});

describe("stepHexGrid", () => {
  it("lights one neighbor, then fans out to two more, then stops", () => {
    const grid = clearSelections(buildHexGrid(600, 400, 512, fixed(0)));
    const source = grid.cells.find((cell) => cell.neighbors.every(Boolean))!;
    source.selections.push({ count: COUNT_MIN - 1, hue: 200 });
    const lit = () => grid.cells.filter((cell) => cell.selections.length > 0).length;

    stepHexGrid(grid, fixed(0));
    expect(source.neighbors[0]?.selections).toEqual([{ count: COUNT_MIN, hue: 200 }]);
    expect(lit()).toBe(2);

    stepHexGrid(grid, fixed(0));
    expect(lit()).toBe(4);

    stepHexGrid(grid, fixed(0));
    expect(lit()).toBe(4);
    expect(source.spreads).toEqual([]);
  });

  it("drops selections after they fade out", () => {
    const grid = clearSelections(buildHexGrid(120, 80, 512, fixed(0)));
    grid.cells[0]!.selections.push({ count: COUNT_MAX + COUNT_MIN, hue: 200 });
    stepHexGrid(grid);
    expect(grid.cells[0]!.selections).toEqual([]);
  });
});
