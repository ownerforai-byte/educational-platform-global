/**
 * NoteSwift.in — **exercise solution PDFs only** (embedded Google Drive files).
 * Chapter articles are link-out only; Resources streams frame Drive /preview URLs.
 *
 * Regenerate: `node content-tools/streams/scrape-noteswift-catalog.mjs`
 */
import { SYLLABUS } from "@/lib/core/syllabus";
import { frameSrcFor } from "@/lib/pdf-src";
import { isStreamSourceEnabled } from "@/lib/stream-sources";
import generated from "@/lib/streams/noteswift-catalog.generated.json";

const CLASS_11 = "class-11-notes";
const CLASS_12 = "class-12-notes";

const SCIENCE_SUBJECTS = new Set([
  "mathematics",
  "physics",
  "chemistry",
  "biology",
  "english",
  "nepali",
]);

export type NoteswiftCatalogEntry = {
  id: string;
  title: string;
  articleUrl: string;
  classYear: "11" | "12";
  subjectSlug: string;
  unitId: string | null;
  pathTail: string;
  driveIds: string[];
};

export type NoteswiftStreamPdf = {
  id: string;
  title: string;
  src: string;
  articleUrl: string;
  scope: "chapter" | "subject";
};

const HUB_TAILS = new Set(["notes", "all-chapters-notes"]);

/** Path segment → syllabus unitId when titles differ (NoteSwift slugs vs NEB ids). */
const TAIL_ALIASES: Record<string, string> = {
  kinematics: "kinematics",
  "electric-charge": "electric-charges",
  "electric-charges": "electric-charges",
  "dc-circuit": "dc-circuits",
  "dc-circuits": "dc-circuits",
  solid: "solids",
  solids: "solids",
  electrochemistry: "electro-chemistry",
  "the-derivatives": "calculus",
  "limits-and-continuity": "calculus",
  "application-of-derivatives": "calculus",
  antiderivatives: "calculus",
  "measures-of-dispersion": "statistics-and-probability",
  "analytical-geometry": "analytic-geometry",
  "inverse-circular-function-and-trigonometric-equation": "trigonometry",
  "numerical-integration": "computational-methods-or-mechanics",
  "numerical-computation": "computational-methods-or-mechanics",
  statics: "computational-methods-or-mechanics",
  dynamics: "computational-methods-or-mechanics",
  "chapter-3-complex-number": "limits-and-continuity",
  "chapter-13-application-of-derivatives": "differentiation",
  "chapter-15-differential-equations": "differential-equations",
  "chapter-9-product-of-vectors": "vector-algebra",
  "chapter-8-conic-section": "three-dimensional-geometry",
  "chapter-11-probability": "probability",
  "chapter-10-correlation-and-regression": "probability",
  "chapter-4-sequence-and-series": "limits-and-continuity",
  "chapter-1-permutation-and-combination": "probability",
  "chapter-16-system-of-linear-equations": "vector-algebra",
  "chapter-18-static": "computational-methods-or-mechanics",
  "chapter-19-dynamic-newtons-law-of-motion-and-projectile": "computational-methods-or-mechanics",
  alcohols: "alcohols-phenols-ethers",
  phenols: "alcohols-phenols-ethers",
  ethers: "alcohols-phenols-ethers",
  "aldehydes-and-ketones": "aldehydes-ketones-carboxylic-acids",
  "carboxylic-acid-and-its-derivatives": "aldehydes-ketones-carboxylic-acids",
  haloalkanes: "hydrocarbons",
  haloarenes: "hydrocarbons",
  amines: "amines",
  "amino-compounds": "amines",
  "nitro-compounds": "amines",
  biomolecules: "biomolecules",
  "nuclear-chemistry-and-applications-of-radioactivity": "chemistry-of-element",
};

function syllabusUnits(classYear: "11" | "12", subjectSlug: string) {
  const trackSlug = classYear === "11" ? CLASS_11 : CLASS_12;
  const track = SYLLABUS.find((t) => t.slug === trackSlug);
  return track?.subjects.find((s) => s.slug === subjectSlug)?.units ?? [];
}

function normalizeTail(pathTail: string): string {
  return decodeURIComponent(pathTail)
    .toLowerCase()
    .replace(/^chapter-\d+-/, "")
    .replace(/-/g, " ")
    .trim();
}

function unitMatchScore(
  pathTail: string,
  unit: { id: string; title: string; topics?: string[] },
): number {
  const alias = TAIL_ALIASES[pathTail.toLowerCase()];
  if (alias === unit.id) return 1;

  const tail = normalizeTail(pathTail);
  const idPhrase = unit.id.replace(/-/g, " ");
  if (tail === idPhrase || tail.includes(idPhrase) || tail.includes(unit.id)) {
    return 0.95;
  }

  const idParts = unit.id.split("-").filter((p) => p.length > 2);
  const partHits = idParts.filter(
    (p) => tail.includes(p) || tail.includes(p.replace(/s$/, "")),
  ).length;
  const partScore = idParts.length ? partHits / idParts.length : 0;

  const titleWords = unit.title
    .toLowerCase()
    .split(/[\s,&/]+/)
    .filter((w) => w.length > 3);
  const titleHits = titleWords.filter((w) => tail.includes(w)).length;
  const titleScore = titleWords.length ? titleHits / titleWords.length : 0;

  let topicScore = 0;
  for (const topic of unit.topics ?? []) {
    const words = topic
      .toLowerCase()
      .split(/[\s,;:()]+/)
      .filter((w) => w.length > 5);
    const hits = words.filter((w) => tail.includes(w)).length;
    if (hits > 0) topicScore = Math.max(topicScore, hits / Math.min(words.length, 4));
  }

  return Math.max(partScore * 0.92, titleScore * 0.75, topicScore * 0.65);
}

/** NoteSwift pages whose only value is a streamed solution PDF — not theory hubs. */
export function isNoteswiftSolutionPdfEntry(entry: NoteswiftCatalogEntry): boolean {
  if (!SCIENCE_SUBJECTS.has(entry.subjectSlug)) return false;
  if (entry.driveIds.length === 0) return false;
  const tail = entry.pathTail.toLowerCase();
  if (HUB_TAILS.has(tail) || tail.endsWith("-notes") || tail.includes("all-chapter")) {
    return false;
  }
  if (tail === "notes") return false;
  return true;
}

export function resolveNoteswiftUnitId(entry: NoteswiftCatalogEntry): string | null {
  if (entry.unitId) return entry.unitId;
  if (!isNoteswiftSolutionPdfEntry(entry)) return null;

  const alias = TAIL_ALIASES[entry.pathTail.toLowerCase()];
  if (alias) return alias;

  const units = syllabusUnits(entry.classYear, entry.subjectSlug);
  let best: { id: string; score: number } | null = null;
  for (const unit of units) {
    const score = unitMatchScore(entry.pathTail, unit);
    if (score >= 0.42 && (!best || score > best.score)) {
      best = { id: unit.id, score };
    }
  }
  return best?.id ?? null;
}

function enrichEntry(raw: NoteswiftCatalogEntry): NoteswiftCatalogEntry {
  const unitId = resolveNoteswiftUnitId(raw);
  return unitId ? { ...raw, unitId } : raw;
}

export const NOTESWIFT_SOLUTION_ENTRIES: NoteswiftCatalogEntry[] = (
  generated as { entries: NoteswiftCatalogEntry[] }
).entries.filter(isNoteswiftSolutionPdfEntry).map(enrichEntry);

/** @deprecated Use getChapterNoteswiftStreamPdfs — bundles grouped articles. */
export type NoteswiftChapterBundle = NoteswiftStreamPdf & {
  drivePreviews: never;
  articleUrl: string;
};

/**
 * Every NoteSwift solution PDF for this syllabus unit — one stream block per Drive
 * file. No cap: all classified PDFs for the chapter are streamed.
 */
export function getChapterNoteswiftStreamPdfs(
  classSlug: string,
  subjectSlug: string,
  unitId: string,
): NoteswiftStreamPdf[] {
  if (!isStreamSourceEnabled("noteswift")) return [];

  const classYear = classSlug === CLASS_11 ? "11" : classSlug === CLASS_12 ? "12" : null;
  if (!classYear) return [];

  const pool = NOTESWIFT_SOLUTION_ENTRIES.filter(
    (e) => e.classYear === classYear && e.subjectSlug === subjectSlug,
  );

  const chapterEntries = pool.filter((e) => e.unitId === unitId);
  const flat: NoteswiftStreamPdf[] = [];
  const seenSrc = new Set<string>();

  const pushEntry = (entry: NoteswiftCatalogEntry, scope: "chapter" | "subject") => {
    entry.driveIds.forEach((driveId, index) => {
      const src = frameSrcFor(`https://drive.google.com/file/d/${driveId}/preview`);
      if (seenSrc.has(src)) return;
      seenSrc.add(src);
      flat.push({
        id: `${entry.id}:pdf:${driveId}`,
        title:
          entry.driveIds.length > 1
            ? `${entry.title} · solution PDF ${index + 1}`
            : `${entry.title} · solution PDF`,
        src,
        articleUrl: entry.articleUrl,
        scope,
      });
    });
  };

  for (const entry of chapterEntries) pushEntry(entry, "chapter");

  return flat;
}

/** Back-compat wrapper for existing component imports. */
export function getChapterNoteswiftBundles(
  classSlug: string,
  subjectSlug: string,
  unitId: string,
): NoteswiftStreamPdf[] {
  return getChapterNoteswiftStreamPdfs(classSlug, subjectSlug, unitId);
}

export function noteswiftClassifiedUnitIds(): string[] {
  return NOTESWIFT_SOLUTION_ENTRIES.map((e) => e.unitId).filter((id): id is string => !!id);
}