"use client";

import Link from "next/link";
import { Lock, ArrowRight } from "lucide-react";
import { useSession } from "@/features/auth/hooks/use-session";
import { sectionsFor } from "@/lib/sections";
import { ACCESS_LABELS, type AccessLevel } from "@/lib/access-level";

/**
 * The home sections rail (plan.md §3 + §4).
 *
 * Every content section appears as a compact card in ONE horizontal rail:
 * no vertical walls. Locked sections stay visible but dimmed with a lock chip
 * and route to /plans — discovery drives upgrades. Operator-only surfaces
 * (owner console) are hidden entirely below the owner rung.
 */

const TIER_CHIP: Record<AccessLevel, string> = {
  visitor: "bg-slate-500/15 text-slate-500",
  member: "bg-emerald-500/15 text-emerald-500",
  plus: "bg-sky-500/15 text-sky-500",
  pro: "bg-violet-500/15 text-violet-500",
  owner: "bg-amber-500/15 text-amber-500",
};

export function HomeSections() {
  const { user } = useSession();
  const entries = sectionsFor(user);

  return (
    <section className="border-b border-border/60 py-10" aria-labelledby="sections-heading">
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
          <Link
            href="/plans"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
          >
            See all plans <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* One horizontal rail — swipe/scroll sideways, never a vertical wall. */}
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
          {entries.map(({ section, unlocked }) => {
            const Icon = section.icon;
            const card = (
              <div
                className={`flex h-full w-[210px] shrink-0 flex-col justify-between rounded-2xl border border-border/70 bg-card p-4 transition ${
                  unlocked ? "hover:border-primary/50 hover:shadow-sm" : "opacity-70"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="rounded-xl bg-primary/10 p-2">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    {unlocked ? (
                      <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${TIER_CHIP[section.minTier]}`}>
                        {ACCESS_LABELS[section.minTier]}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-muted px-1.5 py-0.5 text-[9px] font-bold text-muted-foreground">
                        <Lock className="h-2.5 w-2.5" /> {ACCESS_LABELS[section.minTier]}
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
                <p className="mt-3 text-[10px] font-semibold text-primary">
                  {unlocked ? "Open →" : "See plans →"}
                </p>
              </div>
            );

            return (
              <Link key={section.id} href={unlocked ? section.href : "/plans"} className="block">
                {card}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
