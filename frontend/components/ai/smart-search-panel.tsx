"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Loader2, BookOpen, ExternalLink, Sparkles } from "lucide-react";
import { search } from "@/lib/api/ai";
import type { SearchResponse } from "@/types/api";

const EXAMPLE_QUERIES = [
  "numericals on projectile motion",
  "SN1 vs SN2 reaction conditions",
  "genetic disorders for NEB board",
  "integration by parts examples",
];

export function SmartSearchPanel() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runSearch = async (q?: string) => {
    const text = (q ?? query).trim();
    if (!text || loading) return;
    setQuery(text);
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      setResult(await search(text));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-5 py-6">
      <div className="text-center space-y-1.5">
        <h2 className="text-lg font-bold">Smart Search</h2>
        <p className="text-xs text-muted-foreground">
          AI-powered curriculum search — finds notes, labs, and past questions across the platform.
        </p>
      </div>

      {/* Search bar */}
      <div className="relative flex items-center">
        <Search className="absolute left-4 h-4 w-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && runSearch()}
          placeholder="Search the curriculum, e.g. “numericals on Carnot engine”…"
          className="w-full rounded-2xl border border-border/70 bg-card py-3.5 pl-11 pr-24 text-sm shadow-md focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <button
          onClick={() => runSearch()}
          disabled={!query.trim() || loading}
          className="absolute right-2 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:opacity-90 disabled:opacity-40"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
        </button>
      </div>

      {/* Example chips */}
      {!result && !loading && (
        <div className="flex flex-wrap justify-center gap-2">
          {EXAMPLE_QUERIES.map((q) => (
            <button
              key={q}
              onClick={() => runSearch(q)}
              className="rounded-full border border-border/70 bg-muted/30 px-3 py-1.5 text-xs text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-4">
          {result.fallbackMessage && (
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-400">
              {result.fallbackMessage}
            </div>
          )}

          {result.results.length === 0 && !result.fallbackMessage ? (
            <div className="rounded-xl border border-border/70 bg-muted/20 px-4 py-8 text-center text-sm text-muted-foreground">
              No direct matches. Try different keywords or ask the Tutor tab instead.
            </div>
          ) : (
            <div className="space-y-2">
              {result.results.map((r) => (
                <Link
                  key={r.id}
                  href={r.url}
                  className="flex items-start justify-between gap-3 rounded-xl border border-border/70 bg-card p-4 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary">
                        {r.type}
                      </span>
                      <span className="text-xs text-muted-foreground truncate">
                        {r.class} · {r.subject} · {r.chapter}
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-semibold group-hover:text-primary transition-colors">
                      {r.title}
                    </p>
                  </div>
                  <ArrowRightIcon />
                </Link>
              ))}
            </div>
          )}

          {/* Syllabus hints */}
          {result.syllabusHints && result.syllabusHints.length > 0 && (
            <div className="rounded-xl border border-border/70 bg-muted/20 p-4 space-y-2">
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                <BookOpen className="h-3.5 w-3.5" />
                Syllabus pointers
              </p>
              {result.syllabusHints.map((h, i) => (
                <div key={i} className="text-xs">
                  <span className="font-semibold text-foreground">{h.subject} — {h.unit}:</span>{" "}
                  <span className="text-muted-foreground">{h.topics.join(", ")}</span>
                </div>
              ))}
            </div>
          )}

          {/* Official link */}
          {result.officialLink && (
            <a
              href={result.officialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-border/70 bg-card px-4 py-3 text-xs font-semibold text-primary hover:bg-primary/5 transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Official syllabus (NEB/CDC)
            </a>
          )}

          {/* Search again */}
          <div className="text-center">
            <button
              onClick={() => {
                setResult(null);
                setQuery("");
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
            >
              <Sparkles className="h-3.5 w-3.5" />
              New search
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
