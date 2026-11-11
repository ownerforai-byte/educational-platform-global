import { Router, Request, Response } from "express";
import { z } from "zod";
import { getAgnesKey } from "../../ai/config";
import {
  PLATFORM_GUIDE_CREATOR_REPLY,
  PLATFORM_GUIDE_SYSTEM_PROMPT,
  buildPersonalContext,
  isPlatformGuideCreatorQuestion,
  platformGuideReply,
} from "../../ai/platform-guide-prompt";
import { rateLimit } from "../../middleware/rateLimit";

const router = Router();

const bodySchema = z.object({
  message: z.string().trim().min(1).max(500),
  /** Optional user context for the personal AI mode. */
  userContext: z.object({
    plan: z.string().optional(),
    subjects: z.array(z.string()).optional(),
    examDate: z.string().nullable().optional(),
    targetPercent: z.number().nullable().optional(),
    dailyMinutes: z.number().nullable().optional(),
    completedTopics: z.number().optional(),
    inProgressTopics: z.number().optional(),
    notStartedTopics: z.number().optional(),
    streakDays: z.number().optional(),
    weeklyAccuracy: z.number().nullable().optional(),
    habits: z.array(z.string()).optional(),
  }).optional(),
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

  const userText = parsed.data.message;
  if (isPlatformGuideCreatorQuestion(userText)) {
    res.json({ reply: PLATFORM_GUIDE_CREATOR_REPLY });
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

  const userContext = parsed.data.userContext;
  const message = userContext
    ? `${buildPersonalContext(userContext)}\n\nQUESTION:\n${userText}`
    : userText;
  const timeoutMs = Number(process.env.AGNES_PLATFORM_GUIDE_TIMEOUT_MS || 25_000);
  const retryDelayMs = Number(process.env.AGNES_PLATFORM_GUIDE_RETRY_DELAY_MS || 1_200);

  try {
    // Short Agnes throttling bursts should not discard an otherwise working
    // public guide request. Two total attempts bound both quota use and wait.
    const requestGuide = async () => {
      for (let attempt = 0; attempt < 2; attempt += 1) {
        const response = await fetch(`${AGNES_URL}/v1/chat/completions`, {
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
                content: message,
              },
            ],
            // 50-word ceiling (PLATFORM_GUIDE_MAX_WORDS) needs headroom so the
            // model is never cut mid-word before the clamp can add its "…".
            max_tokens: 120,
            temperature: 0.35,
          }),
          signal: AbortSignal.timeout(timeoutMs),
        });
        if (response.status !== 429 || attempt === 1) return response;
        await response.text().catch(() => "");
        const retryAfterMs = Number(response.headers.get("retry-after")) * 1000;
        await new Promise((resolve) => setTimeout(
          resolve,
          Number.isFinite(retryAfterMs) && retryAfterMs > 0
            ? Math.min(retryAfterMs, 3_000)
            : retryDelayMs,
        ));
      }
      throw new Error("Agnes retry exhausted");
    };
    let upstream: globalThis.Response;
    try {
      upstream = await requestGuide();
    } catch (error) {
      // One transport retry covers a dropped connection, not a model refusal.
      if (error instanceof Error && error.name === "AbortError") throw error;
      upstream = await requestGuide();
    }

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
    res.json({ reply: platformGuideReply(raw) });
  } catch (err) {
    console.error("[platform-guide] failed:", err instanceof Error ? err.message : err);
    res.status(503).json({
      error: "Guide unavailable",
      message: "Please try again shortly.",
    });
  }
});

export default router;
