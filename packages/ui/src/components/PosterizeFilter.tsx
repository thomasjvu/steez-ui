"use client";

import React from "react";
import { clampFinite } from "../utils/numbers.ts";
import { FilterFrame, type ContentFilterProps } from "./FilterFrame.tsx";

export interface PosterizeFilterProps extends ContentFilterProps {
  /** Number of discrete shades per channel, between 2 and 16. */
  levels?: number;
}
const levelsByIntensity = { subtle: 8, default: 5, intense: 3 };

/** Reduce continuous colors to stepped bands without changing source alpha. */
export function PosterizeFilter({
  levels, intensity = "default", trigger = "static", ...props
}: PosterizeFilterProps) {
  const count = Math.round(clampFinite(levels ?? levelsByIntensity[intensity], 2, 16, levelsByIntensity.default));
  return <FilterFrame {...props} trigger={trigger} renderFilter={frame => {
    const frameCount = Math.max(2, count - frame);
    const table = Array.from({ length: frameCount }, (_, index) => index / (frameCount - 1)).join(" ");
    return <feComponentTransfer in="SourceGraphic">
      <feFuncR type="discrete" tableValues={table} />
      <feFuncG type="discrete" tableValues={table} />
      <feFuncB type="discrete" tableValues={table} />
    </feComponentTransfer>;
  }} />;
}
