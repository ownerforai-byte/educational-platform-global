import { describe, expect, it } from "vitest";
import {
  getSubjectSyllabus,
  getSyllabusByClass,
  getUnitSyllabus,
  getUnitTopicEntries,
  getTopicEntryBySlug,
  slugifySyllabusTopic,
  isClassTrackSlug,
  SYLLABUS,
} from "@/lib/core/syllabus";

describe("lib/core/syllabus helpers", () => {
  it("ships the two class tracks in curriculum order", () => {
    expect(SYLLABUS.map((c) => c.slug)).toEqual(["class-11-notes", "class-12-notes"]);
    expect(isClassTrackSlug("class-11-notes")).toBe(true);
    expect(isClassTrackSlug("class-99")).toBe(false);
  });

  it("slugifies topic titles for stable URLs", () => {
    expect(slugifySyllabusTopic("Projectile Motion & Applications")).toBe(
      "projectile-motion-applications",
    );
    expect(slugifySyllabusTopic("  DNA  ")).toBe("dna");
  });

  it("resolves class → subject → unit → topic", () => {
    const class11 = getSyllabusByClass("class-11-notes");
    expect(class11?.subjects.length).toBeGreaterThan(0);

    const physics = getSubjectSyllabus("class-11-notes", "physics");
    expect(physics?.name).toBe("Physics");
    const firstUnit = physics!.units[0];
    expect(getUnitSyllabus(physics!, firstUnit.id)?.id).toBe(firstUnit.id);

    const entries = getUnitTopicEntries(firstUnit);
    expect(entries.length).toBe(firstUnit.topics.length);
    const hit = getTopicEntryBySlug(firstUnit, entries[0]!.slug);
    expect(hit?.title).toBe(firstUnit.topics[0]);
  });
});