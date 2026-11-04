"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/features/auth/hooks/use-session";
import { ACCESS_LABELS } from "@/lib/access-level";
import { isSectionUnlocked, sectionForPath } from "@/lib/sections";
import { useSectionTierOverrides } from "@/lib/hooks/use-section-tiers";

/**
 * SECTION GATE (plan.md §8 P4 + §4): every shell route matched to its section
 * and checked against that section's minimum rung. Locked sections render an
 * "Upgrade your plan" card with a View plans link — no lock icon, no dead end.
 */
export function SectionTierGate({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "";
  const { user } = useSession();
  const overrides = useSectionTierOverrides();
  const section = sectionForPath(pathname, overrides);

  if (!section || isSectionUnlocked(user, section)) return <>{children}</>;

  return (
    <div className="mx-auto max-w-2xl px-4 py-14">
      <div
        className="rounded-2xl border border-border/60 bg-muted/40 p-8 text-center"
        aria-disabled="true"
      >
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
          Upgrade your plan
        </h1>
        <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground/60">
          {section.title} is available on {ACCESS_LABELS[section.minTier]} and above
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {section.description}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/plans"
            className="inline-flex items-center rounded-2xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition hover:bg-primary/90"
          >
            View plans
          </Link>
          <Link
            href="/home"
            className="inline-flex items-center rounded-2xl border border-border/70 px-6 py-3 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
          >
            Go to my home
          </Link>
        </div>
      </div>
    </div>
  );
}
