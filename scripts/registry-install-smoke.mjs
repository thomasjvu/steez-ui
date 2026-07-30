import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const registryDir = path.join(repoRoot, "public/r-steez");
const sampleDir = path.join(repoRoot, "tmp/registry-install-smoke");

/** Accept bare names or absolute registry URLs; load from public/r-steez by basename. */
function dependencyBasename(dep) {
  const raw = String(dep).trim();
  const withoutQuery = raw.split("?")[0].split("#")[0];
  const segment = withoutQuery.includes("/")
    ? withoutQuery.split("/").filter(Boolean).pop()
    : withoutQuery;
  return segment.replace(/\.json$/i, "");
}

async function loadItem(nameOrUrl) {
  const name = dependencyBasename(nameOrUrl);
  const itemPath = path.join(registryDir, `${name}.json`);
  return JSON.parse(await fs.readFile(itemPath, "utf8"));
}

async function writeItem(item) {
  for (const file of item.files) {
    const targetPath = path.join(sampleDir, "src", file.path);
    await fs.mkdir(path.dirname(targetPath), { recursive: true });
    await fs.writeFile(targetPath, file.content);
  }
}

await fs.rm(sampleDir, { recursive: true, force: true });
await fs.mkdir(path.join(sampleDir, "src"), { recursive: true });

const foundation = await loadItem("foundation");
const button = await loadItem("button");

for (const dependency of foundation.registryDependencies) {
  const dependencyItem = await loadItem(dependency);
  await writeItem(dependencyItem);
}

await writeItem(button);

await fs.writeFile(
  path.join(sampleDir, "src", "global.d.ts"),
  'declare module "*.module.css" { const classes: Record<string, string>; export default classes; }\n',
);

await fs.writeFile(
  path.join(sampleDir, "src", "App.tsx"),
  [
    'import React from "react";',
    'import "./styles/steez/tokens.css";',
    'import { Button } from "./components/steez/Button";',
    "",
    "export function App() {",
    '  return <Button variant="primary">Registry Smoke</Button>;',
    "}",
    "",
  ].join("\n"),
);

await fs.writeFile(
  path.join(sampleDir, "tsconfig.json"),
  `${JSON.stringify(
    {
      compilerOptions: {
        target: "ES2022",
        module: "ESNext",
        moduleResolution: "Bundler",
        jsx: "react-jsx",
        strict: true,
        allowSyntheticDefaultImports: true,
        skipLibCheck: true,
        baseUrl: ".",
        paths: {
          "@steez-ui/theme": ["../../packages/theme/src/index.ts"],
          "@steez-ui/icons": ["../../packages/icons/src/index.ts"],
        },
      },
      include: ["src/**/*"],
    },
    null,
    2,
  )}\n`,
);

await execFileAsync("tsc", ["--noEmit", "-p", path.join(sampleDir, "tsconfig.json")], {
  cwd: repoRoot,
});

