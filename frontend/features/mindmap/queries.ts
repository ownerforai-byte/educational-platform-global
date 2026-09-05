import { loadData } from "@/lib/data-loader";
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
} from "@/lib/syllabus";
import type { MindmapDocument, MindmapItem, MindmapNode, MindmapSource } from "./types";

type ManifestItem = {
  path: string;
  data: { title?: string; notes?: string[] | string; type?: string };
};

function normalizePath(path: string): string {
  return path.replace(/\\/g, "/");
}

function nodeId(prefix: string, label: string, index: number): string {
  return `${prefix}-${index}-${label.slice(0, 24).replace(/\s+/g, "-").toLowerCase()}`;
}

/** Split a NEB topic title into mind-map branches (works for current + future topics). */
export function topicTitleToBranches(title: string): string[] {
  const cleaned = title.replace(/\s+/g, " ").trim();
  if (!cleaned) return [];

  const afterColon = cleaned.includes(":")
    ? cleaned.slice(cleaned.indexOf(":") + 1).trim()
    : cleaned;

  const listMatch = afterColon.match(
    /(?:introduction and functions of|functions of|types of|concept of|including|such as)\s+(.+)$/i,
  );
  const listPart = listMatch?.[1] ?? afterColon;

  const parts = listPart
    .split(/,| and |;|\/|·|\|/)
    .map((p) => p.replace(/^(and|of|the|a|an)\s+/i, "").trim())
    .filter((p) => p.length > 2 && p.length < 80);

  const unique = [...new Set(parts)];
  if (unique.length >= 2) return unique.slice(0, 12);

  if (cleaned.includes(":")) {
    const head = cleaned.slice(0, cleaned.indexOf(":")).trim();
    return [head, afterColon].filter(Boolean).slice(0, 8);
  }

  return [cleaned];
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
): MindmapNode {
  const branches = topicTitleToBranches(topicTitle);
  const rootLabel =
    topicTitle.includes(":")
      ? topicTitle.slice(0, topicTitle.indexOf(":")).trim()
      : topicTitle.length > 60
        ? `${topicTitle.slice(0, 57)}…`
        : topicTitle;

  return {
    id: `topic-${topicSlug}`,
    label: rootLabel || topicTitle,
    children: branches.map((label, i) => ({
      id: nodeId(topicSlug, label, i),
      label,
    })),
  };
}

export function buildSyllabusUnitMindmap(unit: SyllabusUnit): MindmapNode {
  const entries = getUnitTopicEntries(unit);
  return {
    id: `unit-${unit.id}`,
    label: unit.title,
    children: entries.map((t) => ({
      id: `unit-topic-${t.slug}`,
      label: t.title.length > 72 ? `${t.title.slice(0, 69)}…` : t.title,
      children: topicTitleToBranches(t.title)
        .slice(0, 6)
        .map((label, i) => ({
          id: nodeId(t.slug, label, i),
          label,
        })),
    })),
  };
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

type ImportedMindmap = {
  path: string;
  title: string;
  subject: string;
  unitId?: string;
  root: MindmapNode;
};

function buildImportedMindmaps(): Promise<ImportedMindmap[]> {
  return (async () => {
    let manifest: ManifestItem[] = [];
    try {
      manifest = await loadData<ManifestItem[]>("ravikishan/manifest.json");
    } catch {
      // NEXT_PUBLIC_SITE_URL may be missing in production; fall back to no imported maps
    }
    const out: ImportedMindmap[] = [];

    for (const item of manifest) {
      const path = normalizePath(item.path);
      if (!path.toLowerCase().includes("/mindmap/")) continue;
      const parts = path.split("/");
      const subject = parts[1] ?? "unknown";
      const unitPath = parts[2];
      const title = item.data?.title ?? parts[parts.length - 1]?.replace(/\.json$/, "") ?? path;
      const notes = Array.isArray(item.data?.notes)
        ? item.data.notes
        : typeof item.data?.notes === "string"
          ? [item.data.notes]
          : [];

      out.push({
        path,
        title,
        subject,
        unitId: unitPath ? mapRavUnitToSyllabus(subject, unitPath) : undefined,
        root: buildTreeFromOutlineNotes(title, notes),
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
  subjectSlug: string,
  unitId: string,
): Promise<ImportedMindmap | undefined> {
  const maps = await getImportedMindmaps();
  return maps.find(
    (m) => m.subject === subjectSlug && m.unitId === unitId,
  );
}

async function findImportedForTopic(
  subjectSlug: string,
  unitId: string,
  topicTitle: string,
): Promise<ImportedMindmap | undefined> {
  const maps = await getImportedMindmaps();
  const norm = topicTitle.toLowerCase();
  return maps.find((m) => {
    if (m.subject !== subjectSlug) return false;
    if (m.unitId && m.unitId !== unitId) return false;
    const t = m.title.toLowerCase();
    return norm.includes(t.slice(0, 18)) || t.includes(norm.slice(0, 18));
  });
}

export async function getTopicMindmap(args: {
  classSlug: string;
  subjectSlug: string;
  unitId: string;
  topicSlug: string;
  topicTitle: string;
}): Promise<MindmapDocument> {
  const imported = await findImportedForTopic(
    args.subjectSlug,
    args.unitId,
    args.topicTitle,
  );
  const source: MindmapSource = imported ? "imported" : "syllabus";
  const root = imported
    ? imported.root
    : buildSyllabusTopicMindmap(args.topicTitle, args.topicSlug);

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
  const imported = await findImportedForUnit(args.subjectSlug, args.unit.id);
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
