import Link from "next/link";
import {
  BookOpen,
  Brain,
  FlaskConical,
  GraduationCap,
  Sigma,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { FORMULA_SUBJECTS, getFormulaSheetSummaries } from "@/lib/formula-sheet";

const FORMULA_ICONS: Record<string, LucideIcon> = {
  physics: Zap,
  mathematics: Sigma,
  chemistry: FlaskConical,
};

/**
 * Welcome introduction — the platform story plus the 4-step study journey.
 *
 * The journey cards were re-pointed at the formula sheets (owner request
 * 2026-10-04: "replace these … with physics, math and chemistry formula section
 * respectively"): steps 01–03 now open the Physics, Mathematics and Chemistry
 * formula sheets, each card carrying the real formula/unit counts extracted
 * from the shipped notes. Step 04 (Ask Veer) is unchanged.
 */
export async function HomeIntroduction() {
  let summaries: Awaited<ReturnType<typeof getFormulaSheetSummaries>> = [];
  try {
    summaries = await getFormulaSheetSummaries();
  } catch {
    // Notes tree unavailable (e.g. stripped build) — cards render without counts.
  }
  const bySlug = new Map(summaries.map((s) => [s.slug, s]));

  const journeySteps = [
    ...FORMULA_SUBJECTS.map((subject, index) => {
      const summary = bySlug.get(subject.slug);
      return {
        step: `0${index + 1}`,
        icon: FORMULA_ICONS[subject.slug] ?? BookOpen,
        title: `${subject.name} Formula Sheet`,
        text: `Every ${subject.name.toLowerCase()} formula the Class 11 notes carry${
          summary
            ? ` — ${summary.formulaCount} formulas across ${summary.unitCount} unit sheets`
            : ""
        }, in official syllabus order and grouped under the note each one came from.`,
        href: `/formulas/${subject.slug}`,
        cta: `Open ${subject.name} formulas`,
      };
    }),
    {
      step: "04",
      icon: Brain,
      title: "Ask Veer",
      text: "Stuck at 2 AM? Veer answers doubts in plain language with live web citations — and generates practice questions from your own syllabus.",
      href: "/chat",
      cta: "Meet Veer",
    },
  ];

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
            proofs, derivations, exam countdowns, and Veer with a live internet
            connection — all in one place, all curriculum-aligned. No paywalls on the
            path to understanding.
          </p>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Start with the formula sheets: every Physics, Mathematics and Chemistry
            formula the notes carry, unit by unit in official syllabus order — or jump
            straight to a subject below and the platform walks with you, topic by
            topic.
          </p>
        </div>

        {/* Journey steps */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {journeySteps.map(({ step, icon: Icon, title, text, href, cta }) => (
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
