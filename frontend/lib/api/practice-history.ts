import { apiFetch } from "../api-client";

/** One textbook-corpus attempt row (GET /api/practice-history). */
export interface PracticeCorpusAttemptRow {
  id: string;
  classSlug: string;
  subjectSlug: string;
  topicSlug: string;
  questionLabel: string;
  source: string | null;
  correct: boolean | null;
  timeMs: number | null;
  note: string | null;
  attemptedAt: string;
}

export interface PracticeCorpusListResponse {
  migrated: boolean;
  rows: PracticeCorpusAttemptRow[];
}

export interface SavePracticeCorpusAttemptInput {
  classSlug?: string;
  subjectSlug?: string;
  topicSlug: string;
  questionLabel?: string;
  source?: string;
  answer?: unknown;
  correct?: boolean;
  timeMs?: number;
  note?: string;
}

export function getPracticeCorpusHistory(
  limit = 100,
  topicSlug?: string,
): Promise<PracticeCorpusListResponse> {
  const qs = new URLSearchParams({ limit: String(limit) });
  if (topicSlug) qs.set("topicSlug", topicSlug);
  return apiFetch<PracticeCorpusListResponse>(`/api/practice-history?${qs.toString()}`);
}

export function savePracticeCorpusAttempt(
  input: SavePracticeCorpusAttemptInput,
): Promise<{ saved: boolean; migrated: boolean; id?: string }> {
  return apiFetch<{ saved: boolean; migrated: boolean; id?: string }>("/api/practice-history", {
    method: "POST",
    body: JSON.stringify(input),
  });
}