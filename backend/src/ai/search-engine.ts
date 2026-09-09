/**
 * WebSearchService — Performs real-time internet searches via Google Custom Search JSON API.
 *
 * Free tier: 100 queries/day — https://developers.google.com/custom-search/v1/overview
 *
 * Required env vars:
 *   GOOGLE_SEARCH_API_KEY      — from https://console.cloud.google.com/apis/credentials
 *   GOOGLE_SEARCH_ENGINE_ID    — from https://programmablesearchengine.google.com
 */

export interface WebSearchResult {
  title: string;
  link: string;
  snippet: string;
  displayLink: string;
}

export interface WebSearchResponse {
  results: WebSearchResult[];
  searchInformation?: {
    totalResults: string;
    searchTime: number;
  };
}

export class WebSearchService {
  private apiKey: string;
  private engineId: string;
  private enabled: boolean;

  constructor() {
    this.apiKey = process.env.GOOGLE_SEARCH_API_KEY ?? "";
    this.engineId = process.env.GOOGLE_SEARCH_ENGINE_ID ?? "";
    this.enabled = Boolean(this.apiKey && this.engineId);

    if (!this.enabled) {
      console.warn(
        "[SearchEngine] Google Custom Search not configured. " +
        "Set GOOGLE_SEARCH_API_KEY and GOOGLE_SEARCH_ENGINE_ID in .env to enable real-time internet search.",
      );
    }
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  /**
   * Perform a web search and return structured results.
   * @param query - The search query string
   * @param numResults - Number of results to return (1-10, default 5)
   * @returns Array of web search results
   */
  async search(query: string, numResults: number = 5): Promise<WebSearchResult[]> {
    if (!this.enabled) {
      throw new Error("Web search not configured. Missing GOOGLE_SEARCH_API_KEY or GOOGLE_SEARCH_ENGINE_ID.");
    }

    const params = new URLSearchParams({
      key: this.apiKey,
      cx: this.engineId,
      q: query,
      num: Math.min(Math.max(numResults, 1), 10).toString(),
    });

    const url = `https://www.googleapis.com/customsearch/v1?${params.toString()}`;

    try {
      const res = await fetch(url);

      if (!res.ok) {
        const text = await res.text();
        console.error(`[SearchEngine] Google Custom Search error: ${res.status} ${text}`);
        throw new Error(`Google Custom Search error: ${res.status}`);
      }

      const data = await res.json();
      const items = data?.items ?? [];

      return items.map((item: any) => ({
        title: item.title ?? "",
        link: item.link ?? "",
        snippet: item.snippet ?? "",
        displayLink: item.displayLink ?? "",
      }));
    } catch (err: any) {
      console.error("[SearchEngine] Search failed:", err.message);
      throw err;
    }
  }

  /**
   * Perform a web search and return results formatted as context text
   * suitable for injection into an LLM prompt.
   */
  async searchAsContext(query: string, numResults: number = 5): Promise<string> {
    if (!this.enabled) return "";

    try {
      const results = await this.search(query, numResults);

      if (!results.length) return "";

      const lines = ["[REAL-TIME INTERNET SEARCH RESULTS]", ""];
      for (let i = 0; i < results.length; i++) {
        const r = results[i];
        lines.push(`${i + 1}. ${r.title}`);
        lines.push(`   Source: ${r.link}`);
        lines.push(`   ${r.snippet}`);
        lines.push("");
      }
      lines.push("[END OF SEARCH RESULTS]");
      lines.push("");
      lines.push("Use the above real-time search results to provide an accurate, up-to-date answer. " +
        "Always cite your sources with links. If the search results are relevant, prioritize them over your training data.");

      return lines.join("\n");
    } catch (err: any) {
      console.error("[SearchEngine] Failed to build search context:", err.message);
      return "";
    }
  }
}

/** Singleton instance — lazy initialized after dotenv loads. */
let _instance: WebSearchService | null = null;

export function getSearchService(): WebSearchService {
  if (!_instance) {
    _instance = new WebSearchService();
  }
  return _instance;
}
