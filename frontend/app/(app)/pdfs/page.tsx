"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Atom,
  BookOpen,
  Dna,
  Download,
  File,
  FileText,
  FlaskConical,
  Globe,
  Sigma,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MathMarkdown } from "@/components/content/math-markdown";

type Kind = "pdf" | "html" | "md" | "docx";
type Subject = "Biology" | "Physics" | "Chemistry" | "Mathematics";

type Doc = {
  key: string;
  title: string;
  subject: Subject;
  topic: string;
  description: string;
  href: string;
  kind: Kind;
};

// Static study materials. PDFs live under /pdfs, everything else under /materials
// (both served from frontend/public, so they need no backend / auth).
const PDFS_DIR = "/pdfs";
const MAT_DIR = "/materials";

const DOCS: Doc[] = [
  // ── Biology ───────────────────────────────────────────────────────────
  {
    key: "pioneer-grade11-biology-examcram",
    title: "Pioneer Grade 11 Biology — Exam Cram (Enhanced)",
    subject: "Biology",
    topic: "Class 11 · Full syllabus",
    description:
      "Full-syllabus rapid revision across Class 11 Biology — enhanced layout with section bookmarks and model answers.",
    href: `${PDFS_DIR}/pioneer-grade11-biology-examcram.pdf`,
    kind: "pdf",
  },
  {
    key: "bacteria-nutrition-classified-v2",
    title: "Nutrition in Bacteria — Fully Classified",
    subject: "Biology",
    topic: "Class 11/12 · Study guide",
    description:
      "Every nutritional type sorted by energy, carbon and electron source — tables, diagrams, 4-mark and 4.8-mark answer blocks.",
    href: `${PDFS_DIR}/bacteria-nutrition-classified-v2.pdf`,
    kind: "pdf",
  },
  {
    key: "biology-8mark-long-questions",
    title: "Biology — Probable 8-Mark Long Questions",
    subject: "Biology",
    topic: "Class 11 · Model answers",
    description:
      "Sixteen probable long-answer questions with full model answers, diagrams and marking points.",
    href: `${PDFS_DIR}/biology-8mark-long-questions.pdf`,
    kind: "pdf",
  },
  {
    key: "intro-microbiology-kingdom-monera",
    title: "Introductory Microbiology — Kingdom Monera",
    subject: "Biology",
    topic: "Class 11 · Notes",
    description:
      "Monera characteristics, bacterial structure and classification — compact revision notes.",
    href: `${PDFS_DIR}/bacteria.pdf`,
    kind: "pdf",
  },
  {
    key: "meiosis-cell-division",
    title: "Meiosis — Cell Division",
    subject: "Biology",
    topic: "Class 11 · Diagrams",
    description:
      "Illustrated meiosis walkthrough with the stages of cell division laid out step by step.",
    href: `${PDFS_DIR}/meiosis.pdf`,
    kind: "pdf",
  },
  {
    key: "cell-biology-masterclass-slides",
    title: "Cell Biology — Masterclass Slides",
    subject: "Biology",
    topic: "Slides",
    description: "Optimised slide-style notes covering the full cell-biology unit.",
    href: `${MAT_DIR}/cell-biology-masterclass-slides.md`,
    kind: "md",
  },
  {
    key: "biology-units-1to5-mindmap-architecture",
    title: "Biology Units 1–5 — Mindmap Architecture",
    subject: "Biology",
    topic: "Study Material",
    description: "Concept-mindmap architecture for Biology Units 1 to 5.",
    href: `${MAT_DIR}/biology-units-1to5-mindmap-architecture.docx`,
    kind: "docx",
  },
  {
    key: "biology-units-1to5-conceptual-notes",
    title: "Biology Units 1–5 — Conceptual Study Notes",
    subject: "Biology",
    topic: "Study Material",
    description: "Conceptual study notes for Biology Units 1 to 5.",
    href: `${MAT_DIR}/biology-units-1to5-conceptual-notes.docx`,
    kind: "docx",
  },

  // ── Physics ───────────────────────────────────────────────────────────
  {
    key: "ideal-and-real-gases-notes",
    title: "Ideal & Real Gases — Notes",
    subject: "Physics",
    topic: "Thermodynamics",
    description: "Kinetic theory, ideal gas law and deviations of real gases (van der Waals).",
    href: `${MAT_DIR}/ideal-and-real-gases-notes.pdf`,
    kind: "pdf",
  },
  {
    key: "liquid-state-notes",
    title: "Liquid State — Notes",
    subject: "Physics",
    topic: "States of Matter",
    description: "Intermolecular forces, viscosity, surface tension and liquid crystals.",
    href: `${MAT_DIR}/liquid-state-notes.pdf`,
    kind: "pdf",
  },
  {
    key: "liquid-crystal",
    title: "Liquid Crystals",
    subject: "Physics",
    topic: "States of Matter",
    description: "Mesophase behaviour and the physics of liquid-crystal materials.",
    href: `${MAT_DIR}/liquid-crystal.pdf`,
    kind: "pdf",
  },
  {
    key: "physics-guide-with-diagrams",
    title: "Physics Guide — With Diagrams",
    subject: "Physics",
    topic: "Illustrated",
    description: "9 illustrated diagrams with step-by-step worked explanations.",
    href: `${MAT_DIR}/physics-guide-with-diagrams.html`,
    kind: "html",
  },
  {
    key: "physics-mcq-test",
    title: "Physics — MCQ Test",
    subject: "Physics",
    topic: "Practice",
    description: "Optimised multiple-choice practice set.",
    href: `${MAT_DIR}/physics-mcq-test.md`,
    kind: "md",
  },
  {
    key: "physics-comprehensive-guide",
    title: "Physics Comprehensive Guide",
    subject: "Physics",
    topic: "Reference",
    description: "Tables + synonym/reference material for the physics unit.",
    href: `${MAT_DIR}/physics-comprehensive-guide.docx`,
    kind: "docx",
  },
  {
    key: "physics-conceptual-question-bank",
    title: "Physics — Conceptual Question Bank",
    subject: "Physics",
    topic: "140+ Qs",
    description: "140+ conceptual questions with reasoning.",
    href: `${MAT_DIR}/physics-conceptual-question-bank.docx`,
    kind: "docx",
  },

  // ── Chemistry ─────────────────────────────────────────────────────────
  {
    key: "chemistry-mcq-test",
    title: "Chemistry — MCQ Test",
    subject: "Chemistry",
    topic: "Practice",
    description: "Optimised multiple-choice practice set.",
    href: `${MAT_DIR}/chemistry-mcq-test.md`,
    kind: "md",
  },

  // ── Mathematics ───────────────────────────────────────────────────────
  {
    key: "math-mcq-test",
    title: "Math — MCQ Test",
    subject: "Mathematics",
    topic: "Practice",
    description: "Optimised multiple-choice practice set.",
    href: `${MAT_DIR}/math-mcq-test.md`,
    kind: "md",
  },
];

const SUBJECT_ORDER: Subject[] = ["Biology", "Physics", "Chemistry", "Mathematics"];

const SUBJECT_META: Record<
  Subject,
  { blurb: string; icon: typeof Dna; chip: string }
> = {
  Biology: {
    blurb: "Cells, microbiology, classification and diagrams",
    icon: Dna,
    chip: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  Physics: {
    blurb: "Mechanics, states of matter and practice sets",
    icon: Atom,
    chip: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
  },
  Chemistry: {
    blurb: "Practice sets and reference material",
    icon: FlaskConical,
    chip: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
  Mathematics: {
    blurb: "Practice sets and worked questions",
    icon: Sigma,
    chip: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
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

type Filter = Subject | "All";

const SUBJECT_GROUPS = SUBJECT_ORDER.map((subject) => ({
  subject,
  docs: DOCS.filter((doc) => doc.subject === subject),
}));

const SUBJECT_COUNTS: Record<Filter, number> = {
  All: DOCS.length,
  ...(Object.fromEntries(
    SUBJECT_GROUPS.map(({ subject, docs }) => [subject, docs.length]),
  ) as Record<Subject, number>),
};

function CardIcon({ kind, className }: { kind: Kind; className?: string }) {
  const Icon = KIND_META[kind].icon;
  return <Icon className={className} />;
}

export default function PdfLibraryPage() {
  const [active, setActive] = useState<Doc | null>(null);
  const [mdText, setMdText] = useState("");
  const [mdLoading, setMdLoading] = useState(false);
  const [filter, setFilter] = useState<Filter>("All");

  const groups = useMemo(
    () => (filter === "All" ? SUBJECT_GROUPS : SUBJECT_GROUPS.filter((g) => g.subject === filter)),
    [filter],
  );

  const open = (doc: Doc) => {
    if (doc.kind === "md") {
      setMdText("");
      setMdLoading(true);
      setActive(doc);
      fetch(doc.href)
        .then((r) => r.text())
        .then((t) => setMdText(t))
        .catch(() => setMdText("Could not load this document."))
        .finally(() => setMdLoading(false));
    } else {
      setMdText("");
      setActive(doc);
    }
    requestAnimationFrame(() => {
      document.getElementById("study-reader")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const close = () => {
    setActive(null);
    setMdText("");
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8 py-8 md:py-14 px-4">
      <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-primary/8 via-background to-background p-6 md:p-8 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500 border border-rose-500/20">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">📄 Study Materials</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              All PDFs and notes, classified by subject — open them right here or download a copy.
            </p>
          </div>
        </div>
      </div>

      {/* Subject filter */}
      <div className="flex flex-wrap items-center gap-2" aria-label="Filter by subject">
        {(["All", ...SUBJECT_ORDER] as Filter[]).map((subject) => {
          const isActive = filter === subject;
          const meta = subject === "All" ? null : SUBJECT_META[subject];
          const Icon = meta?.icon ?? FileText;
          return (
            <button
              key={subject}
              type="button"
              aria-pressed={isActive}
              onClick={() => setFilter(subject)}
              className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-colors ${
                isActive
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "border-border/70 bg-card text-muted-foreground hover:bg-muted/40 hover:text-foreground"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {subject}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                  isActive ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                }`}
              >
                {SUBJECT_COUNTS[subject]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Subject-classified sections */}
      {groups.map(({ subject, docs }) => {
        const meta = SUBJECT_META[subject];
        const SubjectIcon = meta.icon;
        return (
          <section key={subject} className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span
                className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border ${meta.chip}`}
              >
                <SubjectIcon className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-base font-bold tracking-tight">{subject}</h2>
                <p className="text-[11px] text-muted-foreground">
                  {meta.blurb} · {docs.length} {docs.length === 1 ? "item" : "items"}
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {docs.map((doc) => {
                const kindMeta = KIND_META[doc.kind];
                const isOpen = active?.key === doc.key;
                return (
                  <div
                    key={doc.key}
                    className={`group relative overflow-hidden rounded-2xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg ${
                      isOpen ? "border-primary/50 shadow-md" : "border-border/60"
                    }`}
                  >
                    <div
                      className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${kindMeta.tint} border ${kindMeta.border} transition-transform group-hover:scale-110`}
                    >
                      <CardIcon kind={doc.kind} className="h-5 w-5" />
                      <span className="sr-only">{kindMeta.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {doc.topic}
                      </p>
                      <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${kindMeta.tint}`}>
                        {kindMeta.label}
                      </span>
                    </div>
                    <h3 className="mt-1.5 font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                      {doc.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      {doc.description}
                    </p>

                    {/* Three clear actions: Open · Download · Close */}
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      {doc.kind === "docx" ? (
                        <Button size="sm" asChild>
                          <a href={doc.href} target="_blank" rel="noreferrer noopener">
                            <BookOpen className="h-4 w-4 mr-1.5" />
                            Open
                          </a>
                        </Button>
                      ) : (
                        <Button size="sm" onClick={() => open(doc)}>
                          <BookOpen className="h-4 w-4 mr-1.5" />
                          Open
                        </Button>
                      )}
                      <Button variant="outline" size="sm" asChild>
                        <a href={doc.href} download>
                          <Download className="h-4 w-4 mr-1.5" />
                          Download
                        </a>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={close}
                        disabled={!isOpen}
                        title={isOpen ? "Close this document" : "Open a document to close it"}
                      >
                        <X className="h-4 w-4 mr-1.5" />
                        Close
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      {/* Inline reader */}
      {active && active.kind !== "docx" && (
        <div
          id="study-reader"
          className="rounded-2xl border border-primary/20 bg-card shadow-lg overflow-hidden scroll-mt-20"
        >
          <div className="flex items-center justify-between gap-3 border-b border-border/60 px-5 py-3">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {active.subject} · {active.topic} · {KIND_META[active.kind].label}
              </p>
              <h2 className="text-base font-semibold text-foreground truncate">{active.title}</h2>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button variant="outline" size="sm" asChild>
                <a href={active.href} download>
                  <Download className="h-4 w-4 mr-1.5" />
                  Download
                </a>
              </Button>
              <Button variant="outline" size="sm" onClick={close}>
                <X className="h-4 w-4 mr-1.5" />
                Close
              </Button>
            </div>
          </div>

          {active.kind === "md" ? (
            <div className="max-w-3xl px-6 py-5">
              {mdLoading ? (
                <p className="text-sm text-muted-foreground">Loading document…</p>
              ) : (
                <MathMarkdown content={mdText} className="prose-sm" />
              )}
            </div>
          ) : (
            <div className="w-full bg-white">
              <iframe
                src={active.href}
                title={active.title}
                className="h-[78vh] min-h-[480px] w-full"
                style={{ border: 0 }}
              />
            </div>
          )}
        </div>
      )}

      <div className="flex items-center justify-center pt-2">
        <Link href="/resources" className="text-xs text-muted-foreground hover:text-primary">
          Browse the full Resource Vault →
        </Link>
      </div>
    </div>
  );
}
