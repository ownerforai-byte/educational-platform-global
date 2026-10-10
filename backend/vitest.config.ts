import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.{test,spec}.{ts,tsx}"],
    // Several suites synchronously read the same large curriculum corpus.
    // Concurrent cold reads contend for disk and exceed their existing 30s
    // hooks on Windows; serialize files without relaxing any timeout/assertion.
    fileParallelism: false,
  },
});