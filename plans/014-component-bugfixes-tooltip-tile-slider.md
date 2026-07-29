# Plan 014: Fix PixelTooltip, CyberpunkTile keyboard, CyberpunkSlider NaN

> **Executor instructions**: Branch `advisor/014-component-bugfixes`. Commit.
> Do not push. Add tests where easy. Match existing component style.

## Status

- **Priority**: P1
- **Effort**: S–M
- **Risk**: LOW
- **Depends on**: none (012 nice for clean dist)
- **Category**: bug
- **Planned at**: commit `7431be3`, 2026-07-29

## Why this matters

Three high-confidence component bugs: broken tooltip placement API, keyboard
inaccessible interactive tiles (Phantasy-facing), slider NaN on zero-width range.

## Current state

### PixelTooltip (`packages/ui/src/components/PixelTooltip.tsx`)

- Always sets coords from `rect.bottom` / `rect.left` regardless of `position`
- CSS classes `.top`/`.left`/`.right` use transform; `.show` animation ends at
  `transform: translateY(0) scale(1)` wiping placement

### CyberpunkTile

```tsx
role={onClick ? "button" : undefined}
tabIndex={onClick ? 0 : undefined}
// no onKeyDown for Enter/Space
```

### CyberpunkSlider

```tsx
const percentage = ((Number(value) - min) / (max - min)) * 100;
// NaN/Infinity when max === min
```

## Scope

**In scope**:
- `packages/ui/src/components/PixelTooltip.tsx` + `.module.css` as needed
- `packages/ui/src/components/CyberpunkTile.tsx`
- `packages/ui/src/components/CyberpunkSlider.tsx`
- Optional unit tests for slider percentage helper / tile keydown
- Regenerate r-steez for these three only if you run full `registry:generate`
  (preferred once at end)

**Out of scope**:
- Full tooltip mobile redesign beyond focus support if timeboxed — at least
  fix position math; focus show is nice-to-have in same PR if small

## Steps

### Step 1: CyberpunkSlider

```ts
const range = max - min;
const percentage = range === 0 ? 0 : ((Number(value) - min) / range) * 100;
const safePercentage = Number.isFinite(percentage)
  ? Math.min(100, Math.max(0, percentage))
  : 0;
```

**Verify**: unit test or manual assert max===min → 0%

### Step 2: CyberpunkTile keyboard

When `onClick` present, add `onKeyDown` that on Enter or Space prevents default
and calls `onClick` with a synthetic event or invokes the same handler. Preserve
existing props spread order (user `onKeyDown` should still compose if provided —
call user handler first or merge carefully).

**Verify**: small RTL test with user-event keyboard, or at least build passes

### Step 3: PixelTooltip position

Compute left/top from getBoundingClientRect based on `position`:

- bottom (default catalog sometimes top): document intended default `position = "top"`
- top: above trigger
- left/right: beside trigger
- center horizontally when top/bottom using width

Prefer opacity-only animation for `.show` so CSS transform placement can work,
OR apply placement entirely via inline style without relying on transform classes.

**Verify**: code paths use `position` prop; build packages

### Step 4: registry:generate (optional but preferred)

So published registry JSON matches source.

## Done criteria

- [ ] Slider never sets NaN percentage
- [ ] Interactive tile activates on Enter/Space
- [ ] Tooltip position prop affects coordinates
- [ ] `pnpm --filter @steez-ui/ui build` exit 0
- [ ] `pnpm test` exit 0

## STOP conditions

- Tooltip CSS rewrite spirals → fix coordinate math only and drop broken transform
  classes from placement role; report animation simplification
