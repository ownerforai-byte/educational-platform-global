import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { NAV_SECTIONS } from "@/lib/navigation";
import { collectRoutes, routeExists } from "../helpers/route-tree";

/**
 * Guard for the navigation: the sidebar and the mobile drawer render the same
 * shared list from lib/navigation.ts, and this list must only ever contain
 * destinations that exist as real pages.
 *
 * Before this existed, the two menus were hand-maintained copies of each other
 * and drifted: the drawer lost "Everything Index" and the whole owner section,
 * while labels and badges silently diverged.
 */

const routes = collectRoutes();
const entries = NAV_SECTIONS.flatMap((section) =>
  section.items.map((item) => ({ section, item })),
);

describe("navigation menu", () => {
  it("uses unique section ids (they key the sidebar collapse state)", () => {
    const ids = NAV_SECTIONS.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has at least the core sections", () => {
    const ids = NAV_SECTIONS.map((s) => s.id);
    for (const expected of ["primary", "curriculum", "stem", "tools", "extended", "account", "owner"]) {
      expect(ids).toContain(expected);
    }
  });

  it("points every entry at a page that actually exists", () => {
    const broken = entries
      .filter(({ item }) => !routeExists(item.href, routes))
      .map(({ item }) => item.href);
    expect(broken, `menu entries with no route: ${broken.join(", ")}`).toEqual([]);
  });

  it("never lists the same destination twice", () => {
    const hrefs = entries.map(({ item }) => item.href);
    const duplicated = hrefs.filter((href, i) => hrefs.indexOf(href) !== i);
    expect(duplicated, `duplicated menu destinations: ${duplicated.join(", ")}`).toEqual([]);
  });

  it("never gives two entries the same label", () => {
    const labels = entries.map(({ item }) => item.label);
    const duplicated = labels.filter((label, i) => labels.indexOf(label) !== i);
    expect(duplicated, `duplicated menu labels: ${duplicated.join(", ")}`).toEqual([]);
  });

  it("keeps owner-only destinations out of the public sections", () => {
    const publicHrefs = NAV_SECTIONS.filter((s) => !s.ownerOnly).flatMap((s) =>
      s.items.filter((i) => !i.ownerOnly).map((i) => i.href),
    );
    for (const ownerHref of ["/owner", "/owner/users", "/controller"]) {
      expect(publicHrefs).not.toContain(ownerHref);
    }
    // Veer chat entries are owner-only items (owner request 2026-10-05).
    for (const aiHref of ["/ai", "/chat", "/chat/nepali", "/chat/grammar", "/ai/tutor", "/ai/search"]) {
      expect(publicHrefs).not.toContain(aiHref);
    }
    // The quiz stays public for students.
    expect(publicHrefs).toContain("/ai-quiz");
    const ownerSection = NAV_SECTIONS.find((s) => s.ownerOnly);
    expect(ownerSection).toBeDefined();
    expect(ownerSection?.items.map((i) => i.href)).toContain("/owner");
  });

  it("flags the account section for signed-in users only", () => {
    // The sidebar gates "Student Desk" on a session by section id, so the id
    // must stay stable.
    expect(NAV_SECTIONS.map((s) => s.id)).toContain("account");
    expect(NAV_SECTIONS.find((s) => s.id === "account")?.items.map((i) => i.href)).toContain(
      "/profile",
    );
  });

  it("is consumed by BOTH menu surfaces instead of being copied", () => {
    const read = (p: string) => readFileSync(path.resolve(p), "utf8");
    const sidebar = read("components/layout/sidebar-navigation.tsx");
    const drawer = read("components/layout/mobile-nav.tsx");

    expect(sidebar).toContain('from "@/lib/navigation"');
    expect(drawer).toContain('from "@/lib/navigation"');

    // A fork would be a hardcoded menu array inside a component again.
    expect(sidebar).not.toMatch(/const\s+\w*[Ii]tems\s*:\s*NavItem\[\]\s*=/);
    expect(drawer).not.toMatch(/const\s+\w*[Ss]ections\s*:\s*\w*Section\[\]\s*=/);
  });
});
