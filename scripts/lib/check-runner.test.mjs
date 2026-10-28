// @vitest-environment node
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { afterEach, expect, it } from "vitest";
const temporary = [];
afterEach(async () => {
  for (const directory of temporary.splice(0)) await fs.rm(directory, { recursive: true, force: true });
});
function run(directory, source) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ["scripts/run-check.mjs", process.execPath, "-e", source], {
      env: { ...process.env, STEEZ_CHECK_CACHE_DIR: directory }, stdio: "ignore",
    });
    child.once("error", reject);
    child.once("exit", resolve);
  });
}
it("serializes competing checks and releases the queue after a failed command", async () => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), "steez-check-"));
  temporary.push(directory);
  const marker = JSON.stringify(path.join(directory, "exclusive"));
  const source = `const fs = require('node:fs'); const marker = ${marker}; fs.writeFileSync(marker, '', {flag:'wx'}); setTimeout(() => {fs.unlinkSync(marker); process.exit(7)}, 100);`;
  expect(await Promise.all([run(directory, source), run(directory, source)])).toEqual([7, 7]);
  expect(await run(directory, "process.exit(0)")).toBe(0);
  await expect(fs.stat(path.join(directory, "running"))).rejects.toMatchObject({ code: "ENOENT" });
});
it("recovers a lock whose owning processes have exited", async () => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), "steez-check-"));
  temporary.push(directory);
  await fs.mkdir(path.join(directory, "running"));
  await fs.writeFile(path.join(directory, "running/owner.json"), JSON.stringify({ pid: -1 }));
  expect(await run(directory, "process.exit(0)")).toBe(0);
});
