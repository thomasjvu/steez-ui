export type RegistryCategory =
  | "starter"
  | "form"
  | "effect"
  | "layout"
  | "pattern"

export type RegistryItem = {
  name: string
  title: string
  description: string
  category: RegistryCategory
  /** Prefer shorter height for marquee-like demos */
  compact?: boolean
}

/** Public registry blocks shown on the landing page (order = showcase order). */
export const registryItems: RegistryItem[] = [
  {
    name: "steezy-hello-world",
    title: "Steezy Hello World",
    description: "A simple starter component for Steezy UI.",
    category: "starter",
  },
  {
    name: "example-form",
    title: "Example Form",
    description: "A contact form with Zod validation.",
    category: "form",
  },
  {
    name: "complex-component",
    title: "Complex Component",
    description: "Hooks, libs, and nested components in one block.",
    category: "pattern",
  },
  {
    name: "example-with-css",
    title: "Example with CSS",
    description: "A login form shipped with its own CSS file.",
    category: "form",
  },
  {
    name: "boiling-lines-effect",
    title: "Boiling Lines Effect",
    description: "Hand-drawn boiling line displacement for transparent line art.",
    category: "effect",
  },
  {
    name: "boiling-lines-subtle",
    title: "Boiling Lines Subtle",
    description: "Softer, calmer jitter variant of boiling lines.",
    category: "effect",
  },
  {
    name: "boiling-lines-intense",
    title: "Boiling Lines Intense",
    description: "Punchier hand-drawn jitter for high-energy art.",
    category: "effect",
  },
  {
    name: "boiling-lines-presets",
    title: "Boiling Lines Presets",
    description: "Install default, subtle, and intense boiling lines together.",
    category: "effect",
  },
  {
    name: "pattern-pushdown-cards",
    title: "Pattern Pushdown Cards",
    description: "Patterned grid with tactile pushdown card interactions.",
    category: "layout",
  },
  {
    name: "infinite-marquee",
    title: "Infinite Marquee",
    description: "Rounded looping marquee pill with optional hover pause.",
    category: "layout",
    compact: true,
  },
  {
    name: "angled-corner-cards",
    title: "Angled Corner Cards",
    description: "Accordion-style cards with clipped corners and image rail.",
    category: "layout",
  },
]

export const categoryLabels: Record<RegistryCategory, string> = {
  starter: "Starter",
  form: "Form",
  effect: "Effect",
  layout: "Layout",
  pattern: "Pattern",
}

export function installCommand(name: string, baseUrl: string) {
  const origin = baseUrl.replace(/\/$/, "")
  return `pnpm dlx shadcn@latest add ${origin}/r/${name}.json`
}
