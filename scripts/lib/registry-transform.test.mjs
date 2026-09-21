import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import {
  buildSourceOwners,
  collectRegistryDependencies,
  makeRegistryContentPortable,
  resolveRegistryImport,
  toAbsoluteRegistryDependency,
} from "./registry-transform.mjs";

const temporaryDirectories = [];

afterEach(async () => {
  await Promise.all(
    temporaryDirectories.splice(0).map((directory) => rm(directory, { recursive: true, force: true })),
  );
});

describe("registry transformations", () => {
  it.each([
    ["from", 'import value from "./value.js";', 'import value from "./value";'],
    ["dynamic import", 'const value = import("./value.mjs");', 'const value = import("./value");'],
    ["export", 'export { value } from "../value.ts";', 'export { value } from "../value";'],
    ["css import", 'import styles from "./styles.css";', 'import styles from "./styles.css";'],
  ])("rewrites extensionless %s imports deterministically", (_label, source, expected) => {
    expect(makeRegistryContentPortable(source)).toBe(expected);
  });

  it.each([
    ["theme-tokens", "https://registry.example.test/theme-tokens.json"],
    ["theme-tokens.json", "https://registry.example.test/theme-tokens.json"],
    ["https://other.test/item.json", "https://other.test/item.json"],
    ["", ""],
  ])("normalizes registry dependency %s", (dependency, expected) => {
    expect(toAbsoluteRegistryDependency(dependency, "https://registry.example.test/"))
      .toBe(expected);
  });

  it("assigns each source to one registry owner", () => {
    const owners = buildSourceOwners([
      {
        name: "button",
        files: [{ source: "src/Button.tsx", target: "components/Button.tsx" }],
      },
      {
        name: "theme",
        files: [{ source: "src/theme.css", target: "styles/theme.css" }],
      },
    ]);

    expect(owners.get("src/Button.tsx")).toEqual({
      item: "button",
      target: "components/Button.tsx",
    });
    expect(() =>
      buildSourceOwners([
        { name: "first", files: [{ source: "src/shared.ts", target: "shared.ts" }] },
        { name: "second", files: [{ source: "src/shared.ts", target: "shared.ts" }] },
      ]),
    ).toThrow("Duplicate source: src/shared.ts");
  });

  it.each([
    ["./helper.js", "src/helper.ts"],
    ["../shared.js", "shared.ts"],
    ["./helper", "src/helper.ts"],
  ])("resolves %s to the owning source", (specifier, expectedPath) => {
    const owners = buildSourceOwners([
      {
        name: "helper",
        files: [{ source: expectedPath, target: expectedPath }],
      },
    ]);

    expect(resolveRegistryImport("src/Button.tsx", specifier, owners).owner.item)
      .toBe("helper");
  });

  it("reports unresolved relative imports instead of producing an incomplete payload", () => {
    const owners = buildSourceOwners([
      { name: "button", files: [{ source: "src/Button.tsx", target: "Button.tsx" }] },
    ]);

    expect(() => resolveRegistryImport("src/Button.tsx", "./missing.js", owners))
      .toThrow("Unresolved registry import: src/Button.tsx -> ./missing.js");
  });

  it("infers dependencies from temporary source output while preserving declaration order", async () => {
    const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), "steez-registry-"));
    temporaryDirectories.push(temporaryDirectory);
    const sourceDirectory = path.join(temporaryDirectory, "src");
    const buttonSource = path.join(sourceDirectory, "Button.tsx");
    const helperSource = path.join(sourceDirectory, "helper.ts");
    await writeFile(buttonSource, 'import helper from "./helper.js";\nimport { Icon } from "@steez-ui/icons";\n');
    await writeFile(helperSource, "export default {};\n");

    const relativeButtonSource = "src/Button.tsx";
    const relativeHelperSource = "src/helper.ts";
    const owners = buildSourceOwners([
      {
        name: "button",
        registryDependencies: ["theme-tokens"],
        files: [{ source: relativeButtonSource, target: "components/Button.tsx" }],
      },
      {
        name: "helper",
        registryDependencies: [],
        files: [{ source: relativeHelperSource, target: "components/helper.ts" }],
      },
    ]);

    const dependencies = collectRegistryDependencies(
      { name: "button", registryDependencies: ["theme-tokens"] },
      [
        {
          sourcePath: relativeButtonSource,
          content: await readFile(buttonSource, "utf8"),
        },
      ],
      owners,
    );

    expect(dependencies).toEqual(["theme-tokens", "icon-provider", "helper"]);
  });
});
