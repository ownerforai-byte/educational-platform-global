import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { INDEPENDENCE_DISCLAIMER } from "@/components/platform/independence-disclaimer";
import {
  FORBIDDEN_OFFICIAL_SOURCE_URL_MARKERS,
  OFFICIAL_GOVERNMENT_SOURCE_URLS,
} from "@/lib/official-government-sources";

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

  it("lives in the footer only", () => {
    // Owner 2026-11-11: "keep the disclaimer only in footer, remove it from all
    // other places". The footer band is shared by both footer views.
    expect(read("components/layout/footer.tsx")).toContain("<IndependenceDisclaimer");
    expect(read("components/home/home-public.tsx")).not.toContain("<IndependenceDisclaimer");
    expect(read("components/home/tier-interfaces.tsx")).not.toContain("<IndependenceDisclaimer");
    expect(read("features/auth/components/auth-shell.tsx")).not.toContain("<IndependenceDisclaimer");
  });
});

const repoRoot = path.resolve(import.meta.dirname, "../../..");

function readRepo(rel: string) {
  const full = path.join(repoRoot, rel);
  expect(existsSync(full), `missing ${rel}`).toBe(true);
  return readFileSync(full, "utf8");
}

const DISCLAIMER_SURFACE_FILES = [
  "frontend/app/official-sources/page.tsx",
  "frontend/lib/official-government-sources.ts",
  "frontend/app/legal/privacy/page.tsx",
  "frontend/app/legal/terms/page.tsx",
  "play-store/app-listing.md",
  "play-store/privacy-policy.md",
  "play-store/host/privacy-policy.html",
] as const;

describe("official sources page", () => {
  const page = read("app/official-sources/page.tsx");

  it("links the three official .gov.np domains over HTTPS with external target", () => {
    for (const url of OFFICIAL_GOVERNMENT_SOURCE_URLS) {
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

describe("disclaimer external links (Play / legal surfaces)", () => {
  for (const rel of DISCLAIMER_SURFACE_FILES) {
    it(`does not ship dead NEB hosts in ${rel}`, () => {
      const text = readRepo(rel);
      for (const forbidden of FORBIDDEN_OFFICIAL_SOURCE_URL_MARKERS) {
        expect(text, `${rel} must not contain ${forbidden}`).not.toContain(forbidden);
      }
    });
  }

  it("lists only the verified apex .gov.np homes in the canonical registry", () => {
    expect(OFFICIAL_GOVERNMENT_SOURCE_URLS).toEqual([
      "https://moecdc.gov.np/",
      "https://neb.gov.np/",
      "https://moest.gov.np/",
    ]);
  });
});
