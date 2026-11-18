/**
 * Per-user AI chat history (shim).
 *
 * Prefer importing from `@/lib/api/ai` — `saveChatHistory(session, messages)` —
 * so argument order matches every Veer console.
 */

export {
  getChatHistory,
  saveChatHistory,
  clearChatHistory,
  type ChatHistoryMessage,
  type ChatSession,
} from "./ai";