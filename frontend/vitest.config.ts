import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  // Vite 8 uses oxc instead of esbuild; @vitejs/plugin-react v4 still
  // configures JSX through the deprecated esbuild options, which oxc
  // ignores. Declare the automatic JSX runtime here so .tsx test files
  // are transformed correctly.
  oxc: {
    jsx: {
      runtime: "automatic",
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/**/*.{test,spec}.{ts,tsx}"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
