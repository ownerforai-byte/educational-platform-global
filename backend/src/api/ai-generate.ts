import { Router, Request, Response } from "express";
import { createAIService, type AIChatMessage } from "../ai/service";
import { supabaseAdmin } from "../db/supabase";
import { rateLimit } from "../middleware/rateLimit";

const router = Router();

// Lazy init: same pattern as ai-guest.ts
let _service: ReturnType<typeof createAIService> | null = null;
function getService() {
  if (!_service) _service = createAIService();
  return _service;
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

interface GenerateQuestionsResponse {
  questions: GeneratedQuestion[];
  provider: string;
  topic?: string;
}

router.post(
  "/",
  rateLimit,
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

      // Fetch syllabus context from Supabase
      let subjectContext = "";
      let chapterContext = "";
      let availableTopics: string[] = [];

      try {
        // Step 1: get subject to confirm it exists and get its name
        const subjRes = await supabaseAdmin
          .from("subjects")
          .select("id, slug, name, description")
          .eq("slug", subjectSlug)
          .eq("is_active", true)
          .single();
        const subj = subjRes.data as DbSubject | null;
        if (subj) {
          subjectContext = `Subject: ${subj.name}\nDescription: ${subj.description ?? "N/A"}`;
        }

        // Step 2: get all chapters for this subject
        const chRes = await supabaseAdmin
          .from("chapters")
          .select("id, slug, title, description")
          .eq("subject_id", subj?.id ?? "")
          .eq("is_active", true);
        const chaptersList = (chRes.data ?? []) as DbChapter[];

        chapterContext = "Chapters and topics in this subject:\n";
        for (const ch of chaptersList) {
          chapterContext += `\n📖 ${ch.title}`;
          if (ch.description) chapterContext += `\n   ${ch.description}`;

          const tpRes = await supabaseAdmin
            .from("topics")
            .select("id, slug, title, description")
            .eq("chapter_id", ch.id)
            .eq("is_active", true);
          const topicsList = (tpRes.data ?? []) as DbTopic[];
          for (const tp of topicsList) {
            chapterContext += `\n   • ${tp.title}${tp.description ? ` — ${tp.description}` : ""}`;
            availableTopics.push(tp.title);
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
          chapterContext = `Subject: ${subjectSlug}\nTopics to cover: ${fallback}`;
        }
      }

      // If a specific topic was requested, narrow the prompt
      const topicContext = topic
        ? `\n\nThe user wants questions specifically about the topic: "${topic}".` +
          (availableTopics.length > 0
            ? `\nAvailable topics to choose from: ${availableTopics.slice(0, 30).join(", ")}`
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

      const systemPrompt = `You are an expert NEB (+2) exam question setter for Nepalese science students. You generate high-quality multiple-choice questions aligned with the Nepal Education Board curriculum.

OUTPUT FORMAT — Return ONLY valid JSON, no markdown, no explanation before or after:
{
  "questions": [
    {
      "prompt": "The question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "difficulty": "easy",
      "subject": "Physics",
      "topic": "Topic Name",
      "explanation": "Clear explanation of why the answer is correct"
    }
  ]
}

RULES:
- Each question has exactly 4 options
- correctIndex is 0-based (0=A, 1=B, 2=C, 3=D)
- The correct answer must be unambiguously right
- Explanation should be 1-2 sentences, clear and educational
- Topics should match NEB (+2) curriculum accurately
- Never reuse the exact same question across difficulties`;

      const userPrompt = `Generate ${requestedCount} NEB (+2) multiple-choice questions.

Class: ${classSlug}
Subject: ${subjectSlug}
Difficulty: ${difficulty}
${topicContext}

${difficultyInstructions[difficulty]}`;

      const messages: AIChatMessage[] = [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ];

      const rawResponse = await aiService.chat(
        aiService.getDefaultProvider(),
        messages
      );

      // Parse JSON from potential markdown-wrapped response
      let jsonStr = rawResponse.trim();
      const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
      if (jsonMatch) jsonStr = jsonMatch[0];

      let parsed: { questions: GeneratedQuestion[] };
      try {
        parsed = JSON.parse(jsonStr);
      } catch {
        res.status(502).json({
          error: "AI returned invalid question format",
          raw: rawResponse.slice(0, 500),
        });
        return;
      }

      if (!Array.isArray(parsed.questions) || parsed.questions.length === 0) {
        res.status(502).json({ error: "AI returned no questions", raw: rawResponse.slice(0, 500) });
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

      res.json({
        questions,
        provider: aiService.getDefaultProvider(),
        topic: topic ?? undefined,
      } satisfies GenerateQuestionsResponse);
    } catch (err: any) {
      console.error("AI generate-questions error:", err);
      res.status(500).json({ error: err.message || "Question generation failed" });
    }
  }
);

export default router;
