import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Coins,
  Crown,
  Gem,
  Infinity as InfinityIcon,
  Mail,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "PRO Plan — Ravikisan's Platform",
  description:
    "The PRO plan for NEB Class 11 & 12: Veer replies and note credits with no daily cap, and the full credit matrix for every paid action.",
};

/**
 * /pro-plan — the plan section, on its own page.
 *
 * Owner request (2026-09-30): create a PRO PLAN section, never coin-gated, not
 * advertised on the home page, and opened from a link — the link sits under
 * "See your plan and top-up options" on /ai (and on /credits). The plan matrix
 * that used to be printed in the footer lives here now; the footer carries no
 * pricing at all.
 *
 * What this page may NOT do: pretend a checkout exists. There is no payment
 * provider wired into the platform (nothing in the frontend or backend talks to
 * one), so activation is stated honestly — PRO is granted to an account by the
 * owner on request — and the daily pool is left as the self-service path.
 */

/** The one pricing matrix. Coin costs and USD rates as the owner set them. */
const ACTIONS: Array<[label: string, note: string, coins: string, usd: string]> = [
  ["Veer chat reply & quiz generation", "One AI answer or generated quiz", "1 credit", "$0.16"],
  ["Guest pool (signed out)", "Resets at 12:00 AM", "2 free / day", "2 free / day"],
  [
    "Signed-in daily pool",
    "Resets at 12:00 AM · fixed, not top-up-able",
    "4 / day",
    "4 free / day",
  ],
  ["Core syllabus notes & chapters", "20-minute unlock window", "1 coin · 20 min", "$0.32 · 20 min"],
  ["Reference & PYQ sets", "20-minute unlock window", "1 coin · 20 min", "$0.32 · 20 min"],
  ["HD visuals — diagrams & maps", "Graphs, mindmaps, legends", "2 coins", "$0.64"],
  ["3D / AR simulation labs", "Interactive lab simulations", "5 coins", "$1.60"],
];

const PRO_INCLUDES = [
  "Veer replies with no daily cap — ask again in the same minute, not tomorrow",
  "Note credits with no daily ceiling, so a full revision day is not cut short",
  "The same NEB Class 11/12 grounding, the same saved conversations",
  "The daily pool keeps working exactly as it does now for everyone else",
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

      {/* Header */}
      <header className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/[0.08] via-card to-card p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10">
              <Crown className="h-5 w-5 text-amber-500" />
            </span>
            <div>
              <h1 className="text-lg font-bold tracking-tight sm:text-xl">PRO Plan</h1>
              <p className="text-xs text-muted-foreground">
                Veer &amp; note credits without a daily cap. Everything else stays free to read.
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <InfinityIcon className="h-3 w-3" />
            No daily cap
          </span>
        </div>
      </header>

      {/* What PRO changes */}
      <section className="mt-4 rounded-2xl border border-border/70 bg-card p-5">
        <h2 className="flex items-center gap-2 text-sm font-bold text-foreground">
          <Sparkles className="h-4 w-4 text-amber-500" />
          What changes with PRO
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

      {/* The full matrix */}
      <section className="mt-4 rounded-2xl border border-border/70 bg-card p-5">
        <h2 className="flex items-center gap-2 text-sm font-bold text-foreground">
          <Coins className="h-4 w-4 text-amber-500" />
          Every paid action, in coins and in USD
        </h2>
        <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
          Signed in you pay in coin credits; signed out the same actions are priced in USD.
          Reading notes in the free tier never costs anything.
        </p>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-xs">
            <thead>
              <tr className="border-b border-border/70 text-left text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                <th className="py-2 pr-3">Action</th>
                <th className="py-2 pr-3">Signed in (coins)</th>
                <th className="py-2">Signed out (USD)</th>
              </tr>
            </thead>
            <tbody>
              {ACTIONS.map(([label, note, coins, usd]) => (
                <tr key={label} className="border-b border-border/40 last:border-0">
                  <td className="py-2.5 pr-3">
                    <p className="font-semibold text-foreground">{label}</p>
                    <p className="text-[11px] text-muted-foreground">{note}</p>
                  </td>
                  <td className="py-2.5 pr-3 font-extrabold text-foreground whitespace-nowrap">
                    {coins}
                  </td>
                  <td className="py-2.5 font-extrabold text-foreground whitespace-nowrap">{usd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Honest activation */}
      <section className="mt-4 rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/[0.06] via-card to-card p-5">
        <h2 className="flex items-center gap-2 text-sm font-bold text-foreground">
          <Gem className="h-4 w-4 text-primary" />
          Getting PRO
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          The platform has no card checkout wired up yet, so PRO is not something you can buy
          from a button here — and it would be dishonest to show you one. PRO access is granted
          to an account by the owner: write in with the email address you signed up with and it
          is applied to that account.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Link
            href="mailto:ravikisan1814@gmail.com?subject=PRO%20access%20request"
            className="inline-flex h-10 items-center gap-2 rounded-2xl bg-primary px-5 text-sm font-bold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:bg-primary/90"
          >
            <Mail className="h-4 w-4" />
            Request PRO access
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
          Until then the daily pool still works: 4 credits a day signed in, 2 as a guest, refilled
          at 12:00 AM. Nothing on this page is coin-gated.
        </p>
      </section>
    </div>
  );
}
