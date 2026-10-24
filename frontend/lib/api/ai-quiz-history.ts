import { apiFetch } from "../api-client";

export interface QuizHistoryRow {
  id: string;
  title: string;
  classSlug: string | null;
  subjectSlug: string | null;
  topic: string | null;
  difficulty: "easy" | "intermediate" | "hard" | null;
  answered: number;
  correct: number;
  scorePct: number | null;
  createdat: string;
}

export interface QuizHistoryListResponse {
  rows: QuizHistoryRow[];
  migrated: boolean;
}

export interface QuizHistoryQuiz {
  id: string;
  title: string;
  classSlug: string | null;
  subjectSlug: string | null;
  topic: string | null;
  difficulty: "easy" | "intermediate" | "hard" | null;
  questions: import("../../types/api").GeneratedQuestion[];
  answered: number;
  correct: number;
  scorePct: number | null;
  createdat: string;
}

export interface QuizHistoryQuizResponse {
  id: string;
  title: string;
  classSlug: string | null;
  subjectSlug: string | null;
  topic: string | null;
  difficulty: "easy" | "intermediate" | "hard" | null;
  questions: import("../../types/api").GeneratedQuestion[];
  answered: number;
  correct: number;
  scorePct: number | null;
  createdat: string;
  migrated: boolean;
}

export function getQuizHistory(limit = 60): Promise<QuizHistoryListResponse> {
  return apiFetch<QuizHistoryListResponse>(
    `/api/ai-quiz-history?limit=${encodeURIComponent(String(limit))}`
  );
}

export function getQuizHistoryQuiz(id: string): Promise<QuizHistoryQuizResponse> {
  return apiFetch<QuizHistoryQuizResponse>(`/api/ai-quiz-history/${encodeURIComponent(id)}`);
}

export interface SaveQuizHistoryInput {
  title?: string;
  classSlug?: string;
  subjectSlug?: string;
  topic?: string;
  difficulty?: "easy" | "intermediate" | "hard";
  questions: Array<{
    prompt: string;
    options: string[];
    correctIndex: number;
    difficulty: "easy" | "intermediate" | "hard";
    subject: string;
    topic: string;
    explanation: string;
    optionAnalysis?: Record<string, string>;
  }>;
  answered: number;
  correct: number;
  scorePct?: number;
}

export function saveQuizHistory(input: SaveQuizHistoryInput): Promise<{ saved: boolean; migrated: boolean }> {
  return apiFetch<{ saved: boolean; migrated: boolean }>("/api/ai-quiz-history", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function deleteQuizHistoryItem(id: string): Promise<{ deleted: boolean; migrated: boolean }> {
  return apiFetch<{ deleted: boolean; migrated: boolean }>(`/api/ai-quiz-history/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}

export function clearQuizHistory(): Promise<{ cleared: boolean; migrated: boolean }> {
  return apiFetch<{ cleared: boolean; migrated: boolean }>("/api/ai-quiz-history", {
    method: "DELETE",
  });
}
