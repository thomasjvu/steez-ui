# Plan 020: Publish package READMEs + fix LoadingProgressBar example

> Branch: `advisor/020-publish-readme-and-api-docs`. Commit, no push.

## Status
- Priority P1 · Effort S · Risk LOW · Planned at `7475016`

## Why
`publish-packages.mjs` always ships monorepo README. `packages/ui/README.md` wrongly uses `<LoadingProgressBar value={0.6} />` instead of `progress={60}` (0–100). Also `CyberpunkTile title=` may be wrong — check component props and fix examples.

## Scope IN
- `scripts/publish-packages.mjs` — prefer `packages/<name>/README.md` when present else root
- Fix `fileURLToPath` for repoRoot if still using `.pathname` only
- `packages/ui/README.md` correct examples
- Optional short README stubs for theme/icons if missing

## Steps
1. Publish script: `const pkgReadme = path.join(packageDir, "README.md");` if exists copy that, else root README.
2. Fix ui README: `LoadingProgressBar progress={60}`; fix any invalid CyberpunkTile props (use children not title if needed).
3. Optional: minimal theme/icons READMEs (install + tokens import).

## Done
- [ ] Publish prefers package README
- [ ] LoadingProgressBar example uses `progress`
- [ ] node --check scripts/publish-packages.mjs
