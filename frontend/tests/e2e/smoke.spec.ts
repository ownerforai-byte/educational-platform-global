import { test, expect, type Page } from "@playwright/test";

/**
 * E2E SMOKE (owner request 2026-10-27) — one thin pass over the three
 * load-bearing paths:
 *   1. the guest lock on /home,
 *   2. the signed-in owner path (/notes and /pyqs reachable + Veer opens),
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
/**
 * Set by the e2e-smoke workflow's backend warm-up step only when the external
 * Render backend never answers /health. Auth-dependent specs cannot sign in
 * without it, so they skip with a visible reason; the guest and error specs
 * still run. A warm backend leaves this unset and every spec runs.
 */
const BACKEND_UNAVAILABLE = process.env.SMOKE_SKIP_AUTH === "1";

/** Sign in through /login and wait for the post-login destination. */
async function signIn(page: Page, email: string, password: string) {
  await page.goto("/login");
  await page.fill("#email", email);
  await page.fill("#password", password);
  await page.getByRole("button", { name: /sign in|log in/i }).first().click();
  // The auth flow lands on the tier welcome or the study home; either way the
  // session cookie exists once the URL leaves /login. If it does not, surface
  // the login form's own error instead of a bare 30s timeout (a cold backend
  // used to look identical to bad credentials).
  try {
    await page.waitForURL((url) => !url.pathname.startsWith("/login"), {
      timeout: 30_000,
    });
  } catch (error) {
    const visible = await page
      .locator('[role="alert"], .text-destructive')
      .allTextContents()
      .catch(() => [] as string[]);
    throw new Error(
      `Sign-in never left /login. Visible errors: ${visible.map((v) => v.trim()).filter(Boolean).join(" | ") || "none"}. ${String(error)}`,
    );
  }
}

test.describe("E2E smoke", () => {
  test("guest: /home shows the locked state (Veer/study open after sign-in)", async ({ page }) => {
    await page.goto("/home");
    // The visitor home is the one open page; its copy states the lock plainly.
    await expect(page.getByText(/sign in/i).first()).toBeVisible();
    await expect(page.getByText(/veer/i).first()).toBeVisible();
  });

  test("owner: signs in, notes and past papers open, Veer opens, and mobile topic tabs work", async ({ page }) => {
    // In-body skip, not file-level: a file-level test.skip(cond) marks the
    // WHOLE file skipped (guest test included) whenever the env vars are
    // absent, which broke the documented bare-local-run behaviour.
    test.setTimeout(150_000);
    test.skip(BACKEND_UNAVAILABLE, "backend warm-up failed — see E2E Smoke workflow annotations");
    test.skip(!OWNER_EMAIL || !OWNER_PASSWORD, "SMOKE_OWNER_EMAIL/PASSWORD not set");
    await signIn(page, OWNER_EMAIL, OWNER_PASSWORD);

    await page.goto("/notes");
    await expect(page).toHaveURL(/\/notes/);
    await expect(page.getByRole("heading", { name: "Notes", exact: true })).toBeVisible();
    await expect(page.getByPlaceholder("Search notes by title, subject, or unit…")).toBeVisible();
    await expect(page.getByTestId("approval-lock")).toHaveCount(0);

    // The past-paper bank is a member+ surface — an approved owner reaches it.
    await page.goto("/pyqs");
    await expect(page).toHaveURL(/\/pyqs/);

    // The left-side Veer panel is the approved-account quick chat.
    await page.getByRole("button", { name: "Open Veer" }).click();
    await expect(page.getByLabel("Veer chat")).toBeVisible();
    await expect(page.getByText(/quick answers here/i)).toBeVisible();

    // The same approved session now checks the mobile topic learning flow.
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/class-11-notes/physics/chapters/kinematics/topics/projectile-motion-and-its-applications");

    await expect(page.getByRole("tab", { name: "Notes", exact: true })).toHaveAttribute("aria-selected", "true", { timeout: 30_000 });
    await expect(page.getByRole("heading", { name: /Understand .* in four passes/ })).toBeVisible({ timeout: 30_000 });
    await expect(page.locator("#topic-notes")).toHaveCount(1);

    await page.getByRole("tab", { name: "MCQs", exact: true }).click();
    await expect(page.getByRole("heading", { name: /Topic MCQs/ })).toBeVisible();
    await page.getByRole("tab", { name: "Step-by-step Numericals", exact: true }).click();
    await expect(page.getByRole("heading", { name: "Step-by-step numericals" })).toBeVisible();
    await page.getByRole("tab", { name: "Entrance Question Bank", exact: true }).click();
    await expect(page.getByRole("heading", { name: /Entrance Question Bank/ })).toBeVisible();
    await page.getByRole("tab", { name: "Quick 3 Self-check", exact: true }).click();
    await expect(page.getByRole("heading", { name: "Quick 3-question self-check" })).toBeVisible();

    await page.getByRole("tab", { name: "Notes", exact: true }).click();
    await expect(page.getByRole("heading", { name: /Understand .* in four passes/ })).toBeVisible();
    await expect(page.locator("#topic-notes")).toHaveCount(1);
  });

  test("member: Plus-gated surface is visibly locked and /plans works", async ({ page }) => {
    test.skip(BACKEND_UNAVAILABLE, "backend warm-up failed — see E2E Smoke workflow annotations");
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

  test("errors: every static variant has its own instant page", async ({ page }) => {
    test.setTimeout(180_000);
    const variants = ["400", "401", "403", "404", "408", "429", "500", "502", "503", "504", "network", "offline"];
    for (const variant of variants) {
      await page.goto(`/${variant}`);
      await expect(page.locator(`main[data-error-variant="${variant}"]`)).toBeVisible();
      await expect(page.locator("main h1")).toBeVisible();
    }
  });

  test("errors: connectivity changes the page immediately without a reload", async ({ page }) => {
    await page.goto("/404");
    await expect(page.locator('main[data-error-variant="404"]')).toBeVisible();

    await page.context().setOffline(true);
    await expect(page.locator('main[data-error-variant="offline"]')).toBeVisible();
    await expect(page.getByRole("heading", { name: "You're offline" })).toBeVisible();

    await page.context().setOffline(false);
    await expect(page.locator('main[data-error-variant="404"]')).toBeVisible();
  });

});
