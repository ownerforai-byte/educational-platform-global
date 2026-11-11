import {
  deleteChatMessages,
  fetchSessionMessages,
  fetchSessionRows,
  insertChatMessages,
  type ChatMessageRow,
} from "../db/repositories/chat.repository.js";

export interface ChatSessionSummary {
  session: string;
  messages: number;
  lastMessageAt: string;
  preview: string;
}

function buildSessionSummaries(rows: ChatMessageRow[]): ChatSessionSummary[] {
  const map = new Map<string, ChatSessionSummary>();
  for (const row of rows) {
    const s = row.session || "default";
    const entry = map.get(s) ?? {
      session: s,
      messages: 0,
      lastMessageAt: row.created_at,
      preview: "",
    };
    entry.messages += 1;
    map.set(s, entry);
  }

  for (const row of rows.slice().reverse()) {
    if (row.role !== "user") continue;
    const entry = map.get(row.session || "default");
    if (entry && !entry.preview) entry.preview = row.content.slice(0, 80);
  }

  return Array.from(map.values());
}

export async function listChatSessions(
  userId: string,
  prefix: string,
): Promise<
  | { migrated: true; sessions: ChatSessionSummary[] }
  | { migrated: false; sessions: [] }
  | { error: string }
> {
  const { data, error, missingTable } = await fetchSessionRows(userId, prefix);
  if (error) {
    if (missingTable) return { migrated: false, sessions: [] };
    return { error: "Failed to load chat sessions" };
  }
  return { migrated: true, sessions: buildSessionSummaries(data ?? []) };
}

export async function loadChatSession(
  userId: string,
  session: string,
  limit: number,
): Promise<
  | { migrated: true; messages: ChatMessageRow[] }
  | { migrated: false; messages: [] }
  | { error: string }
> {
  const { data, error, missingTable } = await fetchSessionMessages(userId, session, limit);
  if (error) {
    if (missingTable) return { migrated: false, messages: [] };
    return { error: "Failed to load chat history" };
  }
  return { migrated: true, messages: (data ?? []).slice().reverse() };
}

export async function saveChatBatch(
  userId: string,
  session: string,
  messages: Array<{ role: "user" | "assistant"; content: string }>,
): Promise<
  | { migrated: true; saved: number }
  | { migrated: false; saved: 0 }
  | { error: string; log?: { code?: string; details?: unknown } }
> {
  const rows = messages.map((m) => ({
    user_id: userId,
    session,
    role: m.role,
    content: m.content,
  }));

  const { error, missingTable } = await insertChatMessages(rows);
  if (error) {
    if (missingTable) return { migrated: false, saved: 0 };
    const err = error as { code?: string; details?: unknown };
    return {
      error: "Failed to save chat history",
      log: { code: err.code, details: err.details },
    };
  }
  return { migrated: true, saved: rows.length };
}

export async function clearChatHistory(
  userId: string,
  session: string | null,
): Promise<
  | { migrated: true; cleared: true }
  | { migrated: false; cleared: true }
  | { error: string }
> {
  const { error, missingTable } = await deleteChatMessages(userId, session);
  if (error) {
    if (missingTable) return { migrated: false, cleared: true };
    return { error: "Failed to clear chat history" };
  }
  return { migrated: true, cleared: true };
}
