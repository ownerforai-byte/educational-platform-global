import { defineConfig, devices } from "@playwright/test";

/**
 * E2E smoke (owner request 2026-10-27): one thin spec (tests/e2e/smoke.spec.ts)
 * covering the guest lock, the signed-in owner path (/pyqs + the Veer panel)
 * and the Member-tier Plus gate + /plans link.
 *
 * Runs on push to main only (see .github/workflows/e2e-smoke.yml) — CI is
 * already heavy. The auth-requiring tests skip themselves when the SMOKE_*
 * env vars are absent, so a bare local run always executes at least the
 * guest test.
 *
 * Server: `reuseExistingServer` locally (run `npm run dev` yourself and the
 * run reuses it); in CI the workflow builds and starts the production server.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 60_000,
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL:
      process.env.PLAYWRIGHT_BASE_URL ??
      (process.env.CI ? "http://localhost:3000" : "http://localhost:5173"),
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: process.env.PLAYWRIGHT_NO_SERVER
    ? undefined
    : {
        // CI serves the production build (the workflow builds first); locally
        // reuse a running `npm run dev` (port 5173) so nothing is rebuilt.
        command: process.env.CI ? "npx next start -p 3000" : "npm run dev",
        url:
          process.env.PLAYWRIGHT_BASE_URL ??
          (process.env.CI ? "http://localhost:3000" : "http://localhost:5173"),
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
      },
});