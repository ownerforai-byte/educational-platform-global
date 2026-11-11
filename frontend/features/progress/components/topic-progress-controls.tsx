"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle, Clock, Loader2 } from "lucide-react";
import { trackTopic } from "@/lib/api/progress";
import { useSession } from "@/features/auth/hooks/use-session";
import type { JourneyStatus, JourneyTrackStatus } from "@/types/api";

export interface TopicProgressControlsProps {
  classSlug: string;
  subjectSlug: string;
  unitSlug: string;
  topicSlug: string;
}

/**
 * Active journey tracking for one syllabus topic.
 *
 * Mounted on the topic workspace, it does two things:
 *  1. **Starts the journey** — opening the topic posts `{status:"started"}`
 *     once, so a topic the student reads shows up as "in progress" on My
 *     Progress without them having to tick anything. The server never
 *     downgrades a completed topic, so re-opening cannot undo their work.
 *  2. **Lets them close it** — a single control flips the row between
 *     completed and in progress (an explicit "I'm done with this").
 *
 * Guests see a sign-in prompt instead of writing: progress is per account.
 */
export function TopicProgressControls({
  classSlug,
  subjectSlug,
  unitSlug,
  topicSlug,
}: TopicProgressControlsProps) {
  const { user, isLoading: sessionLoading } = useSession();
  const [status, setStatus] = useState<JourneyStatus | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // One "started" write per mount — StrictMode's double effect must not
  // double-count the view.
  const startedRef = useRef(false);

  useEffect(() => {
    if (sessionLoading || !user) return;
    if (startedRef.current) return;
    startedRef.current = true;

    let cancelled = false;
    (async () => {
      try {
        const row = await trackTopic({
          classSlug,
          subjectSlug,
          unitSlug,
          topicSlug,
          status: "started",
        });
        if (!cancelled) setStatus(row.status);
      } catch {
        // Tracking must never block reading the topic; the control simply
        // stays idle and the student can still use My Progress.
        if (!cancelled) setError("Progress not saved");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [sessionLoading, user, classSlug, subjectSlug, unitSlug, topicSlug]);

  const persist = async (next: JourneyTrackStatus) => {
    setSaving(true);
    setError(null);
    try {
      const row = await trackTopic({
        classSlug,
        subjectSlug,
        unitSlug,
        topicSlug,
        status: next,
      });
      setStatus(row.status);
    } catch {
      setError("Could not save your progress");
    } finally {
      setSaving(false);
    }
  };

  if (!sessionLoading && !user) {
    return (
      <p className="text-xs text-muted-foreground">
        <Link href="/login" className="font-medium text-primary hover:underline">
          Sign in
        </Link>{" "}
        to track this topic in My Progress.
      </p>
    );
  }

  const completed = status === "completed";

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      {status === null ? (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-muted-foreground">
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Saving progress…
        </span>
      ) : completed ? (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 font-medium text-primary">
          <CheckCircle className="h-3.5 w-3.5" />
          Completed
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-2.5 py-1 font-medium text-amber-600 dark:text-amber-400">
          <Clock className="h-3.5 w-3.5" />
          In progress
        </span>
      )}

      {status !== null && (
        <button
          type="button"
          onClick={() => persist(completed ? "not_completed" : "completed")}
          disabled={saving}
          className="rounded-full border border-border px-2.5 py-1 font-medium transition-colors hover:border-primary hover:text-primary disabled:opacity-60"
        >
          {completed ? "Mark as not completed" : "Mark as completed"}
        </button>
      )}

      {error && <span className="text-destructive">{error}</span>}
    </div>
  );
}
