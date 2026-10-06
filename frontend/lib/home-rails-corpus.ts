/**
 * home-rails-corpus — agent-editable knowledge cards for the home subject rails.
 *
 * SERVER-ONLY: reads JSON from the authored corpus with node:fs. Never import
 * this module from a "use client" component — `components/home/
 * home-subject-rails.tsx` loads the corpus on the server, resolves icon names
 * through `HOME_RAIL_ICONS`, and passes plain slide data to the client rails.
 *
 * Agents author cards at:
 *   content/ravikishan/class-11-notes/<subject>/<unit>/rails/<unit>.rail.json
 * one canonical card per syllabus unit (extra cards as
 * `<unit>--<kebab>.rail.json`). Full authoring contract: frontend/AGENTS.md §9.
 * `frontend/scripts/content/home-rails.ts` scaffolds missing skeletons and
 * `--check`s coverage, parsing and readiness.
 */
import fs from "node:fs";
import path from "node:path";

import { LEGACY_UNIT_INDEX } from "./topic-registry";
import { SYLLABUS } from "./syllabus";
import type {
  HomeSubjectSlide,
  SubjectSlideRow,
} from "./home-subject-slides";

export const HOME_RAIL_CLASS_SLUG = "class-11-notes";
export const HOME_RAIL_CLASS_12_SLUG = "class-12-notes";
/** Rail corpus spans both classes — Class 11 first, Class 12 after. */
export const HOME_RAIL_CLASS_SLUGS = [
  HOME_RAIL_CLASS_SLUG,
  HOME_RAIL_CLASS_12_SLUG,
] as const;
export const HOME_RAIL_SCHEMA = "home-rail/v1";
export const RAIL_DIR_NAME = "rails";
export const RAIL_FILE_SUFFIX = ".rail.json";
/** Row/card text starting with this marker counts as unwritten. */
export const RAIL_TODO_MARKER = "TODO";

/**
 * Canonical rows every rail card carries, in rail order. `kind: "formula"`
 * renders the row as a monospace equation block on the card.
 */
export const HOME_RAIL_ROWS: { label: string; kind: "formula" | "text" }[] = [
  { label: "Concept", kind: "text" },
  { label: "Formula", kind: "formula" },
  { label: "Conditions", kind: "text" },
  { label: "Special cases", kind: "text" },
  { label: "Solved", kind: "text" },
  { label: "Limitation", kind: "text" },
  { label: "Derivation", kind: "text" },
  { label: "Shortcut", kind: "text" },
  { label: "Board question", kind: "text" },
];

/** Fallback card icon per rail subject (a card overrides it via `card.icon`). */
export const HOME_RAIL_SUBJECT_ICONS: Record<string, string> = {
  physics: "Atom",
  chemistry: "FlaskConical",
  biology: "Dna",
  mathematics: "Sigma",
  english: "BookOpen",
  nepali: "Languages",
};

export interface HomeRailFileRow {
  label: string;
  kind?: "formula" | "text";
  text: string;
}

export interface HomeRailFile {
  schema: string;
  draft?: boolean;
  classSlug: string;
  subjectSlug: string;
  unitSlug: string;
  unitTitle?: string;
  unitHours?: number;
  syllabusTopics?: string[];
  source?: string;
  agentNotes?: string;
  card: {
    tag: string;
    title: string;
    href: string;
    icon?: string;
    statKey?: string;
  };
  rows: HomeRailFileRow[];
}

export interface HomeRailEntry {
  classSlug: string;
  subjectSlug: string;
  unitId: string;
  /** Repo-relative path with forward slashes (stable for reports/tests). */
  file: string;
  record: HomeRailFile;
  ready: boolean;
  reasons: string[];
}

/** Walk up until `content/ravikishan` is found (dev cwd is `frontend/`). */
export function findCorpusRoot(start = process.cwd()): string {
  let dir = path.resolve(start);
  for (let i = 0; i < 5 && dir !== path.parse(dir).root; i++) {
    if (fs.existsSync(path.join(dir, "content", "ravikishan"))) return dir;
    dir = path.dirname(dir);
  }
  return path.resolve(start);
}

/** Subjects of one rail class in rail order, straight from the syllabus. */
export function homeRailSubjects(
  classSlug: string = HOME_RAIL_CLASS_SLUG,
): {
  slug: string;
  name: string;
  units: { id: string; title: string; hours?: number; topics: string[] }[];
}[] {
  const cls = SYLLABUS.find((c) => c.slug === classSlug);
  if (!cls) return [];
  return cls.subjects.map((s) => ({
    slug: s.slug,
    name: s.name,
    units: s.units.map((u) => ({
      id: u.id,
      title: u.title,
      hours: u.hours,
      topics: [...u.topics],
    })),
  }));
}

/**
 * Resolve a syllabus unit id to its on-disk content directory.
 * Prefers the exact `<id>/` dir, then a legacy/alias dir that
 * LEGACY_UNIT_INDEX maps back to this unit (e.g. `work-energy-power` for
 * `work-energy-and-power`). Returns undefined when the unit has no dir yet —
 * the scaffold script then creates the canonical `<id>/` shell.
 */
export function resolveUnitContentDir(
  corpusRoot: string,
  classSlug: string,
  subjectSlug: string,
  unitId: string,
): string | undefined {
  const subjectDir = path.join(
    corpusRoot,
    "content",
    "ravikishan",
    classSlug,
    subjectSlug,
  );
  const exact = path.join(subjectDir, unitId);
  if (fs.existsSync(exact) && fs.statSync(exact).isDirectory()) return exact;
  if (!fs.existsSync(subjectDir)) return undefined;
  for (const e of fs.readdirSync(subjectDir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    if (LEGACY_UNIT_INDEX[e.name] === unitId) {
      return path.join(subjectDir, e.name);
    }
  }
  return undefined;
}

function isTodo(text: unknown): boolean {
  return (
    typeof text !== "string" ||
    text.trim().length === 0 ||
    text.trimStart().startsWith(RAIL_TODO_MARKER)
  );
}

/** Minimal shape check for a parsed rails file (the strict gate ignores `rails/` by path). */
export function checkRailShape(value: unknown): string[] {
  const problems: string[] = [];
  if (!value || typeof value !== "object") return ["not a JSON object"];
  const rec = value as Record<string, unknown>;
  if (rec.schema !== HOME_RAIL_SCHEMA) {
    problems.push(`schema must be "${HOME_RAIL_SCHEMA}"`);
  }
  for (const key of ["classSlug", "subjectSlug", "unitSlug"]) {
    if (typeof rec[key] !== "string" || !(rec[key] as string).trim()) {
      problems.push(`missing "${key}"`);
    }
  }
  const card = rec.card as Record<string, unknown> | undefined;
  if (!card || typeof card !== "object") {
    problems.push('missing "card" block');
  } else {
    for (const key of ["tag", "title", "href"]) {
      if (typeof card[key] !== "string" || !(card[key] as string).trim()) {
        problems.push(`card.${key} must be a non-empty string`);
      }
    }
  }
  if (!Array.isArray(rec.rows)) problems.push('"rows" must be an array');
  return problems;
}

/**
 * Readiness reasons for one parsed card file. Empty means the card streams on
 * the rail. A `draft: true` skeleton, a missing canonical row, or any TODO /
 * empty row text keeps the card out of the rail without failing any gate.
 */
export function railReadiness(record: HomeRailFile): string[] {
  const reasons: string[] = [];
  if (record.draft === true) reasons.push("draft: true");
  const rows = Array.isArray(record.rows) ? record.rows : [];
  for (const want of HOME_RAIL_ROWS) {
    const row = rows.find((r) => r.label === want.label);
    if (!row) {
      reasons.push(`missing row "${want.label}"`);
    } else if (isTodo(row.text)) {
      reasons.push(`row "${want.label}" is unwritten`);
    }
  }
  if (isTodo(record.card?.title)) reasons.push("card.title is unwritten");
  if (isTodo(record.card?.tag)) reasons.push("card.tag is unwritten");
  return reasons;
}

/** Skeleton for a unit with no authored card yet — always draft, always TODO. */
export function buildRailSkeleton(
  classSlug: string,
  subjectSlug: string,
  subjectName: string,
  unit: { id: string; title: string; hours?: number; topics: string[] },
): HomeRailFile {
  const isClass12 = classSlug === HOME_RAIL_CLASS_12_SLUG;
  return {
    schema: HOME_RAIL_SCHEMA,
    draft: true,
    classSlug,
    subjectSlug,
    unitSlug: unit.id,
    unitTitle: unit.title,
    ...(unit.hours !== undefined ? { unitHours: unit.hours } : {}),
    syllabusTopics: [...unit.topics],
    source: "platform",
    agentNotes: `Authoring contract: frontend/AGENTS.md §9. Fill every row (LaTeX allowed in $...$), set draft to false, then run: npx tsx frontend/scripts/content/home-rails.ts --check`,
    card: {
      tag: isClass12 ? `${unit.title} · Class 12` : unit.title,
      title: `${RAIL_TODO_MARKER}: ${unit.title} — pick this card's anchor concept`,
      href: `/${classSlug}/${subjectSlug}`,
      icon: HOME_RAIL_SUBJECT_ICONS[subjectSlug] ?? "BookOpen",
      statKey: `pyq:${subjectSlug}`,
    },
    rows: HOME_RAIL_ROWS.map((row) => ({
      label: row.label,
      ...(row.kind === "formula" ? { kind: row.kind as "formula" } : {}),
      text: `${RAIL_TODO_MARKER}: write the ${row.label} row for "${unit.title}" (${subjectName} ${isClass12 ? "Class 12" : "Class 11"}).`,
    })),
  };
}

/**
 * Load every `rails/*.rail.json` card for Class 11. Never throws: a missing
 * dir contributes no entries, a broken file contributes an unreadable entry
 * the `--check` script reports (the rail itself only ever renders ready cards).
 */
export function loadHomeRailCorpus(
  corpusRoot = findCorpusRoot(),
  classSlugs: readonly string[] = HOME_RAIL_CLASS_SLUGS,
): HomeRailEntry[] {
  const entries: HomeRailEntry[] = [];
  for (const classSlug of classSlugs) {
    for (const subject of homeRailSubjects(classSlug)) {
      for (const unit of subject.units) {
      const unitDir = resolveUnitContentDir(
        corpusRoot,
        classSlug,
        subject.slug,
        unit.id,
      );
      if (!unitDir) continue;
      const railsDir = path.join(unitDir, RAIL_DIR_NAME);
      if (!fs.existsSync(railsDir)) continue;
      const files = fs
        .readdirSync(railsDir)
        .filter((f) => f.endsWith(RAIL_FILE_SUFFIX))
        .sort((a, b) => {
          const canonical = `${unit.id}${RAIL_FILE_SUFFIX}`;
          if (a === canonical) return -1;
          if (b === canonical) return 1;
          return a.localeCompare(b);
        });
      for (const file of files) {
        const abs = path.join(railsDir, file);
        const rel = path
          .relative(corpusRoot, abs)
          .replaceAll(path.sep, "/");
        let parsed: unknown;
        try {
          parsed = JSON.parse(fs.readFileSync(abs, "utf8"));
        } catch (err) {
          entries.push({
            classSlug,
            subjectSlug: subject.slug,
            unitId: unit.id,
            file: rel,
            record: {} as HomeRailFile,
            ready: false,
            reasons: [`unparseable JSON: ${String(err).slice(0, 120)}`],
          });
          continue;
        }
        const shape = checkRailShape(parsed);
        if (shape.length > 0) {
          entries.push({
            classSlug,
            subjectSlug: subject.slug,
            unitId: unit.id,
            file: rel,
            record: parsed as HomeRailFile,
            ready: false,
            reasons: shape,
          });
          continue;
        }
        const record = parsed as HomeRailFile;
        const reasons = railReadiness(record);
        entries.push({
          classSlug,
          subjectSlug: subject.slug,
          unitId: unit.id,
          file: rel,
          record,
          ready: reasons.length === 0,
          reasons,
        });
      }
      }
    }
  }
  return entries;
}

/**
 * A ready corpus entry as rail slide data. The icon stays a NAME here — the
 * server wrapper resolves it through HOME_RAIL_ICONS (Lucide components can
 * never cross into JSON or be picked by agents).
 */
export function toRailSlideData(entry: HomeRailEntry): Omit<HomeSubjectSlide, "icon"> & {
  iconName: string;
} {
  const rows: SubjectSlideRow[] = entry.record.rows.map((row) => ({
    label: row.label,
    text: row.text,
    ...(row.kind === "formula" ? { kind: row.kind as "formula" } : {}),
  }));
  return {
    tag: entry.record.card.tag,
    title: entry.record.card.title,
    rows,
    href: entry.record.card.href,
    ...(entry.record.card.statKey
      ? { statKey: entry.record.card.statKey }
      : {}),
    iconName:
      entry.record.card.icon?.trim() ||
      HOME_RAIL_SUBJECT_ICONS[entry.subjectSlug] ||
      "BookOpen",
  };
}

/** Unit order for one subject's rail, straight from the syllabus. */
export function syllabusUnitOrder(
  classSlug: string,
  subjectSlug: string,
): { id: string; title: string }[] {
  const cls = SYLLABUS.find((c) => c.slug === classSlug);
  const subject = cls?.subjects.find((s) => s.slug === subjectSlug);
  return (subject?.units ?? []).map((u) => ({ id: u.id, title: u.title }));
}

export interface UnitSlideGroup {
  classSlug: string;
  subjectSlug: string;
  unitId: string;
  unitTitle: string;
  entries: HomeRailEntry[];
}

/**
 * Group ready corpus entries of one subject by unit, following syllabus order
 * (Class 11 units first, then Class 12). Units with no ready cards are
 * skipped — a rail never shows an empty divider.
 */
export function groupReadyByUnit(
  entries: HomeRailEntry[],
  subjectSlug: string,
): UnitSlideGroup[] {
  const byKey = new Map<string, HomeRailEntry[]>();
  for (const entry of entries) {
    if (!entry.ready || entry.subjectSlug !== subjectSlug) continue;
    const key = `${entry.classSlug}/${entry.unitId}`;
    byKey.set(key, [...(byKey.get(key) ?? []), entry]);
  }
  const groups: UnitSlideGroup[] = [];
  for (const classSlug of HOME_RAIL_CLASS_SLUGS) {
    for (const unit of syllabusUnitOrder(classSlug, subjectSlug)) {
      const unitEntries = byKey.get(`${classSlug}/${unit.id}`) ?? [];
      if (unitEntries.length === 0) continue;
      groups.push({
        classSlug,
        subjectSlug,
        unitId: unit.id,
        unitTitle: unit.title,
        entries: unitEntries,
      });
    }
  }
  return groups;
}
