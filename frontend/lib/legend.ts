/**
 * Legend / Key Facts Index Utility
 *
 * Scans `content/ravikishan/{classSlug}/{subjectSlug}/` directories for
 * concept JSON files that contain universalFacts (legend/key-fact entries),
 * then returns them grouped by subject and unit.
 */

import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { SYLLABUS } from "@/lib/syllabus";
import type { SyllabusUnit } from "@/lib/syllabus";

export interface LegendEntry {
  classSlug: string;
  subjectSlug: string;
  unitId: string;
  unitTitle: string;
  topicSlug: string;
  topicTitle: string;
  /** Matching concept file path relative to project root */
  filePath: string;
  /** The universalFacts array (the "legend" items) */
  facts: string[];
  /** First fact as preview */
  preview: string;
}

const CONTENT_BASE = join(process.cwd(), "content", "ravikishan");

function slugifyFileName(name: string): string {
  return name
    .replace(/\.json$/, "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Scan one class+subject pair for concept files with universalFacts.
 */
async function scanSubject(
  classSlug: string,
  subjectSlug: string,
): Promise<LegendEntry[]> {
  const baseDir = join(CONTENT_BASE, classSlug, subjectSlug);
  const entries: LegendEntry[] = [];

  try {
    const unitDirs = await readdir(baseDir, { withFileTypes: true });
    for (const unitDir of unitDirs) {
      if (!unitDir.isDirectory() || unitDir.name.startsWith(".")) continue;
      if (["notes", "pyqs", "sets", "examples", "concepts"].includes(unitDir.name)) continue;

      const unitId = unitDir.name;
      const unitInfo = findUnit(classSlug, subjectSlug, unitId);
      const unitTitle = unitInfo?.title ?? unitId;

      const conceptsDir = join(baseDir, unitId, "concepts");
      try {
        const files = await readdir(conceptsDir, { withFileTypes: true });
        for (const file of files) {
          if (!file.name.endsWith(".json")) continue;

          const filePath = join("content", "ravikishan", classSlug, subjectSlug, unitId, "concepts", file.name);
          const raw = await readFile(filePath, "utf-8");
          let parsed: Record<string, unknown>;
          try {
            parsed = JSON.parse(raw);
          } catch {
            continue;
          }

          const facts = (parsed.universalFacts as string[] | undefined) ?? [];
          if (facts.length === 0) continue;

          const topicSlug = slugifyFileName(file.name);
          const topicTitle = (parsed.topicTitle as string) ?? file.name.replace(/\.json$/, "");

          entries.push({
            classSlug,
            subjectSlug,
            unitId,
            unitTitle,
            topicSlug,
            topicTitle,
            filePath,
            facts,
            preview: facts[0]?.slice(0, 140) ?? "",
          });
        }
      } catch {
        // No concepts/ dir — skip
      }
    }
  } catch {
    // Directory doesn't exist — skip
  }

  return entries;
}

function findUnit(
  classSlug: string,
  subjectSlug: string,
  unitId: string,
): SyllabusUnit | undefined {
  const cls = SYLLABUS.find((c) => c.slug === classSlug);
  if (!cls) return undefined;
  const subj = cls.subjects.find((s) => s.slug === subjectSlug);
  if (!subj) return undefined;
  return subj.units.find((u) => u.id === unitId);
}

/**
 * Build the full legend index across all class tracks and subjects.
 */
export async function getLegendIndex(): Promise<LegendEntry[]> {
  const all: LegendEntry[] = [];
  const seen = new Set<string>();

  for (const cls of SYLLABUS) {
    for (const subject of cls.subjects) {
      const entries = await scanSubject(cls.slug, subject.slug);
      for (const e of entries) {
        const key = `${e.classSlug}/${e.subjectSlug}/${e.unitId}/${e.topicSlug}`;
        if (seen.has(key)) continue;
        seen.add(key);
        all.push(e);
      }
    }
  }

  all.sort((a, b) => {
    const clsA = SYLLABUS.findIndex((c) => c.slug === a.classSlug);
    const clsB = SYLLABUS.findIndex((c) => c.slug === b.classSlug);
    if (clsA !== clsB) return clsA - clsB;
    const subjA = SYLLABUS[clsA]?.subjects.findIndex((s) => s.slug === a.subjectSlug) ?? -1;
    const subjB = SYLLABUS[clsB]?.subjects.findIndex((s) => s.slug === b.subjectSlug) ?? -1;
    if (subjA !== subjB) return subjA - subjB;
    const unitA = SYLLABUS[clsA]?.subjects[subjA]?.units.findIndex((u) => u.id === a.unitId) ?? -1;
    const unitB = SYLLABUS[clsB]?.subjects[subjB]?.units.findIndex((u) => u.id === b.unitId) ?? -1;
    if (unitA !== unitB) return unitA - unitB;
    return a.topicSlug.localeCompare(b.topicSlug);
  });

  return all;
}

/**
 * Filter the full index for a specific class + subject.
 */
export function filterLegends(
  entries: LegendEntry[],
  options: {
    classSlug?: string;
    subjectSlug?: string;
  },
): LegendEntry[] {
  return entries.filter(
    (e) =>
      (!options.classSlug || e.classSlug === options.classSlug) &&
      (!options.subjectSlug || e.subjectSlug === options.subjectSlug),
  );
}

/**
 * Group legend entries by unit for display.
 */
export function groupLegendsByUnit(
  entries: LegendEntry[],
): Map<string, LegendEntry[]> {
  const map = new Map<string, LegendEntry[]>();
  for (const e of entries) {
    const arr = map.get(e.unitId) ?? [];
    arr.push(e);
    map.set(e.unitId, arr);
  }
  return map;
}

/**
 * Group legend entries by subject for display.
 */
export function groupLegendsBySubject(
  entries: LegendEntry[],
): Map<string, LegendEntry[]> {
  const map = new Map<string, LegendEntry[]>();
  for (const e of entries) {
    const arr = map.get(e.subjectSlug) ?? [];
    arr.push(e);
    map.set(e.subjectSlug, arr);
  }
  return map;
}
