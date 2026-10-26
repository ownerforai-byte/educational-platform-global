/**
 * Central AI key resolver (plan.md §12 — M3).
 *
 * Every AI module (chat, image-gen, search-engine, quiz, evaluate) reads its
 * credentials through this file instead of touching `process.env` directly.
 *
 * Contract:
 *   · keys come from the git-ignored `backend/.env` (and root `.env`), loaded
 *     once by `src/index.ts` via dotenv before any route runs;
 *   · values are NEVER logged — only presence/absence is ever reported;
 *   · a missing key degrades its feature flag (the feature turns itself off)
 *     instead of throwing at request time.
 */

/** Trimmed, empty-as-missing lookup. Never returns the raw env object. */
function readKey(name: string): string | undefined {
  const value = process.env[name];
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

/* ── LLM providers (chat / quiz / evaluate / figure-draw) ─────────────────── */

/** Agnes (apihub) — the first link of the ordered AI chain. */
export function getAgnesKey(): string | undefined {
  return readKey("AGNES_API_KEY");
}

/** Groq — optional second link of the chain. */
export function getGroqKey(): string | undefined {
  return readKey("GROQ_API_KEY");
}

/** Cloudflare Workers AI — optional third link. */
export function getCloudflareAiKey(): string | undefined {
  return readKey("CF_AI_KEY") ?? readKey("CLOUDFLARE_API_KEY");
}

/** Cloudflare account id (falls back to the R2 account so one account drives both). */
export function getCloudflareAccountId(): string | undefined {
  return readKey("CF_ACCOUNT_ID") ?? readKey("R2_ACCOUNT_ID");
}

/** True when at least one LLM provider key is configured. */
export function hasAnyLlmKey(): boolean {
  return Boolean(getAgnesKey() || getGroqKey() || getCloudflareAiKey());
}

/* ── Image generation (Agnes gateway) ────────────────────────────────────── */

export function isImageGenConfigured(): boolean {
  return Boolean(getAgnesKey());
}

/* ── Google Custom Search (diagrams + image hub) ─────────────────────────── */

export function getGoogleCseKey(): string | undefined {
  return readKey("GOOGLE_CSE_API_KEY");
}

export function getGoogleCseCx(): string | undefined {
  return readKey("GOOGLE_CSE_CX");
}

export function isGoogleCseConfigured(): boolean {
  return Boolean(getGoogleCseKey() && getGoogleCseCx());
}

/* ── Web search engines (rotating set — first configured wins a slot) ────── */

export interface SearchEngineKeys {
  tavily?: string;
  exa?: string;
  firecrawl?: string;
  jina?: string;
  youcom?: string;
}

export function getSearchEngineKeys(): SearchEngineKeys {
  return {
    tavily: readKey("TAVILY_API_KEY"),
    exa: readKey("EXA_API_KEY"),
    firecrawl: readKey("FIRECRAWL_API_KEY"),
    jina: readKey("JINA_API_KEY"),
    youcom: readKey("YDC_API_KEY"),
  };
}

export function hasAnySearchEngine(): boolean {
  return Object.values(getSearchEngineKeys()).some(Boolean);
}

/* ── Presence report (safe to log / expose to the owner console) ─────────── */

/**
 * Boolean-only summary of what is configured. Contains NO key material, so it
 * can be logged at startup or returned by a diagnostics route without leaking
 * secrets.
 */
export function describeAiKeyStatus(): {
  llm: { agnes: boolean; groq: boolean; cloudflare: boolean };
  imageGen: boolean;
  googleCse: boolean;
  searchEngines: string[];
} {
  const search = getSearchEngineKeys();
  return {
    llm: {
      agnes: Boolean(getAgnesKey()),
      groq: Boolean(getGroqKey()),
      cloudflare: Boolean(getCloudflareAiKey()),
    },
    imageGen: isImageGenConfigured(),
    googleCse: isGoogleCseConfigured(),
    searchEngines: Object.entries(search)
      .filter(([, v]) => Boolean(v))
      .map(([name]) => name),
  };
}
