/** Pure sizes, timings and paths for HeartbeatPulse. Units are viewBox units. */

export type HeartbeatVariant = "orb" | "line";

export const LINE_VIEWBOX = { width: 200, height: 100 } as const;
export const LINE_BASELINE_Y = 58.7;
/** One ECG beat across the 200x100 line viewBox. */
export const LINE_TRACE_POINTS =
  "2.4,58.7 70.8,58.7 76.1,46.2 81.1,58.7 89.9,58.7 93.8,66.5 102.8,22.7 110.6,78.7 115.3,58.7 126.4,58.7 134.4,54.7 142.4,58.7 197.8,58.7";

export const ORB_VIEWBOX = 100;

/** Seconds per beat: the line follows the interval within 1.9s-2.4s; the orb is fixed. */
export function beatSeconds(variant: HeartbeatVariant, intervalMinutes: number) {
  return variant === "line" ? Math.max(1.9, Math.min(2.4, intervalMinutes / 15)) : 1.2;
}

/** Rendered line size in px; explicit width/height win. */
export function lineSize(size: number, width?: number, height?: number) {
  return { width: width ?? Math.max(size * 3, 200), height: height ?? Math.max(size, 72) };
}

export interface OrbGeometry {
  center: number;
  /** Outer ring radius. */
  radius: number;
  /** Start radii of the two expanding ripples. */
  ripples: readonly [number, number];
  /** Core dot radius at rest and at the top of the beat. */
  core: number;
  corePeak: number;
  /** ECG spike drawn across the orb. */
  tracePath: string;
}

export function orbGeometry(size: number): OrbGeometry {
  const center = ORB_VIEWBOX / 2;
  const radius = size / 2 - 4;
  const trace: Array<[number, number]> = [
    [0, center],
    [center * 0.3, center],
    [center * 0.4, center],
    [center * 0.5, center * 0.2],
    [center * 0.6, center * 1.8],
    [center * 0.7, center],
    [ORB_VIEWBOX, center],
  ];
  return {
    center,
    radius,
    ripples: [radius * 0.8, radius * 0.5],
    core: radius * 0.25,
    corePeak: radius * 0.3,
    tracePath: trace.map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x} ${y}`).join(" "),
  };
}
