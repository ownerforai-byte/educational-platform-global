"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  DERIVATIONS_AND_THEOREMS,
  type DerivationOrTheorem,
} from "@/lib/derivations-data";
import { DerivationVisual } from "@/components/derivations/derivation-visual";
import { ScienceBankColumns } from "@/components/derivations/science-bank-columns";
import { MathMarkdown } from "@/components/content/math-markdown";
import {
  Sparkles,
  Layers,
  GraduationCap,
  Search,
  ChevronDown,
  BookOpen,
  Atom,
  FlaskConical,
  Dna,
  Sigma,
  ArrowRight,
  X,
} from "lucide-react";

const SUBJECT_META: Record<
  DerivationOrTheorem["subject"],
  { label: string; icon: React.ComponentType<{ className?: string }>; accent: string }
> = {
  mathematics: { label: "Mathematics", icon: Sigma, accent: "text-violet-600 dark:text-violet-400" },
  physics: { label: "Physics", icon: Atom, accent: "text-sky-600 dark:text-sky-400" },
  chemistry: { label: "Chemistry", icon: FlaskConical, accent: "text-amber-600 dark:text-amber-400" },
  biology: { label: "Biology", icon: Dna, accent: "text-emerald-600 dark:text-emerald-400" },
};

type ViewMode = "gallery" | "bank" | "detail";

function derivationHref(d: DerivationOrTheorem): string {
  const classSlug = d.gradeTrack === "grade-11" ? "class-11-notes" : "class-12-notes";
  return `/derivations/${classSlug}/${d.subject}/${d.slug}`;
}

/** Best-of selection: keep the strongest visuals across math, physics and chemistry. */
const BEST_IDS = new Set([
  // Math: analytic geometry + calculus foundations + algebra
  "math-perpendicular-distance",
  "math-angle-pair-of-lines",
  "math-limit-sin-theta",
  "math-trapezoidal-rule",
  "math-am-gm-hm",
  "math-lmvt-rolle",
  "math-ftc-calculus",
  "math-demoivre-roots",
  "math-conic-parabola",
  "math-bayes-theorem",
  // Physics: kinematics, circular motion, fluids, optics, kinetic theory
  "phys-projectile-motion",
  "phys-banking-of-roads",
  "phys-bernoulli-fluid",
  "phys-lens-makers",
  "phys-kinetic-gas-pressure",
  "phys-shm-graphs",
  "phys-isothermal-adiabatic",
  "phys-isobaric-isochoric",
  // Chemistry: atomic model + representative graphs/mechanisms
  "chem-bohr-hydrogen-atom",
]);

const BEST_ORDERED_IDS: string[] = [
  "math-perpendicular-distance",
  "math-limit-sin-theta",
  "math-angle-pair-of-lines",
  "math-am-gm-hm",
  "math-ftc-calculus",
  "math-trapezoidal-rule",
  "math-demoivre-roots",
  "math-conic-parabola",
  "math-bayes-theorem",
  "phys-projectile-motion",
  "phys-banking-of-roads",
  "phys-bernoulli-fluid",
  "phys-lens-makers",
  "phys-kinetic-gas-pressure",
  "phys-shm-graphs",
  "phys-isothermal-adiabatic",
  "phys-isobaric-isochoric",
  "chem-bohr-hydrogen-atom",
];

function bestBank(): DerivationOrTheorem[] {
  const byId = new Map(DERIVATIONS_AND_THEOREMS.map((d) => [d.id, d]));
  return BEST_ORDERED_IDS
    .map((id) => byId.get(id))
    .filter((d): d is DerivationOrTheorem => d !== undefined);
}

export default function ScienceGraphBankPage() {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<ViewMode>("gallery");

  // Deep fallback: every selected best-of derivation renders its four working columns.
  const fallbackBank = useMemo(() => {
    return DERIVATIONS_AND_THEOREMS.filter((d) => BEST_IDS.has(d.id));
  }, []);

  // The gallery/filtered set: best-of visuals in curated presentation order
  // (bestBank), falling back to the unfiltered best-id set if the ordered list
  // is empty. This is the `bank` every view below filters and groups.
  const bank = useMemo(() => {
    const ordered = bestBank();
    return ordered.length > 0 ? ordered : fallbackBank;
  }, [fallbackBank]);

  const q = query.trim().toLowerCase();
  const filtered = useMemo(() => {
    if (!q) return bank;
    return bank.filter((d) =>
      d.title.toLowerCase().includes(q) ||
      d.coreFormula.toLowerCase().includes(q) ||
      d.unit.toLowerCase().includes(q) ||
      d.subject.toLowerCase().includes(q),
    );
  }, [bank, q]);

  const bySubject = useMemo(() => {
    const map = new Map<DerivationOrTheorem["subject"], DerivationOrTheorem[]>();
    for (const d of bank) {
      const list = map.get(d.subject) ?? [];
      list.push(d);
      map.set(d.subject, list);
    }
    return map;
  }, [bank]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12 space-y-10">
      {/* ── Header ── */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20 px-3 py-1">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Best visuals · their workings · oriented columns</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
              Science Graph Bank — Derivations &amp; Proofs
            </h1>
            <p className="mt-2 text-sm text-muted-foreground max-w-2xl leading-relaxed">
              The strongest interactive visuals from the derivations and proofs library, each shown with the relationship it represents and four oriented working columns beside it:
              what the visual gives, where it applies, what happens as you move through the conditions, and where the model stops being trustworthy.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0">
            <span className="font-semibold text-foreground">Linked to:</span>
            <Link href="/derivations" className="text-foreground hover:text-primary underline font-medium">Derivations</Link>
            <span className="mx-1">·</span>
            <Link href="/theorems" className="text-foreground hover:text-primary underline font-medium">Theorems</Link>
            <span className="mx-1">·</span>
            <Link href="/graphs" className="text-foreground hover:text-primary underline font-medium">Graphs</Link>
          </div>
        </div>

        {/* ── Quick filter + view toggle ── */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px] max-w-[360px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter by title, formula, unit or subject…"
              className="w-full h-10 pl-9 pr-8 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1 rounded-xl border border-border/80 bg-background/80 p-1 shadow-sm">
            {(["gallery", "bank", "detail"] as ViewMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  mode === m
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {m === "gallery" ? "Gallery" : m === "bank" ? "By subject" : "Detail"}
              </button>
            ))}
          </div>

          <div className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">{bank.length}</span> best visuals
          </div>
        </div>
      </div>

      {/* ── Gallery mode ── */}
      {mode === "gallery" && (
        <div className="space-y-6">
          {filtered.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border p-10 text-center space-y-2">
              <BookOpen className="h-8 w-8 text-muted-foreground mx-auto" />
              <p className="text-sm font-semibold text-foreground">No best-of visuals match that filter.</p>
              <p className="text-xs text-muted-foreground">Try clearing the search or switching to the By subject view.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {filtered.map((d) => {
                const meta = SUBJECT_META[d.subject];
                const Icon = meta.icon;
                return (
                  <article
                    key={d.id}
                    className="group rounded-3xl border border-border/80 bg-card p-5 shadow-sm hover:border-primary/40 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${meta.accent.split(" ")[0]} ${meta.accent.split(" ").slice(1).join(" ")}`}>
                          {meta.label}
                        </span>
                        <span className="text-[11px] text-muted-foreground font-medium">{d.unit} · {d.nebCode}</span>
                      </div>
                      <Link
                        href={derivationHref(d)}
                        className="text-[11px] font-semibold text-primary hover:underline inline-flex items-center gap-1"
                      >
                        Full derivation <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>

                    <h2 className="mt-3 text-lg font-extrabold text-foreground group-hover:text-primary transition-colors">
                      {d.title}
                    </h2>

                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{d.statement}</p>

                    {/* Core formula strip */}
                    {d.coreFormula && (
                      <div className="mt-3 rounded-xl bg-muted/30 border border-border/50 p-3 text-center">
                        <MathMarkdown content={`$$${d.coreFormula}$$`} />
                      </div>
                    )}

                    {/* Visual + working columns side by side */}
                    <div className="mt-5 grid gap-5 lg:grid-cols-2">
                      <div className="rounded-2xl border border-border/60 bg-muted/20 p-2 overflow-hidden">
                        <DerivationVisual visualType={d.visualType} title={d.title} />
                      </div>
                      <ScienceBankColumns derivation={d} />
                    </div>

                    {/* Footer row */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted-foreground border-t border-border/40 pt-3">
                      <span className="font-semibold flex items-center gap-1">
                        <Layers className="h-3 w-3" />
                        {d.proofSteps.length} steps · {d.solvedProblems.length} solved · {d.specialCases?.length ?? 0} special cases
                      </span>
                      <span className="text-foreground/70">
                        {d.gradeTrack === "grade-11" ? "Class 11" : "Class 12"}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── By-subject mode ── */}
      {mode === "bank" && (
        <div className="space-y-8">
          {(["mathematics", "physics", "chemistry", "biology"] as const).map((subject) => {
            const meta = SUBJECT_META[subject];
            const Icon = meta.icon;
            const list = bySubject.get(subject) ?? [];
            const subjectFallback = fallbackBank
              .filter((d) => d.subject === subject)
              .sort((a, b) => BEST_ORDERED_IDS.indexOf(a.id) - BEST_ORDERED_IDS.indexOf(b.id));
            const present = list.length ? list : subjectFallback;
            const shown = present.filter(
              (d) => !q || d.title.toLowerCase().includes(q) || d.coreFormula.toLowerCase().includes(q),
            );

            if (shown.length === 0 && !q) return null;

            return (
              <section key={subject} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-xl border ${meta.accent.split(" ")[0]} ${meta.accent.split(" ").slice(1).join(" ")}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-foreground">{meta.label} — Best Visuals</h2>
                      <p className="text-xs text-muted-foreground">{present.length} curated visuals in this subject</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-muted text-muted-foreground border border-border/40">
                    {shown.length} shown
                  </span>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  {shown.map((d) => {
                    const m = SUBJECT_META[d.subject];
                    const Ic = m.icon;
                    return (
                      <article
                        key={d.id}
                        className="group rounded-2xl border border-border/80 bg-card p-4 shadow-sm hover:border-primary/40 transition-all"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <Ic className={`h-4 w-4 shrink-0 ${m.accent}`} />
                            <div className="min-w-0">
                              <Link
                                href={derivationHref(d)}
                                className="block text-sm font-extrabold text-foreground group-hover:text-primary transition-colors truncate"
                              >
                                {d.title}
                              </Link>
                              <span className="text-[11px] text-muted-foreground">{d.unit} · {d.nebCode}</span>
                            </div>
                          </div>
                          <Link
                            href={derivationHref(d)}
                            className="shrink-0 text-[11px] font-semibold text-primary hover:underline inline-flex items-center gap-1"
                          >
                            Open <ArrowRight className="h-3 w-3" />
                          </Link>
                        </div>

                        {d.coreFormula && (
                          <div className="mt-2 rounded-lg bg-muted/30 border border-border/50 p-2 text-center text-xs font-mono">
                            <MathMarkdown content={`$$${d.coreFormula}$$`} />
                          </div>
                        )}

                        <div className="mt-3 grid grid-cols-2 gap-3">
                          <div className="rounded-xl border border-border/50 bg-muted/20 p-2 overflow-hidden">
                            <DerivationVisual visualType={d.visualType} title={d.title} className="h-auto max-h-[180px]" />
                          </div>
                          <ScienceBankColumns derivation={d} />
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {/* ── Detail mode ── */}
      {mode === "detail" && (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-primary" />
            <h2 className="text-xl font-black text-foreground">Best visual reference sheet — the relationship, visualised first</h2>
          </div>

          <p className="text-sm text-muted-foreground max-w-3xl leading-relaxed">
            One best-of visual per row, with the core relationship and the four working columns that tell you what it gives, where it applies, how it behaves as conditions change, and where it breaks.
            Open the full derivation at the end of each row.
          </p>

          <div className="divide-y divide-border/60">
            {filtered.map((d) => {
              const meta = SUBJECT_META[d.subject];
              const Icon = meta.icon;
              return (
                <div key={d.id} className="group rounded-3xl border border-border/70 bg-card p-4 sm:p-5 hover:border-primary/40 transition-all">
                  <div className="flex flex-wrap items-start gap-4">
                    <div className="flex items-center gap-2 shrink-0">
                      <Icon className={`h-5 w-5 ${meta.accent}`} />
                      <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${meta.accent.split(" ")[0]} ${meta.accent.split(" ").slice(1).join(" ")}`}>
                        {meta.label}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <h3 className="text-base font-extrabold text-foreground group-hover:text-primary transition-colors">
                          {d.title}
                        </h3>
                        <Link
                          href={derivationHref(d)}
                          className="text-[11px] font-semibold text-primary hover:underline inline-flex items-center gap-1 shrink-0"
                        >
                          Full derivation <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed">{d.statement}</p>

                      {d.coreFormula && (
                        <div className="rounded-xl border border-primary/30 bg-primary/5 p-3">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1">Core relationship</div>
                          <MathMarkdown content={`$$${d.coreFormula}$$`} />
                        </div>
                      )}

                      <div className="grid gap-4 lg:grid-cols-2">
                        <div className="rounded-2xl border border-border/60 bg-muted/20 p-2 overflow-hidden">
                          <DerivationVisual visualType={d.visualType} title={d.title} />
                        </div>
                        <ScienceBankColumns derivation={d} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Footer cross-links ── */}
      <div className="rounded-3xl border border-border/70 bg-gradient-to-br from-card via-card to-muted/30 p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <p className="font-bold text-sm text-foreground">Still want the full step-by-step proof?</p>
            <p className="text-xs text-muted-foreground">Each visual here links to its derivation page, where the numbered steps, solved problems and special cases live.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/derivations" className="rounded-xl border border-border/60 bg-card px-3 py-1.5 text-xs font-semibold text-foreground hover:border-primary/40 hover:bg-primary/10">
            Derivations Vault
          </Link>
          <Link href="/theorems" className="rounded-xl border border-border/60 bg-card px-3 py-1.5 text-xs font-semibold text-foreground hover:border-primary/40 hover:bg-primary/10">
            Theorems Vault
          </Link>
          <Link href="/graphs" className="rounded-xl border border-border/60 bg-card px-3 py-1.5 text-xs font-semibold text-foreground hover:border-primary/40 hover:bg-primary/10">
            Science Graphs
          </Link>
        </div>
      </div>
    </div>
  );
}
