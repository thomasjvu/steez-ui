import js from "@eslint/js";
import tseslint from "typescript-eslint";
import hooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default tseslint.config(
  {
    ignores: [
      "**/dist/**",
      "**/.cache/**",
      "**/tmp/**",
      "**/coverage/**",
      "**/build/**",
      "**/.pages-dist/**",
      "**/.site-ssr/**",
      "**/.next/**",
      "**/out/**",
      "public/copy/steez/**",
      "registry/boston/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  {
    files: ["**/*.{ts,tsx,js,jsx,mjs}"],
    plugins: { "react-hooks": hooks },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
);
