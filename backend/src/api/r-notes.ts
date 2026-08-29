import { Router, Request, Response } from "express";
import { readFile } from "fs/promises";
import path from "path";

const router = Router();

type RExportManifestItem = {
  subject: string;
  chapter: string;
  id: string;
  title: string;
  notes: string[];
};

type RNoteEntry = {
  id: string;
  chapter: string;
  subject: string;
  title: string;
  noteCount: number;
};

async function loadManifest(): Promise<RExportManifestItem[]> {
  // public/data lives at the workspace root (sibling of backend/)
  const manifestPath = path.join(
    process.cwd(),
    "..",
    "public",
    "data",
    "r-export",
    "manifest.json"
  );
  const content = await readFile(manifestPath, "utf-8");
  return JSON.parse(content) as RExportManifestItem[];
}

router.get("/", async (req: Request, res: Response) => {
  try {
    const manifest = await loadManifest();

    const subject = typeof req.query.subject === "string" ? req.query.subject : undefined;
    const chapter = typeof req.query.chapter === "string" ? req.query.chapter : undefined;

    let filtered = manifest;
    if (subject) {
      filtered = filtered.filter((item) => item.subject === subject);
    }
    if (chapter) {
      filtered = filtered.filter((item) => item.chapter === chapter);
    }

    const subjects = [...new Set(filtered.map((item) => item.subject))];
    const chapters = [...new Set(filtered.map((item) => item.chapter))];

    const notes: RNoteEntry[] = filtered.map((item) => ({
      id: item.id,
      chapter: item.chapter,
      subject: item.subject,
      title: item.title,
      noteCount: Array.isArray(item.notes) ? item.notes.length : 0,
    }));

    res.json({ subjects, chapters, notes });
  } catch (err) {
    console.error("Failed to load r-notes manifest:", err);
    res.status(500).json({ error: "Could not load r-notes" });
  }
});

export default router;
