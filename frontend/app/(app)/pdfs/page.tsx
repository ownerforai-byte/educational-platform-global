"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileText,
  File,
  Globe,
  X,
  ExternalLink,
  Download,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MathMarkdown } from "@/components/content/math-markdown";

type Kind = "pdf" | "html" | "md" | "docx";

type Doc = {
  key: string;
  title: string;
  subject: string;
  description: string;
  href: string;
  kind: Kind;
};

// Static study materials. PDFs live under /pdfs, everything else under /materials
// (both served from frontend/public, so they need no backend / auth).
const PDFS_DIR = "/pdfs";
const MAT_DIR = "/materials";

const DOCS: Doc[] = [
  // ── PDFs ──────────────────────────────────────────────────────────────
  {
    key: "pioneer-grade11-biology-examcram",
    title: "Pioneer Grade 11 Biology — Exam Cram",
    subject: "Biology · Class 11",
    description: "Full-syllabus rapid revision: key facts, diagrams and high-yield points across Class 11 Biology.",
    href: `${PDFS_DIR}/pioneer-grade11-biology-examcram.pdf`,
    kind: "pdf",
  },
  {
    key: "ideal-and-real-gases-notes",
    title: "Ideal & Real Gases — Notes",
    subject: "Physics · Thermodynamics",
    description: "Kinetic theory, ideal gas law and deviations of real gases (van der Waals).",
    href: `${MAT_DIR}/ideal-and-real-gases-notes.pdf`,
    kind: "pdf",
  },
  {
    key: "liquid-state-notes",
    title: "Liquid State — Notes",
    subject: "Physics · States of Matter",
    description: "Intermolecular forces, viscosity, surface tension and liquid crystals.",
    href: `${MAT_DIR}/liquid-state-notes.pdf`,
    kind: "pdf",
  },
  {
    key: "liquid-crystal",
    title: "Liquid Crystals",
    subject: "Physics · States of Matter",
    description: "Mesophase behaviour and the physics of liquid-crystal materials.",
    href: `${MAT_DIR}/liquid-crystal.pdf`,
    kind: "pdf",
  },

  // ── Markdown (rendered inline) ────────────────────────────────────────
  {
    key: "cell-biology-masterclass-slides",
    title: "Cell Biology — Masterclass Slides",
    subject: "Biology · Slides",
    description: "Optimised slide-style notes covering the full cell-biology unit.",
    href: `${MAT_DIR}/cell-biology-masterclass-slides.md`,
    kind: "md",
  },
  {
    key: "chemistry-mcq-test",
    title: "Chemistry — MCQ Test",
    subject: "Chemistry · Practice",
    description: "Optimised multiple-choice practice set.",
    href: `${MAT_DIR}/chemistry-mcq-test.md`,
    kind: "md",
  },
  {
    key: "physics-mcq-test",
    title: "Physics — MCQ Test",
    subject: "Physics · Practice",
    description: "Optimised multiple-choice practice set.",
    href: `${MAT_DIR}/physics-mcq-test.md`,
    kind: "md",
  },
  {
    key: "math-mcq-test",
    title: "Math — MCQ Test",
    subject: "Mathematics · Practice",
    description: "Optimised multiple-choice practice set.",
    href: `${MAT_DIR}/math-mcq-test.md`,
    kind: "md",
  },

  // ── HTML (inline) ─────────────────────────────────────────────────────
  {
    key: "physics-guide-with-diagrams",
    title: "Physics Guide — With Diagrams",
    subject: "Physics · Illustrated",
    description: "9 illustrated diagrams with step-by-step worked explanations.",
    href: `${MAT_DIR}/physics-guide-with-diagrams.html`,
    kind: "html",
  },

  // ── DOCX (open / download — not inline-renderable in a browser) ───────
  {
    key: "biology-units-1to5-mindmap-architecture",
    title: "Biology Units 1–5 — Mindmap Architecture",
    subject: "Biology · Study Material",
    description: "Concept-mindmap architecture for Biology Units 1 to 5.",
    href: `${MAT_DIR}/biology-units-1to5-mindmap-architecture.docx`,
    kind: "docx",
  },
  {
    key: "biology-units-1to5-conceptual-notes",
    title: "Biology Units 1–5 — Conceptual Study Notes",
    subject: "Biology · Study Material",
    description: "Conceptual study notes for Biology Units 1 to 5.",
    href: `${MAT_DIR}/biology-units-1to5-conceptual-notes.docx`,
    kind: "docx",
  },
  {
    key: "physics-comprehensive-guide",
    title: "Physics Comprehensive Guide",
    subject: "Physics · Reference",
    description: "Tables + synonym/reference material for the physics unit.",
    href: `${MAT_DIR}/physics-comprehensive-guide.docx`,
    kind: "docx",
  },
  {
    key: "physics-conceptual-question-bank",
    title: "Physics — Conceptual Question Bank",
    subject: "Physics · 140+ Qs",
    description: "140+ conceptual questions with reasoning.",
    href: `${MAT_DIR}/physics-conceptual-question-bank.docx`,
    kind: "docx",
  },
];

const KIND_META: Record<
  Kind,
  { label: string; icon: typeof FileText; tint: string; border: string }
> = {
  pdf: { label: "PDF", icon: FileText, tint: "bg-rose-500/10 text-rose-500", border: "border-rose-500/20" },
  html: { label: "HTML", icon: Globe, tint: "bg-sky-500/10 text-sky-500", border: "border-sky-500/20" },
  md: { label: "MD", icon: FileText, tint: "bg-emerald-500/10 text-emerald-500", border: "border-emerald-500/20" },
  docx: { label: "DOCX", icon: File, tint: "bg-indigo-500/10 text-indigo-500", border: "border-indigo-500/20" },
};

function CardIcon({ kind, className }: { kind: Kind; className?: string }) {
  const Icon = KIND_META[kind].icon;
  return <Icon className={className} />;
}

export default function PdfLibraryPage() {
  const [active, setActive] = useState<Doc | null>(null);
  const [mdText, setMdText] = useState("");
  const [mdLoading, setMdLoading] = useState(false);

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
              PDFs, notes, practice sets and guides — open and read them right here, no download needed.
            </p>
          </div>
        </div>
      </div>

      {/* Document grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DOCS.map((doc) => {
          const meta = KIND_META[doc.kind];
          const isOpen = active?.key === doc.key;
          return (
            <div
              key={doc.key}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg"
            >
              <div
                className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${meta.tint} border ${meta.border} transition-transform group-hover:scale-110`}
              >
                <CardIcon kind={doc.kind} className="h-5 w-5" />
                <span className="sr-only">{meta.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {doc.subject}
                </p>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${meta.tint}`}
                >
                  {meta.label}
                </span>
              </div>
              <h3 className="mt-1.5 font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                {doc.title}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                {doc.description}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {doc.kind === "docx" ? (
                  <Button size="sm" asChild>
                    <a href={doc.href}>
                      <Download className="h-4 w-4 mr-1.5" />
                      Open / Download
                    </a>
                  </Button>
                ) : (
                  <Button size="sm" onClick={() => open(doc)}>
                    <BookOpen className="h-4 w-4 mr-1.5" />
                    Open
                  </Button>
                )}
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={doc.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5"
                  >
                    <ExternalLink className="h-4 w-4" />
                    New tab
                  </a>
                </Button>
                {isOpen && doc.kind !== "docx" && (
                  <Button variant="ghost" size="sm" onClick={close}>
                    Close
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Inline reader */}
      {active && active.kind !== "docx" && (
        <div className="rounded-2xl border border-primary/20 bg-card shadow-lg overflow-hidden">
          <div className="flex items-center justify-between gap-3 border-b border-border/60 px-5 py-3">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {active.subject} · {KIND_META[active.kind].label}
              </p>
              <h2 className="text-base font-semibold text-foreground truncate">{active.title}</h2>
            </div>
            <Button variant="outline" size="sm" onClick={close}>
              <X className="h-4 w-4 mr-1.5" />
              Close
            </Button>
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
