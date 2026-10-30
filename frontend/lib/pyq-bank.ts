import { classDirOfTrack, contentCoords, normalizeClassDir } from "@/lib/content/paths";
import { loadData } from "@/lib/data-loader";

/** One PYQ card = one exam year for one subject (aggregated across units). */
export type PyqYear = {
  year: number;
  title: string;
  examSource?: string;
  /** Unit slugs whose questions appear in this year, in stable order. */
  units: string[];
  questions: Array<{
    question: string;
    marks?: string | number;
    solution?: string;
  }>;
};

/** A theory block rendered as a card (definition / concept / derivation). */
export type TheoryBlock = {
  title: string;
  notes: string[];
  detail?: string;
};

export type SubjectPyqBank = {
  theory: TheoryBlock[];
  /** Sorted newest first. */
  pyqs: PyqYear[];
  /**
   * Authored concept-clearing drills (`content/drills/<class>/<subject>/…`).
   * Unlike PYQs these are not year-bound — each one targets a classic
   * misconception and resolves it — so they ride outside the year buckets.
   */
  drills: ConceptDrill[];
};

/** One concept drill: a misconception-busting Q&A that clears the concept. */
export type ConceptDrill = {
  id: string;
  question: string;
  solution?: string;
  /** The concept this drill clears, e.g. "Field inside a conductor". */
  concept?: string;
  unit: string;
  marks?: string | number;
  /** "concept" (misconception-buster) or "practical" (mind-opening application). */
  kind: "concept" | "practical";
};

type ManifestItem = {
  path: string;
  data: {
    title?: string;
    year?: number;
    examSource?: string;
    unitSlug?: string;
    notes?: string[] | string;
    questions?: PyqYear["questions"];
    type?: string;
    detail?: string;
  };
};

/**
 * `content/_index.json` — path → FULL file content.
 *
 * This is the only PYQ data source that actually carries `questions`.
 * `content/manifest.json` is an index of titles/notes (measured: 0 of its
 * 2467 entries have a `questions` array), so reading PYQs from it silently
 * yields nothing — which is why the bank rendered empty for every subject.
 */
type ContentIndex = Record<
  string,
  {
    title?: string;
    year?: number;
    examSource?: string;
    subject?: string;
    unitSlug?: string;
    questions?: PyqYear["questions"];
  }
>;

/** r-export manifest item — chapter-level theory notes (used as fallback). */
type RExportItem = {
  subject: string;
  chapter: string;
  id: string;
  title: string;
  notes: string[];
};

function normPath(p: string) {
  return p.replace(/\\/g, "/");
}

/**
 * Longest shared leading substring of several titles, trimmed of the trailing
 * separator so it can be re-joined with a year.
 *
 * ["NEB Class 11 Physics — Dynamics — 2024", "NEB Class 11 Physics — Electrostatics — 2024"]
 *   -> "NEB Class 11 Physics"
 *
 * Returns "" when the titles share nothing meaningful — a one-letter prefix
 * ("Physics" / "Polarity" -> "P") is noise, and a stub title is worse than no
 * title, so the caller falls back to the year alone.
 */
function commonPrefix(titles: string[]): string {
  const MIN_MEANINGFUL = 4;
  if (titles.length === 0) return "";
  let prefix = titles[0];
  for (const t of titles.slice(1)) {
    let i = 0;
    while (i < prefix.length && i < t.length && prefix[i] === t[i]) i++;
    prefix = prefix.slice(0, i);
    if (!prefix) break;
  }
  const trimmed = prefix.replace(/[\s—–\-:|/]+$/, "");
  return trimmed.length >= MIN_MEANINGFUL ? trimmed : "";
}

/**
 * Loads the theory + PYQ bank for a Class 11 subject.
 *
 * Content lives under (classified tree, see lib/content/paths.ts):
 *   content/notes/theory/{class}/{subject}/*.json
 *   content/practice/questions/{class}/{subject}/{unit}/NN-neb-YYYY.json
 *
 * Two sources, because neither one covers everything:
 *   - `manifest.json` carries `notes` (theory blocks) but no `questions`.
 *   - `_index.json`  carries `questions` (the exam banks) — read via the path
 *     key, with the manifest as a fallback for files the index has not caught up on.
 *
 * Entries are AGGREGATED BY YEAR across units: one NEB paper draws questions
 * from several units, and the bank is consumed per subject. Grouping keeps a
 * year as a single card, so every unit stays reachable instead of being cut off
 * by the `maxYears` slice.
 */
export async function getSubjectPyqBank(
  classSlug: string,
  subjectSlug: string,
  maxYears = 10,
): Promise<SubjectPyqBank> {
  const [manifest, index, rexpManifest] = await Promise.all([
    loadData<ManifestItem[]>("content/manifest.json"),
    loadData<ContentIndex>("content/_index.json").catch(
      () => ({}) as ContentIndex,
    ),
    loadData<RExportItem[]>("r-export/manifest.json").catch(() => [] as RExportItem[]),
  ]);
  const theory: TheoryBlock[] = [];
  const seenTheory = new Set<string>();

  // Classified keys carry the normalized class dir ("class-11/…") while routes
  // use the track slug ("class-11-notes"). Normalize so theory/PYQ tabs are
  // never empty due to a class-name mismatch.
  const classDir = normalizeClassDir(classDirOfTrack(classSlug));

  const belongs = (path: string) => {
    const coords = contentCoords(path);
    return coords.subjectSlug === subjectSlug && coords.classDir === classDir;
  };

  // ── theory blocks (manifest carries `notes`) ──
  for (const item of manifest) {
    const path = normPath(item.path);
    if (!belongs(path) || !path.includes("/theory/")) continue;
    if (seenTheory.has(path)) continue;
    const notes = Array.isArray(item.data.notes)
      ? item.data.notes
      : typeof item.data.notes === "string"
        ? [item.data.notes]
        : [];
    if (notes.length === 0 && !item.data.detail) continue;
    seenTheory.add(path);
    theory.push({
      title: item.data.title ?? "Theory",
      notes,
      detail: item.data.detail,
    });
  }

  // ── PYQ exam banks: year -> { questions, units, examSource, titles } ──
  type YearBucket = {
    questions: PyqYear["questions"];
    units: string[];
    examSource?: string;
    titles: string[];
  };
  const byYear = new Map<number, YearBucket>();

  const absorb = (path: string, file: ContentIndex[string] | undefined, manifestData?: ManifestItem["data"]) => {
    // Textbook exercise solutions are practice content, not exam-year papers.
    if (normPath(path).startsWith("practice/solutions/")) return;
    const questions = Array.isArray(file?.questions) ? file.questions : [];
    if (questions.length === 0) return;
    const declaredYear = file?.year ?? manifestData?.year;
    const fromName = Number.parseInt(path.match(/neb-(\d{4})/)?.[1] ?? path.match(/(\d{4})/)?.[1] ?? "", 10);
    const year = typeof declaredYear === "number" ? declaredYear : fromName;
    if (!Number.isFinite(year)) return;

    const unit = file?.unitSlug ?? manifestData?.unitSlug ?? "general";
    const bucket = byYear.get(year) ?? { questions: [], units: [], titles: [] };
    bucket.questions.push(...questions);
    if (!bucket.units.includes(unit)) bucket.units.push(unit);
    bucket.examSource ??= file?.examSource ?? manifestData?.examSource;
    const title = file?.title ?? manifestData?.title;
    if (title && !bucket.titles.includes(title)) bucket.titles.push(title);
    byYear.set(year, bucket);
  };

  // Primary: the content index (the only source with real `questions`).
  for (const [path, file] of Object.entries(index)) {
    const norm = normPath(path);
    if (!belongs(norm)) continue;
    absorb(norm, file);
  }
  // Fallback: manifest entries, for any bank the index has not indexed yet.
  for (const item of manifest) {
    const path = normPath(item.path);
    if (!belongs(path)) continue;
    absorb(path, undefined, item.data);
  }

  // ── Concept drills + mind-opening practicals: year-less Q&A under the
  // `drills/` and `practicals/` sections. Practical files hold one question
  // per syllabus unit, so the unit comes from each question first. ──
  const drills: ConceptDrill[] = [];
  for (const [path, file] of Object.entries(index)) {
    const norm = normPath(path);
    const isDrill = norm.includes("/drills/");
    const isPractical = norm.includes("/practicals/");
    if (!belongs(norm) || (!isDrill && !isPractical)) continue;
    const questions = Array.isArray(file?.questions) ? file.questions : [];
    for (const [i, q] of questions.entries()) {
      const raw = q as {
        question?: unknown;
        solution?: unknown;
        concept?: unknown;
        id?: unknown;
        marks?: unknown;
        unit?: unknown;
        unitSlug?: unknown;
        kind?: unknown;
      };
      if (typeof raw.question !== "string" || !raw.question.trim()) continue;
      const unit =
        (typeof raw.unitSlug === "string" && raw.unitSlug) ||
        (typeof raw.unit === "string" && raw.unit) ||
        file?.unitSlug ||
        "general";
      drills.push({
        id: typeof raw.id === "string" && raw.id ? raw.id : `${norm}#${i}`,
        question: raw.question,
        solution: typeof raw.solution === "string" ? raw.solution : undefined,
        concept: typeof raw.concept === "string" ? raw.concept : undefined,
        unit,
        marks: typeof raw.marks === "string" || typeof raw.marks === "number" ? raw.marks : undefined,
        kind: isPractical ? "practical" : raw.kind === "practical" ? "practical" : "concept",
      });
    }
  }

  const pyqs: PyqYear[] = [...byYear.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([year, bucket]) => ({
      year,
      // A year can now span several units, so its files carry several titles.
      // Leading with one of them ("... Dynamics — 2024 + others") would imply a
      // unit-specific card, which is wrong: fall back to the shared prefix
      // ("NEB Class 11 Physics") plus the year. The card shows the unit count.
      title: (() => {
        if (bucket.titles.length <= 1) return bucket.titles[0] ?? `NEB ${year}`;
        const prefix = commonPrefix(bucket.titles);
        return prefix ? `${prefix} — ${year}` : `NEB ${year}`;
      })(),
      examSource: bucket.examSource ?? "NEB",
      units: bucket.units,
      questions: bucket.questions,
    }));

  // Fallback: subjects without ravikishan theory files (biology, english,
  // nepali) still have chapter-level theory notes in the r-export manifest.
  if (theory.length === 0) {
    for (const item of rexpManifest) {
      if (item.subject !== subjectSlug) continue;
      const notes = Array.isArray(item.notes) ? item.notes : [];
      if (notes.length === 0) continue;
      theory.push({
        title: item.title ?? "Theory",
        notes,
      });
    }
  }

  return {
    theory,
    pyqs: pyqs.slice(0, Math.max(1, maxYears)),
    drills,
  };
}

/** Stable ordering helper — years newest → oldest. */
export function orderPyqYears(pyqs: PyqYear[]): PyqYear[] {
  return [...pyqs].sort((a, b) => b.year - a.year);
}