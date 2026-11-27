import { Router, Request, Response } from "express";
import { readFile } from "fs/promises";
import { resolveDataPath } from "../../utils/paths";
import { serverError } from "../../middleware/error-handler";
import { requireAuth, requireTier } from "../../middleware/auth";
import {
  mobileFormulaFileResponseSchema,
  mobileFormulasResponseSchema,
} from "../contracts/public-schemas.js";
import { cursorPage, parseCursorPagination } from "./pagination.js";
import { coordsOf, loadContentManifest, notesOf, safeContentPath, titleOf } from "./manifest.js";

/**
 * GET /api/mobile/formulas?class=&subject=&unit=&limit=&cursor= — the formula
 * sheet catalog for the native formula reader (parity plan §2, batch P1).
 *
 * REUSE: reads the same generated content manifest the website's formula
 * sheets build from (frontend/features/formulas/) — `formulas/**` entries,
 * one sheet per syllabus unit, each carrying its formula lines.
 *
 * ACCESS: the website registers /formulas at minLevel "plus"
 * (frontend/lib/core/navigation.ts) — mirrored here with requireAuth +
 * requireTier("plus"). Auth-gated → never set public CDN Cache-Control.
 *
 * Detail: GET /api/mobile/formulas/file?path=formulas/… returns one sheet's
 * formula lines, path-validated to the formulas section.
 *
 * ADDITIVE: no existing route changes.
 */
const PREFIX = "formulas/";

const router = Router();

interface FormulaRow {
  id: string;
  class: string;
  subject: string;
  unit: string;
  title: string;
  formulaCount: number;
}

async function loadCatalog(): Promise<FormulaRow[]> {
  const manifest = await loadContentManifest();
  const rows: FormulaRow[] = [];
  for (const entry of manifest) {
    const coords = coordsOf(entry.path, PREFIX);
    if (!coords || !coords.unit) continue;
    rows.push({
      id: entry.path,
      class: coords.classDir,
      subject: coords.subject,
      unit: coords.unit,
      title: titleOf(entry),
      formulaCount: notesOf(entry).length,
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
    const unit = typeof req.query.unit === "string" ? req.query.unit : undefined;

    let filtered = rows;
    if (classDir) filtered = filtered.filter((r) => r.class === classDir);
    if (subject) filtered = filtered.filter((r) => r.subject === subject);
    if (unit) filtered = filtered.filter((r) => r.unit === unit);

    const { limit, cursor } = parseCursorPagination(req);
    const start = cursor ? Number(cursor.anchor) || 0 : 0;
    const end = Math.min(start + limit, filtered.length);
    const nextAnchor = end < filtered.length ? String(end) : null;

    res.setHeader("Cache-Control", "private, no-store");
    const body = {
      ok: true as const,
      data: cursorPage(filtered.slice(start, end), nextAnchor),
    };
    mobileFormulasResponseSchema.parse(body);
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
      res.status(400).json({ ok: false, error: { code: "BAD_PATH", message: "path must stay under formulas/" } });
      return;
    }
    const raw = await readFile(resolveDataPath(...segments), "utf-8");
    const parsed = JSON.parse(raw) as { title?: unknown; notes?: unknown };
    const formulas = Array.isArray(parsed.notes)
      ? parsed.notes.filter((n): n is string => typeof n === "string")
      : [];
    res.setHeader("Cache-Control", "private, no-store");
    const body = {
      ok: true as const,
      data: {
        path: segments.join("/"),
        title: typeof parsed.title === "string" ? parsed.title : "",
        formulas,
      },
    };
    mobileFormulaFileResponseSchema.parse(body);
    res.json(body);
  } catch (err: unknown) {
    console.error(err);
    serverError(res, err);
  }
});

export default router;
