import { apiFetch } from "../api-client";
import type {
  AIChatMessage,
  AIChatRequest,
  AIChatResponse,
  AISearchRequest,
  SearchResponse,
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
 * Send a chat message as a guest (no auth required, limited to 7 messages).
 */
export async function guestChat(
  messages: AIChatMessage[],
  provider?: string
): Promise<AIChatResponse & { remaining?: number; creditsRemaining?: number }> {
  const body: AIChatRequest = { messages };
  if (provider) {
    body.provider = provider;
  }
  return apiFetch<AIChatResponse & { remaining?: number; creditsRemaining?: number }>("/api/ai/guest", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

/**
 * Get guest credit status (no auth required).
 */
export async function getGuestCreditStatus(): Promise<{ credits: number; messagesUsed: number; messagesRemaining: number }> {
  return apiFetch<{ credits: number; messagesUsed: number; messagesRemaining: number }>("/api/guest/credits");
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
