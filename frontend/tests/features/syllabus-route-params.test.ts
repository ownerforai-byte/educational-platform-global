import { describe, it, expect } from "vitest";
import { parseSubjectParams, parseTopicParams, parseUnitParams } from "@/features/syllabus/schema";
import { getUnitTopic } from "@/features/syllabus/queries";
import { getSyllabusByClass, getUnitTopicEntries } from "@/lib/core/syllabus";

/**
 * Route-param parsing for the syllabus tree.
 *
 * Regression pin (2026-11-08): Next delivers non-ASCII dynamic segments
 * percent-encoded, and every Devanagari glyph becomes nine ASCII chars when
 * encoded — so the length guard used to reject nearly every Nepali topic
 * (encoded slugs measured 166–448 chars against a max(120) schema) and the
 * page hard-404'd even though its slug was in generateStaticParams. Parsing
 * now decodes BEFORE validating.
 */

const nepali = getSyllabusByClass("class-11-notes")?.subjects.find((s) => s.slug === "nepali");
const devanagariUnit = nepali?.units.find((u) =>
  getUnitTopicEntries(u).some((t) => /[^\x00-\x7f]/.test(t.slug)),
);

describe("syllabus route params — percent-encoded Devanagari slugs", () => {
  it("accepts a Nepali topic slug whose encoded form exceeds the length guard", () => {
    expect(devanagariUnit).toBeDefined();
    const entry = getUnitTopicEntries(devanagariUnit!)[0];
    const encoded = encodeURIComponent(entry.slug);

    // Pins the regression shape: the encoded slug is far past max(120)…
    expect(encoded.length).toBeGreaterThan(120);
    // …but the DECODED slug is what the guard must see.
    expect(entry.slug.length).toBeLessThanOrEqual(120);
    expect(
      parseTopicParams({
        subject: "nepali",
        unit: devanagariUnit!.id,
        topicSlug: encoded,
      }),
    ).not.toBeNull();
  });

  it("resolves the topic through getUnitTopic when Next passes it encoded", () => {
    const entry = getUnitTopicEntries(devanagariUnit!)[0];
    const resolved = getUnitTopic(
      "class-11-notes",
      "nepali",
      devanagariUnit!.id,
      encodeURIComponent(entry.slug),
    );
    expect(resolved?.topic.slug).toBe(entry.slug);
    expect(resolved?.topic.title).toBe(entry.title);
  });

  it("leaves ASCII subject/unit params untouched and still rejects junk", () => {
    expect(parseSubjectParams({ subject: "english" })).toEqual({ subject: "english" });
    expect(parseUnitParams({ subject: "english", unit: "language-development" })).toEqual({
      subject: "english",
      unit: "language-development",
    });
    // Empty and absurdly long decoded slugs are still refused.
    expect(
      parseTopicParams({ subject: "nepali", unit: "sahitya-adhyayan", topicSlug: "" }),
    ).toBeNull();
    expect(
      parseTopicParams({
        subject: "nepali",
        unit: "sahitya-adhyayan",
        topicSlug: "a".repeat(500),
      }),
    ).toBeNull();
  });
});