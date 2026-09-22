import Link from "next/link";
import { ChevronRight, ArrowLeft, Beaker, Zap, Dna, BookOpen, PenLine, Languages } from "lucide-react";
import { PRO_SECTIONS, proTotals } from "@/features/knowledge/pro";
import { chapterStats } from "@/features/knowledge/types";

const ICONS: Record<string, any> = {
  "numerical-physics": Zap,
  "numerical-chemistry": Beaker,
  "biology-diagrams": Dna,
  grammar: BookOpen,
  writing: PenLine,
  byakaran: Languages,
};

const TINTS: Record<string, string> = {
  "numerical-physics": "#3b82f6",
  "numerical-chemistry": "#8b5cf6",
  "biology-diagrams": "#22c55e",
  grammar: "#0ea5e9",
  writing: "#6366f1",
  byakaran: "#f59e0b",
};

export const metadata = {
  title: "Pro Knowledge Pages — Knowledge Hub",
  description:
    "Deep, page-per-topic knowledge for all six Knowledge Hub sections: theory, formula vaults, special cases, tricks and traps.",
};

export default function ProKnowledgeIndex() {
  const totals = proTotals();

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-6 md:py-10">
      <Link
        href="/knowledge"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Knowledge Hub
      </Link>

      <header className="space-y-3">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Pro Knowledge Pages</h1>
        <p className="max-w-3xl text-sm text-muted-foreground">
          Every chapter of every Knowledge Hub section, expanded into five dedicated pages — full
          theory at three levels, a formula vault with symbol meanings and validity, the special cases
          exams actually ask, short tricks for speed, and the classic mistakes that silently cost marks.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {[
            ["Sections", totals.sections],
            ["Chapters", totals.chapters],
            ["Theory blocks", totals.theory],
            ["Formulas", totals.formulas],
            ["Special cases", totals.specialCases],
            ["Tricks", totals.tricks],
            ["Traps", totals.mistakes],
          ].map(([label, n]) => (
            <span
              key={label as string}
              className="rounded-full border border-border/60 bg-card px-3 py-1 text-xs font-medium"
            >
              {label}: <span className="font-bold text-primary">{n as number}</span>
            </span>
          ))}
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {PRO_SECTIONS.map((s) => {
          const Icon = ICONS[s.id] ?? BookOpen;
          const tint = TINTS[s.id] ?? "#3b82f6";
          const sums = s.chapters.reduce(
            (acc, c) => {
              const st = chapterStats(c);
              return {
                theory: acc.theory + st.theory,
                formulas: acc.formulas + st.formulas,
                specialCases: acc.specialCases + st.specialCases,
                tricks: acc.tricks + st.tricks,
                mistakes: acc.mistakes + st.mistakes,
              };
            },
            { theory: 0, formulas: 0, specialCases: 0, tricks: 0, mistakes: 0 },
          );
          return (
            <Link
              key={s.id}
              href={`/knowledge/pro/${s.id}`}
              className="group flex flex-col rounded-2xl border border-border/60 bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${tint}18` }}
                >
                  <Icon className="h-6 w-6" style={{ color: tint }} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="font-bold group-hover:text-primary">{s.title}</h2>
                    <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.subtitle}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5 text-[11px]">
                <span className="rounded-md bg-blue-500/10 px-2 py-0.5 font-medium text-blue-600 dark:text-blue-400">
                  {s.chapters.length} chapters
                </span>
                <span className="rounded-md bg-violet-500/10 px-2 py-0.5 font-medium text-violet-600 dark:text-violet-400">
                  {sums.formulas} formulas
                </span>
                <span className="rounded-md bg-amber-500/10 px-2 py-0.5 font-medium text-amber-600 dark:text-amber-400">
                  {sums.specialCases} cases
                </span>
                <span className="rounded-md bg-green-500/10 px-2 py-0.5 font-medium text-green-600 dark:text-green-400">
                  {sums.tricks} tricks
                </span>
                <span className="rounded-md bg-red-500/10 px-2 py-0.5 font-medium text-red-600 dark:text-red-400">
                  {sums.mistakes} traps
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
