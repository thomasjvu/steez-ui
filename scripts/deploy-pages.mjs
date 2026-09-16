#!/usr/bin/env node
/**
 * Deploy docs + registry JSON to Cloudflare Pages (steez-ui).
 *
 * Prefers a full Next static export when `output: "export"` is enabled.
 * Falls back to publishing `public/` (includes /r-steez) so install URLs work
 * even when the HTML shell is minimal.
 *
 * Usage:
 *   CLOUDFLARE_ACCOUNT_ID=... CLOUDFLARE_API_TOKEN=... node scripts/deploy-pages.mjs
 *   # or an already-authenticated `wrangler` session
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, ".pages-dist");
const projectName = process.env.CF_PAGES_PROJECT || "steez-ui";

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(from, to);
    } else {
      await fs.copyFile(from, to);
    }
  }
}

await fs.rm(dist, { recursive: true, force: true });
await fs.mkdir(dist, { recursive: true });

const outDir = path.join(root, "out");
let mode = "public-only";
try {
  await fs.access(outDir);
  await copyDir(outDir, dist);
  mode = "next-export";
} catch {
  await copyDir(path.join(root, "public"), dist);
  await fs.writeFile(
    path.join(dist, "index.html"),
    `<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Steez UI Registry</title></head><body><main style="font:16px/1.5 system-ui;max-width:40rem;margin:3rem auto;padding:0 1rem"><h1>Steez UI</h1><p>Registry payloads are live under <code>/r-steez</code>. Run the Next docs site locally with <code>pnpm dev</code> for the full catalog, or deploy a Next static export to replace this shell.</p><p><a href="/r-steez/index.json">/r-steez/index.json</a></p></main></body></html>\n`,
  );
}

console.log(`Deploying ${mode} → Cloudflare Pages project "${projectName}"`);
const branch = process.env.CF_PAGES_BRANCH || "main";
const result = spawnSync(
  "wrangler",
  [
    "pages",
    "deploy",
    dist,
    "--project-name",
    projectName,
    "--branch",
    branch,
    "--commit-dirty=true",
  ],
  { cwd: root, stdio: "inherit", env: process.env },
);
process.exit(result.status ?? 1);
