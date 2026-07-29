# Plan 002: Rewrite steez registry generator and sync public/r-steez

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer maintains the index.
>
> **Drift check**: Confirm live registry still lives at `public/r-steez/` and
> that `scripts/generate-registry.mjs` still references `apps/registry/public/r`.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: MED (regenerated JSON may change consumer forks of registry files)
- **Depends on**: 001 recommended (for parity tests); can proceed without
- **Category**: bug | tech-debt
- **Planned at**: commit `no-git`, 2026-07-29

## Why this matters

README claims `public/r-steez/` is generated, but generators write to a removed
`apps/registry/public/r` path. Committed JSON is hand-maintained and has already
drifted (Button registry omits `cyberpunk3`/`cyberpunk6` present in source).
Featured `fui-button-tile` is missing entirely from the registry. Phantasy and
docs advertise `shadcn add …/r-steez/<slug>.json` — that path must match package
sources.

## Current state

- **Dead path**: `scripts/generate-registry.mjs` line ~5:
  `const registryDir = path.join(repoRoot, "apps/registry/public/r");`
  Directory `apps/` does **not** exist.
- Same dead root in `scripts/registry-install-smoke.mjs` and
  `scripts/generate-component-pages.mjs`.
- Live payloads: `public/r-steez/*.json` (including `index.json`, `foundation.json`).
- Example drift: `packages/ui/src/components/Button.tsx` variants include
  `cyberpunk3` | `cyberpunk6`; `public/r-steez/button.json` embedded content only
  has `primary | secondary | danger`.
- Missing: `public/r-steez/fui-button-tile.json` while catalog slug
  `fui-button-tile` exists in `lib/docs/component-catalog.ts` and
  `FUIButtonTile` is exported from `packages/ui/src/index.ts`.
- `package.json` has `"registry:build": "shadcn build"` for Boston `/r` only —
  not steez generation.
- Registry JSON shape (inspect any existing file, e.g. `public/r-steez/button.json`):
  typically `$schema`, `name`, `type`, `title`, `description`, `dependencies`,
  `registryDependencies`, `files: [{ path, type, content }]`.
- **Keep** bare `registryDependencies` names as today unless you verify absolute
  URLs with `shadcn` CLI (out of scope to change resolution scheme).

## Commands you will need

| Purpose | Command | Expected |
|---------|---------|----------|
| Generate | `pnpm registry:generate` (new) | exit 0; updates `public/r-steez` |
| Smoke | `pnpm test:registry-smoke` (new) | exit 0 |
| Typecheck/tests | `pnpm typecheck` / `pnpm test` if present | exit 0 |
| Build packages | `pnpm build:packages` | exit 0 |

## Scope

**In scope**:
- `scripts/generate-registry.mjs` (rewrite output path + ensure all catalog
  components / exports that should be installable are defined)
- `scripts/registry-install-smoke.mjs` (retarget to `public/r-steez`)
- `scripts/generate-component-pages.mjs` — **delete** or move to
  `scripts/legacy/` with a one-line README note that Next `app/` replaced it
  (do not leave a broken runnable script at the old name without comment)
- Root `package.json` scripts: `registry:generate`, optionally `test:registry-smoke`
- Regenerated files under `public/r-steez/**`
- Optional parity test: `lib/docs/registry-parity.test.ts` or
  `scripts/check-registry-parity.mjs` asserting catalog component slugs ⊆
  registry names (allowlist for non-component entries: `theme-tokens`,
  `icon-provider`, `foundation`)

**Out of scope**:
- `public/r/**` Boston/legacy motion blocks (leave alone)
- `registry/boston/**`, `registry/new-york/**`
- Changing `@steez-ui/ui` component source APIs
- Absolute-URL `registryDependencies` migration
- `packages/react`

## Git workflow

- Branch: `advisor/002-registry-generator-and-sync`
- Commit: generator first, then regenerated JSON, then smoke/parity

## Steps

### Step 1: Rewrite `generate-registry.mjs` output

1. Set `registryDir` to `path.join(repoRoot, "public/r-steez")`.
2. Keep the item-definition list pattern, but **read file contents from disk**
   at generate time (source paths already listed) so JSON always matches source.
3. Add an item for **`fui-button-tile`**:
   - sources: `packages/ui/src/components/FUIButtonTile.tsx` + matching
     `.module.css` if present
   - dependencies: mirror similar tile components (e.g. cyberpunk-tile /
     theme-tokens) — open `FUIButtonTile.tsx` imports to choose deps
4. Ensure `Button` item includes full `Buttons.module.css` and current
   `Button.tsx` (no hand-edited subset).
5. Write per-item `<name>.json` and refresh `index.json` listing.
6. Preserve existing JSON field conventions used by current files (open
   `public/r-steez/cyberpunk-tile.json` as the shape exemplar).

**Verify**: `node scripts/generate-registry.mjs` → exit 0; `test -f public/r-steez/fui-button-tile.json`;
`rg -n cyberpunk3 public/r-steez/button.json` finds a match

### Step 2: Wire npm scripts

In root `package.json`:

```json
"registry:generate": "node scripts/generate-registry.mjs"
```

Optionally run generate as part of `build` **only if** generation is
deterministic and fast; otherwise document `registry:generate` in README
(README one-line is OK if you touch README — optional in this plan).

**Verify**: `pnpm registry:generate` → exit 0

### Step 3: Fix registry-install-smoke

- Point `registryDir` at `public/r-steez`.
- Keep foundation + button smoke if those items exist; ensure tsc smoke still
  makes sense.
- Add script: `"test:registry-smoke": "node scripts/registry-install-smoke.mjs"`

**Verify**: `pnpm test:registry-smoke` → exit 0

### Step 4: Retire dead generate-component-pages

Either delete `scripts/generate-component-pages.mjs` or prefix with:

```js
throw new Error("Obsolete: docs site is Next app/ — use component-catalog + previews");
```

Prefer delete if nothing imports it.

**Verify**: `rg -n generate-component-pages package.json` → no matches; script gone or throws

### Step 5: Parity check (lightweight)

Add a test or script that fails if:

- Any `COMPONENT_DOCS[].slug` lacks `public/r-steez/${slug}.json`
- Exception list empty for components (all catalog slugs must have JSON)

If vitest from 001 exists, put this in `lib/docs/registry-parity.test.ts` using
`fs.existsSync`. If not, a small node script + `package.json` script is fine.

**Verify**: parity command/test exits 0 after generate

## Test plan

- Smoke: foundation + button compile in temp dir (existing script intent).
- Parity: catalog slugs ⊆ r-steez files.
- Manual spot check: `fui-button-tile.json` content includes `FUIButtonTile`.

## Done criteria

- [ ] `pnpm registry:generate` regenerates `public/r-steez` from package sources
- [ ] `public/r-steez/button.json` contains `cyberpunk3` (and current Button API)
- [ ] `public/r-steez/fui-button-tile.json` exists
- [ ] `pnpm test:registry-smoke` exits 0
- [ ] Catalog slug parity check exits 0
- [ ] No changes under `public/r/` (Boston) unless accidental — revert those

## STOP conditions

- Generated JSON shape is rejected by an existing consumer format you can see
  in-repo (schema mismatch vs every other r-steez file) → match existing shape
- Generator cannot map a component (missing CSS path) → report component name
- Smoke requires network installs → keep offline file copy smoke only

## Maintenance notes

- New components: add generator item + catalog + preview + export; run
  `pnpm registry:generate`.
- Reviewers: diff `public/r-steez` carefully; large content diffs are expected
  when fixing drift.
