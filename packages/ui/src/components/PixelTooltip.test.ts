import { describe, expect, it } from "vitest";

import { coordsForPosition } from "./PixelTooltip";

function rect(
  left: number,
  top: number,
  width: number,
  height: number,
): DOMRect {
  return {
    left,
    top,
    width,
    height,
    right: left + width,
    bottom: top + height,
    x: left,
    y: top,
    toJSON() {
      return this;
    },
  } as DOMRect;
}

describe("coordsForPosition", () => {
  const r = rect(100, 200, 40, 20);

  it("anchors top at horizontal center and top edge", () => {
    expect(coordsForPosition(r, "top")).toEqual({
      x: 120,
      y: 200,
      width: 40,
    });
  });

  it("anchors bottom at horizontal center and bottom edge", () => {
    expect(coordsForPosition(r, "bottom")).toEqual({
      x: 120,
      y: 220,
      width: 40,
    });
  });

  it("anchors left at left edge and vertical center", () => {
    expect(coordsForPosition(r, "left")).toEqual({
      x: 100,
      y: 210,
      width: 40,
    });
  });

  it("anchors right at right edge and vertical center", () => {
    expect(coordsForPosition(r, "right")).toEqual({
      x: 140,
      y: 210,
      width: 40,
    });
  });
});
