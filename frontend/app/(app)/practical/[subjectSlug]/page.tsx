"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  ChevronDown, ChevronUp, FlaskConical, Target, Beaker,
  ListChecks, ScrollText, BookOpenCheck, ExternalLink,
} from "lucide-react";
import { getPracticalBySlug } from "@/lib/practical-syllabus";
import type { PracticalExperiment } from "@/lib/practical-syllabus";

function ExperimentCard({ experiment }: { experiment: PracticalExperiment }) {
  const [open, setOpen] = useState(false);
  const ToggleIcon = open ? ChevronUp : ChevronDown;

  return (
    <div className="rounded-xl border border-border/70 bg-card overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-muted/40 transition-colors"
      >
        <span className="font-semibold text-foreground text-sm">{experiment.title}</span>
        <span className="flex items-center gap-2 shrink-0">
          {experiment.labHref && (
            <Link
              href={experiment.labHref}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
            >
              Interactive Lab <ExternalLink className="h-3 w-3" />
            </Link>
          )}
          <ToggleIcon className="h-5 w-5 text-muted-foreground" />
        </span>
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-4 border-t border-border/50 pt-4">
          {/* Objective */}
          <Section icon={Target} title="Objective">
            <p className="text-sm text-foreground leading-relaxed">{experiment.objective}</p>
          </Section>

          {/* Materials */}
          <Section icon={Beaker} title="Materials">
            <div className="flex flex-wrap gap-2">
              {experiment.materials.map((m) => (
                <span
                  key={m}
                  className="inline-flex rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                >
                  {m}
                </span>
              ))}
            </div>
          </Section>

          {/* Procedure */}
          <Section icon={ListChecks} title="Procedure">
            <ol className="space-y-1.5">
              {experiment.procedure.map((step, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground leading-relaxed">
                  <span className="shrink-0 mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </Section>

          {/* Result */}
          <Section icon={ScrollText} title="Result">
            <p className="text-sm text-foreground leading-relaxed">{experiment.result}</p>
          </Section>

          {/* Solution */}
          <Section icon={BookOpenCheck} title="Solution / Explanation" accent>
            <p className="text-sm leading-relaxed text-foreground">{experiment.solution}</p>
          </Section>
        </div>
      )}
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  children,
  accent = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={
        accent
          ? "rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3"
          : undefined
      }
    >
      <div className="flex items-center gap-1.5 mb-2">
        <Icon className={`h-4 w-4 ${accent ? "text-emerald-500" : "text-primary"}`} />
        <h4
          className={`text-xs font-semibold uppercase tracking-wider ${
            accent ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"
          }`}
        >
          {title}
        </h4>
      </div>
      {children}
    </div>
  );
}

export default function PracticalSubjectPage({
  params,
}: {
  params: Promise<{ subjectSlug: string }>;
}) {
  const { subjectSlug } = use(params);
  const subject = getPracticalBySlug(subjectSlug);

  if (!subject) {
    return (
      <div className="mx-auto max-w-6xl py-16 px-4 text-center">
        <p className="text-lg font-semibold text-foreground">Practical subject not found.</p>
        <Link href="/practical" className="mt-2 inline-block text-sm text-primary hover:underline">
          ← Back to all practical subjects
        </Link>
      </div>
    );
  }

  const totalExperiments = subject.units.reduce(
    (sum, unit) => sum + unit.experiments.length,
    0
  );

  return (
    <div className="mx-auto max-w-4xl space-y-8 py-8 md:py-14 px-4">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className={`absolute inset-0 bg-gradient-to-br ${subject.colorClass}/5 pointer-events-none`} />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${subject.colorClass} text-2xl shadow-lg`}
          >
            {subject.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              {subject.name}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              {subject.description}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1">
                <FlaskConical className="h-3.5 w-3.5 text-primary" />
                {subject.units.length} units · {totalExperiments} experiments
              </span>
            </div>
          </div>
          <Link
            href="/practical"
            className="shrink-0 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← All practical subjects
          </Link>
        </div>
      </div>

      {/* Units */}
      {subject.units.map((unit, ui) => (
        <div key={unit.id} className="space-y-4">
          <div className="flex items-center gap-2">
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br ${subject.colorClass} text-xs font-bold text-white`}
            >
              {ui + 1}
            </span>
            <h2 className="text-lg font-semibold text-foreground">{unit.title}</h2>
          </div>
          <div className="space-y-3">
            {unit.experiments.map((exp) => (
              <ExperimentCard key={exp.title} experiment={exp} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
