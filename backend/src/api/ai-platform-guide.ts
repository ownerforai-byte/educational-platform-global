import { Router, Request, Response } from "express";
import { z } from "zod";
import { getAgnesKey } from "../ai/config";
import {
  PLATFORM_GUIDE_SYSTEM_PROMPT,
  clampReplyWords,
} from "../ai/platform-guide-prompt";
import { rateLimit } from "../middleware/rateLimit";

const router = Router();

const bodySchema = z.object({
  message: z.string().trim().min(1).max(500),
});

const AGNES_URL = (process.env.AGNES_API_URL || "https://apihub.agnes-ai.com").replace(/\/v1\/?$/, "");
const AGNES_MODEL = process.env.AGNES_MODEL || "agnes-3.0-flash";

/**
 * POST /api/ai/platform-guide
 * Marketing widget: Agnes-only, no AI/content sparks, ultra-short replies.
 */
router.post("/", rateLimit, async (req: Request, res: Response) => {
  const parsed = bodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "message is required" });
    return;
  }

  const apiKey = getAgnesKey();
  if (!apiKey) {
    res.status(503).json({
      error: "Guide unavailable",
      message: "The platform guide is briefly offline. Browse the home page or sign in to explore.",
    });
    return;
  }

  const userText = parsed.data.message;

  try {
    const upstream = await fetch(`${AGNES_URL}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: AGNES_MODEL,
        messages: [
          { role: "system", content: PLATFORM_GUIDE_SYSTEM_PROMPT },
          {
            role: "user",
            content: userText,
          },
        ],
        max_tokens: 90,
        temperature: 0.35,
      }),
      signal: AbortSignal.timeout(Number(process.env.AGNES_PLATFORM_GUIDE_TIMEOUT_MS || 25_000)),
    });

    if (!upstream.ok) {
      const detail = await upstream.text().catch(() => "");
      console.error("[platform-guide] Agnes error:", upstream.status, detail.slice(0, 200));
      res.status(502).json({
        error: "Guide unavailable",
        message: "I could not reach the guide right now. Try again in a moment.",
      });
      return;
    }

    const data = (await upstream.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const raw = data?.choices?.[0]?.message?.content?.trim() ?? "";
    const reply =
      raw.length > 0
        ? clampReplyWords(raw)
        : "I am here to tell you about Ravikisan's NEB study platform. Ask about plans or sign-in.";

    res.json({ reply, provider: "agnes" });
  } catch (err) {
    console.error("[platform-guide] failed:", err instanceof Error ? err.message : err);
    res.status(503).json({
      error: "Guide unavailable",
      message: "Please try again shortly.",
    });
  }
});

export default router;
