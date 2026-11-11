import { Router, Request, Response } from "express";
import { serverError } from "../../middleware/errors";
import { rateLimit } from "../../middleware/rateLimit";
import { createAIService, type AIChatMessage } from "../../ai/service";
import { getWorkLaneProvider } from "../../ai/config";
import { ANSWER_GUIDE_RULES } from "../../ai/answer-guide";
import { answerTierRules } from "../../ai/prompts";
import { aiSparkTierFor } from "../../utils/aiSpark";
import type { AuthedRequest } from "../../middleware/auth";
import {
  authOrGuestQuota,
  extractJsonObject,
  QUIZ_FORMATS,
  type QuizFormat,
} from "./generate.controller";
import { aiSparkGateIfAuthed, requirePlusAiStudio } from "../../middleware/aiSparkGate";

/**
 * POST /api/ai/evaluate-answers (plan.md §11.2).
 *
 * Grades learner answers for EVERY writing format (fill-blank, short-answer,
 * long-answer — and MCQ/true-false when a learner wants richer feedback) and
 * returns per-item { score, verdict, feedback, modelAnswer, improvements[] }
 * plus an overall submission summary.
 *
 * Access: the exact same gates as generate-questions — `rateLimit`,
 * `authOrGuestQuota` (guest → shared AI spark trial pool), `aiSparkGateIfAuthed`
 * for signed-in tiers. Module 2 adds NO new gate (plan.md §11.2).
 */

const router = Router();

// Lazy init: same pattern as ai-generate.ts
let _service: ReturnType<typeof createAIService> | null = null;
function getService() {
  if (!_service) _service = createAIService();
  return _service;
}

interface EvaluateItem {
  prompt: string;
  userAnswer: string;
  modelAnswer?: string;
  rubric?: string[];
  acceptedAnswers?: string[];
  maxScore?: number;
}

interface EvaluatedAnswer {
  score: number;
  verdict: "correct" | "partial" | "incorrect";
  feedback: string;
  modelAnswer: string;
  improvements: string[];
}

const MAX_ITEMS = 20;

router.post(
  "/",
  rateLimit,
  requirePlusAiStudio(),
  authOrGuestQuota,
  aiSparkGateIfAuthed,
  async (req: Request, res: Response) => {
    try {
      const {
        classSlug,
        subjectSlug,
        topic,
        format = "short-answer",
        items,
      } = req.body as {
        classSlug?: string;
        subjectSlug?: string;
        topic?: string;
        format?: QuizFormat;
        items?: EvaluateItem[];
      };

      if (!classSlug || !subjectSlug) {
        res.status(400).json({ error: "classSlug and subjectSlug are required" });
        return;
      }

      if (!QUIZ_FORMATS.includes(format)) {
        res.status(400).json({
          error: `format must be one of: ${QUIZ_FORMATS.join(", ")}`,
        });
        return;
      }

      if (!Array.isArray(items) || items.length === 0) {
        res.status(400).json({ error: "items must be a non-empty array" });
        return;
      }

      const cleanItems: EvaluateItem[] = items
        .filter(
          (it) =>
            it &&
            typeof it.prompt === "string" &&
            it.prompt.trim().length > 0 &&
            typeof it.userAnswer === "string"
        )
        .slice(0, MAX_ITEMS)
        .map((it) => ({
          prompt: it.prompt.trim(),
          userAnswer: it.userAnswer.trim(),
          modelAnswer:
            typeof it.modelAnswer === "string" ? it.modelAnswer.trim() : undefined,
          rubric: Array.isArray(it.rubric)
            ? it.rubric.map((r) => String(r).trim()).filter(Boolean)
            : undefined,
          acceptedAnswers: Array.isArray(it.acceptedAnswers)
            ? it.acceptedAnswers.map((a) => String(a).trim()).filter(Boolean)
            : undefined,
          maxScore: Number.isFinite(Number(it.maxScore))
            ? Math.min(10, Math.max(1, Number(it.maxScore)))
            : undefined,
        }));

      if (cleanItems.length === 0) {
        res.status(400).json({ error: "items must contain prompt and userAnswer" });
        return;
      }

      const systemPrompt = `You are an expert NEB (+2) examiner grading student answers for Nepalese science students.

For EACH item, grade the learner's answer against the ideal answer (when given) and the marking points (when given). Be strict but fair: award credit for equivalent phrasing, correct symbols, and right reasoning even when wording differs.

OUTPUT FORMAT — Return ONLY valid JSON, no markdown:
{
  "results": [
    {
      "score": 0,
      "verdict": "correct",
      "feedback": "2-3 sentences: what the answer got right, what it missed, and why",
      "modelAnswer": "The ideal answer — use the provided model answer when present, otherwise write one",
      "improvements": ["one concrete improvement", "another concrete improvement"]
    }
  ],
  "summary": "2-3 sentence overall feedback for the whole submission"
}

RULES:
- One "results" entry per item, IN THE SAME ORDER as the input items.
- "score" is 0-100 for the item.
- "verdict" is exactly one of: "correct" (>=80), "partial" (30-79), "incorrect" (<30).
- "feedback" must reference the SPECIFIC content of the answer — never generic praise.
- "improvements" lists 1-3 actionable steps; empty array only when the answer is perfect.
- For fill-blank items, accept any string in "acceptedAnswers" as correct (case-insensitive, ignore punctuation and extra spaces).
- "summary" comments on the submission as a whole — strengths plus the top thing to fix next.

${ANSWER_GUIDE_RULES}\n\n${answerTierRules(aiSparkTierFor((req as Partial<AuthedRequest>).user))}`;

      const payload = cleanItems.map((it, i) => ({
        index: i + 1,
        prompt: it.prompt,
        learnerAnswer: it.userAnswer || "(left blank)",
        modelAnswer: it.modelAnswer ?? null,
        markingPoints: it.rubric ?? null,
        acceptedAnswers: it.acceptedAnswers ?? null,
        maxScore: it.maxScore ?? null,
      }));

      const userPrompt = `Grade the following ${cleanItems.length} answer(s).

Class: ${classSlug}
Subject: ${subjectSlug}
Format: ${format}${topic ? `\nTopic: ${topic}` : ""}

ITEMS:
${JSON.stringify(payload, null, 2)}

**FORMAT:** return ONLY the JSON object described in the system prompt — no markdown fences, no commentary.`;

      const messages: AIChatMessage[] = [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ];

      // AI marking owns the Gemini lane (long-context rubric work — owner
      // 2026-10-25); falls back to the ordered chain when Gemini is unconfigured.
      const rawResponse = await getService().chat(
        getWorkLaneProvider("evaluate"),
        messages
      );
      const jsonStr = extractJsonObject(rawResponse);

      let parsed: {
        results?: EvaluatedAnswer[];
        summary?: string;
      } | null = null;
      if (jsonStr) {
        try {
          parsed = JSON.parse(jsonStr);
        } catch {
          parsed = null;
        }
      }

      if (!parsed || !Array.isArray(parsed.results) || parsed.results.length === 0) {
        res.status(502).json({
          error: "Veer returned invalid evaluation format",
          raw: rawResponse.slice(0, 500),
        });
        return;
      }

      // Normalise each result and pad/truncate to the input length so the
      // client can zip results with its own question list safely.
      const results: EvaluatedAnswer[] = cleanItems.map((it, i) => {
        const r = parsed?.results?.[i];
        const rawScore = Number(r?.score);
        const score = Number.isFinite(rawScore)
          ? Math.min(100, Math.max(0, Math.round(rawScore)))
          : 0;
        const verdict: EvaluatedAnswer["verdict"] =
          r?.verdict === "correct" || r?.verdict === "partial" || r?.verdict === "incorrect"
            ? r.verdict
            : score >= 80
            ? "correct"
            : score >= 30
            ? "partial"
            : "incorrect";
        return {
          score,
          verdict,
          feedback:
            typeof r?.feedback === "string" && r.feedback.trim()
              ? r.feedback.trim()
              : "No detailed feedback was returned for this answer.",
          modelAnswer:
            typeof r?.modelAnswer === "string" && r.modelAnswer.trim()
              ? r.modelAnswer.trim()
              : it.modelAnswer ?? "",
          improvements: Array.isArray(r?.improvements)
            ? r!.improvements.map((s) => String(s).trim()).filter(Boolean).slice(0, 3)
            : [],
        };
      });

      res.json({
        results,
        summary:
          typeof parsed.summary === "string" && parsed.summary.trim()
            ? parsed.summary.trim()
            : "Submission graded.",
      });
    } catch (err: unknown) {
      console.error("AI evaluate-answers error:", err);
      serverError(res, err);
    }
  }
);

export default router;
