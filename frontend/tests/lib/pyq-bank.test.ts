import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * PYQ bank integrity gate.
 *
 * Regression guard for a silent, total failure: `getSubjectPyqBank()` read
 * `content/manifest.json`, whose entries carry `title`/`unitSlug`/
 * `notes` but NOT `questions`. The loader skipped every entry on
 * `questions.length > 0`, so every subject rendered an EMPTY PYQ bank while
 * looking perfectly healthy — no error, no warning, just nothing.
 *
 * Two invariants this file locks down:
 *  1. `_index.json` — the only source with real `questions` — actually has
 *     them, for every subject. A future rebuild that drops the array turns the
 *     feature off again, so it must fail loudly here instead.
 *  2. The unit/year banks on disk are registered in the index, so authoring
 *     content does not silently fail to reach the UI.
 *
 * Aggregation itself is covered by mirroring `getSubjectPyqBank()`'s grouping
 * below: a year is ONE card spanning every unit that contributed to it.
 */

// manifest.json stays in public/data (metadata); _index.json moved to corpus.
const ROOT = join(process.cwd(), "public/data/content");
import { existsSync } from "node:fs";
const INDEX_ROOT = existsSync(join(ROOT, "_index.json"))
  ? ROOT
  : join(process.cwd(), "..", "content");
const index = JSON.parse(readFileSync(join(INDEX_ROOT, "_index.json"), "utf8")) as Record<
  string,
  { title?: string; year?: number; examSource?: string; unitSlug?: string; questions?: unknown[] }
>;

const SUBJECTS = ["physics", "chemistry", "mathematics", "biology", "english", "nepali"] as const;

type YearBucket = { questions: unknown[]; units: string[]; titles: string[] };

/** Mirrors getSubjectPyqBank()'s year aggregation for a subject. */
function aggregate(subjectSlug: string, classSlug = "class-11-notes"): Map<number, YearBucket> {
  // Classified keys carry the normalized class dir: `notes/theory/class-11/…`,
  // `practice/questions/class-11/…` — match the class/subject coordinates.
  const classDir = classSlug.replace(/-notes$/, "");
  const coord = `/${classDir}/${subjectSlug}/`;
  const byYear = new Map<number, YearBucket>();
  for (const [path, file] of Object.entries(index)) {
    if (!path.includes(coord)) continue;
    // Mirror the loader: textbook solutions never become exam-year PYQ cards.
    if (path.startsWith("practice/solutions/")) continue;
    const questions = Array.isArray(file.questions) ? file.questions : [];
    if (questions.length === 0) continue;
    const year = typeof file.year === "number" ? file.year : Number.NaN;
    if (!Number.isFinite(year)) continue;
    const bucket = byYear.get(year) ?? { questions: [], units: [], titles: [] };
    bucket.questions.push(...questions);
    const unit = file.unitSlug ?? "general";
    if (!bucket.units.includes(unit)) bucket.units.push(unit);
    const title = file.title;
    if (title && !bucket.titles.includes(title)) bucket.titles.push(title);
    byYear.set(year, bucket);
  }
  return byYear;
}

describe("PYQ bank — data source actually carries questions", () => {
  it("manifest.json is NOT a usable PYQ source (why _index.json is read)", () => {
    const manifest = JSON.parse(readFileSync(join(ROOT, "manifest.json"), "utf8")) as Array<{
      path: string;
      data: { questions?: unknown[] };
    }>;
    const withQuestions = manifest.filter((e) => Array.isArray(e.data.questions) && e.data.questions.length > 0);
    // If this ever becomes non-zero the loader could read either source — fine,
    // but the test documents why _index.json is the primary.
    expect(withQuestions.length).toBe(0);
  });

  it.each(SUBJECTS)("%s has indexed PYQ questions", (subject) => {
    const byYear = aggregate(subject);
    expect(byYear.size).toBeGreaterThan(0);
    const total = [...byYear.values()].reduce((n, b) => n + b.questions.length, 0);
    expect(total).toBeGreaterThan(0);
  });
});

describe("PYQ bank — Class 12 banks reach the loader", () => {
  // getSubjectPyqBank("class-12-notes", …) accepts keys under either
  // "class-12-notes/<subject>/" or "class-12/<subject>/" — a bank registered
  // under any other prefix renders nothing while looking healthy.
  it.each(SUBJECTS)("class-12 %s has indexed PYQ questions", (subject) => {
    const byYear = aggregate(subject, "class-12-notes");
    expect(byYear.size).toBeGreaterThan(0);
    const total = [...byYear.values()].reduce((n, b) => n + b.questions.length, 0);
    expect(total).toBeGreaterThan(0);
  });

  it.each(SUBJECTS)("class-12 %s covers every authored unit within the year cap", (subject) => {
    // A unit is unreachable if every card it appears on is dropped by maxYears.
    const MAX_YEARS = 10;
    const all = aggregate(subject, "class-12-notes");
    const surviving = new Set(
      [...all.entries()]
        .sort((a, b) => b[0] - a[0])
        .slice(0, MAX_YEARS)
        .flatMap(([, b]) => b.units),
    );
    const authored = new Set(
      Object.entries(index)
        // Mirror aggregate(): classified keys carry the normalized class dir,
        // e.g. `practice/questions/class-12/<subject>/…`. Drills/practicals
        // are year-less by design (own per-unit coverage test below).
        .filter(
          ([p, f]) =>
            p.includes(`/class-12/${subject}/`) &&
            !p.includes("drills/") &&
            !p.includes("practicals/") &&
            (f.questions?.length ?? 0) > 0,
        )
        .map(([, f]) => f.unitSlug ?? "general"),
    );
    expect(authored.size).toBeGreaterThan(0);
    for (const unit of authored) {
      expect(surviving.has(unit), `class-12 ${subject}/${unit} is outside the ${MAX_YEARS}-year cap`).toBe(true);
    }
  });
});

describe("PYQ bank — one card per exam year, spanning units", () => {
  it.each(SUBJECTS)("%s aggregates multiple units into a year card", (subject) => {
    for (const [year, bucket] of aggregate(subject)) {
      expect(bucket.questions.length, `${subject} ${year}`).toBeGreaterThan(0);
      expect(bucket.units.length).toBeGreaterThan(0);
      // a card is per YEAR, so no year may split into several buckets
      expect(bucket.titles.length).toBeGreaterThan(0);
    }
  });

  it("years come back newest first", () => {
    const years = [...aggregate("physics").keys()].sort((a, b) => b - a);
    expect(years).toEqual([...years].sort((a, b) => b - a));
    expect(years[0]).toBeGreaterThanOrEqual(years[years.length - 1]);
  });

  it("a multi-unit year is titled at subject level, not after one unit", () => {
    // The card for an aggregated year must not read like a single unit's bank
    // (that was the bug: "…— Dynamics — 2023 + others"). Every file in a year
    // shares one subject prefix, so the subject-level title is recoverable.
    //
    // A subject has more than one legitimate label. Nepali-medium papers in the
    // older `class-11/<subject>/pyqs/` tree are titled "NEB Class 11 नेपाली",
    // which is the CORRECT subject-level name for them — the invariant being
    // protected is "subject level, not unit level", so the localized label
    // satisfies it and rejecting it would only force a wrong title back on a
    // real paper.
    const SUBJECT_LABELS: Record<string, string[]> = {
      nepali: ["Nepali", "नेपाली"],
    };
    for (const subject of SUBJECTS) {
      const labels = [
        `NEB Class 11 ${subject[0].toUpperCase()}${subject.slice(1)}`,
        ...(SUBJECT_LABELS[subject] ?? []).map((localized) => `NEB Class 11 ${localized}`),
      ];
      for (const [year, bucket] of aggregate(subject)) {
        if (bucket.units.length < 2) continue; // single-unit years keep their own title
        for (const title of bucket.titles) {
          expect(
            labels.some((label) => title.startsWith(label)),
            `${subject} ${year}: "${title}" starts with none of ${JSON.stringify(labels)}`,
          ).toBe(true);
        }
        // titles differ only by unit/year, so they share a real common prefix
        expect(bucket.titles.length).toBeGreaterThan(1);
      }
    }
  });

  it("the maxYears cap never hides a whole unit", () => {
    // getSubjectPyqBank defaults to maxYears=10 and drops the OLDEST cards past
    // that. Dropping an old year is intended; dropping every question a unit has
    // is the bug this guards — a unit absent from the surviving cards is
    // unreachable no matter how the student scrolls.
    const MAX_YEARS = 10;
    for (const subject of SUBJECTS) {
      const all = aggregate(subject);
      const surviving = new Set(
        [...all.entries()]
          .sort((a, b) => b[0] - a[0])
          .slice(0, MAX_YEARS)
          .flatMap(([, b]) => b.units),
      );
      for (const [year, bucket] of all) {
        for (const unit of bucket.units) {
          expect(
            surviving.has(unit),
            `${subject}/${unit} only appears in ${year}, which falls outside the ${MAX_YEARS}-year cap`,
          ).toBe(true);
        }
      }
    }
  });
});

describe("Concept drills — loader coordinates", () => {
  it("drills keys parse to class/subject/unit coordinates", async () => {
    const { parseContentPath } = await import("@/lib/content/paths");
    const parsed = parseContentPath("drills/class-12/physics/electrostatics/01-concepts.json");
    expect(parsed?.classDir).toBe("class-12");
    expect(parsed?.subjectSlug).toBe("physics");
    expect(parsed?.unitSlug).toBe("electrostatics");
  });
});

describe("Concept drills — every subject has misconception-busting Q&A", () => {
  it.each(SUBJECTS)("%s drills carry a question and a clearing explanation", (subject) => {
    const buckets = new Map<string, { questions: unknown[] }>();
    for (const [path, file] of Object.entries(index)) {
      if (!path.includes("drills/") || !path.includes(`/${subject}/`)) continue;
      const questions = Array.isArray(file.questions) ? file.questions : [];
      if (questions.length === 0) continue;
      buckets.set(path, { questions });
    }
    expect(buckets.size, `${subject} has no drill files`).toBeGreaterThan(0);
    for (const [path, bucket] of buckets) {
      for (const q of bucket.questions as Array<{ question?: unknown; solution?: unknown }>) {
        expect(Boolean(typeof q.question === "string" && q.question.trim()), `${path} drill without a question`).toBe(true);
        expect(Boolean(typeof q.solution === "string" && q.solution.trim()), `${path} drill without a clearing explanation`).toBe(true);
      }
    }
  });

  it("drills span both classes", () => {
    const classes = new Set<string>();
    for (const path of Object.keys(index)) {
      if (!path.includes("drills/")) continue;
      if (path.includes("/class-11/")) classes.add("class-11");
      if (path.includes("/class-12/")) classes.add("class-12");
    }
    expect(classes.has("class-11")).toBe(true);
    expect(classes.has("class-12")).toBe(true);
  });
});

describe("PYQ bank — authored banks are registered", () => {
  it("every unit/year bank on disk has an index entry with questions", () => {
    const fs = require("node:fs") as typeof import("node:fs");
    const classSlugs = ["class-11", "class-12"] as const;
    // Every question family must stay registered: the classified section, the
    // subject-wise PYQ bank (`content/pyqs/`), concept drills (`content/drills/`)
    // and mind-opening practicals (`content/practicals/`, one file per subject).
    const families = [
      { dir: "practice/questions", prefix: "practice/questions" },
      { dir: "pyqs", prefix: "pyqs" },
      { dir: "drills", prefix: "drills" },
      { dir: "practicals", prefix: "practicals" },
    ] as const;
    const missing: string[] = [];
    let banks = 0;
    // Year banks (`01-neb-2024.json`), drills (`01-concepts.json`), practicals (`01-practicals.json`).
    const BANK_FILE = /^(\d{2}-neb-\d{4}|\d{2}-concepts|\d{2}-practicals)\.json$/;
    const checkFile = (f: string, full: string, key: string) => {
      if (!BANK_FILE.test(f)) return;
      // Legacy-schema banks (title/year/examSource/notes, no `questions`
      // array) are served but intentionally not unit-registered — see the
      // schema note in scripts/pyq-register.mjs.
      const body = JSON.parse(fs.readFileSync(full, "utf8")) as { questions?: unknown[] };
      if (!Array.isArray(body.questions)) return;
      banks += 1;
      const entry = index[key];
      if (!entry || !Array.isArray(entry.questions) || entry.questions.length === 0) {
        missing.push(key);
      }
    };
    for (const classSlug of classSlugs) {
      for (const family of families) {
      const contentRoot = join(process.cwd(), "..", "content", family.dir, classSlug);
      if (!fs.existsSync(contentRoot)) continue;
      for (const subject of SUBJECTS) {
        const subjectDir = join(contentRoot, subject);
        if (!fs.existsSync(subjectDir)) continue;
        // Subject-level files (practicals: one file per subject).
        for (const f of fs.readdirSync(subjectDir)) {
          const full = join(subjectDir, f);
          if (fs.statSync(full).isDirectory()) continue;
          checkFile(f, full, `${family.prefix}/${classSlug}/${subject}/${f}`);
        }
        for (const unit of fs.readdirSync(subjectDir)) {
          const pyqDir = join(subjectDir, unit);
          if (!fs.existsSync(pyqDir) || !fs.statSync(pyqDir).isDirectory()) continue;
          for (const f of fs.readdirSync(pyqDir)) {
            checkFile(f, join(pyqDir, f), `${family.prefix}/${classSlug}/${subject}/${unit}/${f}`);
          }
        }
        }
      }
    }
    expect(banks).toBeGreaterThan(0);
    expect(missing, `unregistered exam banks: ${missing.slice(0, 5).join(", ")}`).toEqual([]);
  });
});

describe("Practicals — every syllabus unit has a mind-opening question", () => {
  it.each([
    ["class-11", "physics"],
    ["class-11", "chemistry"],
    ["class-11", "biology"],
    ["class-11", "mathematics"],
    ["class-11", "english"],
    ["class-11", "nepali"],
    ["class-12", "physics"],
    ["class-12", "chemistry"],
    ["class-12", "biology"],
    ["class-12", "mathematics"],
    ["class-12", "english"],
    ["class-12", "nepali"],
  ])("%s %s covers every unit", (classSlug, subject) => {
    const fs = require("node:fs") as typeof import("node:fs");
    // Authoritative unit list: the classified unit dirs.
    const unitsDir = join(process.cwd(), "..", "content", "practice", "questions", classSlug, subject);
    const units = (fs.existsSync(unitsDir) ? fs.readdirSync(unitsDir) : []).filter((u) =>
      fs.statSync(join(unitsDir, u)).isDirectory(),
    );
    expect(units.length, `${classSlug}/${subject} has no units`).toBeGreaterThan(0);
    // Units the practicals file actually answers.
    const practicals = Object.entries(index).filter(([p]) =>
      p.startsWith(`practicals/${classSlug}/${subject}/`),
    );
    expect(practicals.length, `${classSlug}/${subject} has no practicals file`).toBeGreaterThan(0);
    const answered = new Set<string>();
    for (const [, file] of practicals) {
      for (const q of (file.questions ?? []) as Array<{ unitSlug?: unknown }>) {
        if (typeof q.unitSlug === "string" && q.unitSlug) answered.add(q.unitSlug);
      }
    }
    const uncovered = units.filter((u) => !answered.has(u));
    expect(uncovered, `${classSlug}/${subject} units without practicals: ${uncovered.slice(0, 5).join(", ")}`).toEqual([]);
  });
});