"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Atom,
  BookOpen,
  Dna,
  Download,
  Eye,
  File,
  FileText,
  Filter,
  FlaskConical,
  Globe,
  GraduationCap,
  Languages,
  Layers,
  Search,
  Sigma,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DOCS,
  SUBJECT_ORDER,
  type Doc,
  type Kind,
  type Subject,
} from "@/lib/docs-catalog";
import { WEBNOTEE_DOCS, type WebnoteeDoc } from "@/lib/webnotee-catalog";
import { downloadDoc, downloadFileName } from "@/lib/pdf-src";
import {
  PlatformPdfViewerModal,
  type ViewableDocument,
} from "@/components/content/platform-pdf-viewer-modal";

const SUBJECT_ICONS: Record<Subject, typeof Dna> = {
  Biology: Dna,
  Physics: Atom,
  Chemistry: FlaskConical,
  Mathematics: Sigma,
  English: BookOpen,
  Nepali: Languages,
};

const SUBJECT_COLORS: Record<
  Subject,
  { chip: string; badge: string; accent: string }
> = {
  Biology: {
    chip: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    badge: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    accent: "text-emerald-600 dark:text-emerald-400",
  },
  Physics: {
    chip: "border-sky-500/20 bg-sky-500/10 text-sky-600 dark:text-sky-400",
    badge: "bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300 border-sky-200 dark:border-sky-800",
    accent: "text-sky-600 dark:text-sky-400",
  },
  Chemistry: {
    chip: "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    badge: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    accent: "text-amber-600 dark:text-amber-400",
  },
  Mathematics: {
    chip: "border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-400",
    badge: "bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300 border-violet-200 dark:border-violet-800",
    accent: "text-violet-600 dark:text-violet-400",
  },
  English: {
    chip: "border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400",
    badge: "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border-rose-200 dark:border-rose-800",
    accent: "text-rose-600 dark:text-rose-400",
  },
  Nepali: {
    chip: "border-teal-500/20 bg-teal-500/10 text-teal-600 dark:text-teal-400",
    badge: "bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300 border-teal-200 dark:border-teal-800",
    accent: "text-teal-600 dark:text-teal-400",
  },
};

const KIND_META: Record<
  Kind,
  { label: string; icon: typeof FileText; tint: string; border: string }
> = {
  pdf: { label: "PDF", icon: FileText, tint: "bg-rose-500/10 text-rose-500", border: "border-rose-500/20" },
  html: { label: "HTML", icon: Globe, tint: "bg-sky-500/10 text-sky-500", border: "border-sky-500/20" },
  md: { label: "MD", icon: FileText, tint: "bg-emerald-500/10 text-emerald-500", border: "border-emerald-500/20" },
  docx: { label: "DOCX", icon: File, tint: "bg-indigo-500/10 text-indigo-500", border: "border-indigo-500/20" },
};

const ADDITIONAL_RESOURCE_TOOLS = [
  {
    href: "/lab",
    title: "Interactive Lab",
    description: "3D simulations, interactive theory panels, and science calculators.",
    icon: FlaskConical,
    tint: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  },
  {
    href: "/resources/physics-xi",
    title: "Physics XI Academic Companion",
    description: "26 unit briefs with assertions, boundary conditions, and study guides.",
    icon: Atom,
    tint: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
  },
  {
    href: "/world-knowledge",
    title: "World Knowledge",
    description: "General knowledge, global affairs, and scientific breakthroughs.",
    icon: Globe,
    tint: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
  },
  {
    href: "/loksewa",
    title: "Loksewa Prep",
    description: "Geography, constitution, history, and administration for Loksewa.",
    icon: BookOpen,
    tint: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
  },
  {
    href: "/levels",
    title: "Education Levels",
    description: "Browse content structured by education level and curriculum group.",
    icon: GraduationCap,
    tint: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
];

type FilterSubject = Subject | "All";
type SectionFilter = "all" | "platform" | "webnotee";

export default function ResourcesPage() {
  const [query, setQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<FilterSubject>("All");
  const [sectionFilter, setSectionFilter] = useState<SectionFilter>("all");
  const [activeDoc, setActiveDoc] = useState<ViewableDocument | null>(null);

  // Auto-open if linked with ?src=... or ?view=...
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const target = params.get("src") || params.get("view");
    if (!target) return;

    const plat = DOCS.find((d) => d.href === target || d.key === target);
    if (plat) {
      setActiveDoc({
        title: plat.title,
        src: plat.href,
        subject: plat.subject,
        topic: plat.topic,
        kind: plat.kind,
      });
      return;
    }

    const wn = WEBNOTEE_DOCS.find((d) => d.driveUrl === target || d.id === target);
    if (wn) {
      setActiveDoc({
        title: wn.title,
        src: wn.driveUrl,
        subject: wn.subject,
        topic: wn.exercise ?? wn.unit,
        kind: "pdf",
      });
      return;
    }

    setActiveDoc({
      title: params.get("title") || "Study Document",
      src: target,
      kind: "pdf",
    });
  }, []);

  const normalizedQuery = query.trim().toLowerCase();

  // Filter Platform Core Documents
  const filteredPlatformDocs = useMemo(() => {
    return DOCS.filter((doc) => {
      const matchSubject =
        selectedSubject === "All" || doc.subject === selectedSubject;
      if (!matchSubject) return false;

      if (!normalizedQuery) return true;
      const haystack = `${doc.title} ${doc.subject} ${doc.topic} ${doc.description}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [selectedSubject, normalizedQuery]);

  // Filter WebNotee Reference Documents
  const filteredWebnoteeDocs = useMemo(() => {
    return WEBNOTEE_DOCS.filter((doc) => {
      const matchSubject =
        selectedSubject === "All" || doc.subject === selectedSubject;
      if (!matchSubject) return false;

      if (!normalizedQuery) return true;
      const haystack = `${doc.title} ${doc.subject} ${doc.unit} ${doc.exercise ?? ""} ${doc.description}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [selectedSubject, normalizedQuery]);

  // Grouped by Subject in curriculum order
  const platformGrouped = useMemo(() => {
    return SUBJECT_ORDER.map((subject) => ({
      subject,
      docs: filteredPlatformDocs.filter((d) => d.subject === subject),
    })).filter((g) => g.docs.length > 0);
  }, [filteredPlatformDocs]);

  const webnoteeGrouped = useMemo(() => {
    return SUBJECT_ORDER.map((subject) => ({
      subject,
      docs: filteredWebnoteeDocs.filter((d) => d.subject === subject),
    })).filter((g) => g.docs.length > 0);
  }, [filteredWebnoteeDocs]);

  const totalResults = filteredPlatformDocs.length + filteredWebnoteeDocs.length;

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-8 md:py-12">
      {/* In-Platform Scrollable PDF & Document Viewer Modal */}
      <PlatformPdfViewerModal
        doc={activeDoc}
        onClose={() => setActiveDoc(null)}
      />

      {/* ── Page Header & Search ─────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 via-background to-background p-6 md:p-10 shadow-sm">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Complete Academic Study Repository</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Resource Vault
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base leading-relaxed">
            Access, view, and scroll all curated academic study notes, exercise solution sets,
            and reference PDFs directly inside the platform without going outside.
          </p>

          {/* Search Bar */}
          <div className="pt-2">
            <div className="relative max-w-xl">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search documents by title, chapter, exercise (e.g., Ex 16.1, Derivatives, Mechanics)..."
                className="h-11 w-full rounded-2xl border border-border/70 bg-background/90 pl-10 pr-9 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Filter & Classification Controls ─────────────────────────────── */}
      <div className="space-y-4">
        {/* Subject Filter Pills */}
        <div className="flex flex-wrap items-center gap-2" aria-label="Filter by subject">
          {(["All", ...SUBJECT_ORDER] as FilterSubject[]).map((subject) => {
            const isSelected = selectedSubject === subject;
            const Icon = subject === "All" ? Filter : SUBJECT_ICONS[subject];
            const count =
              subject === "All"
                ? DOCS.length + WEBNOTEE_DOCS.length
                : DOCS.filter((d) => d.subject === subject).length +
                  WEBNOTEE_DOCS.filter((d) => d.subject === subject).length;

            return (
              <button
                key={subject}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedSubject(subject)}
                className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all ${
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border/70 bg-card text-muted-foreground hover:border-primary/40 hover:bg-muted/50 hover:text-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{subject}</span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                    isSelected
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Section View Mode Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>Showing:</span>
            <div className="inline-flex rounded-xl border border-border/70 bg-card p-1">
              <button
                type="button"
                onClick={() => setSectionFilter("all")}
                className={`rounded-lg px-2.5 py-1 font-semibold transition-colors ${
                  sectionFilter === "all"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                All Resources ({totalResults})
              </button>
              <button
                type="button"
                onClick={() => setSectionFilter("platform")}
                className={`rounded-lg px-2.5 py-1 font-semibold transition-colors ${
                  sectionFilter === "platform"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Platform Docs ({filteredPlatformDocs.length})
              </button>
              <button
                type="button"
                onClick={() => setSectionFilter("webnotee")}
                className={`rounded-lg px-2.5 py-1 font-semibold transition-colors ${
                  sectionFilter === "webnotee"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                WebNotee PDFs ({filteredWebnoteeDocs.length})
              </button>
            </div>
          </div>

          {query && (
            <p>
              Found {totalResults} {totalResults === 1 ? "match" : "matches"} for &ldquo;{query}&rdquo;
            </p>
          )}
        </div>
      </div>

      {/* ── SECTION 1: PLATFORM CORE STUDY DOCUMENTS & PDFS ───────────────── */}
      {(sectionFilter === "all" || sectionFilter === "platform") && (
        <section className="space-y-6" aria-labelledby="platform-docs-heading">
          <div className="flex items-center justify-between gap-4 border-b border-border/60 pb-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-sm">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <h2 id="platform-docs-heading" className="text-xl font-bold tracking-tight text-foreground">
                  1. Platform Core Study Documents &amp; PDFs
                </h2>
                <p className="text-xs text-muted-foreground">
                  Canonical notes, illustrated hubs, MCQ question banks, and master revision guides.
                </p>
              </div>
            </div>
            <span className="hidden sm:inline-flex rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-xs font-bold text-primary">
              {filteredPlatformDocs.length} {filteredPlatformDocs.length === 1 ? "Document" : "Documents"}
            </span>
          </div>

          {platformGrouped.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border/70 p-8 text-center">
              <p className="text-sm text-muted-foreground">No platform documents matched your filter.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {platformGrouped.map(({ subject, docs }) => {
                const colors = SUBJECT_COLORS[subject];
                const SubjectIcon = SUBJECT_ICONS[subject];

                return (
                  <div key={subject} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex h-7 w-7 items-center justify-center rounded-lg border ${colors.chip}`}>
                        <SubjectIcon className="h-4 w-4" />
                      </span>
                      <h3 className="text-base font-bold text-foreground">{subject}</h3>
                      <span className="text-xs text-muted-foreground font-medium">
                        ({docs.length})
                      </span>
                    </div>

                    <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
                      {docs.map((doc: Doc) => {
                        const kindMeta = KIND_META[doc.kind];

                        return (
                          <div
                            key={doc.key}
                            role="button"
                            tabIndex={0}
                            onClick={() =>
                              setActiveDoc({
                                title: doc.title,
                                src: doc.href,
                                subject: doc.subject,
                                topic: doc.topic,
                                kind: doc.kind,
                              })
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                setActiveDoc({
                                  title: doc.title,
                                  src: doc.href,
                                  subject: doc.subject,
                                  topic: doc.topic,
                                  kind: doc.kind,
                                });
                              }
                            }}
                            className="group flex flex-col justify-between rounded-2xl border border-border/60 bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md cursor-pointer text-left"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center justify-between gap-2">
                                <span className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-bold ${kindMeta.tint} border ${kindMeta.border}`}>
                                  {kindMeta.label}
                                </span>
                                <span className="truncate text-[11px] font-semibold text-muted-foreground">
                                  {doc.topic}
                                </span>
                              </div>

                              <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors leading-snug">
                                {doc.title}
                              </h4>
                              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                {doc.description}
                              </p>
                            </div>

                            <div className="mt-4 flex items-center gap-2 pt-2 border-t border-border/40">
                              <Button
                                size="sm"
                                className="h-8 flex-1 rounded-xl text-xs font-semibold"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveDoc({
                                    title: doc.title,
                                    src: doc.href,
                                    subject: doc.subject,
                                    topic: doc.topic,
                                    kind: doc.kind,
                                  });
                                }}
                              >
                                <Eye className="h-3.5 w-3.5 mr-1.5" />
                                Read in Platform
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 rounded-xl px-2.5 text-xs text-muted-foreground hover:text-foreground"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  downloadDoc(doc.href, downloadFileName(doc.href, doc.title));
                                }}
                                title="Download file to device directly"
                              >
                                <Download className="h-3.5 w-3.5" />
                                <span className="sr-only">Download</span>
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* ── SECTION 2: WEBNOTEE CURRICULUM REFERENCE SOLUTIONS & PDFS ─────── */}
      {(sectionFilter === "all" || sectionFilter === "webnotee") && (
        <section className="space-y-6 pt-4" aria-labelledby="webnotee-docs-heading">
          <div className="flex items-center justify-between gap-4 border-b border-border/60 pb-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-400 shadow-sm">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <h2 id="webnotee-docs-heading" className="text-xl font-bold tracking-tight text-foreground">
                  2. WebNotee Curriculum Reference Solutions &amp; Exercise PDFs
                </h2>
                <p className="text-xs text-muted-foreground">
                  Comprehensive exercise solutions and curriculum references from WebNotee. Scrollable inside platform.
                </p>
              </div>
            </div>
            <span className="hidden sm:inline-flex rounded-full border border-violet-500/20 bg-violet-500/5 px-2.5 py-1 text-xs font-bold text-violet-600 dark:text-violet-400">
              {filteredWebnoteeDocs.length} {filteredWebnoteeDocs.length === 1 ? "Resource" : "Resources"}
            </span>
          </div>

          {webnoteeGrouped.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border/70 p-8 text-center">
              <p className="text-sm text-muted-foreground">No WebNotee reference PDFs matched your filter.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {webnoteeGrouped.map(({ subject, docs }) => {
                const colors = SUBJECT_COLORS[subject];
                const SubjectIcon = SUBJECT_ICONS[subject];

                return (
                  <div key={subject} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex h-7 w-7 items-center justify-center rounded-lg border ${colors.chip}`}>
                        <SubjectIcon className="h-4 w-4" />
                      </span>
                      <h3 className="text-base font-bold text-foreground">{subject}</h3>
                      <span className="text-xs text-muted-foreground font-medium">
                        ({docs.length} {docs.length === 1 ? "solution" : "solutions"})
                      </span>
                    </div>

                    <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
                      {docs.map((doc: WebnoteeDoc) => {
                        return (
                          <div
                            key={doc.id}
                            role="button"
                            tabIndex={0}
                            onClick={() =>
                              setActiveDoc({
                                title: doc.title,
                                src: doc.driveUrl,
                                subject: doc.subject,
                                topic: doc.exercise ?? doc.unit,
                                kind: "pdf",
                              })
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                setActiveDoc({
                                  title: doc.title,
                                  src: doc.driveUrl,
                                  subject: doc.subject,
                                  topic: doc.exercise ?? doc.unit,
                                  kind: "pdf",
                                });
                              }
                            }}
                            className="group flex flex-col justify-between rounded-2xl border border-border/60 bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-violet-500/40 hover:shadow-md cursor-pointer text-left"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center justify-between gap-2">
                                <span className="inline-flex items-center gap-1 rounded-md border border-violet-500/20 bg-violet-500/10 px-1.5 py-0.5 text-[10px] font-bold text-violet-600 dark:text-violet-400">
                                  {doc.exercise ?? "Ref Guide"}
                                </span>
                                <span className="truncate text-[11px] font-semibold text-muted-foreground">
                                  {doc.unit}
                                </span>
                              </div>

                              <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors leading-snug">
                                {doc.title}
                              </h4>
                              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                {doc.description}
                              </p>
                            </div>

                            <div className="mt-4 flex items-center gap-2 pt-2 border-t border-border/40">
                              <Button
                                size="sm"
                                className="h-8 flex-1 rounded-xl text-xs font-semibold bg-violet-600 hover:bg-violet-700 text-white dark:bg-violet-500 dark:hover:bg-violet-600"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveDoc({
                                    title: doc.title,
                                    src: doc.driveUrl,
                                    subject: doc.subject,
                                    topic: doc.exercise ?? doc.unit,
                                    kind: "pdf",
                                  });
                                }}
                              >
                                <Eye className="h-3.5 w-3.5 mr-1.5" />
                                Read in Platform
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 rounded-xl px-2.5 text-xs text-muted-foreground hover:text-foreground"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  downloadDoc(doc.driveUrl, downloadFileName(doc.driveUrl, doc.title));
                                }}
                                title="Download file to device directly"
                              >
                                <Download className="h-3.5 w-3.5" />
                                <span className="sr-only">Download</span>
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* ── Additional Platform Resources & Exploration ─────────────────── */}
      <section className="space-y-4 pt-4" aria-labelledby="other-tools-heading">
        <div className="flex items-center justify-between gap-4 border-t border-border/60 pt-6">
          <h2 id="other-tools-heading" className="text-base font-bold text-foreground">
            Explore Other Study Tools &amp; Curricular Paths
          </h2>
          <Link href="/pdfs" className="text-xs font-semibold text-primary hover:underline">
            Visit PDF Library →
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {ADDITIONAL_RESOURCE_TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-2xl border border-border/60 bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-sm"
              >
                <div className={`mb-2.5 inline-flex h-9 w-9 items-center justify-center rounded-xl border ${tool.tint}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                  {tool.title}
                </h3>
                <p className="mt-1 text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                  {tool.description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
