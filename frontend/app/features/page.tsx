import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Check, Minus } from "lucide-react";
import { SECTIONS } from "@/lib/sections";
import type { AccessLevel } from "@/lib/access-level";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Everything the platform offers — tier by tier. See what Member, Plus, Pro and Owner unlock.",
};

const TIER_ORDER: AccessLevel[] = ["guest", "member", "plus", "pro", "owner"];

const TIER_LABELS: Record<AccessLevel, string> = {
  guest: "Guest",
  member: "Member",
  plus: "Plus",
  pro: "Pro",
  owner: "Owner",
};

function tierIndex(t: AccessLevel): number {
  return TIER_ORDER.indexOf(t);
}

/** A feature is available at tier T and above. */
function isAvailable(sectionTier: AccessLevel, checkTier: AccessLevel): boolean {
  return tierIndex(sectionTier) <= tierIndex(checkTier);
}

export default function FeaturesPage() {
  // Group sections by tier for the grid
  const tiers: AccessLevel[] = ["guest", "member", "plus", "pro", "owner"];

  return (
    <div className="mx-auto max-w-5xl space-y-8 py-10 px-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Features</h1>
        <p className="mt-2 text-muted-foreground">
          A full feature grid showing exactly what each tier unlocks — from free
          flashcards to full entrance prep.
        </p>
      </div>

      {/* Tier comparison table */}
      <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-left font-semibold text-foreground">
                Feature
              </th>
              {tiers.map((t) => (
                <th
                  key={t}
                  className="px-4 py-3 text-center font-semibold text-foreground"
                >
                  {TIER_LABELS[t]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SECTIONS.map((s) => (
              <tr
                key={s.id}
                className="border-b border-border/40 last:border-0"
              >
                <td className="px-4 py-2.5">
                  <p className="font-medium text-foreground">{s.title}</p>
                  <p className="text-xs text-muted-foreground">{s.description}</p>
                </td>
                {tiers.map((t) => (
                  <td key={t} className="px-4 py-2.5 text-center">
                    {isAvailable(s.minTier, t) ? (
                      <Check className="mx-auto h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Minus className="mx-auto h-4 w-4 text-muted-foreground/40" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/plans"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
        >
          See plan pricing
        </Link>
        <Link
          href="/home"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
