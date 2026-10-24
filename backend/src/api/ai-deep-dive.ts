import { Router, Request, Response, NextFunction } from "express";
import { serverError } from "../middleware/errors";
import { createAIService, type AIChatMessage } from "../ai/service";
import { rateLimit } from "../middleware/rateLimit";
import { getUserFromRequest, type AuthedRequest } from "../middleware/auth";
import { requireCredit } from "../middleware/creditCheck";
import {
  GUEST_DAILY_LIMIT,
  consumeGuestSlot,
  getGuestDeviceId,
  issueGuestDeviceCookie,
  rollbackGuestSlot,
} from "../utils/guestQuota";
import { DAILY_CREDIT_POOL } from "../utils/credits";
import { getClientIp } from "../utils/clientIp";
import { sanitizeChatImages } from "../ai/image-input";

const router = Router();

let _service: ReturnType<typeof createAIService> | null = null;
function getService() {
  if (!_service) _service = createAIService();
  return _service;
}

type GuestGateRequest = Request & {
  guestSlot?: { ip: string; deviceId: string; remaining: number };
};

async function authOrGuestQuota(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user = await getUserFromRequest(req);
    if (user) {
      (req as AuthedRequest).user = user;
      next();
      return;
    }

    const ip = getClientIp(req);
    const deviceId = getGuestDeviceId(req) ?? issueGuestDeviceCookie(res);
    const slot = await consumeGuestSlot(ip, deviceId);
    if (slot.status === "limited") {
      res.status(402).json({
        error: "Sign in required",
        remaining: 0,
        limit: GUEST_DAILY_LIMIT,
        message: `You've used your free trial for today. Sign in to keep going — members get ${DAILY_CREDIT_POOL} daily credits and saved history.`,
      });
      return;
    }
    if (slot.status === "unavailable") {
      res.status(503).json({
        error: "Deep Concept Studio is temporarily unavailable. Please try again in a moment.",
      });
      return;
    }

    (req as GuestGateRequest).guestSlot = { ip, deviceId, remaining: slot.remaining };
    res.on("finish", () => {
      if (res.statusCode >= 400) rollbackGuestSlot(ip, deviceId).catch(() => {});
    });
    next();
  } catch (err) {
    console.error("[ai-deep-dive] guest quota gate failed:", err);
    res.status(503).json({
      error: "Deep Concept Studio is temporarily unavailable. Please try again in a moment.",
    });
  }
}

const creditIfAuthed = requireCredit("aiChat");

function creditGate(req: Request, res: Response, next: NextFunction): void {
  if ((req as AuthedRequest).user) {
    void creditIfAuthed(req, res, next);
    return;
  }
  next();
}

const DEEP_DIVE_SYSTEM_PROMPT = `You are Veer Deep Concept & Syllabus Studio — an elite academic synthesizer and visual concept mentor powered by Google Gemini multimodal intelligence.

Your mission is to provide exhaustive, crystal-clear, multi-layered explanations of scientific and mathematical concepts for NEB Class 11 & 12 Science students.

CORE STRUCTURE FOR DEEP DIVES:
1. **Core Concept in Plain Words (The Intuition Hook)**:
   - Begin with an unforgettable real-world analogy or visual mental model before mathematical abstractions.
2. **First-Principles Breakdown**:
   - Deconstruct the concept into its fundamental axioms. Why does this phenomenon happen? What physical or mathematical constraint forces it to be true?
3. **Formal Mathematical / Chemical / Biological Formulation**:
   - Provide precise governing formulas, balanced equations, or reaction mechanisms with LaTeX formatting (\\[ ... \\] for display math, \\( ... \\) for inline terms).
   - Define every single variable and constant with its SI dimensions.
4. **CDC / NEB Syllabus Cross-Reference**:
   - Relate how this topic connects across chapters (e.g. how Electrostatics connects to Gravitation and Current Electricity in Class 12).
5. **Board Exam Traps & Misconceptions**:
   - Identify the top 2-3 mistakes students make in board exams regarding this concept (e.g. confusing electric potential with potential gradient, mixing up sign conventions).
6. **Multimodal Diagram / Figure Analysis (when image attached)**:
   - If an image or diagram is provided, thoroughly analyze every component, labelled arrow, axis, curve, or experimental setup shown.

TONE: Profoundly insightful, academic yet clear, inspiring, and scientifically precise.`;

router.post(
  "/",
  rateLimit,
  authOrGuestQuota,
  creditGate,
  async (req: Request, res: Response) => {
    try {
      const {
        topic,
        subject = "science",
        classLevel = "11",
        depth = "exam-mastery",
        images: rawImages,
      } = req.body as {
        topic?: string;
        subject?: string;
        classLevel?: string;
        depth?: "intuitive" | "exam-mastery" | "deep-synthesis";
        images?: string[];
      };

      if (!topic || typeof topic !== "string" || !topic.trim()) {
        res.status(400).json({ error: "A topic or question to deep-dive into is required." });
        return;
      }

      const cleanTopic = topic.trim().slice(0, 4000);
      const { images } = sanitizeChatImages(rawImages);
      const aiService = getService();

      const depthGuidance = {
        intuitive: "Focus on analogies, real-world intuition, visual mental models, and foundational understanding.",
        "exam-mastery": "Focus on complete CDC/NEB syllabus depth, board exam questions, precise derivations, and common exam traps.",
        "deep-synthesis": "Exhaustive first-principles breakdown, historical discovery context, advanced applications, and cross-subject synthesis.",
      }[depth] || "Balanced depth with complete conceptual and mathematical breakdown.";

      const userPrompt = `Conduct a deep conceptual breakdown of:

Topic: "${cleanTopic}"
Subject: ${subject}
Class Level: NEB ${classLevel}
Target Depth: ${depth} (${depthGuidance})
${images.length > 0 ? "Note: I have attached a photo/diagram of the question/apparatus for visual analysis." : ""}

Please unpack this concept thoroughly using the standard Deep Concept Studio structure.`;

      const messages: AIChatMessage[] = [
        { role: "system", content: DEEP_DIVE_SYSTEM_PROMPT },
        {
          role: "user",
          content: userPrompt,
          ...(images.length > 0 ? { images } : {}),
        },
      ];

      // Primary provider: Gemini (gemini-3.5-flash) — best-in-class deep synthesis & multimodal vision,
      // with automatic fallback to Groq -> Cerebras -> Agnes in the configured chain.
      const explanation = await aiService.chat("gemini", messages);

      const guestSlot = (req as GuestGateRequest).guestSlot;

      res.json({
        explanation,
        provider: aiService.getLastAnsweredBy(),
        topic: cleanTopic,
        subject,
        classLevel,
        depth,
        ...(guestSlot
          ? { remaining: guestSlot.remaining, limit: GUEST_DAILY_LIMIT }
          : {}),
      });
    } catch (err: any) {
      console.error("[ai-deep-dive] error:", err);
      const message = String(err?.message ?? "");
      if (/timeout|timed out|deadline/i.test(message)) {
        res.status(504).json({
          error: "Deep Concept Studio took too long to answer. Please try again in a moment.",
        });
        return;
      }
      serverError(res, err);
    }
  }
);

export default router;
