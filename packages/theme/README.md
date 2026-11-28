# @steez-ui/theme

Design tokens and Tailwind preset for **Steez UI**.

## Install

```bash
pnpm add @steez-ui/theme
```

## Usage

Import CSS tokens once at the app root:

```tsx
import "@steez-ui/theme/tokens.css";
```

Optional Tailwind preset:

```js
// tailwind.config.js
import steezPreset from "@steez-ui/theme/tailwind-preset";

export default {
  presets: [steezPreset],
  // ...
};
```

The preset maps Tailwind utilities to the shared CSS tokens. It includes
`accent-*`, `surface-*`, `text-*`, status and border colors, tokenized spacing,
font families/sizes/weights, radii, shadows, transition timing, and z-index
utilities. For example, `bg-surface-raised`, `text-text-secondary`,
`p-panel`, `font-display`, `shadow-glow-red`, and `duration-fast` follow the
active token values, including the light theme overrides. Import `tokens.css`
for the variables before using these utilities.

Pair with `@steez-ui/icons` and `@steez-ui/ui` for the full canonical stack.
