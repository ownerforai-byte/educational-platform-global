/**
 * WebSearchService — multi-source real-time web search for answer grounding.
 *
 * Owner rule (2026-09-28): every reply gathers from AT LEAST 2 and AT MOST 3
 * sources at a time. The configured engines rotate call-by-call so no single
 * key absorbs all traffic; each engine is queried in parallel, results are
 * merged and de-duplicated by URL, then capped to the requested count.
 *
 * Engines (set at least one key in backend/.env):
 *   TAVILY_API_KEY     — https://app.tavily.com
 *   EXA_API_KEY        — https://exa.ai
 *   FIRECRAWL_API_KEY  — https://firecrawl.dev
 *   JINA_API_KEY       — https://jina.ai  (s.jina.ai search)
 *   YDC_API_KEY        — https://you.com  (ydc-index.io search)
 */

export interface WebSearchResult {
  title: string;
  link: string;
  snippet: string;
  displayLink: string;
  /**
   * Real image URLs the engine returned for this result. These are the only
   * URLs the tutor is allowed to embed in a reply — the owner asked for images
   * IN the answer, and inventing one is impossible from this list.
   */
  images?: string[];
  /** Page text (truncated) when the engine can supply it — real depth, not a teaser. */
  rawContent?: string;
}

export interface WebSearchResponse {
  results: WebSearchResult[];
  searchInformation?: {
    totalResults: string;
    searchTime: number;
  };
}

export type EngineName = "tavily" | "exa" | "firecrawl" | "jina" | "youcom";

const ENGINE_TIMEOUT_MS = Number(process.env.SEARCH_ENGINE_TIMEOUT_MS) || 12_000;

/** How much of a source page is kept — depth without blowing the prompt. */
const RAW_CONTENT_CHARS = Number(process.env.SEARCH_RAW_CONTENT_CHARS) || 2500;

function hostnameOf(url: string): string {
  if (!url) return "";
  try {
    return new URL(url).hostname;
  } catch {
    return "";
  }
}

/**
 * Pick which engines answer THIS query: at least `min` (2) and at most `max`
 * (3) of the configured ones, rotated by `offset` so successive queries walk
 * through the whole pool. Fewer than `min` configured → use them all.
 */
export function selectProviders(
  available: string[],
  offset = 0,
  min = 2,
  max = 3,
): string[] {
  if (available.length === 0) return [];
  const take = Math.min(
    available.length,
    Math.max(min, Math.min(max, available.length)),
  );
  return Array.from(
    { length: take },
    (_, i) => available[(offset + i) % available.length],
  );
}

// ── Engine adapters ─────────────────────────────────────────────────────────

/**
 * Tavily — the primary academic engine. `search_depth: "advanced"` plus
 * `include_raw_content` turns a one-line teaser into a readable page extract,
 * and `include_images` is what makes "present images in its reply" possible.
 * (The old call asked for "basic" depth and no images, which is a large part of
 * why replies read as light.)
 */
async function searchTavily(
  query: string,
  numResults: number,
  key: string,
): Promise<WebSearchResult[]> {
  const res = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: key,
      query: query.slice(0, 1000),
      search_depth: process.env.TAVILY_SEARCH_DEPTH || "advanced",
      max_results: Math.min(Math.max(numResults, 1), 10),
      include_answer: false,
      include_raw_content: true,
      include_images: true,
    }),
    signal: AbortSignal.timeout(ENGINE_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`Tavily ${res.status}`);
  const data = (await res.json()) as {
    results?: Array<{
      title?: string;
      url?: string;
      content?: string;
      raw_content?: string;
      images?: string[];
    }>;
    images?: Array<string | { url?: string }>;
  };
  const pageImages = (data.images ?? [])
    .map((img) => (typeof img === "string" ? img : img?.url ?? ""))
    .filter((url) => /^https?:\/\//.test(url));
  return (data.results ?? []).map((item, index) => ({
    title: item.title ?? "",
    link: item.url ?? "",
    snippet: item.content ?? "",
    displayLink: hostnameOf(item.url ?? ""),
    images: [...(item.images ?? []), ...(index === 0 ? pageImages : [])].filter((url) =>
      /^https?:\/\//.test(url),
    ),
    rawContent: item.raw_content ? item.raw_content.slice(0, RAW_CONTENT_CHARS) : undefined,
  }));
}

async function searchExa(
  query: string,
  numResults: number,
  key: string,
): Promise<WebSearchResult[]> {
  const res = await fetch("https://api.exa.ai/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": key,
    },
    body: JSON.stringify({
      query: query.slice(0, 1000),
      numResults: Math.min(Math.max(numResults, 1), 10),
      type: "auto",
      // 600 characters was a teaser; a real extract is what grounds depth.
      contents: { text: { maxCharacters: RAW_CONTENT_CHARS } },
    }),
    signal: AbortSignal.timeout(ENGINE_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`Exa ${res.status}`);
  const data = (await res.json()) as {
    results?: Array<{ title?: string; url?: string; text?: string; image?: string }>;
  };
  return (data.results ?? []).map((item) => ({
    title: item.title ?? "",
    link: item.url ?? "",
    snippet: item.text ?? "",
    displayLink: hostnameOf(item.url ?? ""),
    images: item.image && /^https?:\/\//.test(item.image) ? [item.image] : undefined,
  }));
}

async function searchFirecrawl(
  query: string,
  numResults: number,
  key: string,
): Promise<WebSearchResult[]> {
  const res = await fetch("https://api.firecrawl.dev/v1/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      query: query.slice(0, 1000),
      limit: Math.min(Math.max(numResults, 1), 10),
    }),
    signal: AbortSignal.timeout(ENGINE_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`Firecrawl ${res.status}`);
  const data = (await res.json()) as {
    data?: Array<{ title?: string; url?: string; description?: string }>;
  };
  return (data.data ?? []).map((item) => ({
    title: item.title ?? "",
    link: item.url ?? "",
    snippet: item.description ?? "",
    displayLink: hostnameOf(item.url ?? ""),
  }));
}

async function searchJina(
  query: string,
  _numResults: number,
  key: string,
): Promise<WebSearchResult[]> {
  const res = await fetch(
    `https://s.jina.ai/?q=${encodeURIComponent(query.slice(0, 1000))}`,
    {
      headers: {
        Authorization: `Bearer ${key}`,
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(ENGINE_TIMEOUT_MS),
    },
  );
  if (!res.ok) throw new Error(`Jina ${res.status}`);
  const data = (await res.json()) as {
    data?: Array<{ title?: string; url?: string; description?: string }>;
  };
  return (data.data ?? []).map((item) => ({
    title: item.title ?? "",
    link: item.url ?? "",
    snippet: item.description ?? "",
    displayLink: hostnameOf(item.url ?? ""),
  }));
}

async function searchYoucom(
  query: string,
  numResults: number,
  key: string,
): Promise<WebSearchResult[]> {
  const res = await fetch("https://ydc-index.io/v1/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": key,
    },
    body: JSON.stringify({
      query: query.slice(0, 1000),
      num_web_results: Math.min(Math.max(numResults, 1), 10),
    }),
    signal: AbortSignal.timeout(ENGINE_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`you.com ${res.status}`);
  const data = (await res.json()) as {
    results?: {
      web?: Array<{
        title?: string;
        url?: string;
        snippets?: Array<{ text?: string }>;
      }>;
    };
  };
  return (data.results?.web ?? []).map((item) => ({
    title: item.title ?? "",
    link: item.url ?? "",
    snippet: (item.snippets ?? []).map((s) => s.text ?? "").join(" ").trim(),
    displayLink: hostnameOf(item.url ?? ""),
  }));
}

// ── Service ─────────────────────────────────────────────────────────────────

export class WebSearchService {
  /** Engine name → env key (order = rotation order). */
  private readonly engineKeys: Array<{
    name: EngineName;
    key: string;
    run: (q: string, n: number, k: string) => Promise<WebSearchResult[]>;
  }> = [];

  private round = 0;
  private enabled: boolean;

  constructor() {
    const defs: Array<{
      name: EngineName;
      env: string;
      run: (q: string, n: number, k: string) => Promise<WebSearchResult[]>;
    }> = [
      { name: "tavily", env: "TAVILY_API_KEY", run: searchTavily },
      { name: "exa", env: "EXA_API_KEY", run: searchExa },
      { name: "firecrawl", env: "FIRECRAWL_API_KEY", run: searchFirecrawl },
      { name: "jina", env: "JINA_API_KEY", run: searchJina },
      { name: "youcom", env: "YDC_API_KEY", run: searchYoucom },
    ];
    for (const d of defs) {
      const key = process.env[d.env] ?? "";
      if (key) this.engineKeys.push({ name: d.name, key, run: d.run });
    }

    this.enabled = this.engineKeys.length > 0;

    if (!this.enabled) {
      console.warn(
        "[SearchEngine] No search engine configured. Set TAVILY_API_KEY, " +
          "EXA_API_KEY, FIRECRAWL_API_KEY, JINA_API_KEY or YDC_API_KEY " +
          "in backend/.env to enable real-time internet search.",
      );
    } else {
      console.log(
        `[SearchEngine] engines: ${this.engineKeys
          .map((e) => e.name)
          .join(", ")} (2–3 per query, rotating)`,
      );
    }
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  /** Names of the configured engines (for tests / diagnostics). */
  configuredEngines(): EngineName[] {
    return this.engineKeys.map((e) => e.name);
  }

  /**
   * Gather results from 2–3 engines in parallel (rotating pool), merge and
   * de-duplicate by URL, then cap to `numResults`.
   */
  async search(query: string, numResults: number = 5): Promise<WebSearchResult[]> {
    if (!this.enabled) {
      throw new Error(
        "Web search not configured. Missing search engine API keys.",
      );
    }

    const available = this.engineKeys.map((e) => e.name);
    const chosen = selectProviders(available, this.round++);
    const perEngine = Math.max(
      2,
      Math.ceil(Math.max(numResults, 1) / chosen.length),
    );

    const picks = chosen.map(
      (name) => this.engineKeys.find((e) => e.name === name)!,
    );
    const settled = await Promise.allSettled(
      picks.map((e) => e.run(query, perEngine, e.key)),
    );

    const merged: WebSearchResult[] = [];
    const seen = new Set<string>();
    let failures = 0;

    settled.forEach((r, i) => {
      if (r.status === "rejected") {
        failures++;
        console.error(
          `[SearchEngine] ${picks[i].name} failed:`,
          r.reason instanceof Error ? r.reason.message : r.reason,
        );
        return;
      }
      for (const item of r.value) {
        const dedupeKey = item.link || `${item.title}|${item.snippet.slice(0, 60)}`;
        if (seen.has(dedupeKey)) continue;
        seen.add(dedupeKey);
        merged.push(item);
      }
    });

    if (failures === picks.length) {
      throw new Error(`All selected search engines failed: ${chosen.join(", ")}`);
    }

    // Partition the deduped results by the engine that produced them, then
    // emit round-robin: one chatty engine can never crowd out the others, so
    // every reply stays grounded in ≥2 sources.
    const linkOwner = new Map<string, number>();
    settled.forEach((r, i) => {
      if (r.status !== "fulfilled") return;
      for (const item of r.value) {
        const k = item.link || `${item.title}|${item.snippet.slice(0, 60)}`;
        if (!linkOwner.has(k)) linkOwner.set(k, i);
      }
    });
    const grouped: WebSearchResult[][] = picks.map(() => []);
    for (const item of merged) {
      const owner = linkOwner.get(
        item.link || `${item.title}|${item.snippet.slice(0, 60)}`,
      );
      if (owner !== undefined) grouped[owner].push(item);
    }
    const out: WebSearchResult[] = [];
    for (let row = 0; out.length < numResults; row++) {
      let progressedRow = false;
      for (const g of grouped) {
        if (g[row] && out.length < numResults) {
          out.push(g[row]);
          progressedRow = true;
        }
      }
      if (!progressedRow) break;
    }

    console.log(
      `[SearchEngine] "${query.slice(0, 60)}" → ${out.length} results from ` +
        `${chosen.join("+")}`,
    );
    return out;
  }

  /**
   * Perform a web search and return results formatted as context text
   * suitable for injection into an LLM prompt.
   */
  async searchAsContext(query: string, numResults: number = 6): Promise<string> {
    if (!this.enabled) return "";

    try {
      const results = await this.search(query, numResults);
      if (!results.length) return "";
      return formatSearchContext(results);
    } catch (err: any) {
      console.error("[SearchEngine] Failed to build search context:", err.message);
      return "";
    }
  }
}

/**
 * Format search results as the `[REAL-TIME INTERNET SEARCH RESULTS]` block.
 *
 * Pure and exported so the contract is testable without a network call — which
 * matters, because two of the owner's requirements live in this text: a
 * complete answer must be allowed to draw on ALL the gathered sources (the old
 * wording capped the reply at three), and real image URLs must reach the model
 * so it can put pictures inside the answer.
 */
export function formatSearchContext(
  results: WebSearchResult[],
  opts: { maxSources?: number } = {},
): string {
  if (!results.length) return "";
  // Aligned with the number of results the chat layer asks for: a complete
  // answer may draw on all of them, so nothing gathered is dropped silently.
  const chosen = results.slice(0, Math.max(1, opts.maxSources ?? 6));

  const sources = [...new Set(chosen.map((r) => r.displayLink).filter(Boolean))];
  const images = chosen
    .flatMap((r, i) =>
      (r.images ?? []).slice(0, 2).map((url) => ({ url, title: r.title, index: i + 1 })),
    )
    .slice(0, 6);

  const lines = ["[REAL-TIME INTERNET SEARCH RESULTS]", ""];
  if (sources.length) {
    lines.push(
      `Gathered from ${sources.length} independent source${sources.length === 1 ? "" : "s"}: ${sources.join(", ")}.`,
      "",
    );
  }
  for (let i = 0; i < chosen.length; i++) {
    const r = chosen[i];
    lines.push(`${i + 1}. ${r.title}`);
    lines.push(`   Source: ${r.link}`);
    lines.push(`   ${r.snippet}`);
    if (r.rawContent) lines.push(`   Page extract: ${r.rawContent}`);
    lines.push("");
  }

  if (images.length) {
    lines.push(
      "[REAL IMAGE URLS ATTACHED — EMBED THE RELEVANT ONES IN THE REPLY]",
      "These are real, verified image links returned by the search engines. Where the answer explains",
      "a structure, organ, apparatus, graph, wave, circuit, ray diagram, molecular shape or cycle,",
      "embed the best 1-3 as ![short description](url) directly after that explanation, so the student",
      "sees the picture beside the idea. Only these URLs may be embedded — never invent an image URL,",
      "and never write an image line when none was attached.",
    );
    for (const img of images) {
      lines.push(`   • ${img.url}   (from result ${img.index}: ${img.title})`);
    }
    lines.push("");
  }

  lines.push("[END OF SEARCH RESULTS]");
  lines.push("");
  lines.push(
    "Use the above real-time search results to provide an accurate, up-to-date answer. " +
      "Ground the reply in at least two of these sources, and use EVERY result that adds a fact " +
      "about the asked concept — a complete answer may draw on all of them, so never drop a source " +
      "that carries something the student needs. Credit sources by NAME in plain words " +
      "(as per NASA, as per WHO) instead of dumping URLs, and prefer these results over your " +
      "training data whenever they are relevant.",
  );

  return lines.join("\n");
}

/** Singleton instance — lazy initialized after dotenv loads. */
let _instance: WebSearchService | null = null;

export function getSearchService(): WebSearchService {
  if (!_instance) {
    _instance = new WebSearchService();
  }
  return _instance;
}
