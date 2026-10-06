import { SYLLABUS, getUnitTopicEntries } from "@/lib/syllabus";
import type { JourneyRow, ProgressEntry, ProgressStatus } from "@/types/api";

/**
 * Journey catalogue for "My Progress".
 *
 * The API only knows which topics a student has *touched* (`GET /api/progress`
 * returns one row per touched topic, keyed by the syllabus path). The full
 * catalogue of topics they *could* touch lives in `frontend/lib/syllabus.ts`
 * — the single source of truth for curriculum order — so the merge belongs
 * here, on the frontend.
 *
 * Origin of the 2026-10-04 fix: the old endpoint returned only rows that
 * already existed while the only writer in the app was the panel's own toggle
 * (which can only toggle existing rows). A fresh student therefore got an
 * empty page forever. With this merge every syllabus topic is always listed —
 * `not_started` until the student opens it, then `in_progress`, then
 * `completed` — and the panel can start tracking from the very first visit.
 */

/** One topic located in the syllabus tree. */
export interface TopicPath {
  classSlug: string;
  subjectSlug: string;
  unitSlug: string;
  topicSlug: string;
}

/** Stable journey id for a topic: its syllabus path. */
export function topicPathId(path: TopicPath): string {
  return `${path.classSlug}/${path.subjectSlug}/${path.unitSlug}/${path.topicSlug}`;
}

/** Inverse of {@link topicPathId}; `null` for anything that is not a path. */
export function parseTopicPathId(id: string): TopicPath | null {
  const parts = id.split("/");
  if (parts.length !== 4 || parts.some((p) => p.trim() === "")) return null;
  const [classSlug, subjectSlug, unitSlug, topicSlug] = parts;
  return { classSlug, subjectSlug, unitSlug, topicSlug };
}

/** Server status (`started`/`completed`) → display status. */
export function toProgressStatus(status: JourneyRow["status"]): ProgressStatus {
  return status === "completed" ? "completed" : "in_progress";
}

/** `equations-of-motion` → `Equations Of Motion` (fallback labels only). */
function titleize(slug: string): string {
  return slug
    .split(/[-_]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

interface EntryLabels {
  title: string;
  unitTitle: string;
  subjectName: string;
  className: string;
}

/**
 * Resolve display labels for a syllabus path from `SYLLABUS`; `null` when the
 * path is not (or no longer) part of the syllabus.
 */
function labelsForPath(path: TopicPath): EntryLabels | null {
  for (const cls of SYLLABUS) {
    if (cls.slug !== path.classSlug) continue;
    for (const subject of cls.subjects) {
      if (subject.slug !== path.subjectSlug) continue;
      for (const unit of subject.units) {
        if (unit.id !== path.unitSlug) continue;
        const topic = getUnitTopicEntries(unit).find((t) => t.slug === path.topicSlug);
        if (!topic) return null;
        return {
          title: topic.title,
          unitTitle: unit.title,
          subjectName: subject.name,
          className: cls.name,
        };
      }
    }
  }
  return null;
}

function fallbackLabels(path: TopicPath): EntryLabels {
  return {
    title: titleize(path.topicSlug),
    unitTitle: titleize(path.unitSlug),
    subjectName: titleize(path.subjectSlug),
    className: titleize(path.classSlug),
  };
}

/**
 * Single tracked row → catalogue entry. Used right after a POST so a caller
 * gets the same shape the merged catalogue produces without rebuilding it.
 */
export function journeyRowToEntry(row: JourneyRow): ProgressEntry {
  const path: TopicPath = {
    classSlug: row.classSlug,
    subjectSlug: row.subjectSlug,
    unitSlug: row.unitSlug,
    topicSlug: row.topicSlug,
  };
  return buildEntry(path, row, labelsForPath(path) ?? fallbackLabels(path));
}

function buildEntry(
  path: TopicPath,
  row: JourneyRow | undefined,
  label: { title: string; unitTitle: string; subjectName: string; className: string },
): ProgressEntry {
  const status: ProgressStatus = row ? toProgressStatus(row.status) : "not_started";
  const id = topicPathId(path);

  return {
    id: row?.id ?? `new:${id}`,
    topicId: id,
    status,
    completed: status === "completed",
    completedAt: row?.completedAt ?? null,
    updatedAt: row?.updatedAt ?? "",
    startedAt: row?.startedAt ?? null,
    lastViewedAt: row?.lastViewedAt ?? null,
    viewCount: row?.viewCount ?? 0,
    classSlug: path.classSlug,
    subjectSlug: path.subjectSlug,
    unitSlug: path.unitSlug,
    topicSlug: path.topicSlug,
    topic: {
      slug: path.topicSlug,
      title: label.title,
      chapter: {
        slug: path.unitSlug,
        title: label.unitTitle,
        subject: {
          slug: path.subjectSlug,
          name: label.subjectName,
          class: { slug: path.classSlug, name: label.className },
        },
      },
    },
  };
}

/**
 * Merge tracked journey rows into the official syllabus catalogue.
 *
 * - Every syllabus topic appears, tracked or not.
 * - Rows whose path no longer exists in the syllabus (renamed unit, removed
 *   topic) are appended rather than dropped, so nobody's recorded work ever
 *   disappears from their own progress page.
 * - Order follows the syllabus (class → subject → unit → topic), which is the
 *   order a student actually studies in.
 */
export function buildProgressCatalog(rows: JourneyRow[]): ProgressEntry[] {
  const tracked = new Map<string, JourneyRow>();
  for (const row of rows) {
    const id = topicPathId({
      classSlug: row.classSlug,
      subjectSlug: row.subjectSlug,
      unitSlug: row.unitSlug,
      topicSlug: row.topicSlug,
    });
    if (!tracked.has(id)) tracked.set(id, row);
  }

  const entries: ProgressEntry[] = [];
  const matched = new Set<string>();

  for (const cls of SYLLABUS) {
    for (const subject of cls.subjects) {
      for (const unit of subject.units) {
        for (const topic of getUnitTopicEntries(unit)) {
          const path: TopicPath = {
            classSlug: cls.slug,
            subjectSlug: subject.slug,
            unitSlug: unit.id,
            topicSlug: topic.slug,
          };
          const id = topicPathId(path);
          matched.add(id);
          entries.push(
            buildEntry(path, tracked.get(id), {
              title: topic.title,
              unitTitle: unit.title,
              subjectName: subject.name,
              className: cls.name,
            }),
          );
        }
      }
    }
  }

  for (const [id, row] of tracked) {
    if (matched.has(id)) continue;
    entries.push(
      buildEntry(
        { classSlug: row.classSlug, subjectSlug: row.subjectSlug, unitSlug: row.unitSlug, topicSlug: row.topicSlug },
        row,
        {
          title: titleize(row.topicSlug),
          unitTitle: titleize(row.unitSlug),
          subjectName: titleize(row.subjectSlug),
          className: titleize(row.classSlug),
        },
      ),
    );
  }

  return entries;
}

/**
 * Effective status of an entry.
 *
 * Entries built by {@link buildProgressCatalog} always carry a status; legacy
 * rows (older API payloads, tests fixtures) do not, and for those an existing
 * row means the topic was tracked — so it counts as in progress rather than
 * never touched.
 */
export function entryStatus(entry: ProgressEntry): ProgressStatus {
  if (entry.completed || entry.status === "completed") return "completed";
  if (entry.status === "in_progress") return "in_progress";
  if (entry.status === undefined && !entry.id.startsWith("new:")) return "in_progress";
  return "not_started";
}

/**
 * Canonical URL of a syllabus topic.
 *
 * The journey records `unit.id`, which is exactly what the chapter routes use
 * (`/${classSlug}/${subjectSlug}/chapters/${unit}/topics/${topic}`) — the same
 * string the topic page builds for its own links — so a tracked row resolves
 * straight back to the page that produced it. Anything that is not a
 * class-11/12 notes topic falls back to the progress page: a link one level up
 * beats a link that 404s on the front page.
 */
export function topicHref(entry: ProgressEntry): string {
  const { classSlug, subjectSlug, unitSlug, topicSlug } = entry;
  if (!classSlug || !subjectSlug || !unitSlug || !topicSlug) return "/progress";
  if (classSlug !== "class-11-notes" && classSlug !== "class-12-notes") {
    return "/progress";
  }
  return `/${classSlug}/${subjectSlug}/chapters/${unitSlug}/topics/${topicSlug}`;
}

export interface JourneySummary {
  /** Topics in the catalogue (tracked + untracked). */
  total: number;
  completed: number;
  inProgress: number;
  notStarted: number;
  /** Completed share of the whole catalogue, 0–100. */
  percent: number;
}

export function summarizeJourney(entries: ProgressEntry[]): JourneySummary {
  let completed = 0;
  let inProgress = 0;

  for (const entry of entries) {
    const status = entryStatus(entry);
    if (status === "completed") completed += 1;
    else if (status === "in_progress") inProgress += 1;
  }

  const total = entries.length;
  return {
    total,
    completed,
    inProgress,
    notStarted: total - completed - inProgress,
    percent: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
}

export interface JourneyGroup {
  key: string;
  classSlug: string;
  className: string;
  subjectSlug: string;
  subjectName: string;
  entries: ProgressEntry[];
  completed: number;
  inProgress: number;
  total: number;
}

/**
 * Bucket entries by class + subject, preserving catalogue order (both the
 * groups and the entries inside them).
 */
export function groupJourney(entries: ProgressEntry[]): JourneyGroup[] {
  const groups: JourneyGroup[] = [];
  const index = new Map<string, JourneyGroup>();

  for (const entry of entries) {
    const classSlug = entry.classSlug ?? "syllabus";
    const subjectSlug = entry.subjectSlug ?? "general";
    const key = `${classSlug}/${subjectSlug}`;
    let group = index.get(key);
    if (!group) {
      group = {
        key,
        classSlug,
        className:
          entry.topic?.chapter?.subject?.class?.name ?? titleize(classSlug),
        subjectSlug,
        subjectName: entry.topic?.chapter?.subject?.name ?? titleize(subjectSlug),
        entries: [],
        completed: 0,
        inProgress: 0,
        total: 0,
      };
      index.set(key, group);
      groups.push(group);
    }

    group.entries.push(entry);
    group.total += 1;
    const status = entryStatus(entry);
    if (status === "completed") group.completed += 1;
    else if (status === "in_progress") group.inProgress += 1;
  }

  return groups;
}
