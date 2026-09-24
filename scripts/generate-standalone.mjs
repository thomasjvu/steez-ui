import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { COMPONENT_MANIFEST } from "../lib/docs/component-manifest.mjs";
import {
  collectPortableImports,
  makeReactImportSource,
  makeStyleBootstrap,
  parseModuleImports,
  parseTokenValues,
  transformCssModule,
  transformSource,
} from "./lib/standalone-transform.mjs";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const defaultRepoRoot = path.resolve(scriptDirectory, "..");

const ICON_TYPE_SOURCE = "packages/icons/src/types.ts";
const ICON_PROVIDER_SOURCE = "packages/icons/src/IconProvider.tsx";
const ICONS_SOURCE = "packages/icons/src/icons.tsx";
const ICON_COMPONENT_SOURCE = "packages/icons/src/Icon.tsx";

function isRelativeImport(source) {
  return source.startsWith(".");
}

function isStyleImport(source) {
  return source.endsWith(".css") || source.endsWith(".module.css");
}

function parseDefaultBinding(clause) {
  const match = clause.match(/^(?:type\s+)?([A-Za-z_$][\w$]*)/);
  return match?.[1] ?? null;
}

function isIconTypeOnlyImport(clause) {
  if (clause.trim().startsWith("type ")) {
    return true;
  }

  const namedStart = clause.indexOf("{");
  if (namedStart === -1) {
    return false;
  }

  return clause
    .slice(namedStart)
    .replace(/^\{/, "")
    .replace(/\}$/, "")
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .every((part) => part.startsWith("type "));
}

async function resolveSourceFile(repoRoot, importerPath, specifier) {
  const importerDirectory = path.dirname(importerPath);
  const cleanSpecifier = specifier.replace(/\.(?:cjs|jsx?|mjs)$/i, "");
  const candidates = [
    path.resolve(importerDirectory, specifier),
    path.resolve(importerDirectory, cleanSpecifier),
    path.resolve(importerDirectory, `${cleanSpecifier}.ts`),
    path.resolve(importerDirectory, `${cleanSpecifier}.tsx`),
    path.resolve(importerDirectory, `${cleanSpecifier}.css`),
    path.resolve(importerDirectory, `${cleanSpecifier}.module.css`),
  ];

  for (const candidate of candidates) {
    if (!candidate.startsWith(repoRoot)) {
      continue;
    }

    try {
      await fs.stat(candidate);
      return candidate;
    } catch {
      // Try the next extension candidate.
    }
  }

  return null;
}

function sourceKey(repoRoot, absolutePath) {
  return path.relative(repoRoot, absolutePath).split(path.sep).join("/");
}

function toCssObjectName(prefix) {
  return `__styles_${prefix.replace(/[^A-Za-z0-9_$]/g, "_")}`;
}

function extractStyleBinding(imported) {
  if (!isStyleImport(imported.source)) {
    return null;
  }

  return {
    binding: parseDefaultBinding(imported.clause),
    source: imported.source,
  };
}

async function makeStandaloneForComponent({ repoRoot, component, tokenValues }) {
  const entryPath = path.resolve(repoRoot, component.registryFiles[0].source);
  const sourceCache = new Map();
  const cssCache = new Map();
  const orderedSources = [];
  const visitedSources = new Set();
  const externalImports = new Set();
  const reactImports = { values: new Set(), types: new Set() };
  const styleModules = new Map();
  const stylePrefix = `steez-${component.slug}`;

  async function readSource(absolutePath) {
    if (!sourceCache.has(absolutePath)) {
      sourceCache.set(absolutePath, await fs.readFile(absolutePath, "utf8"));
    }
    return sourceCache.get(absolutePath);
  }

  async function readCss(absolutePath) {
    if (!cssCache.has(absolutePath)) {
      cssCache.set(absolutePath, await fs.readFile(absolutePath, "utf8"));
    }
    return cssCache.get(absolutePath);
  }

  function ensureStyleModule(absolutePath) {
    const key = sourceKey(repoRoot, absolutePath);
    if (!styleModules.has(key)) {
      styleModules.set(key, {
        key,
        absolutePath,
        prefix: `${stylePrefix}-${styleModules.size}`,
        variableName: toCssObjectName(`${stylePrefix}-${styleModules.size}`),
        rawCss: null,
        transformed: null,
      });
    }
    return styleModules.get(key);
  }

  async function visit(absolutePath) {
    if (visitedSources.has(absolutePath)) {
      return;
    }

    const source = await readSource(absolutePath);
    const imports = parseModuleImports(source);
    visitedSources.add(absolutePath);

    for (const imported of imports) {
      if (imported.source === "@steez-ui/icons") {
        await visit(path.resolve(repoRoot, ICON_TYPE_SOURCE));
        if (!isIconTypeOnlyImport(imported.clause)) {
          await visit(path.resolve(repoRoot, ICON_PROVIDER_SOURCE));
          await visit(path.resolve(repoRoot, ICONS_SOURCE));
          await visit(path.resolve(repoRoot, ICON_COMPONENT_SOURCE));
        }
        continue;
      }

      if (!isRelativeImport(imported.source)) {
        collectPortableImports(imported.fullText, { reactImports, externalImports });
        continue;
      }

      const dependencyPath = await resolveSourceFile(repoRoot, absolutePath, imported.source);
      if (!dependencyPath) {
        throw new Error(`Could not resolve standalone import: ${sourceKey(repoRoot, absolutePath)} -> ${imported.source}`);
      }

      if (isStyleImport(imported.source)) {
        ensureStyleModule(dependencyPath);
        continue;
      }

      await visit(dependencyPath);
    }

    orderedSources.push({
      absolutePath,
      source,
      isEntry: absolutePath === entryPath,
    });
  }

  await visit(entryPath);

  for (const sourceRecord of orderedSources) {
    for (const imported of parseModuleImports(sourceRecord.source)) {
      if (!isRelativeImport(imported.source) || !isStyleImport(imported.source)) {
        continue;
      }

      const cssPath = await resolveSourceFile(repoRoot, sourceRecord.absolutePath, imported.source);
      if (cssPath) {
        ensureStyleModule(cssPath);
      }
    }
  }

  for (const style of styleModules.values()) {
    style.rawCss = await readCss(style.absolutePath);
    const transformed = transformCssModule(style.rawCss, {
      classPrefix: style.prefix,
      tokenValues,
    });
    style.transformed = {
      ...transformed,
      objectSource: transformed.objectSource.replace(
        toCssObjectName(style.prefix),
        style.variableName,
      ),
    };
  }

  const styleBindingsBySource = new Map();
  for (const sourceRecord of orderedSources) {
    const bindings = new Map();
    for (const imported of parseModuleImports(sourceRecord.source)) {
      const styleBinding = extractStyleBinding(imported);
      if (!styleBinding?.binding) {
        continue;
      }

      const cssPath = await resolveSourceFile(repoRoot, sourceRecord.absolutePath, styleBinding.source);
      if (!cssPath) {
        throw new Error(`Could not resolve standalone stylesheet: ${sourceKey(repoRoot, sourceRecord.absolutePath)} -> ${styleBinding.source}`);
      }
      bindings.set(styleBinding.binding, ensureStyleModule(cssPath).variableName);
    }
    styleBindingsBySource.set(sourceRecord.absolutePath, bindings);
  }

  for (const sourceRecord of orderedSources) {
    collectPortableImports(sourceRecord.source, { reactImports, externalImports });
  }

  const css = [...styleModules.values()]
    .map((style) => `/* ${style.key} */\n${style.transformed.css}`)
    .join("\n\n");
  const styleObjects = [...styleModules.values()]
    .map((style) => style.transformed.objectSource)
    .join("\n\n");
  const source = orderedSources
    .map((sourceRecord) => transformSource({
      source: sourceRecord.source,
      isEntry: sourceRecord.isEntry,
      styleBindings: styleBindingsBySource.get(sourceRecord.absolutePath) ?? new Map(),
      styleVariables: [],
    }))
    .join("\n\n");

  const externalImportSource = [...externalImports].sort().join("\n");
  const header = `/**
 * Standalone Steez UI copy of ${component.title}.
 *
 * Generated from ${component.registryFiles[0].source} by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

${makeReactImportSource(reactImports)}${externalImportSource ? `\n${externalImportSource}` : ""}

${styleObjects}${styleObjects ? "\n\n" : ""}${makeStyleBootstrap(css, component.slug)}

${source}
`;

  return {
    source,
    output: header,
    externalDependencies: [...externalImports]
      .map((statement) => statement.match(/from\s+["']([^"']+)["']/)?.[1])
      .filter(Boolean)
      .sort(),
    sourceFiles: [...visitedSources].map((file) => sourceKey(repoRoot, file)),
    styleFiles: [...styleModules.keys()],
  };
}

export async function generateStandaloneComponents({ repoRoot = defaultRepoRoot } = {}) {
  const outputDirectory = path.join(repoRoot, "public/copy/steez");
  const tokenCss = await fs.readFile(path.join(repoRoot, "packages/theme/src/tokens.css"), "utf8");
  const tokenValues = parseTokenValues(tokenCss);
  const index = [];

  await fs.rm(outputDirectory, { recursive: true, force: true });
  await fs.mkdir(outputDirectory, { recursive: true });

  for (const component of COMPONENT_MANIFEST) {
    const standalone = await makeStandaloneForComponent({ repoRoot, component, tokenValues });
    const outputPath = path.join(outputDirectory, `${component.slug}.tsx`);
    await fs.writeFile(outputPath, standalone.output);
    index.push({
      name: component.slug,
      title: component.title,
      path: `/copy/steez/${component.slug}.tsx`,
      exports: component.packageExports,
      dependencies: ["react", ...standalone.externalDependencies],
      sourceFiles: standalone.sourceFiles,
      styleFiles: standalone.styleFiles,
    });
  }

  await fs.writeFile(
    path.join(outputDirectory, "index.json"),
    `${JSON.stringify(index, null, 2)}\n`,
  );

  console.log(`Generated ${index.length} standalone component copies in public/copy/steez.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await generateStandaloneComponents();
}
