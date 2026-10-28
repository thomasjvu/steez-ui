import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import { setTimeout as wait } from "node:timers/promises";

function alive(pid) {
  if (!Number.isInteger(pid) || pid <= 0) return false;
  try { process.kill(pid, 0); return true; }
  catch (error) { return error.code === "EPERM"; }
}

/** Queue expensive local checks, retaining the lock until their subprocess exits. */
export async function runCheck(command, args, { cacheDir, priority = 10 } = {}) {
  const lock = path.join(cacheDir, "running");
  await fs.mkdir(cacheDir, { recursive: true });
  let child;
  let interrupted;
  let acquired = false;
  let announced = false;
  const stop = signal => {
    interrupted = signal;
    child?.kill(signal);
  };
  const onInterrupt = () => stop("SIGINT");
  const onTerminate = () => stop("SIGTERM");
  process.on("SIGINT", onInterrupt);
  process.on("SIGTERM", onTerminate);
  try {
    while (!interrupted) {
      try {
        await fs.mkdir(lock);
        acquired = true;
        await fs.writeFile(path.join(lock, "owner.json"), JSON.stringify({ pid: process.pid, command }));
        break;
      } catch (error) {
        if (error.code !== "EEXIST") throw error;
        try {
          const owner = JSON.parse(await fs.readFile(path.join(lock, "owner.json"), "utf8"));
          if (!alive(owner.pid) && !alive(owner.childPid)) {
            await fs.rm(lock, { recursive: true, force: true });
            continue;
          }
        } catch (error) {
          // Allow the owner time to write metadata; recover interrupted acquisition.
          if (error.code !== "ENOENT" && !(error instanceof SyntaxError)) throw error;
          const stat = await fs.stat(lock).catch(() => null);
          if (stat && Date.now() - stat.mtimeMs > 30000) {
            await fs.rm(lock, { recursive: true, force: true });
          }
        }
        if (!announced) {
          console.log("Waiting for the current check to finish…");
          announced = true;
        }
        await wait(250);
      }
    }
    if (interrupted) return interrupted === "SIGINT" ? 130 : 143;
    const useNice = process.platform !== "win32";
    child = spawn(useNice ? "nice" : command,
      useNice ? ["-n", String(priority), command, ...args] : args,
      { stdio: "inherit" });
    const completion = new Promise((resolve, reject) => {
      child.once("error", reject);
      child.once("exit", (code, signal) => resolve(code ?? (signal === "SIGINT" ? 130 : 143)));
    });
    await fs.writeFile(path.join(lock, "owner.json"), JSON.stringify({ pid: process.pid, childPid: child.pid, command }));
    return await completion;
  } finally {
    if (acquired) await fs.rm(lock, { recursive: true, force: true });
    process.off("SIGINT", onInterrupt);
    process.off("SIGTERM", onTerminate);
  }
}
