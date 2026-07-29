#!/usr/bin/env node
/**
 * Publish @steez-ui/react to the Forgejo npm package registry.
 *
 * Expects (via Infisical agents run, or env):
 *   FORGEJO_TOKEN / FORGEJO_ADMIN_TOKEN
 *   CF_ACCESS_CLIENT_ID + CF_ACCESS_CLIENT_SECRET  (when Access sits in front)
 *
 * Optional:
 *   FORGEJO_BASE_URL   default https://forgejo.thomasjvu.com
 *   FORGEJO_PKG_OWNER  default steez-ui (falls back to phantasy)
 *   STEEZ_NPM_TAG      default latest
 *   CF_ACCESS_CLIENT_ID / CF_ACCESS_CLIENT_SECRET when Access is required
 *
 * Usage (from agent repo with secrets injected):
 *   node scripts/infisical-agent-secrets.mjs run -- \
 *     node /path/to/steez-ui/packages/react/scripts/publish-forgejo.mjs
 *
 * Or from packages/react after secrets are in env:
 *   node scripts/publish-forgejo.mjs
 */

import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const pkgRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const base = (process.env.FORGEJO_BASE_URL || "https://forgejo.thomasjvu.com").replace(
  /\/$/,
  "",
);
const owner = process.env.FORGEJO_PKG_OWNER?.trim() || "steez-ui";
const token = (
  process.env.FORGEJO_TOKEN ||
  process.env.FORGEJO_ADMIN_TOKEN ||
  ""
).trim();
const tag = process.env.STEEZ_NPM_TAG?.trim() || "latest";
const registry = `${base}/api/packages/${owner}/npm/`;

function fail(msg) {
  console.error(`[publish-forgejo] ${msg}`);
  process.exit(1);
}

function forgejoHeaders(json = true) {
  /** @type {Record<string, string>} */
  const h = { Accept: "application/json" };
  if (json) h["Content-Type"] = "application/json";
  if (token) h.Authorization = `token ${token}`;
  if (process.env.CF_ACCESS_CLIENT_ID) {
    h["CF-Access-Client-Id"] = process.env.CF_ACCESS_CLIENT_ID;
    h["CF-Access-Client-Secret"] = process.env.CF_ACCESS_CLIENT_SECRET || "";
  }
  return h;
}

async function healthCheck() {
  const res = await fetch(`${base}/api/v1/version`, { headers: forgejoHeaders() });
  if (!res.ok) {
    const body = await res.text();
    fail(
      `Forgejo unreachable (${res.status}). Tunnel/Access may be down.\n${body.slice(0, 400)}`,
    );
  }
  const data = await res.json().catch(() => ({}));
  console.log(`[publish-forgejo] Forgejo ok: ${data.version || res.status} @ ${base}`);
}

/** Ensure package owner org exists (idempotent). */
async function ensureOwner() {
  const probe = await fetch(`${base}/api/v1/orgs/${owner}`, {
    headers: forgejoHeaders(),
  });
  if (probe.ok) {
    console.log(`[publish-forgejo] owner org exists: ${owner}`);
    return;
  }
  // User packages also work — try user endpoint
  const userProbe = await fetch(`${base}/api/v1/users/${owner}`, {
    headers: forgejoHeaders(),
  });
  if (userProbe.ok) {
    console.log(`[publish-forgejo] owner user exists: ${owner}`);
    return;
  }
  const create = await fetch(`${base}/api/v1/orgs`, {
    method: "POST",
    headers: forgejoHeaders(),
    body: JSON.stringify({
      username: owner,
      full_name: owner,
      description: `${owner} packages`,
      visibility: "public",
    }),
  });
  if (!create.ok && create.status !== 422) {
    const body = await create.text();
    fail(`Could not ensure owner ${owner} (${create.status}): ${body.slice(0, 300)}`);
  }
  console.log(`[publish-forgejo] ensured owner: ${owner} (${create.status})`);
}

function build() {
  console.log("[publish-forgejo] building…");
  // Call tsup binary directly — `pnpm exec` can force a failed install (approve-builds).
  const candidates = [
    join(pkgRoot, "node_modules/.bin/tsup"),
    join(pkgRoot, "../../node_modules/.bin/tsup"),
  ];
  const bin = candidates.find((p) => existsSync(p));
  if (!bin) fail(`tsup not found (looked in ${candidates.join(", ")}). Run pnpm install in steez-ui.`);
  execFileSync(bin, [], { cwd: pkgRoot, stdio: "inherit" });
  if (!existsSync(join(pkgRoot, "dist/index.js"))) {
    fail("build produced no dist/index.js");
  }
}

/**
 * npm does not send CF-Access headers. Use a local undici/fetch-based publish
 * via `npm publish` with a temporary NODE_OPTIONS preload when Access is required,
 * or set HTTPS proxy. Simpler path: use curl multipart to the Forgejo API after pack.
 */
function publishWithNpm() {
  if (!token) fail("FORGEJO_TOKEN / FORGEJO_ADMIN_TOKEN is required");

  const npmrcDir = mkdtempSync(join(tmpdir(), "steez-npmrc-"));
  const npmrc = join(npmrcDir, ".npmrc");
  const hostPath = registry.replace(/^https?:\/\//, "");
  writeFileSync(
    npmrc,
    [
      `@steez-ui:registry=${registry}`,
      `//${hostPath}:_authToken=${token}`,
      `always-auth=true`,
      "",
    ].join("\n"),
    { mode: 0o600 },
  );

  // Preload injects CF Access service-token headers on every HTTPS request to the host.
  const preload = join(npmrcDir, "cf-access-preload.cjs");
  if (process.env.CF_ACCESS_CLIENT_ID) {
    writeFileSync(
      preload,
      `
const https = require("https");
const http = require("http");
const { URL } = require("url");
const HOST = ${JSON.stringify(new URL(base).hostname)};
const ID = ${JSON.stringify(process.env.CF_ACCESS_CLIENT_ID)};
const SECRET = ${JSON.stringify(process.env.CF_ACCESS_CLIENT_SECRET || "")};
function wrap(mod) {
  const orig = mod.request;
  mod.request = function (options, cb) {
    let opts = options;
    if (typeof options === "string" || options instanceof URL) {
      opts = new URL(options);
    }
    const hostname = opts.hostname || opts.host;
    if (hostname === HOST || (typeof hostname === "string" && hostname.endsWith("." + HOST))) {
      opts.headers = { ...(opts.headers || {}), "CF-Access-Client-Id": ID, "CF-Access-Client-Secret": SECRET };
    }
    return orig.call(this, opts, cb);
  };
}
wrap(https);
wrap(http);
`,
      { mode: 0o600 },
    );
  }

  const env = {
    ...process.env,
    npm_config_userconfig: npmrc,
  };
  if (process.env.CF_ACCESS_CLIENT_ID) {
    env.NODE_OPTIONS = [process.env.NODE_OPTIONS, `--require ${preload}`]
      .filter(Boolean)
      .join(" ");
  }

  console.log(`[publish-forgejo] publishing to ${registry} (tag=${tag})`);
  // --ignore-scripts: dist is already built; avoid prepublish hooks that re-run pnpm.
  const result = spawnSync(
    "npm",
    [
      "publish",
      "--access",
      "public",
      "--tag",
      tag,
      "--registry",
      registry,
      "--ignore-scripts",
    ],
    {
      cwd: pkgRoot,
      env,
      stdio: "inherit",
      shell: false,
    },
  );

  rmSync(npmrcDir, { recursive: true, force: true });

  if (result.status !== 0) {
    fail(`npm publish failed with exit ${result.status}`);
  }
  console.log("[publish-forgejo] done");
  console.log(
    `[publish-forgejo] install with:\n  @steez-ui:registry=${registry}\n  pnpm add @steez-ui/react@${tag}`,
  );
}

async function main() {
  if (!existsSync(join(pkgRoot, "package.json"))) {
    fail(`package.json not found at ${pkgRoot}`);
  }
  await healthCheck();
  await ensureOwner();
  build();
  publishWithNpm();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
