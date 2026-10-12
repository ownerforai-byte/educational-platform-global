"use client";

import { Lightbulb } from "lucide-react";

/**
 * FLOATING IDEA CHIPS (owner request 2026-10-12: "ideas float on screen when
 * typing starts and hide when typing off").
 *
 * A slim row of quick idea chips floats in above the composer the moment the
 * student starts writing, and fades back out as soon as the input empties.
 * Each chip is a short finishing touch — an analogy, a derivation, exam
 * framing — appended to what is already typed, so an idea extends the
 * question instead of replacing it.
 *
 * Purely presentational and safe to mount on both chat surfaces (tutor
 * console and the Veer room): hidden rows are `aria-hidden` and
 * pointer-events-none, so they never intercept clicks or tab focus.
 */

export const COMPOSER_IDEAS: string[] = [
  "explain with a simple analogy",
  "show the step-by-step derivation",
  "answer it like an exam question",
  "list the common mistakes",
  "add a worked numerical example",
  "summarise in 5 points",
  "quiz me on this next",
  "explain in Nepali",
];

export function FloatingIdeaChips({
  visible,
  ideas = COMPOSER_IDEAS,
  onPick,
  className = "",
}: {
  /** True while the student is typing; false fades the row out and disables it. */
  visible: boolean;
  ideas?: string[];
  /** Receives the chip's text; the composer appends it to the current draft. */
  onPick: (idea: string) => void;
  className?: string;
}) {
  return (
    <div
      aria-hidden={!visible}
      className={[
        "pointer-events-none flex flex-wrap items-center gap-1.5 overflow-hidden transition-all duration-300",
        visible
          ? "mb-2 max-h-24 opacity-100 translate-y-0"
          : "mb-0 max-h-0 opacity-0 translate-y-2",
        className,
      ].join(" ")}
    >
      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        <Lightbulb className="h-3 w-3" />
        Ideas
      </span>
      {ideas.map((idea) => (
        <button
          key={idea}
          type="button"
          tabIndex={visible ? 0 : -1}
          onClick={() => onPick(idea)}
          className={[
            "pointer-events-auto rounded-full border border-border/70 bg-muted/20 px-2.5 py-1 text-[11px] font-medium text-muted-foreground",
            "transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-primary",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
            visible ? "" : "invisible",
          ].join(" ")}
        >
          {idea}
        </button>
      ))}
    </div>
  );
}
