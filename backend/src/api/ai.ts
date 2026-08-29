import { Router, Request, Response } from "express";
import { createAIService, type AIChatMessage } from "../ai/service";
import { requireAuth, type AuthedRequest } from "../middleware/auth";

const router = Router();
const aiService = createAIService();

router.post("/", requireAuth, async (req: Request, res: Response) => {
  try {
    const user = (req as AuthedRequest).user;
    const body = req.body;
    const messages: AIChatMessage[] = Array.isArray(body?.messages) ? body.messages : [];
    const provider: string = typeof body?.provider === "string" ? body.provider : "";

    if (!messages.length) {
      res.status(400).json({ error: "messages array is required" });
      return;
    }

    const response = await aiService.chat(provider || aiService.getDefaultProvider(), messages);
    res.json({ response, provider: provider || aiService.getDefaultProvider() });
  } catch (err: any) {
    console.error("AI chat error:", err);
    res.status(500).json({ error: err.message || "AI request failed" });
  }
});

export default router;
