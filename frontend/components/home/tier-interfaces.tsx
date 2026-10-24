import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Calculator,
  Check,
  Crown,
  FileQuestion,
  FileText,
  FlaskConical,
  GraduationCap,
  Library,
  LineChart,
  Lock,
  MessageCircle,
  NotebookPen,
  Rocket,
  Search,
  Settings,
  Sigma,
  Sparkles,
  Stethoscope,
  TrendingUp,
  User,
} from "lucide-react";
import {
  ACCESS_LABELS,
  ACCESS_RANK,
  TIER_SPARKS,
  type AccessLevel,
} from "@/lib/access-level";
import { SECTIONS } from "@/lib/sections";
import {
  QUICK_LINKS,
  quickLinkMinTier,
  quickLinkUnlocked,
} from "@/lib/navigation";
import { HomeSubjectRails } from "@/components/home/home-subject-rails";
import { HomeFeaturesSparkGate } from "@/components/home/home-features-spark-gate";

/**
 * THE TIER INTERFACES — hardcoded (owner direction 2026-10-23:
 * "it must instantly know the access level of user and shows that exact
 * interface for him … create those pages for all tiers and hardcode them").
 *
 * One interface per rung, in this file, mapped deterministically in
 * TIER_INTERFACE. No config, no drift: the viewer's rung picks the component.
 * Sections inside each interface are the registry rows at or below the rung.
 */

// ── Shared shell ────────────────────────────────────────────────────────────

const TIER_ACCENT: Record<AccessLevel, string> = {
  visitor: "from-slate-500/10",
  member: "from-emerald-500/10",
  plus: "from-sky-500/10",
  pro: "from-violet-500/10",
  owner: "from-amber-500/10",
};

const TIER_ICON: Record<AccessLevel, LucideIcon> = {
  visitor: User,
  member: GraduationCap,
  plus: Sparkles,
  pro: Rocket,
  owner: Crown,
};

const NEXT_RUNG: Partial<Record<AccessLevel, AccessLevel>> = {
  visitor: "member",
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

function TierHero({ tier, headline, blurb }: { tier: AccessLevel; headline: string; blurb: string }) {
  const Icon = TIER_ICON[tier];
  return (
    <section className={`rounded-3xl border border-border/70 bg-gradient-to-br ${TIER_ACCENT[tier]} via-card to-card p-6 sm:p-8`}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2">
            <div className="rounded-2xl bg-primary/10 p-2">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary">
              {ACCESS_LABELS[tier]} interface
            </span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{headline}</h1>
          <p className="text-sm leading-relaxed text-muted-foreground">{blurb}</p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-background/70 px-4 py-3 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Veer sparks</p>
          <p className="mt-1 text-lg font-extrabold text-primary">{TIER_SPARKS[tier]}</p>
          <p className="mt-0.5 text-[10px] text-muted-foreground">notes 1 spark · labs free</p>
        </div>
      </div>
    </section>
  );
}

function SpotlightRow({ items }: { items: Spotlight[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((s) => {
        const Icon = s.icon;
        return (
          <Link
            key={s.href}
            href={s.href}
            className="group rounded-2xl border border-border/70 bg-card p-4 transition hover:border-primary/50 hover:shadow-sm"
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
 * the rest stay visible — dimmed with a lock, one tap to /plans (plan.md §4).
 */
function QuickLinksRail({ tier }: { tier: AccessLevel }) {
  return (
    <section aria-labelledby="quick-links-heading">
      <div>
        <h2 id="quick-links-heading" className="text-sm font-bold tracking-tight">
          Quick links
        </h2>
        <p className="text-[11px] text-muted-foreground">
          The fast path at your rung — locked ones open one plan up.
        </p>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {QUICK_LINKS.map((link) => {
          const unlocked = quickLinkUnlocked(tier, link.href);
          if (!unlocked) {
            return (
              <Link
                key={link.href}
                href="/plans"
                title={`${link.label} opens at ${ACCESS_LABELS[quickLinkMinTier(link.href)]} — see plans`}
                className="flex items-center gap-1.5 rounded-full border border-dashed border-border px-3.5 py-2 text-xs font-semibold text-muted-foreground/60"
              >
                <Lock className="h-3 w-3" />
                {link.label}
              </Link>
            );
          }
          return (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-border/70 bg-card px-3.5 py-2 text-xs font-semibold transition hover:border-primary/50 hover:text-primary"
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
            Every section at or below your rung — {open.length} open.
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
              className="flex w-[190px] shrink-0 flex-col rounded-2xl border border-border/70 bg-card p-3.5 transition hover:border-primary/50 hover:shadow-sm"
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
        <span className="font-bold text-primary">{ACCESS_LABELS[next]}</span> rung opens{" "}
        {SECTIONS.filter((s) => s.minTier === next).length} more sections.{" "}
        <Link href="/plans" className="font-semibold text-primary hover:underline">
          See all plans →
        </Link>
      </p>
    </section>
  );
}

function TierPage({
  tier,
  headline,
  blurb,
  spotlights,
}: {
  tier: AccessLevel;
  headline: string;
  blurb: string;
  spotlights: Spotlight[];
}) {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8">
      <TierHero tier={tier} headline={headline} blurb={blurb} />
      <QuickLinksRail tier={tier} />
      <SpotlightRow items={spotlights} />
      <HomeFeaturesSparkGate>
        <HomeSubjectRails />
      </HomeFeaturesSparkGate>
      <OpenSectionsRail tier={tier} />
      <NextRungTeaser tier={tier} />
    </div>
  );
}

// ── The four hardcoded interfaces ───────────────────────────────────────────

export function MemberHome() {
  return (
    <TierPage
      tier="member"
      headline="Your study desk is open."
      blurb="Search the whole library, keep your Class 11 notes and formula sheets close, and track your progress — everything a Member needs, in one place."
      spotlights={[
        { title: "Search", desc: "The whole library, one query away.", href: "/search", icon: Search },
        { title: "Class 11 Notes", desc: "Core theory notes across all six CDC subjects.", href: "/class-11-notes", icon: BookOpen },
        { title: "Formula Sheets", desc: "One-page rails per unit — revision at a glance.", href: "/legend", icon: Sigma },
        { title: "Progress & Credits", desc: "XP, streaks, badges and your credits wallet.", href: "/profile", icon: TrendingUp },
      ]}
    />
  );
}

export function PlusHome() {
  return (
    <TierPage
      tier="plus"
      headline="Exam-ready — Class 11 + Class 12."
      blurb="Everything a Member has, plus the exam engine: the Journal, worked numericals, past-paper banks, the CEE track and the board exam suite."
      spotlights={[
        { title: "Journal", desc: "Your private study journal — one entry per day.", href: "/journal", icon: NotebookPen },
        { title: "Practice & PYQ", desc: "Past-year question banks — learn from the past.", href: "/pyqs", icon: FileQuestion },
        { title: "Worked Numericals", desc: "Physics & Chemistry problem hubs, solved.", href: "/knowledge/numerical-physics", icon: Calculator },
        { title: "CEE Medical Entrance", desc: "CEE-pattern MCQs, traps and high-yield facts.", href: "/ai-quiz", icon: Stethoscope },
      ]}
    />
  );
}

export function ProHome() {
  return (
    <TierPage
      tier="pro"
      headline="Everything, no caps."
      blurb="All indexes and every content section: full derivations and theorems, the PDF library, graph banks and the knowledge hubs — and the highest Veer priority."
      spotlights={[
        { title: "Derivations & Theorems", desc: "Full step-by-step proofs with diagrams.", href: "/derivations", icon: Sigma },
        { title: "Knowledge Hubs", desc: "World Knowledge, GK, writing & vocabulary.", href: "/knowledge", icon: Library },
        { title: "PDF Library", desc: "Reference documents in the built-in viewer.", href: "/pdfs", icon: FileText },
        { title: "Graph Bank", desc: "Science graph bank and plotted explorables.", href: "/science-graph-bank", icon: LineChart },
      ]}
    />
  );
}

export function OwnerHome() {
  return (
    <TierPage
      tier="owner"
      headline="Operator console — everything, plus the controls."
      blurb="Every section is open and every spark is unlimited. The console runs the platform: users and tier grants, section access rules, content control and the R1 layer."
      spotlights={[
        { title: "Owner Console", desc: "The full control surface.", href: "/owner", icon: Crown },
        { title: "Users & Tier Grants", desc: "Grant or adjust Member / Plus / Pro rungs.", href: "/owner/users", icon: User },
        { title: "Section Access Rules", desc: "Every section and the rung that opens it.", href: "/owner/sections", icon: Settings },
        { title: "R1 Daily Life", desc: "Activities, plans, journal and habits.", href: "/r1", icon: MessageCircle },
      ]}
    />
  );
}
