import { COMMUNITY_CATEGORIES } from "@/lib/api/community-feed";
import { cn } from "@/lib/utils";

const motionEase =
  "duration-250 ease-out motion-reduce:transition-none motion-reduce:transform-none";

export const surfaceCard = cn(
  "rounded-2xl border border-border/80 bg-card shadow-sm shadow-black/[0.04]",
  motionEase,
  "transition-[transform,box-shadow,border-color]",
  "motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md motion-safe:hover:shadow-primary/[0.06]",
  "motion-safe:hover:border-border",
);

/** Cards that must not lift (loading shells, dashed empties). */
export const surfaceCardFlat = cn(
  "rounded-2xl border border-border/80 bg-card shadow-sm",
  motionEase,
  "transition-shadow",
);

export const glassShell = cn(
  surfaceCardFlat,
  "border-border/70 bg-card/85 backdrop-blur-md",
  "supports-[backdrop-filter]:bg-card/75",
  "motion-safe:hover:translate-y-0 motion-safe:hover:shadow-sm",
);

export const composerShell = cn(
  glassShell,
  "ring-1 ring-border/50 motion-safe:focus-within:ring-primary/25 motion-safe:focus-within:border-primary/30",
);

export const emptyStatePanel = cn(
  surfaceCardFlat,
  "border-dashed bg-gradient-to-b from-primary/[0.04] via-transparent to-muted/15",
  "motion-safe:hover:translate-y-0 motion-safe:hover:shadow-none",
);

export const inputClass =
  "w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors duration-200 ease-out focus-visible:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary/25";

export const chipBtn = cn(
  "inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-border/80 bg-background px-3 py-1.5 text-xs font-semibold text-muted-foreground",
  motionEase,
  "transition-[colors,transform,box-shadow,border-color]",
  "hover:border-primary/40 hover:bg-muted/50 hover:text-foreground",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  "motion-safe:active:scale-[0.97]",
);

export const toolbarBtn = cn(
  "inline-flex min-h-11 items-center gap-1 rounded-lg border border-border/80 bg-background px-2.5 py-1.5 text-xs font-semibold text-muted-foreground",
  motionEase,
  "transition-[colors,transform,border-color]",
  "hover:border-primary/40 hover:text-foreground",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  "active:border-primary/50 active:bg-primary/10 active:text-primary",
  "motion-safe:active:scale-[0.96]",
);

export const actionBtn = cn(
  "inline-flex min-h-11 min-w-11 items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-medium",
  motionEase,
  "transition-[colors,transform,background-color]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  "[&_svg]:transition-colors [&_svg]:duration-200",
  "motion-safe:active:scale-95",
);

export const primaryCta = cn(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground",
  "shadow-sm shadow-primary/25",
  motionEase,
  "transition-[background-color,transform,box-shadow]",
  "hover:bg-primary/90 motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.98]",
  "disabled:pointer-events-none disabled:opacity-60",
);

export const ghostLink =
  "inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors duration-200 hover:text-primary/80 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md";

export function categoryLabel(id: string): string {
  return COMMUNITY_CATEGORIES.find((item) => item.id === id)?.label ?? id;
}

export function planLabel(plan: string | null | undefined): string {
  if (!plan) return "Member";
  return plan.charAt(0).toUpperCase() + plan.slice(1);
}

export function chipActive(active: boolean): string {
  return cn(
    active && "border-primary/40 bg-primary/5 text-foreground shadow-sm shadow-primary/10",
  );
}

export function chipCopied(active: boolean): string {
  return cn(
    active &&
      "border-primary/45 bg-primary/10 text-primary shadow-sm shadow-primary/15 motion-safe:animate-pulse motion-reduce:animate-none",
  );
}

export function assistantPanel(): string {
  return cn(
    surfaceCard,
    "border-primary/30 bg-gradient-to-br from-primary/[0.07] via-card to-card",
    "shadow-md shadow-primary/10 ring-1 ring-primary/15",
    "motion-safe:hover:translate-y-0",
  );
}
