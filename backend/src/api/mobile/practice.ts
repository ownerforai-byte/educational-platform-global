import { Router, Request } from "express";
import { readFile, readdir } from "fs/promises";
import path from "path";
import { resolveDataPath } from "../../utils/paths";
import { serverError } from "../../middleware/error-handler";
import { mobilePracticeResponseSchema } from "../contracts/public-schemas.js";
import { cursorPage, parseCursorPagination } from "./pagination.js";

/**
 * GET /api/mobile/practice?limit=&cursor= — the exam/practice catalog for the
 * native practice screen, cursor-paginated with the shared /api/mobile
 * convention (see ./pagination.ts).
 *
 * REUSE: reads the same `content/practice/exams/*.json` files the website
 * /api/tests route serves. Tier-gated past papers (PYQs) stay on the existing
 * /api/pyqs route with their requireAuth + requireTier("plus") gates — the
 * mobile client calls that route directly; nothing is re-gated or weakened
 * here.
 *
 * The catalog is a static file list, so the pagination anchor is the next
 * index into the slug-sorted (deterministic) catalog. The cursor stays
 * opaque to clients.
 *
 * ADDITIVE: no existing route changes.
 */
const router = Router();

function examsDir(): string {
  return resolveDataPath("practice", "exams");
}

interface ExamEntry {
  slug: string;
  title: string;
  durationMin: number;
  questionCount: number;
}

async function loadCatalog(): Promise<ExamEntry[]> {
  const dir = examsDir();
  const entries = await readdir(dir);
  const files = entries.filter((f) => f.endsWith(".json") && f !== "manifest.json");
  const exams = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.json$/, "");
      const content = await readFile(path.join(dir, file), "utf-8");
      const data = JSON.parse(content) as {
        slug?: string;
        title?: string;
        durationMin?: number;
        questions?: unknown[];
      };
      return {
        slug,
        title: data.title ?? slug,
        durationMin: Number(data.durationMin) || 0,
        questionCount: Array.isArray(data.questions) ? data.questions.length : 0,
      };
    }),
  );
  return exams.sort((a, b) => a.slug.localeCompare(b.slug));
}

router.get("/", async (req: Request, res) => {
  try {
    const catalog = await loadCatalog();

    const { limit, cursor } = parseCursorPagination(req);
    const start = cursor ? Number(cursor.anchor) || 0 : 0;
    const end = Math.min(start + limit, catalog.length);

    const items = catalog.slice(start, end);
    const nextAnchor = end < catalog.length ? String(end) : null;

    res.setHeader("Cache-Control", "public, max-age=60, s-maxage=300");
    const body = { ok: true as const, data: cursorPage(items, nextAnchor) };
    mobilePracticeResponseSchema.parse(body);
    return res.json(body);
  } catch (err) {
    return serverError(res, err);
  }
});

export default router;
