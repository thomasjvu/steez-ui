# Plan 003: Canonicalize install URLs to /r-steez

> **Executor instructions**: Follow step by step. Verify each step. STOP
> conditions apply. Do not update `plans/README.md` if the reviewer maintains it.
>
> **Drift check**: Confirm `lib/docs/site-data.ts` still lists `/r/foundation.json`
> etc., and `components/docs/component-preview.tsx` CopyButton preview still uses
> `/r/button.json`.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none (re-check links after plan 002)
- **Category**: bug | docs
- **Planned at**: commit `no-git`, 2026-07-29

## Why this matters

Package primitives live under `/r-steez/*.json`. Docs and helpers still emit
`/r/...` for foundation/button, which 404 or hit legacy Boston demos. Broken
copy-paste install commands undermine the dual install-path product promise.

## Current state

```ts
// lib/docs/site-data.ts — REGISTRY_ITEMS still use /r/
{ label: "Foundation preset", href: "/r/foundation.json" },
{ label: "Button item", href: "/r/button.json" },
// ...
```

```tsx
// components/docs/component-preview.tsx ~106-108
const command = `bunx shadcn@latest add ${registryOrigin}/r/button.json`;
```

```tsx
// components/open-in-v0-button.tsx ~19
href={`https://v0.dev/chat/api/open?url=${process.env.NEXT_PUBLIC_BASE_URL}/r/${name}.json`}
```

- `components/docs/component-detail.tsx` already uses `/r-steez/${slug}.json` (good).
- `app/registry/page.tsx` rewrites `/r/` → `/r-steez/` at render (band-aid).
- `SITE_URL = "https://steez-ui-6v5.pages.dev"` in `site-data.ts`.
- `.env.example`: `NEXT_PUBLIC_BASE_URL=http://localhost:3000`
- Prefer `pnpm dlx` in user-facing commands to match README (not `bunx`) unless
  the surrounding UI is intentionally bun-themed — match README.

## Scope

**In scope**:
- `lib/docs/site-data.ts`
- `components/docs/component-preview.tsx` (CopyButton preview command only)
- `components/open-in-v0-button.tsx`
- `app/registry/page.tsx` (remove rewrite if no longer needed; keep page working)
- Optional one-line README note that production registry base is `SITE_URL`
- `lib/registry-items.ts` — **only if** it incorrectly claims steez package items
  under `/r/`; Boston demo install commands under `/r/` are **correct** and must
  stay

**Out of scope**:
- Regenerating registry JSON (plan 002)
- Renaming `public/r` folders
- Changing Boston demo registry

## Git workflow

- Branch: `advisor/003-registry-url-consistency`

## Steps

### Step 1: Fix `REGISTRY_ITEMS` hrefs

Change steez package registry links to `/r-steez/...`:

- `/r/index.json` → `/r-steez/index.json`
- `/r/foundation.json` → `/r-steez/foundation.json`
- `/r/theme-tokens.json` → `/r-steez/theme-tokens.json`
- `/r/button.json` → `/r-steez/button.json`
- `/r/page-template.json` → `/r-steez/page-template.json`
- `/r/segmented-control.json` → `/r-steez/segmented-control.json`

**Verify**: `rg -n 'href: "/r/' lib/docs/site-data.ts` → no matches (or only comments)

### Step 2: Fix CopyButton preview command

In `component-preview.tsx`, use `/r-steez/button.json` and prefer
`pnpm dlx shadcn@latest add …` to match README.

**Verify**: `rg -n '/r/button' components/docs/component-preview.tsx` → no matches

### Step 3: Harden OpenInV0Button

1. Resolve base URL:
   - `process.env.NEXT_PUBLIC_BASE_URL` if set
   - else `SITE_URL` from `@/lib/docs/site-data` (import constant)
2. Use path `/r-steez/${name}.json` for steez items **if this button is only used
   for steez package names**. If used for Boston demo names from `registryItems`,
   keep `/r/` for those — **read call sites** with grep before changing.
3. `encodeURIComponent` the full registry URL in the v0 query param.
4. If no base URL can be resolved (should not happen with SITE_URL fallback),
   return `null` instead of rendering a broken link.

**Verify**: `rg -n 'NEXT_PUBLIC_BASE_URL}/r/' components/open-in-v0-button.tsx` → no matches;
`rg -n encodeURIComponent components/open-in-v0-button.tsx` → has match

### Step 4: Clean registry page rewrite

If `app/registry/page.tsx` only rewrites `/r/` → `/r-steez/` for display, simplify
to use `REGISTRY_ITEMS` as-is after step 1. Do not break Boston links if shown.

**Verify**: `pnpm lint` on touched files if available; or `tsc -p tsconfig.json --noEmit`

## Test plan

- If plan 001 tests exist: add assertion that every `REGISTRY_ITEMS[].href`
  starts with `/r-steez/` and that `public` file exists
  (`public${href}` relative path).
- Manual: open site-data constants mentally against `ls public/r-steez`.

## Done criteria

- [ ] No steez foundation/button install links under `/r/` in site-data or CopyButton preview
- [ ] OpenInV0Button never emits `url=undefined/...`
- [ ] Boston `/r/` demo install path in `lib/registry-items.ts` unchanged if still demo-only
- [ ] Typecheck/lint clean for touched files

## STOP conditions

- OpenInV0Button is only used with Boston `/r/` item names → do not force
  `/r-steez/`; instead fix base URL only and document in NOTES
- File structure differs → report

## Maintenance notes

- New docs links must use `/r-steez` for package primitives and `/r` for Boston demos only.
