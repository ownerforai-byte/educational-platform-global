import { apiFetch, getStoredToken, clearStoredToken } from "../api-client";
import { reportClientError } from "../errors/app-error";
import type {
  AIChatMessage,
  AIChatRequest,
  AIChatResponse,
  AISearchRequest,
  SearchResponse,
  GenerateQuestionsRequest,
  GenerateQuestionsResponse,
  EvaluateAnswersRequest,
  EvaluateAnswersResponse,
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
  provider?: string,
  session?: string
): Promise<AIChatResponse> {
  let body: AIChatRequest = { messages, session };
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
  remaining?: number;
  limit?: number;
  continued?: boolean;
}

/** A figure the model requested mid-answer: the client shows a live
 *  "generating" placeholder, then swaps in the picture on imageSuccess. */
export interface StreamImageStart {
  imageStart: number;
  prompt: string;
  caption?: string;
}

/**
 * The drawn figure (same id as imageStart): a Gemini vector figure (`svg`,
 * rendered as an interactive ```svg block — never raw code) or a raster `url`.
 */
export interface StreamImageSuccess {
  imageSuccess: number;
  url?: string;
  svg?: string;
  caption?: string;
}

/** The server could not draw the requested figure; the client shows an inline note. */
export interface StreamImageFailed {
  imageFailed: number;
  reason?: string;
}

/**
 * Live progress from the server before/while it writes: the route opens the
 * stream immediately (it used to stay silent through ~15-20s of web research,
 * which made the answer look like it landed all at once), then reports each
 * phase so the UI can say what Veer is doing right now.
 */
export interface StreamPhase {
  phase: "searching" | "writing" | string;
  label?: string;
}

/** A cut answer is being continued on the SAME bubble (truncation repair). */
export interface StreamContinuation {
  continuing: number;
  label?: string;
}

export type StreamChunk =
  | string
  | StreamChatMeta
  | StreamImageStart
  | StreamImageSuccess
  | StreamImageFailed
  | StreamPhase
  | StreamContinuation;

export interface StreamChatOptions {
  isGuest?: boolean;
  session?: string;
  /** Dedicated console id ("nepali" | "grammar") — forwarded to the server. */
  console?: string;
  /** Server-side work lane ("diagram" = Diagram Hub's dedicated free model). */
  task?: string;
  /** Abort the in-flight reply (the Stop button). */
  signal?: AbortSignal;
}

export async function* streamChat(
  messages: AIChatMessage[],
  provider?: string,
  options?: StreamChatOptions
): AsyncGenerator<StreamChunk, void, unknown> {
  let body: AIChatRequest = { messages, stream: true };
  if (provider) {
    body.provider = provider;
  }
  if (options?.console) {
    body.console = options.console;
  }
  if (options?.task) {
    body.task = options.task;
  }
  if (options?.session) body.session = options.session;
  body = withLatestImages(messages, body);

  const hasAuth =
    typeof window !== "undefined" &&
    (!!getStoredToken() || document.cookie.includes("sb-access-token="));
  const isGuest = options?.isGuest !== undefined ? options.isGuest : !hasAuth;

  // Bearer restored 2026-09-25: cookie-only auth broke streams once the 1h
  // access token expired (no refresh-retry exists on stream requests).
  // Greptile follow-up 2026-09-25: localStorage can hold a STALE token after
  // the cookie refreshed; the backend trusts the header over the cookie, so a
  // stale Bearer 401s the stream. On 401: drop the stored token and retry once
  // cookie-only (streams have no refresh-retry middleware).
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const targetPath = isGuest ? "/api/ai/guest" : "/api/ai";
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (!isGuest && attempt === 0) {
      const token = getStoredToken();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    const response = await fetch(targetPath, {
      method: "POST",
      credentials: "include",
      headers,
      body: JSON.stringify(body),
      signal: options?.signal,
    });

    if (response.status === 401 && !isGuest && attempt === 0) {
      clearStoredToken();
      continue;
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: response.statusText }));
      // Carry the HTTP status: the chat surfaces branch on 402 (daily pool
      // empty) and 504 (slow provider) to show the honest message instead of a
      // bogus "connection difficulty" bubble.
      const failure = new Error(error.error || "Stream failed") as Error & { status?: number };
      failure.status = response.status;
      throw failure;
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error("No reader available");

    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        if (buffer.trim()) {
          const trimmed = buffer.trim();
          if (trimmed.startsWith("data:")) {
            const data = trimmed.slice(5).trim();
            if (data && data !== "[DONE]") {
              try {
                const parsed = JSON.parse(data);
                if (typeof parsed.content === "string") yield parsed.content;
              } catch {
                // 5.3: surface the malformed tail instead of silently
                // dropping it — a truncated final event is a real error.
                reportClientError("ai-stream-malformed-sse", new Error("malformed SSE tail"), {
                  sample: data.slice(0, 120),
                });
              }
            }
          }
        }
        return;
      }

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;
        const data = trimmed.slice(5).trim();
        if (!data || data === "[DONE]") continue;

        let parsed: {
          content?: string;
          done?: boolean;
          error?: string;
          credits?: number;
          remaining?: number;
          limit?: number;
          continued?: boolean;
          imageStart?: number;
          imageSuccess?: number;
          imageFailed?: number;
          prompt?: string;
          caption?: string;
          url?: string;
          svg?: string;
          reason?: string;
          phase?: string;
          continuing?: number;
          label?: string;
        };
        try {
          parsed = JSON.parse(data);
        } catch {
          continue; // A malformed event must not kill a healthy stream.
        }
        // The server's error event (generic message + correlation id) now
        // reaches the caller instead of being swallowed by the old catch.
        if (parsed.error) throw new Error(parsed.error);
        // Progress events: research started / answer writing / continuation —
        // they carry no text, only what the UI should say it is doing.
        if (typeof parsed.phase === "string") {
          yield { phase: parsed.phase, label: parsed.label };
          continue;
        }
        if (typeof parsed.continuing === "number") {
          yield { continuing: parsed.continuing, label: parsed.label };
          continue;
        }
        if (typeof parsed.imageStart === "number") {
          yield { imageStart: parsed.imageStart, prompt: parsed.prompt ?? "", caption: parsed.caption };
          continue;
        }
        if (typeof parsed.imageSuccess === "number" && (parsed.url || parsed.svg)) {
          yield {
            imageSuccess: parsed.imageSuccess,
            url: parsed.url,
            svg: parsed.svg,
            caption: parsed.caption,
          };
          continue;
        }
        if (typeof parsed.imageFailed === "number") {
          yield { imageFailed: parsed.imageFailed, reason: parsed.reason };
          continue;
        }
        if (typeof parsed.content === "string") yield parsed.content;
        if (parsed.done) {
          yield {
            done: true,
            credits: parsed.credits,
            remaining: parsed.remaining,
            limit: parsed.limit,
            continued: parsed.continued,
          };
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
 * Today's AI-spark usage for the signed-in member (chat badge + profile). */
export interface AiSparkUsage {
  tier: "guest" | "member" | "plus" | "pro" | "owner";
  /** Daily allowance; null = unlimited (owner). */
  limit: number | null;
  used: number;
  remaining: number | null;
}

export async function getAiSparkUsage(): Promise<AiSparkUsage> {
  return apiFetch<AiSparkUsage>("/api/ai/spark");
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
 * Generate quiz questions via AI from syllabus content and internet context.
 * Supports easy / intermediate / hard difficulty levels and the five quiz
 * formats (mcq, true-false, fill-blank, short-answer, long-answer).
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
 * AI evaluation of learner answers (plan.md §11) — used by every writing
 * format after submission. Returns per-item score/verdict/feedback/model
 * answer/improvements plus an overall summary.
 */
export async function evaluateAnswers(
  payload: EvaluateAnswersRequest
): Promise<EvaluateAnswersResponse> {
  return apiFetch<EvaluateAnswersResponse>("/api/ai/evaluate-answers", {
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

/**
 * List the signed-in user's conversations (individual chat histories).
 *
 * Scope isolation (owner 2026-10-25: "one interface per subject with their own
 * history — no mix up"): pass `prefix` (e.g. "subj:physics:") to list only
 * that interface's conversations.
 */
export async function getChatSessions(
  prefix?: string,
): Promise<{ sessions: ChatSession[]; migrated: boolean }> {
  const qs = prefix ? `?prefix=${encodeURIComponent(prefix)}` : "";
  return apiFetch<{ sessions: ChatSession[]; migrated: boolean }>(
    `/api/chat-history/sessions${qs}`,
  );
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
