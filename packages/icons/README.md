# @steez-ui/icons

Shared icon surface and provider for **Steez UI**.

## Install

```bash
pnpm add @steez-ui/icons
```

Peer: `react` >= 18.

## Usage

```tsx
import { Icon, CheckIcon, SteezIconProvider } from "@steez-ui/icons";

export function Example() {
  return (
    <SteezIconProvider>
      <Icon icon="check" />
      <CheckIcon />
    </SteezIconProvider>
  );
}
```

Pair with `@steez-ui/theme` (tokens) and `@steez-ui/ui` (primitives).
