import { apiFetch } from "../api-client";

/**
 * The history console's client calls (owner request 2026-09-30).
 *
 * `searchHistory` hits the dedicated endpoint whose ONLY job is to search the
 * student's own saved conversations and present them. It is free for signed-in
 * students and blocked for guests — the backend enforces that with requireAuth,
 * so a guest calling it directly gets a 401 rather than a free AI call.
 */

export interface HistorySearchSession {
  session: string;
  messages: number;
  matched: number;
  lastMessageAt: string;
}

export interface HistorySearchResponse {
  response: string;
  provider?: string;
  searched: {
    messages: number;
    sessions: number;
    attached?: number;
    terms?: string[];
  };
  sessions: HistorySearchSession[];
}

export interface ChatSessionSummary {
  session: string;
  messages: number;
  lastMessageAt: string;
  preview: string;
}

export function searchHistory(question: string): Promise<HistorySearchResponse> {
  return apiFetch<HistorySearchResponse>("/api/ai/history-search", {
    method: "POST",
    body: JSON.stringify({ question }),
  });
}

/** The account's conversation list: name, size, last activity and a preview. */
export function getChatSessions(): Promise<{
  sessions: ChatSessionSummary[];
  migrated: boolean;
}> {
  return apiFetch<{ sessions: ChatSessionSummary[]; migrated: boolean }>(
    "/api/chat-history/sessions"
  );
}
