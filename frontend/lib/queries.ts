export type SearchResult = {
  title: string;
  url: string;
  type: string;
  relevance: number;
  snippet?: string;
};

export type SyllabusHint = {
  subject: string;
  unit: string;
  topics: string[];
};

export type SearchResponse = {
  results: SearchResult[];
  fallbackMessage?: string;
  officialLink?: string;
  syllabusHints: SyllabusHint[];
};
