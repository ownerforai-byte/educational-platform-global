import { Router, Request, Response } from "express";
import { serverError, ERROR_ID_HEADER } from "../middleware/errors";
import { createAIService, type AIChatMessage } from "../ai/service";
import { requireAuth } from "../middleware/auth";
import { hasFullAccess } from "../middleware/auth";
import { requireCredit } from "../middleware/creditCheck";
import { ensureDailyCredits, spendCredits, AI_MESSAGE_COST } from "../utils/credits";
import { supabaseAdmin } from "../db/supabase";
import { logServerError, newErrorId } from "../middleware/errors";
import { buildProfessorContext, withProfessorContext } from "../ai/prompts";

const router = Router();

// Lazy init: create service on first request so dotenv has already loaded
// env vars (AGNES_API_KEY, OPENROUTER_API_KEY, etc.).
let _service: ReturnType<typeof createAIService> | null = null;
function getService() {
  if (!_service) _service = createAIService();
  return _service;
}

// List available providers (no auth required)
router.get("/providers", (_req: Request, res: Response) => {
  const aiService = getService();
  const providers = aiService.getProviders();
  const defaultProvider = aiService.getDefaultProvider();
  res.json({ providers, defaultProvider });
});

router.post("/", requireAuth, async (req: Request, res: Response) => {
  try {
    const body = req.body;
    let messages: AIChatMessage[] = Array.isArray(body?.messages) ? body.messages : [];
    const provider: string = typeof body?.provider === "string" ? body.provider : "";
    const stream: boolean = body?.stream === true;

    if (!messages.length) {
      res.status(400).json({ error: "messages array is required" });
      return;
    }

    // ── Daily pool + 1-credit-per-message billing (owner policy) ──
    const user = (req as unknown as { user?: { id: string; email?: string; role?: string | null } }).user;
    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const { data: prof } = await supabaseAdmin
      .from("profiles")
      .select("role, premium_status")
      .eq("id", user.id)
      .maybeSingle();
    const privileged = hasFullAccess(
      ((prof?.role as string | undefined) ?? user.role ?? "").toUpperCase() || null,
      prof?.premium_status ?? false,
    );

    let creditsLeft: number | null = null;
    if (!privileged) {
      // Lazy midnight reset: first AI call of the day refills the pool.
      const ensured = await ensureDailyCredits(user.id, user.email, prof?.role as string | null, prof?.premium_status);
      const remaining = await spendCredits(
        user.id,
        AI_MESSAGE_COST,
        "AI tutor message",
      );
      if (remaining === null) {
        res.status(402).json({
          error: "Insufficient credits",
          required: AI_MESSAGE_COST,
          current: ensured.credits === Infinity ? 0 : ensured.credits,
          message: `You've used all ${AI_MESSAGE_COST === 1 ? "8 credits" : ""} of today's daily pool. It resets to 8 credits at 12:00 AM.`,
        });
        return;
      }
      creditsLeft = remaining;
    }

    const aiService = getService();

    // Professor mode: enforce plain-text style + inject live web results
    // for the student's latest question (Google CSE, timeout-protected).
    const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
    const professorContext = await buildProfessorContext(lastUser);
    messages = withProfessorContext(messages, professorContext) as AIChatMessage[];

    // Handle streaming
    if (stream) {
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      try {
        // "" runs the ordered chain (agnes → openrouter → internal); an
        // explicit provider from the client still wins.
        const response = await aiService.chat(provider, messages);
        // Send the full response as a single event (simplified streaming)
        res.write(`data: ${JSON.stringify({ content: response, done: true, credits: creditsLeft ?? undefined })}\n\n`);
      } catch (err) {
        // SSE headers are already sent, so serverError() cannot be used — but
        // the raw provider error still must not reach the client. Log it under
        // a correlation id and send only the generic message + that id.
        const errorId = newErrorId();
        logServerError(err, errorId, "POST /api/ai (stream)");
        res.write(
          `event: error\ndata: ${JSON.stringify({ error: "AI request failed", errorId })}\n\n`,
        );
      }
      res.end();
      return;
    }

    const response = await aiService.chat(provider, messages);
    res.json({ response, provider: provider || aiService.getLastAnsweredBy(), credits: creditsLeft ?? undefined });
  } catch (err: any) {
    console.error("AI chat error:", err);
    // Budget-exhaustion/timeouts are a slow-provider condition, not a server
    // bug — answer with a retryable 504 + a human message instead of the
    // generic "Internal server error" (the 2026-09-26 console report).
    const message = String(err?.message ?? "");
    if (/timeout|timed out|deadline/i.test(message)) {
      const errorId = newErrorId();
      logServerError(err, errorId, "POST /api/ai");
      res.setHeader(ERROR_ID_HEADER, errorId);
      res
        .status(504)
        .json({
          error: "The AI took too long to answer. Please try again in a moment.",
          errorId,
        });
      return;
    }
    serverError(res, err);
  }
});

export default router;
