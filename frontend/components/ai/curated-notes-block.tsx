"use client";

/**
 * CURATED NOTES BLOCK (owner 2026-11-09: "add a section — a large block
 * everywhere — where notes are curated by a single button").
 *
 * One prominent block on every AI chat home with exactly ONE control: the
 * button. Tapping it sends Veer the notes-curation request; the reply comes
 * back as compact revision notes (key terms, formulas, common mistakes and a
 * self-check) derived from the student's own progress and quiz history —
 * and it lands in the same framed reply card as every answer, so it can be
 * copied or saved from there.
 */

import { FileText, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/** The one request this button sends — same every time, everywhere. */
export function curateNotesPrompt(subjectName?: string): string {
  return subjectName
    ? `Curate my revision notes for ${subjectName} right now: pick the topics I am weakest in from my progress and quiz history, and write ONE compact revision note per topic — key terms, the formulas or rules, the common mistakes to avoid, and a 3-question self-check. Keep it tight and exam-focused.`
    : "Curate my revision notes right now: look at my progress and quiz history, pick my weakest topics across subjects, and write ONE compact revision note per topic — key terms, the formulas or rules, the common mistakes to avoid, and a 3-question self-check. Keep it tight and exam-focused.";
}

export function CuratedNotesBlock({
  onCurate,
  subjectName,
  variant = "default",
  className,
}: {
  /** Sends the curation request into the chat (the reply IS the note). */
  onCurate: (prompt: string) => void;
  /** Places the request on one subject instead of the whole syllabus. */
  subjectName?: string;
  /** "compact" for small surfaces (the widget). */
  variant?: "default" | "compact";
  className?: string;
}) {
  const compact = variant === "compact";

  return (
    <section
      aria-label="Curated notes"
      className={cn(
        "relative overflow-hidden rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/[0.10] via-card to-violet-500/[0.06]",
        compact ? "p-4" : "p-5 sm:p-6",
        className,
      )}
    >
      {/* Quiet file-stack decoration — same depth trick as the tier heroes. */}
      <FileText
        className="pointer-events-none absolute -bottom-4 -right-3 h-24 w-24 text-primary/[0.07]"
        aria-hidden="true"
      />

      <div
        className={cn(
          "relative flex items-start gap-4",
          compact ? "flex-col sm:flex-row sm:items-center" : "flex-col sm:flex-row sm:items-center sm:justify-between",
        )}
      >
        <div className="min-w-0">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.15em] text-primary">
            <Sparkles className="h-2.5 w-2.5" aria-hidden="true" />
            One tap
          </span>
          <h3
            className={cn(
              "mt-2 font-extrabold tracking-tight text-foreground",
              compact ? "text-[15px]" : "text-lg sm:text-xl",
            )}
          >
            Curated notes, assembled for you
          </h3>
          <p className="mt-1 max-w-xl text-[11px] leading-relaxed text-muted-foreground sm:text-[13px]">
            Veer reads your progress and quiz history and writes one compact
            revision note per weak topic — key terms, formulas, common mistakes
            and a quick self-check.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onCurate(curateNotesPrompt(subjectName))}
          className={cn(
            "inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-violet-500 font-bold text-primary-foreground shadow-md shadow-primary/25 transition hover:shadow-lg hover:shadow-primary/35 hover:-translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            compact ? "mt-3 w-full px-4 py-2.5 text-[13px] sm:mt-0 sm:w-auto" : "mt-4 w-full px-6 py-3 text-sm sm:mt-0 sm:w-auto",
          )}
        >
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          Curate my notes
        </button>
      </div>
    </section>
  );
}
