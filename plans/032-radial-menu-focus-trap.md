# Plan 032: RadialMenuOverlay focus trap

> Branch `advisor/032-radial-menu-focus-trap`. Commit, no push.

## Status
- Priority P2 · Effort M · Risk MED · Planned at `dcbc717`

## Why
Dialog without initial focus, trap, or restore.

## Requirements (open && !contained)
Store activeElement; focus close/first focusable; trap Tab; restore on close; keep Escape/backdrop/scroll lock.

## Tests as feasible in jsdom. registry:generate.
