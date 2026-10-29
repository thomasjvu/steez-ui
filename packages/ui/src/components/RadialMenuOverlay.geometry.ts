/** Pure wheel and joystick geometry for RadialMenuOverlay. */

const FULL_CIRCLE_DEGREES = 360;
/** Stick travel radius as a share of the wheel's shorter side. */
const JOYSTICK_MAX_RADIUS_RATIO = 0.28;
/** Share of the travel radius past which the stick picks a node. */
export const JOYSTICK_ACTIVATION_RATIO = 0.34;
/** Share of the travel radius past which releasing the stick opens the node. */
export const JOYSTICK_COMMIT_RATIO = 0.78;

export interface WheelRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface StickReading {
  /** Offset of the knob from the wheel centre, clamped to the travel radius. */
  x: number;
  y: number;
  /** Pointer distance as a share of the travel radius (unclamped). */
  progress: number;
}

/** Angle in degrees of node `index`: 12 o'clock first, then clockwise. */
export function nodeAngle(index: number, count: number): number {
  return -90 + (FULL_CIRCLE_DEGREES / Math.max(count, 1)) * index;
}

/** Shortest distance between two angles, from 0 to 180 degrees. */
function angleDistance(a: number, b: number): number {
  return Math.abs(
    ((((a - b) % FULL_CIRCLE_DEGREES) + 540) % FULL_CIRCLE_DEGREES) - 180,
  );
}

/** Index of the node nearest `angle` (ties go to the earlier node), or -1. */
export function closestNodeIndex(angle: number, count: number): number {
  let closest = -1;
  let closestDistance = Number.POSITIVE_INFINITY;
  for (let index = 0; index < count; index += 1) {
    const distance = angleDistance(angle, nodeAngle(index, count));
    if (distance < closestDistance) {
      closest = index;
      closestDistance = distance;
    }
  }
  return closest;
}

/** Reads the joystick for a pointer at (clientX, clientY) over the wheel. */
export function readStick(rect: WheelRect, clientX: number, clientY: number): StickReading {
  const deltaX = clientX - (rect.left + rect.width / 2);
  const deltaY = clientY - (rect.top + rect.height / 2);
  const distance = Math.hypot(deltaX, deltaY);
  const maxDistance = Math.min(rect.width, rect.height) * JOYSTICK_MAX_RADIUS_RATIO;
  const clampRatio = distance > maxDistance && distance > 0 ? maxDistance / distance : 1;
  return {
    x: deltaX * clampRatio,
    y: deltaY * clampRatio,
    progress: maxDistance > 0 ? distance / maxDistance : 0,
  };
}

/** Angle of a stick offset in degrees, matching nodeAngle. */
export function stickAngleDegrees(x: number, y: number): number {
  return (Math.atan2(y, x) * 180) / Math.PI;
}

/** "3" → "03", for node markers and the n / total counter. */
export function padOrdinal(value: number): string {
  return String(value).padStart(2, "0");
}
