import { describe, it, expect } from "vitest";
import { buildSiteIndex } from "@/lib/site-index";
import { NAV_HREFS } from "@/lib/navigation";
import { collectRoutes, isResolvable } from "../helpers/route-tree";

/**
 * /site-index calls itself "Every Page, Routed From One Head Page", so it is
 * only honest if it actually covers the menu: every destination in
 * lib/navigation.ts must appear there (directly or as a child link), and every
 * link it lists must resolve.
 *
 * Allowlisted as intentionally not listed: the index itself, the signed-in
 * account page, and the owner-only control surfaces.
 */

const NOT_INDEXED = [
  // The index itself and the signed-in account page.
  "/site-index",
  "/profile",
  // Owner-only control surfaces — deliberately not advertised.
  "/owner",
  "/owner/users",
  "/controller",
  // Alias: the root redirects to /home, which the index lists as "Home".
  "/",
];

const groups = buildSiteIndex();
const routes = collectRoutes();

const indexedHrefs = new Set<string>();
for (const group of groups) {
  if (group.href) indexedHrefs.add(group.href);
  for (const entry of group.entries) {
    indexedHrefs.add(entry.href);
    for (const link of entry.links ?? []) indexedHrefs.add(link.href);
  }
}

describe("Everything Index coverage", () => {
  it("builds groups with unique ids", () => {
    const ids = groups.map((g) => g.id);
    expect(ids.length).toBeGreaterThan(5);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("lists every navigation destination", () => {
    const missing = NAV_HREFS.filter(
      (href) => !indexedHrefs.has(href) && !NOT_INDEXED.includes(href),
    );
    expect(missing, `nav destinations missing from /site-index: ${missing.join(", ")}`).toEqual([]);
  });

  it("only links to pages that exist", () => {
    const broken = [...indexedHrefs].filter((href) => !isResolvable(href, routes));
    expect(broken, `/site-index links to non-existent routes: ${broken.join(", ")}`).toEqual([]);
  });

  it("never lists the same page twice", () => {
    const seen = new Set<string>();
    const duplicated: string[] = [];
    const visit = (href: string) => {
      if (seen.has(href)) duplicated.push(href);
      seen.add(href);
    };
    for (const group of groups) {
      for (const entry of group.entries) {
        visit(entry.href);
      }
    }
    expect(duplicated, `pages listed twice: ${duplicated.join(", ")}`).toEqual([]);
  });
});
