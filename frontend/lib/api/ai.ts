import { apiFetch, getStoredToken, clearStoredToken } from "../api-client";
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
 * Photos travel at the top level of the request body, taken from the LAST
 * user message: the backend hands them to vision-capable providers and drops
 * them for the rest. Older turns keep their data URLs out of the payload so
 * a long conversation never re-uploads (or re-bills) old photos.
 */
function withLatestImages(messages: AIChatMessage[], body: AIChatRequest): AIChatRequest {
  const last = messages[messages.length - 1];
  const images = last?.role === "user" ? last.images : undefined;
  return images && images.length ? { ...body, images } : body;
}

/**
 * Send a chat message to the AI assistant (requires auth).
 */
export async function chat(
  messages: AIChatMessage[],
  provider?: string
): Promise<AIChatResponse> {
  let body: AIChatRequest = { messages };
  if (provider) {
    body.provider = provider;
  }
  body = withLatestImages(messages, body);
  return apiFetch<AIChatResponse>("/api/ai", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

/**
 * Stream a chat message to the AI assistant (requires auth).
 * Returns an async generator that yields content chunks.
 */
/** Terminal event of a stream: server-reported credits + truncation-repair flag. */
export interface StreamChatMeta {
  done: boolean;
  credits?: number;
  continued?: boolean;
}

/** A figure the model requested mid-answer: the client shows a live
 *  "generating" placeholder, then swaps in the picture on imageSuccess. */
export interface StreamImageStart {
  imageStart: number;
  prompt: string;
  caption?: string;
}

/** The drawn picture (same id as imageStart). */
export interface StreamImageSuccess {
  imageSuccess: number;
  url: string;
}

/** Agnes failed to draw — the client falls back to puter.js for the same prompt. */
export interface StreamImageFailed {
  imageFailed: number;
  reason?: string;
}

export type StreamChunk =
  | string
  | StreamChatMeta
  | StreamImageStart
  | StreamImageSuccess
  | StreamImageFailed;

export async function* streamChat(
  messages: AIChatMessage[],
  provider?: string
): AsyncGenerator<StreamChunk, void, unknown> {
  let body: AIChatRequest = { messages, stream: true };
  if (provider) {
    body.provider = provider;
  }
  body = withLatestImages(messages, body);

  // Bearer restored 2026-09-25: cookie-only auth broke streams once the 1h
  // access token expired (no refresh-retry exists on stream requests).
  // Greptile follow-up 2026-09-25: localStorage can hold a STALE token after
  // the cookie refreshed; the backend trusts the header over the cookie, so a
  // stale Bearer 401s the stream. On 401: drop the stored token and retry once
  // cookie-only (streams have no refresh-retry middleware).
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (attempt === 0) {
      const token = getStoredToken();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    const response = await fetch("/api/ai", {
      method: "POST",
      credentials: "include",
      headers,
      body: JSON.stringify(body),
    });

    if (response.status === 401 && attempt === 0) {
      clearStoredToken();
      continue;
    }

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
      if (done) return;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;
        const data = trimmed.slice(5).trim();
        if (!data) continue;

        let parsed: {
          content?: string;
          done?: boolean;
          error?: string;
          credits?: number;
          continued?: boolean;
          imageStart?: number;
          imageSuccess?: number;
          imageFailed?: number;
          prompt?: string;
          caption?: string;
          url?: string;
          reason?: string;
        };
        try {
          parsed = JSON.parse(data);
        } catch {
          continue; // A malformed event must not kill a healthy stream.
        }
        // The server's error event (generic message + correlation id) now
        // reaches the caller instead of being swallowed by the old catch.
        if (parsed.error) throw new Error(parsed.error);
        if (typeof parsed.imageStart === "number") {
          yield { imageStart: parsed.imageStart, prompt: parsed.prompt ?? "", caption: parsed.caption };
          continue;
        }
        if (typeof parsed.imageSuccess === "number" && parsed.url) {
          yield { imageSuccess: parsed.imageSuccess, url: parsed.url };
          continue;
        }
        if (typeof parsed.imageFailed === "number") {
          yield { imageFailed: parsed.imageFailed, reason: parsed.reason };
          continue;
        }
        if (parsed.content) yield parsed.content;
        if (parsed.done) {
          if (typeof parsed.credits === "number" || parsed.continued) {
            yield {
              done: true,
              credits: parsed.credits,
              continued: parsed.continued,
            };
          }
          return;
        }
      }
    }
  }
}

/**
 * Send a chat message as a guest (no auth required, limited to 2 messages/day).
 */
export async function guestChat(
  messages: AIChatMessage[],
  provider?: string
): Promise<AIChatResponse & { remaining?: number }> {
  let body: AIChatRequest = { messages };
  if (provider) {
    body.provider = provider;
  }
  body = withLatestImages(messages, body);
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

/**
 * Enhance (rewrite) a rough student prompt into a sharper study question.
 * Throws with status 402 when no LLM is available — callers fall back to the
 * original prompt in that case.
 */
export async function enhancePrompt(prompt: string): Promise<{ prompt: string }> {
  return apiFetch<{ prompt: string }>("/api/ai/enhance", {
    method: "POST",
    body: JSON.stringify({ prompt }),
  });
}

export interface ChatHistoryMessage {
  id?: string;
  role: "user" | "assistant";
  content: string;
  created_at?: string;
}

/**
 * Load the signed-in user's persisted chat history for a session.
 * `migrated: false` means the chat_messages table has not been created yet —
 * history is simply unavailable, not an error.
 */
export async function getChatHistory(
  session = "default",
  limit = 200
): Promise<{ messages: ChatHistoryMessage[]; migrated: boolean }> {
  const qs = new URLSearchParams({ session, limit: String(limit) });
  return apiFetch<{ messages: ChatHistoryMessage[]; migrated: boolean }>(
    `/api/chat-history?${qs.toString()}`
  );
}

/**
 * Persist messages to the user's chat history (bulk, append-only).
 * Silently no-ops when the table has not been migrated yet.
 */
export async function saveChatHistory(
  session: string,
  messages: Array<{ role: "user" | "assistant"; content: string }>
): Promise<{ saved: number; migrated: boolean }> {
  return apiFetch<{ saved: number; migrated: boolean }>("/api/chat-history", {
    method: "POST",
    body: JSON.stringify({ session, messages }),
  });
}

export interface ChatSession {
  session: string;
  messages: number;
  lastMessageAt: string;
  preview: string;
}

/** List the signed-in user's conversations (individual chat histories). */
export async function getChatSessions(): Promise<{ sessions: ChatSession[]; migrated: boolean }> {
  return apiFetch<{ sessions: ChatSession[]; migrated: boolean }>("/api/chat-history/sessions");
}

/** Clear the user's chat history for a session (or every session when omitted). */
export async function clearChatHistory(
  session?: string
): Promise<{ cleared: boolean; migrated: boolean }> {
  const qs = session ? `?session=${encodeURIComponent(session)}` : "";
  return apiFetch<{ cleared: boolean; migrated: boolean }>(
    `/api/chat-history${qs}`,
    { method: "DELETE" }
  );
}
