import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

// eslint-config-next v16 ships flat configs only (its legacy `next/core-web-vitals`
// entry is itself a flat array), so FlatCompat/@eslint/eslintrc can no longer load
// it. Importing the flat entry directly keeps the same rule set without the
// legacy bridge.
/**
 * Plugins eslint-config-next already registers. Flat config requires a rule to be
 * declared in a config object that also holds its plugin, so the tuning block at
 * the end re-registers the same plugin objects (identity-matched) to override
 * individual rules without adding new dependencies.
 */
const inheritedPlugins = Object.assign(
  {},
  ...nextCoreWebVitals.map((config) => config.plugins ?? {}),
);

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
  ...nextCoreWebVitals,
  {
    plugins: inheritedPlugins,
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
