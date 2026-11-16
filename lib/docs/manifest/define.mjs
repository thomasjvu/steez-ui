/** Shared types and builders for the component manifest (lib/docs/manifest/*). */

/** @typedef {{source: string; target: string; type: string}} RegistryFile */
/** @typedef {"actions"|"forms"|"surfaces"|"layout"|"feedback"|"filters"} ComponentCategory */
/**
 * Canonical metadata for one public @steez-ui/ui registry component.
 *
 * @typedef {{
 *   slug: string;
 *   title: string;
 *   description: string;
 *   category: ComponentCategory;
 *   packageEntrypoint: string;
 *   packageExports: string[];
 *   registryFiles: RegistryFile[];
 *   dependencies: string[];
 *   registryDependencies: string[];
 *   previewLoader?: string;
 * }} ComponentManifestEntry
 */

/** @type {RegistryFile} */
export const STABLE_ID_HOOK = {
  source: "packages/ui/src/hooks/useStableId.ts",
  target: "components/hooks/useStableId.ts",
  type: "registry:file",
};
/** Components styled with Steez theme tokens. */
export const THEMED = {
  dependencies: ["@steez-ui/theme"],
  registryDependencies: ["theme-tokens"],
};
/** Themed components that also render Steez icons. */
export const THEMED_WITH_ICONS = {
  dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
  registryDependencies: ["theme-tokens", "icon-provider"],
};
/** @type {RegistryFile} */
export const BUTTON_STYLES = {
  source: "packages/ui/src/styles/Buttons.module.css",
  target: "components/styles/Buttons.module.css",
  type: "registry:style",
};

/**
 * Colocated parts of a component, e.g. colocated("HexagonGrid", ["model"])
 * ships HexagonGrid.model.ts next to HexagonGrid.tsx.
 * @param {string} name
 * @param {string[]} parts
 * @returns {RegistryFile[]}
 */
export function colocated(name, parts) {
  return parts.map((part) => ({
    source: `packages/ui/src/components/${name}.${part}.ts`,
    target: `components/steez/${name}.${part}.ts`,
    type: "registry:file",
  }));
}

/**
 * One manifest entry. Defaults cover the common case: a single export from
 * @steez-ui/ui whose files are <Name>.tsx plus <Name>.module.css, previewed
 * by a loader named after the slug.
 * @param {{
 *   slug: string;
 *   name: string;
 *   category: ComponentCategory;
 *   title: string;
 *   description: string;
 *   exports?: string[];
 *   entrypoint?: string;
 *   css?: boolean;
 *   extraFiles?: RegistryFile[];
 *   files?: RegistryFile[];
 *   dependencies?: string[];
 *   registryDependencies?: string[];
 * }} options
 * @returns {ComponentManifestEntry}
 */
export function component({
  slug,
  name,
  category,
  title,
  description,
  exports = [name],
  entrypoint = "@steez-ui/ui",
  css = true,
  extraFiles = [],
  files,
  dependencies = [],
  registryDependencies = [],
}) {
  const base = `packages/ui/src/components/${name}`;
  const target = `components/steez/${name}`;
  return {
    slug,
    title,
    description,
    category,
    packageEntrypoint: entrypoint,
    packageExports: exports,
    registryFiles: files ?? [
      {
        source: `${base}.tsx`,
        target: `${target}.tsx`,
        type: "registry:component",
      },
      ...(css
        ? [
            {
              source: `${base}.module.css`,
              target: `${target}.module.css`,
              type: "registry:style",
            },
          ]
        : []),
      ...extraFiles,
    ],
    dependencies,
    registryDependencies,
    previewLoader: slug,
  };
}
