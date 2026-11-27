"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Crown,
  FlaskConical,
  GraduationCap,
  Leaf,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  PLATFORM_DISPLAY_NAME,
  PLATFORM_TAGLINE,
} from "@/lib/core/platform-brand";
import {
  ACCESS_LABELS,
  ACCESS_RANK,
  ACCESS_TAGLINES,
  TIER_HOME_PATHS,
  TIER_SPARKS,
  type AccessLevel,
} from "@/lib/core/access-level";
import { applySectionOverrides } from "@/lib/sections";
import { useSectionTierOverrides } from "@/lib/hooks/use-section-tiers";
import { WelcomeGoButton } from "@/features/auth/components/welcome-go-button";

// NOTE: never import components/home/tier-interfaces here — it composes the
// server-only node:fs rails corpus, and this module is reachable from the
// client entry router. TIER_SPARKS lives in lib/access-level for that reason.

/**
 * THE TIER WELCOME SCREENS — hardcoded, one per rung (owner direction
 * 2026-10-23: "create one welcome pages for each tier then after that home
 * page … after clicking go - home page appears then all study materials").
 *
 * The post-auth flow lands here first: greet the viewer with the plan they
 * were granted, show what it opens, and hand them the Go button to their own
 * tier home. Nothing here is configurable — the copy is the plan.
 *
 * Owner 2026-11-09: "remove ai widget from welcome and make the welcome
 * attractive" — the visitor welcome no longer carries the ask-anything box
 * (VisitorHomeChat stays on the guest HOME at /home), and both welcomes are
 * presented like an entrance: soft light blooms, a gradient hero and cards.
 */

type UserTier = Exclude<AccessLevel, "guest">;

const TIER_HEADLINE: Record<UserTier, string> = {
  member: "Community and study questions are open.",
  plus: "Class 11 + Class 12, exam-ready.",
  pro: "Everything, no caps.",
  owner: "Everything, plus the controls.",
};

const TIER_BLURB: Record<UserTier, string> = {
  member:
    "Post on Community, read bot answers, and track progress. Private Veer Study, Nepali, and Grammar chats open on Plus.",
  plus:
    "Search, the Student Desk, Class 11 notes, formula sheets, practice sets, the notice board, labs, and Veer studio are open, along with Class 12 and past papers.",
  pro:
    "The journal, worked numericals, the CEE track and the board exam suite are open, with every index: derivations, the PDF library, graph banks and the knowledge hubs.",
  owner:
    "Everything is open, with unlimited Veer sparks.",
};

const TIER_CTA: Record<UserTier, string> = {
  member: "Go to my study desk",
  plus: "Go to my Plus home",
  pro: "Go to my Pro home",
  owner: "Go to the Owner console",
};

/** The plan's emblem — one emblem per rung, on the welcome hero tile. */
const TIER_ICONS: Record<UserTier, LucideIcon> = {
  member: Users,
  plus: Zap,
  pro: Crown,
  owner: ShieldCheck,
};

/** Third plan-at-a-glance stat, phrased per rung. */
const TIER_STAT: Record<UserTier, { value: string; label: string }> = {
  member: { value: "24/7", label: "Community answers" },
  plus: { value: "11 + 12", label: "Both classes" },
  pro: { value: "Full", label: "Every index" },
  owner: { value: "Full", label: "Every control" },
};

/** The Go button target — the viewer's own home (guests land on the guest home). */
function homeHrefFor(tier: AccessLevel): string {
  return tier === "guest" ? "/home" : TIER_HOME_PATHS[tier];
}

function TierWelcome({ tier }: { tier: UserTier }) {
  const open = applySectionOverrides(useSectionTierOverrides()).filter(
    (s) => ACCESS_RANK[s.minTier] <= ACCESS_RANK[tier],
  );
  const TierIcon = TIER_ICONS[tier];
  const stat = TIER_STAT[tier];
  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4 py-10">
      {/* Soft light blooms — a welcome should feel like an entrance */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[32rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-violet-500/15 blur-[100px]" />

      <div className="relative w-full max-w-2xl space-y-6 motion-safe:animate-fade-in">
        {/* Hero — emblem tile, plan eyebrow, headline, plan-at-a-glance stats */}
        <div className="relative overflow-hidden rounded-3xl border-2 border-border/80 bg-gradient-to-br from-primary/[0.08] via-card to-card p-6 shadow-lg shadow-primary/5 sm:p-8">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative flex items-start gap-4">
            <span
              aria-hidden="true"
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-lg shadow-primary/25"
            >
              <TierIcon className="h-7 w-7" strokeWidth={1.8} />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                Welcome · {ACCESS_LABELS[tier]} plan
              </p>
              <h1 className="mt-1.5 text-2xl font-extrabold tracking-tight sm:text-3xl">
                {TIER_HEADLINE[tier]}
              </h1>
            </div>
          </div>
          <p className="relative mt-4 text-sm leading-relaxed text-muted-foreground">
            {TIER_BLURB[tier]}
          </p>
          <p className="relative mt-3 text-xs text-muted-foreground">
            {ACCESS_TAGLINES[tier]} · Veer sparks{" "}
            <span className="font-semibold text-foreground">{TIER_SPARKS[tier]}</span>
          </p>

          {/* Plan at a glance — three live stats */}
          <dl className="relative mt-6 grid grid-cols-3 gap-3">
            {[
              { value: String(open.length), label: "Sections open" },
              { value: TIER_SPARKS[tier], label: "Veer sparks" },
              { value: stat.value, label: stat.label },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col-reverse items-center rounded-2xl border border-border/60 bg-background/70 px-2 py-3 text-center"
              >
                <dt className="mt-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {item.label}
                </dt>
                <dd className="text-lg font-extrabold tracking-tight text-foreground">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* What this plan opens */}
        <div className="rounded-2xl border-2 border-border/80 bg-muted/20 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold text-muted-foreground">
              What&apos;s open in your plan
            </p>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold text-primary">
              {open.length} open
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {open.slice(0, 10).map((s) => (
              <span
                key={s.id}
                className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-background px-2.5 py-1 text-[11px] font-medium text-foreground"
              >
                <CheckCircle2 className="h-3 w-3 text-primary" aria-hidden="true" />
                {s.title}
              </span>
            ))}
            {open.length > 10 && (
              <span className="rounded-full px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                +{open.length - 10} more
              </span>
            )}
          </div>
        </div>

        {/* Go → home. Plans live in the footer only (owner 2026-10-25) —
            welcome screens carry zero plans traces. */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={homeHrefFor(tier)}
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition hover:opacity-90"
          >
            {TIER_CTA[tier]}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── The five hardcoded welcome screens ──────────────────────────────────────

/**
 * THE UNIVERSAL VISITOR WELCOME.
 *
 * Flow (owner 2026-11-12): guest → welcome → Go → sign-in / account creation
 * → created-successfully / pending screen. Returning browsers that already
 * created an account keep the same welcome; Go opens the pending page until
 * approval completes. Signed-in viewers never see this page — the tier router
 * replaces them onto their own welcome.
 */
export function UniversalWelcome() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Soft light blooms — the entrance, not a flat white page */}
      <div className="pointer-events-none absolute -top-28 left-1/2 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-violet-500/15 blur-[110px]" />

      <header className="relative border-b border-border/60 bg-background/70 backdrop-blur">
        <div className="mx-auto flex min-h-20 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link
            href="/"
            aria-label={`${PLATFORM_DISPLAY_NAME} home`}
            className="flex items-center gap-3"
          >
            <span
              aria-hidden="true"
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 text-primary-foreground shadow-md shadow-emerald-600/20"
            >
              <Leaf className="h-5 w-5 text-white" />
            </span>
            <span className="text-lg font-bold tracking-tight">{PLATFORM_DISPLAY_NAME}</span>
          </Link>
          {/* Plans live in the footer only (owner 2026-10-25) — the universal
              welcome carries zero plans traces. */}
        </div>
      </header>

      <main className="relative mx-auto flex max-w-6xl flex-col items-center px-4 py-14 sm:px-6">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          Welcome
        </span>

        <h1 className="mt-6 text-center text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-500 bg-clip-text text-transparent">
            {PLATFORM_DISPLAY_NAME}
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-center text-[15px] leading-relaxed text-muted-foreground">
          NEB Class 11 &amp; 12, taught like a beautiful notebook — complete
          notes, 3D labs, rigorous proofs, past papers and Veer, your tutor.
          Press Go to create an account. After you create an account, we review it and open your access as soon as it is ready.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <WelcomeGoButton />
          <Link
            href="/login"
            data-testid="welcome-owner-signin"
            className="inline-flex h-12 items-center rounded-full border-2 border-border/80 px-8 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
          >
            Sign in
          </Link>
        </div>

        {/* ── Proof strip — the platform at a glance ─────────────────────── */}
        <dl className="mt-10 grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { value: "11 & 12", label: "NEB classes" },
            { value: "96+", label: "3D virtual labs" },
            { value: "Veer", label: "AI tutor" },
            { value: "NEB", label: "Official syllabus" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col-reverse items-center rounded-2xl border border-border/60 bg-card/70 px-3 py-4 text-center shadow-sm backdrop-blur-sm"
            >
              <dt className="mt-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {item.label}
              </dt>
              <dd className="text-xl font-extrabold tracking-tight text-foreground">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* ── What lives inside — each card opens its real public page ───── */}
        <div className="mt-6 grid w-full max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: BookOpen,
              tint: "bg-sky-500/10 text-sky-500",
              title: "Complete NEB notes",
              desc: "Class 11 & 12 in official syllabus order.",
              href: "/what-it-has",
            },
            {
              icon: FlaskConical,
              tint: "bg-violet-500/10 text-violet-500",
              title: "96+ 3D virtual labs",
              desc: "Physics, chemistry & biology videos.",
              href: "/features",
            },
            {
              icon: Trophy,
              tint: "bg-emerald-500/10 text-emerald-500",
              title: "Theorems & PYQs",
              desc: "Rigorous proofs and real board questions.",
              href: "/official-sources",
            },
            {
              icon: GraduationCap,
              tint: "bg-amber-500/10 text-amber-500",
              title: "Veer, your tutor",
              desc: "Syllabus-grounded answers, step by step.",
              href: "/how-it-works",
            },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                href={card.href}
                className="group rounded-2xl border border-border/60 bg-card/70 p-5 text-left shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.tint}`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="mt-3 text-sm font-bold">{card.title}</h2>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{card.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                  Explore
                  <ChevronRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </main>

      <footer className="relative border-t border-border/60 bg-background/70 backdrop-blur">
        {/* No plans link here (owner 2026-11-03): the welcome screens carry the
            brand line only, so the first thing a visitor reads is the welcome
            itself, not a price ladder. */}
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span suppressHydrationWarning>
            © {new Date().getFullYear()} {PLATFORM_DISPLAY_NAME} · {PLATFORM_TAGLINE}
          </span>
        </div>
      </footer>
    </div>
  );
}

export function MemberWelcome() {
  return <TierWelcome tier="member" />;
}

export function PlusWelcome() {
  return <TierWelcome tier="plus" />;
}

export function ProWelcome() {
  return <TierWelcome tier="pro" />;
}

export function OwnerWelcome() {
  return <TierWelcome tier="owner" />;
}
