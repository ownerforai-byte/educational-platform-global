import { Router, Request, Response } from "express";
import { readFile } from "fs/promises";
import { resolveDataPath } from "../../utils/paths";
import { serverError } from "../../middleware/error-handler";
import { requireAuth, requireTier } from "../../middleware/auth";
import {
  mobilePyqFileResponseSchema,
  mobilePyqsResponseSchema,
} from "../contracts/public-schemas.js";
import { cursorPage, parseCursorPagination } from "./pagination.js";
import { coordsOf, loadContentManifest, notesOf, safeContentPath, titleOf, yearOfFile } from "./manifest.js";

/**
 * GET /api/mobile/pyqs?class=&subject=&year=&limit=&cursor= — the Past Year
 * Questions catalog for the native PYQ browser (parity plan §2, batch P1).
 *
 * REUSE: reads the same generated content manifest the website's PYQ bank
 * (frontend/features/pyqs/pyq-bank.ts) consumes — `practice/questions/**`
 * entries with their question lines. No new corpus, no duplicated payload.
 *
 * ACCESS: the website registers /pyqs at minLevel "plus"
 * (frontend/lib/core/navigation.ts) — the mobile route mirrors that gate with
 * requireAuth + requireTier("plus"), the same pair /api/practice/pyqs uses.
 * Auth-gated → never set public CDN Cache-Control.
 *
 * Detail: GET /api/mobile/pyqs/file?path=practice/questions/… returns one
 * entry's question lines, path-validated to the PYQ section.
 *
 * Pagination anchor: the next index into the path-sorted (deterministic)
 * catalog; the manifest is static between deploys so the anchor is stable.
 *
 * ADDITIVE: no existing route changes.
 */
const PREFIX = "practice/questions/";

const router = Router();

interface PyqRow {
  id: string;
  class: string;
  subject: string;
  unit: string | null;
  year: number | null;
  title: string;
  questionCount: number;
}

async function loadCatalog(): Promise<PyqRow[]> {
  const manifest = await loadContentManifest();
  const rows: PyqRow[] = [];
  for (const entry of manifest) {
    const coords = coordsOf(entry.path, PREFIX);
    if (!coords) continue;
    rows.push({
      id: entry.path,
      class: coords.classDir,
      subject: coords.subject,
      unit: coords.unit,
      year: yearOfFile(coords.file),
      title: titleOf(entry),
      questionCount: notesOf(entry).length,
    });
  }
  rows.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  return rows;
}

router.get("/", requireAuth, requireTier("plus"), async (req: Request, res: Response) => {
  try {
    const rows = await loadCatalog();

    const classDir = typeof req.query.class === "string" ? req.query.class : undefined;
    const subject = typeof req.query.subject === "string" ? req.query.subject : undefined;
    const year = typeof req.query.year === "string" ? Number(req.query.year) : undefined;

    let filtered = rows;
    if (classDir) filtered = filtered.filter((r) => r.class === classDir);
    if (subject) filtered = filtered.filter((r) => r.subject === subject);
    if (year !== undefined && Number.isFinite(year)) {
      filtered = filtered.filter((r) => r.year === year);
    }

    const { limit, cursor } = parseCursorPagination(req);
    const start = cursor ? Number(cursor.anchor) || 0 : 0;
    const end = Math.min(start + limit, filtered.length);
    const nextAnchor = end < filtered.length ? String(end) : null;

    res.setHeader("Cache-Control", "private, no-store");
    const body = {
      ok: true as const,
      data: cursorPage(filtered.slice(start, end), nextAnchor),
    };
    mobilePyqsResponseSchema.parse(body);
    res.json(body);
  } catch (err: unknown) {
    console.error(err);
    serverError(res, err);
  }
});

router.get("/file", requireAuth, requireTier("plus"), async (req: Request, res: Response) => {
  try {
    const segments = safeContentPath(typeof req.query.path === "string" ? req.query.path : "", PREFIX);
    if (!segments) {
      res.status(400).json({ ok: false, error: { code: "BAD_PATH", message: "path must stay under practice/questions/" } });
      return;
    }
    const raw = await readFile(resolveDataPath(...segments), "utf-8");
    // Real PYQ files carry a structured `questions` array ({ question, marks,
    // solution }) — the same exam bank the website's pyq-bank reads from
    // content/_index.json. The generated manifest additionally mirrors those
    // lines as plain `notes`. Read the structured questions first and fall
    // back to the legacy notes lines so both file generations work.
    const parsed = JSON.parse(raw) as { title?: unknown; notes?: unknown; questions?: unknown };
    const questions = Array.isArray(parsed.questions)
      ? parsed.questions
          .map((q) =>
            q && typeof q === "object" && typeof (q as { question?: unknown }).question === "string"
              ? (q as { question: string }).question
              : typeof q === "string"
                ? q
                : "",
          )
          .filter((line) => line.trim().length > 0)
      : Array.isArray(parsed.notes)
        ? parsed.notes.filter((n): n is string => typeof n === "string")
        : [];
    res.setHeader("Cache-Control", "private, no-store");
    const body = {
      ok: true as const,
      data: {
        path: segments.join("/"),
        title: typeof parsed.title === "string" ? parsed.title : "",
        questions,
      },
    };
    mobilePyqFileResponseSchema.parse(body);
    res.json(body);
  } catch (err: unknown) {
    console.error(err);
    serverError(res, err);
  }
});

export default router;
