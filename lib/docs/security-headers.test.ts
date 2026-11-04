// @vitest-environment node
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const read = (file: string) => fs.readFileSync(path.join(process.cwd(), file), "utf8");

/** Directives of the CSP on the site-wide `/*` rule in public/_headers. */
function siteCsp(): Map<string, string[]> {
  const rule = read("public/_headers").split(/^\/\*\s*$/m)[1]?.split(/^\S/m)[0] ?? "";
  const policy = rule.match(/Content-Security-Policy:\s*(.+)/)?.[1] ?? "";
  return new Map(
    policy
      .split(";")
      .map((directive) => directive.trim().split(/\s+/))
      .filter(([name]) => name)
      .map(([name, ...values]) => [name, values]),
  );
}

describe("public/_headers", () => {
  const csp = siteCsp();

  it("allows each inline script in index.html by hash, never unsafe-inline", () => {
    const scripts = [...read("index.html").matchAll(/<script>([\s\S]*?)<\/script>/g)];
    expect(scripts.length).toBeGreaterThan(0);
    const scriptSrc = csp.get("script-src") ?? [];
    for (const [, body] of scripts) {
      const hash = createHash("sha256").update(body).digest("base64");
      expect(scriptSrc).toContain(`'sha256-${hash}'`);
    }
    expect(scriptSrc).not.toContain("'unsafe-inline'");
    expect(scriptSrc).not.toContain("'unsafe-eval'");
  });

  it("blocks framing, plugins and base-tag hijacking", () => {
    expect(csp.get("frame-ancestors")).toEqual(["'none'"]);
    expect(csp.get("object-src")).toEqual(["'none'"]);
    expect(csp.get("base-uri")).toEqual(["'self'"]);
  });
});
