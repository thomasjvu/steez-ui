"use client";

import React from "react";
import { clampFinite } from "../utils/numbers.ts";
import { FilterFrame, type ContentFilterProps } from "./FilterFrame.tsx";

export interface EmbossFilterProps extends ContentFilterProps {
  /** Edge relief strength, from 0 to 4. */
  strength?: number;
}
const strengths = { subtle: 0.5, default: 1, intense: 2 };

/** Diagonal edge relief with preserved transparency and neutral raised surfaces. */
export function EmbossFilter({
  strength, intensity = "default", trigger = "static", ...props
}: EmbossFilterProps) {
  const amount = clampFinite(strength ?? strengths[intensity], 0, 4, strengths.default);
  return <FilterFrame {...props} trigger={trigger} renderFilter={frame => {
    const value = amount * [1, 0.75, 1.25][frame];
    return <feConvolveMatrix in="SourceGraphic" order="3" divisor={1}
      kernelMatrix={`${-2 * value} ${-value} 0 ${-value} 1 ${value} 0 ${value} ${2 * value}`}
      bias={0.5 * value} preserveAlpha edgeMode="duplicate" />;
  }} />;
}
