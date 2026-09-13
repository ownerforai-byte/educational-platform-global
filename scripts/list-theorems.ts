import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { readdir, readFile } from "node:fs/promises";
import { writeFileSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const PROJECT_ROOT = resolve(dirname(__filename), "..");

const THEOREM_KEYWORDS = [
  "theorem", "proof", "intermediate value theorem", "sandwich theorem",
  "squeeze theorem", "fundamental theorem", "rolle's theorem",
  "mean value theorem", "de moivre's theorem", "cauchy's theorem",
  "work-energy theorem", "conservation", "ohm's law", "hooke's law",
  "newton's law", "faraday's law", "lenz's law", "maxwell's equations",
  "kirchhoff's law", "bernoulli's theorem", "stokes' theorem",
  "divergence theorem", "green's theorem", "bayes' theorem",
  "binomial theorem", "mathematical induction", "pigeonhole principle",
  "euclidean algorithm", "fundamental theorem of arithmetic",
];

interface TheoremInfo {
  classSlug: string;
  subjectSlug: string;
  unitId: string;
  topicSlug: string;
  topicTitle: string;
  filePath: string;
}

function slugify(name: string) {
  return name.replace(/\.json$/, "").toLowerCase().normalize("NFKD")
    .replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

async function scanSubject(classSlug: string, subjectSlug: string): Promise<TheoremInfo[]> {
  const baseDir = join(PROJECT_ROOT, "content", "ravikishan", classSlug, subjectSlug);
  const results: TheoremInfo[] = [];
  try {
    const units = await readdir(baseDir, { withFileTypes: true });
    for (const unit of units) {
      if (!unit.isDirectory() || unit.name.startsWith(".")) continue;
      const unitId = unit.name;
      const conceptsDir = join(baseDir, unitId, "concepts");
      try {
        const files = await readdir(conceptsDir, { withFileTypes: true });
        for (const file of files) {
          if (!file.name.endsWith(".json")) continue;
          const filePath = join("content", "ravikishan", classSlug, subjectSlug, unitId, "concepts", file.name);
          const raw = await readFile(join(PROJECT_ROOT, filePath), "utf-8");
          const lower = raw.toLowerCase();
          if (!THEOREM_KEYWORDS.some(k => lower.includes(k.toLowerCase()))) continue;
          const topicSlug = slugify(file.name);
          let topicTitle = "";
          try {
            const parsed = JSON.parse(raw);
            topicTitle = parsed.title ?? file.name;
          } catch { /* fallback */ }
          results.push({ classSlug, subjectSlug, unitId, topicSlug, topicTitle, filePath });
        }
      } catch { /* no concepts dir */ }
    }
  } catch { /* no subject dir */ }
  return results;
}

async function getSubjectsForClass(classSlug: string): Promise<string[]> {
  const baseDir = join(PROJECT_ROOT, "content", "ravikishan", classSlug);
  try {
    const items = await readdir(baseDir, { withFileTypes: true });
    return items
      .filter(i => i.isDirectory() && !i.name.startsWith(".") && i.name !== "notes" && i.name !== "pyqs" && i.name !== "sets" && i.name !== "examples")
      .map(i => i.name);
  } catch { return []; }
}

async function main() {
  const all: TheoremInfo[] = [];
  const seen = new Set<string>();
  // class-11-notes and class-12-notes are the two class slugs in SYLLABUS
  const classSlugs = ["class-11-notes", "class-12-notes"];
  for (const clsSlug of classSlugs) {
    const subjects = await getSubjectsForClass(clsSlug);
    for (const subj of subjects) {
      const entries = await scanSubject(clsSlug, subj);
      for (const e of entries) {
        const key = `${e.classSlug}/${e.subjectSlug}/${e.unitId}/${e.topicSlug}`;
        if (seen.has(key)) continue;
        seen.add(key);
        all.push(e);
      }
    }
  }
  // Sort by class -> subject -> unit -> topic
  all.sort((a, b) => {
    if (a.classSlug !== b.classSlug) return a.classSlug.localeCompare(b.classSlug);
    if (a.subjectSlug !== b.subjectSlug) return a.subjectSlug.localeCompare(b.subjectSlug);
    if (a.unitId !== b.unitId) return a.unitId.localeCompare(b.unitId);
    return a.topicSlug.localeCompare(b.topicSlug);
  });
  writeFileSync("scripts/theorem-index.json", JSON.stringify(all, null, 2), "utf-8");
  console.log(`Wrote ${all.length} theorem entries to scripts/theorem-index.json`);
  // Print summary by subject
  const bySubject = new Map<string, number>();
  for (const t of all) { bySubject.set(t.subjectSlug, (bySubject.get(t.subjectSlug) ?? 0) + 1); }
  for (const [subj, count] of bySubject) {
    console.log(`  ${subj}: ${count}`);
  }
}

main().catch(console.error);