import Link from "next/link";
import {
  BookOpen,
  Brain,
  Compass,
  FlaskConical,
  GraduationCap,
  Sparkles,
  Trophy,
} from "lucide-react";

const JOURNEY_STEPS = [
  {
    step: "01",
    icon: Compass,
    title: "Choose Your Stream",
    text: "Grade 11 or Grade 12 — all six NEB subjects mapped to the official curriculum order, so you always know exactly where you are and what comes next.",
    href: "/levels",
    cta: "Browse the curriculum",
  },
  {
    step: "02",
    icon: FlaskConical,
    title: "Learn by Seeing",
    text: "Step into 96+ interactive 3D labs — spin a cell, build a molecule, bend light, launch projectiles. Concepts stick when you can grab them.",
    href: "/lab",
    cta: "Enter the 3D labs",
  },
  {
    step: "03",
    icon: Trophy,
    title: "Master the Rigor",
    text: "Step-by-step theorem proofs, verified derivations, solved numericals, and AI-generated quizzes that turn reading marks into board-exam marks.",
    href: "/theorems",
    cta: "Theorems & derivations",
  },
  {
    step: "04",
    icon: Brain,
    title: "Ask the Captain",
    text: "Stuck at 2 AM? Ravikisan's AI Tutor answers doubts in plain language with live web citations — and generates practice questions from your own syllabus.",
    href: "/chat",
    cta: "Meet your AI tutor",
  },
];

export function HomeIntroduction() {
  return (
    <section className="relative border-b border-border/60 py-14 sm:py-16">
      <div className="absolute top-8 right-1/3 h-64 w-64 rounded-full bg-sky-500/5 blur-[110px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4">
        {/* Heading */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Welcome — start here</span>
          </div>

          <h2 className="mt-4 text-2xl sm:text-4xl font-black tracking-tight text-foreground leading-tight">
            One platform for the whole NEB voyage —{" "}
            <span className="bg-gradient-to-r from-sky-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
              from first chapter to final board exam
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
            👋 Welcome aboard. This is a free study vault built for Nepali students
            everywhere: Class 11 &amp; 12 notes, interactive 3D science labs, theorem
            proofs, derivations, exam countdowns, and an AI tutor with a live internet
            connection — all in one place, all curriculum-aligned. No paywalls on the
            path to understanding.
          </p>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Whether you are catching up on Class 11 chemistry, drilling Grade 12
            physics numericals, preparing for CEE entrance, or exploring Loksewa
            general knowledge — pick a subject below and the platform walks with you,
            topic by topic, in the official syllabus order.
          </p>
        </div>

        {/* Journey steps */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {JOURNEY_STEPS.map(({ step, icon: Icon, title, text, href, cta }) => (
            <Link
              key={step}
              href={href}
              className="group relative flex flex-col rounded-2xl border border-border/60 bg-card/70 p-5 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-mono text-xs font-bold text-muted-foreground/60">
                  {step}
                </span>
              </div>

              <h3 className="mt-4 text-base font-bold text-foreground">{title}</h3>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">
                {text}
              </p>

              <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-primary opacity-80 transition-opacity group-hover:opacity-100">
                {cta}
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
              </span>
            </Link>
          ))}
        </div>

        {/* Start-here strip */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
          <Link
            href="/class-11-notes"
            className="inline-flex items-center gap-1.5 rounded-xl border border-sky-500/40 bg-sky-500/10 px-4 py-2.5 text-xs font-bold text-sky-600 transition-colors hover:bg-sky-500/20 dark:text-sky-400"
          >
            <GraduationCap className="h-4 w-4" />
            Start Class 11
          </Link>
          <Link
            href="/class-12-notes"
            className="inline-flex items-center gap-1.5 rounded-xl border border-violet-500/40 bg-violet-500/10 px-4 py-2.5 text-xs font-bold text-violet-600 transition-colors hover:bg-violet-500/20 dark:text-violet-400"
          >
            <GraduationCap className="h-4 w-4" />
            Start Class 12
          </Link>
          <Link
            href="/chat"
            className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-xs font-bold text-emerald-600 transition-colors hover:bg-emerald-500/20 dark:text-emerald-400"
          >
            <Brain className="h-4 w-4" />
            Clear a doubt now
          </Link>
          <Link
            href="/lessons"
            className="inline-flex items-center gap-1.5 rounded-xl border border-border/60 bg-card/80 px-4 py-2.5 text-xs font-semibold text-foreground/80 transition-colors hover:border-primary/40 hover:text-primary"
          >
            <BookOpen className="h-4 w-4 text-primary" />
            Lessons library
          </Link>
        </div>
      </div>
    </section>
  );
}
