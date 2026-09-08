/**
 * Derivation Index Utility
 *
 * Scans `content/ravikishan/{classSlug}/{subjectSlug}/` directories for
 * concept JSON files that contain derivation expressions,
 * then returns them grouped by unit and topic.
 *
 * When a subject directory exists on disk but is absent from SYLLABUS,
 * the scanner discovers it directly from the filesystem (unit titles
 * default to the directory name).
 */

import { SYLLABUS, type SyllabusUnit } from "@/lib/syllabus";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const PROJECT_ROOT = resolve(dirname(__filename), "..", "..");

export interface DerivationEntry {
  classSlug: string;
  subjectSlug: string;
  unitId: string;
  unitTitle: string;
  topicSlug: string;
  topicTitle: string;
  filePath: string;
  preview: string;
  hasDerivation: boolean;
  snippets: string[];
}

const DERIVATION_KEYWORDS = [
  "derivation",
  "derive",
  "expression for",
  "show that",
  "obtain an expression",
  "derive an expression",
];

function isDerivationNote(content: string): boolean {
  const lower = content.toLowerCase();
  return DERIVATION_KEYWORDS.some(
    (kw) => lower.includes(kw.toLowerCase()),
  );
}

function extractSnippets(content: string): string[] {
  const snippets: string[] = [];
  // Match <h4>...</h4> derivation blocks
  const derivationBlockRe = /<h4[^>]*>[a-z]\)\s*Derivation<\/h4>/gi;
  let m: RegExpExecArray | null;
  while ((m = derivationBlockRe.exec(content)) !== null) {
    const after = m[0];
    const end = Math.min(after.length + 300, content.length);
    snippets.push(content.slice(after.length, end).trim().slice(0, 200));
  }
  // Generic fallback: first 200 chars of the content
  if (snippets.length === 0 && content.length > 0) {
    snippets.push(content.slice(0, 200).replace(/<[^>]+>/g, "").trim());
  }
  return snippets;
}

const derivationJsonCache = new Map<string, any>();

export async function readDerivationContent(filePath: string): Promise<any> {
  const cached = derivationJsonCache.get(filePath);
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
  derivationJsonCache.set(filePath, parsed);
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

async function scanSubject(
  classSlug: string,
  subjectSlug: string,
): Promise<DerivationEntry[]> {
  const { readdir, readFile } = await import("node:fs/promises");
  const baseDir = join(PROJECT_ROOT, "content", "ravikishan", classSlug, subjectSlug);
  const entries: DerivationEntry[] = [];

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
          if (!isDerivationNote(raw)) continue;

          const topicSlug = slugifyFileName(conceptFile.name);
          const snippets = extractSnippets(raw);
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
            hasDerivation: /<h4[^>]*>[a-z]\)\s*Derivation<\/h4>/i.test(raw),
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

export async function getDerivationIndex(): Promise<DerivationEntry[]> {
  const all: DerivationEntry[] = [];
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

  all.sort((a, b) => {
    const clsA = SYLLABUS.findIndex((c) => c.slug === a.classSlug);
    const clsB = SYLLABUS.findIndex((c) => c.slug === b.classSlug);
    if (clsA !== clsB) return clsA - clsB;
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
