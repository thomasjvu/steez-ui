# Plan 029: Merge consumer + helper aria-describedby

> Branch `advisor/029-merge-aria-describedby`. Commit, no push.

## Status
- Priority P1 · Effort S · Risk LOW · Planned at `dcbc717`

## Why
Cyberpunk form controls set `aria-describedby` after `{...props}`, wiping consumer error ids.

## Pattern
Pull `aria-describedby` from props; join with helperId when helperText set; omit attribute if empty.

## Files
CyberpunkInput, Textarea, Select, Slider + tests; registry:generate.

## Tests
helper only; consumer only; both; neither.
