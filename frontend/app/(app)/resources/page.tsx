"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Atom,
  BookOpen,
  Dna,
  Download,
  ExternalLink,
  File,
  FileText,
  FlaskConical,
  FolderOpen,
  Globe,
  GraduationCap,
  Languages,
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
import {
  downloadDoc,
  downloadFileName,
  frameSrcFor,
} from "@/lib/pdf-src";

export type ResourceItem = {
  id: string;
  title: string;
  subject: Subject;
  chapter: string;
  exercise?: string;
  kind: Kind;
  src: string;
  description: string;
  sourceType: "platform" | "webnotee";
  isChapterSpecific: boolean;
};

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

// Helper to check if a doc topic represents full-syllabus or general cross-topic reference
function isGeneralTopic(topic: string): boolean {
  const t = topic.toLowerCase();
  return (
    t.includes("full syllabus") ||
    t.includes("cross-subject") ||
    t.includes("exam cram") ||
    t.includes("study guide") ||
    t.includes("8-mark") ||
    t.includes("master")
  );
}

/**
 * Build the iframe `src` for any resource item.
 * - PDFs, HTML, MD → frameSrcFor (handles Drive preview URLs and local paths)
 * - DOCX → Google Docs Viewer so the document is always visible and scrollable
 *   in the browser without downloading
 */
function docIframeSrc(item: ResourceItem): string {
  if (item.kind === "docx") {
    // Local docx files need an absolute URL for Google Docs Viewer
    if (item.src.startsWith("/")) {
      const origin =
        (typeof window !== "undefined" && window.location.origin)
          ? window.location.origin
          : (process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") || "https://ravikisan.vercel.app");
      return `https://docs.google.com/gview?url=${encodeURIComponent(origin + item.src)}&embedded=true`;
    }
    return `https://docs.google.com/gview?url=${encodeURIComponent(item.src)}&embedded=true`;
  }
  return frameSrcFor(item.src);
}

// Build unified item list
const ALL_RESOURCE_ITEMS: ResourceItem[] = [
  ...WEBNOTEE_DOCS.map((doc: WebnoteeDoc) => ({
    id: doc.id,
    title: doc.title,
    subject: doc.subject,
    chapter: doc.unit,
    exercise: doc.exercise,
    kind: (doc.kind ?? "pdf") as Kind,
    src: doc.driveUrl,
    description: doc.description,
    sourceType: "webnotee" as const,
    isChapterSpecific: true,
  })),
  ...DOCS.map((doc: Doc) => {
    const isGeneral = isGeneralTopic(doc.topic);
    return {
      id: `platform-${doc.key}`,
      title: doc.title,
      subject: doc.subject,
      chapter: isGeneral ? "General & Comprehensive Revision" : doc.topic,
      exercise: undefined,
      kind: doc.kind,
      src: doc.href,
      description: doc.description,
      sourceType: "platform" as const,
      isChapterSpecific: !isGeneral,
    };
  }),
];

export default function ResourcesPage() {
  const [query, setQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<FilterSubject>("All");

  const normalizedQuery = query.trim().toLowerCase();

  // Filter items by subject and search query
  const filteredItems = useMemo(() => {
    return ALL_RESOURCE_ITEMS.filter((item) => {
      if (selectedSubject !== "All" && item.subject !== selectedSubject) {
        return false;
      }
      if (!normalizedQuery) return true;
      const haystack = `${item.title} ${item.subject} ${item.chapter} ${item.exercise ?? ""} ${item.description}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [selectedSubject, normalizedQuery]);

  // Group items by Subject in canonical curriculum order,
  // then inside each subject classify into Chapters first, then Others in order.
  const groupedBySubject = useMemo(() => {
    return SUBJECT_ORDER.map((subject) => {
      const subjectItems = filteredItems.filter((i) => i.subject === subject);
      if (subjectItems.length === 0) return null;

      // 1. Chapters first (specific chapters / units)
      const chapterItems = subjectItems.filter((i) => i.isChapterSpecific);
      const otherItems = subjectItems.filter((i) => !i.isChapterSpecific);

      const chapterMap = new Map<string, ResourceItem[]>();
      for (const item of chapterItems) {
        const list = chapterMap.get(item.chapter) ?? [];
        list.push(item);
        chapterMap.set(item.chapter, list);
      }

      const chapterSections = Array.from(chapterMap.entries()).map(([chapter, items]) => ({
        title: chapter,
        isOther: false,
        items,
      }));

      // 2. Others in order (general guides, cross-subject revision)
      const sections = [...chapterSections];
      if (otherItems.length > 0) {
        sections.push({
          title: "Comprehensive Revision & Other Documents",
          isOther: true,
          items: otherItems,
        });
      }

      return {
        subject,
        totalItems: subjectItems.length,
        sections,
      };
    }).filter(Boolean) as {
      subject: Subject;
      totalItems: number;
      sections: { title: string; isOther: boolean; items: ResourceItem[] }[];
    }[];
  }, [filteredItems]);

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-8 md:py-12">
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
            All study documents, reference exercise sets, and PDFs are already opened and scrollable
            right in their boxes below — classified by chapters first, then revision materials in order.
          </p>

          {/* Search Bar */}
          <div className="pt-2">
            <div className="relative max-w-xl">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by chapter, exercise (e.g., Ex 1.1, Functions, Straight Lines)..."
                className="h-11 w-full rounded-2xl border border-border/70 bg-background/90 pl-10 pr-9 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Subject Filter Pills ─────────────────────────────────────────── */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2" aria-label="Filter by subject">
          {(["All", ...SUBJECT_ORDER] as FilterSubject[]).map((subj) => {
            const isSelected = selectedSubject === subj;
            const count =
              subj === "All"
                ? ALL_RESOURCE_ITEMS.length
                : ALL_RESOURCE_ITEMS.filter((i) => i.subject === subj).length;

            return (
              <button
                key={subj}
                type="button"
                onClick={() => setSelectedSubject(subj)}
                className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border/70 bg-card text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }`}
              >
                <span>{subj}</span>
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

        {query && (
          <p className="text-xs text-muted-foreground">
            Found {filteredItems.length} {filteredItems.length === 1 ? "document" : "documents"} matching &ldquo;{query}&rdquo;
          </p>
        )}
      </div>

      {/* ── Documents Classified by Subject, Chapters First, Then Others ──── */}
      {groupedBySubject.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/70 p-12 text-center">
          <FolderOpen className="mx-auto h-8 w-8 text-muted-foreground/50 mb-2" />
          <p className="text-sm font-semibold text-muted-foreground">No documents found matching your filter.</p>
          <p className="text-xs text-muted-foreground/80 mt-1">Try resetting the subject filter or clearing your search term.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {groupedBySubject.map(({ subject, totalItems, sections }) => {
            const colors = SUBJECT_COLORS[subject];
            const SubjectIcon = SUBJECT_ICONS[subject];

            return (
              <section key={subject} className="space-y-8" aria-labelledby={`subject-${subject}`}>
                {/* Subject Header */}
                <div className="flex items-center justify-between gap-4 border-b border-border/60 pb-3">
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl border ${colors.chip} shadow-sm`}>
                      <SubjectIcon className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 id={`subject-${subject}`} className="text-xl font-bold tracking-tight text-foreground">
                        {subject}
                      </h2>
                      <p className="text-xs text-muted-foreground">
                        Classified by chapters in order, followed by general and revision references.
                      </p>
                    </div>
                  </div>
                  <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-bold ${colors.chip}`}>
                    {totalItems} {totalItems === 1 ? "File" : "Files"}
                  </span>
                </div>

                {/* Chapter Sections for this Subject */}
                <div className="space-y-8 pl-1">
                  {sections.map(({ title, isOther, items }) => (
                    <div key={title} className="space-y-4">
                      {/* Chapter/Unit Header */}
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${isOther ? "bg-amber-500" : "bg-primary"}`} />
                        <h3 className="text-sm sm:text-base font-bold tracking-tight text-foreground">
                          {isOther ? title : `Chapter / Unit: ${title}`}
                        </h3>
                        <span className="text-xs text-muted-foreground font-medium">
                          ({items.length} {items.length === 1 ? "document" : "documents"})
                        </span>
                      </div>

                      {/* Grid of Rectangular Document Boxes - Already Opened & Visible */}
                      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                        {items.map((item) => {
                          const kindMeta = KIND_META[item.kind];

                          return (
                            <div
                              key={item.id}
                              className="flex flex-col justify-between rounded-2xl border border-border/70 bg-card p-4 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
                            >
                              <div className="space-y-2.5">
                                {/* Top badges */}
                                <div className="flex items-center justify-between gap-2">
                                  <div className="min-w-0 flex-1 flex items-center gap-1.5 overflow-hidden">
                                    <span
                                      className={`shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
                                        item.sourceType === "webnotee"
                                          ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                                          : "bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20"
                                      }`}
                                    >
                                      {item.sourceType === "webnotee" ? "WebNotee" : "Platform"}
                                    </span>
                                    <span className="truncate rounded-md bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                                      {item.chapter}
                                    </span>
                                    {item.exercise && (
                                      <span className="shrink-0 rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary">
                                        {item.exercise}
                                      </span>
                                    )}
                                  </div>
                                  <span className={`shrink-0 inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-bold ${kindMeta.tint} border ${kindMeta.border}`}>
                                    {kindMeta.label}
                                  </span>
                                </div>

                                {/* Title and description */}
                                <div className="space-y-0.5">
                                  <h4 className="font-bold text-sm text-foreground leading-snug line-clamp-2 min-h-[2.5rem]" title={item.title}>
                                    {item.title}
                                  </h4>
                                  <p className="text-xs text-muted-foreground line-clamp-1 leading-relaxed">
                                    {item.description}
                                  </p>
                                </div>

                                {/* Rectangular Box: Always Opened, Visible & Scrollable */}
                                <div className="relative w-full h-72 sm:h-80 rounded-xl overflow-hidden border border-border/60 bg-slate-50 dark:bg-slate-950 shadow-inner">
                                  <iframe
                                    src={docIframeSrc(item)}
                                    title={item.title}
                                    loading="lazy"
                                    className="w-full h-full border-0 bg-white"
                                    allow="autoplay; encrypted-media; fullscreen"
                                  />
                                </div>
                              </div>

                              {/* Card Action Controls */}
                              <div className="mt-3 flex items-center justify-between gap-2 pt-2 border-t border-border/40">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 flex-1 rounded-xl text-xs font-semibold"
                                  onClick={() => downloadDoc(item.src, downloadFileName(item.src, item.title))}
                                  title="Download this document to your device"
                                >
                                  <Download className="h-3.5 w-3.5 mr-1.5" />
                                  Download
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-8 rounded-xl px-2.5 text-xs text-muted-foreground hover:text-foreground"
                                  asChild
                                  title="Open direct file in dedicated tab"
                                >
                                  <a
                                    href={item.src}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                  >
                                    <ExternalLink className="h-3.5 w-3.5 mr-1" />
                                    Full Tab
                                  </a>
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
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
