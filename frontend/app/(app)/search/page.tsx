"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { searchContent } from "@/lib/api/content";
import type { SearchResultItem } from "@/types/api";

/**
 * Notes / content discovery route (client component).
 *
 * The "Search Notes" primary actions on the disabled-notes migration pages
 * (r-notes-disabled, ravikishan-notes-disabled) target this path. Before it
 * existed, those buttons 404'd because search was only reachable through the
 * global Ctrl+K command palette. This page reuses the existing /api/search
 * endpoint so the links resolve to a working notes search.
 */
export default function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runSearch = async (q: string) => {
    const trimmed = q.trim();
    if (trimmed.length < 2) {
      setResults([]);
      setSearched(false);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    setSearched(true);
    try {
      const res = await searchContent(trimmed);
      setResults(res.results ?? []);
    } catch {
      setResults([]);
      setError("Search is unavailable right now. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runSearch(query);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 py-10 px-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Search Notes</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Search across syllabus notes, topics, derivations, labs, and exams.
        </p>
      </div>

      <form onSubmit={onSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by topic, subject, or keyword…"
            className="h-12 w-full rounded-xl border border-border bg-background pl-10 pr-4 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
            autoFocus
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setResults([]);
                setError(null);
                setSearched(false);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <span className="text-lg leading-none">×</span>
            </button>
          )}
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {loading ? "Searching…" : "Press Enter or click Search"}
          </span>
          <Button type="submit" disabled={loading || query.trim().length < 2}>
            Search
          </Button>
        </div>
      </form>

      {error && !loading && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
          <Info className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {searched && !loading && results.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {results.length} result{results.length === 1 ? "" : "s"}
          </p>
          {results.map((r, i) => (
            <button
              key={r.id || i}
              onClick={() => router.push(r.url)}
              className="w-full text-left p-3 rounded-xl border border-border bg-card hover:bg-muted/60 flex items-center gap-3 transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-[10px] font-bold text-primary">{r.type.charAt(0)}</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{r.title}</p>
                <p className="text-[11px] text-muted-foreground">
                  {[r.class, r.subject, r.chapter].filter(Boolean).join(" · ")}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
            </button>
          ))}
        </div>
      )}

      {searched && !loading && results.length === 0 && !error && (
        <div className="p-6 text-center">
          <p className="text-sm text-muted-foreground">No results for &ldquo;{query}&rdquo;</p>
          <p className="text-xs text-muted-foreground/60 mt-1">
            Try a subject name or topic keyword.
          </p>
        </div>
      )}
    </div>
  );
}
