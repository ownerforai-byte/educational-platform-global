import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  // .tsx test files get the automatic JSX runtime from @vitejs/plugin-react
  // above — no separate esbuild override needed (and `esbuild.jsx` is no
  // longer part of the vitest/vite `ESBuildOptions` type, which breaks the
  // `next build` type-check with TS2769).
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/**/*.{test,spec}.{ts,tsx}"],
    // Playwright owns tests/e2e — vitest must not load those specs
    // (test.describe from @playwright/test crashes the vitest runner).
    exclude: ["tests/e2e/**", "node_modules/**"],
    // The forks pool times out waiting for workers on this machine;
    // threads + single-file execution is the stable configuration.
    pool: "threads",
    fileParallelism: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
