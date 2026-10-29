import React from "react";

export interface Cross {
  id: number;
  x: number;
  rotation: number;
  scale: number;
  groundOffset: number;
  opacity: number;
}

/** Crosses kept on screen; older ones are dropped as new ones fall. */
export const MAX_CROSSES = 18;
const MIN_SURFACE_WIDTH = 160;

/** A cross with a random column, tilt, size, landing depth and opacity. */
export function makeCross(id: number, surfaceWidth: number, random: () => number): Cross {
  const width = Math.max(surfaceWidth, MIN_SURFACE_WIDTH);
  return {
    id,
    rotation: (random() - 0.5) * 6,
    x: random() * Math.max(width - 120, 24),
    scale: 0.4 + random() * 0.4,
    groundOffset: random() * 30,
    opacity: 0.4 + random() * 0.3,
  };
}

export function pushCross(crosses: readonly Cross[], next: Cross): Cross[] {
  return [...crosses.slice(-(MAX_CROSSES - 1)), next];
}

/** Drops a new cross every 400–700ms across a surface `width` pixels wide. */
export function useFallingCrosses(width: number): Cross[] {
  const [crosses, setCrosses] = React.useState<Cross[]>([]);
  const nextIdRef = React.useRef(0);

  React.useEffect(() => {
    if (typeof window === "undefined") return undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const scheduleNextCross = () => {
      timeoutId = setTimeout(() => {
        nextIdRef.current += 1;
        const cross = makeCross(nextIdRef.current, width, Math.random);
        setCrosses((current) => pushCross(current, cross));
        scheduleNextCross();
      }, 400 + Math.random() * 300);
    };

    scheduleNextCross();
    return () => clearTimeout(timeoutId);
  }, [width]);

  return crosses;
}
