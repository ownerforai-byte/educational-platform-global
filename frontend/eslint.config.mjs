import { dirname } from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Next 16 exports a flat config; Next 15 still exposes a legacy config.
const require = createRequire(import.meta.url);
const nextConfig = require("eslint-config-next/core-web-vitals");
const nextRules = Array.isArray(nextConfig)
  ? nextConfig
  : new (await import("@eslint/eslintrc")).FlatCompat({ baseDirectory: __dirname })
      .extends("next/core-web-vitals");

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
  ...nextRules,
  {
    plugins: { "react-hooks": require("eslint-plugin-react-hooks") },
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
