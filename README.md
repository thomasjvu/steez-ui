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

## Release Flow

1. `bun install`
2. `bun run check:release`
3. `bun run publish:packages`
4. `bun run deploy:registry`

GitHub Actions mirror the same path for CI, npm publish, and Cloudflare Pages deployment.
