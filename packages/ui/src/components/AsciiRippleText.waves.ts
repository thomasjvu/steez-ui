/** Pure ripple math for AsciiRippleText: no DOM, no clock. Times are ms. */

/** Rings this close to their edge scramble; inner characters settle back. */
const WAVE_THRESHOLD = 3;
const CHARACTER_MULTIPLIER = 3;
/** A scrambled character changes glyph every step. */
const ANIMATION_STEP_MS = 40;
/** Extra reach so the ring clears the far end before it fades. */
const WAVE_BUFFER = 5;
export const MAX_ACTIVE_WAVES = 8;
export const DEFAULT_CHARACTER_SET =
  ".,·-─~+:;=*π\"\"┐┌┘┴┬╗╔╝╚╬╠╣╩╦║░▒▓█▄▀▌▐■!?&#$@0123456789*";
const DEFAULT_DURATION_MS = 900;

export interface Wave {
  startPos: number;
  startTime: number;
}

export interface RippleOptions {
  durationMs: number;
  characterSet: string;
  spread: number;
  preserveSpaces: boolean;
}

/** Falls back from an empty glyph set and a non-finite or sub-1ms duration. */
export function safeRippleOptions(options: RippleOptions): RippleOptions {
  return {
    ...options,
    characterSet: options.characterSet.length > 0 ? options.characterSet : DEFAULT_CHARACTER_SET,
    durationMs: Number.isFinite(options.durationMs) ? Math.max(options.durationMs, 1) : DEFAULT_DURATION_MS,
  };
}

/** Character index under a pointer, clamped to the text. */
export function pointerIndex(clientX: number, bounds: { left: number; width: number }, length: number) {
  const position = Math.round(((clientX - bounds.left) / Math.max(bounds.width, 1)) * length);
  return Math.max(0, Math.min(position, Math.max(length - 1, 0)));
}

/** Middle character, where keyboard focus starts a ripple. */
export const focusIndex = (length: number) => Math.max(0, Math.floor(length / 2));

/** Adds a wave, keeping at most MAX_ACTIVE_WAVES (oldest dropped). */
export function addWave(waves: readonly Wave[], startPos: number, now: number): Wave[] {
  return [...waves.slice(-(MAX_ACTIVE_WAVES - 1)), { startPos, startTime: now }];
}

/** Waves still inside their duration. */
export function liveWaves(waves: readonly Wave[], now: number, durationMs: number): Wave[] {
  return waves.filter((wave) => now - wave.startTime < durationMs);
}

function rippleCharacter(chars: readonly string[], index: number, waves: readonly Wave[], now: number, options: RippleOptions) {
  const { durationMs, characterSet, spread } = options;
  let character = chars[index]!;
  for (const wave of waves) {
    const age = now - wave.startTime;
    const progress = Math.min(age / durationMs, 1);
    const distance = Math.abs(index - wave.startPos);
    const maxDistance = Math.max(wave.startPos, chars.length - wave.startPos - 1);
    const radius = (progress * (maxDistance + WAVE_BUFFER)) / Math.max(spread, 0.001);
    const intensity = radius - distance;
    if (intensity > 0 && intensity <= WAVE_THRESHOLD) {
      const glyph = (distance * CHARACTER_MULTIPLIER + Math.floor(age / ANIMATION_STEP_MS)) % characterSet.length;
      character = characterSet[glyph] ?? character;
    }
  }
  return character;
}

/** The text as it looks at `now` under every live wave. Expects safe options. */
export function rippleFrame(text: string, waves: readonly Wave[], now: number, options: RippleOptions) {
  const chars = text.split("");
  return chars
    .map((character, index) =>
      options.preserveSpaces && character === " " ? " " : rippleCharacter(chars, index, waves, now, options),
    )
    .join("");
}
