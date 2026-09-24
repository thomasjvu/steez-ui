import path from "node:path";

/** Production default; override with STEEZ_REGISTRY_BASE_URL for localhost demos. */
export const DEFAULT_REGISTRY_BASE_URL = "https://steez-ui-6v5.pages.dev/r-steez";

/**
 * Bare names become absolute registry URLs so shadcn can resolve deps off-host.
 * Already-absolute deps are left unchanged.
 */
export function toAbsoluteRegistryDependency(
  dependency,
  registryBaseUrl = DEFAULT_REGISTRY_BASE_URL,
) {
  if (!dependency || typeof dependency !== "string") return dependency;
  if (/^https?:\/\//i.test(dependency)) return dependency;
  const name = dependency.replace(/\.json$/i, "");
  return `${registryBaseUrl.replace(/\/$/, "")}/${name}.json`;
}

/**
 * Package sources use TypeScript extensions so source bundlers can resolve
 * them directly. Registry files are copied into TypeScript consumers, where
 * extensionless imports resolve through the consumer's normal TS/bundler rules.
 */
const relativeImportPattern =
  /((?:\bfrom\s+|\bimport\s*(?:\(\s*)?|\bexport\s+from\s*)["'])(\.\.?\/[^"']+)(["'])/g;

export function makeRegistryContentPortable(content) {
  return content.replace(relativeImportPattern, (_match, prefix, specifier, suffix) => {
    const portableSpecifier = specifier.replace(/\.(?:cjs|jsx?|mjs|tsx?)$/i, "");
    return `${prefix}${portableSpecifier}${suffix}`;
  });
}

/**
 * Build the one-to-one source ownership map used to wire shared files as
 * registry dependencies. Duplicate owners are always an authoring error.
 */
export function buildSourceOwners(items) {
  const owners = new Map();

  for (const item of items) {
    for (const file of item.files) {
      if (owners.has(file.source)) {
        throw new Error(`Duplicate source: ${file.source}`);
      }
      owners.set(file.source, { item: item.name, target: file.target });
    }
  }

  return owners;
}

/**
 * Resolve a relative source import to its owning registry item. The explicit
 * error keeps a new source file from silently producing an incomplete payload.
 */
export function resolveRegistryImport(sourcePath, specifier, owners) {
  const resolved = path.posix.normalize(
    path.posix.join(path.posix.dirname(sourcePath), specifier),
  );
  const candidates = [
    resolved,
    resolved.replace(/\.js$/, ".tsx"),
    resolved.replace(/\.js$/, ".ts"),
    `${resolved}.tsx`,
    `${resolved}.ts`,
  ];
  const owner = candidates.map((candidate) => owners.get(candidate)).find(Boolean);

  if (!owner) {
    throw new Error(`Unresolved registry import: ${sourcePath} -> ${specifier}`);
  }

  return { resolved, owner };
}

/**
 * Infer registry dependencies from source contents while preserving the
 * explicitly declared dependency order.
 */
export function collectRegistryDependencies(item, sourceContents, owners) {
  const registryDependencies = new Set(
    item.registryDependencies.filter((dependency) => dependency !== "icon-provider"),
  );

  for (const { sourcePath, content } of sourceContents) {
    if (content.includes('"@steez-ui/icons"')) {
      registryDependencies.add("icon-provider");
    }

    for (const match of content.matchAll(/(?:from\s*|import\s*)["'](\.[^"']+)["']/g)) {
      const { owner } = resolveRegistryImport(sourcePath, match[1], owners);
      if (owner.item !== item.name) {
        registryDependencies.add(owner.item);
      }
    }
  }

  return [...registryDependencies];
}
