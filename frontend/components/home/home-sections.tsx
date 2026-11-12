"use client";

import Link from "next/link";
import { useSession } from "@/features/auth/hooks/use-session";
import { sectionsFor } from "@/lib/sections";
import { useSectionTierOverrides } from "@/lib/hooks/use-section-tiers";
import { ACCESS_LABELS, type AccessLevel } from "@/lib/access-level";

/**
 * The home sections rail (plan.md §3 + §4).
 *
 * Every content section appears as a compact card in ONE horizontal rail:
 * no vertical walls. Restricted sections stay visible in a muted disabled
 * state, without a lock icon or an actionable route. Operator-only surfaces
 * (operator surface) are hidden entirely below the operator tier.
 */

const TIER_CHIP: Record<AccessLevel, string> = {
  guest: "bg-slate-500/15 text-slate-500",
  member: "bg-emerald-500/15 text-emerald-500",
  plus: "bg-sky-500/15 text-sky-500",
  pro: "bg-violet-500/15 text-violet-500",
  owner: "bg-amber-500/15 text-amber-500",
};

export function HomeSections() {
  const { user } = useSession();
  const overrides = useSectionTierOverrides();
  const entries = sectionsFor(user, overrides);

  return (
    <section className="border-b border-border/80 py-10" aria-labelledby="sections-heading">
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 id="sections-heading" className="text-lg font-bold tracking-tight">
              Study sections
            </h2>
            <p className="text-xs text-muted-foreground">
              Everything the platform holds, in sections — each opens at its own rung.
            </p>
          </div>
          {/* Plans live in the footer only (owner 2026-10-25) — no plans link
              here; the rung chip on each card is the tier indicator. */}
        </div>

        {/* One horizontal rail — swipe/scroll sideways, never a vertical wall. */}
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
          {entries.map(({ section, unlocked }) => {
            const Icon = section.icon;
            const card = (
              <div
                className={`flex h-full w-[210px] shrink-0 flex-col justify-between rounded-2xl border-2 border-border/80 bg-card p-4 transition ${
                  unlocked
                    ? "hover:border-primary/50 hover:shadow-sm"
                    : "cursor-not-allowed opacity-50 grayscale"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className={`rounded-xl p-2 ${unlocked ? "bg-primary/10" : "bg-muted"}`}>
                      <Icon className={`h-4 w-4 ${unlocked ? "text-primary" : "text-muted-foreground/60"}`} />
                    </div>
                    {unlocked ? (
                      <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${TIER_CHIP[section.minTier]}`}>
                        {ACCESS_LABELS[section.minTier]}
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-muted/70 px-1.5 py-0.5 text-[9px] font-bold text-muted-foreground/50 grayscale" aria-disabled="true">
                        {ACCESS_LABELS[section.minTier]}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold leading-tight">{section.title}</p>
                    <p className="mt-1 line-clamp-3 text-[10px] leading-relaxed text-muted-foreground">
                      {section.description}
                    </p>
                  </div>
                </div>
                <p className={`mt-3 text-[10px] font-semibold ${unlocked ? "text-primary" : "text-muted-foreground/60"}`} aria-disabled={unlocked ? undefined : true}>
                  {unlocked ? "Open →" : "Unavailable on this plan"}
                </p>
              </div>
            );

            // Plans live in the footer only; restricted sections stay inert.
            if (!unlocked) {
              return (
                <div key={section.id} aria-disabled="true" className="block">
                  {card}
                </div>
              );
            }
            return (
              <Link key={section.id} href={section.href} className="block">
                {card}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
