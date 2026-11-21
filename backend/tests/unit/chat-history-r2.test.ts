import { beforeEach, describe, expect, it, vi } from "vitest";

const { r2Active, r2Delete, r2Download, r2Upload, insertChatMessages } = vi.hoisted(() => ({
  r2Active: vi.fn(),
  r2Delete: vi.fn(),
  r2Download: vi.fn(),
  r2Upload: vi.fn(),
  insertChatMessages: vi.fn(),
}));

vi.mock("../../src/services/profile-storage.js", () => ({
  accountStorageObject: vi.fn(async () => ({ ok: true })),
  releaseStoragePath: vi.fn(async () => {}),
}));

vi.mock("../../src/storage/r2.js", () => ({
  isR2StorageActive: r2Active,
  r2Delete,
  r2Download,
  r2Upload,
}));

vi.mock("../../src/db/repositories/chat.repository.js", () => ({
  deleteChatMessages: vi.fn(),
  fetchSessionMessages: vi.fn(),
  fetchSessionRows: vi.fn(),
  insertChatMessages,
}));

type FakeObject = { buffer: Buffer; contentType: string };
const objects = new Map<string, FakeObject>();
const uploadedKeys: string[] = [];

beforeEach(() => {
  objects.clear();
  uploadedKeys.length = 0;
  r2Active.mockReset().mockReturnValue(true);
  r2Delete.mockReset().mockImplementation(async (key: string) => {
    objects.delete(key);
  });
  r2Download.mockReset().mockImplementation(async (key: string) => objects.get(key) ?? null);
  r2Upload.mockReset().mockImplementation(async (key: string, body: Buffer, contentType: string) => {
    uploadedKeys.push(key);
    objects.set(key, { buffer: Buffer.from(body), contentType });
    return { url: "https://example.invalid/object" };
  });
  insertChatMessages.mockReset().mockResolvedValue({ missingTable: true, error: { message: "missing table" } });
});

describe("R2 chat history", () => {
  it("sanitizes path segments and scopes keys to the supplied user", async () => {
    const { appendChatHistoryToR2, loadChatHistoryFromR2, sanitizeChatHistorySession } = await import("../../src/services/chat-history-r2.js");
    expect(sanitizeChatHistorySession("../x%/foo")).toBe("___x__foo");
    expect(await appendChatHistoryToR2("user-a", "../x%/foo", [{ role: "user", content: "hello" }])).toBe(true);

    expect(uploadedKeys).toContain("chat-history/user-a/___x__foo.json");
    expect(uploadedKeys.every((key) => key.startsWith("chat-history/user-a/"))).toBe(true);
    expect(await loadChatHistoryFromR2("user-b", "../x%/foo")).toBeNull();
    expect(r2Download).toHaveBeenLastCalledWith("chat-history/user-b/___x__foo.json");
  });

  it("merges concurrent appends by id and keeps only the newest 500 messages", async () => {
    const { appendChatHistoryToR2, loadChatHistoryFromR2 } = await import("../../src/services/chat-history-r2.js");

    await Promise.all(Array.from({ length: 510 }, (_, index) => appendChatHistoryToR2(
      "user-a",
      "session-1",
      [{ role: "user", content: `message-${index}` }],
    )));

    const messages = await loadChatHistoryFromR2("user-a", "session-1");
    expect(messages).toHaveLength(500);
    expect(messages?.[0].content).toBe("message-10");
    expect(messages?.at(-1)?.content).toBe("message-509");
    expect(new Set(messages?.map((message) => message.id)).size).toBe(500);
  });

  it("lists stored sessions and deletes only the requested user's R2 history", async () => {
    const { appendChatHistoryToR2, clearChatHistoryFromR2, listChatHistoryFromR2 } = await import("../../src/services/chat-history-r2.js");
    await appendChatHistoryToR2("user-a", "one", [{ role: "user", content: "first" }]);
    await appendChatHistoryToR2("user-a", "two", [{ role: "assistant", content: "second" }]);
    await appendChatHistoryToR2("user-b", "one", [{ role: "user", content: "other user" }]);

    expect((await listChatHistoryFromR2("user-a", ""))?.map((item) => item.session)).toEqual(["one", "two"]);
    await clearChatHistoryFromR2("user-a", "one");
    expect(objects.has("chat-history/user-a/one.json")).toBe(false);
    expect(objects.has("chat-history/user-a/two.json")).toBe(true);
    expect(objects.has("chat-history/user-b/one.json")).toBe(true);
    expect(await clearChatHistoryFromR2("user-a", null)).toBe(true);
    expect(objects.has("chat-history/user-a/two.json")).toBe(false);
    expect(objects.has("chat-history/user-b/one.json")).toBe(true);
  });

  it("mirrors successful Supabase saves to R2", async () => {
    const { saveChatBatch } = await import("../../src/services/community.service.js");
    insertChatMessages.mockResolvedValue({ missingTable: false, error: null });

    await expect(saveChatBatch("user-a", "default", [{ role: "user", content: "hello" }]))
      .resolves.toEqual({ migrated: true, saved: 1 });
    expect(insertChatMessages).toHaveBeenCalledOnce();
    expect(r2Upload).toHaveBeenCalledWith(
      "chat-history/user-a/default.json",
      expect.any(Buffer),
      "application/json",
      expect.any(Object),
    );
  });

  it("falls back to R2 for session loads and session lists when Supabase is empty", async () => {
    const repository = await import("../../src/db/repositories/chat.repository.js");
    const { appendChatHistoryToR2 } = await import("../../src/services/chat-history-r2.js");
    const { listChatSessions, loadChatSession } = await import("../../src/services/community.service.js");
    vi.mocked(repository.fetchSessionRows).mockResolvedValue({ data: [], missingTable: false, error: null });
    vi.mocked(repository.fetchSessionMessages).mockResolvedValue({ data: [], missingTable: false, error: null });
    await appendChatHistoryToR2("user-a", "default", [{ role: "user", content: "saved in R2" }]);

    await expect(loadChatSession("user-a", "default", 20)).resolves.toMatchObject({
      migrated: true,
      messages: [{ session: "default", role: "user", content: "saved in R2" }],
    });
    await expect(listChatSessions("user-a", "")).resolves.toMatchObject({
      migrated: true,
      sessions: [{ session: "default", messages: 1, preview: "saved in R2" }],
    });
  });

  it("returns the legacy unavailable shape only when Supabase and R2 are both unavailable", async () => {
    const { saveChatBatch } = await import("../../src/services/community.service.js");
    r2Active.mockReturnValue(false);
    insertChatMessages.mockResolvedValue({ missingTable: true, error: { message: "missing table" } });

    await expect(saveChatBatch("user-a", "default", [{ role: "user", content: "hello" }]))
      .resolves.toEqual({ migrated: false, saved: 0 });
    expect(r2Upload).not.toHaveBeenCalled();
    expect(insertChatMessages).toHaveBeenCalledOnce();
  });
});
