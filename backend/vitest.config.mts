import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    // Vitest 4's default forks pool loses the runner context on this Windows
    // workspace; threads keeps every suite attached to its own test context.
    pool: "threads",
    // Several suites read the full curriculum corpus in beforeAll; cold reads
    // on Windows can exceed the 30s default. Keep the hooks generous, not infinite.
    hookTimeout: 120_000,
    include: ["tests/**/*.{test,spec}.{ts,tsx}"],
    // Several suites synchronously read the same large curriculum corpus.
    // Concurrent cold reads contend for disk and exceed their existing 30s
    // hooks on Windows; serialize files without relaxing any timeout/assertion.
    fileParallelism: false,
  },
});