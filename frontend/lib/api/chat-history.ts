import { apiFetch } from "../api-client";
import type { AIChatMessage } from "../../types/api";

/**
 * Per-user AI chat history. The backend scopes every call to the session
 * user; if the chat_messages table has not been migrated yet the API answers
 * with migrated:false and the UI simply runs without persistence.
 */

export interface ChatHistoryResponse {
  messages: Array<{
    id: string;
    role: "user" | "assistant";
    content: string;
    created_at: string;
  }>;
  migrated: boolean;
}

export interface ChatHistorySaveResponse {
  saved: number;
  migrated: boolean;
}

export interface ChatHistoryClearResponse {
  cleared: boolean;
  migrated: boolean;
}

export function getChatHistory(
  session = "default",
  limit = 200
): Promise<ChatHistoryResponse> {
  return apiFetch<ChatHistoryResponse>(
    `/api/chat-history?session=${encodeURIComponent(session)}&limit=${limit}`
  );
}

export function saveChatHistory(
  messages: Array<{ role: "user" | "assistant"; content: string }>,
  session = "default"
): Promise<ChatHistorySaveResponse> {
  return apiFetch<ChatHistorySaveResponse>("/api/chat-history", {
    method: "POST",
    body: JSON.stringify({ session, messages }),
  });
}

export function clearChatHistory(session = "default"): Promise<ChatHistoryClearResponse> {
  return apiFetch<ChatHistoryClearResponse>(
    `/api/chat-history?session=${encodeURIComponent(session)}`
  );
}
