import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import {
  emptyHighYieldTopicData,
  getHighYieldTopicData,
  hasHighYieldTopicData,
} from "@/lib/high-yield-topic-facts";

type ManifestRow = { unitSlug?: string; topicSlug?: string; title?: string };

/** Every topic the app can actually open, straight from the shipped manifests. */
function readManifestTopics(): Array<{ subject: string; unit?: string; topic?: string; title: string }> {
  const root = join(process.cwd(), "public", "data", "syllabus-notes");
  const rows: Array<{ subject: string; unit?: string; topic?: string; title: string }> = [];
  for (const subject of readdirSync(root)) {
    let manifest: ManifestRow[];
    try {
      manifest = JSON.parse(readFileSync(join(root, subject, "_manifest.json"), "utf8"));
    } catch {
      continue;
    }
    if (!Array.isArray(manifest)) continue;
    for (const row of manifest) {
      rows.push({
        subject,
        unit: row.unitSlug,
        topic: row.topicSlug,
        title: row.title ?? row.topicSlug ?? row.unitSlug ?? "untitled",
      });
    }
  }
  return rows;
}

describe("getHighYieldTopicData — unit matching", () => {
  it("matches by syllabus unit id, beating a misleading keyword in the title", () => {
    // "Newton's law of gravitation" contains no dynamics words, but topic
    // titles generally do contain generic words — unit matching must win.
    const data = getHighYieldTopicData(
      "physics",
      "newton-s-law-of-gravitation",
      "Newton's law of gravitation",
      "gravitation",
    );
    expect(data?.title).toMatch(/Gravitation/i);
  });

  it("routes a heat unit to its own facts rather than to Dynamics", () => {
    // "Newton's law of cooling" reads like a dynamics title, but the unit wins.
    const data = getHighYieldTopicData(
      "physics",
      "newtons-law-of-cooling",
      "Newton's law of cooling",
      "quantity-of-heat",
    );
    expect(data).not.toBeNull();
    expect(data!.unitSlugs).toContain("quantity-of-heat");
    expect(data!.title).not.toMatch(/Dynamics/i);
  });

  it("does not route circular motion to Kinematics via the word acceleration", () => {
    const data = getHighYieldTopicData(
      "physics",
      "centripetal-acceleration-force",
      "Centripetal acceleration and centripetal force",
      "circular-motion",
    );
    expect(data?.title).toMatch(/Circular Motion/i);
  });

  it("returns null for a unit with no entry", () => {
    // A unit nobody curated must report "no facts", never a keyword guess —
    // that guess is how a physics topic ended up showing Vectors facts.
    const data = getHighYieldTopicData(
      "physics",
      "vectors",
      "Vectors and Resolution",
      "unit-that-no-entry-claims",
    );
    expect(data).toBeNull();
  });
});

describe("getHighYieldTopicData — topic resolution", () => {
  it("matches a topic by keyword", () => {
    const data = getHighYieldTopicData("physics", "projectile-motion", "Projectile Motion");
    expect(data).not.toBeNull();
    expect(data?.title).toMatch(/Kinematics|Projectile/i);
  });

  it("never returns another subject's facts", () => {
    // A biology unit with no curated entry must not surface physics or maths
    // data, even when the title is full of words another subject owns.
    const data = getHighYieldTopicData(
      "biology",
      "vector-addition-in-cells",
      "Vector addition, projectile motion and acceleration in cells",
      "biology-unit-no-entry-claims",
    );
    expect(data).toBeNull();
  });

  it("resolves a curated biology unit to biology facts", () => {
    const data = getHighYieldTopicData(
      "biology",
      "conservation-biology",
      "Conservation Biology",
      "conservation-biology",
    );
    expect(data).not.toBeNull();
    expect(data!.unitSlugs).toContain("conservation-biology");
    expect(data!.subject).toBe("biology");
  });

  it("returns null for a topic with no curated entry", () => {
    const data = getHighYieldTopicData(
      "nepali",
      "sahitya-adhyayan",
      "साहित्य अध्ययन",
    );
    expect(data).toBeNull();
  });

  it("returns null for an unmatched physics unit instead of falling back to Vectors", () => {
    const data = getHighYieldTopicData("physics", "nuclear-physics", "Nuclear Physics");
    if (data !== null) {
      expect(data.title).not.toMatch(/Vector/i);
    }
  });

  it("prefers the entry matching the most keywords", () => {
    const data = getHighYieldTopicData("physics", "vectors", "Vectors and Resolution");
    expect(data?.title).toMatch(/Vector/i);
  });

  it("flags an empty placeholder as having no facts", () => {
    const empty = emptyHighYieldTopicData("Some Topic", "physics");
    expect(hasHighYieldTopicData(empty)).toBe(false);
    expect(hasHighYieldTopicData(null)).toBe(false);
  });

  it("flags a real entry as having facts", () => {
    const data = getHighYieldTopicData("physics", "projectile-motion", "Projectile Motion");
    expect(hasHighYieldTopicData(data)).toBe(true);
  });
});

describe("coverage of the shipped topic manifests", () => {
  it("resolves every topic to facts that claim its unit", () => {
    // This is an intentional guard, not a formality: a topic with no entry shows
    // no Fact Bank section at all, so a new topic silently loses a whole
    // revision block until someone adds a bank entry for its unit.
    const unresolved: string[] = [];
    const wrongUnit: string[] = [];

    for (const row of readManifestTopics()) {
      const data = getHighYieldTopicData(row.subject, row.topic ?? "", row.title, row.unit);
      if (!data) {
        unresolved.push(`${row.subject}/${row.unit ?? "?"}/${row.topic ?? "?"}`);
        continue;
      }
      if (row.unit && !data.unitSlugs?.includes(row.unit)) {
        wrongUnit.push(`${row.subject}/${row.unit}/${row.topic ?? "?"} -> ${data.title}`);
      }
    }

    expect(unresolved, `topics with no curated facts:\n  ${unresolved.join("\n  ")}`).toEqual([]);
    expect(wrongUnit, `topics answered by another unit's entry:\n  ${wrongUnit.join("\n  ")}`).toEqual([]);
  });

  it("covers the Nepali grammar unit, which has no science-style formulas", () => {
    const data = getHighYieldTopicData(
      "nepali",
      "swar-varna",
      "स्वर वर्ण (Vowel Letters)",
      "bhasha-ra-vyakarana",
    );

    expect(data).not.toBeNull();
    expect(data!.subject).toBe("nepali");
    expect(data!.unitSlugs).toContain("bhasha-ra-vyakarana");
    expect(data!.speedFormulas.length).toBeGreaterThan(0);
  });
});
