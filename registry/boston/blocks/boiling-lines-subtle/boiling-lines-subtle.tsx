"use client"

import {
  BoilingLinesEffect,
  type BoilingLinesEffectProps,
} from "@/registry/boston/blocks/boiling-lines-effect/boiling-lines-effect"

export type BoilingLinesSubtleProps = BoilingLinesEffectProps

export function BoilingLinesSubtle({
  speedMs = 120,
  baseFrequency = "0.01",
  numOctaves = 1,
  scale = 2,
  seeds = [3, 11, 19],
  ...props
}: BoilingLinesSubtleProps) {
  return (
    <BoilingLinesEffect
      speedMs={speedMs}
      baseFrequency={baseFrequency}
      numOctaves={numOctaves}
      scale={scale}
      seeds={seeds}
      {...props}
    />
  )
}
