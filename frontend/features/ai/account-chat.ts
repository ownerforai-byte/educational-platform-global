import { saveChatHistory } from "@/lib/api/ai";
import {
  clearDeviceChatHistory,
  readDeviceChatHistory,
  writeDeviceChatHistory,
} from "@/features/ai/device-chat-history";

/**
 * Account chat history.
 *
 * Every signed-in Veer surface writes here. The HTTP client stays in
 * `@/lib/api/ai`; this module is the product boundary:
 * one session name, trimmed turns, and a single claim of device-only threads
 * onto the signed-in account (`chat_messages` + the R2 mirror).
 */
export async function recordAccountChatTurn(
  session: string,
  messages: Array<{ role: "user" | "assistant"; content: string }>,
): Promise<{ ok: boolean }> {
  const clean = messages
    .filter(
      (message) =>
        (message.role === "user" || message.role === "assistant") && message.content.trim().length > 0,
    )
    .slice(0, 200)
    .map((message) => ({
      role: message.role,
      content: message.content.slice(0, 24000),
    }));
  if (!clean.length) return { ok: false };
  const saved = await saveChatHistory(session.trim().slice(0, 64) || "default", clean);
  return { ok: saved.migrated && saved.saved === clean.length };
}

/** Move this browser's signed-out threads onto the current account. Once. */
export async function claimDeviceChatsForAccount(): Promise<boolean> {
  const store = readDeviceChatHistory();
  const threads = store.threads.filter((thread) => thread.messages.length > 0);
  if (!threads.length) return false;
  clearDeviceChatHistory();
  try {
    for (const thread of threads) {
      const result = await recordAccountChatTurn(thread.session, thread.messages);
      if (!result.ok) throw new Error("claim failed");
    }
    return true;
  } catch {
    writeDeviceChatHistory(store);
    return false;
  }
}
