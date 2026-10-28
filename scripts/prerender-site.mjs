import fs from "node:fs/promises";
import path from "node:path";
import { render, routes } from "../.site-ssr/entry-server.mjs";

const dist = path.resolve("dist");
const template = await fs.readFile(path.join(dist, "index.html"), "utf8");
const escape = (value) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
function page(url) {
  const { html, title, description } = render(url);
  return template
    .replace(/<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${escape(description)}" />`,
    )
    .replace(
      "<!--page-head-->",
      `<link rel="canonical" href="https://steez-ui-6v5.pages.dev${url}" />`,
    )
    .replace("<!--app-html-->", html);
}
for (const url of routes) {
  const file = path.join(dist, url, "index.html");
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, page(url));
}
await fs.writeFile(path.join(dist, "404.html"), page("/404"));
await fs.writeFile(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((url) => `<url><loc>https://steez-ui-6v5.pages.dev${url}</loc></url>`).join("")}</urlset>`,
);
console.log(`Prerendered ${routes.length} docs routes and a 404 page.`);
