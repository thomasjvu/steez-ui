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

Pair with `@steez-ui/icons` and `@steez-ui/ui` for the full canonical stack.
