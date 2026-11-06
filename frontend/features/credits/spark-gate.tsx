"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/features/auth/hooks/use-session";
import { ACCESS_LABELS, hasLevel, type AccessLevel } from "@/lib/access-level";
import { isSectionUnlocked, sectionForPath } from "@/lib/sections";
import { useSectionTierOverrides } from "@/lib/hooks/use-section-tiers";

/**
 * SparkGate — THE gate. Every access decision on the platform goes through
 * this one component; there is no separate coin gate, credit gate or per-page
 * tier gate any more.
 *
 * Two modes, one component:
 *   - route mode (no `minLevel`): the pathname is matched against the section
 *     registry (with the owner-console overrides) and the whole shell is gated
 *     at that section's rung. Used once, by the (app) layout.
 *   - inline mode (`minLevel`): a single block is gated at an explicit rung —
 *     home features (pro), the periodic-table study layers (plus), and so on.
 *
 * Locked output is the muted disabled card used everywhere else: greyed out,
 * `cursor-not-allowed`, no glowing primary button, no plans link (plans live in
 * the footer), and no lock iconography.
 */
export type SparkGateProps = {
  children: ReactNode;
  /** Inline gate rung. Omit in route mode so the section registry decides. */
  minLevel?: AccessLevel;
  /** Heading override for the inline card. */
  title?: string;
  /** Body copy override for the inline card. */
  description?: string;
  /** Single-line variant for cards embedded inside another panel. */
  compact?: boolean;
  className?: string;
};

export function SparkGate({
  children,
  minLevel,
  title,
  description,
  compact = false,
  className = "",
}: SparkGateProps) {
  const pathname = usePathname() ?? "";
  const { user, isLoading } = useSession();
  const overrides = useSectionTierOverrides();

  /* Route mode — the section registry (plus owner overrides) picks the rung. */
  if (!minLevel) {
    const section = sectionForPath(pathname, overrides);
    if (!section || isSectionUnlocked(user, section)) return <>{children}</>;

    return (
      <div className="mx-auto max-w-2xl px-4 py-14">
        <div
          className="cursor-not-allowed rounded-2xl border border-border/60 bg-muted/40 p-8 text-center opacity-60 grayscale"
          aria-disabled="true"
        >
          <h1 className="text-2xl font-extrabold tracking-tight text-muted-foreground">
            {section.title} is unavailable on this plan
          </h1>
          <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground/60">
            Available to {ACCESS_LABELS[section.minTier]} and above
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {section.description}
          </p>
          {/* Plans live in the footer only — no plans link here. */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/home"
              className="inline-flex items-center rounded-2xl border border-border/70 px-6 py-3 text-sm font-semibold text-muted-foreground transition hover:border-muted-foreground"
            >
              Go to my home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* Inline mode — hold the slot while the session resolves, then gate. */
  if (isLoading) return null;
  if (hasLevel(user, minLevel)) return <>{children}</>;

  const label = `Available to ${ACCESS_LABELS[minLevel]} and above`;

  if (compact) {
    return (
      <div
        aria-disabled="true"
        className={`cursor-not-allowed rounded-xl border border-border/60 bg-muted/40 px-2 py-1 text-[10px] text-muted-foreground/70 opacity-70 ${className}`}
      >
        <span className="font-semibold">{label}</span>
      </div>
    );
  }

  return (
    <div
      aria-disabled="true"
      className={`cursor-not-allowed rounded-2xl border border-border/60 bg-muted/40 p-6 text-center opacity-60 grayscale ${className}`}
    >
      <p className="text-sm font-extrabold tracking-tight text-muted-foreground">
        {title ?? "Study layer"}
      </p>
      <p className="mt-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground/60">
        {label}
      </p>
      {description && (
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
