import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  // Declare the automatic JSX runtime here so .tsx test files are
  // transformed correctly by Vite's esbuild pipeline.
  esbuild: {
    jsx: "automatic",
  },
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
