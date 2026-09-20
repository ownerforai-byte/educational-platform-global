/**
 * WebSearchService — Performs real-time internet searches for AI grounding.
 *
 * Tavily is preferred because its API is designed for LLM retrieval.
 *
 * Required env vars:
 *   TAVILY_API_KEY             — from https://app.tavily.com
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
  private tavilyApiKey: string;
  private enabled: boolean;

  constructor() {
    this.tavilyApiKey = process.env.TAVILY_API_KEY ?? "";
    this.enabled = Boolean(this.tavilyApiKey);

    if (!this.enabled) {
      console.warn(
        "[SearchEngine] Tavily not configured. " +
        "Set TAVILY_API_KEY in backend/.env to enable real-time internet search.",
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
      throw new Error("Web search not configured. Missing TAVILY_API_KEY.");
    }

    try {
      const res = await fetch("https://api.tavily.com/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: this.tavilyApiKey,
          query: query.slice(0, 1000),
          search_depth: "basic",
          max_results: Math.min(Math.max(numResults, 1), 10),
          include_answer: false,
          include_raw_content: false,
        }),
        signal: AbortSignal.timeout(8000),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error(`[SearchEngine] Tavily error: ${res.status} ${text}`);
        throw new Error(`Tavily search error: ${res.status}`);
      }

      const data = (await res.json()) as {
        results?: Array<{
          title?: string;
          url?: string;
          content?: string;
        }>;
      };

      return (data.results ?? []).map((item) => ({
        title: item.title ?? "",
        link: item.url ?? "",
        snippet: item.content ?? "",
        displayLink: item.url ? new URL(item.url).hostname : "",
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
