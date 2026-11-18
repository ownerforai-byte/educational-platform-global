/**
 * Named AI-client deny policy. Canonical copy also lives in
 * `packages/shared/src/utils/bot-policy.ts` for the Next.js proxy
 * (`@rn/shared/utils`). Keep both in sync — backend cannot import outside
 * `rootDir` / emit TS sources from the shared package at runtime.
 *
 * Two distinct classes are recognised:
 *   - `BLOCKED_AI_AGENTS`: interactive coding agents / CLI clients — always denied.
 *   - `AI_SEARCH_CRAWLERS`: legitimate AI search/index/user-fetch crawlers that
 *     are welcomed on PUBLIC pages so the platform can be recommended by
 *     ChatGPT, Claude, Gemini, Perplexity and similar answer engines.
 */

/**
 * Interactive coding agents / CLI tools that impersonate a browser user-agent to
 * reach authenticated app surfaces. These are always denied on every route.
 */
export const BLOCKED_AI_AGENTS = [
  "OpenCode",
  "Codex",
  "OpenAI",
  "Claude-Code",
  "ClaudeCode",
  "Claude",
  "Anthropic",
] as const;

/**
 * Legitimate AI search / indexing / user-fetch crawlers. These are explicitly
 * *welcomed* on public, ungated pages so the platform can appear in AI answers
 * and recommendations. They are NOT part of the hard deny list.
 *
 * `ClaudeBot` / `Claude-User` / `Claude-SearchBot` / `anthropic-ai` are the
 * read-only AI crawlers (distinct from the `Claude` coding agent above).
 * `GPTBot` / `ChatGPT-User` / `OAI-SearchBot` are OpenAI's crawler trio.
 */
export const AI_SEARCH_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Bytespider",
  "cohere-ai",
  "YouBot",
] as const;

const blockedAgentPattern = new RegExp(
  `(?:^|[^a-z0-9])(?:${BLOCKED_AI_AGENTS.join("|")})(?:$|[^a-z0-9])`,
  "i",
);

const aiSearchCrawlerPattern = new RegExp(
  `(?:^|[^a-z0-9])(?:${AI_SEARCH_CRAWLERS.join("|")})(?:$|[^a-z0-9])`,
  "i",
);

/** True for interactive coding agents / CLI clients that must always be refused. */
export function isBlockedAutomatedClient(userAgent: string | null | undefined): boolean {
  if (!userAgent) return false;
  // A recognised AI search/index crawler is never a coding agent, even when its
  // name contains "Claude" or "anthropic" (e.g. Claude-User, anthropic-ai).
  if (aiSearchCrawlerPattern.test(userAgent)) return false;
  return blockedAgentPattern.test(userAgent);
}

/** True for the AI search / indexing crawlers we welcomed on public pages. */
export function isAiSearchCrawler(userAgent: string | null | undefined): boolean {
  return Boolean(userAgent && aiSearchCrawlerPattern.test(userAgent));
}