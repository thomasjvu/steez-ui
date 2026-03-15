import fs from "fs/promises";
import os from "os";
import path from "path";
import { spawnSync } from "child_process";

const repoRoot = path.resolve(new URL("..", import.meta.url).pathname);
const rootPackagePath = path.join(repoRoot, "package.json");
const rootPackage = JSON.parse(await fs.readFile(rootPackagePath, "utf8"));

const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const skipBuild = args.has("--skip-build");
const npmTagIndex = process.argv.indexOf("--tag");
const npmTag =
  npmTagIndex >= 0 && process.argv.length > npmTagIndex + 1
    ? process.argv[npmTagIndex + 1]
    : undefined;
const otpIndex = process.argv.indexOf("--otp");
const npmOtp =
  otpIndex >= 0 && process.argv.length > otpIndex + 1
    ? process.argv[otpIndex + 1]
    : process.env.NPM_CONFIG_OTP;

const packageDirs = [
  path.join(repoRoot, "packages/theme"),
  path.join(repoRoot, "packages/icons"),
  path.join(repoRoot, "packages/ui"),
];

const workspaceVersions = new Map();

for (const packageDir of packageDirs) {
  const packageJson = JSON.parse(
    await fs.readFile(path.join(packageDir, "package.json"), "utf8"),
  );
  workspaceVersions.set(packageJson.name, packageJson.version);
}

function replaceWorkspaceVersions(record) {
  if (!record) {
    return record;
  }

  const updated = {};

  for (const [dependency, value] of Object.entries(record)) {
    if (typeof value === "string" && value.startsWith("workspace:")) {
      const resolvedVersion = workspaceVersions.get(dependency);

      if (!resolvedVersion) {
        throw new Error(`Missing workspace version for ${dependency}`);
      }

      updated[dependency] = value === "workspace:*" ? `^${resolvedVersion}` : value.replace(/^workspace:/, "");
      continue;
    }

    updated[dependency] = value;
  }

  return updated;
}

function run(command, commandArgs, options) {
  const result = spawnSync(command, commandArgs, {
    stdio: "inherit",
    ...options,
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

if (!skipBuild) {
  run("bun", ["run", "build:packages"], { cwd: repoRoot });
}

const stagingRoot = await fs.mkdtemp(path.join(os.tmpdir(), "steez-ui-publish-"));
const npmCacheDir = path.join(stagingRoot, "npm-cache");

for (const packageDir of packageDirs) {
  const manifestPath = path.join(packageDir, "package.json");
  const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
  const stagingDir = path.join(stagingRoot, manifest.name.replace("@", "").replace("/", "-"));

  await fs.mkdir(stagingDir, { recursive: true });
  await fs.cp(path.join(packageDir, "dist"), path.join(stagingDir, "dist"), {
    recursive: true,
  });

  const stagedManifest = {
    ...manifest,
    repository: {
      type: "git",
      url: "git+https://github.com/thomasjvu/steez-ui.git",
    },
    homepage: "https://steez-ui-6v5.pages.dev",
    bugs: {
      url: "https://github.com/thomasjvu/steez-ui/issues",
    },
    publishConfig: {
      access: "public",
    },
    dependencies: replaceWorkspaceVersions(manifest.dependencies),
    devDependencies: undefined,
    scripts: undefined,
  };

  await fs.writeFile(
    path.join(stagingDir, "package.json"),
    `${JSON.stringify(stagedManifest, null, 2)}\n`,
    "utf8",
  );
  await fs.copyFile(path.join(repoRoot, "README.md"), path.join(stagingDir, "README.md"));
  await fs.copyFile(path.join(repoRoot, "LICENSE"), path.join(stagingDir, "LICENSE"));

  const publishArgs = ["publish", "--access", "public", "--cache", npmCacheDir];

  if (dryRun) {
    publishArgs.push("--dry-run");
  }

  if (npmTag) {
    publishArgs.push("--tag", npmTag);
  }

  if (npmOtp) {
    publishArgs.push("--otp", npmOtp);
  }

  run("npm", publishArgs, { cwd: stagingDir, env: process.env });
}

console.log(
  dryRun
    ? `Dry-run publish completed from ${stagingRoot}`
    : `Published Steez UI packages from ${stagingRoot}`,
);
