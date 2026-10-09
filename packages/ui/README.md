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
| Actions | `CrystalButton`, `Button`, `CopyButton`, `OverlayButton`, `FUIButtonTile` |
| Forms | `CyberpunkInput`, `CyberpunkSelect`, `IconStackSelect`, `CyberpunkTextarea`, `CyberpunkCheckbox`, `CyberpunkRadio`, `CyberpunkRadioGroup`, `CyberpunkSlider`, `SegmentedControl` |
| Surfaces | `CyberpunkTile` (`CyberTile` alias), `ThemedCard`, `CornerBracketCard`, `DottedHaloCard`, `StatCard`, `AvatarStage`, `NotchedViewportFrame` |
| Layout | `Section`, `SectionHeader`, `PageHeader`, `PageTemplate`, `TabbedPanel` |
| Motion and text | `QuartzCrystal`, `CharacterAfterimage`, `BoilingLines`, `DisplacementFilter`, `KineticGlyph`, `KineticSwipeText`, `KineticTextRamp`, `KineticTextRing`, `KineticTextGlobe`, `KineticTextVolume`, `AsciiRippleText`, `BlinkText`, `StrokedText`, `HeartbeatPulse`, `MarqueeStrip` |
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

### Kinetic glyphs and displacement filters

```tsx
import { DisplacementFilter, KineticGlyph } from "@steez-ui/ui";

<KineticGlyph>D</KineticGlyph>
<KineticGlyph>9</KineticGlyph>
<KineticGlyph label="Star icon"><StarIcon /></KineticGlyph>

<DisplacementFilter intensity="subtle" trigger="hover">
  <Button>Any component can be distorted</Button>
</DisplacementFilter>
```

`KineticGlyph` draws nested outlines for a character or icon and includes a subtle
displacement ripple. Pass `layers`, `durationMs`, `displacementScale`, or `trigger`
to tune it. `DisplacementFilter` is also available independently; wrap any text,
icon, or component and adjust `intensity`, `scale`, `speedMs`, `trigger`, or `paused`.
Both components respect reduced-motion preferences.

### Kinetic text ring

```tsx
import { KineticTextRing } from "@steez-ui/ui";

<KineticTextRing>KINETIC</KineticTextRing>
<KineticTextRing direction="counterclockwise" pauseOnHover>
  TYPE IN MOTION
</KineticTextRing>
```

The repeated label follows a curved SVG path while CSS rotates the ring. Set
`durationMs` or `direction` to tune the loop; `pauseOnHover` pauses it on hover.
Reduced-motion preferences leave the ring static.

### Kinetic text globe

```tsx
import { KineticTextGlobe } from "@steez-ui/ui";

<KineticTextGlobe>HELLO</KineticTextGlobe>
<KineticTextGlobe direction="counterclockwise" pauseOnHover durationMs={24000}>
  KEEP MOVING
</KineticTextGlobe>
```

`KineticTextGlobe` bends repeated display type across a rotating sphere. Set
`durationMs` or `direction` to tune the rotation, and `pauseOnHover` to pause it.
The black and white palette can be changed with the
`--kinetic-text-globe-background` and `--kinetic-text-globe-color` CSS variables.
Reduced-motion preferences leave the globe still.

### Kinetic text volume

```tsx
import { KineticTextVolume } from "@steez-ui/ui";

<KineticTextVolume>ESPACE</KineticTextVolume>
<KineticTextVolume rows={12} amplitude={8} pauseOnHover>
  KEEP MOVING
</KineticTextVolume>
```

`KineticTextVolume` repeats a short label across a perspective field and animates
the rows in a traveling wave. Tune `rows`, `amplitude`, `durationMs`, or
`direction`; set `pauseOnHover` to pause the effect. Reduced-motion preferences
leave the lettering still. Set `--kinetic-text-volume-background` and
`--kinetic-text-volume-color` to change its palette.

### Character afterimage

```tsx
import { CharacterAfterimage } from "@steez-ui/ui";

<CharacterAfterimage
  src="/companion.png"
  alt="Pixel companion"
  width={180}
  height={260}
  entrance
/>
```

The component adds three cycling holographic silhouettes by default. Set `entrance`
to play the slide-in and temporary trail on mount; use `ghostCount`, `ghostOffset`,
`cycleDurationMs`, or `entranceDurationMs` to tune it. Decorative copies are hidden
from assistive technology, and reduced-motion preferences disable the animations.

## Build (from monorepo root)

```bash
pnpm build:packages   # theme → icons → ui
```

Package-local:

```bash
pnpm --filter @steez-ui/ui build
```

### IconStackSelect

A select-only combobox with a custom rounded menu. The closed trigger shows the
selected label, all associated icons as 28px circles with 12px overlap, and a
separate chevron. Icons are decorative content, not nested controls. Include any
essential provider information in the option label or an external description.

```tsx
import { IconStackSelect } from "@steez-ui/ui";

<IconStackSelect
  label="Model"
  value={model}
  onValueChange={setModel}
  options={options}
/>
```

Each option has a unique `value`, text `label`, optional `disabled`, and optional
`icons` array (`{ id, label, icon: ReactNode }`). Use `defaultValue` for uncontrolled
selection; an omitted value shows `placeholder`. Supply `name` to include a hidden
input in native form submission. Disabled selects omit that input from submission.
Native required validation and form reset are not provided; manage those in the host form.

Arrow keys, Home/End, and typing move the active option. Enter/Space select;
Escape cancels, Tab commits and continues focus, and outside clicks dismiss.
Disabled options are skipped. The menu uses the Popover API top layer and tracks
scroll/resize, flips above the trigger when needed, and limits height to the viewport.
Use a browser with Popover API support for clipping-safe display.

Override `--icon-stack-select-bg`, `-text`, `-muted`, `-border`, `-hover`, `-accent`,
`-font`, and `-icon-bg` (all with the `--icon-stack-select` prefix) on the wrapper
or an ancestor. `wrapperClassName` styles the wrapper; `className` and `style`
style the trigger. Focus has an outline; selection does not color the trigger border.

### Diamond slider

Use `CyberpunkSlider variant="diamond"` for a 5px track with accent progress and
a solid 20px square thumb. The thumb rotates 45 degrees while held and returns
on release with a 160ms ease transition. Reduced-motion preferences disable the
transition. There is no thumb border, shadow, or glow; keyboard focus outlines
the whole input. The native range has a 44px-high hit area and keeps keyboard,
touch, disabled, and native form behavior.

```tsx
<CyberpunkSlider
  variant="diamond"
  label="Volume"
  min={0}
  max={100}
  step={1}
  defaultValue={50}
  name="volume"
/>
```

Use `value` and `onChange` for controlled input, or `defaultValue` for uncontrolled
input. `showValue={false}` hides the visible number. Helper/error text and native
ARIA attributes work as on the default variant. Set `--diamond-slider-accent`
and `--diamond-slider-track` on the component's `className` or an ancestor to
override the shared accent and border tokens. The existing default variant is unchanged.

### CrystalButton

`CrystalButton` renders a native button, or an anchor when `href` is supplied.
The horizontal shape uses the landing CTA's six-point cut; `tone="loud"` mixes
18% white into the accent fill. `orientation="vertical"` preserves the minimized
rail control's 96×40px geometry rotated 90 degrees, with a centered 20px SVG icon.
Always give icon-only controls `aria-label` or `aria-labelledby`.

```tsx
<CrystalButton href="/app" tone="loud">Open app</CrystalButton>
<CrystalButton orientation="vertical" aria-label="New thread" onClick={createThread}>
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2.5}>
    <path d="M12 5v14M5 12h14" />
  </svg>
</CrystalButton>
```

Native button props, link props, and `disabled` are supported. Disabled links have
no navigable `href`, suppress clicks, and leave the tab order. Buttons default to
`type="button"`. Focus outlines the unclipped control rather than disappearing
inside the polygon. Set `--crystal-button-color`, `--crystal-button-text`,
`--crystal-button-focus`, or the horizontal `--crystal-button-cut` on the control
or an ancestor. Reduced motion removes hover scaling.

### QuartzCrystal

`QuartzCrystal` is separate decorative artwork with the original nine CSS facets,
rotating-face cycle, and float. Liquid distortion is optional. It is always `aria-hidden`
and ignores pointer input. Position it from your layout; it does not attach to the
viewport or manage page content.

```tsx
<QuartzCrystal color="#ee1401" width={120} height={240}
  durationMs={5000} floatDistance={15} parallax={false} />
```

`width` and `height` size the body in pixels. The tips add one body width to the
total height; the layout reserves that space plus float travel. The defaults match
the landing's desktop crystal: 120×240px body, 5-second facet cycle, 10-second
float cycle, and 15px float distance. Host layouts can use 96×192, 84×168, or
72×144 for smaller displays. `distortion` defaults to 0 for crisp facets; increase it up to 500
for a liquid effect. SVG filter IDs are unique per instance.

`paused` freezes the animation; `visible={false}` hides it and pauses work.
Animations also pause offscreen and in hidden tabs. Reduced motion disables
all looping animation and pointer parallax. Opt in with `parallax` or configure
`parallax={{ strength: 0.03, maxX: 60, maxY: 40 }}`. Pointer updates share one
animation frame; listeners, observers, and pending frames clean up on unmount.
Color comes from `color` or inherited `--quartz-color`, falling back to the theme
accent. No canvas, WebGL, or animation package is required.
