import type { ComponentDocDetails } from "../component-catalog";

export const FORM_DOCS = [
  {
    slug: "input",
    summary:
      "Monospace text input with label, helper copy, and optional leading icon.",
    tags: ["text", "field", "helper"],
  },
  {
    slug: "select",
    summary:
      "Native selection with optional icon stacking and a plain or notched label.",
    tags: ["select", "options"],
  },
  {
    slug: "textarea",
    summary:
      "Shared multiline input for prompts, notes, and longer authored content.",
    tags: ["textarea", "prompt", "multiline"],
  },
  {
    slug: "checkbox",
    summary: "Checkbox primitive with label and Steez form spacing.",
    tags: ["boolean", "settings"],
  },
  {
    slug: "radio",
    summary: "Radio and radio-group primitives for exclusive choices.",
    tags: ["choice", "group"],
  },
  {
    slug: "slider",
    summary:
      "Native range with value display and an optional square-to-diamond thumb.",
    tags: ["range", "tuning"],
  },
] satisfies ComponentDocDetails[];
