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
 * Stream a chat message to the AI assistant (requires auth).
 * Returns an async generator that yields content chunks.
 */
export async function* streamChat(
  messages: AIChatMessage[],
  provider?: string
): AsyncGenerator<string, void, unknown> {
  const body: AIChatRequest = { messages, stream: true };
  if (provider) {
    body.provider = provider;
  }

  const response = await fetch("/api/ai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("neb_token")}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(error.error || "Stream failed");
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error("No reader available");

  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const data = line.slice(6).trim();
      if (!data) continue;

      try {
        const parsed = JSON.parse(data);
        if (parsed.content) {
          yield parsed.content;
        }
        if (parsed.done) {
          return;
        }
        if (parsed.error) {
          throw new Error(parsed.error);
        }
      } catch (e) {
        // Skip malformed events
      }
    }
  }
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
 * Get available AI providers.
 */
export async function getProviders(): Promise<{
  providers: string[];
  defaultProvider: string;
}> {
  return apiFetch<{ providers: string[]; defaultProvider: string }>("/api/ai/providers");
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
