import { component, STABLE_ID_HOOK, THEMED_WITH_ICONS } from "./define.mjs";

/** @type {import("./define.mjs").ComponentManifestEntry[]} */
export const FORM_MANIFEST = [
  component({
    slug: "input",
    name: "Input",
    category: "forms",
    title: "Input",
    description: "Monospace input with shared Steez form framing.",
    extraFiles: [STABLE_ID_HOOK],
    ...THEMED_WITH_ICONS,
    registryDependencies: [
      ...THEMED_WITH_ICONS.registryDependencies,
      "field-frame",
    ],
  }),
  component({
    slug: "select",
    name: "Select",
    category: "forms",
    title: "Select",
    description:
      "Native browser selection with optional cut label, icon stack, helper text, and validation.",
    extraFiles: [STABLE_ID_HOOK],
    ...THEMED_WITH_ICONS,
    registryDependencies: [
      ...THEMED_WITH_ICONS.registryDependencies,
      "field-frame",
    ],
  }),
  component({
    slug: "textarea",
    name: "Textarea",
    category: "forms",
    title: "Textarea",
    description: "Native multiline input with a plain or notched label.",
    extraFiles: [STABLE_ID_HOOK],
    ...THEMED_WITH_ICONS,
    registryDependencies: [
      ...THEMED_WITH_ICONS.registryDependencies,
      "field-frame",
    ],
  }),
  component({
    slug: "checkbox",
    name: "Checkbox",
    category: "forms",
    title: "Checkbox",
    description: "Checkbox primitive for Steez forms.",
    css: false,
    extraFiles: [STABLE_ID_HOOK],
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens"],
  }),
  component({
    slug: "radio",
    name: "RadioGroup",
    category: "forms",
    title: "Radio",
    description: "Radio and radio group primitives.",
    files: [
      {
        source: "packages/ui/src/components/Radio.tsx",
        target: "components/steez/Radio.tsx",
        type: "registry:component",
      },
      {
        source: "packages/ui/src/components/Radio.module.css",
        target: "components/steez/Radio.module.css",
        type: "registry:style",
      },
      {
        source: "packages/ui/src/hooks/useStableId.ts",
        target: "components/hooks/useStableId.ts",
        type: "registry:file",
      },
    ],
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens"],
  }),
  component({
    slug: "slider",
    name: "Slider",
    category: "forms",
    title: "Slider",
    description:
      "Native range input with progress and value display. The diamond variant has a slim track and a solid square thumb that rotates while held; both variants retain native keyboard controls.",
    extraFiles: [STABLE_ID_HOOK],
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens"],
  }),
];
