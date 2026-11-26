import { Router, Request } from "express";
import { readFile } from "fs/promises";
import {
  CONTENT_CACHE_TTL_MS,
  CONTENT_CDN_CACHE_CONTROL,
  contentCache,
} from "../../lib/cache.js";
import { resolveDataPath } from "../../utils/paths";
import { serverError } from "../../middleware/error-handler";
import { mobileNotesResponseSchema } from "../contracts/public-schemas.js";
import { cursorPage, parseCursorPagination } from "./pagination.js";

/**
 * GET /api/mobile/notes?subject=&chapter=&limit=&cursor= — the r-notes
 * catalog for the native note reader, cursor-paginated with the shared
 * /api/mobile convention (see ./pagination.ts).
 *
 * REUSE: reads the same manifest file the website /api/r-notes route serves
 * (content/resources/exports/manifest.json) through the same shared content
 * cache. The mobile route adds pagination and compact rows instead of the
 * website's whole-catalog payload.
 *
 * Pagination anchor: the next index into the (deterministic) filtered list.
 * The manifest is static between deploys, so an index anchor is stable. The
 * cursor itself stays opaque to clients (base64url {anchor}).
 *
 * ADDITIVE: /api/r-notes is unchanged.
 */
const router = Router();

interface RExportManifestItem {
  subject: string;
  chapter: string;
  id: string;
  title: string;
  notes: string[];
}

async function loadManifest(): Promise<RExportManifestItem[]> {
  return contentCache.getOrLoad("mobile-notes:manifest", CONTENT_CACHE_TTL_MS, async () => {
    const manifestPath = resolveDataPath("resources", "exports", "manifest.json");
    const content = await readFile(manifestPath, "utf-8");
    return JSON.parse(content) as RExportManifestItem[];
  });
}

router.get("/", async (req: Request, res) => {
  try {
    const manifest = await loadManifest();

    const subject = typeof req.query.subject === "string" ? req.query.subject : undefined;
    const chapter = typeof req.query.chapter === "string" ? req.query.chapter : undefined;

    let filtered = manifest;
    if (subject) filtered = filtered.filter((item) => item.subject === subject);
    if (chapter) filtered = filtered.filter((item) => item.chapter === chapter);

    const { limit, cursor } = parseCursorPagination(req);
    const start = cursor ? Number(cursor.anchor) || 0 : 0;
    const end = Math.min(start + limit, filtered.length);

    const items = filtered.slice(start, end).map((item) => ({
      id: item.id,
      subject: item.subject,
      chapter: item.chapter,
      title: item.title,
      noteCount: Array.isArray(item.notes) ? item.notes.length : 0,
    }));

    const nextAnchor = end < filtered.length ? String(end) : null;

    res.setHeader("Cache-Control", CONTENT_CDN_CACHE_CONTROL);
    const body = { ok: true as const, data: cursorPage(items, nextAnchor) };
    mobileNotesResponseSchema.parse(body);
    return res.json(body);
  } catch (err) {
    return serverError(res, err);
  }
});

export default router;
