import { test, expect } from "@playwright/test";

const isMatched = (pathname: string) =>
  !(
    pathname.startsWith("/_next/static") ||
    pathname.startsWith("/_next/image") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/icon-") ||
    pathname.startsWith("/data/") ||
    pathname.startsWith("/sw.js") ||
    pathname.startsWith("/all_elements.json")
  );

test("probe production traffic against the per-IP limiter", async ({ page }) => {
  test.setTimeout(240_000);
  const rows: { status: number; label: string; kind: string; matched: boolean }[] = [];
  const started = Date.now();

  page.on("response", (res) => {
    const url = new URL(res.url());
    if (url.hostname !== "localhost") return;
    const headers = res.request().headers();
    const prefetch =
      headers["next-router-prefetch"] === "1" ||
      headers["purpose"] === "prefetch" ||
      headers["sec-purpose"] === "prefetch";
    const rsc = headers["rsc"] === "1" || url.search.includes("_rsc=");
    rows.push({
      status: res.status(),
      label: `${url.pathname}${prefetch ? " [prefetch]" : rsc ? " [rsc]" : ""}`,
      kind: prefetch ? "prefetch" : rsc ? "rsc" : "other",
      matched: isMatched(url.pathname),
    });
  });

  const pages = [
    "/home",
    "/notes",
    "/class-11-notes",
    "/class-11-notes/physics",
    "/class-11-notes/physics/chapters/kinematics/topics/projectile-motion-and-its-applications",
    "/pyqs",
    "/class-12-notes",
    "/class-12-notes/physics",
    "/resources",
    "/formulas",
  ];
  for (const path of pages) {
    await page.goto(path, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
  }

  const elapsed = ((Date.now() - started) / 1000).toFixed(1);
  const matched = rows.filter((r) => r.matched);
  const kind = (k: string) => matched.filter((r) => r.kind === k).length;
  console.log(
    `ELAPSED=${elapsed}s TOTAL=${rows.length} MATCHED=${matched.length} PREFETCH=${kind("prefetch")} RSC=${kind("rsc")} OTHER=${kind("other")} MATCHED_429=${matched.filter((r) => r.status === 429).length}`,
  );
  console.log(
    "MATCHED_429_LABELS=" +
      matched
        .filter((r) => r.status === 429)
        .slice(0, 8)
        .map((r) => r.label)
        .join(" | "),
  );

  for (const variant of ["400", "401", "403", "404", "408"]) {
    const res = await page.goto(`/${variant}`, { waitUntil: "domcontentloaded" });
    const hasMain = await page.locator(`main[data-error-variant="${variant}"]`).count();
    const body = (await page.locator("body").innerText()).replace(/\s+/g, " ").slice(0, 60);
    console.log(`${variant}_STATUS=${res?.status()} MAIN=${hasMain} BODY=${body}`);
  }
  expect(true).toBe(true);
});
