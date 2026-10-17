import { DoorOpen } from "lucide-react";

/**
 * VISITOR "EXIT" NOTE (owner request 2026-10-17).
 *
 * A small box at the bottom of the approval-checking screen and the public /
 * non-paid users home. The wording is the owner's own, kept verbatim — it is a
 * candid, slightly blunt aside aimed at visitors who are not ready to commit.
 */
export const VISITOR_EXIT_NOTE =
  "You can exit if you are not down for it, depending on your thoughts --- not mandatory but for the visitor with arrogance. This is not a paid platform, also can be free for you if you pass the test.";

export function VisitorExitNote() {
  return (
    <aside
      data-testid="visitor-exit-note"
      className="rounded-2xl border border-border/70 bg-muted/30 p-4"
    >
      <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
        <DoorOpen className="h-3.5 w-3.5 text-primary" />
        A note for visitors
      </p>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        {VISITOR_EXIT_NOTE}
      </p>
    </aside>
  );
}
