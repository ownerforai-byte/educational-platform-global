export interface AIChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface AISearchResult {
  title: string;
  url: string;
  type: string;
  relevance: number;
  snippet?: string;
}

export interface AISearchResponse {
  results: AISearchResult[];
  fallbackMessage?: string;
  syllabusHints?: Array<{ subject: string; unit: string; topics: string[] }>;
}

export interface AIProvider {
  name: string;
  chat(messages: AIChatMessage[]): Promise<string>;
  search(query: string): Promise<AISearchResponse>;
}
