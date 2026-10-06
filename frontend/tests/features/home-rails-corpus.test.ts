import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";

import { SYLLABUS } from "@/lib/syllabus";
import {
  HOME_RAIL_CLASS_12_SLUG,
  HOME_RAIL_CLASS_SLUG,
  HOME_RAIL_ROWS,
  buildRailSkeleton,
  groupReadyByUnit,
  loadHomeRailCorpus,
  railReadiness,
  resolveUnitContentDir,
  syllabusUnitOrder,
  toRailSlideData,
  type HomeRailFile,
} from "@/lib/home-rails-corpus";
import { HOME_RAIL_ICONS } from "@/lib/home-subject-slides";

/**
 * Agent-editable rail corpus contract (frontend/AGENTS.md §9):
 * every Class 11 syllabus unit owns a `rails/*.rail.json` card file, drafts
 * never reach the rail, and ready cards resolve to renderable slide data.
 * Runs against the real syllabus + real corpus files (fs reads, no session).
 */
function corpusRoot(): string {
  let dir = path.resolve(process.cwd());
  for (let i = 0; i < 5 && dir !== path.parse(dir).root; i++) {
    if (existsSync(path.join(dir, "content", "ravikishan"))) return dir;
    dir = path.dirname(dir);
  }
  throw new Error("content/ravikishan not found walking up from " + process.cwd());
}

const class11 = SYLLABUS.find((c) => c.slug === HOME_RAIL_CLASS_SLUG);
if (!class11) throw new Error(`class "${HOME_RAIL_CLASS_SLUG}" missing from syllabus.ts`);
const units = class11.subjects.flatMap((s) =>
  s.units.map((u) => ({ subject: s.slug, id: u.id, title: u.title })),
);

describe("home rail corpus", () => {
  it("covers every Class 11 syllabus unit with a rails file", () => {
    const root = corpusRoot();
    const missing: string[] = [];
    for (const u of units) {
      const dir = resolveUnitContentDir(root, HOME_RAIL_CLASS_SLUG, u.subject, u.id);
      if (!dir) {
        missing.push(`${u.subject}/${u.id} (no content dir)`);
      }
    }
    expect(missing).toEqual([]);
    expect(units.length).toBe(70);
  });

  it("covers every Class 12 syllabus unit with a rails file", () => {
    const root = corpusRoot();
    const class12 = SYLLABUS.find((c) => c.slug === HOME_RAIL_CLASS_12_SLUG);
    if (!class12) throw new Error(`class "${HOME_RAIL_CLASS_12_SLUG}" missing from syllabus.ts`);
    const units12 = class12.subjects.flatMap((s) =>
      s.units.map((u) => ({ subject: s.slug, id: u.id })),
    );
    const missing: string[] = [];
    for (const u of units12) {
      const dir = resolveUnitContentDir(root, HOME_RAIL_CLASS_12_SLUG, u.subject, u.id);
      if (!dir) {
        missing.push(`${u.subject}/${u.id} (no content dir)`);
      }
    }
    expect(missing).toEqual([]);
    expect(units12.length).toBe(46);
  });

  it("loads every rails file without throwing; broken ones are reported, not fatal", () => {
    const entries = loadHomeRailCorpus(corpusRoot());
    expect(entries.length).toBeGreaterThanOrEqual(70);
    for (const e of entries) {
      expect(e.file).toMatch(/\.rail\.json$/);
      expect(Array.isArray(e.reasons)).toBe(true);
    }
  });

  it("keeps draft skeletons off the rail and accepts a filled card", () => {
    const skeleton = buildRailSkeleton(HOME_RAIL_CLASS_SLUG, "physics", "Physics", {
      id: "vectors",
      title: "Vectors",
      hours: 4,
      topics: ["Scalar and vector products"],
    });
    expect(railReadiness(skeleton).length).toBeGreaterThan(0);

    const filled = {
      ...skeleton,
      draft: false as const,
      card: {
        tag: "Vectors",
        title: "Cross product — area, torque and the right-hand rule",
        href: "/class-11-notes/physics",
        icon: "Waypoints",
        statKey: "pyq:physics",
      },
      rows: HOME_RAIL_ROWS.map((row, i) => ({
        label: row.label,
        ...(row.kind === "formula" ? { kind: row.kind as "formula" } : {}),
        text: `Filled ${row.label} content, definitely longer than a stub (${i}).`,
      })),
    };
    expect(railReadiness(filled)).toEqual([]);
    const slide = toRailSlideData({
      classSlug: HOME_RAIL_CLASS_SLUG,
      subjectSlug: "physics",
      unitId: "vectors",
      file: "content/ravikishan/class-11-notes/physics/vectors/rails/vectors.rail.json",
      record: filled,
      ready: true,
      reasons: [],
    });
    expect(slide.rows.map((r) => r.label)).toEqual(HOME_RAIL_ROWS.map((r) => r.label));
    expect(slide.rows.find((r) => r.label === "Formula")?.kind).toBe("formula");
    expect(slide.iconName).toBe("Waypoints");
    expect(slide.href.startsWith("/")).toBe(true);
  });

  it("resolves every ready card's icon through the allowlist", () => {
    const entries = loadHomeRailCorpus(corpusRoot()).filter((e) => e.ready);
    for (const e of entries) {
      const slide = toRailSlideData(e);
      expect(
        HOME_RAIL_ICONS[slide.iconName] !== undefined,
        `${e.file}: icon "${slide.iconName}" not in HOME_RAIL_ICONS`,
      ).toBe(true);
    }
  });

  it("keeps the icon allowlist covering all six rail subjects", () => {
    for (const name of ["Atom", "FlaskConical", "Dna", "Sigma", "BookOpen", "Languages"]) {
      expect(HOME_RAIL_ICONS[name] !== undefined, `missing icon ${name}`).toBe(true);
    }
  });

  it("orders units by the syllabus, per class", () => {
    const c11 = syllabusUnitOrder(HOME_RAIL_CLASS_SLUG, "physics");
    expect(c11.length).toBe(26);
    expect(c11[0].id).toBe("physical-quantities");
    const c12 = syllabusUnitOrder(HOME_RAIL_CLASS_12_SLUG, "physics");
    expect(c12.length).toBe(9);
    expect(c12[0].id).toBe("electrostatics");
    expect(syllabusUnitOrder(HOME_RAIL_CLASS_SLUG, "no-such-subject")).toEqual([]);
  });

  it("groups ready cards by unit, skipping drafts and empty units", () => {
    const entry = (over: object) => ({
      classSlug: HOME_RAIL_CLASS_SLUG,
      subjectSlug: "physics",
      unitId: "vectors",
      file: "x",
      record: {} as HomeRailFile,
      ready: true,
      reasons: [],
      ...over,
    });
    const groups = groupReadyByUnit(
      [
        entry({ unitId: "dynamics" }),
        entry({ unitId: "vectors" }),
        entry({ unitId: "vectors", file: "y" }),
        entry({ unitId: "dynamics", ready: false, reasons: ["draft: true"] }),
        entry({ unitId: "vectors", subjectSlug: "chemistry" }),
      ],
      "physics",
    );
    // Syllabus order (vectors before dynamics), drafts and other subjects out,
    // units without ready cards absent entirely.
    expect(groups.map((g) => [g.unitId, g.entries.length])).toEqual([
      ["vectors", 2],
      ["dynamics", 1],
    ]);
    expect(groups[0].unitTitle).toBe("Vectors");
  });
});
