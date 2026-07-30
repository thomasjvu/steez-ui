# Plan 026: Absolute registryDependencies for hosted installs

> Branch: `advisor/026-absolute-registry-deps`. Commit, no push.

## Status
- Priority P2 · Effort M · Risk MED · Planned at `7475016`

## Why
Generator emits bare names (`theme-tokens`, …). Docs tell users to `shadcn add https://host/r-steez/foo.json`. Bare names may not resolve against Steez host.

## Approach
1. In `scripts/generate-registry.mjs`, when writing items, transform `registryDependencies` to absolute URLs using a base:
   - Env `STEEZ_REGISTRY_BASE_URL` or default `https://steez-ui-6v5.pages.dev/r-steez` for committed JSON used in production
   - OR relative path form if shadcn supports it — verify against shadcn 3 docs briefly
2. Prefer format: `"https://steez-ui-6v5.pages.dev/r-steez/theme-tokens.json"` for each dep
3. Keep local smoke working: smoke may resolve bare OR absolute by basename
4. Update foundation + phantasy-fui + all component items via regenerate
5. Document base URL in AGENTS.md

## If live shadcn cannot be run
Still emit absolute URLs matching SITE_URL; extend smoke to accept absolute deps by stripping to name for file load.

## Done
- [ ] Generated JSON uses absolute registryDependencies
- [ ] `pnpm registry:generate` + `pnpm test:registry-smoke` + `pnpm test` pass
- [ ] Docs note production base

## STOP
If absolute URLs break local `shadcn add http://localhost:3000/...` (wrong host baked in), use a **placeholder strategy**: emit deps relative to the item's host — e.g. document that consumers must set registry base, OR emit bare names for local generate flag `--relative` and absolute by default for committed public files. Prefer generating absolute with SITE_URL and documenting localhost override via regenerating with env `STEEZ_REGISTRY_BASE_URL=http://localhost:3000/r-steez` for local demos.
