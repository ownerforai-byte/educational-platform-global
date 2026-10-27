import { test, expect, type Page } from "@playwright/test";

/**
 * E2E SMOKE (owner request 2026-10-27) — one thin pass over the three
 * load-bearing paths:
 *   1. the guest lock on /home,
 *   2. the signed-in owner path (/pyqs reachable + the Veer panel opens),
 *   3. the Member-tier Plus gate (locked surface visible + /plans link).
 *
 * The auth tests skip themselves when the SMOKE_* env vars are absent, so a
 * bare local run (npx playwright test) still executes the guest test.
 * Required env: SMOKE_OWNER_EMAIL/PASSWORD, SMOKE_MEMBER_EMAIL/PASSWORD
 * (see AGENT_RULES.md "E2E smoke (Playwright)").
 */

const OWNER_EMAIL = process.env.SMOKE_OWNER_EMAIL ?? "";
const OWNER_PASSWORD = process.env.SMOKE_OWNER_PASSWORD ?? "";
const MEMBER_EMAIL = process.env.SMOKE_MEMBER_EMAIL ?? "";
const MEMBER_PASSWORD = process.env.SMOKE_MEMBER_PASSWORD ?? "";

/** Sign in through /login and wait for the post-login destination. */
async function signIn(page: Page, email: string, password: string) {
  await page.goto("/login");
  await page.fill("#email", email);
  await page.fill("#password", password);
  await page.getByRole("button", { name: /sign in|log in/i }).first().click();
  // The auth flow lands on the tier welcome or the study home; either way the
  // session cookie exists once the URL leaves /login.
  await page.waitForURL((url) => !url.pathname.startsWith("/login"), {
    timeout: 30_000,
  });
}

test.describe("E2E smoke", () => {
  test("guest: /home shows the locked state (Veer/study open after sign-in)", async ({ page }) => {
    await page.goto("/home");
    // The visitor home is the one open page; its copy states the lock plainly.
    await expect(page.getByText(/sign in/i).first()).toBeVisible();
    await expect(page.getByText(/veer/i).first()).toBeVisible();
  });

  test("owner: signs in, /pyqs is reachable and the Veer panel opens", async ({ page }) => {
    // In-body skip, not file-level: a file-level test.skip(cond) marks the
    // WHOLE file skipped (guest test included) whenever the env vars are
    // absent, which broke the documented bare-local-run behaviour.
    test.skip(!OWNER_EMAIL || !OWNER_PASSWORD, "SMOKE_OWNER_EMAIL/PASSWORD not set");
    await signIn(page, OWNER_EMAIL, OWNER_PASSWORD);

    // The past-paper bank is a member+ surface — an approved owner reaches it.
    await page.goto("/pyqs");
    await expect(page).toHaveURL(/\/pyqs/);

    // The left-side Veer panel is the approved-account quick chat.
    await page.getByRole("button", { name: "Open Veer" }).click();
    await expect(page.getByLabel("Veer chat")).toBeVisible();
    await expect(page.getByText(/quick answers here/i)).toBeVisible();
  });

  test("member: Plus-gated surface is visibly locked and /plans works", async ({ page }) => {
    test.skip(!MEMBER_EMAIL || !MEMBER_PASSWORD, "SMOKE_MEMBER_EMAIL/PASSWORD not set");
    await signIn(page, MEMBER_EMAIL, MEMBER_PASSWORD);

    // The Member home names what stays locked at Plus — the visible gate.
    await page.goto("/home");
    await expect(page.getByText(/open at plus/i).first()).toBeVisible();

    // The plans link carries the student to the tier ladder.
    await page.getByRole("link", { name: /^plans$/i }).first().click();
    await expect(page).toHaveURL(/\/plans/);
    await expect(page.getByText(/plan/i).first()).toBeVisible();
  });
});