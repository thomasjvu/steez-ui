"use client"

import {
  BoilingLinesEffect,
  type BoilingLinesEffectProps,
} from "@/registry/boston/blocks/boiling-lines-effect/boiling-lines-effect"

export type BoilingLinesIntenseProps = BoilingLinesEffectProps

export function BoilingLinesIntense({
  speedMs = 80,
  baseFrequency = "0.02",
  numOctaves = 3,
  scale = 6,
  seeds = [7, 29, 53],
  ...props
}: BoilingLinesIntenseProps) {
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
