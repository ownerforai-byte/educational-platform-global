"use client";

/**
 * resources-formulas-panel — the "Formulas & Derivations" block shown inside
 * the Resource Vault's subject tabs for Physics, Mathematics and Chemistry.
 *
 * Data arrives from `/api/formula-resources` (server-side fs + derivations
 * bank stay out of this client bundle); the panel renders after the fetch
 * resolves and links every unit sheet and every derivation page, so each
 * formula in the resources tabs is wired to its full NEB-style derivation
 * with solved examples.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, FlaskConical, Sigma } from "lucide-react";

interface UnitSummary {
  id: string;
  title: string;
  formulaCount: number;
  derivationCount: number;
  solvedCount: number;
}

interface SubjectSummary {
  slug: "physics" | "mathematics" | "chemistry";
  name: string;
  emoji: string;
  formulaCount: number;
  derivationCount: number;
  solvedCount: number;
  units: UnitSummary[];
}

const CARD_GRADIENTS: Record<string, string> = {
  physics: "from-sky-500 to-blue-600",
  mathematics: "from-violet-500 to-purple-600",
  chemistry: "from-amber-500 to-orange-600",
};

export function ResourcesFormulasPanel({ subject }: { subject: string }) {
  const [subjects, setSubjects] = useState<SubjectSummary[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch("/api/formula-resources")
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((data: { subjects: SubjectSummary[] }) => {
        if (alive) setSubjects(data.subjects ?? []);
      })
      .catch(() => {
        if (alive) setFailed(true);
      });
    return () => {
      alive = false;
    };
  }, []);

  if (failed) return null;

  const visible = subjects?.filter((s) => subject === "All" || s.name === subject) ?? [];
  if (subjects !== null && visible.length === 0) return null;

  return (
    <section className="space-y-4" aria-label="Formulas and derivations">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2 className="text-lg font-bold tracking-tight text-foreground">
          Formulas &amp; Derivations
        </h2>
        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
          <FlaskConical className="h-3 w-3" />
          every formula wired to its NEB-style derivation &amp; solved examples
        </span>
      </div>

      {subjects === null ? (
        <div className="h-20 animate-pulse rounded-2xl border border-border/60 bg-muted/20" />
      ) : (
        <div className="grid gap-4 lg:grid-cols-3">
          {visible.map((s) => (
            <div
              key={s.slug}
              className="flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm"
            >
              <div
                className={`flex items-center gap-3 bg-gradient-to-r ${CARD_GRADIENTS[s.slug] ?? "from-primary to-primary/70"} px-4 py-3 text-white`}
              >
                <span className="text-xl">{s.emoji}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold leading-tight">{s.name}</p>
                  <p className="text-[11px] text-white/80">
                    {s.formulaCount} formulas · {s.derivationCount} derivations ·{" "}
                    {s.solvedCount} solved examples
                  </p>
                </div>
              </div>
              <div className="flex-1 space-y-1.5 p-3">
                {s.units.map((u) => (
                  <Link
                    key={u.id}
                    href={`/formulas/${s.slug}/${u.id}`}
                    className="group flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs transition-colors hover:bg-muted/60"
                  >
                    <Sigma className="h-3 w-3 shrink-0 text-muted-foreground group-hover:text-primary" />
                    <span className="min-w-0 flex-1 truncate font-medium text-foreground/85 group-hover:text-foreground">
                      {u.title}
                    </span>
                    {u.derivationCount > 0 && (
                      <span className="shrink-0 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700 dark:text-emerald-300">
                        {u.derivationCount} deriv · {u.solvedCount} solved
                      </span>
                    )}
                    <ArrowRight className="h-3 w-3 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
              <div className="flex items-center gap-3 border-t border-border/50 px-3 py-2.5 text-xs">
                <Link
                  href={`/formulas/${s.slug}`}
                  className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                >
                  <Sigma className="h-3.5 w-3.5" />
                  Full formula sheet
                </Link>
                <Link
                  href={`/derivations/class-11/${s.slug}`}
                  className="ml-auto inline-flex items-center gap-1 font-semibold text-emerald-600 hover:underline dark:text-emerald-400"
                >
                  <FlaskConical className="h-3.5 w-3.5" />
                  All derivations
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
