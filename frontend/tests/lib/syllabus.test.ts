import { describe, expect, it } from "vitest";
import {
  SYLLABUS,
  getSyllabusByClass,
  getSubjectSyllabus,
  getUnitSyllabus,
  getSubjectTopics,
  getUnitTopicEntries,
  getTopicEntryBySlug,
  slugifySyllabusTopic,
  isClassTrackSlug,
  type SyllabusUnit,
  type ClassSyllabus,
  type SubjectSyllabus,
} from "@/lib/syllabus";

describe("SYLLABUS", () => {
  it("contains both class tracks", () => {
    const slugs = SYLLABUS.map((c) => c.slug);
    expect(slugs).toContain("class-11-notes");
    expect(slugs).toContain("class-12-notes");
  });

  it("has subjects for each class", () => {
    for (const cls of SYLLABUS) {
      expect(cls.subjects.length).toBeGreaterThan(0);
      const subjects = cls.subjects.map((s) => s.slug);
      expect(subjects).toContain("physics");
      expect(subjects).toContain("chemistry");
      expect(subjects).toContain("biology");
      expect(subjects).toContain("mathematics");
    }
  });

  it("each subject has units with topics", () => {
    for (const cls of SYLLABUS) {
      for (const subject of cls.subjects) {
        expect(subject.units.length).toBeGreaterThan(0);
        for (const unit of subject.units) {
          expect(unit.topics.length).toBeGreaterThan(0);
        }
      }
    }
  });
});

describe("getSyllabusByClass", () => {
  it("returns class-11 syllabus", () => {
    const result = getSyllabusByClass("class-11-notes");
    expect(result).toBeDefined();
    expect(result?.slug).toBe("class-11-notes");
    expect(result?.subjects.length).toBeGreaterThan(0);
  });

  it("returns class-12 syllabus", () => {
    const result = getSyllabusByClass("class-12-notes");
    expect(result).toBeDefined();
    expect(result?.slug).toBe("class-12-notes");
  });

  it("returns undefined for unknown class", () => {
    expect(getSyllabusByClass("unknown-class")).toBeUndefined();
  });

  it("returns undefined for empty string", () => {
    expect(getSyllabusByClass("")).toBeUndefined();
  });
});

describe("getSubjectSyllabus", () => {
  it("returns physics syllabus", () => {
    const result = getSubjectSyllabus("class-11-notes", "physics");
    expect(result).toBeDefined();
    expect(result?.slug).toBe("physics");
    expect(result?.name).toBe("Physics");
  });

  it("returns chemistry syllabus", () => {
    const result = getSubjectSyllabus("class-11-notes", "chemistry");
    expect(result?.slug).toBe("chemistry");
  });

  it("returns biology syllabus", () => {
    const result = getSubjectSyllabus("class-11-notes", "biology");
    expect(result?.slug).toBe("biology");
  });

  it("returns mathematics syllabus", () => {
    const result = getSubjectSyllabus("class-11-notes", "mathematics");
    expect(result?.slug).toBe("mathematics");
  });

  it("returns undefined for unknown subject", () => {
    expect(getSubjectSyllabus("class-11-notes", "unknown")).toBeUndefined();
  });

  it("returns undefined for unknown class", () => {
    expect(getSubjectSyllabus("unknown-class", "physics")).toBeUndefined();
  });

  it("works for class-12 as well", () => {
    const result = getSubjectSyllabus("class-12-notes", "physics");
    expect(result).toBeDefined();
    expect(result?.slug).toBe("physics");
  });
});

describe("getUnitSyllabus", () => {
  it("returns a unit by id", () => {
    const physics = getSubjectSyllabus("class-11-notes", "physics")!;
    expect(physics).toBeDefined();
    expect(physics.units.length).toBeGreaterThan(0);

    const unit = getUnitSyllabus(physics, physics.units[0].id);
    expect(unit).toBeDefined();
    expect(unit?.id).toBe(physics.units[0].id);
  });

  it("returns undefined for unknown unit id", () => {
    const physics = getSubjectSyllabus("class-11-notes", "physics")!;
    expect(getUnitSyllabus(physics, "nonexistent-unit")).toBeUndefined();
  });

  it("unit has topics", () => {
    const physics = getSubjectSyllabus("class-11-notes", "physics")!;
    for (const unit of physics.units) {
      const resolved = getUnitSyllabus(physics, unit.id);
      expect(resolved).toBeDefined();
      expect(resolved?.topics.length).toBeGreaterThan(0);
    }
  });
});

describe("getSubjectTopics", () => {
  it("flattens all topics from all units", () => {
    const physics = getSubjectSyllabus("class-11-notes", "physics")!;
    const topics = getSubjectTopics(physics);
    expect(topics.length).toBeGreaterThan(10);
  });

  it("maintains curriculum order", () => {
    const physics = getSubjectSyllabus("class-11-notes", "physics")!;
    const topics = getSubjectTopics(physics);
    // First topic of first unit should come before last topic of last unit
    const firstUnitFirstTopic = physics.units[0].topics[0];
    const lastUnitLastTopic = physics.units[physics.units.length - 1].topics[
      physics.units[physics.units.length - 1].topics.length - 1
    ];
    expect(topics.indexOf(firstUnitFirstTopic)).toBeLessThan(
      topics.indexOf(lastUnitLastTopic),
    );
  });

  it("contains no duplicates", () => {
    const chemistry = getSubjectSyllabus("class-11-notes", "chemistry")!;
    const topics = getSubjectTopics(chemistry);
    const unique = [...new Set(topics)];
    expect(topics.length).toBe(unique.length);
  });
});

describe("slugifySyllabusTopic", () => {
  it("lowercases and slugifies", () => {
    expect(slugifySyllabusTopic("Hello World")).toBe("hello-world");
  });

  it("removes diacritics", () => {
    expect(slugifySyllabusTopic("Résumé")).toBe("resume");
  });

  it("handles special characters", () => {
    expect(slugifySyllabusTopic("Calculus (Limits)")).toBe("calculus-limits");
  });

  it("replaces multiple spaces", () => {
    expect(slugifySyllabusTopic("a  b   c")).toBe("a-b-c");
  });

  it("strips leading/trailing hyphens", () => {
    expect(slugifySyllabusTopic("-Topic-")).toBe("topic");
  });

  it("handles empty input", () => {
    expect(slugifySyllabusTopic("")).toBe("topic");
  });

  it("truncates long titles to 96 chars", () => {
    const longTitle = "a".repeat(200);
    const slug = slugifySyllabusTopic(longTitle);
    expect(slug.length).toBeLessThanOrEqual(96);
  });

  it("preserves numbers", () => {
    expect(slugifySyllabusTopic("Topic 123")).toBe("topic-123");
  });
});

describe("getUnitTopicEntries", () => {
  it("generates unique slugs for each topic", () => {
    const physics = getSubjectSyllabus("class-11-notes", "physics")!;
    const entries = getUnitTopicEntries(physics.units[0]);
    expect(entries.length).toBe(physics.units[0].topics.length);

    const slugs = entries.map((e) => e.slug);
    const uniqueSlugs = [...new Set(slugs)];
    expect(slugs.length).toBe(uniqueSlugs.length);
  });

  it("entries have correct index", () => {
    const physics = getSubjectSyllabus("class-11-notes", "physics")!;
    const entries = getUnitTopicEntries(physics.units[0]);
    entries.forEach((entry, i) => {
      expect(entry.index).toBe(i);
      expect(entry.title).toBe(physics.units[0].topics[i]);
    });
  });

  it("handles duplicate topic names", () => {
    const unit: SyllabusUnit = {
      id: "test",
      title: "Test Unit",
      topics: ["Topic A", "Topic A", "Topic A"],
    };
    const entries = getUnitTopicEntries(unit);
    expect(entries[0].slug).toBe("topic-a");
    expect(entries[1].slug).toBe("topic-a-2");
    expect(entries[2].slug).toBe("topic-a-3");
  });
});

describe("getTopicEntryBySlug", () => {
  it("finds topic by slug", () => {
    const physics = getSubjectSyllabus("class-11-notes", "physics")!;
    const unit = physics.units[0];
    const entries = getUnitTopicEntries(unit);
    const first = entries[0];

    const found = getTopicEntryBySlug(unit, first.slug);
    expect(found).toBeDefined();
    expect(found?.slug).toBe(first.slug);
    expect(found?.title).toBe(first.title);
  });

  it("returns undefined for unknown slug", () => {
    const physics = getSubjectSyllabus("class-11-notes", "physics")!;
    expect(
      getTopicEntryBySlug(physics.units[0], "nonexistent-topic"),
    ).toBeUndefined();
  });
});

describe("isClassTrackSlug", () => {
  it("accepts valid class slugs", () => {
    expect(isClassTrackSlug("class-11-notes")).toBe(true);
    expect(isClassTrackSlug("class-12-notes")).toBe(true);
  });

  it("rejects invalid slugs", () => {
    expect(isClassTrackSlug("unknown")).toBe(false);
    expect(isClassTrackSlug("")).toBe(false);
    expect(isClassTrackSlug("class-10-notes")).toBe(false);
  });
});

describe("Type safety", () => {
  it("returns typed values", () => {
    const cls: ClassSyllabus | undefined = getSyllabusByClass("class-11-notes");
    expect(cls).toBeDefined();
    if (cls) {
      expect(typeof cls.slug).toBe("string");
      expect(typeof cls.name).toBe("string");
      expect(Array.isArray(cls.subjects)).toBe(true);
    }

    const subj: SubjectSyllabus | undefined = getSubjectSyllabus(
      "class-11-notes",
      "physics",
    );
    expect(subj).toBeDefined();
    if (subj) {
      expect(typeof subj.slug).toBe("string");
      expect(typeof subj.name).toBe("string");
      expect(Array.isArray(subj.units)).toBe(true);
    }
  });
});
