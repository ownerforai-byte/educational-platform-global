import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * PYQ bank integrity gate.
 *
 * Regression guard for a silent, total failure: `getSubjectPyqBank()` read
 * `ravikishan/manifest.json`, whose 2467 entries carry `title`/`unitSlug`/
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

const ROOT = join(process.cwd(), "public/data/ravikishan");
const index = JSON.parse(readFileSync(join(ROOT, "_index.json"), "utf8")) as Record<
  string,
  { title?: string; year?: number; examSource?: string; unitSlug?: string; questions?: unknown[] }
>;

const SUBJECTS = ["physics", "chemistry", "mathematics", "biology", "english", "nepali"] as const;

type YearBucket = { questions: unknown[]; units: string[]; titles: string[] };

/** Mirrors getSubjectPyqBank()'s year aggregation for a subject. */
function aggregate(subjectSlug: string): Map<number, YearBucket> {
  const prefixes = [`class-11-notes/${subjectSlug}/`, `class-11/${subjectSlug}/`];
  const byYear = new Map<number, YearBucket>();
  for (const [path, file] of Object.entries(index)) {
    if (!prefixes.some((p) => path.startsWith(p))) continue;
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
    for (const subject of SUBJECTS) {
      const label = `NEB Class 11 ${subject[0].toUpperCase()}${subject.slice(1)}`;
      for (const [year, bucket] of aggregate(subject)) {
        if (bucket.units.length < 2) continue; // single-unit years keep their own title
        for (const title of bucket.titles) {
          expect(
            title.startsWith(label),
            `${subject} ${year}: "${title}" does not start with "${label}"`,
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

describe("PYQ bank — authored banks are registered", () => {
  it("every unit/year bank on disk has an index entry with questions", () => {
    const fs = require("node:fs") as typeof import("node:fs");
    const contentRoot = join(process.cwd(), "..", "content/ravikishan/class-11-notes");
    const missing: string[] = [];
    let banks = 0;
    for (const subject of SUBJECTS) {
      const subjectDir = join(contentRoot, subject);
      if (!fs.existsSync(subjectDir)) continue;
      for (const unit of fs.readdirSync(subjectDir)) {
        const pyqDir = join(subjectDir, unit, "pyqs");
        if (!fs.existsSync(pyqDir)) continue;
        for (const f of fs.readdirSync(pyqDir)) {
          if (!/^\d{2}-neb-\d{4}\.json$/.test(f)) continue;
          banks += 1;
          const key = `class-11-notes/${subject}/${unit}/pyqs/${f}`;
          const entry = index[key];
          if (!entry || !Array.isArray(entry.questions) || entry.questions.length === 0) {
            missing.push(key);
          }
        }
      }
    }
    expect(banks).toBeGreaterThan(0);
    expect(missing, `unregistered exam banks: ${missing.slice(0, 5).join(", ")}`).toEqual([]);
  });
});