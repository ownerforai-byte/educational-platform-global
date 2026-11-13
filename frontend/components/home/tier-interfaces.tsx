"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Calculator,
  CalendarCheck,
  Check,
  Crown,
  FileQuestion,
  Flame,
  FlaskConical,
  GraduationCap,
  MessageCircle,
  NotebookPen,
  PlayCircle,
  Rocket,
  Search,
  Settings,
  Sigma,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  User,
} from "lucide-react";
import {
  ACCESS_LABELS,
  ACCESS_RANK,
  TIER_SPARKS,
  type AccessLevel,
} from "@/lib/core/access-level";
import { SECTIONS } from "@/lib/sections";
import {
  QUICK_LINKS,
  quickLinkMinTier,
  quickLinkUnlocked,
} from "@/lib/core/navigation";
import { SparkGate } from "@/features/credits/spark-gate";
import { useSession } from "@/features/auth/hooks/use-session";
import { useJourney } from "@/components/study/use-journey";
import { useStudyGoals } from "@/components/study/use-study-goals";
import { entryStatus, topicHref } from "@/lib/progress/catalog";
import { daysUntilExam } from "@/lib/study-goals";
import { useClientClock } from "@/lib/hooks/use-client-clock";
import { useStreakCount } from "@/lib/hooks/use-streak";

/**
 * THE TIER INTERFACES — hardcoded (owner direction 2026-10-23:
 * "it must instantly know the access level of user and shows that exact
 * interface for him … create those pages for all tiers and hardcode them").
 *
 * One interface per rung, in this file, mapped deterministically in
 * TIER_INTERFACE. No config, no drift: the viewer's rung picks the component.
 * Sections inside each interface are the registry rows at or below the rung.
 *
 * 2026-11-09 desk redesign: each rung is now a personal desk, not a static
 * landing — the hero greets the student by name and the pulse row under it is
 * their own streak, journey and exam countdown. The hardcoded tier split is
 * untouched: same hero copy, spotlights and gating per rung.
 */

// ── Shared shell ────────────────────────────────────────────────────────────

const TIER_ACCENT: Record<AccessLevel, string> = {
  guest: "from-slate-500/10",
  member: "from-emerald-500/10",
  plus: "from-sky-500/10",
  pro: "from-violet-500/10",
  owner: "from-amber-500/10",
};

const TIER_ICON: Record<AccessLevel, LucideIcon> = {
  guest: User,
  member: GraduationCap,
  plus: Sparkles,
  pro: Rocket,
  owner: Crown,
};

const NEXT_RUNG: Partial<Record<AccessLevel, AccessLevel>> = {
  guest: "member",
  member: "plus",
  plus: "pro",
  pro: "owner",
};

interface Spotlight {
  title: string;
  desc: string;
  href: string;
  icon: LucideIcon;
}

/** "Good evening" — the desk knows what time the student sits down. */
function greetingFor(date: Date): string {
  const hour = date.getHours();
  if (hour < 5) return "Burning the midnight oil";
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function TierHero({
  tier,
  headline,
  blurb,
}: {
  tier: AccessLevel;
  headline: string;
  blurb: string;
}) {
  const Icon = TIER_ICON[tier];
  const { user } = useSession();
  const now = useClientClock();
  const streak = useStreakCount();

  const name = user?.fullName || user?.email?.split("@")[0] || "there";
  const dateLabel = now
    ? now.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })
    : "";

  return (
    <section
      className={`relative overflow-hidden rounded-3xl border-2 border-border/80 bg-gradient-to-br ${TIER_ACCENT[tier]} via-card to-card p-6 sm:p-8`}
    >
      {/* Cover accents — the desk gets the same depth as the profile hero. */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/5" />
      <div className="pointer-events-none absolute -bottom-14 right-24 h-36 w-36 rounded-full bg-primary/5" />

      <div className="relative flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2">
            <div className="rounded-2xl bg-primary/10 p-2">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary">
              {ACCESS_LABELS[tier]} interface
            </span>
            {streak > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full border border-orange-500/30 bg-orange-500/10 px-2.5 py-1 text-[10px] font-bold text-orange-600 dark:text-orange-400">
                <Flame className="h-3 w-3" aria-hidden="true" />
                {streak}-day streak
              </span>
            )}
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {now ? dateLabel : "\u00A0"}
          </p>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            {now ? `${greetingFor(now)}, ${name}.` : headline}
          </h1>
          <p className="text-sm font-semibold text-foreground">{headline}</p>
          <p className="text-sm leading-relaxed text-muted-foreground">{blurb}</p>
        </div>
        <div className="rounded-2xl border-2 border-border/80 bg-background/70 px-4 py-3 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            Veer sparks
          </p>
          <p className="mt-1 text-lg font-extrabold text-primary">{TIER_SPARKS[tier]}</p>
          <p className="mt-0.5 text-[10px] text-muted-foreground">
            notes 1 spark · labs {ACCESS_LABELS[quickLinkMinTier("/lab")]}
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * The desk pulse — the viewer's own four numbers, each one a door back into
 * the work. Derived from the same stores as /dashboard and /progress, so the
 * desk can never disagree with them; degrades to honest empty states.
 */
function DeskPulse() {
  const { entries, summary, loading } = useJourney();
  const { goals, ready } = useStudyGoals();
  const streak = useStreakCount();

  const days = ready ? daysUntilExam(goals) : null;
  const next = entries.find((e) => entryStatus(e) === "in_progress");

  const tiles: Array<{
    icon: LucideIcon;
    label: string;
    value: string;
    hint: string;
    href: string;
    tone: string;
  }> = [
    {
      icon: PlayCircle,
      label: "Continue",
      value: next ? next.topic?.title || next.topicSlug || "Your last topic" : "Pick a topic",
      hint: next ? "where you left off" : "open any chapter to begin",
      href: next ? topicHref(next) : "/class-11-notes",
      tone: "text-sky-500",
    },
    {
      icon: Flame,
      label: "Study streak",
      value: streak > 0 ? `${streak} day${streak === 1 ? "" : "s"}` : "Start today",
      hint: streak > 0 ? "keep it alive" : "one topic starts it",
      href: "/streaks",
      tone: "text-orange-500",
    },
    {
      icon: Trophy,
      label: "Topics done",
      value: loading || !summary ? "…" : `${summary.completed} / ${summary.total}`,
      hint: summary ? `${summary.percent}% of the syllabus` : "from your journey",
      href: "/progress",
      tone: "text-emerald-500",
    },
    {
      icon: CalendarCheck,
      label: days !== null && days >= 0 ? "Exam countdown" : "Study target",
      value: days !== null && days >= 0 ? `${days} days` : "Set a goal",
      hint: days !== null && days >= 0 ? "to your exam date" : "plan your weeks",
      href: "/goals",
      tone: "text-violet-500",
    },
  ];

  return (
    <section aria-labelledby="desk-pulse-heading">
      <h2 id="desk-pulse-heading" className="sr-only">
        Your desk at a glance
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((tile) => {
          const Icon = tile.icon;
          return (
            <Link
              key={tile.label}
              href={tile.href}
              className="group rounded-2xl border-2 border-border/80 bg-card p-4 transition hover:border-primary/50 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="flex items-center gap-2">
                <Icon className={`h-4 w-4 ${tile.tone}`} aria-hidden="true" />
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {tile.label}
                </p>
              </div>
              <p className="mt-1.5 truncate text-sm font-extrabold text-foreground">{tile.value}</p>
              <p className="mt-0.5 truncate text-[10px] text-muted-foreground">{tile.hint}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function SpotlightRow({ items }: { items: Spotlight[] }) {
  return (
    <div data-testid="spotlights" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((s) => {
        const Icon = s.icon;
        return (
          <Link
            key={s.href}
            href={s.href}
            className="group flex min-h-[88px] flex-col rounded-2xl border-2 border-border/80 bg-card p-4 transition hover:border-primary/50 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="flex items-center gap-2.5">
              <div className="rounded-xl bg-primary/10 p-2">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <p className="text-xs font-bold">{s.title}</p>
            </div>
            <p className="mt-2 line-clamp-2 text-[10px] leading-relaxed text-muted-foreground">{s.desc}</p>
            <p className="mt-2 text-[10px] font-semibold text-primary opacity-0 transition group-hover:opacity-100">
              Open →
            </p>
          </Link>
        );
      })}
    </div>
  );
}

/**
 * Quick links for this interface (owner direction 2026-10-23: each tier home
 * gets "access to quick links"). Links at or below the rung open instantly;
 * the rest stay visible in a muted disabled state without an icon or action.
 */
function QuickLinksRail({ tier }: { tier: AccessLevel }) {
  return (
    <section aria-labelledby="quick-links-heading">
      <div>
        <h2 id="quick-links-heading" className="text-sm font-bold tracking-tight">
          Quick links
        </h2>
        <p className="text-[11px] text-muted-foreground">
          The fast path for your plan; unavailable destinations are muted.
        </p>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {QUICK_LINKS.map((link) => {
          const unlocked = quickLinkUnlocked(tier, link.href);
          if (!unlocked) {
            // Plans live in the footer only; render a muted, disabled chip.
            return (
              <span
                key={link.href}
                aria-disabled="true"
                title={`${link.label} opens at ${ACCESS_LABELS[quickLinkMinTier(link.href)]}`}
                className="inline-flex min-h-10 cursor-not-allowed items-center gap-1.5 rounded-full border border-border/60 bg-muted/40 px-3.5 py-2 text-xs font-semibold text-muted-foreground/50 opacity-60 grayscale"
              >
                {link.label}
              </span>
            );
          }
          return (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex min-h-10 items-center rounded-full border border-border/70 bg-card px-3.5 py-2 text-xs font-semibold transition hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function OpenSectionsRail({ tier }: { tier: AccessLevel }) {
  const open = SECTIONS.filter((s) => ACCESS_RANK[s.minTier] <= ACCESS_RANK[tier]);
  return (
    <section aria-labelledby="open-sections-heading">
      <div className="flex items-end justify-between">
        <div>
          <h2 id="open-sections-heading" className="text-sm font-bold tracking-tight">
            Open for you
          </h2>
          <p className="text-[11px] text-muted-foreground">
            Every section in your plan — {open.length} open.
          </p>
        </div>
      </div>
      <div className="mt-3 flex gap-2.5 overflow-x-auto pb-2">
        {open.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.id}
              href={s.href}
              className="flex w-[190px] shrink-0 flex-col rounded-2xl border-2 border-border/80 bg-card p-3.5 transition hover:border-primary/50 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-primary/10 p-1.5">
                  <Icon className="h-3.5 w-3.5 text-primary" />
                </div>
                <Check className="h-3 w-3 text-primary" />
              </div>
              <p className="mt-2 text-[11px] font-bold leading-tight">{s.title}</p>
              <p className="mt-1 line-clamp-2 text-[9px] leading-relaxed text-muted-foreground">{s.description}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function NextRungTeaser({ tier }: { tier: AccessLevel }) {
  const next = NEXT_RUNG[tier];
  if (!next) return null;
  return (
    <section className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-4 text-center">
      <p className="text-xs text-muted-foreground">
        Want more? The{" "}
        <span className="font-bold text-primary">{ACCESS_LABELS[next]}</span> plan opens{" "}
        {(() => { const count = SECTIONS.filter((s) => s.minTier === next).length; return `${count} more section${count === 1 ? "" : "s"}.`; })()}
      </p>
    </section>
  );
}

function TierPage({
  tier,
  headline,
  blurb,
  spotlights,
  rails,
}: {
  tier: AccessLevel;
  headline: string;
  blurb: string;
  spotlights: Spotlight[];
  rails: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8">
      <TierHero tier={tier} headline={headline} blurb={blurb} />
      <DeskPulse />
      <QuickLinksRail tier={tier} />
      <SpotlightRow items={spotlights} />
      <SparkGate
        minLevel="pro"
        title="Home features"
        description="Subject rails, study tools and the full home dashboard open on the Pro plan."
      >
        {rails}
      </SparkGate>
      <OpenSectionsRail tier={tier} />
      <NextRungTeaser tier={tier} />
    </div>
  );
}

// ── The four hardcoded interfaces ───────────────────────────────────────────

export function MemberHome({ rails }: { rails: ReactNode }) {
  return (
    <TierPage
      rails={rails}
      tier="member"
      headline="Your study desk is open."
      blurb="Search the whole library, keep your Class 11 notes and formula sheets close, ask Veer when a concept will not click, and track your progress — everything a Member needs, in one place."
      spotlights={[
        // Veer chat is a member feature (13 sparks/day), so it gets a door here
        // rather than living only behind the muted quick-link chip.
        { title: "Ask Veer", desc: "Study, Nepali or Grammar chat — 13 sparks a day.", href: "/chat", icon: Sparkles },
        { title: "Search", desc: "The whole library, one query away.", href: "/search", icon: Search },
        { title: "Class 11 Notes", desc: "Core theory notes across all six CDC subjects.", href: "/class-11-notes", icon: BookOpen },
        { title: "Formula Sheets", desc: "One-page rails per unit — revision at a glance.", href: "/legend", icon: Sigma },
        { title: "Progress & Credits", desc: "XP, streaks, badges and your credits wallet.", href: "/profile", icon: TrendingUp },
      ]}
    />
  );
}

export function PlusHome({ rails }: { rails: ReactNode }) {
  return (
    <TierPage
      rails={rails}
      tier="plus"
      headline="Exam-ready — Class 11 + Class 12."
      blurb="Everything a Member has, plus Class 12, past papers, labs, and Veer studio."
      spotlights={[
        { title: "Class 12 Notes", desc: "Advanced theory notes and board-exam depth.", href: "/class-12-notes", icon: GraduationCap },
        { title: "Practice & PYQ", desc: "Past-year question banks — learn from the past.", href: "/pyqs", icon: FileQuestion },
        { title: "Labs", desc: "Interactive labs and videos.", href: "/lab", icon: FlaskConical },
        { title: "Veer Studio", desc: "Math, diagrams, deep-dive, and quiz.", href: "/ai", icon: Sparkles },
      ]}
    />
  );
}

export function ProHome({ rails }: { rails: ReactNode }) {
  return (
    <TierPage
      rails={rails}
      tier="pro"
      headline="Everything, no caps."
      blurb="Journal, worked numericals, the CEE track and the board exam suite, plus every index: derivations, the PDF library, graph banks and the knowledge hubs."
      spotlights={[
        { title: "Journal", desc: "Your private study journal — one entry per day.", href: "/journal", icon: NotebookPen },
        { title: "Worked Numericals", desc: "Physics & Chemistry problem hubs, solved.", href: "/knowledge/numerical-physics", icon: Calculator },
        { title: "CEE & Board exams", desc: "CEE track and the board exam suite.", href: "/exam-countdown", icon: Target },
        { title: "Derivations & Theorems", desc: "Full step-by-step proofs with diagrams.", href: "/derivations", icon: Sigma },
      ]}
    />
  );
}

export function OwnerHome({ rails }: { rails: ReactNode }) {
  return (
    <TierPage
      rails={rails}
      tier="owner"
      headline="Everything, in one place."
      blurb="Every section is open and every spark is unlimited."
      spotlights={[
        { title: "Study overview", desc: "Everything in one place.", href: "/owner", icon: Crown },
        { title: "Account tools", desc: "Manage plans and access.", href: "/owner/users", icon: User },
        { title: "Section settings", desc: "What each plan includes.", href: "/owner/sections", icon: Settings },
      ]}
    />
  );
}
