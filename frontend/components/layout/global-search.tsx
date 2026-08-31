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
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
        setSearched(false);
      }
    };
    if (open) document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  const doSearch = async (q: string) => {
    if (q.length < 2) { setResults([]); setSearched(false); return; }
    setLoading(true);
    setSearched(true);
    try {
      const res = await search(q);
      setResults(res.results ?? []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (url: string) => {
    setOpen(false);
    setQuery("");
    setSearched(false);
    router.push(url);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search subjects, topics, labs…"
          value={query}
          onChange={(e) => { setQuery(e.target.value); doSearch(e.target.value); }}
          onFocus={() => setOpen(true)}
          className="w-full h-9 pl-9 pr-8 rounded-xl border border-border bg-muted/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-background transition-all"
        />
        {query && (
          <button onClick={() => { setQuery(""); setResults([]); setSearched(false); inputRef.current?.focus(); }} className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded-md hover:bg-muted text-muted-foreground">
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

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
                  onClick={() => handleSelect(r.url)}
                  className="w-full text-left px-3 py-2.5 hover:bg-muted/60 flex items-center gap-3 transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-primary">{r.type.charAt(0)}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{r.title}</p>
                    <p className="text-[10px] text-muted-foreground">{r.class} · {r.subject} · {r.chapter}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
          {!loading && searched && results.length === 0 && (
            <div className="p-5 text-center">
              <p className="text-sm text-muted-foreground">No results for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Try a subject name or topic keyword</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
