"use client";

import React from "react";
import { FilterFrame, type ContentFilterProps } from "./FilterFrame.tsx";

export interface DuotoneFilterProps extends ContentFilterProps {
  /** Six-digit hex colors for the darkest and lightest luminance values. */
  shadowColor?: string;
  highlightColor?: string;
}
const strengths = { subtle: 0.35, default: 0.7, intense: 1 };
function channels(color: string, fallback: string) {
  const hex = /^#[\da-f]{6}$/i.test(color) ? color : fallback;
  return [1, 3, 5].map(index => parseInt(hex.slice(index, index + 2), 16) / 255);
}

/** Map luminance to a two-color palette while preserving source transparency. */
export function DuotoneFilter({
  shadowColor = "#222244", highlightColor = "#ffb87a",
  intensity = "default", trigger = "static", ...props
}: DuotoneFilterProps) {
  const shadows = channels(shadowColor, "#222244");
  const highlights = channels(highlightColor, "#ffb87a");
  return <FilterFrame {...props} trigger={trigger} renderFilter={frame => {
    const strength = strengths[intensity] * [1, 0.85, 0.7][frame];
    return <>
      <feColorMatrix in="SourceGraphic" type="saturate" values="0" result="luminance" />
      <feComponentTransfer in="luminance" result="duotone">
        <feFuncR type="table" tableValues={`${shadows[0]} ${highlights[0]}`} />
        <feFuncG type="table" tableValues={`${shadows[1]} ${highlights[1]}`} />
        <feFuncB type="table" tableValues={`${shadows[2]} ${highlights[2]}`} />
      </feComponentTransfer>
      <feComposite in="duotone" in2="SourceGraphic" operator="arithmetic"
        k1={0} k2={strength} k3={1 - strength} k4={0} />
    </>;
  }} />;
}
