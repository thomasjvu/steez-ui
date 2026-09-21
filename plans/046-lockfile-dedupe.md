# Plan 046: Refresh duplicate transitive lockfile entries

> **Executor instructions**: Touch only `pnpm-lock.yaml`. Do not upgrade direct dependencies or modify source manifests.
>
> **Drift check**: `git diff --stat 12653cb..HEAD -- pnpm-lock.yaml`.

## Status

- **Priority**: P3
- **Effort**: S
- **Risk**: MED
- **Depends on**: 040
- **Category**: migration
- **Planned at**: commit `12653cb`, 2026-09-21

## Why this matters

`pnpm dedupe --check` reports duplicate snapshots for Babel, acorn, caniuse-lite, detect-libc, magic-string, picomatch, semver, tinyglobby, and related packages. This is install and lockfile weight, not a runtime correctness defect.

## Steps

Run `pnpm dedupe`, review the lockfile diff, and keep only changes caused by deduplication. Do not accept unrelated direct-version upgrades.

**Verify**: `pnpm dedupe --check`, `pnpm install --frozen-lockfile`, `pnpm typecheck`, `pnpm test`, `pnpm build`, and `pnpm test:registry-smoke` all pass.

## Done criteria

- [ ] `pnpm dedupe --check` exits 0.
- [ ] No package.json changes occur.
- [ ] All verification gates pass.

## STOP conditions

- Dedupe changes a direct dependency version or introduces a peer conflict.
- The lockfile diff contains unrelated upgrades.

## Maintenance notes

Run this only after direct dependency ownership changes land; otherwise the lockfile will be regenerated twice.
