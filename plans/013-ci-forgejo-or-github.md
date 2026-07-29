# Plan 013: Add CI for typecheck, test, lint, registry smoke

> **Executor instructions**: Branch `advisor/013-ci`. Commit, do not push.
>
> **Drift check**: Confirm no `.github/workflows` and no `.forgejo/workflows`.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: 012 recommended (so CI doesn’t fail on known packaging noise)
- **Category**: dx
- **Planned at**: commit `7431be3`, 2026-07-29

## Why this matters

Verification scripts exist but only run when a human remembers. Design-system
regressions ship silently.

## Current state

- No CI config in repo
- Scripts: `pnpm typecheck`, `pnpm test`, `pnpm lint`, `pnpm test:registry-smoke`,
  `pnpm build:packages`
- Remote is Forgejo (`forgejo.thomasjvu.com/steez-ui/steez-ui`) — prefer
  **Forgejo Actions** if supported, else GitHub Actions workflow file that also
  works when mirrored. Use `.forgejo/workflows/ci.yml` AND/OR `.github/workflows/ci.yml`.
  If only one: use `.github/workflows/ci.yml` (widely recognized) with note in AGENTS.

## Scope

**In scope**:
- `.github/workflows/ci.yml` and/or `.forgejo/workflows/ci.yml`
- Optional one line in AGENTS.md that CI runs these scripts

**Out of scope**:
- Deploy pipelines
- Publishing packages from CI

## Steps

### Step 1: Workflow

On push/PR to `main`:

```yaml
# outline — use current pnpm major from packageManager or lockfile
- checkout
- setup node 22 (or 20)
- setup pnpm
- pnpm install --frozen-lockfile
- pnpm typecheck
- pnpm test
- pnpm lint   # allow continue-on-error only if pre-existing lint fails; prefer fix or leave fail
- pnpm test:registry-smoke
```

If `pnpm lint` fails on pre-existing issues after one fix attempt, document in
NOTES and keep lint non-blocking with a TODO comment — prefer fail-closed.

**Verify**: YAML is valid; scripts referenced exist in package.json

## Done criteria

- [ ] Workflow file committed
- [ ] Steps match real package.json scripts
- [ ] No secrets hardcoded

## STOP conditions

- Lint is massively broken (>20 errors) → make lint a separate optional job and report
