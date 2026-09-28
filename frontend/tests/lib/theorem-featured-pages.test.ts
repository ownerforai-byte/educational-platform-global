import { describe, it, expect, beforeAll } from "vitest";
import {
  findSyllabusTheoremItem,
  getFeaturedTheoremCards,
  getTheoremProofRoutes,
  type FeaturedTheoremCard,
} from "@/lib/theorem-topics";

/**
 * Regression guard for the "everything opens the same page" bug on /theorems:
 * the high-yield featured cards used to hardcode a LINK PER SUBJECT, so all six
 * cards opened the same subject listing. Each card must now point at its own
 * dedicated topic page, and that page must have real content behind it.
 *
 * Cards are built in beforeAll rather than at collection time: the theorem
 * registries are cached per module instance, and the instance used while
 * collecting tests is not always the one the assertions run against.
 */
describe("featured theorem cards", () => {
  let cards: FeaturedTheoremCard[] = [];

  beforeAll(() => {
    cards = getFeaturedTheoremCards(6);
  });

  it("returns the requested number of cards", () => {
    expect(cards).toHaveLength(6);
  });

  it("gives every card its OWN deep link, never a shared subject page", () => {
    const links = cards.map((c) => c.link);

    // No duplicates: two cards may never open the same page.
    expect(new Set(links).size).toBe(links.length);

    for (const link of links) {
      // /theorems/<classSlug>/<subjectSlug>/<topicSlug> — five parts counting
      // the leading empty segment; a subject-level link would only have four.
      const parts = link.split("/");
      expect(parts).toHaveLength(5);
      expect(parts[1]).toBe("theorems");
      expect(parts[4]).toBeTruthy();
    }
  });

  it("every card links to a page that exists and carries curated content", () => {
    for (const card of cards) {
      const item = findSyllabusTheoremItem(card.classSlug, card.subjectSlug, card.topicSlug);
      expect(item, `${card.link} must resolve`).toBeDefined();
      expect(item?.hasCuratedContent, `${card.link} must have content`).toBe(true);
      expect(card.link).toBe(
        `/theorems/${card.classSlug}/${card.subjectSlug}/${card.topicSlug}`,
      );
    }
  });

  it("spreads across more than one class and subject track", () => {
    const tracks = new Set(cards.map((c) => `${c.classSlug}/${c.subjectSlug}`));
    expect(tracks.size).toBeGreaterThan(2);
    const classes = new Set(cards.map((c) => c.classSlug));
    expect(classes.size).toBeGreaterThan(1);
  });

  it("only features tracks that are routed at all", () => {
    const routed = new Set(getTheoremProofRoutes().map((r) => `${r.classSlug}/${r.subjectSlug}`));
    for (const card of cards) {
      expect(routed.has(`${card.classSlug}/${card.subjectSlug}`)).toBe(true);
    }
  });
});
