import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      "**/.next/**",
      "**/dist/**",
      "**/tmp/**",
      "**/coverage/**",
      "**/out/**",
      "**/build/**",
      "**/.pages-dist/**",
      "public/copy/steez/**",
      "next-env.d.ts",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // These components are framework-agnostic package source and must keep
    // native image elements; Next.js image optimization is consumer-specific.
    // Boston is frozen archival shadcn demo code and is not part of the Next app.
    files: [
      "packages/ui/src/components/AccordionFeatureCard.tsx",
      "packages/ui/src/components/CharacterAfterimage.tsx",
      "packages/react/src/components/media.tsx",
      "registry/boston/blocks/angled-corner-cards/angled-corner-cards.tsx",
      "registry/boston/blocks/boiling-lines-effect/boiling-lines-effect.tsx",
    ],
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
];

export default eslintConfig;
