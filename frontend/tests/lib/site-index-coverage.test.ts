import { describe, it, expect } from "vitest";
import { buildSiteIndex } from "@/lib/site-index";
import { NAV_HREFS } from "@/lib/navigation";
import { getUnitTopic } from "@/features/syllabus/queries";
import { buildTopicKnowledge, KIND_LABEL } from "@/lib/topic-visuals";
import { getUnitConcept } from "@/lib/visual-concept-map";
import { matchConceptSchematic } from "@/components/lab/schematic-concepts";
import {
  isAuthoredSpecialTopic,
  isInclinedPlaneTopic,
} from "@/lib/topic-visuals";
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

  it("indexes every topic-derived concept map at its syllabus topic page", () => {
    const diagrams = groups.find((group) => group.id === "topic-schematics");
    expect(diagrams).toBeDefined();
    // 538 at the index's creation; authored schematics since then claim their
    // topics out of the generated pool (see schematic-concepts.tsx).
    expect(diagrams?.entries).toHaveLength(524);

    for (const entry of diagrams?.entries ?? []) {
      const parts = entry.href.split("/").filter(Boolean);
      expect(parts).toHaveLength(6);
      expect(parts[2]).toBe("chapters");
      expect(parts[4]).toBe("topics");

      const resolved = getUnitTopic(parts[0], parts[1], parts[3], parts[5]);
      expect(resolved?.topic.slug, `unresolved schematic link: ${entry.href}`).toBe(parts[5]);
      expect(resolved?.topic.title, `wrong topic for schematic link: ${entry.href}`).toBe(entry.name);
      expect(isResolvable(entry.href, routes), `route does not exist: ${entry.href}`).toBe(true);

      const { classSlug, subjectSlug, unitId, topicSlug, topicTitle } = {
        classSlug: parts[0],
        subjectSlug: parts[1],
        unitId: parts[3],
        topicSlug: parts[5],
        topicTitle: entry.name,
      };
      expect(matchConceptSchematic(subjectSlug, topicSlug, topicTitle, unitId)).toBeUndefined();
      expect(getUnitConcept(unitId, topicSlug, topicTitle, subjectSlug)).toBeUndefined();
      expect(isAuthoredSpecialTopic(subjectSlug, topicSlug, topicTitle)).toBe(false);
      expect(isInclinedPlaneTopic(topicSlug, topicTitle, unitId)).toBe(false);

      const knowledge = buildTopicKnowledge({
        classSlug,
        subjectSlug,
        unitId,
        topicSlug,
        topicTitle,
      });
      expect(entry.opening).toContain(KIND_LABEL[knowledge.kind]);
    }
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
