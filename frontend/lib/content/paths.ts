/**
 * content-paths — the ONE place that knows the classified `content/` tree.
 *
 * The corpus is organized by WHAT A FILE IS (its section) first, then by WHERE
 * it belongs (class → subject → unit). The old tree mixed everything under
 * personal/legacy roots (`content/ravikishan/{class-11,class-11-notes,class-11e,…}`)
 * with the content kind as the last folder before the file; the 2026-10
 * re-classification re-homed every file by kind:
 *
 *   content/
 *   ├── notes/            everything you read to learn
 *   │   ├── concepts/     concept notes        <class>/<subject>/<unit>/NN-slug.json
 *   │   ├── theory/       theory blocks        <class>/<subject>/[<unit>/]…json
 *   │   ├── guides/       general study notes  <class>/<subject>/<unit>/…json
 *   │   └── lessons/      guided lessons       <subject>/…md
 *   ├── formulas/         formula sheets       <class>/<subject>/<unit>/…json
 *   ├── practice/         questions & exams
 *   │   ├── questions/    past-year questions  <class>/<subject>/[<unit>/]…json
 *   │   ├── problem-sets/ problem sets         <class>/<subject>/<unit>/…json
 *   │   ├── examples/     worked examples      <class>/<subject>/<unit>/…json
 *   │   └── exams/        full exam papers     exam-0N.json
 *   ├── visuals/          see-it-to-get-it
 *   │   ├── mindmaps/     concept maps         <class>/<subject>/<unit>/…json
 *   │   ├── rails/        home rail cards      <class>/<subject>/<unit>/…rail.json
 *   │   └── graphs/       graph data           <class>/<subject>/<unit>/…json
 *   ├── resources/        raw reference material
 *   │   ├── question-bank/  NEB past-paper bank (content/pyq)
 *   │   ├── documents/      PDFs & materials   (content/materials)
 *   │   ├── exports/        r-notes exports    (content/r-export)
 *   │   └── plans/          authoring plans    <class>/<subject>/<unit>/plan.json
 *   ├── journal/          personal journal (entries/ is author-owned)
 *   └── archive/          dated backups, never read by the app
 *   └── _index.json       path → full content (keys relative to content/)
 *
 * Class dirs are normalized to `class-11` / `class-12` (the five legacy roots
 * `class-11`, `class-11-notes`, `class-11e`, `class-12`, `class-12-notes`
 * collapse into two). Routes still use the track slugs (`class-11-notes` /
 * `class-12-notes`) from `lib/syllabus.ts` — use the conversion helpers here
 * instead of string surgery.
 *
 * Consumers: lib/{pyq-bank,imported-notes,note-routes,home-rails-corpus}.ts,
 * features/syllabus/content-router.ts, scripts/content/*, scripts/*.mjs and the
 * backend corpus readers. If the tree moves again, it moves HERE first.
 */
// NOTE: no node imports here — this module is shared with client components.

/** Every classified kind folder in the corpus and its section path. */
export const KIND_SECTIONS = {
  concepts: "notes/concepts",
  theory: "notes/theory",
  guides: "notes/guides",
  notes: "notes/guides",
  lessons: "notes/lessons",
  formula: "formulas",
  pyqs: "practice/questions",
  sets: "practice/problem-sets",
  examples: "practice/examples",
  exams: "practice/exams",
  mindmap: "visuals/mindmaps",
  rails: "visuals/rails",
  graph: "visuals/graphs",
  documents: "resources/documents",
  "question-bank": "resources/question-bank",
  exports: "resources/exports",
  plans: "resources/plans",
} as const;

export type ContentKind = keyof typeof KIND_SECTIONS;

/** Top-level sections, in documentation order. */
export const CONTENT_SECTIONS = [
  "notes",
  "formulas",
  "practice",
  "visuals",
  "resources",
  "journal",
  "archive",
] as const;

/** The two normalized class directories. */
export const CLASS_DIRS = ["class-11", "class-12"] as const;
export type ClassDir = (typeof CLASS_DIRS)[number];

/** Route track slug (`class-11-notes`) → class directory (`class-11`). */
export function classDirOfTrack(trackSlug: string): string {
  return trackSlug.replace(/-notes$/, "");
}

/** Class directory (`class-11`) → route track slug (`class-11-notes`). */
export function trackOfClassDir(classDir: string): string {
  return `${classDir}-notes`;
}

/**
 * Legacy class roots collapsed by the re-classification. Kept for parsers that
 * still meet old paths in generated reports or historic manifests.
 */
export const LEGACY_CLASS_DIRS: Record<string, ClassDir> = {
  "class-11": "class-11",
  "class-11-notes": "class-11",
  "class-11e": "class-11",
  "class-12": "class-12",
  "class-12-notes": "class-12",
};

export function normalizeClassDir(value: string): string {
  return LEGACY_CLASS_DIRS[value] ?? value;
}

/**
 * Unit-dir aliases collapsed by the re-classification (legacy dir → canonical
 * syllabus unit id). The `unit-N-`/`chapter-N-` prefix strip lives in
 * scripts/reclassify-content.mjs (it runs once, at migration time).
 */
export const UNIT_DIR_ALIASES: Record<string, string> = {
  "work-energy-power": "work-energy-and-power",
  "bhasha-tatha-vyakaran": "bhasha-ra-vyakarana",
  "basic-concept-organic": "basic-concept-of-organic-chemistry",
  "chemical-bonding": "chemical-bonding-and-shapes-of-molecules",
};

export type ParsedContentPath = {
  /** Section + subsection, e.g. `notes/concepts`. */
  section: string;
  kind: ContentKind;
  /** Normalized class dir (`class-11`) when the path carries one. */
  classDir?: string;
  subjectSlug?: string;
  /** First unit-level directory segment, when present. */
  unitSlug?: string;
  /** Remaining segments after class/subject/[unit]/ — includes the filename. */
  rest: string[];
};

const SECTION_LOOKUP: Array<{ prefix: string; kind: ContentKind }> = (
  Object.entries(KIND_SECTIONS) as Array<[ContentKind, string]>
)
  .map(([kind, section]) => ({ prefix: `${section}/`, kind }))
  // Longest section prefix first, so `notes/concepts` wins over `notes`.
  .sort((a, b) => b.prefix.length - a.prefix.length);

/**
 * Parse one content-relative path (`notes/concepts/class-11/physics/…json`) or
 * key (`_index.json` keys are content-relative too). Returns undefined for
 * paths outside the classified sections.
 *
 * A path carries a unit only when a directory segment precedes the filename —
 * subject-level files (`notes/theory/class-11/chemistry/atomic-structure.json`)
 * have no unit dir; the unit is the file's own name there.
 */
export function parseContentPath(rel: string): ParsedContentPath | undefined {
  const norm = rel.replace(/\\/g, "/").replace(/^\.?\/*/, "");
  const hit = SECTION_LOOKUP.find((s) => norm.startsWith(s.prefix));
  if (!hit) return undefined;
  const segments = norm.slice(hit.prefix.length).split("/").filter(Boolean);
  const [maybeClass, maybeSubject, ...tail] = segments;
  const classDir = maybeClass && maybeClass in LEGACY_CLASS_DIRS ? normalizeClassDir(maybeClass) : undefined;
  const subjectSlug = classDir ? maybeSubject : undefined;
  const afterCoords = classDir ? tail : segments;
  const unitSlug = afterCoords.length >= 2 ? afterCoords[0] : undefined;
  return {
    section: hit.prefix.replace(/\/$/, ""),
    kind: hit.kind,
    classDir,
    subjectSlug,
    unitSlug,
    rest: unitSlug ? afterCoords.slice(1) : afterCoords,
  };
}

/**
 * The coordinates triple most consumers need: legacy class root, subject, unit —
 * the same shape the old `class-11-notes/<subject>/<unit>/…` keys carried.
 */
export function contentCoords(rel: string): {
  classDir?: string;
  subjectSlug?: string;
  unitSlug?: string;
} {
  const parsed = parseContentPath(rel);
  return {
    classDir: parsed?.classDir,
    subjectSlug: parsed?.subjectSlug,
    unitSlug: parsed?.unitSlug,
  };
}

/** `<root>/content` — the corpus root under a repo root. */
export function contentRoot(repoRoot: string): string {
  return `${repoRoot.replace(/[\\/]+$/, "")}/content`;
}

/**
 * Directory holding one kind of one unit's content:
 *   unitSectionDir(root, "notes/concepts", "class-11", "physics", "kinematics")
 *   → <root>/content/notes/concepts/class-11/physics/kinematics
 */
export function unitSectionDir(
  repoRoot: string,
  section: string,
  classDirOrTrack: string,
  subjectSlug: string,
  unitSlug: string,
): string {
  return [
    contentRoot(repoRoot),
    ...section.split("/"),
    normalizeClassDir(classDirOfTrack(classDirOrTrack)),
    subjectSlug,
    unitSlug,
  ].join("/");
}

/** `content/notes/concepts/<class>/<subject>/<unit>` for one unit. */
export function conceptsDir(
  repoRoot: string,
  classDirOrTrack: string,
  subjectSlug: string,
  unitSlug: string,
): string {
  return unitSectionDir(repoRoot, "notes/concepts", classDirOrTrack, subjectSlug, unitSlug);
}

/** `content/visuals/rails/<class>/<subject>/<unit>` for one unit. */
export function railsDir(
  repoRoot: string,
  classDirOrTrack: string,
  subjectSlug: string,
  unitSlug: string,
): string {
  return unitSectionDir(repoRoot, "visuals/rails", classDirOrTrack, subjectSlug, unitSlug);
}
