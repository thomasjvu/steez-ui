# Plan 019: Clean dist on package build + pin packageManager

> Branch: `advisor/019-dist-clean-and-package-manager`. Commit, no push. Skip plans/README.md.

## Status
- Priority P1 · Effort S · Risk LOW · Depends on none
- Planned at: `7475016`, 2026-07-29

## Why
Canonical package builds never wipe `dist`, so renamed/removed files (and old tests) can remain in published tarballs. CI pins pnpm loosely as `9` with no `packageManager` field.

## Scope IN
- `packages/ui/package.json`, `packages/theme/package.json`, `packages/icons/package.json` build scripts
- Root `package.json` `packageManager` field
- `.github/workflows/ci.yml` and `.forgejo/workflows/ci.yml` pnpm version

## Steps
1. Change each canonical package build to clean first, e.g.:
   `"build": "rm -rf dist && tsc -p ./tsconfig.json && node ../../scripts/copy-static-assets.mjs ."`
   (icons may only need `rm -rf dist && tsc …`)
2. Add root `"packageManager": "pnpm@9.15.9"` (or exact 9.x matching lockfile compatibility). Set both CI workflows to the same exact version string (not just `9`).
3. Verify: `pnpm --filter @steez-ui/ui build`; create a dummy `packages/ui/dist/orphan.js` then rebuild — orphan must be gone.

## Done
- [ ] All three packages clean dist before emit
- [ ] packageManager pinned; CI matches
- [ ] build succeeds

## STOP
If `rm -rf` is Windows-hostile for the team, use `node -e "fs.rmSync('dist',{recursive:true,force:true})"` instead.
