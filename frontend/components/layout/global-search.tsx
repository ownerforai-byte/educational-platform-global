"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import {
  Search,
  X,
  BookOpen,
  Layers,
  Bookmark,
  FileText,
  Sparkles,
  CheckCircle2,
  FlaskConical,
  BarChart3,
  Globe,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { localSearch, type SearchEntry, type SearchEntryKind } from "@/lib/search-index";

/* ────────────────────────── kind → badge config ────────────────────────── */

const KIND_CONFIG: Record<
  SearchEntryKind,
  { icon: typeof Search; color: string; bg: string; badge: string }
> = {
  Subject: {
    icon: BookOpen,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-100 dark:bg-blue-900/40",
    badge: "Subject",
  },
  Unit: {
    icon: Layers,
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-100 dark:bg-indigo-900/40",
    badge: "Unit",
  },
  Chapter: {
    icon: Bookmark,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-100 dark:bg-amber-900/40",
    badge: "Chapter",
  },
  Topic: {
    icon: FileText,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-100 dark:bg-emerald-900/40",
    badge: "Topic",
  },
  Concept: {
    icon: Sparkles,
    color: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-100 dark:bg-cyan-900/40",
    badge: "Concept",
  },
  Example: {
    icon: CheckCircle2,
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-100 dark:bg-violet-900/40",
    badge: "Example",
  },
  Lab: {
    icon: FlaskConical,
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-100 dark:bg-purple-900/40",
    badge: "Lab",
  },
  Graph: {
    icon: BarChart3,
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-100 dark:bg-rose-900/40",
    badge: "Graph",
  },
  Page: {
    icon: Globe,
    color: "text-sky-600 dark:text-sky-400",
    bg: "bg-sky-100 dark:bg-sky-900/40",
    badge: "Page",
  },
};

/* ────────────────────────────── component ────────────────────────────── */

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLFormElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  /* Instant local search — no loading latency */
  const results: SearchEntry[] = useMemo(
    () => (query.trim().length >= 2 ? localSearch(query, 20) : []),
    [query],
  );

  /* Keyboard shortcut: Ctrl K to open, Escape to close */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
        window.setTimeout(() => inputRef.current?.focus(), 0);
      }
      if (e.key === "Escape") {
        setOpen(false);
        setActiveIndex(-1);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  /* Click outside to close */
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
        setActiveIndex(-1);
      }
    };
    if (open) document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  const handleSelect = useCallback(
    (href: string) => {
      setOpen(false);
      setQuery("");
      setActiveIndex(-1);
      router.push(href);
    },
    [router],
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (activeIndex >= 0 && activeIndex < results.length) {
      handleSelect(results[activeIndex].href);
      return;
    }
    const trimmed = query.trim();
    if (trimmed.length < 2) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    setOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!open || results.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    }
  };

  /* Scroll active item into view */
  useEffect(() => {
    if (activeIndex < 0 || !listRef.current) return;
    const el = listRef.current.children[activeIndex] as HTMLElement | undefined;
    el?.scrollIntoView?.({ block: "nearest" });
  }, [activeIndex]);

  /* Reset active index when results change */
  useEffect(() => setActiveIndex(-1), [results]);

  const showDropdown = open && query.trim().length >= 1;

  return (
    <form ref={containerRef} onSubmit={handleSubmit} role="search" className="relative w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <input
          ref={inputRef}
          type="search"
          aria-label="Search subjects, topics and labs"
          placeholder="Search units, chapters, topics, concepts, examples…"
          onKeyDown={(event) => {
            if (event.key === "Escape") { setOpen(false); return; }
            handleKeyDown(event);
          }}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          className="h-10 w-full rounded-xl border border-border bg-muted/50 pl-9 pr-10 text-sm placeholder:text-muted-foreground focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => { setQuery(""); setActiveIndex(-1); inputRef.current?.focus(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded-md hover:bg-muted text-muted-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
        {!query && (
          <kbd className="absolute right-2 top-1/2 -translate-y-1/2 rounded border border-border/70 bg-background/70 px-1.5 py-0.5 text-[10px] text-muted-foreground">
            Ctrl K
          </kbd>
        )}
      </div>

      {showDropdown && query.trim().length === 1 && (
        <div className="absolute top-full mt-2 left-0 w-full rounded-xl border border-border bg-card p-3 text-xs text-muted-foreground shadow-xl z-50">
          Type one more character to search.
        </div>
      )}

      {showDropdown && query.trim().length >= 2 && (
        <div className="absolute top-full mt-2 left-0 w-full rounded-xl border border-border bg-card shadow-xl overflow-hidden z-50 max-h-[460px] overflow-y-auto">
          {results.length > 0 && (
            <div className="py-1">
              <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground bg-muted/30 flex items-center justify-between">
                <span>{results.length} results</span>
                <span className="text-[9px] text-muted-foreground/70 lowercase font-normal">Use ↑↓ arrows to navigate, Enter to open</span>
              </div>
              <div ref={listRef}>
                {results.map((r, i) => {
                  const cfg = KIND_CONFIG[r.kind] ?? KIND_CONFIG.Topic;
                  const Icon = cfg.icon;
                  return (
                    <button
                      key={`${r.href}-${i}`}
                      type="button"
                      onClick={() => handleSelect(r.href)}
                      data-active={i === activeIndex || undefined}
                      className="w-full text-left px-3 py-2.5 hover:bg-muted/60 data-[active]:bg-muted/60 flex items-center gap-3 transition-colors border-b border-border/20 last:border-0"
                    >
                      <div className={`w-7 h-7 rounded-lg ${cfg.bg} flex items-center justify-center shrink-0`}>
                        <Icon className={`h-3.5 w-3.5 ${cfg.color}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium truncate">{r.title}</p>
                          <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold ${cfg.bg} ${cfg.color}`}>
                            {cfg.badge}
                          </span>
                        </div>
                        <p className="text-[10px] text-muted-foreground truncate">{r.breadcrumb}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          {results.length === 0 && (
            <div className="p-5 text-center">
              <p className="text-sm text-muted-foreground">No results for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Try a unit, chapter, topic, concept, or example keyword</p>
            </div>
          )}
          <button type="submit" className="w-full border-t border-border px-3 py-2 text-left text-xs font-semibold text-primary hover:bg-muted/50">
            View all results for &ldquo;{query.trim()}&rdquo; on Search page
          </button>
        </div>
      )}
    </form>
  );
}
