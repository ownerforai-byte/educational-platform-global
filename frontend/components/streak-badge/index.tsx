"use client";

import { useEffect, useState } from "react";
import { getStreak, markCheckIn, streakLabel } from "@/lib/streaks";
import { pushNotification } from "@/lib/notifications";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

export function StreakBadge({ compact = false }: { compact?: boolean }) {
  const [state, setState] = useState(getStreak());

  useEffect(() => {
    const before = getStreak();
    const fresh = markCheckIn();
    setState(fresh);
    // One real alert per day at most: the id is the check-in date, so a
    // remount (or another StreakBadge instance) updates instead of piling on.
    if (fresh.count > before.count && fresh.lastCheckIn) {
      pushNotification({
        id: `streak-${fresh.lastCheckIn}`,
        category: "account",
        title: `${fresh.count}-day study streak`,
        body: `Your daily check-in is recorded. Keep the streak alive by studying again tomorrow.`,
        href: "/streaks",
        actionLabel: "View streak",
      });
    }
  }, []);

  if (compact) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 text-xs font-semibold tabular-nums",
          state.count > 0 ? "text-orange-500" : "text-muted-foreground"
        )}
        title={streakLabel(state.count)}
      >
        <Flame className={cn("h-3.5 w-3.5", state.count > 0 && "animate-pulse")} />
        {state.count > 0 ? state.count : ""}
      </span>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-xl border px-3 py-2",
        state.count > 0
          ? "border-orange-200 bg-orange-50 dark:border-orange-900/40 dark:bg-orange-950/20"
          : "border-border bg-muted/30"
      )}
    >
      <Flame
        className={cn(
          "h-5 w-5 shrink-0",
          state.count > 0 ? "text-orange-500 animate-pulse" : "text-muted-foreground"
        )}
      />
      <div className="min-w-0">
        <p className={cn("text-xs font-semibold tabular-nums", state.count > 0 ? "text-orange-600 dark:text-orange-400" : "text-muted-foreground")}>
          {streakLabel(state.count)}
        </p>
        <p className="text-[10px] text-muted-foreground">
          {state.count > 0 ? `${state.count} day${state.count > 1 ? "s" : ""} in a row` : "Check in daily to build your streak"}
        </p>
      </div>
    </div>
  );
}
