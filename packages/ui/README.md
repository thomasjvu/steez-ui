# @steez-ui/ui

Canonical React primitives for **Steez UI** (TSX + CSS modules). Source of truth for new apps and Phantasy.

Pair with `@steez-ui/theme` (tokens) and `@steez-ui/icons` (icon surface).

> **Not** `@steez-ui/react` — that package is legacy (Tailwind/CVA portable bundle). Prefer this package for all new work. See the [root README](../../README.md) and [AGENTS.md](../../AGENTS.md).

## Standalone copy

Each public component also has a generated single-file copy at
`/copy/steez/<slug>.tsx` on the docs site. Copy the entire file into a React
project when you want to own the source without installing Steez packages. The
copy embeds CSS modules, local helpers, and required Steez icons, and provides
fallbacks for the theme variables.

These files are generated from `packages/ui/src`; do not edit a generated copy as
the canonical implementation. Run `pnpm registry:generate` after changing a
component.

## Install

```bash
pnpm add @steez-ui/theme @steez-ui/icons @steez-ui/ui
```

### Heavy canvas: HexagonGrid (subpath only)

```tsx
import { HexagonGrid } from "@steez-ui/ui/hexagon-grid";
```

`HexagonGrid` is not re-exported from the main `@steez-ui/ui` barrel.

## Usage

```tsx
import "@steez-ui/theme/tokens.css";
import {
  CyberpunkTile,
  CyberpunkInput,
  LoadingProgressBar,
  FUIButtonTile,
  Button,
} from "@steez-ui/ui";

export function Example() {
  return (
    <>
      <Button variant="primary">Enter</Button>
      <CyberpunkTile>Signal</CyberpunkTile>
      <LoadingProgressBar progress={60} />
      <FUIButtonTile label="Deploy" />
      <CyberpunkInput
        label="Handle"
        helperText="Used in URLs."
        error="Handle is taken"
      />
    </>
  );
}
```

Form controls accept optional `error` (sets `aria-invalid`, `role="alert"` copy, and merges into `aria-describedby` with `helperText`).

## Public API

The package barrel is the canonical surface for ordinary primitives. Choose the smallest
family that matches the job and compose it before introducing a new wrapper:

| Family | Exports |
| --- | --- |
| Actions | `Button`, `CopyButton`, `OverlayButton`, `FUIButtonTile` |
| Forms | `CyberpunkInput`, `CyberpunkSelect`, `CyberpunkTextarea`, `CyberpunkCheckbox`, `CyberpunkRadio`, `CyberpunkRadioGroup`, `CyberpunkSlider`, `SegmentedControl` |
| Surfaces | `CyberpunkTile` (`CyberTile` alias), `ThemedCard`, `CornerBracketCard`, `DottedHaloCard`, `StatCard`, `AvatarStage`, `NotchedViewportFrame` |
| Layout | `Section`, `SectionHeader`, `PageHeader`, `PageTemplate`, `TabbedPanel` |
| Motion and text | `BoilingLines`, `AsciiRippleText`, `BlinkText`, `StrokedText`, `HeartbeatPulse`, `MarqueeStrip` |
| Feedback and loading | `StatusMessage`, `ErrorMessage`, `PixelTooltip`, `LoadingProgressBar`, `LoadingScreen`, `ThemeToggle` |

Product-shaped compositions live behind the `@steez-ui/ui/blocks` entrypoint:

| Family | Exports |
| --- | --- |
| Feature surfaces | `AccordionFeatureCard`, `QuickInfoCard`, `WidgetCard` |
| Navigation and topology | `RadialMenuOverlay`, `RuntimeOrbitDiagram` |
| Loading overlays | `LoadingOverlayCrystalline` |

```tsx
import {
  AccordionFeatureCard,
  LoadingOverlayCrystalline,
  QuickInfoCard,
  RadialMenuOverlay,
  RuntimeOrbitDiagram,
  WidgetCard,
} from "@steez-ui/ui/blocks";
```

`HexagonGrid` remains subpath-only because it brings canvas work into the consuming
bundle. Every export has a matching reference page at
`/components/[slug]` in the documentation site.

The card and tile exports are intentionally related, not interchangeable aliases: use
`CyberpunkTile` for the signature cut-corner treatment, `ThemedCard` for a quiet content
surface, and the specialized card variants only when their framing communicates meaning.

## Registry install (docs site)

Local (`pnpm dev` from repo root) or production (`SITE_URL` = `https://steez-ui-6v5.pages.dev`):

```bash
# Local
pnpm dlx shadcn@latest add http://localhost:3000/r-steez/cyberpunk-tile.json
pnpm dlx shadcn@latest add http://localhost:3000/r-steez/loading-progress-bar.json

# Production
pnpm dlx shadcn@latest add https://steez-ui-6v5.pages.dev/r-steez/cyberpunk-tile.json
pnpm dlx shadcn@latest add https://steez-ui-6v5.pages.dev/r-steez/loading-progress-bar.json
```

Use **`/r-steez`**, not legacy `/r`. Registry installs copy the source and shared
helpers into your project root; no Steez npm packages are required. Import the copied
`styles/steez/tokens.css` once, then import from `components/steez` using a relative
path from your file. These paths are explicit even in apps using `src/`.

### Boiling lines

```tsx
import { BoilingLines } from "@steez-ui/ui";

<BoilingLines intensity="subtle" speedMs={120}>
  <img src="/studio-mark.svg" alt="Studio mark" />
</BoilingLines>
```

Use `intensity="default"` or `"intense"` for stronger motion, `scale` to customize
it, and `paused` to stop animation. Reduced-motion preferences disable the effect.
Wrap illustrations, SVG strokes, or decorative borders; keep body copy outside.
This is the canonical replacement for the archived boiling-line demos.

## Build (from monorepo root)

```bash
pnpm build:packages   # theme → icons → ui
```

Package-local:

```bash
pnpm --filter @steez-ui/ui build
```
