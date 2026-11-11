import { Router, Request, Response } from "express";
import { z } from "zod";
import { requireAuth } from "../../middleware/auth";
import { asyncHandler } from "../../middleware/asyncHandler";
import * as communityService from "../../services/community.service.js";

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

router.get("/sessions", requireAuth, asyncHandler(async (req: Request, res: Response) => {
  const user = (req as Request & { user: { id: string } }).user;
  const prefix =
    typeof req.query.prefix === "string"
      ? req.query.prefix.replace(/[%_\\]/g, "").slice(0, 64)
      : "";

  const result = await communityService.listChatSessions(user.id, prefix);
  if ("error" in result) {
    res.status(500).json({ error: result.error });
    return;
  }
  res.json({ sessions: result.sessions, migrated: result.migrated });
}));

/** GET /api/chat-history?session=default&limit=200 — newest-last. */
router.get("/", requireAuth, asyncHandler(async (req: Request, res: Response) => {
  const user = (req as Request & { user: { id: string } }).user;
  const session = typeof req.query.session === "string" ? req.query.session.slice(0, 64) : "default";
  const limitRaw = Number(req.query.limit);
  const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(Math.trunc(limitRaw), 1), 500) : 200;

  const result = await communityService.loadChatSession(user.id, session, limit);
  if ("error" in result) {
    res.status(500).json({ error: result.error });
    return;
  }
  res.json({ messages: result.messages, migrated: result.migrated });
}));

/** POST /api/chat-history — { session, messages: [{role, content}, ...] }. */
router.post("/", requireAuth, asyncHandler(async (req: Request, res: Response) => {
  const parsed = saveSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid chat history payload" });
    return;
  }

  const user = (req as Request & { user: { id: string } }).user;
  const result = await communityService.saveChatBatch(user.id, parsed.data.session, parsed.data.messages);

  if ("error" in result) {
    if (result.log) {
      console.error(
        "[chat-history] save failed:",
        result.log.code,
        result.error,
        JSON.stringify(result.log.details ?? ""),
      );
    }
    res.status(500).json({ error: result.error });
    return;
  }
  res.json({ saved: result.saved, migrated: result.migrated });
}));

/** DELETE /api/chat-history?session=default — clear one session (or all). */
router.delete("/", requireAuth, asyncHandler(async (req: Request, res: Response) => {
  const user = (req as Request & { user: { id: string } }).user;
  const session = typeof req.query.session === "string" ? req.query.session.slice(0, 64) : null;

  const result = await communityService.clearChatHistory(user.id, session);
  if ("error" in result) {
    res.status(500).json({ error: result.error });
    return;
  }
  res.json({ cleared: result.cleared, migrated: result.migrated });
}));

export default router;
