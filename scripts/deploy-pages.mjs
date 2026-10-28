#!/usr/bin/env node
/**
 * Deploy docs + registry JSON to Cloudflare Pages (steez-ui).
 *
 * Deploys the Vite production build, including prerendered docs and registry files.
 * Run pnpm build first; missing output fails rather than deploying a partial site.
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

const outDir = path.join(root, "dist");
await fs.access(path.join(outDir, "index.html"));
await fs.access(path.join(outDir, "components", "button", "index.html"));
await copyDir(outDir, dist);
console.log(
  `Deploying Vite static site → Cloudflare Pages project "${projectName}"`,
);
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
