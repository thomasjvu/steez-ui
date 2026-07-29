# Plan 007: Clear LoadingScreen chained cross-spawn timeouts

> **Executor instructions**: Fix only the timeout leak pattern. Match existing
> style in the component.
>
> **Drift check**: Open `packages/ui/src/components/LoadingScreen.tsx` around
> the `scheduleNextCross` effect (~lines 138–156) and confirm only the first
> `timeoutId` is cleared.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: bug
- **Planned at**: commit `no-git`, 2026-07-29

## Why this matters

`LoadingScreen` schedules a chain of `setTimeout` calls for decorative crosses.
Cleanup only `clearTimeout`s the first handle. After unmount, a nested timeout
can still fire `spawnCross` → `setCrosses`, causing React warnings and wasted work.

## Current state

```tsx
// packages/ui/src/components/LoadingScreen.tsx ~138-156
React.useEffect(() => {
  isLoadingRef.current = true;

  const scheduleNextCross = () => {
    const delay = 400 + randomFloat() * 300;
    return setTimeout(() => {
      spawnCross();
      if (isLoadingRef.current) {
        scheduleNextCross();
      }
    }, delay);
  };

  const timeoutId = scheduleNextCross();
  return () => {
    clearTimeout(timeoutId);
    isLoadingRef.current = false;
  };
}, [spawnCross]);
```

Problem: each recursive `scheduleNextCross()` creates a new timeout id that is
never stored/cleared; only the first id is cleared.

## Scope

**In scope**:
- `packages/ui/src/components/LoadingScreen.tsx`
- Optional: unit test if vitest from 001 exists
- If plan 002 regenerated registry embeds this file, regenerate or leave to 002
  (do not hand-edit huge JSON unless you already have `registry:generate`)

**Out of scope**:
- Visual redesign of LoadingScreen
- Audio context logic in the same file (unless cleanup bug is identical and trivial)

## Git workflow

- Branch: `advisor/007-loadingscreen-timeout-cleanup`

## Steps

### Step 1: Track latest timeout id in a ref

Pattern:

```tsx
React.useEffect(() => {
  isLoadingRef.current = true;
  let cancelled = false;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const scheduleNextCross = () => {
    const delay = 400 + randomFloat() * 300;
    timeoutId = setTimeout(() => {
      if (cancelled) return;
      spawnCross();
      if (isLoadingRef.current && !cancelled) {
        scheduleNextCross();
      }
    }, delay);
  };

  scheduleNextCross();
  return () => {
    cancelled = true;
    isLoadingRef.current = false;
    if (timeoutId !== undefined) clearTimeout(timeoutId);
  };
}, [spawnCross]);
```

Preserve existing behavior while mounted.

**Verify**: `pnpm --filter @steez-ui/ui build` → exit 0

### Step 2: Test (if vitest available)

Fake timers: mount LoadingScreen (or extract schedule logic), advance timers,
unmount, advance again, assert no throw / no state update warning if testable.
If component is too heavy to mount, skip test rather than over-mock — NOTES.

## Done criteria

- [ ] Cleanup clears the active chained timeout
- [ ] Cancel flag prevents spawn after unmount
- [ ] Package build succeeds
- [ ] No unrelated LoadingScreen behavior changes

## STOP conditions

- Component structure differs substantially → adapt the same pattern, do not rewrite file
- `spawnCross` identity changes every render causing effect thrash → report (pre-existing)

## Maintenance notes

- Same pattern may exist elsewhere; only fix LoadingScreen in this plan.
