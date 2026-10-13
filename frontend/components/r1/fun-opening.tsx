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
  Sparkles,
} from "lucide-react";

/**
 * The "Fun" opening — R1's portal into the complete learning platform
 * (everything that exists today: notes, labs, quizzes, Veer AI, PYQs…).
 * Public visitors live in Fun directly; R1 users reach it from here.
 */

const PORTALS = [
  { href: "/home", label: "Fun Home", icon: LayoutGrid, desc: "The full learning platform" },
  { href: "/class-11", label: "Class 11", icon: GraduationCap, desc: "Notes, syllabus, units" },
  { href: "/lab", label: "3D Labs", icon: FlaskConical, desc: "96+ simulations" },
  { href: "/ai", label: "Veer AI", icon: MessageCircleQuestion, desc: "Tutor, quiz, search" },
  { href: "/theorems", label: "Theorems", icon: PencilRuler, desc: "Proofs & derivations" },
  { href: "/pyqs", label: "PYQ Bank", icon: BookMarked, desc: "Solved past questions" },
  { href: "/periodic-table", label: "Elements", icon: Atom, desc: "118-element table" },
];

export function FunOpening() {
  return (
    <section className="overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-background">
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Sparkles className="h-4.5 w-4.5" />
              </span>
              <h2 className="text-xl font-bold tracking-tight">Fun</h2>
            </div>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              The complete learning platform — every subject, lab, quiz and the Veer AI
              tutor. Everything you (and every visitor) already know, behind one opening.
            </p>
          </div>
          <Link
            href="/home"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:opacity-90"
          >
            <LayoutGrid className="h-4 w-4" />
            Open Fun
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {PORTALS.map((p) => {
            const Icon = p.icon;
            return (
              <Link
                key={p.href}
                href={p.href}
                className="group rounded-xl border border-border/60 bg-background/80 p-3 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <Icon className="h-5 w-5 text-primary" />
                <div className="mt-2 text-xs font-semibold">{p.label}</div>
                <div className="mt-0.5 text-[11px] leading-tight text-muted-foreground">
                  {p.desc}
                </div>
              </Link>
            );
          })}
        </div>

        <Link
          href="/home"
          className="mt-6 inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:opacity-90 sm:hidden"
        >
          <LayoutGrid className="h-4 w-4" />
          Open Fun
        </Link>
      </div>
    </section>
  );
}
