# Plan 022: Remove dead Boston chrome and lucide-react

> Branch: `advisor/022-remove-dead-chrome`. Commit, no push.

## Status
- Priority P1 · Effort S · Risk LOW · Planned at `7475016`

## Why
`SiteHeader`, `PreviewFrame`, `CopyCommand`, `OpenInV0Button`, and `lib/registry-items.ts` form an unused graph. Only lucide consumer is CopyCommand. Site uses DocsSiteLayout.

## Scope IN
Delete or stop shipping unused files:
- `components/site-header.tsx`
- `components/preview-frame.tsx`
- `components/copy-command.tsx`
- `components/open-in-v0-button.tsx`
- `lib/registry-items.ts` **only if** nothing else imports it (grep first)
- Remove `lucide-react` from root package.json if unused
- AGENTS one-liner: Boston `/r` is archival demo surface (freeze), not the package path

## Out of scope
- Deleting `registry/boston` or `public/r` content

## Steps
1. Grep for all importers; if only self-referential, delete files
2. Drop lucide-react dependency
3. Optional AGENTS freeze note for Boston

## Done
- [ ] Dead files gone
- [ ] no lucide-react in package.json deps (if unused)
- [ ] pnpm test / lint still work
