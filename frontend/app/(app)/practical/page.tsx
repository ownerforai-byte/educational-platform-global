import Link from "next/link";
import { FlaskConical, ArrowRight, CheckCircle2 } from "lucide-react";
import { getPracticalSubjects } from "@/lib/practical-syllabus";

export default function PracticalLandingPage() {
  const subjects = getPracticalSubjects();

  return (
    <div className="mx-auto max-w-6xl space-y-8 py-8 md:py-14 px-4">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent-cyan/5 pointer-events-none" />
        <div className="relative">
          <div className="flex items-center gap-2">
            <FlaskConical className="h-5 w-5 text-primary" />
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Practical Syllabus</h1>
          </div>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
            Hands-on lab syllabus for NEB Class 11 &amp; 12. Each subject lists its practical
            units and experiments with objectives, materials, procedures, results and
            step-by-step solutions. Choose a subject to begin.
          </p>
        </div>
      </div>

      {/* Subject cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {subjects.map((subject) => {
          const totalExperiments = subject.units.reduce(
            (sum, unit) => sum + unit.experiments.length,
            0
          );
          return (
            <Link
              key={subject.slug}
              href={`/practical/${subject.slug}`}
              className="group flex flex-col rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${subject.colorClass} text-2xl shadow-lg`}
              >
                {subject.emoji}
              </div>
              <h2 className="mt-4 text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                {subject.name}
              </h2>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed line-clamp-3">
                {subject.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-muted-foreground">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                  {subject.units.length} units
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-muted-foreground">
                  {totalExperiments} experiments
                </span>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary">
                Open {subject.name.split(" ")[0]} practical <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
