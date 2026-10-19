import { Router, Request, Response } from "express";
import { serverError } from "../middleware/errors";
import { z } from "zod";
import { supabaseAdmin } from "../db/supabase";
import { requireAuth, type AuthedRequest } from "../middleware/auth";
import { requireR1Access } from "../middleware/r1Access";

const router = Router();

// ── R1 journal — one entry per user per day (upsert on user_id+entry_date) ──

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "must be YYYY-MM-DD");

const journalSchema = z
  .object({
    entryDate: isoDate,
    title: z.string().trim().max(200).optional(),
    body: z.string().trim().min(1).max(20000),
    mood: z.string().trim().max(40).optional().nullable(),
    tags: z.array(z.string().trim().min(1).max(40)).max(20).optional(),
  })
  .strict();

const JOURNAL_COLUMNS = "id, entry_date, title, body, mood, tags, created_at, updated_at";

function mapJournalRow(row: any) {
  return {
    id: row.id,
    entryDate: row.entry_date,
    title: row.title ?? "",
    body: row.body,
    mood: row.mood ?? null,
    tags: row.tags ?? [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// ── GET /api/r1/journal?from=YYYY-MM-DD&to=YYYY-MM-DD ──────────────────────

router.get("/", requireAuth, requireR1Access, async (req: Request, res: Response) => {
  try {
    const user = (req as AuthedRequest).user;

    let query = supabaseAdmin
      .from("r1_journal")
      .select(JOURNAL_COLUMNS)
      .eq("user_id", user.id)
      .order("entry_date", { ascending: false });

    const { from, to } = req.query;
    if (typeof from === "string" && isoDate.safeParse(from).success) {
      query = query.gte("entry_date", from);
    }
    if (typeof to === "string" && isoDate.safeParse(to).success) {
      query = query.lte("entry_date", to);
    }

    const { data, error } = await query;
    if (error) {
      serverError(res, error);
      return;
    }
    res.json((data ?? []).map(mapJournalRow));
  } catch (err) {
    serverError(res, err);
  }
});

// ── Lock window: an entry may be edited or deleted for JOURNAL_LOCK_HOURS
//    after it is created. After that, the row is read-only and rejected with
//    410 GONE so the student keeps a journal they cannot quietly rewrite. The
//    constant lives in env (JOURNAL_LOCK_HOURS) so the window can be tuned
//    without a code change. ────────────────────────────────────────────────
const JOURNAL_LOCK_HOURS = Number(process.env.JOURNAL_LOCK_HOURS ?? 24);

function isLocked(row: { created_at: string } | null | undefined): boolean {
  if (!row) return false;
  const created = new Date(row.created_at).getTime();
  if (!Number.isFinite(created)) return false;
  return Date.now() - created > JOURNAL_LOCK_HOURS * 3600 * 1000;
}

const LOCK_ERROR = {
  error: "This journal entry is locked",
  code: "JOURNAL_LOCKED",
  reason: `entries are read-only ${JOURNAL_LOCK_HOURS}h after creation`,
} as const;

// ── PUT /api/r1/journal — create or replace the entry for one day ──────────
// On update (existing row for the same user+date), the row's created_at is
// checked: once the lock window has passed, the body is rejected before
// Supabase is touched, so the row is never overwritten.

router.put("/", requireAuth, requireR1Access, async (req: Request, res: Response) => {
  const parsed = journalSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid payload" });
    return;
  }
  try {
    const user = (req as AuthedRequest).user;
    const v = parsed.data;

    // Look up the existing row first so we can honour the lock before writing.
    const existing = await supabaseAdmin
      .from("r1_journal")
      .select("created_at")
      .eq("user_id", user.id)
      .eq("entry_date", v.entryDate)
      .maybeSingle();
    if (existing.error) {
      serverError(res, existing.error);
      return;
    }
    if (existing.data && isLocked(existing.data)) {
      res.status(410).json(LOCK_ERROR);
      return;
    }

    const { data, error } = await supabaseAdmin
      .from("r1_journal")
      .upsert(
        [
          {
            user_id: user.id,
            entry_date: v.entryDate,
            title: v.title ?? "",
            body: v.body,
            mood: v.mood ?? null,
            tags: v.tags ?? [],
            updated_at: new Date().toISOString(),
          },
        ],
        { onConflict: "user_id,entry_date" }
      )
      .select(JOURNAL_COLUMNS)
      .single();

    if (error) {
      serverError(res, error);
      return;
    }
    res.json(mapJournalRow(data));
  } catch (err) {
    serverError(res, err);
  }
});

// ── DELETE /api/r1/journal/:id (own rows only, honour the lock) ───────────

router.delete("/:id", requireAuth, requireR1Access, async (req: Request, res: Response) => {
  try {
    const user = (req as AuthedRequest).user;

    // Fetch the row first so we can refuse locked entries before touching
    // them. The fetch is also the owner check (user_id) that DELETE used to
    // express via its WHERE clause.
    const existing = await supabaseAdmin
      .from("r1_journal")
      .select("id, user_id, created_at")
      .eq("id", req.params.id)
      .maybeSingle();
    if (existing.error) {
      serverError(res, existing.error);
      return;
    }
    if (!existing.data || existing.data.user_id !== user.id) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    if (isLocked(existing.data)) {
      res.status(410).json(LOCK_ERROR);
      return;
    }

    const { error } = await supabaseAdmin
      .from("r1_journal")
      .delete()
      .eq("id", req.params.id)
      .eq("user_id", user.id);
    if (error) {
      serverError(res, error);
      return;
    }
    res.json({ deleted: true, id: req.params.id });
  } catch (err) {
    serverError(res, err);
  }
});

export default router;
