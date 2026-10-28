"use client";

import React from "react";
import { clampFinite } from "../utils/numbers.ts";
import { FilterFrame, type ContentFilterProps } from "./FilterFrame.tsx";

export interface ChromaticAberrationFilterProps extends ContentFilterProps {
  /** Color-channel separation in CSS pixels. */
  offset?: number;
  axis?: "horizontal" | "vertical";
}
const offsets = { subtle: 1, default: 3, intense: 6 };

/** Separate red and cyan channels without duplicating interactive content. */
export function ChromaticAberrationFilter({
  offset, axis = "horizontal", intensity = "default", trigger = "static", ...props
}: ChromaticAberrationFilterProps) {
  const amount = clampFinite(offset ?? offsets[intensity], 0, 24, offsets.default);
  return <FilterFrame {...props} trigger={trigger} renderFilter={frame => {
    const shift = amount * [1, -0.65, 0.4][frame];
    const dx = axis === "horizontal" ? shift : 0;
    const dy = axis === "vertical" ? shift : 0;
    return <>
      <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red" />
      <feOffset in="red" dx={dx} dy={dy} result="red-shift" />
      <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" result="cyan" />
      <feOffset in="cyan" dx={-dx} dy={-dy} result="cyan-shift" />
      <feBlend in="red-shift" in2="cyan-shift" mode="screen" />
    </>;
  }} />;
}
