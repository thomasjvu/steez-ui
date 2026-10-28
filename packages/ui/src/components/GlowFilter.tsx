"use client";

import React from "react";
import { clampFinite } from "../utils/numbers.ts";
import { FilterFrame, type ContentFilterProps } from "./FilterFrame.tsx";

export interface GlowFilterProps extends ContentFilterProps {
  /** Halo blur radius in CSS pixels. */
  radius?: number;
  color?: string;
  opacity?: number;
}
const radii = { subtle: 2, default: 5, intense: 10 };

/** Colored halo derived from the content's alpha, with a crisp source layer. */
export function GlowFilter({
  radius, color = "currentColor", opacity = 0.65,
  intensity = "default", trigger = "static", ...props
}: GlowFilterProps) {
  const blur = clampFinite(radius ?? radii[intensity], 0, 24, radii.default);
  const strength = clampFinite(opacity, 0, 1, 0.65);
  return <FilterFrame {...props} trigger={trigger} renderFilter={frame => <>
    <feGaussianBlur in="SourceAlpha" stdDeviation={blur * [1, 0.7, 1.2][frame]} result="blur" />
    <feFlood floodColor={color} floodOpacity={strength} result="color" />
    <feComposite in="color" in2="blur" operator="in" result="halo" />
    <feMerge><feMergeNode in="halo" /><feMergeNode in="SourceGraphic" /></feMerge>
  </>} />;
}
