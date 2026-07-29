import fs from "fs/promises";
import path from "path";

const repoRoot = path.resolve(new URL("..", import.meta.url).pathname);
const registryIndexPath = path.join(repoRoot, "apps/registry/public/r/index.json");
const componentsRoot = path.join(repoRoot, "apps/registry/components");

const listPageHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Steez UI Components</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="../src/components-main.tsx"></script>
  </body>
</html>
`;

const detailPageHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Steez UI Component</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="../../src/component-main.tsx"></script>
  </body>
</html>
`;

const registryIndex = JSON.parse(await fs.readFile(registryIndexPath, "utf8"));
const componentItems = registryIndex.filter((item) => item.type === "registry:component");

await fs.mkdir(componentsRoot, { recursive: true });
await fs.writeFile(path.join(componentsRoot, "index.html"), listPageHtml);

for (const item of componentItems) {
  const componentDir = path.join(componentsRoot, item.name);
  await fs.mkdir(componentDir, { recursive: true });
  await fs.writeFile(path.join(componentDir, "index.html"), detailPageHtml);
}
