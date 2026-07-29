import fs from "fs/promises";
import path from "path";

const packageRoot = process.argv[2];

if (!packageRoot) {
  throw new Error("Expected package root path");
}

const srcDir = path.join(packageRoot, "src");
const distDir = path.join(packageRoot, "dist");

async function copyStaticFiles(sourceDir, targetDir) {
  const entries = await fs.readdir(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      await fs.mkdir(targetPath, { recursive: true });
      await copyStaticFiles(sourcePath, targetPath);
      continue;
    }

    if (!/\.(css|js)$/.test(entry.name)) {
      continue;
    }

    await fs.copyFile(sourcePath, targetPath);
  }
}

await copyStaticFiles(srcDir, distDir);
