import type { ChatHistoryMessage, ChatSession } from "@/lib/api/ai";

/** Signed-out threads live on this device until an account claims them. */
const GUEST_HISTORY_KEY = "neb_guest_chat_history_v1";
const LEGACY_GUEST_THREAD_KEY = "neb_tutor_thread";
const GUEST_THREAD_CAP = 12;
const GUEST_MESSAGE_CAP = 200;

export interface DeviceChatThread {
  session: string;
  messages: ChatHistoryMessage[];
  lastMessageAt: string;
}

export interface DeviceChatStore {
  active: string;
  threads: DeviceChatThread[];
}

export function readDeviceChatHistory(): DeviceChatStore {
  if (typeof window === "undefined") return { active: "default", threads: [] };
  try {
    const raw = localStorage.getItem(GUEST_HISTORY_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as DeviceChatStore;
      if (parsed && Array.isArray(parsed.threads)) {
        return { active: parsed.active || "default", threads: parsed.threads };
      }
    }
  } catch {
    /* corrupted store */
  }
  try {
    const legacy = localStorage.getItem(LEGACY_GUEST_THREAD_KEY);
    if (legacy) {
      const parsed: unknown = JSON.parse(legacy);
      if (Array.isArray(parsed)) {
        const messages = parsed.filter(
          (message): message is ChatHistoryMessage =>
            !!message &&
            typeof message === "object" &&
            ((message as ChatHistoryMessage).role === "user" ||
              (message as ChatHistoryMessage).role === "assistant") &&
            typeof (message as ChatHistoryMessage).content === "string",
        );
        if (messages.length) {
          const store: DeviceChatStore = {
            active: "default",
            threads: [
              {
                session: "default",
                messages: messages.map((message) => ({ role: message.role, content: message.content })),
                lastMessageAt: new Date().toISOString(),
              },
            ],
          };
          localStorage.setItem(GUEST_HISTORY_KEY, JSON.stringify(store));
          return store;
        }
      }
    }
  } catch {
    /* storage blocked */
  }
  return { active: "default", threads: [] };
}

export function writeDeviceChatHistory(store: DeviceChatStore): void {
  if (typeof window === "undefined") return;
  try {
    const threads = store.threads
      .slice(0, GUEST_THREAD_CAP)
      .map((thread) => ({ ...thread, messages: thread.messages.slice(-GUEST_MESSAGE_CAP) }));
    const trimmed: DeviceChatStore = { active: store.active, threads };
    localStorage.setItem(GUEST_HISTORY_KEY, JSON.stringify(trimmed));
    const active = threads.find((thread) => thread.session === trimmed.active);
    if (active && active.messages.length) {
      localStorage.setItem(LEGACY_GUEST_THREAD_KEY, JSON.stringify(active.messages));
    } else {
      localStorage.removeItem(LEGACY_GUEST_THREAD_KEY);
    }
  } catch {
    /* storage blocked */
  }
}

export function clearDeviceChatHistory(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(GUEST_HISTORY_KEY);
    localStorage.removeItem(LEGACY_GUEST_THREAD_KEY);
  } catch {
    /* storage blocked */
  }
}

export function deviceThreadsToSessions(threads: DeviceChatThread[]): ChatSession[] {
  return threads.map((thread) => ({
    session: thread.session,
    messages: thread.messages.length,
    lastMessageAt: thread.lastMessageAt,
    preview:
      thread.messages.find((message) => message.role === "user")?.content.slice(0, 80) ??
      "Conversation",
  }));
}
