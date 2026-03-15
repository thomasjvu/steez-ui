# Steez UI

Standalone React primitives, flat theme tokens, and shadcn-compatible registry output.

## Overview

Steez UI is authored once and shipped in two forms:

- npm packages for direct React consumption
- generated registry payloads for source-level installation

The source of truth lives in `packages/ui`. The registry output is generated from that same source tree, so the package build and registry install path stay aligned.

Live surfaces:

- Registry frontend: `https://steez-ui-6v5.pages.dev`
- Docs: `https://steez-ui-6v5.pages.dev/docs/`
- Components: `https://steez-ui-6v5.pages.dev/components/`
- Packages: `https://steez-ui-6v5.pages.dev/packages/`
- Registry page: `https://steez-ui-6v5.pages.dev/registry/`
- Registry index: `https://steez-ui-6v5.pages.dev/r/index.json`
- Foundation preset: `https://steez-ui-6v5.pages.dev/r/foundation.json`

## Packages

- `@steez-ui/theme`
  Theme tokens and compatibility aliases.
- `@steez-ui/icons`
  Shared icon surface and provider.
- `@steez-ui/ui`
  React primitives authored in `.tsx` and `.module.css`.

## Install

Registry:

```bash
bunx shadcn@latest add https://steez-ui-6v5.pages.dev/r/foundation.json
```

Packages:

```bash
bun add @steez-ui/theme @steez-ui/icons @steez-ui/ui
```

## Repo Layout

```text
packages/
  theme/    # tokens and compatibility exports
  icons/    # icon primitives and provider
  ui/       # canonical component source

apps/
  registry/ # public install frontend and registry docs
```

## Authoring Model

- `packages/theme` defines tokens first.
- `packages/icons` owns the shared icon surface.
- `packages/ui` is the canonical primitive source.
- `scripts/generate-registry.mjs` emits the registry JSON payloads from package source.
- `apps/registry` is the documentation, preview, and install frontend.

## Development

```bash
bun install
bun run build
bun run test
bun run test:install-smoke
```

Useful commands:

- `bun run generate:registry`
- `bun run generate:component-pages`
- `bun run check:release`
- `bun run publish:packages:dry-run`
- `bun run publish:packages`
- `bun run deploy:registry`

## Adding Or Updating A Primitive

1. Build or update the component in `packages/ui/src/components`.
2. Export it from `packages/ui/src/index.ts`.
3. Add or update the registry item definition in `scripts/generate-registry.mjs`.
4. Add or update the docs metadata and preview in `apps/registry/src/components-docs/`.
5. Run `bun run build` and `bun run test`.
6. Confirm the registry frontend reflects the new component or install path.

## Release Flow

1. `bun run check:release`
2. `bun run publish:packages`
3. `bun run deploy:registry`

GitHub Actions mirror the same CI, npm publish, and Cloudflare Pages deploy path.

## Current Packages

- `@steez-ui/theme@0.1.7`
- `@steez-ui/icons@0.1.7`
- `@steez-ui/ui@0.1.7`

## External Setup

- Add `NPM_TOKEN` to the GitHub repository secrets before using the package publish workflow.
- Add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` to the GitHub repository secrets before relying on the Pages deploy workflow.
- Keep the Cloudflare Pages project named `steez-ui` so the deploy script and workflow stay in sync.
