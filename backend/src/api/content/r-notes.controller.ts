import { Router, Request, Response } from "express";
import { readFile } from "fs/promises";
import { resolveDataPath } from "../../utils/paths";
import {
  CONTENT_CACHE_TTL_MS,
  CONTENT_CDN_CACHE_CONTROL,
  contentCache,
} from "../../lib/cache.js";
import { sendError, sendSuccess } from "../../lib/response.js";

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
  return contentCache.getOrLoad("r-notes:manifest", CONTENT_CACHE_TTL_MS, async () => {
    const manifestPath = resolveDataPath("resources", "exports", "manifest.json");
    const content = await readFile(manifestPath, "utf-8");
    return JSON.parse(content) as RExportManifestItem[];
  });
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

    res.setHeader("Cache-Control", CONTENT_CDN_CACHE_CONTROL);
    sendSuccess(res, { subjects, chapters, notes });
  } catch (err) {
    console.error("Failed to load r-notes manifest:", err);
    sendError(res, "Could not load r-notes", 500);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const manifest = await loadManifest();
    const item = manifest.find((m) => m.id === id);
    if (!item) {
      sendError(res, "Note not found", 404);
      return;
    }
    res.setHeader("Cache-Control", CONTENT_CDN_CACHE_CONTROL);
    sendSuccess(res, item);
  } catch (err) {
    console.error("Failed to load note:", err);
    sendError(res, "Could not load note", 500);
  }
});

export default router;
