# Plan 018: Align eslint-config-next; stop barrel-exporting SignalTrailBackdrop

> **Executor instructions**: Branch `advisor/018-eslint-and-signal-trail`. Commit.

## Status

- **Priority**: P3
- **Effort**: S–M
- **Risk**: MED for barrel removal (consumers of named import)
- **Depends on**: none
- **Category**: deps | perf
- **Planned at**: commit `7431be3`, 2026-07-29

## Why this matters

1. `eslint-config-next@15.3.1` lags `next@15.5.9`.
2. Optional peer `three` is incomplete while main barrel still re-exports
   `SignalTrailBackdrop` (static `import * as THREE`).

## Current state

- package.json next 15.5.9 / eslint-config-next 15.3.1
- `packages/ui/src/index.ts` re-exports SignalTrailBackdrop
- Subpath `@steez-ui/ui/signal-trail-backdrop` exists
- Catalog may already document subpath — keep that as the only path

## Scope

**In scope**:
- Root package.json eslint-config-next bump + lockfile
- Fix new lint errors if few
- Remove SignalTrailBackdrop from barrel `index.ts`
- Update catalog packageImport / preview import to subpath
- Docs that mentioned barrel import

**Out of scope**:
- Per-component export map for all components
- HexagonGrid split (unless trivial)

## Steps

### Step 1: Bump eslint-config-next to 15.5.x

`pnpm add -D eslint-config-next@15.5.9` (match next patch if available)

`pnpm lint` — fix trivial issues; STOP if huge

### Step 2: Remove barrel export

Delete export block for SignalTrailBackdrop from `packages/ui/src/index.ts`.
Keep subpath export in package.json.

Update:
- `components/docs/previews/signal-trail-backdrop-preview.tsx`
- catalog `packageImport` for signal-trail-backdrop
- any other barrel imports of SignalTrailBackdrop in this repo

**Verify**: `rg -n 'SignalTrailBackdrop' packages/ui/src/index.ts` → no matches;
`pnpm build:packages`; `pnpm test`

## Done criteria

- [ ] eslint-config-next aligned to 15.5.x
- [ ] SignalTrail only via subpath
- [ ] Build/test green

## STOP conditions

- Lint explosion → revert eslint bump, still do barrel change if separate commits
- External consumers documented in-repo requiring barrel export → keep re-export
  but add `/* webpackMode */` comment only; report
