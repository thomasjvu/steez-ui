# Plan 009: Document dual package surfaces and add AGENTS.md

> **Executor instructions**: Docs-only. Do not delete packages/react or change
> publish scripts beyond documentation pointers.
>
> **Drift check**: Confirm README still marks `packages/react` as legacy and
> `packages/ui` as canonical; `packages/react/README.md` still presents as
> primary install path without deprecation banner.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: docs | tech-debt
- **Planned at**: commit `no-git`, 2026-07-29

## Why this matters

Two packages share the Steez brand with different styling systems (CSS modules
`@steez-ui/ui` vs Tailwind/CVA `@steez-ui/react`). The legacy package has the
best README and active Forgejo publish scripts, so newcomers get steered wrong.
Agent executors also lack an AGENTS.md for monorepo conventions.

## Current state

- Root README: theme/icons/ui canonical; `packages/react` “legacy portable”
- `packages/react/README.md`: full install guide without deprecation
- Root `tsconfig.json` excludes `packages/react`
- Nested `packages/react/pnpm-lock.yaml` exists
- No root `AGENTS.md` / `CLAUDE.md`

## Scope

**In scope**:
- Root `README.md` (clarify package decision table)
- `packages/react/README.md` (deprecation banner + pointer to ui)
- New root `AGENTS.md` (build order, registry generate, verification commands)
- Optional short `packages/ui/README.md` if still missing (install + import sample)

**Out of scope**:
- Deleting `packages/react` or its publish scripts
- Merging APIs
- Removing nested lockfile (mention as known debt in AGENTS only)

## Git workflow

- Branch: `advisor/009-document-package-surfaces`

## Steps

### Step 1: Deprecation banner on packages/react/README.md

Add a clear top banner:

- Status: **legacy / maintenance mode**
- New apps should use `@steez-ui/theme` + `@steez-ui/icons` + `@steez-ui/ui`
- Link to root README
- Note Tailwind/CVA vs CSS modules difference

Do not delete the rest of the guide (existing consumers).

**Verify**: first 30 lines of README contain “legacy” or “deprecated”

### Step 2: Root README package table clarity

Ensure the packages table states which to install for Phantasy/new apps and that
`@steez-ui/react` is legacy.

**Verify**: `rg -n "legacy" README.md` → match

### Step 3: AGENTS.md

Create root `AGENTS.md` with:

- Workspace layout (`packages/theme|icons|ui`, docs in `app/`)
- Commands: `pnpm install`, `pnpm build:packages`, `pnpm dev`, `pnpm typecheck`,
  `pnpm test`, `pnpm registry:generate` (note if plan 002 not merged yet)
- Canonical package vs legacy react
- Registry: `/r-steez` package primitives vs `/r` Boston demos
- Do not commit secrets; publish via scripts with env tokens only (names only)

**Verify**: `test -f AGENTS.md`

### Step 4 (optional): packages/ui/README.md

Short install + import snippet matching root README.

## Done criteria

- [ ] Legacy banner on packages/react README
- [ ] AGENTS.md exists with verification commands
- [ ] Root README does not present react as equal peer to ui for new work

## STOP conditions

- None expected; if react is actually still primary for Phantasy, STOP and report
  evidence from repo (do not invent deprecation)

## Maintenance notes

- Full react sunset is a separate product decision (not this plan).
