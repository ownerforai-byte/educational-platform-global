import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";

// The readers fetch the published asset; in the test runner there is no server,
// so serve the real file from disk. Selecting entries from the actual manifest
// keeps this gate honest about what the site ships.
vi.mock("@/lib/data-loader", () => ({
  loadData: async () =>
    JSON.parse(readFileSync(join(process.cwd(), "public/data/content/manifest.json"), "utf8")),
}));

import {
  getTopicSupplementalContent,
  getUnitSupplementalContent,
  hasRenderableBody,
  selectSupplementalContent,
  type ContentLocation,
} from "@/lib/content/topic-supplemental";

/**
 * The classified corpus keeps more per-topic JSON than the canonical note.
 * These cases pin the placement rule that renders those files on their page:
 * an entry goes to the exact syllabus topic it names, and to the unit page — the
 * right place — when it names no topic. It must never be pinned to a topic it
 * does not name, and authoring-only families (plans, rails) must never surface.
 */

const topics = [
  { slug: "projectile-motion-and-its-applications", title: "Projectile motion and its applications" },
  { slug: "equation-of-motion-graphical-treatment", title: "Equation of motion (graphical treatment)" },
];

const location: ContentLocation = {
  classSlug: "class-11-notes",
  subjectSlug: "physics",
  unitSlug: "kinematics",
  topics,
};

const manifest = [
  {
    path: "visuals/graphs/class-11/physics/kinematics/01-projectile-trajectory.json",
    data: {
      title: "Projectile trajectory — parabolic path",
      unitSlug: "kinematics",
      topicSlug: "projectile-motion-and-its-applications",
      notes: ["The path of a projectile is a **parabola**."],
      graph: { title: "Trajectory", xLabel: "Horizontal distance", yLabel: "Height" },
    },
  },
  {
    path: "formulas/class-11/physics/kinematics/01-kinematics-key-equations.json",
    // Subject-level file: the unit lives in the path, not in the JSON body.
    data: { title: "Key Equations — Kinematics", unitSlug: "", topicSlug: "", notes: ["**v = u + at**"] },
  },
  {
    path: "practice/problem-sets/class-11/physics/kinematics/01-extra-drill.json",
    // No topic anywhere in the file: unit-level material.
    data: { title: "Extra drill", unitSlug: "kinematics", topicSlug: "extra-drill", notes: ["Q1. A body …"] },
  },
  {
    path: "practice/problem-sets/class-11/physics/kinematics/02-shape-only.json",
    data: { title: "Shape only", unitSlug: "kinematics", topicSlug: "", notes: [] },
  },
  {
    path: "practice/questions/class-11/physics/neb-2021.json",
    // Measured real shape: title and coordinates only, body lives in the private index.
    data: { title: "NEB Class 11 Physics — 2021", unitSlug: "", topicSlug: "" },
  },
  {
    path: "resources/plans/class-11/physics/kinematics/plan.json",
    data: { title: "Authoring plan", unitSlug: "kinematics", topicSlug: "", notes: ["Internal plan text"] },
  },
  {
    path: "visuals/rails/class-11/physics/kinematics/home-rail.json",
    data: { title: "Home rail", unitSlug: "kinematics", topicSlug: "", notes: ["Rail card"] },
  },
  {
    path: "notes/concepts/class-11/physics/kinematics/03-kinematics.json",
    data: { title: "Concept note", unitSlug: "kinematics", topicSlug: "", notes: ["Canonical note body"] },
  },
  {
    path: "practice/problem-sets/class-12/physics/kinematics/01-class-12-only.json",
    data: { title: "Class 12 file", unitSlug: "kinematics", topicSlug: "", notes: ["Other class"] },
  },
  {
    path: "practice/problem-sets/class-11/physics/dynamics/01-other-unit.json",
    data: { title: "Other unit file", unitSlug: "dynamics", topicSlug: "linear-momentum-impulse", notes: ["Other unit"] },
  },
  {
    path: "notes/guides/class-11/physics/work-energy-power/01-guide.json",
    data: { title: "Work guide", unitSlug: "work-energy-power", topicSlug: "", notes: ["Alias unit folder"] },
  },
];

describe("selectSupplementalContent", () => {
  it("sorts every renderable entry onto its topic or its unit", () => {
    const entries = selectSupplementalContent(manifest, location);

    expect(entries.map((entry) => entry.path).sort()).toEqual(
      [
        "formulas/class-11/physics/kinematics/01-kinematics-key-equations.json",
        "practice/problem-sets/class-11/physics/kinematics/01-extra-drill.json",
        "visuals/graphs/class-11/physics/kinematics/01-projectile-trajectory.json",
      ].sort(),
    );

    const graph = entries.find((entry) => entry.kind === "graph");
    expect(graph?.topicSlug).toBe("projectile-motion-and-its-applications");
    const formula = entries.find((entry) => entry.kind === "formula");
    expect(formula?.topicSlug).toBeUndefined();
  });

  it("never surfaces authoring-only or already-rendered families", () => {
    const paths = selectSupplementalContent(manifest, location).map((entry) => entry.path);

    expect(paths.some((path) => path.startsWith("resources/plans/"))).toBe(false);
    expect(paths.some((path) => path.startsWith("visuals/rails/"))).toBe(false);
    expect(paths.some((path) => path.startsWith("notes/concepts/"))).toBe(false);
  });

  it("keeps classes and units apart", () => {
    const paths = selectSupplementalContent(manifest, location).map((entry) => entry.path);

    expect(paths).not.toContain("practice/problem-sets/class-12/physics/kinematics/01-class-12-only.json");
    expect(paths).not.toContain("practice/problem-sets/class-11/physics/dynamics/01-other-unit.json");
  });

  it("folds an aliased unit folder onto the canonical syllabus unit", () => {
    const entries = selectSupplementalContent(manifest, {
      ...location,
      unitSlug: "work-energy-and-power",
      topics: [],
    });

    expect(entries.map((entry) => entry.title)).toEqual(["Work guide"]);
  });

  it("skips a file that carries no learner-facing body", () => {
    expect(
      hasRenderableBody({ title: "NEB Class 11 Physics — 2021", unitSlug: "", topicSlug: "" }),
    ).toBe(false);
    expect(hasRenderableBody({ notes: ["Q1. State the first law."] })).toBe(true);
  });
});

describe("supplemental content readers", () => {
  it("returns only the entries naming the requested topic", async () => {
    const entries = await getTopicSupplementalContent({
      ...location,
      topicSlug: "projectile-motion-and-its-applications",
    });

    // The real public manifest is read here: the authored projectile graph must
    // reach its topic page, and unit-level files must stay off it.
    expect(entries.length).toBeGreaterThan(0);
    expect(entries.every((entry) => entry.topicSlug === "projectile-motion-and-its-applications")).toBe(true);
    expect(entries.some((entry) => entry.kind === "graph")).toBe(true);
  });

  it("returns the unit-level entries for the unit page", async () => {
    const entries = await getUnitSupplementalContent(location);

    expect(entries.length).toBeGreaterThan(0);
    expect(entries.every((entry) => entry.topicSlug === undefined)).toBe(true);
    expect(entries.some((entry) => entry.kind === "formula")).toBe(true);
  });
});
