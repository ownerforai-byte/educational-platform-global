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

// ── PUT /api/r1/journal — create or replace the entry for one day ──────────

router.put("/", requireAuth, requireR1Access, async (req: Request, res: Response) => {
  const parsed = journalSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid payload" });
    return;
  }
  try {
    const user = (req as AuthedRequest).user;
    const v = parsed.data;

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

// ── DELETE /api/r1/journal/:id (own rows only) ─────────────────────────────

router.delete("/:id", requireAuth, requireR1Access, async (req: Request, res: Response) => {
  try {
    const user = (req as AuthedRequest).user;
    const { data, error } = await supabaseAdmin
      .from("r1_journal")
      .delete()
      .eq("id", req.params.id)
      .eq("user_id", user.id)
      .select("id")
      .maybeSingle();

    if (error) {
      serverError(res, error);
      return;
    }
    if (!data) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json({ deleted: true, id: data.id });
  } catch (err) {
    serverError(res, err);
  }
});

export default router;
