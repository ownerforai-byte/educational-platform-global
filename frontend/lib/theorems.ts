/**
 * Theorem & Proof Index Utility
 *
 * Scans `content/ravikishan/{classSlug}/{subjectSlug}/` directories for
 * concept JSON files that contain theorem statements or proofs,
 * then returns them grouped by unit and topic.
 */

import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { SYLLABUS } from "@/lib/syllabus";
import type { ClassSyllabus, SubjectSyllabus, SyllabusUnit } from "@/lib/syllabus";

export interface TheoremEntry {
  /** The class slug: "class-11-notes", "class-12-notes", etc. */
  classSlug: string;
  /** The subject slug: "mathematics", "physics", etc. */
  subjectSlug: string;
  /** The unit id from the syllabus */
  unitId: string;
  unitTitle: string;
  /** Slugified from the concept filename */
  topicSlug: string;
  topicTitle: string;
  /** Matching concept file path relative to project root */
  filePath: string;
  /** First 200 chars of the proof content (truncated preview) */
  preview: string;
  /** Does this file contain an explicit `<h4>a) Proof</h4>`-style proof block? */
  hasProof: boolean;
  /** All theorem/proof snippets found in notes */
  snippets: string[];
}

const THEOREM_KEYWORDS = [
  "theorem",
  "theorem-proof",
  "proof",
  "intermediate value theorem",
  "sandwich theorem",
  "squeeze theorem",
  "fundamental theorem",
  "rolle's theorem",
  "mean value theorem",
  "de moivre's theorem",
  "cauchy's theorem",
];

function isTheoremNote(content: string): boolean {
  const lower = content.toLowerCase();
  return THEOREM_KEYWORDS.some(
    (kw) => lower.includes(kw.toLowerCase())
  );
}

function extractSnippets(content: string): string[] {
  const snippets: string[] = [];
  // Match <h4>...</h4> proof blocks and text following them
  const proofBlockRe = /<h4[^>]*>[a-z]\)\s*Proof<\/h4>/gi;
  let m: RegExpExecArray | null;
  while ((m = proofBlockRe.exec(content)) !== null) {
    const after = m[0];
    const end = Math.min(after.length + 300, content.length);
    snippets.push(content.slice(after.length, end).trim().slice(0, 200));
  }
  // Also pull in lines starting with "Proof:" or "**Theorem**"
  const inlineRe = /\*\*Theorem\*\*[^*]+|\*Proof:\*[^*]+/gi;
  while ((m = inlineRe.exec(content)) !== null) {
    snippets.push(m[0].slice(0, 200));
  }
  // Generic fallback: first 200 chars of the content
  if (snippets.length === 0 && content.length > 0) {
    snippets.push(content.slice(0, 200).replace(/<[^>]+>/g, "").trim());
  }
  return snippets;
}

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
 * Load theorem/proof concept files for a single class + subject pair.
 */
async function scanSubject(
  classSlug: string,
  subjectSlug: string,
): Promise<TheoremEntry[]> {
  const baseDir = join(process.cwd(), "content", "ravikishan", classSlug, subjectSlug);
  let entries: TheoremEntry[] = [];

  try {
    const unitDirs = await readdir(baseDir, { withFileTypes: true });
    for (const unitDir of unitDirs) {
      if (!unitDir.isDirectory() || unitDir.name.startsWith(".")) continue;
      if (unitDir.name === "notes" || unitDir.name === "pyqs" || unitDir.name === "sets" || unitDir.name === "examples") continue;

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
          if (!isTheoremNote(raw)) continue;

          const topicSlug = slugifyFileName(file.name);
          const snippets = extractSnippets(raw);
          // Find title: use the JSON title field, or derive from filename
          let topicTitle = "";
          try {
            const parsed = JSON.parse(raw);
            topicTitle = parsed.title ?? file.name;
          } catch { /* fallback to filename */ }
          if (!topicTitle) topicTitle = file.name.replace(/\.json$/, "");

          entries.push({
            classSlug,
            subjectSlug,
            unitId,
            unitTitle,
            topicSlug,
            topicTitle,
            filePath,
            preview: snippets[0]?.slice(0, 180) ?? "",
            hasProof: /<h4[^>]*>[a-z]\)\s*Proof<\/h4>/i.test(raw),
            snippets,
          });
        }
      } catch {
        // No concepts/ dir for this unit
      }
    }
  } catch {
    // Directory doesn't exist or isn't readable — skip
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
 * Build the full theorem index across all class tracks and subjects.
 * Returns entries sorted by class → subject → unit order.
 */
export async function getTheoremIndex(): Promise<TheoremEntry[]> {
  const all: TheoremEntry[] = [];
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

  // Sort: class order, then subject order, then unit order, then topic order
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
 * Filter the full index for a specific class + subject + optional unit.
 */
export function filterTheorems(
  entries: TheoremEntry[],
  options: {
    classSlug: string;
    subjectSlug: string;
    unitId?: string;
  },
): TheoremEntry[] {
  return entries.filter(
    (e) =>
      e.classSlug === options.classSlug &&
      e.subjectSlug === options.subjectSlug &&
      (!options.unitId || e.unitId === options.unitId),
  );
}

/**
 * Group theorem entries by unit for display.
 */
export function groupTheoremsByUnit(
  entries: TheoremEntry[],
): Map<string, TheoremEntry[]> {
  const map = new Map<string, TheoremEntry[]>();
  for (const e of entries) {
    const arr = map.get(e.unitId) ?? [];
    arr.push(e);
    map.set(e.unitId, arr);
  }
  return map;
}
