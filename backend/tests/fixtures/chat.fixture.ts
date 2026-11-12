import { mergeFixture, type DeepPartial } from "./factory";

export type ChatMessageFixture = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type ChatTurnFixture = {
  id: string;
  userId: string;
  subject: string;
  messages: ChatMessageFixture[];
};

const TURN_BASE: ChatTurnFixture = {
  id: "chat-1",
  userId: "11111111-1111-4111-8111-111111111111",
  subject: "physics",
  messages: [
    { role: "user", content: "Define velocity." },
    {
      role: "assistant",
      content: "Velocity is displacement per unit time with direction.",
    },
  ],
};

export function buildChatTurn(overrides?: DeepPartial<ChatTurnFixture>): ChatTurnFixture {
  return mergeFixture(TURN_BASE, overrides);
}

export function buildUserMessage(content: string): ChatMessageFixture {
  return { role: "user", content };
}

export function buildAssistantMessage(content: string): ChatMessageFixture {
  return { role: "assistant", content };
}
