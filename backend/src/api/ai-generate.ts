import { Router, Request, Response, NextFunction } from "express";
import { serverError } from "../middleware/errors";
import { createAIService, type AIChatMessage } from "../ai/service";
import { getWorkLaneProvider } from "../ai/config";
import { ANSWER_GUIDE_RULES } from "../ai/answer-guide";
import { aiSparkTierFor } from "../utils/aiSpark";
import { answerTierRules } from "../ai/prompts";
import { supabaseAdmin } from "../db/supabase";
import { rateLimit } from "../middleware/rateLimit";
import { getUserFromRequest, type AuthedRequest } from "../middleware/auth";
import { aiSparkGateIfAuthed, requirePlusAiStudio } from "../middleware/aiSparkGate";
import {
  GUEST_DAILY_LIMIT,
  consumeGuestSlot,
  getGuestDeviceId,
  issueGuestDeviceCookie,
  rollbackGuestSlot,
} from "../utils/guestQuota";
import { signInForMoreAiSparkMessage } from "../utils/aiSparkCopy";
import { getClientIp } from "../utils/clientIp";

const router = Router();

// Lazy init: same pattern as ai-guest.ts
let _service: ReturnType<typeof createAIService> | null = null;
function getService() {
  if (!_service) _service = createAIService();
  return _service;
}

type GuestGateRequest = Request & {
  guestSlot?: { ip: string; deviceId: string; remaining: number };
};

/**
 * Access gate (2026-09-27, owner decision): the quiz must work for
 * signed-OUT visitors too, but never anonymously unlimited.
 *
 *   - signed-in → attach the session user; AI spark gate bills per message,
 *   - guest     → consume ONE slot from the SAME DB-backed daily pool as
 *     guest chat (GUEST_DAILY_LIMIT/day under cookie + IP dual identity),
 *   - exhausted → 402 with a human message, storage down → 503 retryable.
 *
 * The 2026-09-25 hardening intent (no free unlimited AI) still holds — this
 * only re-opens a metered window instead of a blanket 401.
 */
export async function authOrGuestQuota(req: Request, res: Response, next: NextFunction): Promise<void> {
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
        message: signInForMoreAiSparkMessage(
          "You've used your free trial for today (guest chat and quizzes share the same AI spark pool).",
        ),
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
  /** Per-option rationale. Keys `A`..`D`, same order as `options`. Absent fall back to the shared `explanation`. */
  optionAnalysis?: Record<string, string>;
  /** Which format this item belongs to (absent → `mcq`). */
  format?: QuizFormat;
  /** `fill-blank`: acceptable answer strings (case-insensitive match). */
  acceptedAnswers?: string[];
  /** Writing formats: the ideal answer the AI grades against. */
  modelAnswer?: string;
  /** Writing formats: marking points the AI grades against. */
  rubric?: string[];
  /** Writing formats: maximum marks for the item. */
  maxScore?: number;
}

/* ── Quiz formats (plan.md §11) ────────────────────────────────────────
 * MCQ keeps its battle-tested prompt verbatim (back-compat). The other four
 * formats get their own prompt templates and response schemas below.
 */
export const QUIZ_FORMATS = [
  "mcq",
  "true-false",
  "fill-blank",
  "short-answer",
  "long-answer",
] as const;
export type QuizFormat = (typeof QUIZ_FORMATS)[number];

const WRITING_OUTPUT_SCHEMAS: Record<Exclude<QuizFormat, "mcq">, string> = {
  "true-false": `{
  "questions": [
    {
      "prompt": "One factual statement to judge (max 2 sentences, 2-3 linked details)",
      "options": ["True", "False"],
      "correctIndex": 0,
      "difficulty": "intermediate",
      "subject": "Physics",
      "topic": "Topic Name",
      "explanation": "Why the statement is true or false — 1-2 sentences",
      "optionAnalysis": {
        "A": "Reason the statement is True (or why choosing True is wrong)",
        "B": "Reason the statement is False (or why choosing False is wrong)"
      }
    }
  ]
}`,
  "fill-blank": `{
  "questions": [
    {
      "prompt": "A statement with exactly one ____ gap to fill",
      "acceptedAnswers": ["canonical answer", "acceptable variant"],
      "difficulty": "intermediate",
      "subject": "Physics",
      "topic": "Topic Name",
      "explanation": "Why that word/phrase completes the statement — 1-2 sentences"
    }
  ]
}`,
  "short-answer": `{
  "questions": [
    {
      "prompt": "A question answerable in 2-6 sentences",
      "modelAnswer": "The ideal short answer a top student would write",
      "rubric": ["marking point 1", "marking point 2", "marking point 3"],
      "maxScore": 5,
      "difficulty": "intermediate",
      "subject": "Physics",
      "topic": "Topic Name",
      "explanation": "One-line answer summary"
    }
  ]
}`,
  "long-answer": `{
  "questions": [
    {
      "prompt": "An essay / derivation / numerical with full working prompt",
      "modelAnswer": "A complete model answer — structured, step-by-step where relevant",
      "rubric": ["marking point 1", "marking point 2", "marking point 3", "marking point 4"],
      "maxScore": 10,
      "difficulty": "intermediate",
      "subject": "Physics",
      "topic": "Topic Name",
      "explanation": "One-line answer summary"
    }
  ]
}`,
};

function buildFormatSystemPrompt(format: Exclude<QuizFormat, "mcq">): string {
  const kindLabel =
    format === "true-false"
      ? "true/false judgement questions"
      : format === "fill-blank"
      ? "fill-in-the-blank questions"
      : format === "short-answer"
      ? "short-answer writing questions"
      : "long-answer writing-test questions";

  const formatRules: Record<Exclude<QuizFormat, "mcq">, string> = {
    "true-false": `- Each item is ONE statement that is definitively true or false — never ambiguous, never partly true.
- "options" is exactly ["True", "False"] and "correctIndex" is 0 (True) or 1 (False).
- Balance the set: roughly half true, half false; never let the answer pattern leak (no three Trues in a row).
- optionAnalysis keys are \`A\` (True) and \`B\` (False): explain the fact that decides the judgement.
- The statement must still pack 2-3 linked details so reading it teaches the concept.`,
    "fill-blank": `- Each prompt has exactly one ____ gap testing a KEY TERM, value, or formula part — never trivial words.
- "acceptedAnswers" lists 2-4 acceptable strings (canonical first): common synonyms, casing variants, symbol forms.
- Keep the rest of the statement fully self-contained so the gap is the only missing piece.
- No options, no correctIndex.`,
    "short-answer": `- Questions demand 2-6 sentences of recall + explanation — definitions with reasoning, short derivations, compare/contrast.
- "modelAnswer" is the ideal response a top student would write (concise, syllabus-accurate).
- "rubric" lists 3-5 concrete marking points the grader awards credit for.
- "maxScore" is 5.
- No options, no correctIndex.`,
    "long-answer": `- Questions are essay / full derivation / multi-step numerical prompts worthy of a writing test.
- "modelAnswer" is a complete structured answer with the working shown.
- "rubric" lists 5-8 marking points covering method, steps, and final result.
- "maxScore" is 10.
- No options, no correctIndex.`,
  };

  return `You are an expert NEB (+2) exam question setter for Nepalese science students. You generate high-quality ${kindLabel} from MULTIPLE SOURCES — not just textbooks.

**SOURCES TO COMBINE:**
1. **Internal** — Syllabus topics, definitions, formulas from NEB curriculum
2. **External** — Real-world phenomena, current events, news, technology, nature
3. **Applied** — Practical scenarios, case studies, everyday observations

OUTPUT FORMAT — Return ONLY valid JSON, no markdown:
${WRITING_OUTPUT_SCHEMAS[format]}

RULES:
${formatRules[format]}
- **DENSE, SHORT STEMS**: pack 2-3 DISTINCT details of the topic into every prompt (a condition + a data point + the relationship being tested). Max 2 sentences.
- Keep every generated field syllabus-accurate; the model answer and rubric must match the NEB curriculum.
- Rotate question styles across the set (definition, scenario, application, comparison, problem-solving).
- **NO CONFLICTING CONCEPTS**: every item has one defensible answer direction.
- Include key technical terms from the syllabus.`;
}

function buildFormatUserPrompt(
  format: Exclude<QuizFormat, "mcq">,
  ctx: {
    requestedCount: number;
    classSlug: string;
    subjectSlug: string;
    difficulty: string;
    topicContext: string;
    difficultyInstruction: string;
    keyTermsContext: string;
  }
): string {
  return `Generate ${ctx.requestedCount} NEB (+2) ${format} questions.

Class: ${ctx.classSlug}
Subject: ${ctx.subjectSlug}
Difficulty: ${ctx.difficulty}
${ctx.topicContext}

${ctx.difficultyInstruction}

${ctx.keyTermsContext ? `KEY TERMS FROM SYLLABUS:\n${ctx.keyTermsContext}` : "Use standard syllabus terminology."}

**INSTRUCTIONS:**
1. Draw from BOTH internal (syllabus) AND external (real-world) sources
2. Use DIFFERENT question styles for each question (definition, scenario, application, comparison, problem-solving)
3. Keep explanations SHORT and ACCURATE — max 2 sentences
4. Include at least one key term in every question
5. **ABSOLUTE CLARITY**: every item must have one defensible answer; no ambiguity
6. **2-3 DETAILS PER QUESTION, SHORT GRAMMAR**: every stem carries 2-3 concrete details of the topic in terse exam grammar
7. **ANY TOPIC**: when a specific topic is requested it is authoritative — generate questions directly about it, even outside the syllabus lists above
8. **FORMAT**: return ONLY the JSON object described in the system prompt — no markdown fences, no commentary.`;
}

/**
 * Return the first brace-balanced `{...}` object in `text`, honoring string
 * literals and escapes. Returns null when no complete object exists.
 */
export function extractJsonObject(text: string): string | null {
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
  topic?: string;
  /** Guest pool only: left AFTER this generation (server-attested). */
  remaining?: number;
  /** Guest pool only: the daily limit `remaining` was measured against. */
  limit?: number;
}

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
        difficulty = "intermediate",
        count = 5,
        format = "mcq",
      } = req.body as {
        classSlug?: string;
        subjectSlug?: string;
        topic?: string;
        difficulty?: "easy" | "intermediate" | "hard";
        count?: number;
        format?: QuizFormat;
      };

      if (!classSlug || !subjectSlug) {
        res.status(400).json({ error: "classSlug and subjectSlug are required" });
        return;
      }

      if (!["easy", "intermediate", "hard"].includes(difficulty)) {
        res.status(400).json({ error: "difficulty must be easy, intermediate, or hard" });
        return;
      }

      if (!QUIZ_FORMATS.includes(format)) {
        res.status(400).json({
          error: `format must be one of: ${QUIZ_FORMATS.join(", ")}`,
        });
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

      const systemPromptBody =
        format === "mcq"
          ? `You are an expert NEB (+2) exam question setter for Nepalese science students. You generate high-quality multiple-choice questions from MULTIPLE SOURCES — not just textbooks.

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
      "explanation": "Short, accurate answer — 1-2 sentences max",          "optionAnalysis": {
        "A": "Correct — the reduced model keeps only the regressor that is statistically significant.",
        "B": "Wrong — this is the full model, which keeps every regressor regardless of significance.",
        "C": "Wrong — forward or backward stepwise fitting is a selection strategy, not a formal model comparison test.",
        "D": "Wrong — a partial F-test or t-test compares nested models, not the full model against an arbitrary subset."
      }
    }
  ]
}

RULES:
- 4 options per question, correctIndex is 0-based
- Each question MUST have one, and only one, definitively correct answer (no ambiguity).
- Output a per-option analysis: an \`optionAnalysis\` object keyed by the letter of each option (\`A\`..\`D\`, same order as \`options\`). For the correct option, give a one-clause reason it is 100% right. For every wrong option, give a one-clause reason it is wrong (what misconception or fact it gets wrong). If a separate overall \`explanation\` is also provided, the per-option lines must still each carry a real reason — do not just repeat the explanation.
- **DENSE, SHORT STEMS (core style rule)**: pack 2–3 DISTINCT details of the topic into every question — e.g. a condition + a data point + the relationship being tested, or a term + a context + its consequence. One question = several linked ideas about the concept, never a bare single fact.
- **SHORT GRAMMAR**: exam-terse phrasing. Max 2 sentences in the stem. Cut all filler — no "Which of the following…", no restating the topic name, no preamble. Options stay 2–8 words with parallel grammar.
- A student who merely READS the question (before answering) should walk away with extra ideas about the concept — the stem and options together teach related facts.
- Rotate through different question styles each generation
- Include key technical terms from the syllabus
- **NO CONFLICTING CONCEPTS**: Ensure no ambiguity in options or explanations
- **COMPLETE COVERAGE**: Each question reinforces ALL relevant concepts for that sub-topic`
          : buildFormatSystemPrompt(format);

      // Owner 2026-10-27: every AI surface — including question generation —
      // follows the ANSWER GUIDE (valid by a human, natural, full of idea).
      const user = await getUserFromRequest(req);
      const tier = aiSparkTierFor(user);
      const systemPrompt = `${systemPromptBody}\n\n${ANSWER_GUIDE_RULES}\n\n${answerTierRules(tier)}`;

      const userPrompt =
        format === "mcq"
          ? `Generate ${requestedCount} NEB (+2) multiple-choice questions.

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
`
          : buildFormatUserPrompt(format, {
              requestedCount,
              classSlug,
              subjectSlug,
              difficulty,
              topicContext,
              difficultyInstruction: difficultyInstructions[difficulty],
              keyTermsContext,
            });

      const messages: AIChatMessage[] = [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ];

      // Quiz generation owns the Cerebras lane (one key per work type — owner
      // 2026-10-25), with the ordered chain as fallback when it is unconfigured.
      const rawResponse = await aiService.chat(
        getWorkLaneProvider("quiz-generate"),
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

      // Validate and normalise each question — shape depends on the format.
      const questions: GeneratedQuestion[] = parsed.questions
        .filter((q) =>
          q &&
          typeof q.prompt === "string" &&
          q.prompt.trim().length > 0 &&
          // MCQ/true-false items must come with a usable option set; writing
          // formats are free-text and legitimately carry no options.
          (format === "mcq"
            ? Array.isArray(q.options) && q.options.length >= 2
            : true)
        )
        .slice(0, requestedCount)
        .map((q) => {
          const base = {
            prompt: q.prompt.trim(),
            difficulty: (q.difficulty as GeneratedQuestion["difficulty"]) ?? difficulty,
            subject: (q.subject as string) ?? subjectSlug,
            topic: (q.topic as string) ?? topic ?? "General",
            explanation: (q.explanation as string) ?? "",
            format,
          };

          if (format === "mcq") {
            return {
              ...base,
              options: Array.isArray(q.options)
                ? (q.options as string[]).map((o) => String(o).trim()).slice(0, 4)
                : [],
              correctIndex: Math.min(3, Math.max(0, Number(q.correctIndex) || 0)),
              optionAnalysis:
                (q.optionAnalysis as Record<string, string> | undefined) ?? undefined,
            };
          }

          if (format === "true-false") {
            return {
              ...base,
              options: ["True", "False"],
              correctIndex: Number(q.correctIndex) === 1 ? 1 : 0,
              optionAnalysis:
                (q.optionAnalysis as Record<string, string> | undefined) ?? undefined,
            };
          }

          if (format === "fill-blank") {
            return {
              ...base,
              options: [],
              correctIndex: -1,
              acceptedAnswers: Array.isArray(q.acceptedAnswers)
                ? (q.acceptedAnswers as string[])
                    .map((a) => String(a).trim())
                    .filter(Boolean)
                    .slice(0, 4)
                : q.explanation
                ? [String(q.explanation).trim()]
                : [],
            };
          }

          // short-answer / long-answer — writing formats graded by the AI.
          return {
            ...base,
            options: [],
            correctIndex: -1,
            modelAnswer: (q.modelAnswer as string | undefined) ?? q.explanation ?? "",
            rubric: Array.isArray(q.rubric)
              ? (q.rubric as string[]).map((r) => String(r).trim()).filter(Boolean)
              : [],
            maxScore:
              format === "long-answer"
                ? 10
                : 5,
          };
        });

      // Nothing usable survived validation → same 502 contract as before.
      if (questions.length === 0) {
        res.status(502).json({ error: "Veer returned no questions", raw: rawResponse.slice(0, 500) });
        return;
      }

      const guestSlot = (req as GuestGateRequest).guestSlot;

      res.json({
        questions,
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
