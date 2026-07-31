# Plan 030: CI registry generate dirty check

> Branch `advisor/030-ci-registry-dirty-check`. Commit, no push.

## Status
- Priority P1 · Effort S · Risk LOW · Planned at `dcbc717`

## Why
CI never regenerates/compares `public/r-steez`; drift can ship.

## Change
Both `.github/workflows/ci.yml` and `.forgejo/workflows/ci.yml`:

```yaml
- name: Registry generate clean
  run: |
    pnpm registry:generate
    git diff --exit-code -- public/r-steez
```

No localhost env. Use production default base URL.

## Done
Both workflows updated; step uses real package.json scripts.
