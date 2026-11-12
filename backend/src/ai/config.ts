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

/** Cerebras — fast-generation link (quiz generation lane). */
export function getCerebrasKey(): string | undefined {
  return readKey("CEREBRAS_API_KEY");
}

/** Gemini — long-context link (evaluation + figure lane). */
export function getGeminiKey(): string | undefined {
  return readKey("GEMINI_API_KEY");
}

/** Cloudflare Workers AI — optional third link. */
export function getCloudflareAiKey(): string | undefined {
  return readKey("CF_AI_KEY") ?? readKey("CLOUDFLARE_API_KEY");
}

/** Cloudflare account id (falls back to the R2 account so one account drives both). */
export function getCloudflareAccountId(): string | undefined {
  return readKey("CF_ACCOUNT_ID") ?? readKey("R2_ACCOUNT_ID");
}

/* ── Free-tier LLM fallbacks (awesome-free-llm-apis) ─────────────────────── */

/**
 * First non-blank key among a free provider's accepted env var names.
 * Providers in `free-llm-providers.ts` pass their alias list, so adding a
 * provider never needs a new named getter here.
 */
export function getFreeLlmKey(envVars: readonly string[]): string | undefined {
  for (const name of envVars) {
    const key = readKey(name);
    if (key) return key;
  }
  return undefined;
}

/**
 * Owner switch for the free-tier fallback pool: `FREE_LLM_DISABLED=1` keeps
 * every awesome-free-llm-apis provider (including the keyless one) out of the
 * chain, so the owner's paid links answer alone.
 */
export function isFreeLlmDisabled(): boolean {
  const flag = readKey("FREE_LLM_DISABLED")?.toLowerCase();
  return flag === "1" || flag === "true" || flag === "yes";
}

/** True when at least one LLM provider key is configured. */
export function hasAnyLlmKey(): boolean {
  return Boolean(
    getAgnesKey() ||
      getGroqKey() ||
      getCerebrasKey() ||
      getGeminiKey() ||
      getCloudflareAiKey()
  );
}

/* ── Work-type lanes (owner 2026-10-25) ─────────────────────────────────────
 *
 * "i want to add ai in the platform widely, and one api key for one type from
 * that widely so no delays in work" — each AI work type gets its OWN provider
 * key, so a burst of quiz generation never queues behind a tutor chat (or
 * vice versa). Every lane degrades to the shared chat chain when its
 * dedicated provider is unconfigured, so a missing key turns that lane off
 * instead of throwing.
 */

export type AiWorkType =
  | "chat" // Veer tutor conversations (owner policy: Agnes answers chat)
  | "quiz-generate" // question generation for the quiz studio
  | "evaluate" // AI marking + feedback on submitted answers
  | "math" // step-by-step math solver
  | "deep-dive" // Deep Concept Studio explanations
  | "image-gen" // image hub generation (Agnes gateway)
  | "figure" // vector academic-figure writer
  | "diagram" // Google-grounded diagram research + image facts cards
  | "enhance" // note/text enhancement
  | "history-search" // searching the student's own saved conversations
  | "search"; // web search fallback for the professor chain

/**
 * Provider that owns each lane. The mapping is the owner's split: one key per
 * work type so parallel features never share a rate limit — a burst of quiz
 * marking never queues behind tutor chat. Work types with related profiles
 * share a provider key (fast-generation tasks on Cerebras, long-context ones
 * on Gemini, light rewrites on Groq).
 */
export const AI_WORK_LANES: Record<AiWorkType, SupportedProviderName> = {
  chat: "agnes",
  "quiz-generate": "cerebras",
  evaluate: "gemini",
  math: "cerebras",
  "deep-dive": "gemini",
  "image-gen": "agnes",
  figure: "gemini",
  diagram: "gemini",
  enhance: "groq",
  "history-search": "groq",
  search: "cloudflare",
};

export type SupportedProviderName =
  | "agnes"
  | "groq"
  | "cerebras"
  | "gemini"
  | "cloudflare";

/** Key backing a lane's provider, or undefined when that provider is off. */
export function getWorkLaneKey(work: AiWorkType): string | undefined {
  switch (AI_WORK_LANES[work]) {
    case "agnes":
      return getAgnesKey();
    case "groq":
      return getGroqKey();
    case "cerebras":
      return getCerebrasKey();
    case "gemini":
      return getGeminiKey();
    case "cloudflare":
      return getCloudflareAiKey();
  }
}

/**
 * Provider a work type should call first — `""` means "no dedicated lane
 * configured", which AIService.chat already treats as "use the ordered
 * chain". Every call site passes this instead of a hardcoded provider, so a
 * missing key degrades that lane to the shared chain instead of throwing.
 */
export function getWorkLaneProvider(work: AiWorkType): SupportedProviderName | "" {
  return getWorkLaneKey(work) ? AI_WORK_LANES[work] : "";
}

/* ── Diagram Hub — dedicated free Google AI Studio lane (2026-11-12) ────────
 *
 * The Diagram Hub draws through its OWN Google AI Studio API key so a burst
 * of drawings never queues behind tutor chat (owner 2026-10-25: "one api key
 * for one type … so no delays in work").
 *
 * Model choice: Gemini 3.8 Flash is the current Flash model recommended for
 * new projects, and on the Gemini API Free Tier its input, output AND context
 * caching are all "Free of charge" — a real API key with no paid usage.
 * Grounding with Google Search is NOT available on that free tier, so diagram
 * research stays SERVER-SIDE: buildProfessorContext() / fetchDiagramContext()
 * supply real reference figures before the model ever sees the request.
 *
 * This provider is deliberately NOT part of AI_WORK_LANES (which still owns
 * the image-facts "diagram" work type) and NOT part of AI_CHAIN_ORDER: it
 * answers only when /api/ai explicitly resolves a Diagram Hub request to it.
 */
export const DIAGRAM_HUB_PROVIDER = "diagram-hub";

/** Google's current recommended Flash model; free of charge on the free tier. */
export const DEFAULT_FREE_GEMINI_MODEL = "gemini-3.8-flash";

/** Dedicated key, falling back to the shared Gemini key for zero-config setups. */
export function getDiagramHubKey(): string | undefined {
  return readKey("DIAGRAM_GEMINI_API_KEY") ?? getGeminiKey();
}

/** Override when Google publishes a newer free Flash model. */
export function getDiagramHubModel(): string {
  return readKey("DIAGRAM_GEMINI_MODEL") ?? DEFAULT_FREE_GEMINI_MODEL;
}

export function isDiagramHubConfigured(): boolean {
  return Boolean(getDiagramHubKey());
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
  llm: {
    agnes: boolean;
    groq: boolean;
    cerebras: boolean;
    gemini: boolean;
    cloudflare: boolean;
  };
  imageGen: boolean;
  diagramHub: boolean;
  /** Model id is not secret — safe for the owner diagnostics panel. */
  diagramHubModel: string;
  googleCse: boolean;
  searchEngines: string[];
} {
  const search = getSearchEngineKeys();
  return {
    llm: {
      agnes: Boolean(getAgnesKey()),
      groq: Boolean(getGroqKey()),
      cerebras: Boolean(getCerebrasKey()),
      gemini: Boolean(getGeminiKey()),
      cloudflare: Boolean(getCloudflareAiKey()),
    },
    imageGen: isImageGenConfigured(),
    diagramHub: isDiagramHubConfigured(),
    diagramHubModel: getDiagramHubModel(),
    googleCse: isGoogleCseConfigured(),
    searchEngines: Object.entries(search)
      .filter(([, v]) => Boolean(v))
      .map(([name]) => name),
  };
}
