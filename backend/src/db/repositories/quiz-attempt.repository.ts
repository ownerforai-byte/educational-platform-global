import { getAdminClient } from "./base.repository.js";

export interface QuizAttemptRow {
  id: string;
  user_id: string;
  title: string;
  class_slug: string | null;
  subject_slug: string | null;
  topic: string | null;
  difficulty: "easy" | "intermediate" | "hard" | null;
  format: "mcq" | "true-false" | "fill-blank" | "short-answer" | "long-answer";
  question_count: number;
  content_hash: string;
  questions: unknown;
  expires_at: string;
  consumed_at: string | null;
}

export async function insertQuizAttempt(row: QuizAttemptRow) {
  const { error } = await getAdminClient().from("quiz_attempts").insert(row);
  return { error };
}

export async function findQuizAttempt(attemptId: string) {
  const { data, error } = await getAdminClient()
    .from("quiz_attempts")
    .select("*")
    .eq("id", attemptId)
    .maybeSingle();
  return { data: (data ?? null) as QuizAttemptRow | null, error };
}

export async function consumeQuizAttempt(attemptId: string, userId: string, consumedAt: string) {
  const { data, error } = await getAdminClient()
    .from("quiz_attempts")
    .update({ consumed_at: consumedAt })
    .eq("id", attemptId)
    .eq("user_id", userId)
    .eq("consumed_at", null)
    .select("id");
  return { data: (data ?? null) as Array<{ id: string }> | null, error };
}
