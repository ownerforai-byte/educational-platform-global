/**
 * UnderProgressNotice — the platform-wide "under progress" card.
 *
 * Owner request (2026-10-12): wherever a page or section lacks content, say so
 * with a meaningful icon and the exact promise "Under progress — will be added
 * in a future update", instead of leaving an empty area or vague copy. Every
 * lacking surface (topic notes, practice sets, learning packs, routed theorem
 * and derivation pages) speaks the same sentence, so a student always knows
 * the gap is planned work, not a broken page.
 */
import type React from "react";
import { CalendarClock } from "lucide-react";

import { cn } from "@/lib/utils";

export interface UnderProgressNoticeProps {
  /** Defaults to the platform sentence. Keep "Under progress" in the title. */
  title?: string;
  description?: string;
  /** A meaningful icon for the kind of content that is missing. */
  icon?: React.ReactNode;
  className?: string;
}

export function UnderProgressNotice({
  title = "Under progress — will be added in a future update",
  description,
  icon,
  className,
}: UnderProgressNoticeProps) {
  return (
    <div
      role="status"
      data-under-progress="true"
      className={cn(
        "flex items-start gap-3 rounded-2xl border border-dashed border-sky-500/40 bg-sky-500/5 px-5 py-4",
        className,
      )}
    >
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-500/15 text-sky-600 dark:text-sky-400">
        {icon ?? <CalendarClock className="h-4 w-4" />}
      </span>
      <div className="space-y-0.5">
        <p className="text-sm font-bold text-foreground">{title}</p>
        {description ? (
          <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
        ) : null}
      </div>
    </div>
  );
}
