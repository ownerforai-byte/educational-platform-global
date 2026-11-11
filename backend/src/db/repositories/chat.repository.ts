import { getAdminClient, isMissingTable, postgrestCode } from "./base.repository.js";

export interface ChatMessageRow {
  id?: string;
  session: string;
  role: string;
  content: string;
  created_at: string;
}

const INSERT_RETRY_MS = [750, 1500, 2250];

export async function fetchSessionRows(
  userId: string,
  prefix: string,
): Promise<{ data: ChatMessageRow[] | null; missingTable: boolean; error: { message: string } | null }> {
  let query = getAdminClient()
    .from("chat_messages")
    .select("session, role, content, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(500);
  if (prefix) query = query.like("session", `${prefix}%`);

  const { data, error } = await query;
  if (error) {
    return { data: null, missingTable: isMissingTable(error), error };
  }
  return { data: (data ?? []) as ChatMessageRow[], missingTable: false, error: null };
}

export async function fetchSessionMessages(
  userId: string,
  session: string,
  limit: number,
): Promise<{ data: ChatMessageRow[] | null; missingTable: boolean; error: { message: string } | null }> {
  const { data, error } = await getAdminClient()
    .from("chat_messages")
    .select("id, role, content, created_at")
    .eq("user_id", userId)
    .eq("session", session)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    return { data: null, missingTable: isMissingTable(error), error };
  }
  return { data: (data ?? []) as ChatMessageRow[], missingTable: false, error: null };
}

export async function insertChatMessages(
  rows: Array<{ user_id: string; session: string; role: string; content: string }>,
): Promise<{ missingTable: boolean; error: { message: string; code?: string; details?: unknown } | null }> {
  let last: { error: { message: string; code?: string } | null } = { error: null };
  for (let attempt = 0; attempt < INSERT_RETRY_MS.length; attempt++) {
    const result = await getAdminClient().from("chat_messages").insert(rows);
    if (!result.error) return { missingTable: false, error: null };
    last = result;
    const code = postgrestCode(result.error);
    if (code !== "23503" && !result.error.message.includes("23503")) break;
    await new Promise((resolve) => setTimeout(resolve, INSERT_RETRY_MS[attempt]));
  }
  if (last.error && isMissingTable(last.error)) {
    return { missingTable: true, error: last.error };
  }
  return { missingTable: false, error: last.error };
}

export async function deleteChatMessages(
  userId: string,
  session: string | null,
): Promise<{ missingTable: boolean; error: { message: string } | null }> {
  let query = getAdminClient().from("chat_messages").delete().eq("user_id", userId);
  if (session) query = query.eq("session", session);

  const { error } = await query;
  if (error) {
    return { missingTable: isMissingTable(error), error };
  }
  return { missingTable: false, error: null };
}
