import { Router, Request, Response } from "express";
import { createAIService, type AIChatMessage } from "../ai/service";
import { rateLimit } from "../middleware/rateLimit";
import { buildProfessorContext, withProfessorContext } from "../ai/prompts";

const router = Router();

let _service: ReturnType<typeof createAIService> | null = null;
function getService() {
  if (!_service) _service = createAIService();
  return _service;
}

router.post("/", rateLimit, async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const messages: AIChatMessage[] = Array.isArray(body?.messages) ? body.messages : [];
    const provider: string = typeof body?.provider === "string" ? body.provider : "";

    if (!messages.length) {
      res.status(400).json({ error: "messages array is required" });
      return;
    }

    const aiService = getService();

    // Professor mode: plain-text enforcement + live web results (best-effort).
    const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
    const professorContext = await buildProfessorContext(lastUser);
    const augmented = withProfessorContext(messages, professorContext) as AIChatMessage[];

    const response = await aiService.chat(provider || aiService.getDefaultProvider(), augmented);
    res.json({ response, provider: provider || aiService.getDefaultProvider() });
  } catch (err: any) {
    console.error("AI guest chat error:", err);
    res.status(500).json({ error: err.message || "AI request failed" });
  }
});

export default router;
