import Link from "next/link";
import type { Metadata } from "next";
import { PlansGuidance } from "@/components/platform/plans-guidance";

export const metadata: Metadata = {
  title: "Plans & Access | Ravikisan's Platform",
  description: "Compare platform access levels and section availability.",
};
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
 * /plans — the public plan comparison.
 *
 * A guest page: visible to everyone, never blurred, never coin-gated. It is
 * the single place that explains what each plan includes and which content
 * sections each plan opens. Replaces the retired /pro-plan page.
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
    id: "guest",
    name: "Guest",
    icon: Eye,
    accent: "border-slate-500/30 bg-gradient-to-br from-slate-500/10 via-card to-card",
    chip: "bg-slate-500/15 text-slate-500",
    who: "Signed-out guests",
    features: [
      "Only the chat widget on the guest home — a text box and a send button",
      "It explains the platform. It does not teach the syllabus",
      "No notes, labs, videos, or Veer",
    ],
    cta: { label: "Start exploring", href: "/home" },
  },
  {
    id: "member",
    name: "Member",
    icon: GraduationCap,
    accent: "border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-card to-card",
    chip: "bg-emerald-500/15 text-emerald-500",
    who: "Standard accounts",
    features: [
      "The guest home chat widget",
      "13 Veer sparks per day — Study, Nepali, and Grammar chats only",
    ],
    cta: { label: "Request an account", href: "/signup" },
  },
  {
    id: "plus",
    name: "Plus",
    icon: Sparkles,
    accent: "border-sky-500/30 bg-gradient-to-br from-sky-500/10 via-card to-card",
    chip: "bg-sky-500/15 text-sky-500",
    who: "Available plan",
    features: [
      "Everything in Member, plus:",
      "Search the whole library",
      "Student Desk: profile, progress, credits wallet",
      "Class 11 core notes + formula sheets",
      "Practice basics (topic practice sets)",
      "Notice board",
      "Class 12 portal + all subject notes",
      "PYQ banks & past-paper practice",
      "Labs, videos, visuals, and the Diagram Hub",
      "Ad P Table — the 118-element suite with the CEE entrance hub",
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
    who: "Available plan",
    features: [
      "Everything in Plus, plus:",
      "Study Journal — private entries, yours",
      "Worked Numericals hubs (Physics, Chemistry)",
      "CEE Medical Entrance track · Board exam suite",
      "Original periodic table — filters, blocks, and CEE (Plus can unlock it with the password)",
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
    who: "Full access",
    features: [
      "Everything in Pro, unlimited Veer sparks",
      "Full access to every study section",
      "Priority AI assistance",
      "Advanced study and practice tools",
      "All available learning resources",
    ],
    cta: null,
  },
];

// The availability matrix lives in components/plans/section-matrix.tsx — a
// client table so it reflects the current plan configuration.

export default function PlansPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10">
      {/* ── Hero ── */}
      <div className="space-y-2 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          Plans &amp; Access
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Plans for every stage of learning.
        </h1>
        <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
          Each plan opens a different set of study sections. Choose the one that fits
          how you study.
        </p>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-foreground">
          After signing, the account is approved by the system verification and administrative approval.
          Questions: email{" "}
          <a className="font-semibold text-primary hover:underline" href="mailto:sahrocky81@gmail.com">
            sahrocky81@gmail.com
          </a>
          .
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
                    {tier.id === "guest" ? "Free" : tier.id === "owner" ? "Full" : "Plan"}
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
                      ? "Full access to the platform."
                      : "Available with an approved account."}
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
          <h2 className="text-xl font-bold tracking-tight">What each plan opens</h2>
          <p className="text-xs text-muted-foreground">
            A ✓ means the section is included in that plan.
          </p>
        </div>
        <SectionMatrix />
      </div>

      <PlansGuidance />

      {/* ── Footer note ── */}
      <div className="rounded-2xl border border-border/70 bg-muted/20 p-5 text-center">
        <p className="text-xs text-muted-foreground">
          After signing, the account is approved by the system verification and administrative approval.
        </p>
      </div>
    </div>
  );
}
