import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";

import { SYLLABUS } from "@/lib/syllabus";
import {
  HOME_RAIL_CLASS_SLUG,
  HOME_RAIL_ROWS,
  buildRailSkeleton,
  loadHomeRailCorpus,
  railReadiness,
  resolveUnitContentDir,
  toRailSlideData,
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
      const dir = resolveUnitContentDir(root, u.subject, u.id);
      if (!dir) {
        missing.push(`${u.subject}/${u.id} (no content dir)`);
      }
    }
    expect(missing).toEqual([]);
    expect(units.length).toBe(70);
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
    const skeleton = buildRailSkeleton("physics", "Physics", {
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
});
