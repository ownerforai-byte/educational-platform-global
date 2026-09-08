/**
 * Theorem & Proof Index Utility
 *
 * Scans `content/ravikishan/{classSlug}/{subjectSlug}/` directories for
 * concept JSON files that contain theorem statements or proofs,
 * then returns them grouped by unit and topic.
 *
 * When a subject directory exists on disk but is absent from SYLLABUS,
 * the scanner discovers it directly from the filesystem (unit titles
 * default to the directory name).
 */

import { SYLLABUS } from "@/lib/syllabus";
import type { ClassSyllabus, SubjectSyllabus, SyllabusUnit } from "@/lib/syllabus";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Resolve the project root from this module's location (frontend/lib/theorems.ts → two levels up).
// This avoids relying on process.cwd(), which differs between build and dev servers.
const __filename = fileURLToPath(import.meta.url);
const PROJECT_ROOT = resolve(dirname(__filename), "..", "..");

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
    (kw) => lower.includes(kw.toLowerCase()),
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

/**
 * Read + parse a theorem JSON file with a statically-scoped path.
 *
 * The path is always inside the top-level content/ folder, so Turbopack does
 * not flag this as whole-project filesystem tracing (unlike a dynamic
 * readFile(join(process.cwd(), entry.filePath)) call inside a page).
 * Results are cached so static generation does not re-read the same file.
 */
const theoremJsonCache = new Map<string, any>();

export async function readTheoremContent(filePath: string): Promise<any> {
  const cached = theoremJsonCache.get(filePath);
  if (cached !== undefined) return cached;

  const { readFile } = await import("node:fs/promises");
  const abs = join(PROJECT_ROOT, filePath);
  let parsed: any = null;
  try {
    const raw = await readFile(abs, "utf-8");
    parsed = JSON.parse(raw);
  } catch {
    // Missing or invalid file - caller falls back to entry metadata
  }
  theoremJsonCache.set(filePath, parsed);
  return parsed;
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
  const { readdir, readFile } = await import("node:fs/promises");
  const baseDir = join(PROJECT_ROOT, "content", "ravikishan", classSlug, subjectSlug);
  const entries: TheoremEntry[] = [];

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
        const conceptFiles = await readdir(conceptsDir, { withFileTypes: true });
        for (const conceptFile of conceptFiles) {
          if (!conceptFile.name.endsWith(".json")) continue;
          const filePath = join("content", "ravikishan", classSlug, subjectSlug, unitId, "concepts", conceptFile.name);
          const raw = await readFile(join(PROJECT_ROOT, filePath), "utf-8");
          if (!isTheoremNote(raw)) continue;

          const topicSlug = slugifyFileName(conceptFile.name);
          const snippets = extractSnippets(raw);
          // Find title: use the JSON title field, or derive from filename
          let topicTitle = "";
          try {
            const parsed = JSON.parse(raw);
            topicTitle = parsed.title ?? conceptFile.name;
          } catch { /* fallback to filename */ }
          if (!topicTitle) topicTitle = conceptFile.name.replace(/\.json$/, "");

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
 * Get all subject slugs present on disk for a given class slug.
 * Returns subjects that are already in SYLLABUS plus any discovered
 * directories that aren't yet registered.
 */
async function getSubjectsForClass(classSlug: string): Promise<string[]> {
  const { readdir } = await import("node:fs/promises");
  const baseDir = join(PROJECT_ROOT, "content", "ravikishan", classSlug);
  try {
    const items = await readdir(baseDir, { withFileTypes: true });
    const syllabusSlugs = new Set(
      SYLLABUS.find((c) => c.slug === classSlug)?.subjects.map((s) => s.slug) ?? [],
    );
    const discovered: string[] = [];
    for (const item of items) {
      if (!item.isDirectory() || item.name.startsWith(".")) continue;
      if (item.name === "notes" || item.name === "pyqs" || item.name === "sets" || item.name === "examples") continue;
      if (!syllabusSlugs.has(item.name)) {
        discovered.push(item.name);
      }
    }
    return discovered;
  } catch {
    return [];
  }
}

/**
 * Build the full theorem index across all class tracks and subjects.
 * Returns entries sorted by class → subject → unit order.
 *
 * Subjects missing from SYLLABUS are discovered directly from the
 * filesystem so theorem content in those subjects is still indexed.
 */
export async function getTheoremIndex(): Promise<TheoremEntry[]> {
  const all: TheoremEntry[] = [];
  const seen = new Set<string>();

  for (const cls of SYLLABUS) {
    // Scan subjects registered in SYLLABUS
    for (const subject of cls.subjects) {
      const entries = await scanSubject(cls.slug, subject.slug);
      for (const e of entries) {
        const key = `${e.classSlug}/${e.subjectSlug}/${e.unitId}/${e.topicSlug}`;
        if (seen.has(key)) continue;
        seen.add(key);
        all.push(e);
      }
    }
    // Also scan any subject directories present on disk but not yet in SYLLABUS
    const extraSubjects = await getSubjectsForClass(cls.slug);
    for (const subjectSlug of extraSubjects) {
      const entries = await scanSubject(cls.slug, subjectSlug);
      for (const e of entries) {
        const key = `${e.classSlug}/${e.subjectSlug}/${e.unitId}/${e.topicSlug}`;
        if (seen.has(key)) continue;
        seen.add(key);
        all.push(e);
      }
    }
  }

  // Sort: class order, then subject order (syllabus first, then discovered), then unit order, then topic order
  all.sort((a, b) => {
    const clsA = SYLLABUS.findIndex((c) => c.slug === a.classSlug);
    const clsB = SYLLABUS.findIndex((c) => c.slug === b.classSlug);
    if (clsA !== clsB) return clsA - clsB;

    // Subject ordering: syllabus subjects first (in their defined order), then discovered subjects alphabetically
    const syllabusOrder = SYLLABUS[clsA]?.subjects.map((s) => s.slug) ?? [];
    const subjAInSyllabus = syllabusOrder.indexOf(a.subjectSlug);
    const subjBInSyllabus = syllabusOrder.indexOf(b.subjectSlug);
    const subjAIsExtra = subjAInSyllabus === -1;
    const subjBIsExtra = subjBInSyllabus === -1;
    if (subjAIsExtra && !subjBIsExtra) return 1;
    if (!subjAIsExtra && subjBIsExtra) return -1;
    if (subjAIsExtra && subjBIsExtra) return a.subjectSlug.localeCompare(b.subjectSlug);
    return subjAInSyllabus - subjBInSyllabus;
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
