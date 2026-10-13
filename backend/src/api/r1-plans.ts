import { Router, Request, Response } from "express";
import { serverError } from "../middleware/errors";
import { z } from "zod";
import { supabaseAdmin } from "../db/supabase";
import { requireAuth, type AuthedRequest } from "../middleware/auth";
import { requireR1Access } from "../middleware/r1Access";

const router = Router();

// ── R1 plans / upcoming tasks ───────────────────────────────────────────────

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "must be YYYY-MM-DD");

const planCreateSchema = z
  .object({
    title: z.string().trim().min(1).max(200),
    description: z.string().trim().max(5000).optional().nullable(),
    dueDate: isoDate.optional().nullable(),
    status: z.enum(["planned", "in_progress", "done", "cancelled"]).optional(),
    priority: z.enum(["low", "medium", "high"]).optional(),
  })
  .strict();

const planUpdateSchema = planCreateSchema.partial().strict();

const PLAN_COLUMNS =
  "id, title, description, due_date, status, priority, created_at, updated_at";

function mapPlanRow(row: any) {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? null,
    dueDate: row.due_date ?? null,
    status: row.status ?? "planned",
    priority: row.priority ?? "medium",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// ── GET /api/r1/plans?status=planned|in_progress|done|cancelled&from=&to= ──

router.get("/", requireAuth, requireR1Access, async (req: Request, res: Response) => {
  try {
    const user = (req as AuthedRequest).user;

    let query = supabaseAdmin
      .from("r1_plans")
      .select(PLAN_COLUMNS)
      .eq("user_id", user.id)
      .order("due_date", { ascending: true, nullsFirst: false });

    const { status, from, to } = req.query;
    if (typeof status === "string" && ["planned", "in_progress", "done", "cancelled"].includes(status)) {
      query = query.eq("status", status);
    }
    if (typeof from === "string" && isoDate.safeParse(from).success) {
      query = query.gte("due_date", from);
    }
    if (typeof to === "string" && isoDate.safeParse(to).success) {
      query = query.lte("due_date", to);
    }

    const { data, error } = await query;
    if (error) {
      serverError(res, error);
      return;
    }
    res.json((data ?? []).map(mapPlanRow));
  } catch (err) {
    serverError(res, err);
  }
});

// ── POST /api/r1/plans ──────────────────────────────────────────────────────

router.post("/", requireAuth, requireR1Access, async (req: Request, res: Response) => {
  const parsed = planCreateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid payload" });
    return;
  }
  try {
    const user = (req as AuthedRequest).user;
    const v = parsed.data;

    const { data, error } = await supabaseAdmin
      .from("r1_plans")
      .insert([
        {
          user_id: user.id,
          title: v.title,
          description: v.description ?? null,
          due_date: v.dueDate ?? null,
          status: v.status ?? "planned",
          priority: v.priority ?? "medium",
        },
      ])
      .select(PLAN_COLUMNS)
      .single();

    if (error) {
      serverError(res, error);
      return;
    }
    res.status(201).json(mapPlanRow(data));
  } catch (err) {
    serverError(res, err);
  }
});

// ── PATCH /api/r1/plans/:id (own rows only) ─────────────────────────────────

router.patch("/:id", requireAuth, requireR1Access, async (req: Request, res: Response) => {
  const parsed = planUpdateSchema.safeParse(req.body);
  if (!parsed.success || Object.keys(parsed.data).length === 0) {
    res.status(400).json({ error: "Invalid payload" });
    return;
  }
  try {
    const user = (req as AuthedRequest).user;
    const v = parsed.data;
    const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (v.title !== undefined) updates.title = v.title;
    if (v.description !== undefined) updates.description = v.description;
    if (v.dueDate !== undefined) updates.due_date = v.dueDate;
    if (v.status !== undefined) updates.status = v.status;
    if (v.priority !== undefined) updates.priority = v.priority;

    const { data, error } = await supabaseAdmin
      .from("r1_plans")
      .update(updates)
      .eq("id", req.params.id)
      .eq("user_id", user.id)
      .select(PLAN_COLUMNS)
      .maybeSingle();

    if (error) {
      serverError(res, error);
      return;
    }
    if (!data) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json(mapPlanRow(data));
  } catch (err) {
    serverError(res, err);
  }
});

// ── DELETE /api/r1/plans/:id (own rows only) ────────────────────────────────

router.delete("/:id", requireAuth, requireR1Access, async (req: Request, res: Response) => {
  try {
    const user = (req as AuthedRequest).user;
    const { data, error } = await supabaseAdmin
      .from("r1_plans")
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
