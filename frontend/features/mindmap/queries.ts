import { loadData } from "@/lib/data-loader";
import { normalizeClassDir, parseContentPath } from "@/lib/content/paths";
import { resolveUnitSlug } from "@/lib/syllabus-notes-manifest";
/**
 * Mind-map system: every syllabus unit/topic resolves a map via getUnitMindmap /
 * getTopicMindmap. Priority: imported content → auto-generated from syllabus.
 * Topic pages must embed MindmapInterface so current and future topics always show a map.
 */
import {
  getSubjectSyllabus,
  getUnitTopicEntries,
  type SubjectSyllabus,
  type SyllabusUnit,
} from "@/lib/core/syllabus";
import type { MindmapDocument, MindmapItem, MindmapNode, MindmapSource } from "./types";
import {
  buildTopicMindmap,
  buildUnitMindmap,
  splitTopicTitle,
  type TopicMapInput,
} from "./topic-map-builder";
export type { MindmapItem };

/** Loose content payload carried by the manifest — only the fields the map reads. */
export type TopicMapContent = NonNullable<TopicMapInput>;

type ManifestItem = {
  path: string;
  data: {
    title?: string;
    notes?: string[] | string;
    type?: string;
    unitSlug?: string;
    topicSlug?: string;
    source?: string;
    /** Structured mindmap tree carried by the content generator (preferred over auto-gen). */
    root?: MindmapNode;
  };
};

/** A manifest `root` is usable when it has a non-empty label. */
function isValidMindmapRoot(node: unknown): node is MindmapNode {
  if (!node || typeof node !== "object") return false;
  const n = node as MindmapNode;
  return typeof n.label === "string" && n.label.length > 0;
}

function normalizePath(path: string): string {
  return path.replace(/\\/g, "/");
}

function nodeId(prefix: string, label: string, index: number): string {
  return `${prefix}-${index}-${label.slice(0, 24).replace(/\s+/g, "-").toLowerCase()}`;
}

/** Split a NEB topic title into mind-map branches (works for current + future topics). */
export function topicTitleToBranches(title: string): string[] {
  return splitTopicTitle(title);
}

export function buildTreeFromOutlineNotes(title: string, notes: string[]): MindmapNode {
  type StackItem = { depth: number; node: MindmapNode };
  const root: MindmapNode = { id: "root", label: title, children: [] };
  const stack: StackItem[] = [{ depth: -1, node: root }];
  let counter = 0;

  for (const raw of notes) {
    for (const line of raw.split("\n")) {
      const match = line.match(/^(\s*)-\s+(.*)$/);
      if (!match) continue;
      const depth = Math.floor((match[1]?.length ?? 0) / 2);
      const label = (match[2] ?? "").trim();
      if (!label) continue;
      const node: MindmapNode = { id: `n-${counter++}`, label, children: [] };
      while (stack.length > 1 && stack[stack.length - 1].depth >= depth) {
        stack.pop();
      }
      const parent = stack[stack.length - 1].node;
      parent.children = parent.children ?? [];
      parent.children.push(node);
      stack.push({ depth, node });
    }
  }

  if (!root.children?.length) {
    root.children = topicTitleToBranches(title).map((label, i) => ({
      id: nodeId("gen", label, i),
      label,
    }));
  }

  return root;
}

export function buildSyllabusTopicMindmap(
  topicTitle: string,
  topicSlug: string,
  extra?: {
    content?: TopicMapContent;
    unitTitle?: string;
    unitTopics?: string[];
  },
): MindmapNode {
  return buildTopicMindmap({
    topicTitle,
    topicSlug,
    ...extra,
  });
}

export function buildSyllabusUnitMindmap(unit: SyllabusUnit): MindmapNode {
  const entries = getUnitTopicEntries(unit);
  return buildUnitMindmap(
    unit.title,
    entries.map((t) => ({ title: t.title, slug: t.slug })),
  );
}

function mapRavUnitToSyllabus(subject: string, unit: string): string | undefined {
  const key = `${subject}/${unit}`.toLowerCase();
  const map: Record<string, string> = {
    "chemistry/unit-2-stoichiometry": "stoichiometry",
    "chemistry/unit-3-atomic-structure": "atomic-structure",
    "physics/thermodynamics": "heat-and-temperature",
    "physics/unit-2-vectors": "vectors",
    "physics/unit-11-quantity-of-heat": "quantity-of-heat",
    "physics/heat": "heat-and-temperature",
    "mathematics/analytic-geometry": "analytic-geometry",
    "mathematics/calculus": "calculus",
    "biology/botany": "floral-diversity",
  };
  return map[key];
}

function resolveMindmapUnit(subject: string, unitPath: string): string {
  const canonical = resolveUnitSlug(unitPath);
  return canonical !== unitPath
    ? canonical
    : mapRavUnitToSyllabus(subject, unitPath) ?? canonical;
}

type ImportedMindmap = {
  path: string;
  title: string;
  classDir?: string;
  subject: string;
  unitId?: string;
  topicSlug?: string;
  root: MindmapNode;
};

function buildImportedMindmaps(): Promise<ImportedMindmap[]> {
  return (async () => {
    let manifest: ManifestItem[] = [];
    try {
      manifest = await loadData<ManifestItem[]>("content/manifest.json");
    } catch {
      // NEXT_PUBLIC_SITE_URL may be missing in production; fall back to no imported maps
    }
    const out: ImportedMindmap[] = [];

    for (const item of manifest) {
      const path = normalizePath(item.path);
      // Classified mindmaps live under `visuals/mindmaps/…`; the old corpus
      // kept them in a per-unit `mindmap/` folder.
      if (!path.includes("visuals/mindmaps/") && !path.toLowerCase().includes("/mindmap/")) continue;
      const parts = path.split("/");
      const parsed = parseContentPath(path);
      const legacyMindmap = !parsed && path.toLowerCase().includes("/mindmap/");
      if (!parsed && !legacyMindmap) continue;

      const subject = parsed?.subjectSlug ?? (legacyMindmap ? parts[1] : undefined) ?? "unknown";
      const unitPath = parsed?.unitSlug ?? (legacyMindmap ? parts[2] : undefined);
      const classDir = parsed?.classDir;
      const title = item.data?.title ?? parts[parts.length - 1]?.replace(/\.json$/, "") ?? path;
      const notes = Array.isArray(item.data?.notes)
        ? item.data.notes
        : typeof item.data?.notes === "string"
          ? [item.data.notes]
          : [];

      out.push({
        path,
        title,
        classDir,
        subject,
        unitId: unitPath ? resolveMindmapUnit(subject, unitPath) : undefined,
        root: isValidMindmapRoot(item.data?.root)
          ? (item.data!.root as MindmapNode)
          : buildTreeFromOutlineNotes(title, notes),
        topicSlug: item.data?.topicSlug || undefined,
      });
    }

    return out;
  })();
}

let importedMindmapsPromise: Promise<ImportedMindmap[]> | null = null;

function getImportedMindmaps(): Promise<ImportedMindmap[]> {
  if (!importedMindmapsPromise) importedMindmapsPromise = buildImportedMindmaps();
  return importedMindmapsPromise;
}

async function findImportedForUnit(
  classSlug: string,
  subjectSlug: string,
  unitId: string,
): Promise<ImportedMindmap | undefined> {
  const maps = await getImportedMindmaps();
  const classDir = normalizeClassDir(classSlug.replace(/-notes$/, ""));
  return maps.find(
    (m) =>
      m.subject === subjectSlug &&
      m.unitId === unitId &&
      (!m.classDir || m.classDir === classDir),
  );
}

async function findImportedForTopic(
  classSlug: string,
  subjectSlug: string,
  unitId: string,
  topicTitle: string,
  topicSlug?: string,
): Promise<ImportedMindmap | undefined> {
  const maps = await getImportedMindmaps();
  const classDir = normalizeClassDir(classSlug.replace(/-notes$/, ""));
  const matchesPlace = (map: ImportedMindmap) =>
    map.subject === subjectSlug &&
    map.unitId === unitId &&
    (!map.classDir || map.classDir === classDir);

  if (topicSlug) {
    const bySlug = maps.find((map) => matchesPlace(map) && map.topicSlug === topicSlug);
    if (bySlug) return bySlug;
  }

  const norm = topicTitle.toLowerCase();
  return maps.find((map) => {
    if (!matchesPlace(map) || !map.topicSlug) return false;
    const title = map.title.toLowerCase();
    return norm.includes(title.slice(0, 18)) || title.includes(norm.slice(0, 18));
  });
}

/**
 * Content index for mind-map enrichment: the manifest already embeds every
 * topic's payload, so a map can be grounded in the real notes/formulas without
 * a second fetch. Keyed by class + subject + unit + topic slug.
 */
function contentKey(
  classDir: string,
  subjectSlug: string,
  unitSlug: string,
  topicSlug: string,
): string {
  return `${classDir}|${subjectSlug}|${unitSlug}|${topicSlug}`;
}

function buildTopicContentIndex(manifest: ManifestItem[]): Map<string, TopicMapContent> {
  const index = new Map<string, TopicMapContent>();
  for (const item of manifest) {
    const parsed = parseContentPath(item.path);
    if (!parsed) continue;
    const data = item.data as (TopicMapContent & { topicSlug?: unknown }) | undefined;
    const topicSlug = typeof data?.topicSlug === "string" ? data.topicSlug.trim() : "";
    if (!data || !topicSlug) continue;
    const classDir = normalizeClassDir(parsed.classDir ?? "");
    const subjectSlug = parsed.subjectSlug ?? "";
    const resolvedUnit = resolveUnitSlug(parsed.unitSlug ?? "");
    const keys = [
      contentKey(classDir, subjectSlug, parsed.unitSlug ?? "", topicSlug),
      contentKey(classDir, subjectSlug, resolvedUnit, topicSlug),
    ];
    for (const key of keys) {
      if (!index.has(key)) index.set(key, data);
    }
  }
  return index;
}

let topicContentIndexPromise: Promise<Map<string, TopicMapContent>> | null = null;

function getTopicContentIndex(): Promise<Map<string, TopicMapContent>> {
  if (!topicContentIndexPromise) {
    topicContentIndexPromise = (async () => {
      try {
        const manifest = await loadData<ManifestItem[]>("content/manifest.json");
        return buildTopicContentIndex(Array.isArray(manifest) ? manifest : []);
      } catch {
        return new Map<string, TopicMapContent>();
      }
    })();
  }
  return topicContentIndexPromise;
}

async function findTopicContent(args: {
  classSlug: string;
  subjectSlug: string;
  unitId: string;
  topicSlug: string;
}): Promise<TopicMapContent | undefined> {
  const index = await getTopicContentIndex();
  const classDir = normalizeClassDir(args.classSlug.replace(/-notes$/, ""));
  return (
    index.get(contentKey(classDir, args.subjectSlug, args.unitId, args.topicSlug)) ??
    index.get(contentKey(classDir, args.subjectSlug, resolveUnitSlug(args.unitId), args.topicSlug))
  );
}

/** Unit context for a topic map (unit title + sibling topics). */
async function findUnitContext(
  classSlug: string,
  subjectSlug: string,
  unitId: string,
): Promise<{ unitTitle: string; unitTopics: string[] } | undefined> {
  const subject = getSubjectSyllabus(classSlug, subjectSlug);
  const unit = subject?.units.find((u) => u.id === unitId || resolveUnitSlug(u.id) === resolveUnitSlug(unitId));
  if (!unit) return undefined;
  return {
    unitTitle: unit.title,
    unitTopics: getUnitTopicEntries(unit).map((t) => t.title),
  };
}

export async function getTopicMindmap(args: {
  classSlug: string;
  subjectSlug: string;
  unitId: string;
  topicSlug: string;
  topicTitle: string;
}): Promise<MindmapDocument> {
  const imported = await findImportedForTopic(
    args.classSlug,
    args.subjectSlug,
    args.unitId,
    args.topicTitle,
    args.topicSlug,
  );
  const source: MindmapSource = imported ? "imported" : "syllabus";

  // Imported maps keep their authored tree; everything else is built deep from
  // the topic's own content (falling back to the syllabus scope).
  const root = imported
    ? imported.root
    : buildSyllabusTopicMindmap(args.topicTitle, args.topicSlug, {
        content: await findTopicContent(args),
        ...(await findUnitContext(args.classSlug, args.subjectSlug, args.unitId)),
      });

  return {
    id: `${args.classSlug}/${args.subjectSlug}/${args.unitId}/${args.topicSlug}`,
    title: args.topicTitle,
    classSlug: args.classSlug,
    subjectSlug: args.subjectSlug,
    unitId: args.unitId,
    topicSlug: args.topicSlug,
    source,
    root,
    mediaUrl: null,
    href: `/${args.classSlug}/${args.subjectSlug}/chapters/${args.unitId}/topics/${args.topicSlug}#mindmap`,
  };
}

export async function getUnitMindmap(args: {
  classSlug: string;
  subjectSlug: string;
  unit: SyllabusUnit;
}): Promise<MindmapDocument> {
  const imported = await findImportedForUnit(args.classSlug, args.subjectSlug, args.unit.id);
  const source: MindmapSource = imported ? "imported" : "syllabus";
  const root = imported ? imported.root : buildSyllabusUnitMindmap(args.unit);

  return {
    id: `${args.classSlug}/${args.subjectSlug}/${args.unit.id}`,
    title: args.unit.title,
    classSlug: args.classSlug,
    subjectSlug: args.subjectSlug,
    unitId: args.unit.id,
    source,
    root,
    mediaUrl: null,
    href: `/${args.classSlug}/${args.subjectSlug}/chapters/${args.unit.id}#mindmap`,
  };
}

/** Subject gallery: one mind map per syllabus unit (system always has entries). */
export async function buildMindmapItems(
  subject: SubjectSyllabus | null,
  classSlug?: string,
): Promise<MindmapItem[]> {
  if (!subject) return [];
  const track = classSlug ?? "class-11-notes";
  const units = subject.units;
  const docs = await Promise.all(
    units.map((unit) =>
      getUnitMindmap({
        classSlug: track,
        subjectSlug: subject.slug,
        unit,
      }),
    ),
  );
  return docs.map((doc) => ({
    id: doc.id,
    title: doc.title,
    mediaUrl: doc.mediaUrl,
    href: doc.href,
    source: doc.source,
    root: doc.root,
  }));
}

export async function buildSubjectTopicMindmapItems(
  classSlug: string,
  subjectSlug: string,
): Promise<MindmapItem[]> {
  const subject = getSubjectSyllabus(classSlug, subjectSlug);
  if (!subject) return [];

  const entries = subject.units.flatMap((unit) =>
    getUnitTopicEntries(unit).map((topic) => ({
      unit,
      topic,
    })),
  );
  const docs = await Promise.all(
    entries.map(({ unit, topic }) =>
      getTopicMindmap({
        classSlug,
        subjectSlug,
        unitId: unit.id,
        topicSlug: topic.slug,
        topicTitle: topic.title,
      }),
    ),
  );
  return docs.map((doc, i) => ({
    id: doc.id,
    title: `${entries[i].unit.title} · ${entries[i].topic.title}`,
    mediaUrl: doc.mediaUrl,
    href: doc.href,
    source: doc.source,
    root: doc.root,
  }));
}
