# Plan 021: CI production build + wire jest-dom

> Branch: `advisor/021-ci-build-and-jest-dom`. Commit, no push.

## Status
- Priority P1 · Effort S · Risk LOW · Planned at `7475016`

## Why
CI never runs `pnpm build`. `@testing-library/jest-dom` is installed but unwired.

## Scope IN
- `.github/workflows/ci.yml`, `.forgejo/workflows/ci.yml` — add Build step after tests
- `vitest.setup.ts` + `vitest.config.ts` setupFiles
- Optionally use one jest-dom matcher in an existing test

## Steps
1. After Registry smoke (or after lint), add `pnpm build` (or `build:packages && next build` if full next is too heavy — prefer full `pnpm build` as package.json defines it).
2. Create `vitest.setup.ts`: `import "@testing-library/jest-dom/vitest";`
3. vitest.config: `setupFiles: ["./vitest.setup.ts"]`
4. `pnpm test` still green

## Done
- [ ] CI runs build
- [ ] jest-dom wired
- [ ] tests pass
