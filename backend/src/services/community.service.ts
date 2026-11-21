import {
  deleteChatMessages,
  fetchSessionMessages,
  fetchSessionRows,
  insertChatMessages,
  type ChatMessageRow,
} from "../db/repositories/chat.repository.js";
import { isR2StorageActive } from "../storage/r2.js";
import {
  appendChatHistoryToR2,
  clearChatHistoryFromR2,
  listChatHistoryFromR2,
  loadChatHistoryFromR2,
  type StoredChatMessage,
} from "./chat-history-r2.js";

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

function summarizeR2Sessions(
  sessions: Array<{ session: string; messages: StoredChatMessage[] }>,
): ChatSessionSummary[] {
  const rows = sessions.flatMap(({ session, messages }) =>
    messages.map((message) => ({ ...message, session })),
  );
  rows.sort((a, b) => b.created_at.localeCompare(a.created_at));
  return buildSessionSummaries(rows);
}

export async function listChatSessions(
  userId: string,
  prefix: string,
): Promise<
  | { migrated: true; sessions: ChatSessionSummary[] }
  | { migrated: false; sessions: [] }
  | { error: string }
> {
  let supabaseRows: ChatMessageRow[] | null = null;
  let supabaseMissingTable = false;
  let supabaseFailed = false;
  try {
    const result = await fetchSessionRows(userId, prefix);
    if (!result.error) supabaseRows = result.data ?? [];
    else {
      supabaseFailed = true;
      supabaseMissingTable = result.missingTable;
    }
  } catch {
    supabaseFailed = true;
    // R2 is the durable fallback when the fast path is unavailable.
  }
  if (supabaseRows?.length) {
    return { migrated: true, sessions: buildSessionSummaries(supabaseRows) };
  }

  if (!isR2StorageActive()) {
    if (supabaseRows !== null) return { migrated: true, sessions: [] };
    if (supabaseMissingTable || !supabaseFailed) return { migrated: false, sessions: [] };
    return { error: "Failed to load chat sessions" };
  }

  try {
    const sessions = await listChatHistoryFromR2(userId, prefix);
    if (sessions) return { migrated: true, sessions: summarizeR2Sessions(sessions) };
  } catch {
    // Do not disguise an unavailable R2 fallback as valid empty history.
  }
  return { error: "Failed to load chat sessions" };
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
  let supabaseMessages: ChatMessageRow[] | null = null;
  let supabaseMissingTable = false;
  let supabaseFailed = false;
  try {
    const result = await fetchSessionMessages(userId, session, limit);
    if (!result.error) supabaseMessages = result.data ?? [];
    else {
      supabaseFailed = true;
      supabaseMissingTable = result.missingTable;
    }
  } catch {
    supabaseFailed = true;
    // R2 is the durable fallback when the fast path is unavailable.
  }
  if (supabaseMessages?.length) {
    return { migrated: true, messages: supabaseMessages.slice().reverse() };
  }

  if (!isR2StorageActive()) {
    if (supabaseMessages !== null) return { migrated: true, messages: [] };
    if (supabaseMissingTable || !supabaseFailed) return { migrated: false, messages: [] };
    return { error: "Failed to load chat history" };
  }

  try {
    const messages = await loadChatHistoryFromR2(userId, session);
    if (messages) {
      return {
        migrated: true,
        messages: messages.slice(-limit).map((message) => ({
          ...message,
          session,
        })),
      };
    }
  } catch {
    // Do not disguise an unavailable R2 fallback as valid empty history.
  }
  return { error: "Failed to load chat history" };
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

  let supabaseSaved = false;
  let supabaseMissingTable = false;
  let supabaseError: { code?: string; details?: unknown } | null = null;
  try {
    const result = await insertChatMessages(rows);
    supabaseSaved = !result.error;
    supabaseMissingTable = result.missingTable;
    if (result.error) supabaseError = result.error;
  } catch (error) {
    supabaseError = error as { code?: string; details?: unknown };
  }

  let r2Saved = false;
  try {
    r2Saved = await appendChatHistoryToR2(userId, session, messages);
  } catch {
    // Do not log storage errors or key material; the other store may have succeeded.
  }

  if (supabaseSaved || r2Saved) {
    return { migrated: true, saved: rows.length };
  }
  if (supabaseMissingTable && !isR2StorageActive()) {
    return { migrated: false, saved: 0 };
  }
  if (supabaseError || supabaseMissingTable) {
    return {
      error: "Failed to save chat history",
      log: { code: supabaseError?.code, details: supabaseError?.details },
    };
  }
  return { migrated: false, saved: 0 };
}

export async function clearChatHistory(
  userId: string,
  session: string | null,
): Promise<
  | { migrated: true; cleared: true }
  | { migrated: false; cleared: true }
  | { error: string }
> {
  let supabaseCleared = false;
  let supabaseFailed = false;
  let supabaseMissingTable = false;
  try {
    const result = await deleteChatMessages(userId, session);
    supabaseCleared = !result.error;
    supabaseFailed = Boolean(result.error);
    supabaseMissingTable = result.missingTable;
  } catch {
    supabaseFailed = true;
  }

  let r2Cleared = false;
  try {
    r2Cleared = await clearChatHistoryFromR2(userId, session);
  } catch {
    // Do not log storage errors or key material; the other store may have succeeded.
  }

  if (supabaseCleared || r2Cleared) return { migrated: true, cleared: true };
  if (supabaseMissingTable && !isR2StorageActive()) {
    return { migrated: false, cleared: true };
  }
  if (!isR2StorageActive() && supabaseFailed) {
    return { migrated: false, cleared: true };
  }
  return { error: "Failed to clear chat history" };
}
