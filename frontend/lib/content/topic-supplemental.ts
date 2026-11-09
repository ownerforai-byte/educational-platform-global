import {
  classDirOfTrack,
  normalizeClassDir,
  parseContentPath,
  type ContentKind,
} from "@/lib/content/paths";
import { loadData } from "@/lib/data-loader";
import { resolveUnitSlug } from "@/lib/syllabus-notes-manifest";

/**
 * Content families that supplement the canonical concept note on a topic page.
 *
 * `concepts` and `mindmap` already have dedicated readers (topic notes and the
 * mind-map panel), `plans`/`rails` are authoring/home-rail data, `exams` are
 * whole papers and `lessons`/`documents` are not topic-addressed — none of them
 * belongs in this selector. `theory` blocks are subject-level and are rendered
 * by the subject "Theory & PYQs" page, so including them here would duplicate
 * that page on every unit.
 */
const RENDERABLE_KINDS = new Set<ContentKind>([
  "guides",
  "formula",
  "sets",
  "examples",
  "pyqs",
  "graph",
]);

/** Order families appear on the page (guides first, reference last). */
export const SUPPLEMENTAL_KIND_ORDER: ContentKind[] = [
  "guides",
  "examples",
  "sets",
  "pyqs",
  "formula",
  "graph",
];

export type TopicContentTarget = { slug: string; title: string };

export type SupplementalEntry = {
  path: string;
  kind: ContentKind;
  title: string;
  /** The exact syllabus topic this file names, when it names one. */
  topicSlug?: string;
  data: Record<string, unknown>;
};

export type ContentLocation = {
  classSlug: string;
  subjectSlug: string;
  unitSlug: string;
  topics: TopicContentTarget[];
};

type ManifestItem = { path?: unknown; data?: unknown };

let manifestPromise: Promise<ManifestItem[]> | undefined;

function getManifest(): Promise<ManifestItem[]> {
  // A missing public manifest must not break a topic page: it simply means no
  // supplemental material, which is exactly what an empty selection renders.
  manifestPromise ??= loadData<ManifestItem[]>("content/manifest.json").catch(() => []);
  return manifestPromise;
}

const normalizeText = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "");

/** Strings from an unknown JSON field, dropping blanks. */
function strings(value: unknown): string[] {
  const list = Array.isArray(value) ? value : typeof value === "string" ? [value] : [];
  return list.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
}

/**
 * A manifest entry is only worth rendering when it carries learner-facing text.
 * Measured: 38 subject-level `practice/questions/…/neb-YYYY.json` entries hold a
 * title and nothing else — their bodies live in the private index — so they are
 * skipped instead of rendering as empty cards.
 */
export function hasRenderableBody(data: Record<string, unknown>): boolean {
  return (
    strings(data.notes).length > 0 ||
    strings(data.formulas).length > 0 ||
    strings(data.keyPoints).length > 0 ||
    strings(data.practiceQuestions).length > 0 ||
    strings(data.confusion).length > 0 ||
    strings(data.summary).length > 0 ||
    strings(data.detail).length > 0
  );
}

/**
 * Resolve the unit an entry belongs to: the file's own `unitSlug`, else the unit
 * directory in its classified path. Aliased folders (`work-energy-power`) and
 * short legacy folder names (`grammar` → `language-and-grammar`) are folded onto
 * the canonical syllabus unit.
 */
function matchesUnit(declaredUnit: string, unitSlug: string): boolean {
  const candidate = resolveUnitSlug(declaredUnit);
  if (!candidate) return false;
  if (candidate === unitSlug) return true;
  // One is a longer form of the other ("grammar" / "language-and-grammar").
  // Both must be substantial so a stub folder name cannot match by chance.
  if (candidate.length < 4 || unitSlug.length < 4) return false;
  return unitSlug.includes(candidate) || candidate.includes(unitSlug);
}

/** The topic this entry names, if any (slug first, then title). */
function topicForEntry(
  data: Record<string, unknown>,
  topics: TopicContentTarget[],
): TopicContentTarget | undefined {
  const dataSlug = typeof data.topicSlug === "string" ? data.topicSlug : "";
  if (dataSlug) {
    const bySlug = topics.find((topic) => topic.slug === dataSlug);
    if (bySlug) return bySlug;
  }
  const dataTitle = typeof data.topicTitle === "string" ? data.topicTitle : "";
  if (!dataTitle) return undefined;
  const wanted = normalizeText(dataTitle);
  return topics.find((topic) => normalizeText(topic.title) === wanted);
}

/**
 * Classify every renderable manifest entry for one unit.
 *
 * Entries that name a syllabus topic carry its slug; the rest are unit-level
 * material and must not be pinned to an arbitrary topic — a practice set called
 * "evaluate-determinants" is not the algebra topic, and attaching it to one
 * would hide it from every other topic in the unit.
 */
export function selectSupplementalContent(
  manifest: ManifestItem[],
  location: ContentLocation,
): SupplementalEntry[] {
  const classDir = normalizeClassDir(classDirOfTrack(location.classSlug));
  const unitSlug = resolveUnitSlug(location.unitSlug);
  const entries: SupplementalEntry[] = [];

  for (const item of manifest) {
    if (typeof item.path !== "string" || !item.data || typeof item.data !== "object") continue;
    const parsed = parseContentPath(item.path);
    if (!parsed || !RENDERABLE_KINDS.has(parsed.kind)) continue;
    if (parsed.classDir !== classDir || parsed.subjectSlug !== location.subjectSlug) continue;

    const data = item.data as Record<string, unknown>;
    const declaredUnit =
      typeof data.unitSlug === "string" && data.unitSlug ? data.unitSlug : (parsed.unitSlug ?? "");
    if (!matchesUnit(declaredUnit, unitSlug)) continue;
    if (!hasRenderableBody(data)) continue;

    const topic = topicForEntry(data, location.topics);
    entries.push({
      path: item.path,
      kind: parsed.kind,
      title:
        typeof data.title === "string" && data.title.trim() ? data.title.trim() : location.unitSlug,
      ...(topic ? { topicSlug: topic.slug } : {}),
      data,
    });
  }

  return entries.sort((a, b) => {
    const byKind =
      SUPPLEMENTAL_KIND_ORDER.indexOf(a.kind) - SUPPLEMENTAL_KIND_ORDER.indexOf(b.kind);
    return byKind !== 0 ? byKind : a.path.localeCompare(b.path);
  });
}

/** Entries that name this exact syllabus topic. */
export async function getTopicSupplementalContent(
  location: ContentLocation & { topicSlug: string },
): Promise<SupplementalEntry[]> {
  const entries = selectSupplementalContent(await getManifest(), location);
  return entries.filter((entry) => entry.topicSlug === location.topicSlug);
}

/** Entries for this unit that cannot be pinned to a single topic. */
export async function getUnitSupplementalContent(
  location: ContentLocation,
): Promise<SupplementalEntry[]> {
  const entries = selectSupplementalContent(await getManifest(), location);
  return entries.filter((entry) => entry.topicSlug === undefined);
}
