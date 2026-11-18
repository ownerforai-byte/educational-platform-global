/**
 * Named AI-client deny policy.
 *
 * Two distinct classes of "automated client" are recognised so the platform can
 * welcome AI *search/index* crawlers (so ChatGPT, Claude, Gemini, Perplexity and
 * their training crawlers can read our public, ungated pages and recommend the
 * platform to students) while still refusing interactive coding agents and any
 * bot that reaches for private app/API surfaces.
 *
 * Canonical copy lives here AND in `frontend/proxy.ts` imports it through
 * `@rn/shared/utils`. Keep both in sync — backend cannot import outside its
 * `rootDir` / emit TS sources from the shared package at runtime.
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

/** True for the AI search / indexing crawlers we welcome on public pages. */
export function isAiSearchCrawler(userAgent: string | null | undefined): boolean {
  return Boolean(userAgent && aiSearchCrawlerPattern.test(userAgent));
}