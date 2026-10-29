import { ACTION_DOCS } from "./catalog/actions";
import { FEEDBACK_DOCS } from "./catalog/feedback";
import { FILTER_DOCS } from "./catalog/filters";
import { FORM_DOCS } from "./catalog/forms";
import { LAYOUT_DOCS } from "./catalog/layout";
import { SURFACE_DOCS } from "./catalog/surfaces";
import { COMPONENT_USAGE } from "./catalog/usage";
import { COMPONENT_MANIFEST } from "./component-manifest.mjs";

export const COMPONENT_FILTERS = [
  { value: "all", label: "All" },
  { value: "actions", label: "Actions" },
  { value: "forms", label: "Forms" },
  { value: "surfaces", label: "Surfaces" },
  { value: "filters", label: "Filters" },
  { value: "layout", label: "Layout" },
  { value: "feedback", label: "Feedback" },
] as const;

export type ComponentFilter = (typeof COMPONENT_FILTERS)[number]["value"];
export type ComponentCategory = Exclude<ComponentFilter, "all">;

export const COMPONENT_CATEGORY_LABELS = Object.fromEntries(
  COMPONENT_FILTERS.filter((filter) => filter.value !== "all").map((filter) => [
    filter.value,
    filter.label,
  ]),
) as Record<ComponentCategory, string>;

export interface ComponentDoc {
  slug: string;
  title: string;
  category: ComponentCategory;
  summary: string;
  description: string;
  packageImport: string;
  usage: string;
  tags: string[];
}

/** Hand-written catalog copy; title, category and imports come from the manifest. */
export type ComponentDocDetails = Pick<ComponentDoc, "summary" | "tags"> & {
  slug: string;
};

const DETAILS_BY_CATEGORY: Record<ComponentCategory, ComponentDocDetails[]> = {
  actions: ACTION_DOCS,
  forms: FORM_DOCS,
  surfaces: SURFACE_DOCS,
  filters: FILTER_DOCS,
  layout: LAYOUT_DOCS,
  feedback: FEEDBACK_DOCS,
};

const manifestBySlug = new Map(
  COMPONENT_MANIFEST.map((manifest) => [manifest.slug, manifest]),
);

function toComponentDoc(
  details: ComponentDocDetails,
  category: ComponentCategory,
): ComponentDoc {
  const manifest = manifestBySlug.get(details.slug);
  if (!manifest) {
    throw new Error(`Missing component manifest entry for ${details.slug}`);
  }
  if (manifest.category !== category) {
    throw new Error(
      `${details.slug} is filed under ${category} but the manifest says ${manifest.category}`,
    );
  }
  const usage = COMPONENT_USAGE[details.slug];
  if (usage === undefined) {
    throw new Error(`Missing usage example for ${details.slug}`);
  }

  return {
    slug: manifest.slug,
    title: manifest.slug === "select" ? "Select" : manifest.title,
    category,
    summary: details.summary,
    description: manifest.description,
    packageImport: `import { ${manifest.slug === "select" || manifest.slug === "icon-stack-select" ? "Select" : manifest.packageExports.join(", ")} } from "${manifest.packageEntrypoint}";`,
    usage,
    tags: details.tags,
  };
}

export const COMPONENT_DOCS: ComponentDoc[] = (
  Object.entries(DETAILS_BY_CATEGORY) as [ComponentCategory, ComponentDocDetails[]][]
).flatMap(([category, details]) =>
  details.map((item) => toComponentDoc(item, category)),
);

export function getComponentDoc(slug: string) {
  return COMPONENT_DOCS.find((component) => component.slug === slug);
}
