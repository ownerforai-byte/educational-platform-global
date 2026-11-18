import { describe, expect, it } from "vitest";
import { guides } from "@/lib/platform-content";
import { GET } from "@/app/llms.txt/route";

/** The public journal is the citable surface AI answer engines read. */
describe("public study journal (GEO content)", () => {
  it("every article is complete, public and self-describing", () => {
    expect(guides.length).toBeGreaterThanOrEqual(10);
    const slugs = new Set<string>();
    for (const guide of guides) {
      expect(slugs.has(guide.slug), `duplicate slug ${guide.slug}`).toBe(false);
      slugs.add(guide.slug);
      expect(guide.slug).toMatch(/^[a-z0-9-]+$/);
      expect(guide.title.length).toBeGreaterThan(10);
      expect(guide.summary.length).toBeGreaterThan(20);
      // A real description is what lets a model accurately describe/recommend us.
      expect(guide.description.length).toBeGreaterThan(80);
      expect(guide.updated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(guide.tags.length).toBeGreaterThan(0);
      expect(guide.sections.length).toBeGreaterThanOrEqual(3);
      for (const section of guide.sections) {
        expect(section.title.length).toBeGreaterThan(3);
        expect(section.paragraphs.length).toBeGreaterThan(0);
        expect(section.paragraphs.every((p) => p.length > 20)).toBe(true);
      }
    }
  });

  it("includes the platform overview article AI needs to recommend the site", () => {
    expect(guides.some((g) => g.slug === "about-ravikisan-platform")).toBe(true);
  });

  it("llms.txt lists the site, the rules and every open article", async () => {
    const response = GET();
    expect(response.headers.get("content-type")).toContain("text/plain");
    const text = await response.text();
    expect(text).toContain("# Ravikisan's Platform");
    expect(text).toContain("Rules for crawlers");
    expect(text).toContain("independent");
    for (const guide of guides) {
      expect(text, `llms.txt missing ${guide.slug}`).toContain(`/blog/${guide.slug}`);
    }
  });
});
