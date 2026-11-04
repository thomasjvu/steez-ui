import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

/** Exit codes a shell reports for these signals (128 + signal number). */
const SIGNAL_EXIT_CODES = { SIGHUP: 129, SIGINT: 130, SIGTERM: 143 };

/**
 * Make a private (0700) temp directory for credentials such as a throwaway
 * .npmrc, and remove it however the process ends: `cleanup()`, a thrown error,
 * `process.exit`, or SIGINT / SIGTERM / SIGHUP. `cleanup` is idempotent and
 * detaches the handlers, so call it in a `finally`.
 */
export function createPrivateTempDir(prefix) {
  const dir = mkdtempSync(join(tmpdir(), prefix));
  const signalHandlers = new Map();
  let removed = false;

  const cleanup = () => {
    if (removed) return;
    removed = true;
    rmSync(dir, { recursive: true, force: true });
    process.off("exit", cleanup);
    for (const [signal, handler] of signalHandlers) process.off(signal, handler);
  };

  process.on("exit", cleanup);
  for (const [signal, code] of Object.entries(SIGNAL_EXIT_CODES)) {
    const handler = () => {
      cleanup();
      process.exit(code);
    };
    signalHandlers.set(signal, handler);
    process.on(signal, handler);
  }

  return { dir, cleanup };
}
