"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { search } from "@/lib/api/ai";
import type { SearchResultItem } from "@/types/api";

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(false);
  const requestIdRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
        window.setTimeout(() => inputRef.current?.focus(), 0);
      }
      if (e.key === "Escape") {
        setOpen(false);
        setResults([]);
        setSearched(false);
        setError(false);
        setLoading(false);
        requestIdRef.current += 1;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
        setResults([]);
        setSearched(false);
        setError(false);
        setLoading(false);
        requestIdRef.current += 1;
      }
    };
    if (open) document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  const doSearch = async (q: string) => {
    const trimmed = q.trim();
    const requestId = ++requestIdRef.current;
    if (trimmed.length < 2) {
      setResults([]);
      setSearched(false);
      setError(false);
      setLoading(false);
      return;
    }
    setLoading(true);
    setSearched(true);
    setError(false);
    try {
      const res = await search(trimmed);
      if (requestId === requestIdRef.current) setResults(res.results ?? []);
    } catch {
      if (requestId === requestIdRef.current) {
        setResults([]);
        setError(true);
      }
    } finally {
      if (requestId === requestIdRef.current) setLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (trimmed.length < 2) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    setOpen(false);
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    void doSearch(value);
  };

  const handleSelect = (url: string) => {
    setOpen(false);
    setQuery("");
    setResults([]);
    setSearched(false);
    setError(false);
    requestIdRef.current += 1;
    router.push(url);
  };

  return (
    <form ref={containerRef} onSubmit={handleSubmit} role="search" className="relative w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <input
          ref={inputRef}
          type="search"
          aria-label="Search subjects, topics and labs"
          placeholder="Search subjects, topics, labs…"
          onKeyDown={(event) => {
            if (event.key === "Escape") setOpen(false);
          }}
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          onFocus={() => setOpen(true)}
          className="h-10 w-full rounded-xl border border-border bg-muted/50 pl-9 pr-10 text-sm placeholder:text-muted-foreground focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
        />
        {query && (
          <button type="button" aria-label="Clear search" onClick={() => { setQuery(""); setResults([]); setSearched(false); setError(false); setLoading(false); requestIdRef.current += 1; inputRef.current?.focus(); }} className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded-md hover:bg-muted text-muted-foreground">
            <X className="h-3.5 w-3.5" />
          </button>
        )}
        {!query && (
          <kbd className="absolute right-2 top-1/2 -translate-y-1/2 rounded border border-border/70 bg-background/70 px-1.5 py-0.5 text-[10px] text-muted-foreground">
            Ctrl K
          </kbd>
        )}
      </div>

      {open && query.trim().length === 1 && (
        <div className="absolute top-full mt-2 left-0 w-full rounded-xl border border-border bg-card p-3 text-xs text-muted-foreground shadow-xl z-50">
          Type one more character to search.
        </div>
      )}

      {open && (query.length >= 2 || searched) && (
        <div className="absolute top-full mt-2 left-0 w-full rounded-xl border border-border bg-card shadow-xl overflow-hidden z-50 max-h-[400px] overflow-y-auto">
          {loading && (
            <div className="p-4 text-center text-sm text-muted-foreground">Searching…</div>
          )}
          {!loading && results.length > 0 && (
            <div className="py-1">
              <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground bg-muted/30">
                Results
              </div>
              {results.map((r, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelect(r.url)}
                  className="w-full text-left px-3 py-2.5 hover:bg-muted/60 flex items-center gap-3 transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-primary">{r.type.charAt(0)}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{r.title}</p>
                    <p className="text-[10px] text-muted-foreground">{[r.class, r.subject, r.chapter].filter(Boolean).join(" · ")}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
          {!loading && error && (
            <div className="p-5 text-center text-sm text-destructive" role="status">
              Search is unavailable right now. Press Enter to try the full search page.
            </div>
          )}
          {!loading && searched && !error && results.length === 0 && (
            <div className="p-5 text-center">
              <p className="text-sm text-muted-foreground">No results for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Try a subject name or topic keyword</p>
            </div>
          )}
          {query.trim().length >= 2 && !loading && (
            <button type="submit" className="w-full border-t border-border px-3 py-2 text-left text-xs font-semibold text-primary hover:bg-muted/50">
              View all results for “{query.trim()}”
            </button>
          )}
        </div>
      )}
    </form>
  );
}
