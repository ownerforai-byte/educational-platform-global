import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import nextPlugin from "@next/eslint-plugin-next";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: [
      "**/.next/**",
      "**/out/**",
      "**/.vercel/**",
      "**/node_modules/**",
      "**/content/**",
      "**/drizzle/**",
      "**/dist/**",
      "**/supabase/.temp/**",
      "**/*.log",
      "**/next-env.d.ts",
      "**/eslint.config.mjs",
      "**/scripts/_stale/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  nextPlugin.configs["core-web-vitals"],
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: {
      react: pluginReact,
      "react-hooks": reactHooks,
    },
    languageOptions: {
      // This injects both Node.js and Browser global variables 
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "warn",
      "@typescript-eslint/triple-slash-reference": "warn",
      "react/no-unknown-property": "off",
      "prefer-const": "warn",
      "no-misleading-character-class": "warn",
      "no-useless-escape": "warn",
      "no-empty": ["warn", { "allowEmptyCatch": true }],
      "react-hooks/exhaustive-deps": "warn",
      "@typescript-eslint/no-unused-expressions": "warn",
    },
  },
]);
