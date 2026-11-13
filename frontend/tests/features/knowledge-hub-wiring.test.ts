import { describe, expect, it } from "vitest";
import { LOKSEWA_SECTIONS, WORLD_KNOWLEDGE_SECTIONS } from "@/features/knowledge/data";

/**
 * Syllabus-gated knowledge gate: every Loksewa / World Knowledge section must
 * have a basePath that matches the live app routes and nav/site-index entries.
 */
describe("knowledge hub wiring", () => {
  it("keeps Loksewa sections on /loksewa/* openings", () => {
    expect(LOKSEWA_SECTIONS.length).toBeGreaterThan(0);
    for (const section of LOKSEWA_SECTIONS) {
      expect(section.basePath).toBe(`/loksewa/${section.slug}`);
      expect(section.topics.length).toBeGreaterThan(0);
    }
  });

  it("keeps World Knowledge sections on /world-knowledge/* openings", () => {
    expect(WORLD_KNOWLEDGE_SECTIONS.length).toBeGreaterThan(0);
    for (const section of WORLD_KNOWLEDGE_SECTIONS) {
      expect(section.basePath).toBe(`/world-knowledge/${section.slug}`);
      expect(section.topics.length).toBeGreaterThan(0);
    }
  });
});
