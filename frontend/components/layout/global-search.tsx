"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import {
  Search,
  X,
  TrendingUp,
  BookOpen,
  FlaskConical,
  Atom,
  Microscope,
  Clock,
  ArrowRight,
  Hash,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { search } from "@/lib/api/ai";
import type { SearchResultItem } from "@/types/api";
import { SYLLABUS } from "@/lib/syllabus";

/* ──────────────────────────────────────────────────────────────
   Flatten all syllabus topics into a searchable index
   ────────────────────────────────────────────────────────────── */
interface SyllabusEntry {
  label: string;
  href: string;
  subject: string;
  unit: string;
  icon: LucideIcon;
}

const SUBJECT_ICON_MAP: Record<string, LucideIcon> = {
  physics: FlaskConical,
  chemistry: Atom,
  biology: Microscope,
  mathematics: Atom,
  math: Atom,
  english: BookOpen,
  nepali: BookOpen,
};

function getSubjectIcon(subjectSlug: string): LucideIcon {
  const key = subjectSlug.toLowerCase();
  for (const [k, v] of Object.entries(SUBJECT_ICON_MAP)) {
    if (key.includes(k)) return v;
  }
  return BookOpen;
}

/** Flatten every topic across all classes/subjects into one list */
function buildSyllabusIndex(): SyllabusEntry[] {
  const entries: SyllabusEntry[] = [];
  for (const cls of SYLLABUS) {
    for (const subj of cls.subjects) {
      const icon = getSubjectIcon(subj.slug);
      for (const unit of subj.units) {
        for (const topic of unit.topics) {
          entries.push({
            label: topic,
            href: `/notes/${cls.slug}/${subj.slug}/${unit.id}?topic=${encodeURIComponent(topic)}`,
            subject: subj.name,
            unit: unit.title,
            icon,
          });
        }
      }
    }
  }
  return entries;
}

const SYLLABUS_INDEX = buildSyllabusIndex();

/** Quick-fuzzy: true if every char of `q` appears in order inside `text` */
function fuzzyMatch(text: string, q: string): boolean {
  let ti = 0;
  for (let qi = 0; qi < q.length; qi++) {
    while (ti < text.length && text[ti] !== q[qi]) ti++;
    if (ti >= text.length) return false;
    ti++;
  }
  return true;
}

/** Score a syllabus entry against a query (higher = better) */
function scoreEntry(entry: SyllabusEntry, q: string): number {
  const lq = q.toLowerCase();
  const label = entry.label.toLowerCase();
  const subject = entry.subject.toLowerCase();
  const unit = entry.unit.toLowerCase();

  if (label === lq) return 100;
  if (label.startsWith(lq)) return 90;
  if (label.includes(lq)) return 75;
  if (subject.includes(lq)) return 50;
  if (unit.includes(lq)) return 40;
  if (fuzzyMatch(label, lq)) return 25;
  if (fuzzyMatch(subject + " " + unit, lq)) return 15;
  return 0;
}

/** Search the local syllabus index (instant, no API) */
function searchSyllabusLocal(query: string, limit = 12): SyllabusEntry[] {
  const q = query.trim();
  if (!q) return [];
  return SYLLABUS_INDEX
    .map((e) => ({ entry: e, score: scoreEntry(e, q) }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.entry);
}

/** Pick curated "popular" entries from syllabus (one per subject) */
function buildPopularTopics(): SyllabusEntry[] {
  const picked: SyllabusEntry[] = [];
  const seenSubjects = new Set<string>();
  for (const entry of SYLLABUS_INDEX) {
    if (!seenSubjects.has(entry.subject)) {
      seenSubjects.add(entry.subject);
      picked.push(entry);
    }
    if (picked.length >= 8) break;
  }
  return picked;
}

const POPULAR_TOPICS = buildPopularTopics();

// Collect top-level subject landing pages for quick access
const SUBJECT_LINKS = SYLLABUS.flatMap((cls) =>
  cls.subjects.map((s) => ({
    label: s.name,
    href: `/notes/${cls.slug}/${s.slug}`,
    icon: getSubjectIcon(s.slug),
  })),
);

/* ── Recent searches (localStorage) ── */
const RECENT_KEY = "global-search-recent";
const MAX_RECENT = 6;
function loadRecent(): string[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]"); } catch { return []; }
}
function saveRecent(q: string) {
  if (typeof window === "undefined") return;
  const recent = loadRecent().filter((r) => r !== q);
  recent.unshift(q);
  localStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(0, MAX_RECENT)));
}
function clearRecent() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(RECENT_KEY);
}

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [apiResults, setApiResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [recent, setRecent] = useState<string[]>([]);
  const [activeIdx, setActiveIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const router = useRouter();

  // Load recent on open
  useEffect(() => { if (open) setRecent(loadRecent()); }, [open]);

  // Keyboard shortcut: Cmd/Ctrl+K toggle, Escape close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Click outside to close
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false); setQuery(""); setSearched(false);
      }
    };
    if (open) document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  // Focus input on open
  useEffect(() => { if (open) requestAnimationFrame(() => inputRef.current?.focus()); }, [open]);

  /* ── Local syllabus results (instant) ── */
  const localResults = useMemo(() => {
    if (query.trim().length < 2) return [];
    return searchSyllabusLocal(query, 8);
  }, [query]);

  /* ── Debounced API search with abort ── */
  const doApiSearch = useCallback((q: string) => {
    abortRef.current?.abort();
    clearTimeout(debounceRef.current);
    if (q.trim().length < 2) { setApiResults([]); setSearched(false); setLoading(false); return; }
    setLoading(true); setSearched(true);
    debounceRef.current = setTimeout(async () => {
      const ctrl = new AbortController();
      abortRef.current = ctrl;
      try {
        const res = await search(q);
        if (!ctrl.signal.aborted) setApiResults(res.results ?? []);
      } catch {
        if (!ctrl.signal.aborted) setApiResults([]);
      } finally {
        if (!ctrl.signal.aborted) setLoading(false);
      }
    }, 300);
  }, []);

  /* ── Keyboard navigation ── */
  const totalItems = (() => {
    let c = 0;
    if (!query) {
      if (recent.length) c += recent.length + 1;
      c += SUBJECT_LINKS.length + 1 + POPULAR_TOPICS.length + 1;
    } else {
      if (localResults.length) c += localResults.length + 1;
      if (loading) c += 1;
      if (!loading && apiResults.length) c += apiResults.length + 1;
      if (!loading && searched && !apiResults.length && !localResults.length) c += 1;
    }
    return c;
  })();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIdx((i) => Math.min(i + 1, totalItems - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActiveIdx((i) => Math.max(i - 1, -1)); }
    else if (e.key === "Enter" && activeIdx >= 0) {
      const url = getItemAtIndex(activeIdx);
      if (url) handleSelect(url);
    }
  };

  function getItemAtIndex(idx: number): string | null {
    let c = 0;
    if (!query) {
      if (recent.length) { c++; for (const r of recent) { if (c === idx) return null; c++; } }
      c++; for (const s of SUBJECT_LINKS) { if (c === idx) return s.href; c++; }
      c++; for (const t of POPULAR_TOPICS) { if (c === idx) return t.href; c++; }
    } else {
      if (localResults.length) { c++; for (const e of localResults) { if (c === idx) return e.href; c++; } }
      if (loading) c++;
      if (!loading && apiResults.length) { c++; for (const r of apiResults) { if (c === idx) return r.url; c++; } }
    }
    return null;
  }

  const handleSelect = (url: string) => {
    if (query.trim()) saveRecent(query.trim());
    setOpen(false); setQuery(""); setSearched(false); setActiveIdx(-1);
    router.push(url);
  };

  const handleRecentSelect = (q: string) => { setQuery(q); inputRef.current?.focus(); doApiSearch(q); };
  const handleClearRecent = () => { clearRecent(); setRecent([]); };

  const showPopular = !query;
  const showResults = open;
  const showNoResults = searched && !loading && localResults.length === 0 && apiResults.length === 0;

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      {/* ── Trigger button ── */}
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center gap-3 rounded-xl border border-border/60 bg-muted/30 px-3.5 py-2.5 text-sm text-muted-foreground hover:border-border hover:bg-muted/50 transition-all"
      >
        <Search className="h-4 w-4 shrink-0" />
        <span className="flex-1 text-left truncate">Search topics, subjects, labs…</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded-md border border-border/60 bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* ── Dropdown ── */}
      {showResults && (
        <div className="absolute top-full mt-2 left-0 w-full rounded-xl border border-border bg-card shadow-xl overflow-hidden z-50 max-h-[480px] overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-150">
          {/* ── Input row ── */}
          <div className="flex items-center gap-2 border-b border-border/50 px-3">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Type to search…"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveIdx(-1);
                doApiSearch(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground/50"
              autoComplete="off"
              spellCheck={false}
            />
            {query && (
              <button
                onClick={() => {
                  setQuery(""); setApiResults([]); setSearched(false); setActiveIdx(-1);
                  abortRef.current?.abort(); clearTimeout(debounceRef.current); setLoading(false);
                  inputRef.current?.focus();
                }}
                className="p-1 rounded-md hover:bg-muted transition-colors"
              >
                <X className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            )}
          </div>

          {/* ═══ DEFAULT: Recent → Subjects → Popular ═══ */}
          {showPopular && (
            <div>
              {recent.length > 0 && (
                <>
                  <div className="px-3 py-2 border-b border-border/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-blue-500" />
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Recent</span>
                    </div>
                    <button onClick={handleClearRecent} className="text-[10px] text-muted-foreground hover:text-foreground transition-colors">Clear</button>
                  </div>
                  <div className="py-1">
                    {recent.map((r, i) => (
                      <button
                        key={r}
                        onClick={() => handleRecentSelect(r)}
                        className={`w-full text-left px-3 py-2 flex items-center gap-3 transition-colors text-sm ${activeIdx === i + 1 ? "bg-muted/80" : "hover:bg-muted/60"}`}
                      >
                        <Clock className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        <span className="text-foreground truncate">{r}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
              {/* Subjects */}
              <div className="px-3 py-2 border-b border-border/50 flex items-center gap-2">
                <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Subjects</span>
              </div>
              <div className="grid grid-cols-2 gap-px bg-border/30">
                {SUBJECT_LINKS.map((s) => (
                  <button
                    key={s.href}
                    onClick={() => handleSelect(s.href)}
                    className="flex items-center gap-2 px-3 py-2.5 text-left hover:bg-muted/60 transition-colors text-sm"
                  >
                    <s.icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <span className="text-foreground truncate">{s.label}</span>
                  </button>
                ))}
              </div>

              {/* Popular Topics (from syllabus) */}
              <div className="px-3 py-2 border-b border-border/50 flex items-center gap-2">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Popular Topics</span>
              </div>
              <div className="max-h-[240px] overflow-y-auto py-1">
                {POPULAR_TOPICS.map((t) => (
                  <button
                    key={t.label}
                    onClick={() => handleSelect(t.href)}
                    className="w-full text-left px-3 py-2 flex items-center gap-3 hover:bg-muted/60 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <t.icon className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate text-foreground">{t.label}</p>
                      <p className="text-[10px] text-muted-foreground">{t.subject} · {t.unit}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ═══ SEARCH RESULTS (query typed) ═══ */}
          {!showPopular && (
            <div>
              {localResults.length > 0 && (
                <>
                  <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground bg-muted/30 flex items-center gap-2">
                    <Hash className="h-3 w-3" />
                    Syllabus Matches
                  </div>
                  <div className="py-1">
                    {localResults.map((e, i) => (
                      <button
                        key={e.label + e.unit}
                        onClick={() => handleSelect(e.href)}
                        className={`w-full text-left px-3 py-2.5 hover:bg-muted/60 flex items-center gap-3 transition-colors ${activeIdx === i + 1 ? "bg-muted/80" : ""}`}
                      >
                        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <e.icon className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium truncate text-foreground">{e.label}</p>
                          <p className="text-[10px] text-muted-foreground">{e.subject} · {e.unit}</p>
                        </div>
                        <ArrowRight className="h-3 w-3 text-muted-foreground/50 shrink-0" />
                      </button>
                    ))}
                  </div>
                </>
              )}

              {loading && (
                <div className="p-3 text-center text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
                    Searching…
                  </span>
                </div>
              )}

              {!loading && apiResults.length > 0 && (
                <>
                  <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground bg-muted/30">
                    More Results — {apiResults.length}
                  </div>
                  <div className="py-1">
                    {apiResults.map((r, i) => (
                      <button
                        key={i}
                        onClick={() => handleSelect(r.url)}
                        className={`w-full text-left px-3 py-2.5 hover:bg-muted/60 flex items-center gap-3 transition-colors ${activeIdx === (localResults.length ? localResults.length + 1 + i : i + 1) ? "bg-muted/80" : ""}`}
                      >
                        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-[10px] font-bold text-primary">{r.type.charAt(0).toUpperCase()}</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium truncate text-foreground">{r.title}</p>
                          <p className="text-[10px] text-muted-foreground">{r.class} · {r.subject} · {r.chapter}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {showNoResults && (
                <div className="p-6 text-center">
                  <Search className="h-8 w-8 mx-auto text-muted-foreground/30 mb-2" />
                  <p className="text-sm text-muted-foreground">No results for &ldquo;{query}&rdquo;</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">Try a topic name, subject, or keyword</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
