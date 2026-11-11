import Link from "next/link";
import {
  FlaskConical,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ListOrdered,
  Lightbulb,
  Wrench,
  Target,
  CheckCircle2,
  Network,
} from "lucide-react";
import { getLab, listLabs, type LabEntry } from "@/lib/lab-catalog";

/** Build a full /lab/ href from an entry's route. */
const hrefOf = (e: LabEntry) => `/lab/${e.route}`;

/**
 * Shared renderer for /lab/ pages. Pass the catalog entry for THIS page.
 *
 * Hierarchy handled:
 *   - hub        → lists its units (or sub-labs) as cards
 *   - unit (3L)  → lists its concepts as cards
 *   - unit (2L)  or concept → leaf page with the full content sections
 *
 * Every page also gets: a Theory/Practical badge, "what it's for" blocks,
 * back-to-parent navigation, sibling chips, and related links.
 */
export function LabPageBody({ entry }: { entry: LabEntry }) {
  const isTheory = entry.type === "theory";
  const Accent = isTheory ? "text-violet-500" : "text-blue-500";

  const children = listLabs(entry.id); // units under a hub, or concepts under a unit
  const parent = entry.parent ? getLab(entry.parent) : undefined;
  const siblings =
    entry.parent && entry.level !== "concept" ? [] : entry.parent ? listLabs(entry.parent) : [];

  const badge = isTheory
    ? { label: "Theory Lab", cls: "bg-violet-500/10 text-violet-500 ring-violet-500/30", Icon: Network }
    : { label: "Practical Lab", cls: "bg-blue-500/10 text-blue-500 ring-blue-500/30", Icon: FlaskConical };
  const HeaderIcon = isTheory ? Network : FlaskConical;

  return (
    <div className="mx-auto max-w-6xl space-y-8 py-8 md:py-14 px-4">
      {/* Back to parent / home */}
      <div className="flex items-center gap-4">
        {parent ? (
          <Link
            href={hrefOf(parent)}
            className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {parent.title}
          </Link>
        ) : (
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>
        )}
      </div>

      {/* Header card */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent-cyan/5 pointer-events-none" />
        <div className="relative">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${badge.cls}`}>
              <badge.Icon className="h-3.5 w-3.5" />
              {badge.label}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
              <BookOpen className="h-3.5 w-3.5" />
              {entry.subject} · NEB (+2)
            </span>
          </div>
          <h1 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <HeaderIcon className={`h-6 w-6 ${Accent}`} />
            {entry.title}
          </h1>
          <p className="mt-3 text-base text-foreground">{entry.tagline}</p>
        </div>
      </div>

      {/* What it is for */}
      <Section icon={<Target className="h-4 w-4" />} title="What this lab is for">
        <p className="text-sm text-muted-foreground leading-relaxed">{entry.purpose}</p>
      </Section>

      {/* Concepts */}
      {entry.concepts && entry.concepts.length > 0 && (
        <Section icon={<Lightbulb className="h-4 w-4" />} title="Key concepts">
          <div className="grid gap-2 sm:grid-cols-2">
            {entry.concepts.map((c) => (
              <div key={c} className="flex items-start gap-2 rounded-lg border border-border/50 bg-card p-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-foreground">{c}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Theory: observations */}
      {entry.observations && entry.observations.length > 0 && (
        <Section icon={<Network className="h-4 w-4" />} title="Things to observe / explore">
          <ul className="space-y-2">
            {entry.observations.map((o) => (
              <li key={o} className="flex items-start gap-2 text-sm text-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-400 shrink-0" />
                {o}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Practical: apparatus + procedure + result */}
      {entry.apparatus && entry.apparatus.length > 0 && (
        <Section icon={<Wrench className="h-4 w-4" />} title="Apparatus">
          <ul className="space-y-1.5">
            {entry.apparatus.map((a) => (
              <li key={a} className="flex items-start gap-2 text-sm text-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
                {a}
              </li>
            ))}
          </ul>
        </Section>
      )}
      {entry.procedure && entry.procedure.length > 0 && (
        <Section icon={<ListOrdered className="h-4 w-4" />} title="Procedure">
          <ol className="space-y-2">
            {entry.procedure.map((step, i) => (
              <li key={step} className="flex items-start gap-3 text-sm text-foreground">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-xs font-bold text-blue-500">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </Section>
      )}
      {entry.result && (
        <Section icon={<CheckCircle2 className="h-4 w-4" />} title="Result">
          <p className="text-sm text-foreground rounded-lg border border-border/50 bg-card p-3">{entry.result}</p>
        </Section>
      )}

      {/* Children (units under a hub, or concepts under a unit) */}
      {children.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-foreground">
            {entry.level === "hub" ? "Units in this hub" : "Experiments in this unit"}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {children.map((child) => {
              const cTheory = child.type === "theory";
              return (
                <Link
                  key={child.id}
                  href={hrefOf(child)}
                  className="group flex flex-col rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        cTheory ? "bg-violet-500/10 text-violet-500" : "bg-blue-500/10 text-blue-500"
                      }`}
                    >
                      {cTheory ? "Theory" : "Practical"}
                    </span>
                  </div>
                  <h3 className="mt-3 font-bold text-foreground group-hover:text-primary transition-colors">
                    {child.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {child.tagline}
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-primary">
                    Open <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Siblings (leaf sub-labs & concepts only) */}
      {siblings.length > 1 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground">Other labs in this {entry.level === "concept" ? "unit" : "hub"}</h2>
          <div className="flex flex-wrap gap-2">
            {siblings
              .filter((s) => s.id !== entry.id)
              .map((s) => (
                <Link
                  key={s.id}
                  href={hrefOf(s)}
                  className="rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:border-primary/40 hover:text-primary transition-colors"
                >
                  {s.title}
                </Link>
              ))}
          </div>
        </div>
      )}

      {/* Related links */}
      {entry.related && entry.related.length > 0 && (
        <div className="rounded-2xl border border-border/60 bg-card p-5">
          <h2 className="text-sm font-semibold text-muted-foreground">Go further</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {entry.related.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
              >
                {r.label} <ArrowRight className="h-3 w-3" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="flex items-center gap-2 text-base font-bold text-foreground">
        <span className="text-primary">{icon}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}
