# Steez UI

Shared Phantasy UI primitives and shadcn-compatible registry output.

Registry frontend: `https://steez-ui.pages.dev`

## Packages

- `@steez-ui/theme`
- `@steez-ui/icons`
- `@steez-ui/ui`

## App

- `@steez-ui/registry`

## Scripts

- `bun run build`
- `bun run check:release`
- `bun run publish:packages:dry-run`
- `bun run publish:packages`
- `bun run deploy:registry`
- `bun run generate:registry`
- `bun run test`
- `bun run test:install-smoke`

## Install

```bash
bunx shadcn@latest add https://steez-ui.pages.dev/r/foundation.json
```

```bash
bun add @steez-ui/theme @steez-ui/icons @steez-ui/ui
```

## Live Packages

- `@steez-ui/theme@0.1.0`
- `@steez-ui/icons@0.1.0`
- `@steez-ui/ui@0.1.0`

## Release Flow

1. `bun install`
2. `bun run check:release`
3. `bun run publish:packages`
4. `bun run deploy:registry`

GitHub Actions mirror the same path for CI, npm publish, and Cloudflare Pages deployment.

## One-Time External Setup

- Create or claim the npm scope `@steez-ui`, then grant the publishing account access.
- Add `NPM_TOKEN` to the GitHub repository secrets before using the package publish workflow.
- Add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` to the GitHub repository secrets before relying on the Pages deploy workflow.
