"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  ChevronRight,
  GraduationCap,
  Loader2,
  Search,
} from "lucide-react";

import { getSubjectVisual } from "@/lib/ui/subject-visuals";

interface LessonMeta {
  slug: string;
  title: string;
  subject: "mathematics" | "physics" | "chemistry" | "biology";
  subjectTitle: string;
  classSlug: "class-11-notes";
  classTitle: string;
  unitSlug: string;
  description: string;
  wordCount?: number;
}

const FALLBACK_LESSONS: LessonMeta[] = [
  {
    slug: "algebra",
    title: "Algebra",
    subject: "mathematics",
    subjectTitle: "Mathematics",
    classSlug: "class-11-notes",
    classTitle: "Class 11 (Grade XI)",
    unitSlug: "algebra",
    description: "Logic and sets, real numbers, functions, sequence and series, matrices, quadratic equations, and complex numbers.",
  },
  {
    slug: "atomic-structure",
    title: "Atomic Structure",
    subject: "chemistry",
    subjectTitle: "Chemistry",
    classSlug: "class-11-notes",
    classTitle: "Class 11 (Grade XI)",
    unitSlug: "atomic-structure",
    description: "Rutherford and Bohr models, hydrogen spectrum, quantum numbers, orbitals, and electronic configuration.",
  },
  {
    slug: "biomolecules-and-cell-biology",
    title: "Biomolecules and Cell Biology",
    subject: "biology",
    subjectTitle: "Biology",
    classSlug: "class-11-notes",
    classTitle: "Class 11 (Grade XI)",
    unitSlug: "biomolecules-and-cell-biology",
    description: "Carbohydrates, proteins, lipids, nucleic acids, enzymes, prokaryotic vs eukaryotic cells, organelles, mitosis and meiosis.",
  },
  {
    slug: "calculus",
    title: "Calculus",
    subject: "mathematics",
    subjectTitle: "Mathematics",
    classSlug: "class-11-notes",
    classTitle: "Class 11 (Grade XI)",
    unitSlug: "calculus",
    description: "Limits and continuity, derivatives, implicit differentiation, monotonicity, integration by substitution and parts, definite integrals.",
  },
  {
    slug: "classification-of-elements-and-periodic-table",
    title: "Classification of Elements and Periodic Table",
    subject: "chemistry",
    subjectTitle: "Chemistry",
    classSlug: "class-11-notes",
    classTitle: "Class 11 (Grade XI)",
    unitSlug: "classification-of-elements-and-periodic-table",
    description: "Modern periodic law, groups/periods/blocks, nuclear charge, periodic trends of radii, ionization energy, electron affinity, electronegativity.",
  },
  {
    slug: "floral-diversity",
    title: "Floral Diversity",
    subject: "biology",
    subjectTitle: "Biology",
    classSlug: "class-11-notes",
    classTitle: "Class 11 (Grade XI)",
    unitSlug: "floral-diversity",
    description: "Five-kingdom classification, Monera Protista Fungi Plantae Animalia, algae, bryophytes, pteridophytes, gymnosperms, angiosperms.",
  },
  {
    slug: "gravitation",
    title: "Gravitation",
    subject: "physics",
    subjectTitle: "Physics",
    classSlug: "class-11-notes",
    classTitle: "Class 11 (Grade XI)",
    unitSlug: "gravitation",
    description: "Newton's law of gravitation, gravitational field and potential, variation of g with altitude and depth, satellite motion, escape velocity.",
  },
  {
    slug: "optics",
    title: "Optics",
    subject: "physics",
    subjectTitle: "Physics",
    classSlug: "class-11-notes",
    classTitle: "Class 11 (Grade XI)",
    unitSlug: "reflection-at-curved-mirror",
    description: "Reflection at curved mirrors, refraction at plane surfaces, prisms, lenses, dispersion and aberrations, and spectra.",
  },
  {
    slug: "quantity-of-heat",
    title: "Quantity of Heat",
    subject: "physics",
    subjectTitle: "Physics",
    classSlug: "class-11-notes",
    classTitle: "Class 11 (Grade XI)",
    unitSlug: "quantity-of-heat",
    description: "Newton's law of cooling, specific heat capacity, latent heat of fusion and vaporization, triple point, and calorimetry.",
  },
  {
    slug: "stoichiometry",
    title: "Stoichiometry",
    subject: "chemistry",
    subjectTitle: "Chemistry",
    classSlug: "class-11-notes",
    classTitle: "Class 11 (Grade XI)",
    unitSlug: "stoichiometry",
    description: "Dalton's atomic theory, laws of stoichiometry, Avogadro's law, mole concept, limiting reactant, yield calculations, empirical and molecular formulas.",
  },
  {
    slug: "trigonometry",
    title: "Trigonometry",
    subject: "mathematics",
    subjectTitle: "Mathematics",
    classSlug: "class-11-notes",
    classTitle: "Class 11 (Grade XI)",
    unitSlug: "trigonometry",
    description: "Inverse circular functions, principal values, graphs, and trigonometric equations with general solutions.",
  },
  {
    slug: "vectors",
    title: "Vectors",
    subject: "physics",
    subjectTitle: "Physics",
    classSlug: "class-11-notes",
    classTitle: "Class 11 (Grade XI)",
    unitSlug: "vectors",
    description: "Triangle, parallelogram and polygon laws; resolution of vectors; scalar (dot) and vector (cross) products, with worked examples.",
  },
];

const SUBJECT_ORDER: Array<LessonMeta["subject"]> = [
  "physics",
  "chemistry",
  "mathematics",
  "biology",
];

export default function LessonsLibraryPage() {
  const [lessons, setLessons] = useState<LessonMeta[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterSubject, setFilterSubject] = useState<"all" | LessonMeta["subject"]>("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/lessons");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!cancelled) {
          setLessons(json.lessons ?? []);
        }
      } catch (e: unknown) {
        if (!cancelled) {
          console.warn("Lessons list fetch failed, using fallback catalog", e);
          setLessons(FALLBACK_LESSONS);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const list = lessons ?? FALLBACK_LESSONS;
    const bySubject = filterSubject === "all" ? list : list.filter((l) => l.subject === filterSubject);
    if (!query.trim()) return bySubject;
    const q = query.toLowerCase().trim();
    return bySubject.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.subjectTitle.toLowerCase().includes(q) ||
        l.slug.toLowerCase().includes(q)
    );
  }, [lessons, filterSubject, query]);

  const subjectCounts = useMemo(() => {
    const list = lessons ?? FALLBACK_LESSONS;
    const counts: Record<string, number> = { all: list.length };
    for (const s of SUBJECT_ORDER) counts[s] = list.filter((l) => l.subject === s).length;
    return counts;
  }, [lessons]);

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
        <Link href="/home" className="flex items-center gap-1 hover:text-primary transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Home</span>
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-semibold text-foreground">Classic Lessons Library</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 pb-6 border-b border-border/60">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-fuchsia-600 dark:text-fuchsia-400">
            <BookOpen className="h-4 w-4" />
            <span>Classic Full-Chapter Lessons</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
            NEB +2 (Grade XI) Classic Chapter Lessons
          </h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
            Original in-depth chapter lessons from the legacy curriculum. Formatted with math typesetting (KaTeX),
            chemistry equations, and worked examples. Click a card to open the full chapter reader.
          </p>
        </div>
        <Link
          href="/home#section-knowledge"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border/70 bg-card hover:bg-muted text-xs font-semibold text-foreground transition-colors self-start md:self-auto"
        >
          <GraduationCap className="h-3.5 w-3.5" />
          <span>Back to Knowledge Hub</span>
        </Link>
      </div>

      {/* Filter bar */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {(["all", ...SUBJECT_ORDER] as const).map((s) => {
            const label = s === "all" ? "All Subjects" : (s.charAt(0).toUpperCase() + s.slice(1));
            const count = subjectCounts[s] ?? 0;
            const active = filterSubject === s;
            const theme = s === "all" ? { text: "text-foreground", badge: "bg-primary/15 text-primary" } : getSubjectVisual(s);
            return (
              <button
                key={s}
                onClick={() => setFilterSubject(s)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  active
                    ? `border-primary bg-primary/10 text-primary shadow-sm`
                    : `border-border/60 bg-card ${theme.text} hover:border-border`
                }`}
              >
                <span>{label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    active ? "bg-white/30 text-primary" : theme.badge
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
        <div className="relative max-w-xs w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lessons (e.g. 'vectors', 'periodic')"
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-border/70 bg-card text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50"
          />
        </div>
      </div>

      {/* Lesson grid */}
      <div className="mt-7">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
            <span className="text-sm">Loading lesson catalog…</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-muted-foreground border border-dashed border-border/60 rounded-2xl">
            <p className="text-sm font-semibold">No lessons match your filter.</p>
            <p className="text-xs mt-1">Try a different subject or clear the search.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((lesson) => {
              const theme = getSubjectVisual(lesson.subject);
              return (
                <Link
                  key={lesson.slug}
                  href={`/lessons/${lesson.slug}`}
                  className={`group flex flex-col justify-between rounded-3xl border border-border/70 bg-gradient-to-br ${theme.bg} bg-card p-5 shadow-sm transition-all duration-200 ${theme.border} hover:shadow-lg`}
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span aria-hidden="true" className="shrink-0 text-2xl leading-none">{theme.glyph}</span>
                        <div>
                          <h3 className="font-bold text-foreground text-base group-hover:text-primary transition-colors">
                            {lesson.title}
                          </h3>
                          <p className="text-xs text-muted-foreground">{lesson.subjectTitle}</p>
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${theme.badge}`}
                      >
                        Class 11
                      </span>
                    </div>

                    <p className="mt-3 text-xs text-muted-foreground leading-relaxed line-clamp-3">
                      {lesson.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground">
                      {typeof lesson.wordCount === "number" && lesson.wordCount > 0 ? (
                        <span>~{lesson.wordCount.toLocaleString()} words</span>
                      ) : (
                        <span className="invisible">—</span>
                      )}
                      <span className={`font-semibold ${theme.text} group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1`}>
                        Open chapter
                        <ChevronRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer note */}
      <div className="mt-10 rounded-2xl border border-border/60 bg-card p-4 text-[11px] text-muted-foreground leading-relaxed">
        <p className="font-semibold text-foreground text-xs mb-1">Note about this library</p>
        These are the original markdown chapter lessons authored before the structured topic-level notes system.
        For the latest curriculum-aligned topic notes, use the{" "}
        <Link href="/class-11-notes" className="text-primary font-medium hover:underline">
          Class 11 Notes
        </Link>{" "}
        section for your subject, which includes concept notes, mindmaps, derivations, and PYQs.
      </div>
    </div>
  );
}
