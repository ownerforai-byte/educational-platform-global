import Link from "next/link";
import {
  Crown,
  Eye,
  GraduationCap,
  Rocket,
  Sparkles,
  Check,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ACCESS_TAGLINES, type AccessLevel } from "@/lib/access-level";
import { SectionMatrix } from "@/components/plans/section-matrix";

/**
 * /plans — the public tier ladder (plan.md §2.1 + §3).
 *
 * A guest page: visible to everyone, never blurred, never coin-gated. It is
 * the single place that explains what each access rung includes and which
 * content sections each rung opens. Replaces the retired /pro-plan page.
 */

interface TierCard {
  id: AccessLevel;
  name: string;
  icon: LucideIcon;
  accent: string;
  chip: string;
  who: string;
  features: string[];
  cta: { label: string; href: string } | null;
}

const TIER_CARDS: TierCard[] = [
  {
    id: "visitor",
    name: "Guest",
    icon: Eye,
    accent: "border-slate-500/30 bg-gradient-to-br from-slate-500/10 via-card to-card",
    chip: "bg-slate-500/15 text-slate-500",
    who: "Signed-out visitors",
    features: [
      "Only the chat widget on the visitor home — a text box and a send button",
      "It explains the platform. It does not teach the syllabus",
      "No notes, labs, simulations, or Veer",
    ],
    cta: { label: "Start exploring", href: "/home" },
  },
  {
    id: "member",
    name: "Member",
    icon: GraduationCap,
    accent: "border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-card to-card",
    chip: "bg-emerald-500/15 text-emerald-500",
    who: "Approved accounts",
    features: [
      "The visitor home chat widget",
      "3 Veer sparks per day — Study, Nepali, and Grammar chats only",
    ],
    cta: { label: "Request an account", href: "/signup" },
  },
  {
    id: "plus",
    name: "Plus",
    icon: Sparkles,
    accent: "border-sky-500/30 bg-gradient-to-br from-sky-500/10 via-card to-card",
    chip: "bg-sky-500/15 text-sky-500",
    who: "Owner-granted plan",
    features: [
      "Everything in Member, plus:",
      "Search the whole library",
      "Student Desk: profile, progress, credits wallet",
      "Class 11 core notes + formula sheets",
      "Practice basics (topic practice sets)",
      "Notice board",
      "Class 12 portal + all subject notes",
      "PYQ banks & past-paper practice",
      "Labs, simulations, visuals, and the Diagram Hub",
      "Veer studio (math, diagrams, deep-dive, quiz) — 25 sparks / day",
    ],
    cta: null,
  },
  {
    id: "pro",
    name: "Pro",
    icon: Rocket,
    accent: "border-violet-500/30 bg-gradient-to-br from-violet-500/10 via-card to-card",
    chip: "bg-violet-500/15 text-violet-500",
    who: "Owner-granted plan",
    features: [
      "Everything in Plus, plus:",
      "Study Journal — private entries, yours",
      "Worked Numericals hubs (Physics, Chemistry)",
      "CEE Medical Entrance track · Board exam suite",
      "All indexes — every subject, every hub",
      "Derivations & Theorems (full proofs)",
      "PDF library · Graph bank · Science graph bank",
      "World Knowledge, General Knowledge, Loksewa",
      "Engineering (IOE) & Loksewa entrance tracks",
      "Veer AI chat — 50 sparks / day, priority queue",
    ],
    cta: null,
  },
  {
    id: "owner",
    name: "Owner",
    icon: Crown,
    accent: "border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-card to-card",
    chip: "bg-amber-500/15 text-amber-500",
    who: "Platform operator",
    features: [
      "Everything in Pro, unlimited Veer sparks",
      "Owner console: users, tiers & grants",
      "Content control: publish, classify, retire",
      "Section access rules (min-tier per section)",
      "Platform settings & live audit",
    ],
    cta: null,
  },
];

// The availability matrix lives in components/plans/section-matrix.tsx — a
// client table so it reflects the owner's runtime section minimums.

export default function PlansPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10">
      {/* ── Hero ── */}
      <div className="space-y-2 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          Plans &amp; Access
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          One ladder. Five rungs. Everything in its place.
        </h1>
        <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
          Every study section — from past papers to the AI tutor — declares which rung
          opens it. Start as a guest and grow: request an account, then let the owner
          grant the plan that fits.
        </p>
      </div>

      {/* ── Tier cards ── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TIER_CARDS.map((tier) => {
          const Icon = tier.icon;
          return (
            <Card key={tier.id} className={`flex flex-col justify-between ${tier.accent}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`rounded-xl p-2 ${tier.chip}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg">{tier.name}</CardTitle>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${tier.chip}`}>
                    {tier.id === "visitor" ? "Free" : tier.id === "owner" ? "Operator" : "Plan"}
                  </span>
                </div>
                <CardDescription className="text-xs">
                  {ACCESS_TAGLINES[tier.id]} · <span className="text-muted-foreground/80">{tier.who}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-1.5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs leading-relaxed">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                {tier.cta ? (
                  <Link
                    href={tier.cta.href}
                    className="inline-flex h-9 w-full items-center justify-center rounded-xl bg-primary text-xs font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:opacity-90"
                  >
                    {tier.cta.label}
                  </Link>
                ) : (
                  <p className="rounded-xl border border-border/60 bg-background/60 px-3 py-2 text-center text-[11px] text-muted-foreground">
                    {tier.id === "owner"
                      ? "Reserved for the platform operator."
                      : "Granted by the owner — request it from your profile."}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ── Availability matrix ── */}
      <div className="space-y-3">
        <div>
          <h2 className="text-xl font-bold tracking-tight">What each rung opens</h2>
          <p className="text-xs text-muted-foreground">
            The full section map (plan.md §3). A ✓ means the section opens at that rung.
          </p>
        </div>
        <SectionMatrix />
      </div>

      {/* ── Footer note ── */}
      <div className="rounded-2xl border border-border/70 bg-muted/20 p-5 text-center">
        <p className="text-xs text-muted-foreground">
          Accounts are created through a manual approval loop — login is mentored at
          8:00 PM. The notice board opens on the Plus plan.
        </p>
      </div>
    </div>
  );
}
