"use client";

import { useState, useRef, useEffect } from "react";
import React from "react";
import { Search, X, TrendingUp, BookOpen, FlaskConical, Atom, Microscope } from "lucide-react";
import { useRouter } from "next/navigation";
import { search } from "@/lib/api/ai";
import type { SearchResultItem } from "@/types/api";
import { SYLLABUS } from "@/lib/syllabus";

/* ────────────────────────────────────────────────────────────
   Popular / recommended topics extracted from the syllabus
   ──────────────────────────────────────────────────────────── */
const POPULAR_TOPICS: { label: string; href: string; subject: string; icon: React.ElementType }[] = [
  // Physics — high-frequency exam topics
  { label: "Projectile Motion",         href: "/lab/physics?topic=projectile-motion",        subject: "Physics",    icon: FlaskConical },
  { label: "Simple Harmonic Motion",    href: "/lab/physics?topic=shm",                     subject: "Physics",    icon: FlaskConical },
  { label: "Optics — Refraction",       href: "/lab/physics?topic=optics",                  subject: "Physics",    icon: FlaskConical },
  { label: "Electric Field & Gauss Law",href: "/lab/physics?topic=electric-field",          subject: "Physics",    icon: FlaskConical },
  { label: "Semiconductors",            href: "/lab/physics?topic=semiconductor",           subject: "Physics",    icon: FlaskConical },
  // Chemistry
  { label: "Atomic Structure",          href: "/lab/chemistry?topic=atom",                  subject: "Chemistry",  icon: Atom },
  { label: "Chemical Bonding",          href: "/lab/chemistry?topic=bond",                  subject: "Chemistry",  icon: Atom },
  { label: "Organic Chemistry Basics",  href: "/lab/chemistry?topic=organic",               subject: "Chemistry",  icon: Atom },
  { label: "Equilibrium",               href: "/lab/chemistry?topic=equilibrium",           subject: "Chemistry",  icon: Atom },
  // Biology
  { label: "Cell Biology",              href: "/lab/biology?topic=cell",                    subject: "Biology",    icon: Microscope },
  { label: "DNA & Genetics",            href: "/lab/biology?topic=dna",                     subject: "Biology",    icon: Microscope },
  { label: "Human Physiology",          href: "/lab/biology?topic=human",                   subject: "Biology",    icon: Microscope },
  { label: "Ecology & Environment",     href: "/lab/biology?topic=ecosystem",               subject: "Biology",    icon: Microscope },
  // Mathematics
  { label: "Calculus — Limits",         href: "/lab/math?topic=limit",                      subject: "Math",       icon: Atom },
  { label: "Matrices & Determinants",   href: "/lab/math?topic=matrix",                     subject: "Math",       icon: Atom },
  { label: "Vectors",                   href: "/lab/math?topic=vector",                     subject: "Math",       icon: Atom },
  { label: "Trigonometry",              href: "/lab/math?topic=trig",                       subject: "Math",       icon: Atom },
];

// Collect top-level subject landing pages for quick access
const SUBJECT_LINKS = SYLLABUS.flatMap((cls) =>
  cls.subjects.map((s) => ({
    label: s.name,
    href: `/syllabus/${s.slug}`,
    icon: BookOpen,
  })),
);

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

  const hasResults = results.length > 0;
  const showPopular = open && !query && !searched;
  const showResults = open && (query.length >= 2 || searched);

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search topics, subjects, labs…  (⌘K)"
          value={query}
          onChange={(e) => { setQuery(e.target.value); doSearch(e.target.value); }}
          onFocus={() => setOpen(true)}
          onBlur={() => { setTimeout(() => setOpen(false), 150); }}
          className="w-full h-9 pl-9 pr-8 rounded-xl border border-border bg-muted/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-background transition-all"
        />
        {query && (
          <button onClick={() => { setQuery(""); setResults([]); setSearched(false); inputRef.current?.focus(); }} className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded-md hover:bg-muted text-muted-foreground">
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* ── Popular / recommended (shown when empty or just opened) ── */}
      {showPopular && (
        <div className="absolute top-full mt-2 left-0 w-full rounded-xl border border-border bg-card shadow-xl overflow-hidden z-50">
          {/* Subjects row */}
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

          {/* Popular topics */}
          <div className="px-3 py-2 border-b border-border/50 flex items-center gap-2">
            <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Popular Topics
            </span>
          </div>
          <div className="max-h-[280px] overflow-y-auto py-1">
            {POPULAR_TOPICS.map((t, i) => (
              <button
                key={i}
                onClick={() => handleSelect(t.href)}
                className="w-full text-left px-3 py-2 flex items-center gap-3 hover:bg-muted/60 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  {React.createElement(t.icon, { className: "h-3.5 w-3.5 text-primary" })}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate text-foreground">{t.label}</p>
                  <p className="text-[10px] text-muted-foreground">{t.subject}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Search results ── */}
      {showResults && !showPopular && (
        <div className="absolute top-full mt-2 left-0 w-full rounded-xl border border-border bg-card shadow-xl overflow-hidden z-50 max-h-[400px] overflow-y-auto">
          {loading && (
            <div className="p-4 text-center text-sm text-muted-foreground">Searching…</div>
          )}
          {!loading && hasResults && (
            <div className="py-1">
              <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground bg-muted/30">
                Results — {results.length}
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
                    <p className="text-sm font-medium truncate text-foreground">{r.title}</p>
                    <p className="text-[10px] text-muted-foreground">{r.class} · {r.subject} · {r.chapter}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
          {!loading && searched && !hasResults && (
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
