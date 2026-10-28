import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { COMPONENT_MANIFEST } from "../lib/docs/component-manifest.mjs";

const routes = [
  "/",
  "/components",
  "/docs",
  "/packages",
  "/registry",
  ...COMPONENT_MANIFEST.map(({ slug }) => `/components/${slug}`),
];
for (const route of routes) {
  const html = await fs.readFile(
    `dist${route === "/" ? "" : route}/index.html`,
    "utf8",
  );
  assert.match(html, /<h1>/, `Missing static content at ${route}`);
  assert.match(html, /<link rel="canonical"/, `Missing canonical at ${route}`);
  assert.match(
    html,
    /<meta name="description" content="[^"]+"/,
    `Missing metadata at ${route}`,
  );
  assert.doesNotMatch(html, /<!--app-html-->/, `Unrendered page at ${route}`);
}
for (const { slug, title } of COMPONENT_MANIFEST) {
  const html = await fs.readFile(`dist/components/${slug}/index.html`, "utf8");
  assert.ok(
    html.includes(`<h1>${slug === "select" ? "Select" : title}</h1>`),
    `Wrong title for ${slug}`,
  );
  assert.equal(
    JSON.parse(await fs.readFile(`dist/r-steez/${slug}.json`, "utf8")).name,
    slug,
  );
  assert.ok(
    (await fs.readFile(`dist/copy/steez/${slug}.tsx`, "utf8")).includes(
      "React",
    ),
  );
}
assert.match(await fs.readFile("dist/404.html", "utf8"), /Page not found/);
assert.match(
  await fs.readFile("dist/sitemap.xml", "utf8"),
  /components\/button/,
);
console.log(
  `Verified ${routes.length} prerendered routes, 404, sitemap, and ${COMPONENT_MANIFEST.length} public install surfaces.`,
);
