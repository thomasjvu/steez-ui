# Plan 008: Pause WebGL loops when hidden or reduced-motion

> **Executor instructions**: Keep visual defaults reasonable; add pause/reduce
> gates without removing the effects.
>
> **Drift check**: Confirm `SignalTrailBackdrop.tsx` and `HexagonGrid.tsx` still
> run perpetual `requestAnimationFrame` without `document.hidden` or
> `prefers-reduced-motion` checks.

## Status

- **Priority**: P2
- **Effort**: S–M
- **Risk**: LOW
- **Depends on**: none
- **Category**: perf
- **Planned at**: commit `no-git`, 2026-07-29

## Why this matters

Decorative WebGL/canvas backgrounds keep GPU busy when the tab is hidden or the
user prefers reduced motion. Defaults for SignalTrailBackdrop are heavy
(`linesCount=110`, `segments=800`).

## Current state

- `packages/ui/src/components/SignalTrailBackdrop.tsx`: Three.js scene, RAF loop
  in `useEffect`, defaults linesCount=110, segments=800; cleanup disposes
  geometry/material/renderer (good).
- `packages/ui/src/components/HexagonGrid.tsx`: canvas RAF loop (~line 368 area).
- Some CSS already has `@media (prefers-reduced-motion: reduce)` (e.g. MarqueeStrip)
  — match that product concern in JS loops.

## Scope

**In scope**:
- `packages/ui/src/components/SignalTrailBackdrop.tsx`
- `packages/ui/src/components/HexagonGrid.tsx`
- Optional mild default reduction (e.g. segments 800 → 400) **only if** visual
  remains acceptable; prefer pause gates over silent quality drops if unsure

**Out of scope**:
- Other animated components without canvas/WebGL
- three peerDependency split (plan 004)

## Git workflow

- Branch: `advisor/008-webgl-visibility-reduced-motion`

## Steps

### Step 1: SignalTrailBackdrop

Inside the animation effect:

1. If `window.matchMedia("(prefers-reduced-motion: reduce)").matches`, either:
   - skip starting RAF and render a single static frame once, or
   - exit early leaving empty aria-hidden root (prefer one static frame if cheap).
2. Listen to `visibilitychange`; when `document.hidden`, cancel RAF; when
   visible again, resume if reduced-motion is not set.
3. Optional: `IntersectionObserver` with `threshold: 0` to pause when offscreen —
   nice-to-have; include if straightforward.
4. Keep existing dispose cleanup.

**Verify**: `pnpm --filter @steez-ui/ui build` → exit 0

### Step 2: HexagonGrid

Apply the same visibility + reduced-motion pause pattern to its RAF loop.
Read the component carefully — do not break pointer interaction if any.

**Verify**: build again → exit 0

## Test plan

- Optional: unit-test pure helper `shouldAnimate()` if you extract one.
- Manual NOTES sufficient if timers/media hard to test under jsdom.

## Done criteria

- [ ] Both components pause RAF when `document.hidden`
- [ ] Both respect `prefers-reduced-motion: reduce` (no continuous animation)
- [ ] Cleanup still disposes resources
- [ ] Package build passes

## STOP conditions

- HexagonGrid animation is required for correctness of a non-decorative feature →
  still pause when hidden; only skip reduced-motion freeze if product-critical
  (document in NOTES)
- File too divergent → report

## Maintenance notes

- Future canvas effects should use a shared `useAnimationFrame` helper (deferred).
