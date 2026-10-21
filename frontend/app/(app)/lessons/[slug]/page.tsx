"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  ChevronRight,
  Loader2,
  ArrowUpRight,
} from "lucide-react";
import { MathMarkdown } from "@/components/content/math-markdown";
import { getSubjectVisual } from "@/lib/ui/subject-visuals";

interface LessonPayload {
  slug: string;
  title: string;
  subject: "mathematics" | "physics" | "chemistry" | "biology";
  subjectTitle: string;
  classSlug: "class-11-notes";
  classTitle: string;
  unitSlug: string;
  description: string;
  markdown: string;
  wordCount?: number;
}

const KNOWN_SLUGS = new Set([
  "algebra",
  "atomic-structure",
  "biomolecules-and-cell-biology",
  "calculus",
  "classification-of-elements-and-periodic-table",
  "floral-diversity",
  "gravitation",
  "optics",
  "quantity-of-heat",
  "stoichiometry",
  "trigonometry",
  "vectors",
]);

export default function LessonViewerPage() {
  const params = useParams();
  const rawSlug = params?.slug as string | string[] | undefined;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug ?? "";

  const [lesson, setLesson] = useState<LessonPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    if (!KNOWN_SLUGS.has(slug)) {
      setError(`Unknown lesson: "${slug}". Use the link below to return to the library.`);
      setLoading(false);
      return;
    }
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/lessons/${encodeURIComponent(slug)}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as LessonPayload;
        if (!cancelled) setLesson(json);
      } catch (e: unknown) {
        if (!cancelled) {
          const msg = e instanceof Error ? e.message : "Unknown error";
          setError(`Failed to load the lesson (${msg}). You can try again or return to the library.`);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const theme = getSubjectVisual(lesson?.subject);

  return (
    <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <div className="mb-6 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <Link href="/home" className="flex items-center gap-1 hover:text-primary transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Home</span>
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/lessons" className="hover:text-primary transition-colors">
          Lessons Library
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-semibold text-foreground truncate max-w-[280px]">
          {lesson ? lesson.title : slug || "Loading…"}
        </span>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin mb-3 text-primary" />
          <p className="text-sm">Loading chapter content…</p>
          <p className="text-xs mt-1 opacity-80">This may take a moment.</p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="py-16 rounded-3xl border border-destructive/40 bg-destructive/5 p-8 text-center">
          <p className="text-sm font-semibold text-destructive mb-1">Unable to load lesson</p>
          <p className="text-sm text-muted-foreground mb-5">{error}</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Link
              href="/lessons"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              <BookOpen className="h-3.5 w-3.5" />
              Open Lessons Library
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border/70 bg-card text-xs font-semibold text-foreground hover:bg-muted transition-colors"
            >
              Retry load
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      {!loading && !error && lesson && (
        <article>
          {/* Header card */}
          <header className={`rounded-3xl border border-border/70 bg-gradient-to-br ${theme.bg} bg-card p-6 sm:p-8 shadow-sm`}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center h-14 w-14 rounded-2xl border border-border/60 bg-card shadow-sm">
                  <span aria-hidden="true" className="text-3xl leading-none">{theme.glyph}</span>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${theme.badge}`}>
                      {lesson.subjectTitle}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border border-border/60 bg-card text-muted-foreground">
                      {lesson.classTitle}
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                    {lesson.title}
                  </h1>
                  <p className="text-sm text-muted-foreground mt-2 max-w-2xl">{lesson.description}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-end">
                {typeof lesson.wordCount === "number" && lesson.wordCount > 0 && (
                  <div className="text-[11px] text-muted-foreground">
                    ~{lesson.wordCount.toLocaleString()} words
                  </div>
                )}
                <Link
                  href={`/${lesson.classSlug}/${lesson.subject}/chapters/${lesson.unitSlug}`}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/60 bg-card text-[11px] font-semibold ${theme.text} hover:bg-muted transition-colors`}
                >
                  <span>Open in Class 11 notes</span>
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </header>

          {/* Divider */}
          <div className="my-8 flex items-center gap-3">
            <div className="h-px bg-border/70 flex-1" />
            <BookOpen className={`h-4 w-4 ${theme.text}`} />
            <div className="h-px bg-border/70 flex-1" />
          </div>

          {/* Body */}
          <div className="prose prose-neutral dark:prose-invert prose-slate max-w-none">
            <MathMarkdown content={lesson.markdown} />
          </div>

          {/* Bottom nav */}
          <footer className="mt-12 pt-6 border-t border-border/60 flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/lessons"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border/70 bg-card text-xs font-semibold text-foreground hover:bg-muted transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Lessons Library
            </Link>
            <Link
              href={`/${lesson.classSlug}/${lesson.subject}`}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 hover:bg-primary hover:text-primary-foreground ${theme.text} text-xs font-semibold transition-all`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              {lesson.subjectTitle} Full Notes
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </footer>
        </article>
      )}
    </div>
  );
}
