# Plan 027: Characterization tests for forms + tabs

> Branch: `advisor/027-characterization-tests`. Commit, no push.

## Status
- Priority P2 · Effort M · Risk LOW · Depends on 024 preferred (tabs API stable) · Planned at `7475016`

## Why
Only Input has helper a11y tests; TabbedPanel untested after APG work.

## Scope IN
New/extended tests under `packages/ui/src/components/`:
- CyberpunkTextarea / CyberpunkSelect / CyberpunkRadioGroup: helper/describedby or radiogroup role
- TabbedPanel: click + keyboard if 024 landed
- SegmentedControl: selection
- Optional CopyButton clipboard mock success path

## Pattern
Match `CyberpunkInput.test.tsx` / `CyberpunkTile.test.tsx` (RTL + vitest).

## Done
- [ ] ≥4 new meaningful assertions beyond existing 32 tests
- [ ] `pnpm test` green
