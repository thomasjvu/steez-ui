const IMPORT_PATTERN = /(^|\n)[ \t]*import\s+([\s\S]*?)\s+from\s+["']([^"']+)["'];?[ \t]*(?=\n|$)/g;
const CLASS_SELECTOR_PATTERN = /(?<![\w-])\.([A-Za-z_][\w-]*)/g;
const KEYFRAME_PATTERN = /@(?:-webkit-)?keyframes\s+([A-Za-z_][\w-]*)/g;
const CSS_VARIABLE_PATTERN = /var\(\s*(--[\w-]+)\s*\)/g;

const REACT_TYPE_NAMES = new Set([
  "AnimationEvent",
  "AriaAttributes",
  "CSSProperties",
  "ChangeEvent",
  "ClipboardEvent",
  "CompositionEvent",
  "DragEvent",
  "FocusEvent",
  "FormEvent",
  "HTMLAttributes",
  "InputHTMLAttributes",
  "KeyboardEvent",
  "MouseEvent",
  "ReactElement",
  "ReactNode",
  "RefObject",
  "SelectHTMLAttributes",
  "SyntheticEvent",
  "TextareaHTMLAttributes",
  "TouchEvent",
  "UIEvent",
  "WheelEvent",
]);

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function toCamelCase(value) {
  return value.replace(/-([a-z])/g, (_match, character) => character.toUpperCase());
}

function parseNamedImports(body) {
  return body
    .replace(/^type\s+/, "")
    .replace(/^\{/, "")
    .replace(/\}$/, "")
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

function importBindingName(specifier) {
  return specifier.replace(/^type\s+/, "").split(/\s+as\s+/)[0].trim();
}

function collectReactImport(clause, imports) {
  let trimmed = clause.trim();
  const typeOnly = trimmed.startsWith("type ");
  if (typeOnly) {
    trimmed = trimmed.slice("type ".length).trim();
  }

  const namedStart = trimmed.indexOf("{");
  if (namedStart === -1) {
    return;
  }

  const namedBody = trimmed.slice(namedStart);
  for (const specifier of parseNamedImports(namedBody)) {
    const explicitlyTypeOnly = specifier.startsWith("type ");
    const name = importBindingName(specifier);
    if (!name) {
      continue;
    }

    const target = typeOnly || explicitlyTypeOnly || REACT_TYPE_NAMES.has(name)
      ? imports.types
      : imports.values;
    target.add(specifier.replace(/^type\s+/, ""));
  }
}

function resolveTokenValue(tokenName, tokenValues, seen = new Set()) {
  if (seen.has(tokenName)) {
    return undefined;
  }

  const value = tokenValues.get(tokenName);
  if (!value) {
    return undefined;
  }

  const nextSeen = new Set(seen);
  nextSeen.add(tokenName);
  return value.replace(CSS_VARIABLE_PATTERN, (match, nestedName) => {
    const nestedValue = resolveTokenValue(nestedName, tokenValues, nextSeen);
    return nestedValue ?? match;
  });
}

export function parseTokenValues(tokensCss) {
  const values = new Map();
  for (const match of tokensCss.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
    if (!values.has(match[1])) {
      values.set(match[1], match[2].trim());
    }
  }
  return values;
}

function addStandaloneFallbacks(css, tokenValues) {
  return css.replace(CSS_VARIABLE_PATTERN, (match, tokenName) => {
    const fallback = resolveTokenValue(tokenName, tokenValues);
    return fallback ? `var(${tokenName}, ${fallback})` : match;
  });
}

function transformKeyframes(css, prefix) {
  const names = [...css.matchAll(KEYFRAME_PATTERN)].map((match) => match[1]);
  let transformed = css;
  for (const name of names) {
    const scopedName = `${prefix}-${name}`;
    transformed = transformed.replace(
      new RegExp(`(?<![-\\w])${escapeRegExp(name)}(?![-\\w])`, "g"),
      scopedName,
    );
  }
  return transformed;
}

export function transformCssModule(css, { classPrefix, tokenValues }) {
  const classNames = new Set([...css.matchAll(CLASS_SELECTOR_PATTERN)].map((match) => match[1]));
  const classMap = new Map();

  for (const className of classNames) {
    classMap.set(className, `${classPrefix}-${className}`);
  }

  let transformed = transformKeyframes(css, classPrefix);
  transformed = transformed.replace(CLASS_SELECTOR_PATTERN, (_match, className) => {
    return `.${classMap.get(className) ?? `${classPrefix}-${className}`}`;
  });
  transformed = addStandaloneFallbacks(transformed, tokenValues);

  const entries = [];
  for (const [className, scopedName] of classMap) {
    entries.push(`  ${JSON.stringify(className)}: ${JSON.stringify(scopedName)},`);
    const camelName = toCamelCase(className);
    if (camelName !== className) {
      entries.push(`  ${JSON.stringify(camelName)}: ${JSON.stringify(scopedName)},`);
    }
  }

  return {
    classMap,
    css: transformed,
    objectSource: `const __styles_${classPrefix.replace(/[^A-Za-z0-9_$]/g, "_")}: Record<string, string> = {\n${entries.join("\n")}\n};`,
  };
}

export function parseModuleImports(source) {
  return [...source.matchAll(IMPORT_PATTERN)].map((match) => ({
    clause: match[2].trim(),
    source: match[3],
    fullText: match[0],
  }));
}

export function collectPortableImports(source, { reactImports, externalImports }) {
  for (const imported of parseModuleImports(source)) {
    if (imported.source === "react") {
      collectReactImport(imported.clause, reactImports);
      continue;
    }

    if (imported.source === "@steez-ui/icons" || imported.source.startsWith(".")) {
      continue;
    }

    externalImports.add(imported.fullText.trim());
  }
}

export function makeReactImportSource(reactImports) {
  const lines = ["import * as React from \"react\";"];
  if (reactImports.values.size > 0) {
    lines.push(`import { ${[...reactImports.values].sort().join(", ")} } from \"react\";`);
  }
  if (reactImports.types.size > 0) {
    lines.push(`import type { ${[...reactImports.types].sort().join(", ")} } from \"react\";`);
  }
  return lines.join("\n");
}

export function transformSource({
  source,
  isEntry,
  styleBindings,
  styleVariables,
}) {
  let transformed = source
    .replace(/^\s*["']use client["'];?\s*/m, "")
    .replace(IMPORT_PATTERN, "\n");

  for (const [binding, variableName] of styleBindings) {
    transformed = transformed.replace(new RegExp(`\\b${escapeRegExp(binding)}\\b`, "g"), variableName);
  }

  if (!isEntry) {
    transformed = transformed.replace(/^\s*export default [A-Za-z_$][\w$]*;?\s*$/gm, "");
  }

  const localStyleDeclarations = [...styleVariables]
    .map((style) => style.objectSource)
    .join("\n\n");

  return `${localStyleDeclarations}${localStyleDeclarations ? "\n\n" : ""}${transformed.trim()}`;
}

export function escapeStandaloneTemplateLiteral(value) {
  return value.replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

export function makeStyleBootstrap(css, key) {
  if (!css.trim()) {
    return "";
  }

  return `const __steezStandaloneStyles = String.raw\`${escapeStandaloneTemplateLiteral(css)}\`;
const __steezStandaloneStyleKey = ${JSON.stringify(key)};

function __injectSteezStandaloneStyles() {
  if (typeof document === "undefined" || document.querySelector(\`style[data-steez-standalone="\${__steezStandaloneStyleKey}"]\`)) {
    return;
  }

  const style = document.createElement("style");
  style.setAttribute("data-steez-standalone", __steezStandaloneStyleKey);
  style.textContent = __steezStandaloneStyles;
  document.head.appendChild(style);
}

__injectSteezStandaloneStyles();`;
}
