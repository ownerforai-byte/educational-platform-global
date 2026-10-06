"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CircleDashed,
  Compass,
  PlayCircle,
} from "lucide-react";

import { getProgress } from "@/lib/api/progress";
import { entryStatus, summarizeJourney, topicHref } from "@/lib/progress/catalog";
import type { JourneySummary } from "@/lib/progress/catalog";
import type { ProgressEntry } from "@/types/api";

/**
 * Home strip for the My Progress journey (owner request 2026-10-06: changes on
 * home, "without losing" anything — this is an addition, every existing
 * section stays where it was).
 *
 * It is the one piece of home that changes with the visitor rather than with
 * the site: a returning student sees how far they have come and can jump
 * straight back into the last topic they opened, a signed-in newcomer is told
 * that opening a topic is all it takes, and a guest gets the sign-in door.
 * Everything degrades to `null` if the API is unreachable — the strip must
 * never push the sections below it around or turn into an error box on the
 * front page.
 */
type JourneyState =
  | { kind: "loading" }
  | { kind: "guest" }
  | { kind: "unavailable" }
  | { kind: "ready"; summary: JourneySummary; recent: ProgressEntry[] };

/** At most three, most recently studied first. */
function pickRecent(entries: ProgressEntry[]): ProgressEntry[] {
  return entries
    .filter((entry) => entryStatus(entry) !== "not_started" && entry.lastViewedAt)
    .sort((a, b) => String(b.lastViewedAt).localeCompare(String(a.lastViewedAt)))
    .slice(0, 3);
}

function Skeleton() {
  return (
    <section
      aria-label="Your learning journey"
      aria-busy="true"
      className="border-b border-border/60 py-8"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="h-28 animate-pulse rounded-2xl border border-border/60 bg-card/60" />
      </div>
    </section>
  );
}

export function HomeJourneyStrip() {
  const [state, setState] = useState<JourneyState>({ kind: "loading" });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const entries = await getProgress();
        if (cancelled) return;
        setState({
          kind: "ready",
          summary: summarizeJourney(entries),
          recent: pickRecent(entries),
        });
      } catch (error) {
        if (cancelled) return;
        const failure = error as { status?: number; code?: string } | null;
        // Guest: the door, not an error. Anything else: leave the page alone.
        const isGuest =
          failure?.status === 401 || failure?.code === "UNAUTHORIZED";
        setState(isGuest ? { kind: "guest" } : { kind: "unavailable" });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (state.kind === "unavailable") return null;
  if (state.kind === "loading") return <Skeleton />;

  return (
    <section
      aria-label="Your learning journey"
      className="border-b border-border/60 py-8"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="rounded-2xl border border-border/60 bg-card/60 p-5 shadow-sm backdrop-blur-md sm:p-6">
          {state.kind === "guest" ? (
            /* ── Guest ─────────────────────────────────────────────── */
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Compass className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-sm font-bold text-foreground">
                    Your journey starts with one topic
                  </h2>
                  <p className="mt-1 max-w-xl text-xs leading-relaxed text-muted-foreground">
                    Open any topic and it records itself — started the moment
                    you read it, completed when you say so, and never
                    un-completed by a later visit. Progress is kept per account.
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href="/login?next=/"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
                >
                  Sign in to start
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/progress"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-border/70 px-4 py-2 text-xs font-semibold text-foreground/80 transition-colors hover:border-primary/40 hover:text-primary"
                >
                  How it works
                </Link>
              </div>
            </div>
          ) : state.summary.completed === 0 &&
            state.summary.inProgress === 0 ? (
            /* ── Signed in, nothing tracked yet. getProgress() always
                 returns the whole syllabus catalogue, so "empty" means every
                 entry is still not_started — never a total of 0. ────────── */
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                <CircleDashed className="h-5 w-5" />
              </span>
              <p className="text-xs leading-relaxed text-muted-foreground">
                No topics yet — open any Class 11 or 12 topic and it lands here
                automatically.
              </p>
            </div>
          ) : (
            /* ── Returning student ────────────────────────────────── */
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              {/* Summary */}
              <div className="lg:w-72">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-sm font-bold text-foreground">
                    Your learning journey
                  </h2>
                  <span className="text-xs font-extrabold text-primary">
                    {state.summary.percent}%
                  </span>
                </div>

                <div
                  role="progressbar"
                  aria-label="Topics completed"
                  aria-valuenow={state.summary.percent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted"
                >
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${state.summary.percent}%` }}
                  />
                </div>

                <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    {state.summary.completed} completed
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <PlayCircle className="h-3.5 w-3.5 text-sky-500" />
                    {state.summary.inProgress} in progress
                  </span>
                  <span>{state.summary.total} topics in all</span>
                </div>
              </div>

              {/* Resume + full view */}
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                {state.recent.length > 0 && (
                  <ul className="flex flex-wrap gap-2">
                    {state.recent.map((entry) => (
                      <li key={entry.id}>
                        <Link
                          href={topicHref(entry)}
                          title={`Continue ${entry.topic?.title ?? entry.topicSlug}`}
                          className="inline-flex max-w-[15rem] items-center gap-1.5 rounded-xl border border-border/60 bg-background/60 px-3 py-2 text-xs font-semibold text-foreground/80 transition-colors hover:border-primary/40 hover:text-primary"
                        >
                          <span className="truncate">
                            {entry.topic?.title ?? entry.topicSlug}
                          </span>
                          <ArrowRight className="h-3 w-3 shrink-0 text-muted-foreground" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

                <Link
                  href="/progress"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
                >
                  Open My Progress
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
