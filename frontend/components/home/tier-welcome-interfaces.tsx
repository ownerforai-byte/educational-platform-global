import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FlaskConical,
  GraduationCap,
  Sparkles,
  Trophy,
} from "lucide-react";
import {
  ACCESS_LABELS,
  ACCESS_RANK,
  ACCESS_TAGLINES,
  TIER_HOME_PATHS,
  TIER_SPARKS,
  type AccessLevel,
} from "@/lib/access-level";
import { SECTIONS } from "@/lib/sections";
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
  member: "Your three Veer chats are open.",
  plus: "Class 11 + Class 12, exam-ready.",
  pro: "Everything, no caps.",
  owner: "Everything, plus the controls.",
};

const TIER_BLURB: Record<UserTier, string> = {
  member:
    "You have 13 Veer sparks a day, on the Study, Nepali, and Grammar chats. Search, notes, formula sheets, practice sets, and the notice board open at Plus.",
  plus:
    "Search, the Student Desk, Class 11 notes, formula sheets, practice sets, the notice board, labs, and Veer studio are open, along with Class 12 and past papers.",
  pro:
    "The journal, worked numericals, the CEE track and the board exam suite are open, with every index: derivations, the PDF library, graph banks and the knowledge hubs.",
  owner:
    "Operator access: everything Pro has, unlimited Veer sparks, plus the owner console — user tiers, grants, content control and live audit.",
};

const TIER_CTA: Record<UserTier, string> = {
  member: "Go to my study desk",
  plus: "Go to my Plus home",
  pro: "Go to my Pro home",
  owner: "Go to the Owner console",
};

/** The Go button target — the viewer's own home (guests land on the guest home). */
function homeHrefFor(tier: AccessLevel): string {
  return tier === "guest" ? "/home" : TIER_HOME_PATHS[tier];
}

function TierWelcome({ tier }: { tier: UserTier }) {
  const open = SECTIONS.filter((s) => ACCESS_RANK[s.minTier] <= ACCESS_RANK[tier]);
  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4 py-10">
      {/* Soft light blooms — a welcome should feel like an entrance */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[32rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-violet-500/15 blur-[100px]" />

      <div className="relative w-full max-w-2xl space-y-6">
        {/* Hero */}
        <div className="rounded-3xl border-2 border-border/80 bg-gradient-to-br from-primary/[0.08] via-card to-card p-6 shadow-lg shadow-primary/5 sm:p-8">
          <p className="text-[11px] font-bold uppercase tracking-widest text-primary">
            Welcome · {ACCESS_LABELS[tier]} plan
          </p>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
            {TIER_HEADLINE[tier]}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {TIER_BLURB[tier]}
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            {ACCESS_TAGLINES[tier]} · Veer sparks{" "}
            <span className="font-semibold text-foreground">{TIER_SPARKS[tier]}</span>
          </p>
        </div>

        {/* What this plan opens */}
        <div className="rounded-2xl border-2 border-border/80 bg-muted/20 p-4">
          <p className="text-xs font-semibold text-muted-foreground">
            What&apos;s open at your rung
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
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
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition hover:opacity-90"
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
 * the owner approves. Signed-in viewers never see this page — the tier router
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
          <Link href="/" aria-label="Ravikisan's Platform home" className="flex items-center gap-3">
            <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-lg font-extrabold text-primary-foreground shadow-md shadow-primary/20">R</span>
            <span className="text-lg font-bold tracking-tight">Ravikisan&apos;s Platform</span>
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
          <span className="bg-gradient-to-r from-primary via-violet-500 to-emerald-400 bg-clip-text text-transparent">
            Ravikisan&apos;s Platform
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-center text-[15px] leading-relaxed text-muted-foreground">
          NEB Class 11 &amp; 12, taught like a beautiful notebook — complete
          notes, 3D labs, rigorous proofs, past papers and Veer, your tutor.
          Press Go to create an account and wait for approval. Owner Gmail
          signs in directly — no waiting queue.
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

        {/* ── What lives inside — display-only cards (no server-only imports) ── */}
        <div className="mt-14 grid w-full max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: BookOpen,
              tint: "bg-sky-500/10 text-sky-500",
              title: "Complete NEB notes",
              desc: "Class 11 & 12 in official syllabus order.",
            },
            {
              icon: FlaskConical,
              tint: "bg-violet-500/10 text-violet-500",
              title: "96+ 3D virtual labs",
              desc: "Physics, chemistry & biology simulations.",
            },
            {
              icon: Trophy,
              tint: "bg-emerald-500/10 text-emerald-500",
              title: "Theorems & PYQs",
              desc: "Rigorous proofs and real board questions.",
            },
            {
              icon: GraduationCap,
              tint: "bg-amber-500/10 text-amber-500",
              title: "Veer, your tutor",
              desc: "Syllabus-grounded answers, step by step.",
            },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="rounded-2xl border border-border/60 bg-card/70 p-5 text-left shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.tint}`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="mt-3 text-sm font-bold">{card.title}</h2>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{card.desc}</p>
              </article>
            );
          })}
        </div>
      </main>

      <footer className="relative border-t border-border/60 bg-background/70 backdrop-blur">
        {/* No plans link here (owner 2026-11-03): the welcome screens carry the
            brand line only, so the first thing a visitor reads is the welcome
            itself, not a price ladder. */}
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span suppressHydrationWarning>© {new Date().getFullYear()} Ravikisan&apos;s Platform · NEB Class 11 &amp; 12</span>
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
