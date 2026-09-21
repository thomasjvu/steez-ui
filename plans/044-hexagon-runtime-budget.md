# Plan 044: Bound HexagonGrid runtime work

> **Executor instructions**: Follow this plan step by step. Touch only the files listed in Scope. Preserve the existing visual defaults unless a new explicit quality prop is supplied.
>
> **Drift check**: `git diff --stat 12653cb..HEAD -- packages/ui/src/components/HexagonGrid.tsx packages/ui/src/components/HexagonGrid.module.css packages/ui/src/components/HexagonGrid.test.tsx`.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: MED
- **Depends on**: none
- **Category**: perf
- **Planned at**: commit `12653cb`, 2026-09-21

## Why this matters

HexagonGrid draws every cell on every animation frame, and its cell count scales with the container. Large atmospheric surfaces can therefore become expensive, especially when multiple instances are mounted. Auto-trigger timers also continue scheduling while paused.

## Current state

- `HexagonGrid.tsx:113-143` derives grid dimensions from container size without a cell budget.
- `HexagonGrid.tsx:181-199` schedules auto-trigger timeouts even when paused; `:404-420` pauses only the RAF loop.
- `HexagonGrid.tsx:251-326` performs canvas path work for every cell.

## Scope

**In scope**:

- `packages/ui/src/components/HexagonGrid.tsx`
- `packages/ui/src/components/HexagonGrid.test.tsx`
- `packages/ui/src/components/HexagonGrid.module.css` only if needed for quality attributes

**Out of scope**: changing defaults, replacing canvas, changing SignalTrailBackdrop, or adding a new rendering dependency.

## Steps

### Step 1: Add an explicit cell budget

Add an optional quality/cell-budget prop with a conservative default. Clamp calculated columns/rows so a large container cannot exceed the budget. Keep the existing defaults visually equivalent at normal desktop sizes.

**Verify**: add unit tests for small, normal, and oversized dimensions; assert the computed cell count stays within the budget.

### Step 2: Pause auto-trigger work with animation state

Make auto-trigger scheduling depend on paused, reduced-motion, document visibility, and viewport state. Re-arm the timer when the instance resumes and clear every pending timeout during cleanup.

**Verify**: fake-timer tests prove no timeout fires while paused and that one timer resumes after unpausing.

### Step 3: Run performance and package gates

**Verify**: `pnpm test -- --pool=threads --maxWorkers=1 packages/ui/src/components/HexagonGrid.test.tsx`, `pnpm typecheck`, and `pnpm build` → exit 0.

## Done criteria

- [ ] Cell work is bounded by an explicit documented budget.
- [ ] Paused/hidden/reduced-motion instances do not keep waking timers.
- [ ] Existing default rendering remains unchanged at representative sizes.
- [ ] Tests cover budget and timer lifecycle.

## STOP conditions

- The current animation API cannot expose a budget without changing its default behavior.
- Fake timers reveal an existing test harness limitation that would require global test changes.

## Maintenance notes

Any new canvas effect should define a work budget and pause policy before adding a continuous RAF loop.
