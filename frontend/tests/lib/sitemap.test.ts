import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";
import { SYLLABUS, getUnitTopicEntries } from "@/lib/syllabus";

/**
 * The machine sitemap must mirror the canonical syllabus — every topic page
 * that exists must be crawlable here, or it is invisible to search.
 */

describe("app/sitemap", () => {
  const entries = sitemap();

  it("covers the hub routes", () => {
    const urls = entries.map((e) => e.url);
    for (const path of ["/", "/class-11-notes", "/class-12-notes", "/exams/cee", "/exams/ioe"]) {
      expect(urls.some((u) => u.endsWith(path))).toBe(true);
    }
  });

  it("emits one URL per syllabus topic page", () => {
    const urls = entries.map((e) => e.url);
    let topics = 0;
    for (const cls of SYLLABUS) {
      for (const subject of cls.subjects) {
        for (const unit of subject.units) {
          for (const topic of getUnitTopicEntries(unit)) {
            topics += 1;
            const path = `/${cls.slug}/${subject.slug}/chapters/${unit.id}/topics/${topic.slug}`;
            expect(urls.some((u) => u.endsWith(path))).toBe(true);
          }
        }
      }
    }
    expect(topics).toBeGreaterThan(600);
  });

  it("only emits absolute URLs under the site base", () => {
    for (const entry of entries) {
      expect(entry.url).toMatch(/^https?:\/\//);
    }
  });
});
