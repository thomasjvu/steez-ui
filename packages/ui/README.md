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
  Input,
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
      <Input
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
| Forms | `Input`, `Select`, `Textarea`, `Checkbox`, `Radio`, `RadioGroup`, `Slider`, `SegmentedControl` |
| Surfaces | `CyberpunkTile`, `ThemedCard`, `CornerBracketCard`, `DottedHaloCard`, `StatCard`, `AvatarStage`, `NotchedViewportFrame` |
| Layout | `Section`, `SectionHeader`, `PageHeader`, `PageTemplate`, `TabbedPanel` |
| Content filters | `DisplacementFilter`, `ChromaticAberrationFilter`, `GlowFilter`, `GrainFilter` |
| Motion and text | `QuartzCrystal`, `CharacterAfterimage`, `BoilingLines`, `KineticGlyph`, `KineticSwipeText`, `KineticTextRamp`, `KineticTextRing`, `KineticTextGlobe`, `KineticTextVolume`, `AsciiRippleText`, `BlinkText`, `StrokedText`, `HeartbeatPulse`, `MarqueeStrip` |
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

### Select and field labels

`Select` uses a native browser select for keyboard navigation, touch pickers,
required validation, form submission, and form reset. Its default label sits
above the control. Add `labelStyle="notch"` for a label that cuts the top border,
`iconStack` for selected-option icons, or both. Helper and error text sit outside
the control border, so they never shift the chevron.

```tsx
import { Select } from "@steez-ui/ui";

<Select label="Model" labelStyle="notch" iconStack
  options={options} value={model} onValueChange={setModel} />
```

Options have a unique `value`, text `label`, optional `disabled`, and optional
`icons` array (`{ id, label, icon }`). Icons are decorative 28px circles with
12px overlap. Put essential provider information in the option label. The native
option menu displays text; its appearance follows the browser and operating system.
`onChange` receives the native event; `onValueChange` receives its string value.
Use `defaultValue` for uncontrolled forms, and `name`, `required`, or `multiple`
for native form behavior. Icon stacks are intended for single selection.

Input, select, and textarea share one field frame and validation markup.
`Input` and `Textarea` also accept `labelStyle="plain" | "notch"`
and keep the plain style by default. Field styling uses `--field-width`,
`--field-background`, `--field-radius`, and `--focus-border-color`.

### Diamond slider

Use `Slider variant="diamond"` for a 5px track with accent progress and
a solid 20px square thumb. The thumb rotates 45 degrees while held and returns
on release with a 160ms ease transition. Reduced-motion preferences disable the
transition. There is no thumb border, shadow, or glow; keyboard focus outlines
the whole input. The native range has a 44px-high hit area and keeps keyboard,
touch, disabled, and native form behavior.

```tsx
<Slider
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

### Button shapes

Use `Button shape="crystal"` for the six-point shape. It shares Button variants,
size, native button/link behavior, disabled states, and accessible naming. Use
`orientation="vertical"` for the tall crystal shape. Crystal surfaces have no
glow, shadow, scaling, or rectangular hover fill.

```tsx
<Button shape="crystal" href="/app">Open app</Button>
<Button shape="crystal" orientation="vertical" iconOnly aria-label="New thread">
  <PlusIcon />
</Button>
```

Use `shape="cut"` for diagonal corner cuts. Choose any combination with
`cutCorners`, including an empty array, and set the depth with `cutSize` (a CSS
length, default `12px`). The default cuts are top-right and bottom-left.

```tsx
<Button shape="cut" cutCorners={["top-left", "bottom-right"]} cutSize="12px">
  Deploy
</Button>
```

`LoadingProgressBar` keeps its slanted segments by default. `variant="hp"` uses
thin upright segments and a compact value label:

```tsx
<LoadingProgressBar variant="hp" progress={72} valueLabel="36 / 50 HP" />
```

All fields use plain component names: Input, Select, Textarea, Checkbox, Radio,
RadioGroup, and Slider. `labelStyle="notch"` places the label into the top border;
`labelStyle="plain"` is the default. `Select iconStack` adds selected option icons.
The dropdown picker uses the same field background, border, font, and selection
colors in browsers supporting `appearance: base-select`. Other browsers retain
native selection. Keyboard input, form submission, validation, and reset remain
native in both cases.

### QuartzCrystal

`QuartzCrystal` is separate decorative artwork with the original nine CSS facets,
rotating-face cycle, and float. Liquid distortion is optional. Facets have no glow or drop shadow. It is always `aria-hidden`
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

## Composition and consistency

Use the smallest component family that provides the behavior you need. Visual
options belong on the same component when interaction and accessibility stay the
same; specialized artwork may remain separate while sharing lifecycle policy.

| Family | Shared foundation | Consumer choice |
| --- | --- | --- |
| Input, select, textarea | Field frame, label, focus, and descriptions | Plain/notched label; select icons are an option |
| Buttons and error actions | Button sizing, disabled state, and native button defaults | Use shape-specific actions only when the shape matters |
| Themed, bracket, and halo cards | CardFrame title/body structure | Surface decoration stays local to each card |
| Tabs and page tabs | TabList and roving focus | Content shell and appearance stay local |
| Ring, globe, volume, ramp, swipe, marquee, boiling lines, quartz | Shared motion lifecycle | `paused` freezes motion; offscreen, hidden tabs, and reduced motion pause automatically |
| Slider, loading bar, storage meter | Finite percentage bounds | Presentation varies; invalid values never create invalid widths |
| Stat and info values | Semantic success/warning/danger tokens | Layout and value formatting stay local |
| Status and errors | Live-region semantics and composable actions | Inline status by default; `placement="toast"` opts into viewport positioning |

`MarqueeStrip` uses `durationMs`, consistent with the kinetic components.

`StatusMessage` now defaults to inline placement. Existing consumers that need a
floating notification should add `placement="toast"`. Stat and info value tones
follow the canonical `--color-status-*` tokens rather than separate fallback palettes.

Further API changes should be evaluated as migrations rather than adding more
lookalike exports. TabbedPanel and PageTemplate now share controlled/uncontrolled
selection: provide `activeTab` / `activeSubTab` to control selection, or initialize
with `defaultTab` / `defaultSubTab`. SegmentedControl uses the same policy with
`value`, `defaultValue`, and `onValueChange`,
and now supports disabled options. Invalid or disabled selections display the
first enabled tab without firing callbacks. Callbacks report user changes only;
reselecting the current tab does not emit a change. TabbedPanel reports selection through `onTabChange` only.

ThemedCard, CornerBracketCard, and DottedHaloCard share `title`, `titleAs`,
`titleClassName`, `bodyClassName`, `actions`, and `headerClassName`. Actions sit
beside the title in a wrapping header; cards without actions retain their layout.
Use `titleAs="h3"` (or another supported value) to choose appropriate semantics.

Button and OverlayButton accept `iconOnly`. Setting it to `true`
requires `aria-label` or `aria-labelledby` in TypeScript and hides the decorative
content from assistive technology. Existing text buttons remain unchanged.

```tsx
<ThemedCard title="Activity" titleAs="h3" actions={
  <Button iconOnly aria-label="Refresh activity"><RefreshIcon /></Button>
}>
  <TabbedPanel tabs={tabs} defaultTab="recent" onTabChange={setTab} />
</ThemedCard>
```

Specialized widget sizing and canvas scheduling stay separate from these shared
contracts. Future consolidation should preserve these distinct behaviors rather
than introduce flags that mix unrelated component responsibilities.


### Content filters

DisplacementFilter, ChromaticAberrationFilter, GlowFilter, and GrainFilter wrap
one copy of arbitrary React content with SVG filtering. Native attributes go on
the outer wrapper; buttons and links inside keep their behavior and accessible
names. Each instance owns unique SVG ids, so filters can be nested or repeated.

All accept `intensity="subtle" | "default" | "intense"`, `trigger`, `speedMs`
(milliseconds per frame), and `paused`. New color and texture filters default to
`trigger="static"`; displacement retains `"always"`. `"hover"` activates on
pointer hover or keyboard focus within. Animated modes pause offscreen and when
the document is hidden. Reduced motion keeps new filters static and removes
displacement, preserving its existing policy.

| Filter | Controls | Effect |
| --- | --- | --- |
| DisplacementFilter | `scale` (0–100) | Turbulence warp |
| ChromaticAberrationFilter | `offset` (0–24), `axis` | Red/cyan channel separation |
| GlowFilter | `radius` (0–24), `color`, `opacity` (0–1) | Alpha-derived halo |
| GrainFilter | `amount` (0–1), `frequency` (0.05–1) | Monochrome soft-light noise |

Numeric overrides take precedence over intensity presets. Non-finite inputs use
safe defaults. Filter bounds expand by 30%; ancestor overflow clipping can still
clip halos. SVG filters create a containing block, so place viewport-fixed UI
outside the filtered content. Use glow on transparent artwork or text when you
want a silhouette halo; an opaque surface produces a rectangular halo.

```tsx
<GlowFilter color="#7dd3fc" radius={5}>
  <ChromaticAberrationFilter trigger="hover" offset={2}>
    <Button>Open signal</Button>
  </ChromaticAberrationFilter>
</GlowFilter>
```


### Choice controls and typography

Checkbox and radio share shape, focus, disabled, and reduced-motion styling.
Checkbox accepts native `onChange` events and `onCheckedChange` for boolean
values. Radio groups support
controlled `value` or native uncontrolled `defaultValue`, `onValueChange`, disabled groups/options, form submission, and native reset.

Controls and structural card/section titles use `--font-mono`, whose preferred
family is Maple Mono. Consumers load their font separately; tokens keep a
monospace fallback. The docs bundle Maple Mono locally at 400/500/600/700 weights
via `@fontsource/maple-mono`, so the site has no runtime font CDN dependency.


CopyButton forwards native button attributes and click handlers. Preventing the
click default cancels copying; `disabled` prevents it. Pending writes expose
`aria-busy` and temporarily disable the control to prevent duplicate requests.
Every completed copy restarts the feedback timer; unmounting cancels feedback.
PageHeader renders static branding without an action, names clickable branding
from `brandAriaLabel`, `brandTitle`, or the page title, and exposes viewer state
through `aria-pressed`. Native attributes apply to its outer header element.

### Color and surface filters

`DuotoneFilter` maps luminance between two six-digit hex colors, `PosterizeFilter`
reduces each color channel to 2–16 shades, and `EmbossFilter` adds diagonal edge
relief. Each preserves transparent areas and wraps content without duplicating it.
They default to a static effect and share `intensity`, `trigger`, `paused`, and
`speedMs` with the other content filters.

```tsx
<DuotoneFilter shadowColor="#222244" highlightColor="#ffb87a">
  <img src="/artwork.png" alt="Artwork" />
</DuotoneFilter>
<PosterizeFilter levels={4}><img src="/artwork.png" alt="Artwork" /></PosterizeFilter>
<EmbossFilter strength={1}><img src="/artwork.png" alt="Artwork" /></EmbossFilter>
```

### IconBackground

A decorative grid of squares or repeated custom artwork. `variant="magnetic"`
rotates every cell toward the pointer, including when the grid sits behind other
content. `variant="static"` is the default. The grid ignores pointer input and is
hidden from assistive technology; pass decorative icons, not interactive content.
Pointer updates share one animation frame and stop when paused, offscreen, in a
hidden tab, or under reduced motion. Touch input leaves the grid still.

```tsx
<IconBackground variant="magnetic" columns={9} rows={7}
  size={40} gap={24} color="#fece00" />
<IconBackground icon={<LightCrossIcon />} variant="magnetic" />
```

The grid fits its container. `size` and `gap` are in pixels. Columns and rows are
bounded to 1–24 each, size to 4–200, and gap to 0–100. Use a positioned parent and
`style={{ position: "absolute", inset: 0 }}` to layer it behind your content.
