/**
 * Named AI-client deny policy. Canonical copy also lives in
 * `packages/shared/src/utils/bot-policy.ts` for the Next.js proxy
 * (`@rn/shared/utils`). Keep both in sync — backend cannot import outside
 * `rootDir` / emit TS sources from the shared package at runtime.
 */
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
