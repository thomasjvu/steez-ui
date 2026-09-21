# Plan 045: Isolate the deprecated React package behind a retirement gate

> **Executor instructions**: This plan is intentionally conservative. Preserve existing `@steez-ui/react` publication and consumer behavior. If external consumer evidence is unavailable, implement only the isolation documentation/checks and stop before deleting or moving the package.
>
> **Drift check**: `git diff --stat 12653cb..HEAD -- pnpm-workspace.yaml package.json packages/react AGENTS.md README.md plans/README.md`.

## Status

- **Priority**: P2
- **Effort**: L
- **Risk**: HIGH
- **Depends on**: 040
- **Category**: migration
- **Planned at**: commit `12653cb`, 2026-09-21

## Why this matters

`@steez-ui/react` is explicitly deprecated, but it remains a workspace package with build, pack, and publish scripts. The canonical root gates exclude it while root installs and lockfile maintenance still carry its toolchain. The package cannot be deleted until existing Forgejo/npm consumers have a migration window.

## Current state

- `pnpm-workspace.yaml:1-2` includes every `packages/*` directory.
- `packages/react/package.json:2-7,35-56` retains a publishable package and its own runtime/build dependencies.
- `package.json:10-14` exposes legacy build and publish scripts.
- `AGENTS.md:37-41,139-147` explicitly says the package is deprecated but must not be deleted without a plan.

## Scope

**In scope**:

- `pnpm-workspace.yaml`
- root `package.json`
- `packages/react/package.json`
- `packages/react/README.md`
- `AGENTS.md`
- `README.md`
- `plans/README.md`

**Out of scope**: deleting `packages/react`, changing its component API, revoking publication, or changing the canonical packages.

## Steps

### Step 1: Document the retirement gate

Record the exact evidence required before isolation or deletion: published package versions, known consuming repositories, migration status, and a deprecation deadline. Add a concise migration table from legacy exports to canonical equivalents where an equivalent exists.

**Verify**: docs clearly distinguish “deprecated but supported” from “safe to remove”; no source package behavior changes.

### Step 2: Add an opt-in legacy verification command

Keep the package available, but make its build/typecheck/pack commands explicit and separate from canonical root gates. If workspace exclusion is attempted, first prove `pnpm --dir packages/react typecheck`, `build`, and `pack:local` work from a clean install with its own dependency resolution.

**Verify**: canonical `pnpm install`, `pnpm typecheck`, and `pnpm build` do not require legacy source; legacy commands still pass when explicitly run.

### Step 3: Stop before deletion without consumer evidence

If no external consumer inventory is available, leave the package and mark the plan BLOCKED with that reason. Do not invent a migration deadline or delete the package.

## Done criteria

- [ ] Retirement evidence and migration mapping are documented.
- [ ] Canonical gates remain independent of legacy source.
- [ ] Legacy package commands remain reproducible when explicitly invoked.
- [ ] Deletion is not performed without external consumer evidence.

## STOP conditions

- Any existing consumer or published package requires the current package path.
- Isolating the workspace would require deleting the root lockfile entries before a replacement lockfile exists.
- No external consumer inventory can be obtained.

## Maintenance notes

Revisit this gate before every legacy package release. Once the evidence threshold is met, write a separate deletion plan rather than expanding this one.
