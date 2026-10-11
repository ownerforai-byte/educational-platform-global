import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      // OpenNext/Workers build output (gitignored, regenerable). Without this
      // the local `eslint .` run parses a 25 MB server bundle and dies with
      // "heap out of memory", even though CI (a clean checkout) never sees it.
      ".open-next/**",
      "out/**",
      "build/**",
      "dist/**",
      "node_modules/**",
      "*.config.js",
      "*.config.mjs",
      "*.config.ts",
    ],
  },
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "react/no-unescaped-entities": "off",
      "@next/next/no-html-link-for-pages": "off",
      "react/jsx-no-comment-textnodes": "off",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
];

export default eslintConfig;
