# Plan 001: Establish a one-command verification baseline

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: There was no git history when this plan was
> written (`Planned at: no-git`). Confirm `package.json` still has no `test`
> or `typecheck` scripts and that no project `*.test.*` files exist under
> `app/`, `packages/`, `lib/`, `scripts/`, or `components/`.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: LOW
- **Depends on**: none
- **Category**: tests | dx
- **Planned at**: commit `no-git`, 2026-07-29

## Why this matters

Steez UI publishes `@steez-ui/theme`, `@steez-ui/icons`, and `@steez-ui/ui` for
Phantasy admin and ships a shadcn-style registry. There is no `pnpm test`, no
root `typecheck`, and no project tests. Regressions only appear when a consumer
builds. A minimal typecheck + unit-test baseline unblocks every later plan.

## Current state

- `package.json` scripts (only these package-related ones):
  - `build`, `build:packages`, `build:react`, `pack:react`, `publish:react:forgejo`, `start`, `lint`, `registry:build`
  - **No** `test`, **no** `typecheck`
- Root `tsconfig.json` includes Next app; excludes `packages/react` and `packages/*/dist`
- Packages build with `tsc -p ./tsconfig.json` under each package
- Zero project test files (ignore `node_modules`)
- Package manager: **pnpm** (workspace in `pnpm-workspace.yaml`)
- Conventions: TypeScript strict, ESM packages (`"type": "module"`), React 19

## Commands you will need

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Install | `pnpm install` | exit 0 |
| Typecheck (after this plan) | `pnpm typecheck` | exit 0 |
| Tests (after this plan) | `pnpm test` | exit 0 |
| Package build | `pnpm build:packages` | exit 0 |
| Lint | `pnpm lint` | exit 0 (warnings OK if pre-existing) |

## Scope

**In scope**:
- Root `package.json` (scripts + test devDependencies only)
- New test config (e.g. `vitest.config.ts` at repo root)
- New tests under `packages/ui/src/**/*.test.ts(x)` and/or `lib/**/*.test.ts`
- Optional: `packages/ui/package.json` test script if needed for filter clarity
- `plans/README.md` status row only if instructed

**Out of scope**:
- CI GitHub Actions (nice-to-have; skip unless trivial single workflow — prefer root scripts only)
- Testing `packages/react` (legacy; excluded from root tsconfig)
- Visual/E2E browser tests
- Changing component runtime behavior
- Registry JSON regeneration (plan 002)

## Git workflow

- Branch: `advisor/001-verification-baseline`
- Commit messages: short imperative, e.g. `Add typecheck and vitest baseline`
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Add root `typecheck` script

Add a root script that typechecks the packages that matter for consumers and the
docs app. Recommended approach (pick one that works with existing tsconfigs):

```json
"typecheck": "pnpm --filter @steez-ui/theme exec tsc -p tsconfig.json --noEmit && pnpm --filter @steez-ui/icons exec tsc -p tsconfig.json --noEmit && pnpm --filter @steez-ui/ui exec tsc -p tsconfig.json --noEmit && tsc -p tsconfig.json --noEmit"
```

If package `tsconfig.json` files only emit (no noEmit support cleanly), use:

```bash
pnpm --filter @steez-ui/theme build && pnpm --filter @steez-ui/icons build && pnpm --filter @steez-ui/ui build && tsc -p tsconfig.json --noEmit
```

as `typecheck` — but prefer pure `--noEmit` when possible.

**Verify**: `pnpm typecheck` → exit 0

If typecheck fails on pre-existing errors, **STOP and report** the error list
(do not "fix" unrelated type errors by weakening `strict`).

### Step 2: Add Vitest + React Testing Library

Add devDependencies at the **workspace root** (versions compatible with Vite 6 /
Vitest 3 if available; otherwise Vitest 2):

- `vitest`
- `jsdom`
- `@testing-library/react`
- `@testing-library/jest-dom`
- `@testing-library/user-event`
- `@vitejs/plugin-react` (if needed for TSX)

Create `vitest.config.ts` that:

- Uses `environment: 'jsdom'`
- Includes `packages/ui/src/**/*.{test,spec}.{ts,tsx}` and `lib/**/*.{test,spec}.{ts,tsx}`
- Resolves CSS modules (stub or identity) so importing components does not fail
- Does **not** require a browser

Add root scripts:

```json
"test": "vitest run",
"test:watch": "vitest"
```

**Verify**: `pnpm test` → exits 0 even with zero tests OR after step 3 with tests

### Step 3: Write characterization tests (minimum set)

Create at least these files:

1. **`packages/ui/src/hooks/useStableId.test.ts`**
   - Renders a tiny harness component that calls `useStableId(undefined)` and
     `useStableId("given")` twice; asserts given id is stable and generated id
     is a non-empty string.

2. **`packages/ui/src/components/LoadingProgressBar.test.tsx`**
   - Import `LoadingProgressBar` and any exported constants (e.g.
     `LOADING_PROGRESS_SEGMENT_COUNT`).
   - Render with `progress={0}`, `progress={0.5}`, `progress={1}` (or whatever
     the public props are — **read the component file first**).
   - Assert progress is clamped: values `<0` and `>1` (or `>100` if percent)
     do not throw and produce a sensible DOM (e.g. no crash; filled segment
     count within bounds).

3. **`lib/docs/component-catalog.test.ts`**
   - Import `COMPONENT_DOCS`, `getComponentDoc`.
   - Assert: every slug is unique.
   - Assert: `getComponentDoc` returns undefined for `"__no_such_slug__"`.
   - Assert: every doc has non-empty `title`, `packageImport`, `usage`.

Read source files before asserting prop names — do not invent APIs.

**Verify**: `pnpm test` → all pass, at least 3 test files

### Step 4: Smoke that packages still build

**Verify**: `pnpm build:packages` → exit 0

## Test plan

- Covered in Step 3.
- Pattern: small focused unit tests; no snapshots of full CSS.
- `pnpm test` must be the single gate.

## Done criteria

- [ ] `pnpm typecheck` exists and exits 0
- [ ] `pnpm test` exists and exits 0 with ≥3 new test files covering hook, progress bar, catalog
- [ ] `pnpm build:packages` still exits 0
- [ ] No production component behavior changes (tests/tooling only)
- [ ] No files outside scope modified

## STOP conditions

- Typecheck reveals many pre-existing errors you cannot fix without large refactors → report list, do not disable `strict`
- Vitest cannot load CSS modules after 2 reasonable config attempts → STOP with config dump
- `useStableId` or `LoadingProgressBar` APIs differ enough that the test plan is wrong → re-read source and adapt tests only (still in scope)

## Maintenance notes

- Later plans should add tests under the same Vitest layout.
- If CI is added later, run `pnpm typecheck && pnpm test && pnpm build:packages`.
- Reviewers: reject empty tests (`expect(true).toBe(true)`).
