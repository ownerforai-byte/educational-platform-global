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

/**
 * Insert rows with one retry. Supabase's PostgREST replica can briefly lack a
 * brand-new auth user's FK row right after signup, failing the insert with a
 * transient 23503 ("key is not present in table users"). A short retry closes
 * that window so a user's very first chat save always succeeds.
 */
async function insertWithRetry(
  rows: Array<{ user_id: string; session: string; role: string; content: string }>
): Promise<{ error: { message: string } | null }> {
  let last: { error: { message: string } | null } = { error: null };
  for (let attempt = 0; attempt < 3; attempt++) {
    const result = await supabaseAdmin.from("chat_messages").insert(rows);
    if (!result.error) return { error: null };
    last = result;
    const code = (result.error as { code?: string }).code ?? "";
    if (code !== "23503" && !result.error.message.includes("23503")) break;
    await new Promise((resolve) => setTimeout(resolve, 750 * (attempt + 1)));
  }
  return last;
}

/**
 * GET /api/chat-history/sessions — the user's conversation list.
 * One row per session: name, message count, last activity, and a preview
 * snippet (first user message) so the sidebar can label each history.
 */
router.get("/sessions", requireAuth, async (req: Request, res: Response) => {
  const user = (req as Request & { user: { id: string } }).user;

  const { data, error } = await supabaseAdmin
    .from("chat_messages")
    .select("session, role, content, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(500);

  if (error) {
    if (isMissingTable(error)) {
      res.json({ sessions: [], migrated: false });
      return;
    }
    res.status(500).json({ error: "Failed to load chat sessions" });
    return;
  }

  const map = new Map<string, { session: string; messages: number; lastMessageAt: string; preview: string }>();
  for (const row of data ?? []) {
    const s = row.session || "default";
    const entry = map.get(s) ?? { session: s, messages: 0, lastMessageAt: row.created_at, preview: "" };
    entry.messages += 1;
    map.set(s, entry);
  }

  // Rows arrive newest-first; walk them reversed so the preview ends up as
  // each session's FIRST user message (a stable label for the sidebar).
  for (const row of (data ?? []).slice().reverse()) {
    if (row.role !== "user") continue;
    const entry = map.get(row.session || "default");
    if (entry && !entry.preview) entry.preview = row.content.slice(0, 80);
  }

  res.json({ sessions: Array.from(map.values()), migrated: true });
});

/** GET /api/chat-history?session=default&limit=200 — newest-last. */
router.get("/", requireAuth, async (req: Request, res: Response) => {
  const user = (req as Request & { user: { id: string } }).user;
  const session = typeof req.query.session === "string" ? req.query.session.slice(0, 64) : "default";
  const limitRaw = Number(req.query.limit);
  const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(Math.trunc(limitRaw), 1), 500) : 200;

  // Fetch NEWEST-first then re-reverse (Greptile review 2026-09-25): sorting
  // ascending before the limit returned the OLDEST 200 once a session grew
  // past the restore cap, silently dropping recent context.
  const { data, error } = await supabaseAdmin
    .from("chat_messages")
    .select("id, role, content, created_at")
    .eq("user_id", user.id)
    .eq("session", session)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    if (isMissingTable(error)) {
      res.json({ messages: [], migrated: false });
      return;
    }
    res.status(500).json({ error: "Failed to load chat history" });
    return;
  }

  res.json({ messages: (data ?? []).slice().reverse(), migrated: true });
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

  const { error } = await insertWithRetry(rows);

  if (error) {
    if (isMissingTable(error)) {
      res.json({ saved: 0, migrated: false });
      return;
    }
    const err = error as { code?: string; details?: unknown };
    console.error("[chat-history] save failed:", err.code, error.message, JSON.stringify(err.details ?? ""));
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
