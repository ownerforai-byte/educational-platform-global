"use client";

import Link from "next/link";
import {
  Atom,
  BookMarked,
  FlaskConical,
  GraduationCap,
  LayoutGrid,
  MessageCircleQuestion,
  PencilRuler,
} from "lucide-react";

/**
 * Entry point from the R1 personal workspace back into the study platform
 * (notes, labs, quizzes, Veer AI, past papers). Visitors reach it from here.
 */

const SECTIONS = [
  { href: "/home", label: "Study home", icon: LayoutGrid, glyph: "📚", desc: "Notes, syllabus and tools" },
  { href: "/class-11", label: "Class 11", icon: GraduationCap, glyph: "🎓", desc: "Notes, syllabus, units" },
  { href: "/lab", label: "Labs", icon: FlaskConical, glyph: "🔬", desc: "Simulations and models" },
  { href: "/ai", label: "Veer AI", icon: MessageCircleQuestion, glyph: "💡", desc: "Tutor, quiz, search" },
  { href: "/theorems", label: "Theorems", icon: PencilRuler, glyph: "📐", desc: "Proofs & derivations" },
  { href: "/pyqs", label: "Past papers", icon: BookMarked, glyph: "📝", desc: "Solved exam questions" },
  { href: "/periodic-table", label: "Elements", icon: Atom, glyph: "🪨", desc: "Periodic table" },
];

export function PlatformOverview() {
  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <LayoutGrid className="h-4 w-4" aria-hidden="true" />
              </span>
              <h2 className="text-xl font-semibold tracking-tight">Study platform</h2>
            </div>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Every subject, lab, quiz and the Veer AI tutor, organised around the
              NEB curriculum.
            </p>
          </div>
          <Link
            href="/home"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <LayoutGrid className="h-4 w-4" aria-hidden="true" />
            Open study platform
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {SECTIONS.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.href}
                href={s.href}
                className="rounded-xl border border-border bg-background p-3 transition-colors hover:border-primary/40 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold">
                  <span aria-hidden="true">{s.glyph}</span>
                  {s.label}
                </div>
                <div className="mt-0.5 text-[11px] leading-tight text-muted-foreground">
                  {s.desc}
                </div>
              </Link>
            );
          })}
        </div>

        <Link
          href="/home"
          className="mt-6 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:hidden"
        >
          <LayoutGrid className="h-4 w-4" aria-hidden="true" />
          Open study platform
        </Link>
      </div>
    </section>
  );
}
