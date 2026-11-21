import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const tryChatProvider = vi.fn();
const chat = vi.fn();
const getProviders = vi.fn();

vi.mock("../../src/ai/service", () => ({
  createAIService: () => ({
    tryChatProvider,
    chat,
    getProviders,
  }),
}));

vi.mock("../../src/ai/curriculum-retrieval", () => ({
  buildCurriculumContext: () => "",
  DEFAULT_RECORD_LIMIT: 8,
}));

vi.mock("../../src/ai/community-bot-daily-provider", () => ({
  configuredCommunityBotProviderPool: () => ["nvidia", "groq"],
  getCommunityBotDailyProvider: (_now: number, live?: readonly string[]) => {
    const pool = ["nvidia", "groq"].filter((n) => !live?.length || live.includes(n));
    return pool[0] ?? "";
  },
}));

describe("generateCommunityAssistantReply", () => {
  beforeEach(() => {
    tryChatProvider.mockReset();
    chat.mockReset();
    getProviders.mockReset();
    getProviders.mockReturnValue(["groq", "nvidia"]);
  });

  afterEach(() => {
    vi.resetModules();
  });

  it("retries pool members then falls back to the AIService chain", async () => {
    tryChatProvider.mockImplementation(async (name: string) => {
      if (name === "nvidia") return null;
      if (name === "groq") return "  **Hello** from groq  ";
      return null;
    });

    const { generateCommunityAssistantReply } = await import("../../src/services/community-ai-reply");
    const text = await generateCommunityAssistantReply({
      title: "q",
      body: "body",
      category: "physics",
    });

    expect(tryChatProvider).toHaveBeenCalled();
    expect(chat).not.toHaveBeenCalled();
    expect(text).toBe("**Hello** from groq");
  });

  it("asks for a neutral conceptual reply when the bot is tagged", async () => {
    tryChatProvider.mockResolvedValue("A fair reading of the idea.");

    const { generateCommunityAssistantReply } = await import("../../src/services/community-ai-reply");
    await generateCommunityAssistantReply({
      title: "A thought",
      body: "@community-bot what do you make of this?",
      category: "general",
      tagged: true,
    });

    const messages = tryChatProvider.mock.calls[0][1] as Array<{ content: string }>;
    expect(messages[0].content).toMatch(/neutral/i);
    expect(messages[0].content).toMatch(/conceptual/i);
    expect(messages[0].content).toMatch(/moral/i);
  });

  it("uses the chain when every pool member fails", async () => {
    tryChatProvider.mockResolvedValue(null);
    chat.mockResolvedValue("Chain answer");

    const { generateCommunityAssistantReply } = await import("../../src/services/community-ai-reply");
    const text = await generateCommunityAssistantReply({
      title: "q",
      body: "",
      category: "general",
    });

    expect(chat).toHaveBeenCalledWith("", expect.any(Array));
    expect(text).toBe("Chain answer");
  });

  it("throws a 503-safe error when the chain fails", async () => {
    tryChatProvider.mockResolvedValue(null);
    chat.mockRejectedValue(new Error("upstream refused"));

    const { generateCommunityAssistantReply, CommunityAssistantReplyError } = await import(
      "../../src/services/community-ai-reply"
    );

    await expect(
      generateCommunityAssistantReply({ title: "t", body: "b", category: "general" }),
    ).rejects.toBeInstanceOf(CommunityAssistantReplyError);

    await expect(
      generateCommunityAssistantReply({ title: "t", body: "b", category: "general" }),
    ).rejects.toMatchObject({ status: 503 });
  });
});