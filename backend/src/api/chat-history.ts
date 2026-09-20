import { Router, Request, Response } from "express";
import { z } from "zod";
import { supabaseAdmin } from "../db/supabase";
import { requireAuth } from "../middleware/auth";

/**
 * Per-user AI chat history, persisted in Supabase (`chat_messages` table).
 * All queries are scoped to the authenticated user — no one can read or write
 * another user's history. If the table has not been migrated yet, the router
 * degrades gracefully (empty history / skip saves) instead of erroring.
 */
const router = Router();

const saveSchema = z.object({
  session: z.string().trim().min(1).max(64).default("default"),
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(24000),
      })
    )
    .min(1)
    .max(200),
});

function isMissingTable(error: { message?: string } | null): boolean {
  const msg = (error?.message ?? "").toLowerCase();
  return (
    msg.includes("could not find the table") ||
    msg.includes("does not exist") ||
    msg.includes("schema cache")
  );
}

/** GET /api/chat-history?session=default&limit=200 — newest-last. */
router.get("/", requireAuth, async (req: Request, res: Response) => {
  const user = (req as Request & { user: { id: string } }).user;
  const session = typeof req.query.session === "string" ? req.query.session.slice(0, 64) : "default";
  const limitRaw = Number(req.query.limit);
  const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(Math.trunc(limitRaw), 1), 500) : 200;

  const { data, error } = await supabaseAdmin
    .from("chat_messages")
    .select("id, role, content, created_at")
    .eq("user_id", user.id)
    .eq("session", session)
    .order("created_at", { ascending: true })
    .limit(limit);

  if (error) {
    if (isMissingTable(error)) {
      res.json({ messages: [], migrated: false });
      return;
    }
    res.status(500).json({ error: "Failed to load chat history" });
    return;
  }

  res.json({ messages: data ?? [], migrated: true });
});

/** POST /api/chat-history — { session, messages: [{role, content}, ...] }. */
router.post("/", requireAuth, async (req: Request, res: Response) => {
  const parsed = saveSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid chat history payload" });
    return;
  }

  const user = (req as Request & { user: { id: string } }).user;
  const rows = parsed.data.messages.map((m) => ({
    user_id: user.id,
    session: parsed.data.session,
    role: m.role,
    content: m.content,
  }));

  const { error } = await supabaseAdmin.from("chat_messages").insert(rows);

  if (error) {
    if (isMissingTable(error)) {
      res.json({ saved: 0, migrated: false });
      return;
    }
    res.status(500).json({ error: "Failed to save chat history" });
    return;
  }

  res.json({ saved: rows.length, migrated: true });
});

/** DELETE /api/chat-history?session=default — clear one session (or all). */
router.delete("/", requireAuth, async (req: Request, res: Response) => {
  const user = (req as Request & { user: { id: string } }).user;
  const session = typeof req.query.session === "string" ? req.query.session.slice(0, 64) : null;

  let query = supabaseAdmin.from("chat_messages").delete().eq("user_id", user.id);
  if (session) query = query.eq("session", session);

  const { error } = await query;

  if (error) {
    if (isMissingTable(error)) {
      res.json({ cleared: true, migrated: false });
      return;
    }
    res.status(500).json({ error: "Failed to clear chat history" });
    return;
  }

  res.json({ cleared: true, migrated: true });
});

export default router;
