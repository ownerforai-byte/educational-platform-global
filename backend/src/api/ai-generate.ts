import { Router, Request, Response, NextFunction } from "express";
import { serverError } from "../middleware/errors";
import { createAIService, type AIChatMessage } from "../ai/service";
import { supabaseAdmin } from "../db/supabase";
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

const router = Router();

// Lazy init: same pattern as ai-guest.ts
let _service: ReturnType<typeof createAIService> | null = null;
function getService() {
  if (!_service) _service = createAIService();
  return _service;
}

/** Guest client IP (mirrors ai-guest.ts). */
function getClientId(req: Request): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) {
    const first = typeof forwarded === "string" ? forwarded.split(",")[0] : forwarded[0];
    if (first?.trim()) return first.trim();
  }
  return req.ip ?? "unknown";
}

type GuestGateRequest = Request & {
  guestSlot?: { ip: string; deviceId: string; remaining: number };
};

/**
 * Access gate (2026-09-27, owner decision): the quiz must work for
 * signed-OUT visitors too, but never anonymously unlimited.
 *
 *   - signed-in → attach the session user; the credit guard below bills
 *     their daily pool exactly as before,
 *   - guest     → consume ONE slot from the SAME DB-backed daily pool as
 *     guest chat (GUEST_DAILY_LIMIT/day under cookie + IP dual identity),
 *   - exhausted → 402 with a human message, storage down → 503 retryable.
 *
 * The 2026-09-25 hardening intent (no free unlimited AI) still holds — this
 * only re-opens a metered window instead of a blanket 401.
 */
async function authOrGuestQuota(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user = await getUserFromRequest(req);
    if (user) {
      (req as AuthedRequest).user = user;
      next();
      return;
    }

    const ip = getClientId(req);
    const deviceId = getGuestDeviceId(req) ?? issueGuestDeviceCookie(res);
    const slot = await consumeGuestSlot(ip, deviceId);
    if (slot.status === "limited") {
      res.status(402).json({
        error: "Daily guest limit reached",
        remaining: 0,
        limit: GUEST_DAILY_LIMIT,
        message: `You've used all ${GUEST_DAILY_LIMIT} free quiz generations for today (guest quizzes share this pool with guest chat). Your pool resets at 12:00 AM — or sign in for ${DAILY_CREDIT_POOL} daily credits and saved history.`,
      });
      return;
    }
    if (slot.status === "unavailable") {
      res.status(503).json({
        error: "Guest quiz is temporarily unavailable. Please try again in a moment.",
      });
      return;
    }

    (req as GuestGateRequest).guestSlot = { ip, deviceId, remaining: slot.remaining };
    // Any failure response means no questions were delivered → give the
    // guest's slot back (best-effort) so a broken attempt never burns it.
    res.on("finish", () => {
      if (res.statusCode >= 400) rollbackGuestSlot(ip, deviceId).catch(() => {});
    });
    next();
  } catch (err) {
    console.error("[generate-questions] guest quota gate failed:", err);
    res.status(503).json({
      error: "Guest quiz is temporarily unavailable. Please try again in a moment.",
    });
  }
}

const creditIfAuthed = requireCredit("aiChat");

/** Signed-in → daily credit pool; guest → already quota-charged above. */
function creditGate(req: Request, res: Response, next: NextFunction): void {
  if ((req as AuthedRequest).user) {
    void creditIfAuthed(req, res, next);
    return;
  }
  next();
}

interface DbSubject {
  id: string;
  slug: string;
  name: string;
  description: string | null;
}
interface DbChapter {
  id: string;
  subject_id: string;
  slug: string;
  title: string;
  description: string | null;
}
interface DbTopic {
  id: string;
  chapter_id: string;
  slug: string;
  title: string;
  description: string | null;
}

interface GeneratedQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
  difficulty: "easy" | "intermediate" | "hard";
  subject: string;
  topic: string;
  explanation: string;
}

/**
 * Return the first brace-balanced `{...}` object in `text`, honoring string
 * literals and escapes. Returns null when no complete object exists.
 */
function extractJsonObject(text: string): string | null {
  const start = text.indexOf("{");
  if (start === -1) return null;
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (ch === "\\") escaped = true;
      else if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') inString = true;
    else if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) return text.slice(start, i + 1);
    }
  }
  return null;
}

interface GenerateQuestionsResponse {
  questions: GeneratedQuestion[];
  provider: string;
  topic?: string;
  /** Guest pool only: left AFTER this generation (server-attested). */
  remaining?: number;
  /** Guest pool only: the daily limit `remaining` was measured against. */
  limit?: number;
}

router.post(
  "/",
  // Hardening 2026-09-25: anonymous UNLIMITED access was blocked.
  // 2026-09-27: guests re-admitted through the metered daily pool
  // (authOrGuestQuota) so the quiz works signed-out without reopening
  // free unlimited AI; signed-in users still pass the credit guard.
  rateLimit,
  authOrGuestQuota,
  creditGate,
  async (req: Request, res: Response) => {
    try {
      const {
        classSlug,
        subjectSlug,
        topic,
        difficulty = "intermediate",
        count = 5,
      } = req.body as {
        classSlug?: string;
        subjectSlug?: string;
        topic?: string;
        difficulty?: "easy" | "intermediate" | "hard";
        count?: number;
      };

      if (!classSlug || !subjectSlug) {
        res.status(400).json({ error: "classSlug and subjectSlug are required" });
        return;
      }

      if (!["easy", "intermediate", "hard"].includes(difficulty)) {
        res.status(400).json({ error: "difficulty must be easy, intermediate, or hard" });
        return;
      }

      const requestedCount = Math.min(Math.max(count, 1), 20);
      const aiService = getService();

      // Fetch syllabus context from Supabase with KEY TERMS extraction
      let availableTopics: string[] = [];
      let keyTermsContext = ""; // Extract key vocabulary for each topic

      try {
        // Step 1: get subject to confirm it exists
        const subjRes = await supabaseAdmin
          .from("subjects")
          .select("id, slug, name, description")
          .eq("slug", subjectSlug)
          .eq("is_active", true)
          .single();
        const subj = subjRes.data as DbSubject | null;

        // Step 2: get all chapters for this subject
        const chRes = await supabaseAdmin
          .from("chapters")
          .select("id, slug, title, description")
          .eq("subject_id", subj?.id ?? "")
          .eq("is_active", true);
        const chaptersList = (chRes.data ?? []) as DbChapter[];

        // Step 3 (perf 2026-09-25): one batched topics query instead of one
        // query per chapter (N+1 → 3 queries total for any subject size).
        const chapterIds = chaptersList.map((c) => c.id);
        let topicsList: DbTopic[] = [];
        if (chapterIds.length > 0) {
          const tpRes = await supabaseAdmin
            .from("topics")
            .select("id, slug, title, description")
            .in("chapter_id", chapterIds)
            .eq("is_active", true);
          topicsList = (tpRes.data ?? []) as DbTopic[];
        }

        keyTermsContext = "Key terms and vocabulary by topic (for question generation):\n";

        for (const tp of topicsList) {
            availableTopics.push(tp.title);

            // Build key terms context: combine topic title and description into searchable terms
            if (tp.description) {
              const terms = tp.description
                .split(/[,\s]+/)
                .filter((w) => w.length > 3)
                .map((w) => w.replace(/[^a-zA-Z0-9]/g, ""))
                .slice(0, 15)
                .join(", ");
              if (terms) {
                keyTermsContext += `\n📌 ${tp.title}: ${terms}`;
              }
            }
          }
      } catch (dbErr) {
        console.warn("DB fetch failed for generate-questions context:", dbErr);
        // Continue without DB context — AI will use general knowledge
      }

      // If Supabase has no data, fall back to a hard-coded NEB syllabus hint
      // so the AI still knows the curriculum boundaries.
      if (availableTopics.length === 0) {
        const nebFallback: Record<string, string> = {
          physics: "Kinematics, Laws of Motion, Work Energy Power, Gravitation, Thermodynamics, Oscillations, Waves, Electrostatics, Current Electricity, Magnetism, EM Induction, Optics, Modern Physics",
          chemistry: "Structure of Atom, Chemical Bonding, Thermodynamics, Equilibrium, Redox, Hydrogen, s-Block, p-Block, Organic Chemistry, Hydrocarbons, Environmental Chemistry",
          biology: "Biomolecules, Cell Biology, Plant Physiology, Human Physiology, Genetics, Evolution, Ecology, Biotechnology",
          mathematics: "Sets, Relations, Trigonometry, Limits, Derivatives, Integrals, Vectors, Probability, Statistics, Binary System",
        };
        const fallback = nebFallback[subjectSlug];
        if (fallback) {
          availableTopics = fallback.split(", ").map((t) => t.trim());
        }
      }

      // If a specific topic was requested, narrow the prompt
      const topicContext = topic
        ? `\n\nThe user wants questions specifically about the topic: "${topic}".` +
          ` Treat this topic as authoritative — it may come from anywhere on the platform (notes, labs, derivations, PYQ banks), even when it is not in the syllabus list below.` +
          (availableTopics.length > 0
            ? `\nSyllabus topics for subject context: ${availableTopics.slice(0, 30).join(", ")}`
            : "")
        : `\n\nGenerate a balanced mix across the subject's topics.` +
          (availableTopics.length > 0
            ? `\nAvailable topics: ${availableTopics.slice(0, 30).join(", ")}`
            : "");

      const difficultyInstructions: Record<string, string> = {
        easy: `Focus on: basic definitions, recall, identification, and straightforward application. Questions should test foundational understanding. Use simple language. Aim for 1-2 step reasoning.`,
        intermediate: `Focus on: concept application, comparisons, calculations, and multi-step reasoning. Questions should require understanding relationships between ideas. Use moderate language complexity. Aim for 2-3 step reasoning.`,
        hard: `Focus on: synthesis, analysis, evaluation, and complex problem-solving. Include numerical problems, case-based questions, and questions that require connecting multiple concepts. Use precise scientific language. Aim for 3+ step reasoning.`,
      };

      const systemPrompt = `You are an expert NEB (+2) exam question setter for Nepalese science students. You generate high-quality multiple-choice questions from MULTIPLE SOURCES — not just textbooks.

**SOURCES TO COMBINE:**
1. **Internal** — Syllabus topics, definitions, formulas from NEB curriculum
2. **External** — Real-world phenomena, current events, news, technology, nature
3. **Applied** — Practical scenarios, case studies, everyday observations

**QUESTION STYLE VARIETY** — Each question must use a DIFFERENT approach:
- Type A: Direct definition (What is X?)
- Type B: Application (How does X work in real life?)
- Type C: Scenario-based (In a situation where...)
- Type D: Comparison (X vs Y — which is correct?)
- Type E: Problem-solving (Given..., find...)
- Type F: True/False with reasoning

Randomly mix these types. Do NOT use the same style twice in a row.

OUTPUT FORMAT — Return ONLY valid JSON, no markdown:
{
  "questions": [
    {
      "prompt": "The question text",
      "options": ["A", "B", "C", "D"],
      "correctIndex": 0,
      "difficulty": "intermediate",
      "subject": "Physics",
      "topic": "Topic Name",
      "explanation": "Short, accurate answer — 1-2 sentences max"
    }
  ]
}

RULES:
- 4 options per question, correctIndex is 0-based
- Each question MUST have one, and only one, definitively correct answer (no ambiguity).
- Explanation: SHORT + ACCURATE — state why the correct answer is 100% right, briefly explain why others are wrong.
- **DENSE, SHORT STEMS (core style rule)**: pack 2–3 DISTINCT details of the topic into every question — e.g. a condition + a data point + the relationship being tested, or a term + a context + its consequence. One question = several linked ideas about the concept, never a bare single fact.
- **SHORT GRAMMAR**: exam-terse phrasing. Max 2 sentences in the stem. Cut all filler — no "Which of the following…", no restating the topic name, no preamble. Options stay 2–8 words with parallel grammar.
- A student who merely READS the question (before answering) should walk away with extra ideas about the concept — the stem and options together teach related facts.
- Rotate through different question styles each generation
- Include key technical terms from the syllabus
- **NO CONFLICTING CONCEPTS**: Ensure no ambiguity in options or explanations
- **COMPLETE COVERAGE**: Each question reinforces ALL relevant concepts for that sub-topic`;

      const userPrompt = `Generate ${requestedCount} NEB (+2) multiple-choice questions.

Class: ${classSlug}
Subject: ${subjectSlug}
Difficulty: ${difficulty}
${topicContext}

${difficultyInstructions[difficulty]}

${keyTermsContext ? `KEY TERMS FROM SYLLABUS:\n${keyTermsContext}` : "Use standard syllabus terminology."}

**INSTRUCTIONS:**
1. Draw from BOTH internal (syllabus) AND external (real-world) sources
2. Use DIFFERENT question styles for each question (definition, scenario, application, comparison, problem-solving)
3. Keep explanations SHORT and ACCURATE — max 2 sentences, state WHY correct and WHY wrong
4. Include at least one key term in every question
5. Mix easy, intermediate, and hard questions based on difficulty setting
6. **ABSOLUTE CLARITY**: Every question must have one, and only one, 100% correct answer. No ambiguous options.
7. **COMPREHENSIVE COVERAGE**: Each question should reinforce all relevant concepts for that sub-topic, acting as a mini-lesson.
8. **2–3 DETAILS PER QUESTION, SHORT GRAMMAR**: every stem carries 2–3 concrete details of the topic (values, conditions, linked ideas) in terse exam grammar — reading the question itself must give the student more ideas about the concept.
9. **ANY TOPIC**: when a specific topic is requested it is authoritative — generate questions directly about it, even if it sits outside the syllabus lists above.
10. **FORMAT**: return ONLY the JSON object described in the system prompt — no markdown fences, no commentary.

**EXAMPLE Question Styles:**
- Definition: "What is the unit of electric current?"
- Application: "A bulb glows because of heating effect. Which principle explains this?"
- Scenario: "You drop a stone from a cliff. After 2 seconds, how far has it fallen?"
- Comparison: "Which has greater momentum — a fast bullet or a slow truck?"
- Problem: "If velocity = 10 m/s and time = 5s, find distance using v = d/t."
`;

      const messages: AIChatMessage[] = [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ];

      const rawResponse = await aiService.chat(
        "", // run the ordered chain: agnes → openrouter → internal
        messages
      );

      // Parse JSON from potential markdown-wrapped / prose-wrapped replies.
      // Brace-balanced extraction survives ``` fences, leading chatter and
      // extra braces inside explanation strings (the old greedy match broke
      // on those and surfaced as "AI returned invalid question format").
      const jsonStr = extractJsonObject(rawResponse);

      let parsed: { questions: GeneratedQuestion[] } | null = null;
      if (jsonStr) {
        try {
          parsed = JSON.parse(jsonStr);
        } catch {
          parsed = null;
        }
      }

      if (!parsed) {
        res.status(502).json({
          error: "Veer returned invalid question format",
          raw: rawResponse.slice(0, 500),
        });
        return;
      }

      if (!Array.isArray(parsed.questions) || parsed.questions.length === 0) {
        res.status(502).json({ error: "Veer returned no questions", raw: rawResponse.slice(0, 500) });
        return;
      }

      // Validate and normalise each question
      const questions: GeneratedQuestion[] = parsed.questions
        .filter((q) => q && typeof q.prompt === "string" && Array.isArray(q.options))
        .slice(0, requestedCount)
        .map((q) => ({
          prompt: q.prompt.trim(),
          options: (q.options as string[]).map((o) => o.trim()).slice(0, 4),
          correctIndex: Math.min(3, Math.max(0, Number(q.correctIndex) ?? 0)),
          difficulty: (q.difficulty as GeneratedQuestion["difficulty"]) ?? difficulty,
          subject: (q.subject as string) ?? subjectSlug,
          topic: (q.topic as string) ?? topic ?? "General",
          explanation: (q.explanation as string) ?? "",
        }));

      const guestSlot = (req as GuestGateRequest).guestSlot;

      res.json({
        questions,
        provider: aiService.getLastAnsweredBy(),
        topic: topic ?? undefined,
        // Guests get the server-attested pool so the UI mirror can never
        // show MORE than what is actually left (refresh cannot fake it).
        ...(guestSlot
          ? { remaining: guestSlot.remaining, limit: GUEST_DAILY_LIMIT }
          : {}),
      } satisfies GenerateQuestionsResponse);
    } catch (err: any) {
      console.error("AI generate-questions error:", err);
      serverError(res, err);
    }
  }
);

export default router;
