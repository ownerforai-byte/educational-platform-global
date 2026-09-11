import { apiFetch } from "../api-client";
import type {
  AIChatMessage,
  AIChatRequest,
  AIChatResponse,
  RavikishanNotesResponse,
  RNotesResponse,
  SearchResponse,
} from "../../types/api";

/**
 * Get R-Notes manifest (subjects and chapters).
 */
export async function getRNotes(): Promise<RNotesResponse> {
  return apiFetch<RNotesResponse>("/api/r-notes");
}

/**
 * Get Ravikishan notes data by path.
 */
export async function getRavikishanNotes(
  path: string
): Promise<RavikishanNotesResponse> {
  return apiFetch<RavikishanNotesResponse>("/api/ravikishan-notes", {
    params: { path },
  });
}

/**
 * Search across the syllabus and resources.
 */
export async function searchContent(
  query: string,
  provider?: string
): Promise<SearchResponse> {
  return apiFetch<SearchResponse>("/api/search", {
    method: "POST",
    body: JSON.stringify({ query, provider }),
  });
}

/**
 * Send a chat message to the AI assistant.
 */
export async function chatWithAI(
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
