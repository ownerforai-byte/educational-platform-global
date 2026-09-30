/**
 * CURRICULUM CORPUS — the platform's own verified source of truth for the tutor.
 *
 * Owner requirement (2026-09-30): chat replies must stop being shallow. The
 * fix is not a longer prompt — it is GROUNDING. Before the model writes a
 * single word, the real curriculum material for the asked concept is retrieved
 * and injected WHOLE (never summarised, never truncated), so the reply is a
 * synthesis of material the platform itself owns, not a memory guess.
 *
 * WHAT COUNTS AS A SOURCE (the drop-in contract):
 *
 *   1. `content/ravikishan/<class>/<subject>/<unit>/concepts/*.json`
 *      — the authored ConceptNote corpus (schema-validated by `npm run check:schema`).
 *   2. `frontend/public/data/syllabus-notes/<subject>/*.json`
 *      — the built note payloads shipped to the browser.
 *   3. `backend/kb/` — the OPTIONAL drop-in folder: any nested `.json` file
 *      under it, whose top-level values are strings or arrays of strings, is
 *      picked up automatically, with no code change. This is how new material
 *      (a new board, a new book, teacher notes, PYQ banks) is handed to the
 *      tutor.
 *
 * The extractor is deliberately SHAPE-TOLERANT: every top-level string /
 * string[] field becomes a labelled section. A source that spells its
 * knowledge `notes` is read exactly like one that spells it `importantPoints`
 * — so feeding the tutor a new format never requires touching this file.
 *
 * SOURCE VALIDATION (owner requirement 2026-09-30 — "the source is too shallow
 * and light, so validate it"): an audit of the real corpus found that roughly
 * HALF of the indexed characters were template filler — the same 34-line
 * "confusion" / "practice" / "practiceQuestions" banks pasted into 126+
 * authored files (a chemistry file carried the prokaryote-vs-eukaryote items),
 * plus placeholder lines such as "Core point for 02 alkali metals." and
 * "$F = m \a$ (relevant formula for 02 alkali metals)" — a MEANINGLESS
 * grounding spine that also poisoned retrieval (170 records "contained"
 * photosynthesis) and burned the injected prompt budget.
 *
 * Two filters now run at load time, so every consumer — retrieval, the injected
 * [CURRICULUM SOURCE] block, the owner console — sees only validated knowledge:
 *
 *   1. BOILERPLATE — a line that appears in `BOILERPLATE_MIN_RECORDS` or more
 *      records (or matches the placeholder template) teaches nothing about any
 *      single topic and is dropped from that record's sections.
 *   2. FILLER RECORDS — a record whose surviving content is below
 *      `MIN_TEACHABLE_CHARS` is marked `filler` and is never injected as a
 *      grounding spine (see curriculum-retrieval.ts); it is reported in stats
 *      instead, because "the platform has no material" is a fact the reply
 *      must be able to say.
 *
 * Everything here is BEST-EFFORT and read-only: a missing corpus, a malformed
 * file or a permission error degrades to "no grounding available" and must
 * never fail a chat request or throw during boot.
 */

import fs from "fs";
import path from "path";

/** Which class a record belongs to. `unknown` = the source did not say. */
export type ClassLevel = "class-11" | "class-12" | "unknown";

/** One labelled knowledge block of a source record ("Notes", "Exam traps", …). */
export interface CorpusSection {
  label: string;
  lines: string[];
}

/** One indexed, retrievable curriculum record. */
export interface CorpusEntry {
  /** Stable id — the repo-relative source path. */
  id: string;
  classLevel: ClassLevel;
  subject: string;
  unit: string;
  title: string;
  topicSlug: string;
  /** Author-declared relevance (0–100); 0 when the source omits it. */
  relevance: number;
  /** Every knowledge field of the record, in author order. */
  sections: CorpusSection[];
  /** Lowercased searchable text (title + unit + all section lines). */
  haystack: string;
  /** Repo-relative path this record was read from. */
  source: string;
  /** True when the record came from the drop-in `backend/kb` folder. */
  dropIn: boolean;
  /** Characters of VALIDATED content that survived boilerplate filtering. */
  contentChars: number;
  /** True when too little validated content survives to teach the concept. */
  filler: boolean;
}

/**
 * A line copied into this many records is a template bank, not knowledge about
 * any one of them. 5 is deliberately low: the real banks ring in at 126–252
 * records, while a genuine fact repeated five times is vanishingly rare.
 */
export const BOILERPLATE_MIN_RECORDS = 5;

/** Below this much surviving content a record cannot ground an answer. */
export const MIN_TEACHABLE_CHARS = 400;

/**
 * Placeholder templates written by the content generators instead of real
 * knowledge — "Core point for 02 alkali metals.", "Universal scientific fact
 * for 03 …", "$F = m \a$ (relevant formula for 02 alkali metals)". They name the
 * unit and say nothing about it, so they are dropped like boilerplate.
 */
const PLACEHOLDER_LINE =
  /^\s*(core point|universal scientific fact|universal fact|specialized insight|specialised insight|key statement|relevant formula|key formula)\s+for\b|\brelevant formula for\b[^)]*\)?\s*$/i;

/**
 * TEMPLATE-FRAME lines — the content generators wrote one line per topic from a
 * fixed mould, so they are unique per record (the cross-record frequency rule
 * cannot see them) yet teach nothing:
 *
 *   "**First Law of Thermodynamics:** Class 11 concept."
 *   "Distinguish concepts in Capacitance and Capacitor."
 *   "Solve 5 problems on First Law of Thermodynamics."
 *   "First Law of Thermodynamics appears in exams."
 *   "Q2. Key formula for Introduction to Limits and Continuity."
 *   "Formula for X: [insert from textbook]."
 *
 * The real authored records next to them read "**Capacitance definition:**
 * Capacitance $C$ of a conductor is the ratio of electric charge …", so the
 * frames below are safe: no genuine note opens with them.
 */
const TEMPLATE_FRAME_LINE = [
  /:[*\s]*class\s*(11|12|xi|xii)\s*concept\.?\s*$/i,
  /\[\s*insert[^\]]*\]/i,
  /^\s*(distinguish concepts? in|solve\s+\d+\s+problems?\s+on|derive the key formula for|core principle of|application of|numerical problem on|daily life use of)\b/i,
  /^\s*(q\s*\d+[.)]\s*)?(define|key formula for|problem on|state the definition of)\b/i,
  /\bappears in exams\b/i,
  /^\s*understand\s+(and|,)?.{0,60}\bfor\s+(the\s+)?(unit|topic|chapter)\b/i,
];

/** True when a line is a generator frame rather than knowledge. */
export function isTemplateFrame(line: string): boolean {
  return TEMPLATE_FRAME_LINE.some((pattern) => pattern.test(line));
}

/** One line, normalised for line-level identity across records. */
export function normalizeLine(line: string): string {
  return line.replace(/\s+/g, " ").trim().toLowerCase();
}

/** True when a line is a template bank line or a generator placeholder. */
export function isBoilerplateLine(line: string, lineCounts?: Map<string, number>): boolean {
  if (PLACEHOLDER_LINE.test(line)) return true;
  if (isTemplateFrame(line)) return true;
  if (!lineCounts) return false;
  // Very short lines repeat legitimately ("Summary", "Unit 3"); require some
  // substance before treating a repeat as a template bank.
  const key = normalizeLine(line);
  if (key.length < 24) return false;
  return (lineCounts.get(key) ?? 0) >= BOILERPLATE_MIN_RECORDS;
}

/** Top-level keys that describe the record rather than teach the concept. */
const META_KEYS = new Set([
  "id",
  "slug",
  "class",
  "grade",
  "level",
  "title",
  "topicTitle",
  "name",
  "subject",
  "unit",
  "unitSlug",
  "topicSlug",
  "subjectSlug",
  "classSlug",
  "relevance",
  "priority",
  "order",
  "index",
  "version",
  "animation3D",
  "motionGraphics",
  "animation",
  "visual",
  "3d",
  // Presentation-only descriptors ("Tab group: …", "Visual type: …") — they
  // were being injected as if they were knowledge.
  "tabGroup",
  "visualType",
  "duplicateType",
  "generatedAt",
  "updatedAt",
  "source",
  "sources",
]);

/**
 * Turn a camelCase / snake_case / kebab-case key into a readable label:
 * `examShortTricks` → `Exam short tricks`, `important_concepts` → `Important concepts`.
 */
export function humanizeKey(key: string): string {
  const spaced = key
    .replace(/[_-]+/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim();
  if (!spaced) return key;
  return spaced.charAt(0).toUpperCase() + spaced.slice(1).toLowerCase();
}

/** Read a class level out of any path/text the source provides. */
export function detectClassLevel(text: string): ClassLevel {
  const t = text.toLowerCase();
  if (/(^|[^0-9])class[-_ ]?12([^0-9]|$)|grade[-_ ]?12|(^|[^0-9])xii([^0-9]|$)/.test(t)) {
    return "class-12";
  }
  if (/(^|[^0-9])class[-_ ]?11([^0-9]|$)|grade[-_ ]?11|(^|[^0-9])xi([^0-9]|$)/.test(t)) {
    return "class-11";
  }
  return "unknown";
}

/**
 * Read the class out of a record's OWN scope declaration — `"class": "12"`,
 * `"grade": "Class 11"`, `"level": "xii"`. Unlike detectClassLevel() this also
 * accepts a bare number, because a dedicated field is unambiguous in a way that
 * the digits inside a sentence never are.
 */
export function classLevelFromDeclared(value: unknown): ClassLevel {
  const v = String(value ?? "").trim().toLowerCase();
  if (!v || v.length > 20) return "unknown";
  if (/(^|\d)xii$|^12$|^12th$|class\s*12$|grade\s*12$/.test(v)) return "class-12";
  if (/(^|\d)xi$|^11$|^11th$|class\s*11$|grade\s*11$/.test(v)) return "class-11";
  return "unknown";
}

/**
 * Read every knowledge field of a raw record as `key → lines`, before any
 * filtering. Shared by the boilerplate audit (pass 1) and record building
 * (pass 2) so both agree exactly on what a line is.
 */
function extractSections(obj: Record<string, unknown>): Array<[string, string[]]> {
  const out: Array<[string, string[]]> = [];
  for (const [key, value] of Object.entries(obj)) {
    if (META_KEYS.has(key)) continue;
    let lines: string[] = [];
    if (typeof value === "string") {
      if (value.trim()) lines = [value.trim()];
    } else if (Array.isArray(value)) {
      lines = value
        .filter((v): v is string => typeof v === "string")
        .map((v) => v.trim())
        .filter(Boolean);
    }
    if (lines.length) out.push([key, lines]);
  }
  return out;
}

/** Characters of validated content in a set of sections. */
export function sectionsCharCount(sections: CorpusSection[]): number {
  return sections.reduce(
    (total, section) => total + section.lines.reduce((n, line) => n + line.length, 0),
    0,
  );
}

/**
 * Normalise a raw JSON object into a CorpusEntry, or null if it teaches nothing.
 *
 * With `lineCounts` supplied, template-bank and placeholder lines are removed
 * before the entry is built — the validated record is what every consumer sees.
 */
function toEntry(
  raw: unknown,
  meta: {
    id: string;
    file: string;
    subject: string;
    unit: string;
    classLevel: ClassLevel;
    dropIn: boolean;
  },
  lineCounts?: Map<string, number>,
): CorpusEntry | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const obj = raw as Record<string, unknown>;

  const sections: CorpusSection[] = [];
  for (const [key, lines] of extractSections(obj)) {
    const kept = lineCounts ? lines.filter((line) => !isBoilerplateLine(line, lineCounts)) : lines;
    if (kept.length) sections.push({ label: humanizeKey(key), lines: kept });
  }

  // A record that carries no teachable text is not a source.
  if (!sections.length) return null;

  const title =
    (typeof obj.title === "string" && obj.title.trim()) ||
    (typeof obj.topicTitle === "string" && obj.topicTitle.trim()) ||
    (typeof obj.name === "string" && obj.name.trim()) ||
    meta.id;

  const unit =
    (typeof obj.unitSlug === "string" && obj.unitSlug.trim()) ||
    (typeof obj.unit === "string" && obj.unit.trim()) ||
    meta.unit;

  const topicSlug =
    (typeof obj.topicSlug === "string" && obj.topicSlug.trim()) ||
    (typeof obj.slug === "string" && obj.slug.trim()) ||
    "";

  const subject =
    (typeof obj.subject === "string" && obj.subject.trim().toLowerCase()) || meta.subject;

  const relevanceRaw = Number(obj.relevance ?? obj.priority ?? 0);
  const relevance = Number.isFinite(relevanceRaw)
    ? Math.max(0, Math.min(100, relevanceRaw))
    : 0;

  // A record's own scope declaration wins over the path it lives in — this is
  // what makes a drop-in `{"class": "12", …}` file land in the Class 12 bucket
  // even when it is stored under a neutral folder name.
  const declared = (() => {
    const fromClass = classLevelFromDeclared(obj.class);
    if (fromClass !== "unknown") return fromClass;
    const fromGrade = classLevelFromDeclared(obj.grade);
    if (fromGrade !== "unknown") return fromGrade;
    return classLevelFromDeclared(obj.level);
  })();

  const classLevel =
    declared !== "unknown"
      ? declared
      : meta.classLevel !== "unknown"
        ? meta.classLevel
        : detectClassLevel(`${meta.id} ${subject} ${unit}`);

  const haystack = [title, unit, subject, topicSlug, ...sections.flatMap((s) => s.lines)]
    .join(" \n ")
    .toLowerCase();

  const contentChars = sectionsCharCount(sections);

  return {
    id: meta.id,
    classLevel,
    subject,
    unit,
    title,
    topicSlug,
    relevance,
    sections,
    haystack,
    source: meta.file,
    dropIn: meta.dropIn,
    contentChars,
    filler: contentChars < MIN_TEACHABLE_CHARS,
  };
}

// ── Source discovery ─────────────────────────────────────────────────────────

/** A discovered corpus root: where it is, and how to read it. */
interface CorpusRoot {
  /** Absolute directory to walk. */
  dir: string;
  /** Repo-relative display prefix. */
  label: string;
  /** Only read files whose path contains this segment (undefined = all .json). */
  requireSegment?: string;
  dropIn: boolean;
}

/**
 * Candidate corpus roots, most authoritative first. Missing directories are
 * skipped silently, so the same build works from `backend/`, from the repo
 * root, and on a deploy where only `public/data` was shipped.
 */
function candidateRoots(): CorpusRoot[] {
  const cwd = process.cwd();
  const up = path.join(cwd, "..");
  const roots: CorpusRoot[] = [];

  for (const base of [cwd, up]) {
    roots.push({
      dir: path.join(base, "content", "ravikishan"),
      label: "content/ravikishan",
      requireSegment: `${path.sep}concepts${path.sep}`,
      dropIn: false,
    });
    roots.push({
      dir: path.join(base, "backend", "kb"),
      label: "backend/kb",
      dropIn: true,
    });
    roots.push({
      dir: path.join(base, "kb"),
      label: "kb",
      dropIn: true,
    });
    roots.push({
      dir: path.join(base, "frontend", "public", "data", "syllabus-notes"),
      label: "frontend/public/data/syllabus-notes",
      dropIn: false,
    });
    roots.push({
      dir: path.join(base, "public", "data", "syllabus-notes"),
      label: "public/data/syllabus-notes",
      dropIn: false,
    });
  }

  // De-duplicate by resolved path, keeping the first (most authoritative).
  const seen = new Set<string>();
  return roots.filter((r) => {
    const key = path.resolve(r.dir);
    if (seen.has(key)) return false;
    seen.add(key);
    return fs.existsSync(r.dir);
  });
}

/** Walk a directory collecting .json files, bounded so a bad tree cannot hang boot. */
function collectJsonFiles(dir: string, requireSegment: string | undefined, out: string[], depth = 0): void {
  if (depth > 8 || out.length > 20_000) return;
  let names: string[];
  try {
    names = fs.readdirSync(dir);
  } catch {
    return;
  }
  for (const name of names) {
    if (name.startsWith(".")) continue;
    const full = path.join(dir, name);
    let stat: fs.Stats;
    try {
      stat = fs.statSync(full);
    } catch {
      continue;
    }
    if (stat.isDirectory()) {
      collectJsonFiles(full, requireSegment, out, depth + 1);
      continue;
    }
    if (!name.endsWith(".json")) continue;
    if (name === "_index.json") continue;
    if (requireSegment && !full.includes(requireSegment)) continue;
    out.push(full);
  }
}

/** Derive `subject` / `unit` from a path relative to its corpus root. */
function deriveSubjectUnit(
  relFromRoot: string,
  requireSegment: string | undefined,
): { subject: string; unit: string } {
  const parts = relFromRoot.split(/[\\/]/).filter(Boolean);
  // `class-11-notes/physics/capacitor/concepts/01-x.json` → subject physics, unit capacitor
  if (requireSegment) {
    const idx = parts.indexOf("concepts");
    if (idx >= 2) return { subject: parts[idx - 2], unit: parts[idx - 1] };
    if (idx === 1) return { subject: parts[0], unit: parts[0] };
  }
  // `<subject>/<NN-unit>.json` → subject + unit from the filename stem
  if (parts.length >= 2) {
    // <subject>/<unit…>/<file>.json or <subject>/<file>.json
    const subject = parts[0];
    const stem = parts[parts.length - 1].replace(/\.json$/i, "").replace(/^\d+[-_]/, "");
    return { subject, unit: stem };
  }
  if (parts.length === 1) {
    // A file sitting directly in the root has no subject folder — don't let the
    // filename masquerade as one (backend/kb/zener.json → subject "general").
    const stem = parts[0].replace(/\.json$/i, "").replace(/^\d+[-_]/, "");
    return { subject: "general", unit: stem };
  }
  return { subject: "general", unit: "general" };
}

// ── Loader + cache ───────────────────────────────────────────────────────────

/** Snapshot describing what the tutor currently has to read. */
export interface CorpusStats {
  entries: number;
  byClass: Record<string, number>;
  bySubject: Record<string, number>;
  dropIn: number;
  roots: string[];
  /** Repo-relative paths that failed to parse (diagnostics only). */
  unreadable: number;
  /** Distinct template-bank/placeholder LINES recognised and stripped. */
  boilerplateLines: number;
  /** Lines removed because they were template banks or placeholders. */
  boilerplateRemoved: number;
  /** Records with too little validated content to ground an answer. */
  fillerRecords: number;
  /** Records with enough validated content to be a grounding spine. */
  substantiveRecords: number;
  /** Validated characters available to the tutor across all records. */
  contentChars: number;
}

interface CorpusSnapshot {
  entries: CorpusEntry[];
  stats: CorpusStats;
  /** Normalised line → number of records carrying it (boilerplate audit). */
  lineCounts: Map<string, number>;
  loadedAt: number;
}

let _cache: CorpusSnapshot | null = null;
/** Cache lifetime — the corpus changes only on deploy/authoring, not per request. */
const CACHE_TTL_MS = 5 * 60 * 1000;

/**
 * Read every source record the tutor is allowed to ground on. Never throws:
 * a missing/unreadable corpus yields zero entries and the caller degrades to
 * the prompt-only contract.
 */
/** A parsed-but-unvalidated record, waiting for the boilerplate audit. */
interface RawRecord {
  id: string;
  raw: Record<string, unknown>;
  meta: {
    id: string;
    file: string;
    subject: string;
    unit: string;
    classLevel: ClassLevel;
    dropIn: boolean;
  };
}

/**
 * Read every source record the tutor is allowed to ground on. Never throws:
 * a missing/unreadable corpus yields zero entries and the caller degrades to
 * the prompt-only contract.
 *
 * Three passes, and the order is the validation:
 *   1. PARSE — every JSON file, every record (one or a keyed collection).
 *   2. AUDIT — count how many records carry each line; a line carried by many
 *      records is a template bank, not knowledge about any of them.
 *   3. BUILD — strip template/placeholder lines, then mark what survives as
 *      substantive or `filler`.
 */
export function loadCorpus(): CorpusSnapshot {
  const unreadable: string[] = [];
  const roots = candidateRoots();
  const raws: RawRecord[] = [];

  // ── Pass 1: parse ─────────────────────────────────────────────────────────
  for (const root of roots) {
    const files: string[] = [];
    collectJsonFiles(root.dir, root.requireSegment, files);

    for (const file of files) {
      let parsed: unknown;
      try {
        parsed = JSON.parse(fs.readFileSync(file, "utf8"));
      } catch {
        unreadable.push(file);
        continue;
      }

      const relFromRoot = path.relative(root.dir, file);
      const { subject, unit } = deriveSubjectUnit(relFromRoot, root.requireSegment);
      const display = `${root.label}/${relFromRoot.split(/[\\/]/).join("/")}`;
      const stem = path.basename(file).replace(/\.json$/i, "");
      const classLevel = detectClassLevel(`${display} ${stem} ${unit}`);

      // A file may hold ONE record or a keyed/mapped COLLECTION of records
      // (`{ "slug": {…}, "slug2": {…} }`) — both shapes are common in this
      // repo, so unwrap a collection before normalising.
      const records: Array<{ id: string; raw: unknown }> = [];
      const isCollection =
        parsed !== null &&
        typeof parsed === "object" &&
        !Array.isArray(parsed) &&
        !hasTeachableFields(parsed as Record<string, unknown>);

      if (isCollection) {
        const map = parsed as Record<string, Record<string, unknown>>;
        if (Array.isArray((map as Record<string, unknown>).records)) {
          for (const [i, item] of ((map as unknown as { records: unknown[] }).records).entries()) {
            records.push({ id: `${display}#${i}`, raw: item });
          }
        } else {
          for (const [key, item] of Object.entries(map)) {
            if (item && typeof item === "object" && !Array.isArray(item)) {
              records.push({ id: `${display}#${key}`, raw: item });
            }
          }
        }
      } else {
        records.push({ id: display, raw: parsed });
      }

      for (const { id, raw } of records) {
        if (!raw || typeof raw !== "object" || Array.isArray(raw)) continue;
        raws.push({
          id,
          raw: raw as Record<string, unknown>,
          meta: { id, file: display, subject, unit, classLevel, dropIn: root.dropIn },
        });
      }
    }
  }

  // ── Pass 2: boilerplate audit ─────────────────────────────────────────────
  // Count each normalised line once per record, so "this exact line sits in 200
  // records" is visible and a genuinely repeated fact is not mistaken for one.
  const lineCounts = new Map<string, number>();
  for (const { raw } of raws) {
    const seen = new Set<string>();
    for (const [, lines] of extractSections(raw)) {
      for (const line of lines) {
        const key = normalizeLine(line);
        if (key.length < 24 || seen.has(key)) continue;
        seen.add(key);
        lineCounts.set(key, (lineCounts.get(key) ?? 0) + 1);
      }
    }
  }

  // ── Pass 3: build the validated records ───────────────────────────────────
  const entries: CorpusEntry[] = [];
  const byClass: Record<string, number> = {};
  const bySubject: Record<string, number> = {};
  let dropIn = 0;
  let fillerRecords = 0;
  let contentChars = 0;
  let boilerplateRemoved = 0;

  for (const { raw, meta } of raws) {
    const before = extractSections(raw).reduce((n, [, lines]) => n + lines.length, 0);
    const entry = toEntry(raw, meta, lineCounts);
    if (!entry) continue;
    const after = entry.sections.reduce((n, s) => n + s.lines.length, 0);
    boilerplateRemoved += Math.max(0, before - after);

    entries.push(entry);
    byClass[entry.classLevel] = (byClass[entry.classLevel] ?? 0) + 1;
    bySubject[entry.subject] = (bySubject[entry.subject] ?? 0) + 1;
    if (entry.dropIn) dropIn++;
    if (entry.filler) fillerRecords++;
    contentChars += entry.contentChars;
  }

  return {
    entries,
    stats: {
      entries: entries.length,
      byClass,
      bySubject,
      dropIn,
      roots: roots.map((r) => path.resolve(r.dir)),
      unreadable: unreadable.length,
      boilerplateLines: Array.from(lineCounts.values()).filter(
        (n) => n >= BOILERPLATE_MIN_RECORDS,
      ).length,
      boilerplateRemoved,
      fillerRecords,
      substantiveRecords: entries.length - fillerRecords,
      contentChars,
    },
    lineCounts,
    loadedAt: Date.now(),
  };
}

/** True when an object itself looks like one record (has any teachable field). */
function hasTeachableFields(obj: Record<string, unknown>): boolean {
  return Object.entries(obj).some(
    ([k, v]) =>
      !META_KEYS.has(k) &&
      (typeof v === "string" ? v.trim().length > 0 : Array.isArray(v) && v.some((x) => typeof x === "string")),
  );
}

/** Cached corpus (5-minute TTL). */
export function getCorpus(): CorpusSnapshot {
  if (!_cache || Date.now() - _cache.loadedAt > CACHE_TTL_MS) {
    _cache = loadCorpus();
  }
  return _cache;
}

/** Corpus statistics for diagnostics / the owner console. */
export function getCorpusStats(): CorpusStats {
  return getCorpus().stats;
}

/** Drop the cache — used by tests and by an authoring hot-reload. */
export function resetCorpusCache(): void {
  _cache = null;
}


