# Plan 016: Faster typecheck without mandatory full package rebuild

> **Executor instructions**: Branch `advisor/016-typecheck-fast`. Commit, no push.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: dx
- **Planned at**: commit `7431be3`, 2026-07-29

## Why this matters

`"typecheck": "pnpm build:packages && tsc -p tsconfig.json --noEmit"` rebuilds
all packages every time — slow for local/CI iteration when only site files change.

## Current state

- `package.json` typecheck always runs build:packages
- Packages need dist for workspace type resolution sometimes
- Root tsconfig excludes `packages/*/dist` and `packages/react`

## Scope

**In scope**:
- Root `package.json` scripts only (and optional tiny tsconfig if needed)
- AGENTS.md one-line update if 011 already landed (or leave for 011)

**Out of scope**:
- Project references mega-migration unless simple

## Target design

```json
"typecheck:packages": "pnpm --filter @steez-ui/theme exec tsc -p tsconfig.json --noEmit && pnpm --filter @steez-ui/icons exec tsc -p tsconfig.json --noEmit && pnpm --filter @steez-ui/ui exec tsc -p tsconfig.json --noEmit",
"typecheck:site": "tsc -p tsconfig.json --noEmit",
"typecheck": "pnpm typecheck:packages && pnpm typecheck:site"
```

If package `--noEmit` fails because configs always emit to dist, use:

```json
"typecheck:packages": "pnpm build:packages",
"typecheck:site": "tsc -p tsconfig.json --noEmit",
"typecheck": "pnpm typecheck:packages && pnpm typecheck:site"
```

…but prefer true `--noEmit` when packages support it. Document that `build`
still full-emits.

Alternatively: if site tsc needs dist types, keep `typecheck` as rebuild+site
but add `typecheck:site` for fast path when dist is warm.

**Verify**: `pnpm typecheck` exit 0; site-only path works when dist exists

## Done criteria

- [ ] Split scripts exist
- [ ] `pnpm typecheck` still green
- [ ] Faster path available when packages already built (document in script names)

## STOP conditions

- Package noEmit impossible without large tsconfig change → keep build:packages
  for typecheck:packages and only split site; report
