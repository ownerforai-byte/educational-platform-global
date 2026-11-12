import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { INDEPENDENCE_DISCLAIMER } from "@/components/platform/independence-disclaimer";

/**
 * Google Play rejected the app under "Misleading Claims" (2026-11-11): the
 * listing shipped NEB syllabus, notes and past questions without proving the
 * app is not a government product, and without an accessible route to the
 * official sources. These tests pin the fix so the claim cannot regress.
 */
const read = (p: string) => readFileSync(path.resolve(p), "utf8");

/** The exact sentence Google needs, verbatim. */
const REQUIRED =
  "Verner is an independent educational platform and is NOT affiliated with, endorsed by, authorized by, or connected to the National Examination Board (NEB), the Curriculum Development Centre (CDC), or any government entity of Nepal.";

describe("independence disclaimer", () => {
  it("uses the exact wording, naming NEB, CDC and 'any government entity'", () => {
    expect(INDEPENDENCE_DISCLAIMER).toBe(REQUIRED);
  });

  it("shows it on the landing screen and on every sign-in / sign-up screen", () => {
    // Landing: the banner renders before the first section, above the fold.
    expect(read("components/home/home-public.tsx")).toContain("<IndependenceDisclaimer");
    // Every tier home shares TierPage, so the note rides on all four.
    expect(read("components/home/tier-interfaces.tsx")).toContain("<IndependenceDisclaimer");
    // AuthShell wraps both /login and /signup.
    expect(read("features/auth/components/auth-shell.tsx")).toContain("<IndependenceDisclaimer");
  });
});

describe("official sources page", () => {
  const page = read("app/official-sources/page.tsx");

  it("links the three official .gov.np domains over HTTPS with external target", () => {
    for (const url of [
      "https://www.neb.gov.np/",
      "https://moecdc.gov.np/",
      "https://moest.gov.np/",
    ]) {
      expect(page).toContain(url);
    }
    // Every external anchor must escape the WebView and stay safe.
    expect(page).toContain('target="_blank"');
    expect(page).toContain('rel="noopener noreferrer"');
  });

  it("states the relationship rather than only listing domains", () => {
    expect(page).toContain("Aligned, not issued.");
    expect(page).toContain("Official notice beats this app.");
  });

  it("is reachable from the nav menu, Settings, About and the footer", () => {
    expect(read("lib/core/navigation.ts")).toContain('"/official-sources"');
    expect(read("components/study/settings-view.tsx")).toContain('"/official-sources"');
    expect(read("app/about/page.tsx")).toContain("/official-sources");
    expect(read("components/layout/footer.tsx")).toContain('"/official-sources"');
    expect(read("lib/core/site-index.ts")).toContain('"/official-sources"');
    expect(read("components/platform/public-page.tsx")).toContain('"/official-sources"');
  });

  it("is routable and indexed, not a dangling link", () => {
    expect(read("app/sitemap.ts")).toContain('"/official-sources"');
  });
});
