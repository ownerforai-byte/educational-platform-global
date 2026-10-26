"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useSession } from "@/features/auth/hooks/use-session";
import { ACCESS_LABELS } from "@/lib/access-level";
import { isSectionUnlocked, sectionForPath } from "@/lib/sections";
import { useSectionTierOverrides } from "@/lib/hooks/use-section-tiers";

/**
 * SECTION GATE (plan.md §8 P4 + §4: "locked sections are visible-but-dimmed
 * for lower tiers (no dead ends)").
 *
 * Every shell route is matched to its section (longest href prefix wins) and
 * checked against that section's minimum rung — the registry defaults plus the
 * owner's runtime minimums. Open sections render untouched; a section this
 * rung does not open renders the dimmed locked card instead of a dead end or a
 * redirect: the section stays visible and one tap reaches /plans.
 *
 * Operator surfaces (the owner console, R1) live outside the shell and carry
 * their own access models (allowlist / owner-granted), so this gate never
 * touches them.
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
        className="rounded-2xl border border-border/70 bg-card p-8 text-center opacity-80"
        aria-disabled="true"
      >
        <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          {section.title}
        </p>
        <h1 className="mt-3 text-2xl font-extrabold tracking-tight">
          Opens at the {ACCESS_LABELS[section.minTier]} rung
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {section.description}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/plans"
            className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-sm transition hover:opacity-90"
          >
            See plans <ArrowRight className="h-4 w-4" aria-hidden="true" />
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
