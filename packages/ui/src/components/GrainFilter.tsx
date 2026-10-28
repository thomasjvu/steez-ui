"use client";

import React from "react";
import { clampFinite } from "../utils/numbers.ts";
import { FilterFrame, type ContentFilterProps } from "./FilterFrame.tsx";

export interface GrainFilterProps extends ContentFilterProps {
  /** Noise contribution, from 0 to 1. */
  amount?: number;
  /** Noise frequency; higher values produce finer grain. */
  frequency?: number;
}
const amounts = { subtle: 0.12, default: 0.25, intense: 0.5 };

/** Monochrome film grain clipped to the content's alpha, preserving empty space. */
export function GrainFilter({
  amount, frequency = 0.65, intensity = "default", trigger = "static", ...props
}: GrainFilterProps) {
  const strength = clampFinite(amount ?? amounts[intensity], 0, 1, amounts.default);
  const density = clampFinite(frequency, 0.05, 1, 0.65);
  return <FilterFrame {...props} trigger={trigger} renderFilter={frame => <>
    <feTurbulence type="fractalNoise" baseFrequency={density} numOctaves={3}
      seed={[3, 17, 41][frame]} stitchTiles="stitch" result="noise" />
    <feColorMatrix in="noise" type="saturate" values="0" result="mono" />
    <feComponentTransfer in="mono" result="faded">
      <feFuncA type="table" tableValues={`0 ${strength}`} />
    </feComponentTransfer>
    <feComposite in="faded" in2="SourceGraphic" operator="in" result="grain" />
    <feBlend in="SourceGraphic" in2="grain" mode="soft-light" />
  </>} />;
}
