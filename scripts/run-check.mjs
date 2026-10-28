import path from "node:path";
import { fileURLToPath } from "node:url";
import { runCheck } from "./lib/check-runner.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const [command, ...args] = process.argv.slice(2);
if (!command) throw new Error("Provide a check command.");
process.exitCode = await runCheck(command, args, {
  cacheDir: process.env.STEEZ_CHECK_CACHE_DIR ?? path.join(root, ".cache/checks"),
});
