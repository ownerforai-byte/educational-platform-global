"use client";

/**
 * CURATED NOTES BLOCK — the ONE home of the one-tap notes curation
 * (owner 2026-11-09: "curate my notes — keep it in all chapter as content
 * tabs and remove from all ai"; later the same day: "wire it only with agnes
 * api key without exposing anywhere, simply the ai behind 'curate my notes'
 * is agnes working with agnes api key", "make it conscious like it knows the
 * place and make notes according to place like 20-80 notes bullet points").
 *
 * ONE control. Tapping it calls the backend's Agnes endpoint
 * (`POST /api/ai/curate-notes`) with WHERE this block stands — class,
 * subject, chapter, topic — and renders the returned 20–80 exam-focused
 * bullets right here. Agnes is reached server-side with AGNES_API_KEY; no
 * key material exists in this file or the frontend bundle, by design.
 */

import { useState } from "react";
import { AlertCircle, Check, Copy, FileText, Loader2, RefreshCw, Sparkles } from "lucide-react";

import {
  curateNotes,
  type CuratePlace,
  type CuratedNotes,
} from "@/lib/api/curate-notes";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "done" | "error";

function placeTitle(place: CuratePlace): string {
  return (
    [place.topic, place.chapter, place.subject, place.classLevel]
      .filter(Boolean)
      .join(" · ") || "your syllabus"
  );
}

export function CuratedNotesBlock({
  place,
  variant = "default",
  className,
}: {
  /** WHERE this block stands — Agnes writes notes for exactly this place. */
  place: CuratePlace;
  /** "compact" for small surfaces. */
  variant?: "default" | "compact";
  className?: string;
}) {
  const compact = variant === "compact";
  const [status, setStatus] = useState<Status>("idle");
  const [notes, setNotes] = useState<CuratedNotes | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const run = async () => {
    setStatus("loading");
    setError("");
    try {
      const result = await curateNotes(place);
      setNotes(result);
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not curate notes.");
      setStatus("error");
    }
  };

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
            Curated by Agnes
          </span>
          <h3
            className={cn(
              "mt-2 font-extrabold tracking-tight text-foreground",
              compact ? "text-[15px]" : "text-lg sm:text-xl",
            )}
          >
            Curated notes for {placeTitle(place)}
          </h3>
          <p className="mt-1 max-w-xl text-[11px] leading-relaxed text-muted-foreground sm:text-[13px]">
            One tap — Agnes writes 20–80 exam-focused bullets for exactly this
            place: key terms, formulas, common mistakes and quick checks.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void run()}
          disabled={status === "loading"}
          className={cn(
            "inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-violet-500 font-bold text-primary-foreground shadow-md shadow-primary/25 transition hover:shadow-lg hover:shadow-primary/35 hover:-translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60",
            compact ? "mt-3 w-full px-4 py-2.5 text-[13px] sm:mt-0 sm:w-auto" : "mt-4 w-full px-6 py-3 text-sm sm:mt-0 sm:w-auto",
          )}
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Curating…
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Curate my notes
            </>
          )}
        </button>
      </div>

      {/* Honest error (Agnes key missing on the deployment, upstream hiccup) */}
      {status === "error" && (
        <div className="relative mt-4 flex items-start gap-2.5 rounded-xl border-2 border-destructive/30 bg-destructive/[0.06] p-3.5">
          <AlertCircle className="h-4 w-4 shrink-0 text-destructive" aria-hidden="true" />
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-destructive">Curated notes unavailable</p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">{error}</p>
            <button
              type="button"
              onClick={() => void run()}
              className="mt-2 inline-flex items-center gap-1.5 rounded-lg border-2 border-border/80 bg-card px-3 py-1.5 text-[11px] font-semibold text-foreground hover:border-primary/40"
            >
              <RefreshCw className="h-3 w-3" aria-hidden="true" /> Try again
            </button>
          </div>
        </div>
      )}

      {/* The notes themselves — 20–80 bullets, grouped by Agnes */}
      {status === "done" && notes && (
        <div className="relative mt-4 rounded-xl border-2 border-border/80 bg-card">
          <div className="flex items-center justify-between gap-3 border-b border-border/60 px-4 py-2.5">
            <p className="min-w-0 truncate text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
              {notes.title} · {notes.bulletCount} bullets
            </p>
            <div className="flex shrink-0 items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  const text = notes.sections
                    .map((s) => `## ${s.heading}\n${s.bullets.map((b) => `- ${b}`).join("\n")}`)
                    .join("\n\n");
                  void navigator.clipboard?.writeText(text).then(() => {
                    setCopied(true);
                    window.setTimeout(() => setCopied(false), 1600);
                  });
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border-2 border-border/80 bg-background px-2.5 py-1.5 text-[11px] font-semibold text-foreground hover:border-primary/40"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 text-primary" aria-hidden="true" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" aria-hidden="true" /> Copy
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => void run()}
                className="inline-flex items-center gap-1.5 rounded-lg border-2 border-border/80 bg-background px-2.5 py-1.5 text-[11px] font-semibold text-foreground hover:border-primary/40"
              >
                <RefreshCw className="h-3 w-3" aria-hidden="true" /> Curate again
              </button>
            </div>
          </div>
          <div className="max-h-80 overflow-y-auto p-4">
            {notes.sections.map((section) => (
              <div key={section.heading} className="mb-3.5 last:mb-0">
                <h4 className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
                  {section.heading}
                </h4>
                <ul className="mt-1.5 space-y-1.5">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-[13px] leading-relaxed text-foreground">
                      <span
                        aria-hidden="true"
                        className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60"
                      />
                      <span className="min-w-0">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
