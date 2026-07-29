# Plan 011: Refresh AGENTS.md and production registry install docs

> **Executor instructions**: Follow step by step. Docs only. Commit on branch
> `advisor/011-refresh-agents-and-prod-registry-docs`. Do NOT push. Skip
> `plans/README.md` if reviewer maintains it.
>
> **Drift check**: Confirm `AGENTS.md` still claims typecheck/test are unwired
> and registry:generate is planned. Confirm `package.json` has those scripts.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: docs | dx
- **Planned at**: commit `7431be3`, 2026-07-29

## Why this matters

`AGENTS.md` still describes pre–plan-001/002 reality. Agents skip real gates
(`pnpm typecheck`, `pnpm test`, `pnpm registry:generate`) and invent wrong
commands. Production registry base `SITE_URL` exists but README examples are
localhost-only.

## Current state

- `AGENTS.md:50-79` — wrong status for typecheck/test/registry:generate
- `package.json:17-21` — scripts exist: `typecheck`, `test`, `test:registry-smoke`, `registry:generate`
- `scripts/generate-registry.mjs:5-6` — writes `public/r-steez`
- `lib/docs/site-data.ts:1` — `SITE_URL = "https://steez-ui-6v5.pages.dev"`
- README registry install examples use localhost only

## Scope

**In scope**:
- `AGENTS.md`
- Root `README.md` (registry install section — add production URL examples)
- Optional: `packages/ui/README.md` production install line

**Out of scope**:
- Source code, CI, registry JSON regeneration

## Steps

### Step 1: Rewrite AGENTS.md Commands / Typecheck / Registry sections

Document accurately:

```bash
pnpm typecheck          # build:packages then site tsc --noEmit
pnpm test               # vitest
pnpm test:registry-smoke
pnpm registry:generate  # → public/r-steez
pnpm lint
pnpm build:packages
pnpm dev
```

Remove “not wired yet” / “Planned (plan 002)” / dead `apps/registry` path claims.
Keep dual-registry and legacy-react guidance.

**Verify**: `rg -n 'not wired|apps/registry|Planned \(plan' AGENTS.md` → no matches

### Step 2: Production registry URLs in README

Add alongside localhost:

```bash
pnpm dlx shadcn@latest add https://steez-ui-6v5.pages.dev/r-steez/cyberpunk-tile.json
```

Use exact `SITE_URL` from `site-data.ts`.

**Verify**: `rg -n 'steez-ui-6v5.pages.dev/r-steez' README.md` → match

## Done criteria

- [ ] AGENTS.md matches package.json scripts
- [ ] No false “unwired/planned” language for existing commands
- [ ] Production r-steez example in README
- [ ] Docs only

## STOP conditions

- SITE_URL changed in site-data → use the live constant value, do not invent domains
