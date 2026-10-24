import Link from "next/link";
import {
  ACCESS_LABELS,
  ACCESS_RANK,
  ACCESS_TAGLINES,
  TIER_HOME_PATHS,
  TIER_SPARKS,
  type AccessLevel,
} from "@/lib/access-level";
import { SECTIONS } from "@/lib/sections";
import { HomePublic } from "@/components/home/home-public";

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
 */

type UserTier = Exclude<AccessLevel, "visitor">;

const TIER_HEADLINE: Record<UserTier, string> = {
  member: "Your study desk is open.",
  plus: "Class 11 + Class 12, exam-ready.",
  pro: "Everything, no caps.",
  owner: "Everything, plus the controls.",
};

const TIER_BLURB: Record<UserTier, string> = {
  member:
    "Welcome to the study desk. Search the whole library, keep your Class 11 core notes and formula sheets close, and track your progress — everything a Member needs.",
  plus:
    "You're exam-ready: Class 12 portal, the study journal, worked numericals, PYQ banks and the CEE Medical track are all yours now.",
  pro:
    "The full platform is open: every index, derivations & theorems, the PDF library, graph banks, knowledge hubs and the entrance tracks.",
  owner:
    "Operator access: everything Pro has, unlimited Veer sparks, plus the owner console — user tiers, grants, content control and live audit.",
};

const TIER_CTA: Record<UserTier, string> = {
  member: "Go to my study desk",
  plus: "Go to my Plus home",
  pro: "Go to my Pro home",
  owner: "Go to the Owner console",
};

/** The Go button target — the viewer's own tier home. */
function homeHrefFor(tier: AccessLevel): string {
  return tier === "visitor" ? "/" : TIER_HOME_PATHS[tier];
}

function TierWelcome({ tier }: { tier: UserTier }) {
  const open = SECTIONS.filter((s) => ACCESS_RANK[s.minTier] <= ACCESS_RANK[tier]);
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl space-y-6">
        {/* Hero */}
        <div className="rounded-3xl border border-border/70 bg-card p-6 sm:p-8 shadow-sm">
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
        <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
          <p className="text-xs font-semibold text-muted-foreground">
            What&apos;s open at your rung
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {open.slice(0, 10).map((s) => (
              <span
                key={s.id}
                className="rounded-full border border-border/60 bg-background px-2.5 py-1 text-[11px] font-medium text-foreground"
              >
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

        {/* Go → home */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={homeHrefFor(tier)}
            className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-sm transition hover:opacity-90"
          >
            {TIER_CTA[tier]} →
          </Link>
          <Link
            href="/plans"
            className="text-xs font-semibold text-muted-foreground hover:text-foreground hover:underline"
          >
            See all plans
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── The five hardcoded welcome screens ──────────────────────────────────────

/**
 * THE UNIVERSAL VISITOR WELCOME (owner 2026-10-23: "a universal welcome page
 * for visitors not users … in the welcome add an option 'go' after clicking
 * that show the login page … no universal welcome for accessed users as that
 * is for visitors only").
 *
 * One page for every visitor regardless of anything else: the welcome hero
 * with the Go option (→ the login page), the account-creation path, and the
 * public overview as its body. Signed-in viewers never see this page — the
 * run gate replaces them onto their own tier welcome.
 */
export function UniversalWelcome() {
  return (
    <div>
      <div className="flex min-h-[70vh] items-center justify-center px-4 pb-6 pt-12">
        <div className="w-full max-w-2xl space-y-6 text-center">
          <p className="text-[11px] font-bold uppercase tracking-widest text-primary">
            Welcome
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Welcome to Ravikisan&apos;s Platform
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            NEB Class 11 &amp; 12 study resources — notes, formula sheets, labs,
            quizzes and the Veer AI tutor — organized around the CDC
            curriculum. Sign in to pick up your plan: every account gets its
            own study interface.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/login"
              aria-label="Go — continue to sign in"
              className="inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-3 text-sm font-bold text-primary-foreground shadow-sm transition hover:opacity-90"
            >
              Go
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center rounded-2xl border border-border/70 px-6 py-3 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
            >
              Create an account
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">
            Everything below is open to browse — no account needed.
          </p>
        </div>
      </div>
      {/* The public overview is this welcome's body (visitors keep header +
          body + footer — the quick links and search stay hidden). */}
      <HomePublic />
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
