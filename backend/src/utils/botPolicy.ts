export const BLOCKED_AI_AGENTS = [
  "OpenCode",
  "Codex",
  "OpenAI",
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "Claude",
  "ClaudeBot",
  "Claude-Code",
  "ClaudeCode",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "Anthropic",
] as const;

const blockedAgentPattern = new RegExp(
  `(?:^|[^a-z0-9])(?:${BLOCKED_AI_AGENTS.join("|")})(?:$|[^a-z0-9])`,
  "i",
);

export function isBlockedAutomatedClient(userAgent: string | null | undefined): boolean {
  return Boolean(userAgent && blockedAgentPattern.test(userAgent));
}
