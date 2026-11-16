"use client";

import { BadgeCheck, Bot, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { BADGE_RARITY_TIER, getBadgeDefinition } from "@rn/shared/badges";
import { cn } from "@/lib/utils";

const CATEGORY_TONE: Record<string, { border: string; bg: string; text: string }> = {
  "academic-excellence": {
    border: "border-amber-500/45",
    bg: "from-amber-500/18 via-yellow-500/12 to-orange-500/14",
    text: "text-amber-950 dark:text-amber-50",
  },
  "consistency-discipline": {
    border: "border-emerald-500/40",
    bg: "from-emerald-500/16 via-teal-500/10 to-green-500/12",
    text: "text-emerald-950 dark:text-emerald-50",
  },
  "knowledge-skills": {
    border: "border-violet-500/40",
    bg: "from-violet-500/16 via-indigo-500/10 to-fuchsia-500/12",
    text: "text-violet-950 dark:text-violet-100",
  },
  "community-participation": {
    border: "border-sky-500/40",
    bg: "from-sky-500/16 via-cyan-500/10 to-blue-500/12",
    text: "text-sky-950 dark:text-sky-100",
  },
  "learning-milestones": {
    border: "border-primary/35",
    bg: "from-primary/16 to-primary/10",
    text: "text-primary",
  },
  teacher: {
    border: "border-rose-500/40",
    bg: "from-rose-500/14 via-orange-500/10 to-amber-500/12",
    text: "text-rose-950 dark:text-rose-50",
  },
  "special-exclusive": {
    border: "border-fuchsia-500/45",
    bg: "from-fuchsia-500/18 via-purple-500/12 to-pink-500/14",
    text: "text-fuchsia-950 dark:text-fuchsia-50",
  },
  role: {
    border: "border-amber-500/40",
    bg: "from-amber-500/15 via-amber-400/10 to-orange-500/10",
    text: "text-amber-800 dark:text-amber-200",
  },
};

const ROLE_ICON: Record<string, LucideIcon> = {
  creator: Sparkles,
  "community-bot": Bot,
};

export interface DisplayBadge {
  id: string;
  flashTier: number;
}

export function PlatformBadge({
  badgeId,
  flashTier,
  compact = false,
  className,
}: {
  badgeId: string;
  flashTier?: number;
  compact?: boolean;
  className?: string;
}) {
  const def = getBadgeDefinition(badgeId);
  if (!def) return null;

  const tone = CATEGORY_TONE[def.category] ?? CATEGORY_TONE["learning-milestones"];
  const tier = Math.min(
    5,
    Math.max(1, flashTier ?? BADGE_RARITY_TIER[def.rarity]),
  );
  const RoleIcon = ROLE_ICON[badgeId];

  return (
    <span
      className={cn(
        "merit-badge-flash inline-flex items-center gap-0.5 rounded-md border font-semibold tracking-wide shadow-sm",
        tone.border,
        `bg-gradient-to-r ${tone.bg}`,
        tone.text,
        compact ? "px-1 py-0.5 text-[9px]" : "px-1.5 py-0.5 text-[10px]",
        badgeId === "community-bot" && "community-bot-badge",
        className,
      )}
      data-merit-kind={badgeId}
      data-badge-rarity={def.rarity}
      data-merit-tier={tier}
      title={`${def.label} · ${def.rarity}`}
      aria-label={def.label}
    >
      {RoleIcon ? (
        <RoleIcon className={cn("relative z-[1] shrink-0", compact ? "h-2.5 w-2.5" : "h-3 w-3")} aria-hidden />
      ) : null}
      {badgeId === "creator" || badgeId === "community-bot" ? (
        <BadgeCheck className={cn("relative z-[1] shrink-0", compact ? "h-2.5 w-2.5" : "h-3 w-3")} aria-hidden />
      ) : null}
      <span className="relative z-[1]">{def.label}</span>
    </span>
  );
}

export function badgesFromIds(ids: string[], flashTier = 3): DisplayBadge[] {
  return ids
    .map((id) => (getBadgeDefinition(id) ? { id, flashTier } : null))
    .filter((row): row is DisplayBadge => row != null);
}