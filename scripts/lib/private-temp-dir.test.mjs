// @vitest-environment node
import fs from "node:fs";
import { spawn } from "node:child_process";
import { pathToFileURL } from "node:url";
import path from "node:path";
import { expect, it } from "vitest";

const moduleUrl = pathToFileURL(path.resolve("scripts/lib/private-temp-dir.mjs")).href;

/** Run a child that creates the directory, prints it, then runs `body`. */
function child(body, signal) {
  const source = `
    import { writeFileSync } from "node:fs";
    import { createPrivateTempDir } from ${JSON.stringify(moduleUrl)};
    const { dir, cleanup } = createPrivateTempDir("steez-private-test-");
    writeFileSync(dir + "/.npmrc", "//registry/:_authToken=fake\\n", { mode: 0o600 });
    console.log(dir);
    ${body}
  `;
  return new Promise((resolve, reject) => {
    const proc = spawn(process.execPath, ["--input-type=module", "-e", source], { stdio: ["ignore", "pipe", "ignore"] });
    let dir = "";
    proc.stdout.on("data", (chunk) => {
      dir += chunk;
      if (signal && dir.endsWith("\n")) proc.kill(signal);
    });
    proc.once("error", reject);
    proc.once("exit", (code) => resolve({ code, dir: dir.trim() }));
  });
}

it("creates a private directory and removes it on cleanup", async () => {
  const { code, dir } = await child(`
    if ((await import("node:fs")).statSync(dir).mode % 0o1000 !== 0o700) process.exit(9);
    cleanup(); cleanup();
  `);
  expect(code).toBe(0);
  expect(dir).toContain("steez-private-test-");
  expect(fs.existsSync(dir)).toBe(false);
});

it("removes the directory when the process exits or throws", async () => {
  const exited = await child("process.exit(3);");
  expect(exited.code).toBe(3);
  expect(fs.existsSync(exited.dir)).toBe(false);

  const thrown = await child("throw new Error('boom');");
  expect(thrown.code).toBe(1);
  expect(fs.existsSync(thrown.dir)).toBe(false);
});

it.each([["SIGINT", 130], ["SIGTERM", 143]])("removes the directory on %s", async (signal, exitCode) => {
  const { code, dir } = await child("setInterval(() => {}, 1000);", signal);
  expect(code).toBe(exitCode);
  expect(fs.existsSync(dir)).toBe(false);
});
