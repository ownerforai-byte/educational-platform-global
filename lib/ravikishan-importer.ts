export type RavikishanNote = {
  path: string;
  title: string;
  notes: string[];
  type?: string;
  order?: number;
  year?: number;
  examSource?: string;
  noteType?: number;
  latex?: boolean;
  graph?: Record<string, unknown>;
  dupType: number;
  duplicateOf?: string;
};

export type ParsedRavikishanNote = {
  path: string;
  section: string;
  subject: string;
  chapter: string;
  blockType: string;
  slug: string;
  title: string;
  notes: string[];
  type: string;
  order: number;
  year: number | null;
  examSource: string | null;
  noteType: number;
  latex: boolean;
  graph: Record<string, unknown> | null;
  dupType: number;
  duplicateOf: string | null;
};

export function parseRavikishanNote(record: RavikishanNote): ParsedRavikishanNote {
  const section =
    record.path.split("/")[1] ?? "class-11";
  const subject =
    record.path.split("/")[2] ?? "general";
  const chapter =
    record.path.split("/")[3] ?? "misc";
  const blockType =
    record.path.split("/")[4] ?? "notes";

  const slug = [
    section,
    subject,
    chapter,
    blockType,
    record.path.split("/")[5]?.replace(".json", ""),
  ]
    .filter(Boolean)
    .join("--");

  return {
    path: record.path,
    section,
    subject,
    chapter,
    blockType,
    slug,
    title: record.title,
    notes: record.notes,
    type: record.type ?? inferType(blockType),
    order: record.order ?? 0,
    year: record.year ?? null,
    examSource: record.examSource ?? null,
    noteType: record.noteType ?? 1,
    latex: record.latex ?? false,
    graph: record.graph ?? null,
    dupType: record.dupType,
    duplicateOf: record.duplicateOf ?? null,
  };
}

export function inferType(blockType: string) {
  const map: Record<string, string> = {
    concepts: "concept",
    notes: "note",
    examples: "example",
    formula: "formula",
    pyqs: "pyq",
    sets: "set",
    mindmap: "mindmap",
    graph: "graph",
  };
  return map[blockType] ?? "note";
}

export async function getRavikishanManifest(): Promise<ParsedRavikishanNote[]> {
  const fs = await import("fs");
  const path = await import("path");
  const manifestPath = path.join(process.cwd(), "content", "ravikishan", "manifest.json");
  const raw = fs.readFileSync(manifestPath, "utf-8");
  const items = JSON.parse(raw) as RavikishanNote[];
  return items.map(parseRavikishanNote);
}
