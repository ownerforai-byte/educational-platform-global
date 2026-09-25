"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Ruler,
  BookOpen,
  TrendingUp,
  Sparkles,
  ArrowRight,
  AlertTriangle,
  Sigma,
  Lightbulb,
  Target,
  Waves,
  Gauge,
  GitCompareArrows,
  Globe,
  Star,
} from "lucide-react";
import { MathMarkdown } from "@/components/content/math-markdown";
import { GraphExplorer, SERIES_COLORS } from "@/components/graphs/graph-explorer";
import { getGraphDetail, type GraphEntry } from "@/lib/graphs";

/**
 * Client view for a single graph — the platform convention for content pages
 * (MathMarkdown's KaTeX pipeline bundles in the browser/SSR layer; importing
 * it from a pure server component breaks module resolution).
 */
export function GraphDetailView({
  g,
  prev,
  next,
}: {
  g: GraphEntry;
  prev?: GraphEntry;
  next?: GraphEntry;
}) {
  const detail = getGraphDetail(g);
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 space-y-8">
      <div className="flex items-center justify-between">
        <Link
          href="/graphs"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Graph Bank
        </Link>
        <span className="rounded-full bg-muted px-3 py-1 text-[11px] font-semibold text-muted-foreground">
          {g.classLevel === "both"
            ? "Class 11 & 12"
            : g.classLevel.replace("-", " Class ")}
        </span>
      </div>

      <header className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-wider text-primary">
          {g.subject} · {g.category}
        </p>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
          {g.name}
        </h1>
      </header>

      {/* The graph itself — interactive explorer, all conditions at once */}
      <div className="space-y-3">
        <GraphExplorer g={g} detail={detail} />
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Output:</strong> {g.output}
        </p>
      </div>

      {/* Compare the conditions — differences between the curves */}
      {detail.compare && g.series.length > 1 && (
        <section className="space-y-3 rounded-2xl border border-primary/25 bg-primary/[0.04] p-5">
          <h2 className="flex items-center gap-2 text-sm font-bold text-foreground">
            <GitCompareArrows className="h-4 w-4 text-primary" />
            Compare the conditions — what makes each different
          </h2>
          <div className="space-y-2">
            {detail.compare.series.map((s, i) => (
              <div key={i} className="flex gap-2.5 items-start">
                <span
                  className="inline-block h-3 w-3 rounded-full mt-1 shrink-0"
                  style={{ backgroundColor: SERIES_COLORS[i % SERIES_COLORS.length] }}
                />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">{s.label}:</strong> {s.meaning}
                </p>
              </div>
            ))}
          </div>
          <div className="space-y-1.5 pt-1">
            <p className="text-xs font-bold uppercase tracking-wider text-primary">Key differences</p>
            {detail.compare.differences.map((t, i) => (
              <p key={i} className="text-sm text-muted-foreground flex gap-2 leading-relaxed">
                <span className="text-primary font-bold shrink-0">≠</span>
                <span>{t}</span>
              </p>
            ))}
          </div>
          {detail.compare.identify && detail.compare.identify.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                How to identify each at a glance
              </p>
              {detail.compare.identify.map((t, i) => (
                <p key={i} className="text-sm text-muted-foreground flex gap-2 leading-relaxed">
                  <span className="text-emerald-500 font-bold shrink-0">✓</span>
                  <span>{t}</span>
                </p>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Basis */}
      <section className="space-y-2">
        <h2 className="flex items-center gap-2 text-sm font-bold text-foreground">
          <Ruler className="h-4 w-4 text-primary" />
          Basis — what is plotted and why
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Axes:</strong> x = {g.axes.x}, y ={" "}
          {g.axes.y}. {g.basis}
        </p>
        {g.equation && (
          <div className="rounded-xl border border-border/70 bg-card p-3">
            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-1">
              <Sigma className="h-3.5 w-3.5" />
              Governing equation
            </p>
            <MathMarkdown content={`$$${g.equation}$$`} />
          </div>
        )}
      </section>

      {/* What the graph gives you */}
      <section className="space-y-2.5">
        <h2 className="flex items-center gap-2 text-sm font-bold text-foreground">
          <Lightbulb className="h-4 w-4 text-primary" />
          What this graph gives you
        </h2>
        <ul className="space-y-1.5">
          {detail.gives.map((t, i) => (
            <li key={i} className="text-sm text-muted-foreground flex gap-2 leading-relaxed">
              <span className="text-primary font-bold shrink-0">→</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Meaning */}
      <section className="space-y-2">
        <h2 className="flex items-center gap-2 text-sm font-bold text-foreground">
          <BookOpen className="h-4 w-4 text-primary" />
          Meaning — what the graph tells us
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{g.meaning}</p>
      </section>

      {/* Where it applies */}
      <section className="space-y-2.5">
        <h2 className="flex items-center gap-2 text-sm font-bold text-foreground">
          <Target className="h-4 w-4 text-primary" />
          Where it applies — what it works for
        </h2>
        <ul className="space-y-1.5">
          {detail.applies.map((t, i) => (
            <li key={i} className="text-sm text-muted-foreground flex gap-2 leading-relaxed">
              <span className="text-emerald-500 font-bold shrink-0">✓</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* What happens */}
      <section className="space-y-2.5">
        <h2 className="flex items-center gap-2 text-sm font-bold text-foreground">
          <Waves className="h-4 w-4 text-primary" />
          What happens — the behaviour, step by step
        </h2>
        <ul className="space-y-1.5">
          {detail.happens.map((t, i) => (
            <li key={i} className="text-sm text-muted-foreground flex gap-2 leading-relaxed">
              <span className="text-sky-500 font-bold shrink-0">▸</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* In reality — where this graph shows up in the real world */}
      {detail.reality && detail.reality.length > 0 && (
        <section className="space-y-2.5 rounded-2xl border border-sky-500/25 bg-sky-500/[0.05] p-5">
          <h2 className="flex items-center gap-2 text-sm font-bold text-foreground">
            <Globe className="h-4 w-4 text-sky-500" />
            In reality — where you meet this graph
          </h2>
          <ul className="space-y-1.5">
            {detail.reality.map((t, i) => (
              <li key={i} className="text-sm text-muted-foreground flex gap-2 leading-relaxed">
                <span className="text-sky-500 font-bold shrink-0">◦</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Key facts — memorable conceptual nuggets */}
      {detail.facts && detail.facts.length > 0 && (
        <section className="space-y-2.5 rounded-2xl border border-amber-500/25 bg-amber-500/[0.05] p-5">
          <h2 className="flex items-center gap-2 text-sm font-bold text-foreground">
            <Star className="h-4 w-4 text-amber-500" />
            Key facts — remember these
          </h2>
          <ul className="space-y-1.5">
            {detail.facts.map((t, i) => (
              <li key={i} className="text-sm text-muted-foreground flex gap-2 leading-relaxed">
                <span className="text-amber-500 font-bold shrink-0">★</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* How to read: slope / area / intercept */}
      {g.howToRead &&
        (g.howToRead.slope || g.howToRead.area || g.howToRead.intercept) && (
          <section className="grid gap-3 sm:grid-cols-3">
            {g.howToRead.slope && (
              <div className="rounded-xl border border-border/70 bg-card p-4 space-y-1.5">
                <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                  <TrendingUp className="h-3.5 w-3.5" />
                  Slope gives
                </h3>
                <p className="text-sm text-foreground font-semibold">
                  {g.howToRead.slope}
                </p>
              </div>
            )}
            {g.howToRead.area && (
              <div className="rounded-xl border border-border/70 bg-card p-4 space-y-1.5">
                <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  Area under curve gives
                </h3>
                <p className="text-sm text-foreground font-semibold">
                  {g.howToRead.area}
                </p>
              </div>
            )}
            {g.howToRead.intercept && (
              <div className="rounded-xl border border-border/70 bg-card p-4 space-y-1.5">
                <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                  <Ruler className="h-3.5 w-3.5" />
                  Intercept gives
                </h3>
                <p className="text-sm text-foreground font-semibold">
                  {g.howToRead.intercept}
                </p>
              </div>
            )}
          </section>
        )}

      {/* Special cases */}
      <section className="space-y-3">
        <h2 className="text-sm font-bold text-foreground">
          Special cases &amp; edge conditions
        </h2>
        <div className="space-y-2">
          {g.specialCases.map((sc, i) => (
            <div
              key={i}
              className="rounded-xl border border-amber-500/25 bg-amber-500/[0.06] p-3.5 space-y-1"
            >
              <p className="text-sm font-bold text-foreground">
                <span className="text-amber-600 dark:text-amber-400 font-black mr-1.5">
                  ▸
                </span>
                {sc.name}
              </p>
              <MathMarkdown content={`$${sc.condition}$`} />
              <p className="text-xs text-muted-foreground leading-relaxed">
                {sc.meaning}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Limits */}
      {detail.limits.length > 0 && (
        <section className="space-y-2.5">
          <h2 className="flex items-center gap-2 text-sm font-bold text-foreground">
            <Gauge className="h-4 w-4 text-red-500" />
            Limits — where this graph stops being trustworthy
          </h2>
          <ul className="space-y-1.5">
            {detail.limits.map((t, i) => (
              <li key={i} className="text-sm text-muted-foreground flex gap-2 leading-relaxed">
                <span className="text-red-500 font-bold shrink-0">△</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Exam traps */}
      {g.traps && g.traps.length > 0 && (
        <section className="space-y-2">
          <h2 className="flex items-center gap-2 text-sm font-bold text-foreground">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            Exam traps
          </h2>
          <ul className="space-y-1.5">
            {g.traps.map((t, i) => (
              <li
                key={i}
                className="text-sm text-muted-foreground flex gap-2 leading-relaxed"
              >
                <span className="text-red-500 font-bold shrink-0">✗</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Prev / next */}
      <nav className="flex items-center justify-between gap-3 pt-4 border-t border-border/60">
        {prev ? (
          <Link
            href={`/graphs/${prev.slug}`}
            className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors min-w-0"
          >
            <ArrowLeft className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-x-0.5" />
            <span className="truncate">{prev.name}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/graphs/${next.slug}`}
            className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors min-w-0 text-right"
          >
            <span className="truncate">{next.name}</span>
            <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
