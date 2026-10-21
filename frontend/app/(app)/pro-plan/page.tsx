import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Coins,
  Compass,
  Crown,
  Gem,
  Mail,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "PRO Plan — Ravikisan's Platform",
  description:
    "PRO — $20 for 20 days. Unlimited Veer sparks and content sparks with no daily cap. Veer sparks and content sparks are two different currencies. A simple overview for visitors — and PRO opens everything.",
};

/**
 * /pro-plan — the plan section, on its own page.
 *
 * Owner request (2026-10-17): "rewrite the pro plan with a best price, nothing
 * free, saying veer sparks and content sparks are different, 20$/20day".
 * So this page now carries:
 *   · one flat price — $20 for a 20-day window (the "best price"),
 *   · a "simple overview for visitors" line (owner request 2026-10-17:
 *     replace "nothing is free" with "a simple overview for visitors"),
 *   · a clear split between VEER SPARKS (the AI currency) and CONTENT SPARKS
 *     (the library currency) — two SEPARATE pools that never touch.
 *
 * There is still no card checkout wired into the platform, so activation stays
 * honest — PRO is granted by the owner on request — and the price is stated up
 * front instead of hidden behind a button that would not work.
 */

/** The two spark currencies — deliberately kept as two separate pools. */
const SPARKS = [
  {
    name: "Veer sparks",
    icon: "✨",
    powers: "Veer — the AI tutor",
    covers: "AI chat replies and generated quizzes",
    detail: "The daily AI allowance. Refilled at 12:00 AM.",
  },
  {
    name: "Content sparks",
    icon: "📚",
    powers: "The note & PYQ library",
    covers: "Actual note / content unlocks (20-minute windows)",
    detail: "Spent on real notes and question sets, not on AI.",
  },
];

const PRO_INCLUDES = [
  "Unlimited Veer sparks for the full 20-day window — no daily AI cap",
  "Unlimited content sparks — open every note and PYQ set without running dry",
  "Veer sparks and content sparks stay separate — spending one never touches the other",
  "PRO opens everything — where a visitor gets a simple overview, you get it all",
];

export default function ProPlanPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:py-8">
      {/* Breadcrumb */}
      <div className="mb-3 flex items-center gap-3">
        <Link
          href="/ai"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          AI Studio
        </Link>
        <span className="text-muted-foreground/40">/</span>
        <span className="text-xs font-semibold text-foreground">PRO Plan</span>
      </div>

      {/* Header + the one price */}
      <header className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/[0.08] via-card to-card p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10">
              <Crown className="h-5 w-5 text-amber-500" />
            </span>
            <div>
              <h1 className="text-lg font-bold tracking-tight sm:text-xl">PRO Plan</h1>
              <p className="text-xs text-muted-foreground">
                A simple overview for visitors — two spark currencies, and PRO opens all.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-1 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Best price
            </span>
            <span className="text-xl font-extrabold tracking-tight text-foreground">
              $20 <span className="text-sm font-bold text-muted-foreground">/ 20 days</span>
            </span>
          </div>
        </div>
      </header>

      {/* A simple overview for visitors — the honest headline */}
      <section className="mt-4 rounded-2xl border border-primary/25 bg-primary/[0.05] p-5">
        <h2 className="flex items-center gap-2 text-sm font-bold text-foreground">
          <Compass className="h-4 w-4 text-primary" />
          A simple overview for visitors
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          This platform is one place for NEB Class 11 &amp; 12 notes, 3D labs,
          derivations, PYQs and Veer — the full study toolkit. Daily use is metered
          by the two spark pools below. This page is a simple overview for visitors;
          PRO opens everything and lifts the daily caps so a full revision day is
          never cut short.
        </p>
      </section>

      {/* Veer sparks vs content sparks — two different things */}
      <section className="mt-4 rounded-2xl border border-border/70 bg-card p-5">
        <h2 className="flex items-center gap-2 text-sm font-bold text-foreground">
          <Coins className="h-4 w-4 text-amber-500" />
          Veer sparks and content sparks are different
        </h2>
        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
          They sound alike but they are two separate currencies with two separate pools.
          Spending one never spends the other.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {SPARKS.map((s) => (
            <div
              key={s.name}
              className="rounded-2xl border border-border/70 bg-muted/20 p-4"
            >
              <p className="flex items-center gap-2 text-sm font-extrabold text-foreground">
                <span aria-hidden="true" className="shrink-0">{s.icon}</span>
                {s.name}
              </p>
              <dl className="mt-2 space-y-1.5 text-xs">
                <div>
                  <dt className="inline font-semibold text-foreground">Powers: </dt>
                  <dd className="inline text-muted-foreground">{s.powers}</dd>
                </div>
                <div>
                  <dt className="inline font-semibold text-foreground">Covers: </dt>
                  <dd className="inline text-muted-foreground">{s.covers}</dd>
                </div>
                <div>
                  <dt className="inline font-semibold text-foreground">Pool: </dt>
                  <dd className="inline text-muted-foreground">{s.detail}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </section>

      {/* What PRO includes */}
      <section className="mt-4 rounded-2xl border border-border/70 bg-card p-5">
        <h2 className="flex items-center gap-2 text-sm font-bold text-foreground">
          <Sparkles className="h-4 w-4 text-amber-500" />
          What PRO includes — $20 / 20 days
        </h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {PRO_INCLUDES.map((line) => (
            <li key={line} className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Getting PRO — the honest activation, with the price */}
      <section className="mt-4 rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/[0.06] via-card to-card p-5">
        <h2 className="flex items-center gap-2 text-sm font-bold text-foreground">
          <Gem className="h-4 w-4 text-primary" />
          Getting PRO — $20 / 20 days
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          PRO costs <strong className="text-foreground">$20 for a 20-day window</strong>. There
          is no card checkout wired up yet, so it is not something you can buy from a button
          here — and it would be dishonest to show you one. PRO is granted to an account by
          the owner: write in with the email address you signed up with, send $20, and it is
          applied to that account for 20 days.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Link
            href="mailto:ravikisan1814@gmail.com?subject=PRO%20access%20request%20%28%2420%20%2F%2020%20days%29"
            className="inline-flex h-10 items-center gap-2 rounded-2xl bg-primary px-5 text-sm font-bold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:bg-primary/90"
          >
            <Mail className="h-4 w-4" />
            Request PRO — $20 / 20 days
          </Link>
          <Link
            href="/credits"
            className="inline-flex h-10 items-center gap-2 rounded-2xl border border-border/80 bg-card px-5 text-sm font-bold text-foreground transition-colors hover:bg-muted/40"
          >
            See your plan and top-up options
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
          Until PRO is applied, both spark pools still run on their daily allowances and reset
          at 12:00 AM.
        </p>
      </section>
    </div>
  );
}
