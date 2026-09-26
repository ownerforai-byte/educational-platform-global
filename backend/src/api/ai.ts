import { Router, Request, Response } from "express";
import { serverError } from "../middleware/errors";
import { createAIService, type AIChatMessage } from "../ai/service";
import { requireAuth } from "../middleware/auth";
import { requireCredit } from "../middleware/creditCheck";
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

router.post("/", requireAuth, requireCredit("aiChat"), async (req: Request, res: Response) => {
  try {
    const body = req.body;
    let messages: AIChatMessage[] = Array.isArray(body?.messages) ? body.messages : [];
    const provider: string = typeof body?.provider === "string" ? body.provider : "";
    const stream: boolean = body?.stream === true;

    if (!messages.length) {
      res.status(400).json({ error: "messages array is required" });
      return;
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
        res.write(`data: ${JSON.stringify({ content: response, done: true })}\n\n`);
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
    res.json({ response, provider: provider || aiService.getLastAnsweredBy() });
  } catch (err: any) {
    console.error("AI chat error:", err);
    serverError(res, err);
  }
});

export default router;
