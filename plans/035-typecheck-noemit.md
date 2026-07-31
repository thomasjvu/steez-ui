# Plan 035: Package typecheck without full rebuild

> Branch `advisor/035-typecheck-noemit`. Commit, no push.

## Status
- Priority P3 · Effort M · Risk MED · Planned at `dcbc717`

## Goal
typecheck:packages should not always run build:packages if possible.

## Approach
Try per-package tsc --noEmit; if ui needs icons dist, STOP and either dual tsconfig or document rebuild as intentional + optimize CI only.

## Update AGENTS.md. pnpm typecheck exit 0.
