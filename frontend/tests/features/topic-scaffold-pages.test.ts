import { describe, it, expect } from "vitest";
import { collectRoutes, routeExists } from "../helpers/route-tree";
import { SYLLABUS, getUnitTopicEntries } from "@/lib/syllabus";
import { getUnitTopic } from "@/lib/queries";

/**
 * The Nepali tree and the per-topic "Concepts, Legends & Facts" pages are
 * scaffolds by design: every unit/topic page exists from day one and the
 * notes, exercises, exam shortcuts, time-saving notes and PYQ solutions are
 * added later. These guards pin that the routes are in the tree and that
 * every syllabus topic resolves through the exact gate the pages use — a
 * topic that fails here would render a "Topic not found" empty state.
 */
describe("topic scaffold pages (Nepali + Concepts/Legends & Facts)", () => {
  const routes = collectRoutes();

  it("exercise and legend topic routes exist in both class tracks", () => {
    expect(
      routeExists(
        "/class-11-notes/physics/chapters/mechanics/topics/kinematics/exercises",
        routes,
      ),
    ).toBe(true);
    expect(
      routeExists(
        "/class-12-notes/nepali/chapters/sahitya-adhyayan/topics/paath-1/exercises",
        routes,
      ),
    ).toBe(true);
    expect(
      routeExists("/legend/class-11-notes/physics/mechanics/kinematics", routes),
    ).toBe(true);
    expect(
      routeExists("/legend/class-12-notes/nepali/sahitya-adhyayan/paath-1", routes),
    ).toBe(true);
  });

  it("every Nepali unit and topic resolves to a page (Devanagari slugs included)", () => {
    let checked = 0;
    for (const cls of SYLLABUS) {
      const nepali = cls.subjects.find((s) => s.slug === "nepali");
      if (!nepali) continue;
      for (const unit of nepali.units) {
        for (const entry of getUnitTopicEntries(unit)) {
          expect(
            getUnitTopic(cls.slug, "nepali", unit.id, entry.slug),
            `${cls.slug}/${unit.id}/${entry.slug} did not resolve`,
          ).not.toBeNull();
          checked += 1;
        }
      }
    }
    expect(checked).toBeGreaterThan(0);
  });

  it("every topic of all six subjects has its page targets (legend + exercises)", () => {
    const subjects = [
      "biology",
      "chemistry",
      "english",
      "mathematics",
      "nepali",
      "physics",
    ];
    let checked = 0;
    for (const cls of SYLLABUS) {
      for (const subjectSlug of subjects) {
        const subject = cls.subjects.find((s) => s.slug === subjectSlug);
        expect(subject, `${cls.slug} is missing the ${subjectSlug} syllabus`).toBeTruthy();
        for (const unit of subject!.units) {
          for (const entry of getUnitTopicEntries(unit)) {
            expect(
              getUnitTopic(cls.slug, subjectSlug, unit.id, entry.slug),
              `${cls.slug}/${subjectSlug}/${unit.id}/${entry.slug} did not resolve`,
            ).not.toBeNull();
            checked += 1;
          }
        }
      }
    }
    expect(checked).toBeGreaterThan(100);
  });
});
