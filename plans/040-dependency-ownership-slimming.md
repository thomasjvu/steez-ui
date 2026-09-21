# Plan 040: Remove unused root dependency ownership

> **Executor instructions**: Follow this plan step by step. Touch only the files listed in Scope. If a verification fails twice or an archival command requires a removed dependency, stop and report instead of improvising.
>
> **Drift check**: `git diff --stat 12653cb..HEAD -- package.json pnpm-lock.yaml postcss.config.mjs`.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: MED
- **Depends on**: none
- **Category**: tech-debt
- **Planned at**: commit `12653cb`, 2026-09-21

## Why this matters

The root workspace currently owns dependencies that are used only by the deprecated package or archival Boston registry sources. The canonical docs app and `@steez-ui/ui` use CSS modules, design tokens, and an optional Three.js subpath. Removing duplicate root ownership makes installs and audits reflect the canonical path while preserving legacy package manifests.

## Current state

- `package.json:27-60` contains root runtime/dev dependencies.
- `package.json:34,45` owns `three` and `@types/three`, while `packages/ui/package.json:13-21,48-50` already owns the optional peer and package-local development dependency.
- `package.json:53-60` contains `@radix-ui/react-label`, `@radix-ui/react-slot`, `class-variance-authority`, `zod`, and `tw-animate-css`; the first four are used by root-included archival `registry/boston` sources and therefore cannot be removed until the legacy toolchain is isolated. `tw-animate-css` has no source usage.
- Keep `clsx` and `tailwind-merge` for `lib/utils.ts` unless the executor first proves that file can be removed without breaking `components.json` or shadcn workflows.

## Scope

**In scope**:

- `package.json`
- `pnpm-lock.yaml`

**Out of scope**:

- `packages/react/**` dependency declarations
- `registry/boston/**` and `public/r/**`
- deleting `lib/utils.ts` or changing `components.json`

## Steps

### Step 1: Remove duplicate root ownership

Remove root `@types/three` and move root `three` from `dependencies` to `devDependencies`. Remove root `tw-animate-css`. Keep `@radix-ui/react-label`, `@radix-ui/react-slot`, `class-variance-authority`, and `zod` until plan 045 isolates the archival sources; do not modify package-local legacy dependencies.

**Verify**: `rg -n 'tw-animate-css' package.json pnpm-lock.yaml` → no matches; `rg -n 'three' package.json packages/ui/package.json` → root `three` is dev-only and UI package still has optional peer metadata; archival dependencies remain present for root-included `registry/boston` typechecking.

### Step 2: Regenerate the lockfile

Run `pnpm install --lockfile-only` and inspect the diff. Do not run a broad upgrade or dedupe in this plan.

**Verify**: `pnpm install --frozen-lockfile` → exit 0.

### Step 3: Run canonical and archival gates

Run the canonical build, typecheck, tests, and registry checks. Run `pnpm registry:build` once because the removed packages are referenced by frozen archival source metadata.

**Verify**: `pnpm typecheck`, `pnpm test -- --pool=threads --maxWorkers=1`, `pnpm build`, `pnpm test:registry-smoke`, and `pnpm registry:build` all exit 0.

## Done criteria

- [ ] Unused `tw-animate-css` and duplicate root Three.js type/runtime ownership are removed.
- [ ] `pnpm install --frozen-lockfile` exits 0.
- [ ] All five verification commands pass.
- [ ] Only `package.json` and `pnpm-lock.yaml` changed.

## STOP conditions

- A canonical import requires one of the removed packages.
- `pnpm registry:build` or root typecheck requires an archive dependency that this plan attempts to remove.
- Any package-local dependency declaration must change.

## Maintenance notes

When adding a new canonical primitive, add dependencies to `packages/ui` only when its emitted package requires them. Keep archival and deprecated package dependencies in their own manifests.
