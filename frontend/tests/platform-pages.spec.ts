import { test, expect } from "@playwright/test";
const paths = ["/about", "/what-it-has", "/blog", "/neb-updates", "/how-it-works", "/contact", "/help"];
for (const path of paths) {
  test(`${path} is a complete public page`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.getByText("Under Development", { exact: true })).toHaveCount(0);
    await expect(page.getByRole("navigation", { name: "Platform information" })).toBeVisible();
    await page.setViewportSize({ width: 375, height: 812 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  });
}
test("help filters and recovers from no results", async ({ page }) => {
  await page.goto("/help");
  const search = page.getByLabel("Search accounts, access, sparks, or study tools");
  await search.fill("content sparks");
  await expect(page.getByText("Are AI sparks and content sparks the same?", { exact: true })).toBeVisible();
  await search.fill("zzzznomatchingtopic");
  await expect(page.getByRole("status")).toHaveText("0 answers found");
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(page.getByRole("status")).not.toHaveText("0 answers found");
});
test("blog cards open complete articles", async ({ page }) => {
  await page.goto("/blog");
  await page.getByRole("link", { name: "Read: Build a weekly NEB study routine you can actually follow", exact: true }).click();
  await expect(page.getByRole("navigation", { name: "In this guide" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Give each session a job", exact: true })).toBeVisible();
});
test("unknown guides return not found", async ({ page }) => {
  const response = await page.goto("/blog/not-a-real-guide");
  expect(response?.status()).toBe(404);
});
