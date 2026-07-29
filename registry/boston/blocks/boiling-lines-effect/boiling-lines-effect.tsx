"use client"

import * as React from "react"

export type BoilingLinesEffectProps = {
  src: string
  alt: string
  className?: string
  containerClassName?: string
  speedMs?: number
  baseFrequency?: string
  numOctaves?: number
  scale?: number
  seeds?: number[]
}

export function BoilingLinesEffect({
  src,
  alt,
  className,
  containerClassName,
  speedMs = 100,
  baseFrequency = "0.015",
  numOctaves = 2,
  scale = 4,
  seeds = [1, 25, 45],
}: BoilingLinesEffectProps) {
  const [frame, setFrame] = React.useState(0)
  const id = React.useId().replace(/:/g, "")

  const filterIds = React.useMemo(
    () => seeds.map((seed, index) => `boil-${id}-${seed}-${index}`),
    [id, seeds]
  )

  React.useEffect(() => {
    if (filterIds.length <= 1) return

    const timer = window.setInterval(() => {
      setFrame((current) => (current + 1) % filterIds.length)
    }, speedMs)

    return () => window.clearInterval(timer)
  }, [filterIds.length, speedMs])

  return (
    <div className={containerClassName}>
      <svg
        aria-hidden="true"
        focusable="false"
        style={{ position: "absolute", width: 0, height: 0 }}
      >
        <defs>
          {seeds.map((seed, index) => (
            <filter id={filterIds[index]} key={filterIds[index]}>
              <feTurbulence
                type="fractalNoise"
                baseFrequency={baseFrequency}
                numOctaves={numOctaves}
                result="warp"
                seed={seed}
              />
              <feDisplacementMap
                xChannelSelector="R"
                yChannelSelector="G"
                scale={scale}
                in="SourceGraphic"
                in2="warp"
              />
            </filter>
          ))}
        </defs>
      </svg>

      <img
        src={src}
        alt={alt}
        className={className}
        style={{ filter: `url(#${filterIds[frame]})` }}
      />
    </div>
  )
}
