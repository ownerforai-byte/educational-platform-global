import { randomUUID } from "node:crypto";
import { isR2StorageActive, r2Delete, r2Download, r2Upload } from "../storage/r2.js";
import { accountStorageObject, releaseStoragePath } from "./profile-storage.js";

export const CHAT_HISTORY_R2_MAX_MESSAGES = 500;
const CHAT_HISTORY_PREFIX = "chat-history";
const INDEX_FILE = ".sessions.json";

export interface StoredChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

const userLocks = new Map<string, Promise<void>>();

function userDirectory(userId: string): string {
  if (!userId.trim()) throw new Error("Chat history user id is required");
  const segment = /^[A-Za-z0-9_-]+$/.test(userId) && userId !== "." && userId !== ".."
    ? userId
    : `u-${Buffer.from(userId).toString("base64url")}`;
  return `${CHAT_HISTORY_PREFIX}/${segment}`;
}

/**
 * Session names are identifiers, not paths. Restrict them to a single safe
 * segment; in particular, slashes, percent-encoding, and dot traversal are
 * replaced before constructing an R2 key.
 */
export function sanitizeChatHistorySession(session: string): string {
  const safe = session.trim().slice(0, 64).replace(/[^A-Za-z0-9_-]/g, "_");
  return safe || "default";
}

function sessionObjectKey(userId: string, session: string): string {
  return `${userDirectory(userId)}/${sanitizeChatHistorySession(session)}.json`;
}

function sessionIndexKey(userId: string): string {
  return `${userDirectory(userId)}/${INDEX_FILE}`;
}

async function withUserLock<T>(userId: string, operation: () => Promise<T>): Promise<T> {
  const lockKey = userDirectory(userId);
  const previous = userLocks.get(lockKey) ?? Promise.resolve();
  let release!: () => void;
  const current = new Promise<void>((resolve) => {
    release = resolve;
  });
  userLocks.set(lockKey, current);
  await previous;
  try {
    return await operation();
  } finally {
    release();
    if (userLocks.get(lockKey) === current) userLocks.delete(lockKey);
  }
}

function parseMessageDocument(buffer: Buffer): StoredChatMessage[] {
  const parsed: unknown = JSON.parse(buffer.toString("utf8"));
  if (!Array.isArray(parsed)) throw new Error("Invalid chat history document");
  return parsed.map((item): StoredChatMessage => {
    if (!item || typeof item !== "object") throw new Error("Invalid chat history message");
    const row = item as Record<string, unknown>;
    if (
      typeof row.id !== "string" || !row.id ||
      (row.role !== "user" && row.role !== "assistant") ||
      typeof row.content !== "string" ||
      typeof row.created_at !== "string" || !Number.isFinite(Date.parse(row.created_at))
    ) {
      throw new Error("Invalid chat history message");
    }
    return {
      id: row.id,
      role: row.role,
      content: row.content,
      created_at: row.created_at,
    };
  });
}

/**
 * The per-user index maps the SAFE object segment to the session id the client
 * actually uses, so a listed session round-trips back to its own id (a session
 * like `quad:physics` is stored as `quad_physics` but must be listed as
 * `quad:physics`). Legacy indexes were a plain array of safe names; those still
 * parse, mapping each entry to itself.
 */
function parseSessionIndex(buffer: Buffer): Map<string, string> {
  const parsed: unknown = JSON.parse(buffer.toString("utf8"));
  const index = new Map<string, string>();
  const add = (rawSession: unknown) => {
    if (typeof rawSession !== "string" || !rawSession || rawSession.length > 128) return;
    index.set(sanitizeChatHistorySession(rawSession), rawSession);
  };
  if (Array.isArray(parsed)) {
    for (const item of parsed) add(item);
  } else if (parsed && typeof parsed === "object") {
    for (const item of Object.values(parsed as Record<string, unknown>)) add(item);
  } else {
    throw new Error("Invalid chat history session index");
  }
  return index;
}

function mergeMessages(...groups: StoredChatMessage[][]): StoredChatMessage[] {
  const byId = new Map<string, StoredChatMessage>();
  for (const group of groups) {
    for (const message of group) byId.set(message.id, message);
  }
  return Array.from(byId.values())
    .map((message, position) => ({ message, position }))
    .sort((a, b) => a.message.created_at.localeCompare(b.message.created_at) || a.position - b.position)
    .slice(-CHAT_HISTORY_R2_MAX_MESSAGES)
    .map(({ message }) => message);
}

async function readMessages(key: string): Promise<StoredChatMessage[]> {
  const object = await r2Download(key);
  return object ? parseMessageDocument(object.buffer) : [];
}

async function readSessions(key: string): Promise<Map<string, string>> {
  const object = await r2Download(key);
  return object ? parseSessionIndex(object.buffer) : new Map<string, string>();
}

/** Count the object against the account, then write it. Quota failure skips the write. */
async function writeAccountedJson(userId: string, key: string, value: unknown): Promise<boolean> {
  const body = Buffer.from(JSON.stringify(value));
  const reserved = await accountStorageObject(userId, key, body.byteLength, {
    email: null,
    role: null,
    plan: null,
  });
  if (!reserved.ok && reserved.reason === "quota") return false;
  try {
    await r2Upload(key, body, "application/json", { cacheControl: "private, no-store" });
    return true;
  } catch (err) {
    await releaseStoragePath(userId, key).catch(() => undefined);
    throw err;
  }
}

async function deleteAccounted(userId: string, key: string): Promise<void> {
  await r2Delete(key);
  await releaseStoragePath(userId, key).catch(() => undefined);
}

async function readIndexTwice(
  key: string,
): Promise<{ first: Map<string, string>; latest: Map<string, string> }> {
  const first = await readSessions(key);
  const latest = await readSessions(key);
  return { first, latest };
}

export async function loadChatHistoryFromR2(
  userId: string,
  session: string,
): Promise<StoredChatMessage[] | null> {
  if (!isR2StorageActive()) return null;
  const object = await r2Download(sessionObjectKey(userId, session));
  // Missing OR cleared: both mean "this session has no stored history", which
  // the caller must be able to tell apart from a real (empty) result.
  if (!object) return null;
  const messages = parseMessageDocument(object.buffer);
  return messages.length ? messages : null;
}

export async function listChatHistoryFromR2(
  userId: string,
  prefix: string,
): Promise<Array<{ session: string; messages: StoredChatMessage[] }> | null> {
  if (!isR2StorageActive()) return null;
  return withUserLock(userId, async () => {
    const index = await readSessions(sessionIndexKey(userId));
    const results: Array<{ session: string; messages: StoredChatMessage[] }> = [];
    for (const [safeSession, clientSession] of index) {
      // Match the prefix against the CLIENT's session id, not the safe segment.
      if (!clientSession.startsWith(prefix)) continue;
      const object = await r2Download(sessionObjectKey(userId, safeSession));
      if (!object) continue;
      const messages = parseMessageDocument(object.buffer);
      if (!messages.length) continue;
      results.push({ session: clientSession, messages });
    }
    return results;
  });
}

/** Append through a per-user queue and merge a fresh read before every write. */
export async function appendChatHistoryToR2(
  userId: string,
  session: string,
  additions: Array<{ role: "user" | "assistant"; content: string }>,
): Promise<boolean> {
  if (!isR2StorageActive()) return false;
  const safeSession = sanitizeChatHistorySession(session);
  return withUserLock(userId, async () => {
    const key = sessionObjectKey(userId, safeSession);
    const indexKey = sessionIndexKey(userId);
    const { first, latest } = await readIndexTwice(indexKey);

    const beforeMerge = await readMessages(key);
    const messages = additions.map((message, index): StoredChatMessage => ({
      id: randomUUID(),
      role: message.role,
      content: message.content,
      created_at: new Date(Date.now() + index).toISOString(),
    }));
    // Re-read immediately before writing so external writers' ids are merged too.
    const latestMessages = await readMessages(key);
    const merged = mergeMessages(beforeMerge, latestMessages, messages);
    const sessions = new Map([...first, ...latest]);
    sessions.set(safeSession, session.slice(0, 128));
    const wroteIndex = await writeAccountedJson(userId, indexKey, Object.fromEntries(sessions));
    if (!wroteIndex) return false;
    return writeAccountedJson(userId, key, merged);
  });
}

export async function clearChatHistoryFromR2(
  userId: string,
  session: string | null,
): Promise<boolean> {
  if (!isR2StorageActive()) return false;
  const safeSession = session === null ? null : sanitizeChatHistorySession(session);
  return withUserLock(userId, async () => {
    const indexKey = sessionIndexKey(userId);
    if (!safeSession) {
      const sessions = await readSessions(indexKey);
      for (const item of sessions.keys()) await deleteAccounted(userId, sessionObjectKey(userId, item));
      await deleteAccounted(userId, indexKey);
      return true;
    }

    await deleteAccounted(userId, sessionObjectKey(userId, safeSession));
    const { first, latest } = await readIndexTwice(indexKey);
    const remaining = new Map([...first, ...latest]);
    remaining.delete(safeSession);
    if (remaining.size) {
      const wrote = await writeAccountedJson(userId, indexKey, Object.fromEntries(remaining));
      if (!wrote) return false;
    } else {
      await deleteAccounted(userId, indexKey);
    }
    return true;
  });
}
