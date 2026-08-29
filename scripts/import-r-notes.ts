import fs from "fs";
import path from "path";

const EXPORT_PATH = path.join(process.cwd(), "content", "r-export", "content-export.json");
const MANIFEST_PATH = path.join(process.cwd(), "content", "r-export", "manifest.json");

const raw = fs.readFileSync(EXPORT_PATH, "utf-8");
const data = JSON.parse(raw) as Record<string, Record<string, Record<string, { id?: string; title?: string; notes?: string[] | string }>>>;

const manifest: Array<{
  subject: string;
  chapter: string;
  id: string;
  title: string;
  notes: string[];
}> = [];

for (const [subject, chapters] of Object.entries(data)) {
  for (const [chapter, chapterEntries] of Object.entries(chapters)) {
    const entries = chapterEntries as Record<string, { id?: string; title?: string; notes?: string[] | string }>;
    for (const [entryId, entry] of Object.entries(entries)) {
      const notes = Array.isArray(entry.notes) ? entry.notes : typeof entry.notes === "string" ? [entry.notes] : [];

      manifest.push({
        subject,
        chapter,
        id: entry.id ?? entryId,
        title: entry.title ?? entryId,
        notes,
      });
    }
  }
}

fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf-8");
console.log(`R export manifest written: ${manifest.length} entries -> ${MANIFEST_PATH}`);
