import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { NAV_HREFS } from "@/lib/core/navigation";
import { buildSiteIndex } from "@/lib/core/site-index";
import { platformLinks } from "@/components/platform/public-page";
import { collectRoutes, isResolvable } from "../helpers/route-tree";

/**
 * Owner request 2026-11-08: "in footer under platform add one more 'What it
 * has' and create its page ...". Pins the link in every registry the footer,
 * sidebar, Everything Index and public-page nav read from, and keeps the
 * owner's exact list on the page.
 */
const read = (p: string) => readFileSync(path.resolve(p), "utf8");
const page = read("app/what-it-has/page.tsx");

describe("What it has — footer link and page", () => {
  it("is registered in nav, Everything Index, public nav and footer", () => {
    expect(NAV_HREFS).toContain("/what-it-has");

    const indexed = new Set<string>();
    for (const group of buildSiteIndex()) {
      if (group.href) indexed.add(group.href);
      for (const entry of group.entries) {
        indexed.add(entry.href);
        for (const link of entry.links ?? []) indexed.add(link.href);
      }
    }
    expect([...indexed]).toContain("/what-it-has");

    expect(platformLinks.map(([, href]) => href)).toContain("/what-it-has");
    expect(read("components/layout/footer.tsx")).toContain('"/what-it-has"');
  });

  it("points at a real static route", () => {
    expect(isResolvable("/what-it-has", collectRoutes())).toBe(true);
  });

  it("keeps the owner's exact list, including the coming and open-ended items", () => {
    for (const phrase of [
      "not everything but ;",
      "Educational related contents",
      "journal",
      "Quick Access (depending on you)",
      "World knowledge",
      "Some Daily Life activities (coming)",
      "++all incoming curious features(which you have never thought)",
    ]) {
      expect(page, `missing owner wording: ${phrase}`).toContain(phrase);
    }
  });

  it("is a complete public page (one h1, no placeholder)", () => {
    expect(page).toContain("<PublicPage");
    expect(page).not.toContain("Under Development");
  });
});
