import { createHash, randomUUID } from "node:crypto";
import { z } from "zod";
import { supabaseAdmin } from "../../db/supabase";
import { AppError } from "../../middleware/error-handler";
import { MAX_VERIFIED_QUESTIONS } from "../../utils/xp";

/** Server-issued quiz attempts are valid for one hour and can be consumed once. */
export const QUIZ_ATTEMPT_TTL_MS = 60 * 60 * 1000;

export const QUIZ_ATTEMPT_FORMATS = [
  "mcq",
  "true-false",
  "fill-blank",
  "short-answer",
  "long-answer",
] as const;
export type QuizAttemptFormat = (typeof QUIZ_ATTEMPT_FORMATS)[number];

const optionAnalysisSchema = z
  .object({
    A: z.string().max(600).optional(),
    B: z.string().max(600).optional(),
    C: z.string().max(600).optional(),
    D: z.string().max(600).optional(),
  })
  .optional();

/** The exact normalized question shape stored in an attempt snapshot. */
export const quizQuestionSchema = z.object({
  prompt: z.string().max(4000),
  options: z.array(z.string().max(1000)).max(6).default([]),
  correctIndex: z.number().int().min(-1).default(0),
  difficulty: z.enum(["easy", "intermediate", "hard"]),
  subject: z.string().max(200),
  topic: z.string().max(400),
  explanation: z.string().max(10000),
  optionAnalysis: optionAnalysisSchema,
  format: z.enum(QUIZ_ATTEMPT_FORMATS).optional(),
  acceptedAnswers: z.array(z.string().max(500)).max(6).optional(),
  modelAnswer: z.string().max(20000).optional(),
  rubric: z.array(z.string().max(600)).max(10).optional(),
  maxScore: z.number().int().min(1).max(10).optional(),
});

export type QuizQuestionSnapshot = z.infer<typeof quizQuestionSchema>;

export const quizResponseSchema = z.object({
  selectedIndex: z.number().int().min(0).max(5).optional(),
  answer: z.string().trim().min(1).max(20000).optional(),
});

export type QuizResponse = z.infer<typeof quizResponseSchema>;

export interface IssuedQuizAttempt {
  attemptId: string;
  expiresAt: string;
}

export interface QuizAttemptMetadata {
  title: string;
  classSlug?: string;
  subjectSlug?: string;
  topic?: string;
  difficulty?: "easy" | "intermediate" | "hard";
  format: QuizAttemptFormat;
}

interface QuizAttemptRow {
  id: string;
  user_id: string;
  title: string;
  class_slug: string | null;
  subject_slug: string | null;
  topic: string | null;
  difficulty: "easy" | "intermediate" | "hard" | null;
  format: QuizAttemptFormat;
  question_count: number;
  content_hash: string;
  questions: unknown;
  expires_at: string;
  consumed_at: string | null;
}

export interface ClaimedQuizAttempt {
  attempt: QuizAttemptRow;
  questions: QuizQuestionSnapshot[];
  grade: {
    verified: boolean;
    answered: number;
    correct: number;
    scorePct: number | null;
    reason?: "writing-ai-grading";
  };
}

function stableValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(stableValue);
  if (value && typeof value === "object") {
    const source = value as Record<string, unknown>;
    const sorted: Record<string, unknown> = {};
    for (const key of Object.keys(source).sort()) {
      if (source[key] !== undefined) sorted[key] = stableValue(source[key]);
    }
    return sorted;
  }
  return value;
}

/**
 * Hash the complete normalized question payload, including server-known answer
 * metadata. Property order and absent optional fields do not change the hash.
 */
export function quizContentFingerprint(questions: readonly QuizQuestionSnapshot[]): string {
  const normalized = questions.map((question) => ({
    prompt: question.prompt,
    options: question.options ?? [],
    correctIndex: question.correctIndex ?? 0,
    difficulty: question.difficulty,
    subject: question.subject,
    topic: question.topic,
    explanation: question.explanation,
    optionAnalysis: question.optionAnalysis,
    format: question.format ?? "mcq",
    acceptedAnswers: question.acceptedAnswers,
    modelAnswer: question.modelAnswer,
    rubric: question.rubric,
    maxScore: question.maxScore,
  }));
  return createHash("sha256").update(JSON.stringify(stableValue(normalized))).digest("hex");
}

function parseAttemptQuestions(value: unknown): QuizQuestionSnapshot[] {
  const parsed = z.array(quizQuestionSchema).min(1).max(MAX_VERIFIED_QUESTIONS).safeParse(value);
  if (!parsed.success) {
    throw new AppError("Quiz attempt is unavailable", 503, "ATTEMPT_UNAVAILABLE");
  }
  return parsed.data;
}

/** Persist the answer key and exact question snapshot before returning a quiz. */
export async function issueQuizAttempt(input: {
  userId: string;
  metadata: QuizAttemptMetadata;
  questions: readonly QuizQuestionSnapshot[];
}): Promise<IssuedQuizAttempt> {
  const questions = parseAttemptQuestions(input.questions);
  if (questions.length > MAX_VERIFIED_QUESTIONS) {
    throw new AppError("Quiz attempt is unavailable", 503, "ATTEMPT_UNAVAILABLE");
  }

  const attemptId = randomUUID();
  const expiresAt = new Date(Date.now() + QUIZ_ATTEMPT_TTL_MS).toISOString();
  const row = {
    id: attemptId,
    user_id: input.userId,
    title: input.metadata.title,
    class_slug: input.metadata.classSlug ?? null,
    subject_slug: input.metadata.subjectSlug ?? null,
    topic: input.metadata.topic ?? null,
    difficulty: input.metadata.difficulty ?? null,
    format: input.metadata.format,
    question_count: questions.length,
    content_hash: quizContentFingerprint(questions),
    questions,
    expires_at: expiresAt,
    consumed_at: null,
  };

  const { error } = await supabaseAdmin.from("quiz_attempts").insert(row);
  if (error) {
    // PostgREST details can contain the stored payload; never echo or log them.
    throw new AppError("Verified quiz attempts are temporarily unavailable", 503, "ATTEMPT_UNAVAILABLE");
  }

  return { attemptId, expiresAt };
}

function normalizeFillBlank(value: string): string {
  return value
    .normalize("NFKC")
    .toLocaleLowerCase("en")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .replace(/\s+/g, " ");
}

/** Deterministic grading uses only the server snapshot, never client scoring. */
export function gradeQuizAttempt(
  questions: readonly QuizQuestionSnapshot[],
  format: QuizAttemptFormat,
  responses: readonly QuizResponse[],
): ClaimedQuizAttempt["grade"] {
  if (responses.length !== questions.length) {
    throw new AppError("Every question must have exactly one response", 400, "ATTEMPT_RESPONSE_COUNT");
  }

  if (format === "short-answer" || format === "long-answer") {
    return {
      verified: false,
      answered: questions.length,
      correct: 0,
      scorePct: null,
      reason: "writing-ai-grading",
    };
  }

  let correct = 0;
  for (let index = 0; index < questions.length; index += 1) {
    const question = questions[index];
    const response = responses[index];
    if ((question.format ?? format) !== format) {
      throw new AppError("Quiz attempt content is inconsistent", 400, "ATTEMPT_CONTENT");
    }

    if (format === "mcq" || format === "true-false") {
      if (response.selectedIndex === undefined || response.answer !== undefined) {
        throw new AppError("Choice questions require a selected option", 400, "ATTEMPT_RESPONSE");
      }
      if (response.selectedIndex >= question.options.length) continue;
      if (response.selectedIndex === question.correctIndex) correct += 1;
      continue;
    }

    if (response.answer === undefined || response.selectedIndex !== undefined) {
      throw new AppError("Fill-blank questions require a text answer", 400, "ATTEMPT_RESPONSE");
    }
    const accepted = (question.acceptedAnswers ?? []).map(normalizeFillBlank).filter(Boolean);
    if (accepted.includes(normalizeFillBlank(response.answer))) correct += 1;
  }

  return {
    verified: true,
    answered: questions.length,
    correct,
    scorePct: Math.round((correct / questions.length) * 100),
  };
}

/**
 * Validate ownership, expiry, exact content and responses, then atomically claim
 * the attempt with a conditional update. The history row also has a unique
 * attempt_id, so concurrent requests can never create two verified rows.
 */
export async function claimQuizAttempt(input: {
  attemptId: string;
  userId: string;
  questions: readonly QuizQuestionSnapshot[];
  responses: readonly QuizResponse[];
}): Promise<ClaimedQuizAttempt> {
  const { data, error } = await supabaseAdmin
    .from("quiz_attempts")
    .select("*")
    .eq("id", input.attemptId)
    .maybeSingle();

  if (error) {
    throw new AppError("Quiz attempt is unavailable", 503, "ATTEMPT_UNAVAILABLE");
  }
  if (!data) {
    throw new AppError("Quiz attempt not found", 404, "ATTEMPT_NOT_FOUND");
  }

  const attempt = data as QuizAttemptRow;
  if (attempt.user_id !== input.userId) {
    throw new AppError("Quiz attempt belongs to another user", 403, "ATTEMPT_FOREIGN");
  }
  if (attempt.consumed_at) {
    throw new AppError("Quiz attempt has already been used", 409, "ATTEMPT_REPLAY");
  }
  if (Date.parse(attempt.expires_at) <= Date.now()) {
    throw new AppError("Quiz attempt has expired", 410, "ATTEMPT_EXPIRED");
  }
  if (
    attempt.question_count !== input.questions.length ||
    attempt.content_hash !== quizContentFingerprint(input.questions)
  ) {
    throw new AppError("Quiz questions do not match the issued attempt", 400, "ATTEMPT_CONTENT");
  }

  const questions = parseAttemptQuestions(attempt.questions);
  const grade = gradeQuizAttempt(questions, attempt.format, input.responses);
  const consumedAt = new Date().toISOString();
  const claimed = await supabaseAdmin
    .from("quiz_attempts")
    .update({ consumed_at: consumedAt })
    .eq("id", attempt.id)
    .eq("user_id", input.userId)
    .eq("consumed_at", null)
    .select("id");

  if (claimed.error) {
    throw new AppError("Quiz attempt is unavailable", 503, "ATTEMPT_UNAVAILABLE");
  }
  if (!claimed.data || claimed.data.length === 0) {
    throw new AppError("Quiz attempt has already been used", 409, "ATTEMPT_REPLAY");
  }

  return { attempt, questions, grade };
}
