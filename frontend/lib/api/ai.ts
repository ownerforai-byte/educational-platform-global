import { apiFetch } from "../api-client";
import type {
  AIChatMessage,
  AIChatRequest,
  AIChatResponse,
  AISearchRequest,
  SearchResponse,
  GenerateQuestionsRequest,
  GenerateQuestionsResponse,
} from "../../types/api";

/**
 * Send a chat message to the AI assistant (requires auth).
 */
export async function chat(
  messages: AIChatMessage[],
  provider?: string
): Promise<AIChatResponse> {
  const body: AIChatRequest = { messages };
  if (provider) {
    body.provider = provider;
  }
  return apiFetch<AIChatResponse>("/api/ai", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

/**
 * Send a chat message as a guest (no auth required, limited to 5 messages).
 */
export async function guestChat(
  messages: AIChatMessage[],
  provider?: string
): Promise<AIChatResponse & { remaining?: number }> {
  const body: AIChatRequest = { messages };
  if (provider) {
    body.provider = provider;
  }
  return apiFetch<AIChatResponse & { remaining?: number }>("/api/ai/guest", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

/**
 * Perform an AI-powered search.
 */
export async function search(
  query: string,
  provider?: string
): Promise<SearchResponse> {
  const body: AISearchRequest = { query };
  if (provider) {
    body.provider = provider;
  }
  return apiFetch<SearchResponse>("/api/search", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

/**
 * Generate MCQs via AI from syllabus content and internet context.
 * Supports easy / intermediate / hard difficulty levels.
 */
export async function generateQuestions(
  payload: GenerateQuestionsRequest
): Promise<GenerateQuestionsResponse> {
  return apiFetch<GenerateQuestionsResponse>("/api/ai/generate-questions", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
