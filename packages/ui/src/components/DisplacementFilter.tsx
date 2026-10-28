"use client";

import React from "react";
import { clampFinite } from "../utils/numbers.ts";
import { FilterFrame, type ContentFilterProps, type FilterTrigger } from "./FilterFrame.tsx";

export type DisplacementFilterTrigger = FilterTrigger;
export interface DisplacementFilterProps extends ContentFilterProps {
  scale?: number;
}
const scales = { subtle: 5, default: 12, intense: 24 };

/** Apply a reusable SVG turbulence displacement to any React content. */
export function DisplacementFilter({
  intensity = "default", scale, trigger = "always", ...props
}: DisplacementFilterProps) {
  const amount = clampFinite(scale ?? scales[intensity], 0, 100, scales.default);
  return <FilterFrame {...props} trigger={trigger} reducedMotion="none" renderFilter={frame => <>
    <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves={2}
      seed={[3, 17, 41][frame]} result="warp" />
    <feDisplacementMap in="SourceGraphic" in2="warp" scale={amount}
      xChannelSelector="R" yChannelSelector="G" />
  </>} />;
}
