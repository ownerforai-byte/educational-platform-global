import { readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { getSubjectSyllabus, type SubjectSyllabus } from "./syllabus";
import { resolveUnitSlug } from "./syllabus-notes-manifest";
import { isGeneratorJunkLine } from "./content/generator-junk";

/**
 * formula-sheet — the Class 11 formula sheets for Physics, Mathematics and
 * Chemistry.
 *
 * The page is built in two halves, both from existing single sources of truth:
 *   1. the *structure* comes from `lib/syllabus.ts` (official NEB unit order),
 *   2. the *formulas* come from the shipped authored notes
 *      (`public/data/syllabus-notes/{subject}/_manifest.json` + note JSONs),
 *      whose `formulas` field every concept note already carries.
 *
 * Legacy unit folders (chemistry short names, `work-energy-power`, pooled
 * `mechanics` / `optics` buckets) are folded into their canonical syllabus unit
 * through `lib/syllabus-notes-manifest.ts`'s `resolveUnitSlug`; buckets that
 * still have no syllabus home are kept as labelled *legacy banks* instead of
 * being silently dropped or filed under the wrong unit.
 *
 * Server-only: reads the shipped JSON tree with the same candidate-path
 * resolution as `lib/topic-content-index.ts` (Next may run from the repo root
 * or from `frontend/`).
 */

const __filename = fileURLToPath(import.meta.url);

/** Candidate `public/data` roots, module-relative first (see topic-content-index). */
const DATA_ROOTS: string[] = [
  resolve(dirname(__filename), "..", "public", "data"),
  join(process.cwd(), "public", "data"),
  join(process.cwd(), "frontend", "public", "data"),
  resolve(process.cwd(), "..", "public", "data"),
];

export type FormulaSubjectSlug = "physics" | "mathematics" | "chemistry";

export interface FormulaSheetMeta {
  slug: FormulaSubjectSlug;
  name: string;
  emoji: string;
}

/** The three subjects that have a formula sheet. Class 11 is the shipped corpus. */
export const FORMULA_SUBJECTS: FormulaSheetMeta[] = [
  { slug: "physics", name: "Physics", emoji: "⚡" },
  { slug: "mathematics", name: "Mathematics", emoji: "🔢" },
  { slug: "chemistry", name: "Chemistry", emoji: "🧪" },
];

/** One source note and the formulas it contributes to its unit. */
export type FormulaAnnotationKind = "condition" | "solved-pyq" | "hint" | "exam-trick" | "shortcut";

export interface FormulaAnnotation {
  /** Classified study note kind. */
  kind: FormulaAnnotationKind;
  /** Short free-form note; may include `$…$` inline LaTeX. */
  text: string;
  /** Optional label shown before the text (e.g. exam year, trick name). */
  label?: string;
}

const VALID_ANNOTATION_KINDS = new Set<FormulaAnnotationKind>([
  "condition",
  "solved-pyq",
  "hint",
  "exam-trick",
  "shortcut",
]);

function normalizeAnnotation(raw: unknown, formulaText: string): FormulaAnnotation | null {
  if (!raw || typeof raw !== "object") return null;
  const obj = raw as Record<string, unknown>;
  const kind = obj.kind;
  if (typeof kind !== "string" || !VALID_ANNOTATION_KINDS.has(kind as FormulaAnnotationKind)) return null;
  const text = obj.text;
  if (typeof text !== "string" || text.trim().length === 0) return null;
  return {
    kind: kind as FormulaAnnotationKind,
    text: text.trim(),
    label: typeof obj.label === "string" ? obj.label.trim() : undefined,
  };
}

export interface FormulaSheetTopic {
  /** Manifest topic slug (kept for debugging / future deep-links). */
  slug: string;
  /** Note title, e.g. "Instantaneous Velocity and Acceleration". */
  title: string;
  /** Note filename inside the unit folder. */
  filename: string;
  /** Deduplicated formula lines (markdown with `$…$` LaTeX). */
  formulas: string[];
  /** Per-formula shortcuts aligned by index to `formulas` (from the note's
   *  `keyPoints` field). Shorter than `formulas`; missing slots are undefined. */
  shortcuts: readonly (string | undefined)[];
  /** Classified study notes attached to specific formulas in this topic.
   *  Keyed by exact formula text (deduplicated line); values merge across all
   *  notes in the topic that contribute the same formula. Absent keys are
   *  treated as "no annotations for that formula". */
  annotationsByFormula: ReadonlyMap<string, readonly FormulaAnnotation[]>;
  /** Topic-level classified notes auto-mapped from the note's existing fields
   *  (`specialNotes`, `examShortTricks`, `practice`, `mcs`, `confusion`,
   *  `importantNotes`, `importantStatements`). Gives immediate classified
   *  coverage across all subjects from the existing authored data. */
  classifiedNotes: ClassifiedNoteGroup | null;
}

/** Topic-level classified notes, auto-mapped from existing note fields. Each
 *  array is a curated (capped) subset so the sheet stays readable. */
export interface ClassifiedNoteGroup {
  /** Special conditions that bound the topic's formulas (from `specialNotes`). */
  conditions: readonly string[];
  /** Solved past-year / practice problems in short (from `practice`). */
  solvedPyqs: readonly string[];
  /** Exam tricks and MCQ memory aids (from `examShortTricks` + converted `mcs`). */
  examTricks: readonly string[];
  /** Hints: common pitfalls, must-remember notes, key statements (from
   *  `confusion` + `importantNotes` + `importantStatements`). */
  hints: readonly string[];
}

export interface FormulaSheetUnit {
  /** Canonical syllabus unit id (or the legacy folder slug for extras). */
  id: string;
  title: string;
  /** 1-based position in the official syllabus; null for legacy banks. */
  unitNo: number | null;
  /** True for folders that no longer map to a syllabus unit. */
  isExtra: boolean;
  /** Source notes with at least one formula, in manifest order. */
  topics: FormulaSheetTopic[];
  /** Deduplicated formulas across the whole unit. */
  formulaCount: number;
  /** Number of source notes that contributed formulas. */
  noteCount: number;
  /** Official syllabus topic count (0 for legacy banks). */
  syllabusTopicCount: number;
}

export interface FormulaSheetSubject {
  slug: FormulaSubjectSlug;
  name: string;
  emoji: string;
  /** Official syllabus units, in curriculum order (may carry 0 formulas). */
  units: FormulaSheetUnit[];
  /** Folders with formulas but no syllabus home, richest first. */
  extras: FormulaSheetUnit[];
  /** Formulas across units + extras. */
  formulaCount: number;
  /** Notes read for this subject. */
  noteCount: number;
}

export interface FormulaSheetSummary {
  slug: FormulaSubjectSlug;
  name: string;
  emoji: string;
  /** Units that actually have formulas. */
  unitCount: number;
  formulaCount: number;
  noteCount: number;
}

interface ManifestEntry {
  unitSlug?: string;
  topicSlug?: string;
  title?: string;
  filename?: string;
}

interface NoteFile {
  title?: string;
  topicSlug?: string;
  formulas?: unknown;
  notes?: unknown;
  annotations?: unknown;
  keyPoints?: unknown;
  specialNotes?: unknown;
  examShortTricks?: unknown;
  examNotes?: unknown;
  importantNotes?: unknown;
  importantStatements?: unknown;
  universalFacts?: unknown;
  confusion?: unknown;
  practice?: unknown;
  mcs?: unknown;
}

/**
 * Build a topic-level `ClassifiedNoteGroup` from a note's existing fields.
 *
 * Mapping (all note-level, so the same group is shown once per topic):
 *  - `specialNotes`        → conditions
 *  - `practice`            → solved-pyqs  (solved problems with full solutions)
 *  - `examShortTricks`     → exam-tricks
 *  - `mcs`                 → exam-tricks  (MCQ question + answer + explanation,
 *                                          converted to a short text line)
 *  - `confusion`           → hints        (common pitfalls / what NOT to do)
 *  - `importantNotes`      → hints
 *  - `importantStatements` → hints
 *
 * Each category is capped so the sheet stays scannable; the full content
 * remains in the note itself.
 */
function buildClassifiedNotes(note: NoteFile): ClassifiedNoteGroup | null {
  const conditions: string[] = Array.isArray(note.specialNotes)
    ? note.specialNotes.filter((x): x is string => typeof x === "string" && Boolean(x.trim()))
        .map((x) => x.trim())
    : [];
  const solvedPyqs: string[] = Array.isArray(note.practice)
    ? note.practice.filter((x): x is string => typeof x === "string" && Boolean(x.trim()))
        .map((x) => x.trim())
    : [];
  const examShortTricks: string[] = Array.isArray(note.examShortTricks)
    ? note.examShortTricks.filter((x): x is string => typeof x === "string" && Boolean(x.trim()))
        .map((x) => x.trim())
    : [];
  const mcs: Array<{ question: string; options: string[]; answer: string; explanation: string }> =
    Array.isArray(note.mcs)
      ? note.mcs.filter(
          (x): x is { question: string; options: string[]; answer: string; explanation: string } =>
            x &&
            typeof x === "object" &&
            Array.isArray(x.options) &&
            typeof (x as Record<string, unknown>).question === "string" &&
            typeof (x as Record<string, unknown>).answer === "string" &&
            typeof (x as Record<string, unknown>).explanation === "string",
        )
      : [];
  const confusion: string[] = Array.isArray(note.confusion)
    ? note.confusion.filter((x): x is string => typeof x === "string" && Boolean(x.trim()))
        .map((x) => x.trim())
    : [];
  const importantNotes: string[] = Array.isArray(note.importantNotes)
    ? note.importantNotes.filter((x): x is string => typeof x === "string" && Boolean(x.trim()))
        .map((x) => x.trim())
    : [];
  const importantStatements: string[] = Array.isArray(note.importantStatements)
    ? note.importantStatements.filter((x): x is string => typeof x === "string" && Boolean(x.trim()))
        .map((x) => x.trim())
    : [];

  const hasAny =
    conditions.length +
    solvedPyqs.length +
    examShortTricks.length +
    mcs.length +
    confusion.length +
    importantNotes.length +
    importantStatements.length >
    0;
  if (!hasAny) return null;

  // Convert MCQs to short text lines: "Q: … · Ans: <option text> — <explanation>"
  const mcsLines: string[] = mcs.map((mc) => {
    const ansOption = mc.options.find(
      (o, i) => String.fromCharCode(65 + i) === mc.answer,
    );
    const ansText = ansOption ?? mc.answer;
    // Keep it short: strip leading bold markers and truncate explanation
    const q = mc.question.replace(/^\*\*|\*\*$|,$/g, "").trim();
    const expl = mc.explanation.replace(/^\*\*|\*\*$/g, "").trim();
    return `**Q:** ${q} · **Ans:** ${ansText} — ${expl}`;
  });

  const CAP = 3;
  return {
    conditions: conditions.slice(0, CAP),
    solvedPyqs: solvedPyqs.slice(0, CAP),
    examTricks: [...examShortTricks, ...mcsLines].slice(0, CAP),
    hints: [...confusion, ...importantNotes, ...importantStatements]
      .slice(0, CAP),
  };
}

/**
 * Per-formula shortcuts aligned by index to `formulas` (from the note's
 * `keyPoints` field). Missing slots are undefined.
 */
function buildShortcuts(note: NoteFile, formulaCount: number): readonly (string | undefined)[] {
  if (!Array.isArray(note.keyPoints)) return new Array(formulaCount).fill(undefined) as readonly (string | undefined)[];
  const out: (string | undefined)[] = [];
  for (let i = 0; i < formulaCount; i++) {
    const kp = note.keyPoints[i];
    out.push(typeof kp === "string" && kp.trim() ? kp.trim() : undefined);
  }
  return out as readonly (string | undefined)[];
}

function emptyUnit(id: string, title: string, unitNo: number | null, isExtra: boolean, syllabusTopicCount: number): FormulaSheetUnit {
  return { id, title, unitNo, isExtra, topics: [], formulaCount: 0, noteCount: 0, syllabusTopicCount };
}

/** Trim, drop blank/generator-junk lines, keep author order. */
function normalizeFormulas(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  const out: string[] = [];
  for (const raw of value) {
    if (typeof raw !== "string") continue;
    const line = raw.trim();
    if (!line || isGeneratorJunkLine(line)) continue;
    out.push(line);
  }
  return out;
}

/** "work-energy-power" → "Work Energy Power" (legacy bank titles). */
function humanizeSlug(slug: string): string {
  return slug
    .split(/[-_]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

async function readJson<T>(relPath: string): Promise<T | null> {
  for (const root of DATA_ROOTS) {
    try {
      const parsed: unknown = JSON.parse(await readFile(join(root, relPath), "utf8"));
      return parsed as T;
    } catch {
      // try next candidate root
    }
  }
  return null;
}

async function readManifest(subjectSlug: string): Promise<ManifestEntry[]> {
  const parsed = await readJson<unknown>(join("syllabus-notes", subjectSlug, "_manifest.json"));
  return Array.isArray(parsed) ? (parsed as ManifestEntry[]) : [];
}

async function readNote(subjectSlug: string, folder: string, filename: string): Promise<NoteFile | null> {
  return readJson<NoteFile>(join("syllabus-notes", subjectSlug, folder, filename));
}

const sheetCache = new Map<string, Promise<FormulaSheetSubject | null>>();

/**
 * The full formula sheet for one subject: syllabus units in official order,
 * each carrying every formula its notes contain (deduplicated), plus any
 * legacy banks that still hold formulas.
 */
export function getSubjectFormulaSheet(subjectSlug: string): Promise<FormulaSheetSubject | null> {
  const cached = sheetCache.get(subjectSlug);
  if (cached) return cached;
  const promise = loadSubjectFormulaSheet(subjectSlug);
  sheetCache.set(subjectSlug, promise);
  return promise;
}

async function loadSubjectFormulaSheet(subjectSlug: string): Promise<FormulaSheetSubject | null> {
  const meta = FORMULA_SUBJECTS.find((s) => s.slug === subjectSlug);
  const subject: SubjectSyllabus | undefined = getSubjectSyllabus("class-11-notes", subjectSlug);
  if (!meta || !subject) return null;

  const manifest = await readManifest(subjectSlug);

  // canonical unit id → { notes in manifest order, dedupe set, note count }
  const buckets = new Map<
    string,
    { topics: FormulaSheetTopic[]; seen: Set<string>; noteCount: number }
  >();

  for (const entry of manifest) {
    const folder = entry.unitSlug;
    const filename = entry.filename;
    if (!folder || !filename) continue;

    const note = await readNote(subjectSlug, folder, filename);
    if (!note) continue;

    const canonical = resolveUnitSlug(folder) || folder;
    let bucket = buckets.get(canonical);
    if (!bucket) {
      bucket = { topics: [], seen: new Set(), noteCount: 0 };
      buckets.set(canonical, bucket);
    }
    bucket.noteCount += 1;

    const fresh: string[] = [];
    for (const formula of normalizeFormulas(note.formulas)) {
      if (bucket.seen.has(formula)) continue;
      bucket.seen.add(formula);
      fresh.push(formula);
    }

    // Annotations from this note that link (by explicit `formula` field or
    // positionally) to a formula carried by a note already in the bucket must
    // be merged into that existing topic, otherwise they would be lost when a
    // later note restates a formula that the first note already introduced.
    const noteAnnotations = Array.isArray(note.annotations) ? note.annotations : [];
    // Positional fallback: when an annotation omits the explicit `formula` field,
    // attach it to the i-th formula line of the same note (before junk
    // filtration, so the author can still target a formula that may later be
    // merged into an earlier topic).
    const positional = Array.isArray(note.formulas)
      ? note.formulas.filter((n): n is string => typeof n === "string")
      : [];
    const linked: Array<{ ann: FormulaAnnotation; formula: string }> = [];
    for (let i = 0; i < noteAnnotations.length; i++) {
      const ann = normalizeAnnotation(noteAnnotations[i], "");
      if (!ann) continue;
      let formula: string | undefined;
    const rawFormula = (noteAnnotations[i] as Record<string, unknown>).formula;
    if (typeof rawFormula === "string") formula = rawFormula;
      if (typeof formula !== "string" || !formula.trim()) {
        formula = positional[i];
      }
      const key = formula?.trim();
      if (!key) continue;
      linked.push({ ann, formula: key });
    }

    if (fresh.length === 0 && linked.length === 0) continue;

    if (fresh.length > 0) {
      // Annotations that attach to the newly-introduced formulas live on this
      // topic; the rest (attaching to already-seen formulas) are merged below.
      const localMap = new Map<string, FormulaAnnotation[]>();
      for (const f of fresh) localMap.set(f, []);
      const leftover: Array<{ ann: FormulaAnnotation; formula: string }> = [];
      for (const { ann, formula } of linked) {
        if (localMap.has(formula)) localMap.get(formula)!.push(ann);
        else leftover.push({ ann, formula });
      }
      bucket.topics.push({
        slug: note.topicSlug ?? entry.topicSlug ?? "",
        title:
          note.title ?? entry.title ?? humanizeSlug(entry.topicSlug ?? filename),
        filename,
        formulas: fresh,
        shortcuts: buildShortcuts(note, fresh.length),
        annotationsByFormula: new Map(localMap),
        classifiedNotes: buildClassifiedNotes(note),
      });
      // Merge annotations for already-seen formulas into the existing topics.
      for (const { ann, formula } of leftover) {
        for (const topic of bucket.topics) {
          if (topic.formulas.includes(formula)) {
            const list = topic.annotationsByFormula.get(formula);
            if (list) (list as FormulaAnnotation[]).push(ann);
          }
        }
      }
    } else {
      // fresh is empty: every formula this note carries is already in the
      // bucket. Merge its annotations into whichever existing topics carry
      // those formulas.
      for (const { ann, formula } of linked) {
        for (const topic of bucket.topics) {
          if (topic.formulas.includes(formula)) {
            const list = topic.annotationsByFormula.get(formula);
            if (list) (list as FormulaAnnotation[]).push(ann);
          }
        }
      }
    }
  }

  const syllabusIds = new Set(subject.units.map((u) => u.id));
  const units: FormulaSheetUnit[] = subject.units.map((unit, index) => {
    const bucket = buckets.get(unit.id);
    const built = emptyUnit(unit.id, unit.title, index + 1, false, unit.topics.length);
    if (!bucket) return built;
    built.topics = bucket.topics;
    built.noteCount = bucket.noteCount;
    built.formulaCount = bucket.topics.reduce((n, t) => n + t.formulas.length, 0);
    return built;
  });

  const extras: FormulaSheetUnit[] = [];
  for (const [id, bucket] of buckets) {
    if (syllabusIds.has(id)) continue;
    const formulaCount = bucket.topics.reduce((n, t) => n + t.formulas.length, 0);
    if (formulaCount === 0) continue;
    const built = emptyUnit(id, humanizeSlug(id), null, true, 0);
    built.topics = bucket.topics;
    built.noteCount = bucket.noteCount;
    built.formulaCount = formulaCount;
    extras.push(built);
  }
  extras.sort((a, b) => b.formulaCount - a.formulaCount || a.id.localeCompare(b.id));

  const formulaCount =
    units.reduce((n, u) => n + u.formulaCount, 0) +
    extras.reduce((n, u) => n + u.formulaCount, 0);

  return {
    slug: meta.slug,
    name: meta.name,
    emoji: meta.emoji,
    units,
    extras,
    formulaCount,
    noteCount: manifest.length,
  };
}

/** Compact per-subject counts for the home cards and the /formulas hub. */
export async function getFormulaSheetSummaries(): Promise<FormulaSheetSummary[]> {
  const sheets = await Promise.all(FORMULA_SUBJECTS.map((s) => getSubjectFormulaSheet(s.slug)));
  return sheets
    .filter((sheet): sheet is FormulaSheetSubject => sheet !== null)
    .map((sheet) => ({
      slug: sheet.slug,
      name: sheet.name,
      emoji: sheet.emoji,
      unitCount:
        sheet.units.filter((u) => u.formulaCount > 0).length +
        (sheet.extras.length > 0 ? 1 : 0),
      formulaCount: sheet.formulaCount,
      noteCount: sheet.noteCount,
    }));
}

export function isFormulaSubjectSlug(value: string): value is FormulaSubjectSlug {
  return FORMULA_SUBJECTS.some((s) => s.slug === value);
}

/** One unit (syllabus or legacy bank) from a subject sheet. */
export async function getUnitFormulaSheet(
  subjectSlug: string,
  unitId: string,
): Promise<{ sheet: FormulaSheetSubject; unit: FormulaSheetUnit } | null> {
  const sheet = await getSubjectFormulaSheet(subjectSlug);
  if (!sheet) return null;
  const unit = sheet.units.find((u) => u.id === unitId) ?? sheet.extras.find((u) => u.id === unitId);
  return unit ? { sheet, unit } : null;
}
