"use client";

/**
 * ActivityJourney — the five actions that make a 3D activity part of the study
 * flow instead of a dead end (plan.md Phase 4):
 *
 *   See it in 3D  → this activity (linked from the topic note)
 *   Open full lab → `/lab/<slug>` (canonical activity URL)
 *   Check understanding → the existing practice surface (`/pyqs`)
 *   Ask Veer about this → the existing tutor, pre-filled with the topic
 *   Next topic / Back to notes → `lib/syllabus.ts` order, not a second ordering
 *
 * It also records the visit so `/lab` can offer "Continue where you left off".
 * Nothing here duplicates a question bank, a note renderer or a syllabus order.
 */

import { useEffect, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Brain,
  ExternalLink,
  MessageCircle,
} from "lucide-react";

import { activityHref, type LabActivity } from "@/lib/lab-manifest";
import { recordLabVisit } from "@/lib/lab-progress";
import { nextTopic, topicHref } from "@/lib/syllabus-neighbors";

const linkClass =
  "inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-border/60 bg-card px-3 text-xs font-bold text-foreground transition-colors hover:bg-muted";
const primaryClass =
  "inline-flex min-h-10 items-center gap-1.5 rounded-xl bg-sky-600 px-3 text-xs font-bold text-white";

export function ActivityJourney({
  activity,
  variant = "compact",
}: {
  activity: LabActivity;
  /** `compact` sits inside a note; `full` heads the activity page. */
  variant?: "compact" | "full";
}) {
  const topic = activity.topicSlugs[0];

  useEffect(() => {
    recordLabVisit({
      slug: activity.slug,
      title: activity.title,
      subject: activity.curriculum.subject,
    });
  }, [activity.slug, activity.title, activity.curriculum.subject]);

  const next = useMemo(
    () =>
      topic
        ? nextTopic(
            activity.curriculum.classSlug,
            activity.curriculum.subject,
            activity.curriculum.unitId,
            topic,
          )
        : null,
    [activity.curriculum, topic],
  );

  const askHref = `/chat?q=${encodeURIComponent(
    `Explain ${activity.title} for NEB ${activity.curriculum.classSlug.includes("11") ? "Class 11" : "Class 12"} ${
      activity.curriculum.subject
    }, then give me one solved example.`,
  )}`;

  return (
    <nav
      aria-label={`Study actions for ${activity.title}`}
      data-testid="activity-journey"
      className={`flex flex-wrap items-center gap-2 ${variant === "full" ? "py-2" : ""}`}
    >
      {variant === "compact" && (
        <Link href={activityHref(activity.id)} className={primaryClass}>
          <ExternalLink className="h-3.5 w-3.5" /> Open full lab
        </Link>
      )}

      {activity.practiceHref && (
        <Link href={activity.practiceHref} className={linkClass}>
          <Brain className="h-3.5 w-3.5" /> Check understanding
        </Link>
      )}

      <Link href={askHref} className={linkClass}>
        <MessageCircle className="h-3.5 w-3.5" /> Ask Veer about this
      </Link>

      <Link href={activity.relatedNotesHref} className={linkClass}>
        <BookOpen className="h-3.5 w-3.5" /> {variant === "full" ? "Back to notes" : "Notes"}
      </Link>

      {next && (
        <Link href={topicHref(next)} className={linkClass}>
          Next topic <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      )}

      {variant === "full" && (
        <Link href="/lab/3d" className={linkClass}>
          <ArrowLeft className="h-3.5 w-3.5" /> All 3D labs
        </Link>
      )}
    </nav>
  );
}
