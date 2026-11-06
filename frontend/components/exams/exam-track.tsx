import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export type ExamTrackStep = {
  title: string;
  body: string;
};

export type ExamTrackResource = {
  label: string;
  description: string;
  href: string;
  meta: string;
};

/**
 * Shared non-lab exam track surface. The three entrance/board routes use the
 * same preparation map so navigation, spacing and reduced-motion behaviour
 * stay consistent without a second page renderer.
 */
export function ExamTrackPage({
  eyebrow,
  title,
  intro,
  steps,
  resources,
  note,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  steps: ExamTrackStep[];
  resources: ExamTrackResource[];
  note: string;
}) {
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8">
      <Link
        href="/exams"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to Exam Hub
      </Link>

      <header className="sequential-block-reveal rounded-3xl border border-border/70 bg-card p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">{intro}</p>
      </header>

      <section
        className="sequential-block-reveal"
        style={{ animationDelay: "90ms" }}
        aria-labelledby="preparation-map"
      >
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 id="preparation-map" className="text-lg font-bold tracking-tight text-foreground">
            Preparation map
          </h2>
          <span className="text-xs text-muted-foreground">{steps.length} steps</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {steps.map((step, index) => (
            <div key={step.title} className="rounded-2xl border border-border/70 bg-card p-5">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                0{index + 1}
              </span>
              <h3 className="mt-3 font-semibold text-foreground">{step.title}</h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        className="sequential-block-reveal"
        style={{ animationDelay: "180ms" }}
        aria-labelledby="start-routes"
      >
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 id="start-routes" className="text-lg font-bold tracking-tight text-foreground">
            Start with these routes
          </h2>
          <span className="text-xs text-muted-foreground">Live study surfaces</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {resources.map((resource) => (
            <Link
              key={`${resource.href}-${resource.label}`}
              href={resource.href}
              className="group flex items-start justify-between gap-4 rounded-2xl border border-border/70 bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                  {resource.meta}
                </span>
                <h3 className="mt-1 font-semibold text-foreground">{resource.label}</h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {resource.description}
                </p>
              </div>
              <ArrowUpRight
                className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </section>

      <p
        className="sequential-block-reveal rounded-2xl border border-dashed border-border/70 bg-muted/20 p-4 text-xs leading-6 text-muted-foreground"
        style={{ animationDelay: "270ms" }}
      >
        {note}
      </p>
    </div>
  );
}
