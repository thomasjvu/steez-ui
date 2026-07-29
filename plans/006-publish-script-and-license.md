# Plan 006: Fix publish-packages script (LICENSE + pnpm)

> **Executor instructions**: Follow step by step. Do not publish to npm.
>
> **Drift check**: Confirm `scripts/publish-packages.mjs` still runs `bun` for
> build and `fs.copyFile(... LICENSE)` and that no root `LICENSE` file exists.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: bug | dx
- **Planned at**: commit `no-git`, 2026-07-29

## Why this matters

The staging publish script copies a non-existent `LICENSE` and builds with
`bun` while the monorepo is pnpm-first. Publish cannot succeed as written.

## Current state

```js
// scripts/publish-packages.mjs ~76
run("bun", ["run", "build:packages"], { cwd: repoRoot });

// ~116-117
await fs.copyFile(path.join(repoRoot, "README.md"), path.join(stagingDir, "README.md"));
await fs.copyFile(path.join(repoRoot, "LICENSE"), path.join(stagingDir, "LICENSE"));
```

- README states MIT license; no `LICENSE` file at repo root.
- Packages declare `"license": "MIT"` in package.json.
- OTP may be read from `--otp` argv and `NPM_CONFIG_OTP` — prefer env; if easy,
  stop documenting argv OTP (do not print secrets).

## Scope

**In scope**:
- `LICENSE` at repo root (MIT text)
- `scripts/publish-packages.mjs` (bun → pnpm; robust LICENSE copy)
- Optional: root `package.json` script `"publish:packages": "node scripts/publish-packages.mjs"`
- Do **not** run real `npm publish`

**Out of scope**:
- Forgejo publish for `@steez-ui/react` (separate script)
- Changing package versions
- Actually publishing

## Git workflow

- Branch: `advisor/006-publish-script-and-license`

## Steps

### Step 1: Add MIT LICENSE

Create standard MIT LICENSE with copyright holder. If unknown, use:

```
Copyright (c) 2025-2026 Thomas Vu / Steez UI contributors
```

or match any existing copyright in repo files. **Do not invent a different license.**

**Verify**: `test -f LICENSE` → true

### Step 2: Fix publish script toolchain

- Replace `run("bun", ["run", "build:packages"], …)` with
  `run("pnpm", ["run", "build:packages"], …)` (or `pnpm`, `["build:packages"]`).
- Keep dry-run and skip-build flags working.
- If LICENSE missing (should not after step 1), fail with a clear error instead
  of throwing ENOENT only.

**Verify**: `rg -n '"bun"' scripts/publish-packages.mjs` → no build invocation with bun;
`node --check scripts/publish-packages.mjs` → exit 0

### Step 3: Dry-run smoke (no publish network required if possible)

Run:

```bash
node scripts/publish-packages.mjs --dry-run --skip-build
```

If this still invokes `npm publish --dry-run` and needs network/auth, that is OK
as long as it gets past LICENSE copy and staging; if it fails on auth, NOTES
should say so and verify staging logic by reading the script path instead.

**Prefer**: with `--skip-build`, confirm script reaches publish args without
missing file errors. If npm dry-run fails auth, still SUCCESS for this plan if
LICENSE exists and bun is gone.

## Done criteria

- [ ] Root `LICENSE` exists (MIT)
- [ ] publish script uses pnpm for package build
- [ ] Script no longer depends on missing LICENSE path
- [ ] No actual packages published

## STOP conditions

- Operator forbids adding LICENSE file → make copy conditional and skip license file in tarball
- Script path resolution broken on this OS → report (`import.meta.url` pathname issue)

## Maintenance notes

- Real publishes still need npm auth; this plan only unblocks the script mechanics.
