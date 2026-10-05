import { Router, Request, Response } from "express";
import { z } from "zod";
import { requireAuth, requireOwnerEmail } from "../middleware/auth";
import { supabaseAdmin } from "../db/supabase";
import { logServerError, newErrorId } from "../middleware/errors";
import { createAIService, type AIChatMessage } from "../ai/service";
import {
  HISTORY_SEARCH_RULES,
  formatHistoryContext,
  selectHistory,
  type HistoryMessage,
} from "../ai/history-search";

/**
 * /api/ai/history-search — "search my own saved conversations".
 *
 * Owner request (2026-09-30): the tutor gets a separate interface whose work is
 * to search chat history and present it as asked. Owner decision on pricing
 * (2026-10-05): OWNER EMAILS ONLY — `requireAuth` + `requireOwnerEmail` is
 * therefore the whole gate — no credit is spent and no daily pool is touched,
 * which is why this route never calls spendCredits().
 *
 * Two details that keep the guarantee honest:
 *   · the search itself is server-side (selectHistory), so the model only ever
 *     sees the messages that actually match the question;
 *   · when nothing matches, or there is no history at all, the route answers
 *     WITHOUT calling the model at all — no fabricated summary, no wasted call.
 */
const router = Router();

let _service: ReturnType<typeof createAIService> | null = null;
function getService() {
  if (!_service) _service = createAIService();
  return _service;
}

const searchSchema = z.object({
  question: z.string().trim().min(2).max(600),
});

/** How much of the account's history is read for one search. */
const SCAN_LIMIT = 500;

function isMissingTable(error: { message?: string } | null): boolean {
  const msg = (error?.message ?? "").toLowerCase();
  return (
    msg.includes("could not find the table") ||
    msg.includes("does not exist") ||
    msg.includes("schema cache")
  );
}

router.post("/", requireAuth, requireOwnerEmail, async (req: Request, res: Response) => {
  try {
    const parsed = searchSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Ask a question about your history first." });
      return;
    }
    const question = parsed.data.question;
    const user = (req as Request & { user: { id: string } }).user;

    // Newest-first then reversed, exactly like /api/chat-history, so a long
    // account is searched from its most recent activity backwards.
    const { data, error } = await supabaseAdmin
      .from("chat_messages")
      .select("session, role, content, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(SCAN_LIMIT);

    if (error) {
      if (isMissingTable(error)) {
        res.json({
          response:
            "Your account has no saved conversations yet — chat history storage is not enabled for this deployment, so there is nothing for me to search.",
          searched: { messages: 0, sessions: 0 },
          sessions: [],
        });
        return;
      }
      res.status(500).json({ error: "Failed to read your chat history" });
      return;
    }

    const messages: HistoryMessage[] = (data ?? [])
      .slice()
      .reverse()
      .map((row) => ({
        session: String(row.session || "default"),
        role: row.role === "assistant" ? "assistant" : "user",
        content: String(row.content ?? ""),
        created_at: String(row.created_at ?? ""),
      }));

    const selection = selectHistory(messages, question);

    // Nothing to present: answer honestly WITHOUT spending a model call.
    if (!messages.length) {
      res.json({
        response:
          "You have no saved conversations yet. Ask Veer something in the tutor console and it is saved here, ready to search.",
        searched: { messages: 0, sessions: 0 },
        sessions: [],
      });
      return;
    }
    if (!selection.selected.length) {
      res.json({
        response:
          `Nothing in your ${selection.considered.messages} saved message(s) mentions ` +
          `${selection.terms.join(", ") || "that"}. Try a word you actually used, or ask for a ` +
          `recent summary instead.`,
        searched: {
          messages: selection.considered.messages,
          sessions: selection.considered.sessions,
        },
        sessions: [],
      });
      return;
    }

    const context = formatHistoryContext(selection);
    const turn: AIChatMessage[] = [
      { role: "system", content: `${HISTORY_SEARCH_RULES}\n\n${context}` },
      { role: "user", content: question },
    ];

    const response = await getService().chat("", turn);

    res.json({
      response,
      provider: getService().getLastAnsweredBy(),
      searched: {
        messages: selection.considered.messages,
        sessions: selection.considered.sessions,
        attached: selection.selected.length,
        terms: selection.terms,
      },
      sessions: selection.sessions.map((s) => ({
        session: s.session,
        messages: s.messages,
        matched: s.matched,
        lastMessageAt: s.lastMessageAt,
      })),
    });
  } catch (err) {
    const errorId = newErrorId();
    logServerError(err, errorId, "POST /api/ai/history-search");
    res.status(500).json({ error: "History search failed", errorId });
  }
});

export default router;
