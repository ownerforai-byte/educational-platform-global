"use client";

/**
 * ManifestHubSection — the manifest half of the single 3D hub (`/lab/3d`).
 *
 * The hub already groups `LAB_REGISTRY` by syllabus unit; this section adds the
 * filters the roadmap requires (subject comes from the page tabs, plus kind and
 * "has practice") and the "Continue where you left off" entry, both driven by the
 * activity manifest rather than a fourth catalog.
 */

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Play } from "lucide-react";

import {
  activityHref,
  listOfferedActivities,
  type ActivityKind,
  type LabActivity,
} from "@/lib/lab-manifest";
import { readLabProgress, type LabVisit } from "@/lib/lab-progress";

const KINDS: Array<ActivityKind | "all"> = ["all", "3d-sim", "animation", "theory", "practical"];

function ActivityCard({ activity }: { activity: LabActivity }) {
  return (
    <Link
      href={activityHref(activity.id)}
      className="elev-1 rounded-xl border border-border bg-card p-3 transition-colors hover:border-sky-500/50"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold leading-tight">{activity.title}</p>
        {activity.lifecycle === "pilot" && (
          <span className="shrink-0 rounded-full bg-sky-500/15 px-2 py-0.5 text-[10px] font-bold text-sky-600">
            Pilot
          </span>
        )}
      </div>
      <p className="mt-1 text-[11px] text-muted-foreground">
        {activity.kind} · {activity.curriculum.subject}
        {activity.practiceHref ? " · has practice" : ""}
      </p>
    </Link>
  );
}

export function ManifestHubSection({
  subject,
  initialKind = "all",
  topicSlug,
  unitId,
  limit = 9,
}: {
  subject?: string;
  /** Kind the view opens on — the legacy theory hub opens on `theory`. */
  initialKind?: ActivityKind | "all";
  /** Exact syllabus topic slug. Scopes the section to activities placed on it. */
  topicSlug?: string;
  /** Exact syllabus unit id. Scopes the section to activities placed in it. */
  unitId?: string;
  /** Card cap; `0` renders every match (the scoped legacy views). */
  limit?: number;
}) {
  const [kind, setKind] = useState<ActivityKind | "all">(initialKind);
  const [hasPractice, setHasPractice] = useState(false);
  const [recent, setRecent] = useState<LabVisit[]>([]);

  useEffect(() => {
    setRecent(readLabProgress().slice(0, 3));
  }, []);

  const activities = useMemo(() => {
    const manifestSubject = ["physics", "chemistry", "biology", "mathematics"].includes(
      subject ?? "",
    )
      ? (subject as LabActivity["curriculum"]["subject"])
      : undefined;

    return listOfferedActivities(manifestSubject).filter((activity) => {
      // Scoping is exact only: a topic or unit either places the activity or it
      // does not. No prefix or fuzzy matching, per the manifest rule.
      if (topicSlug && !activity.topicSlugs.includes(topicSlug)) return false;
      if (unitId && activity.curriculum.unitId !== unitId) return false;
      if (kind !== "all" && activity.kind !== kind) return false;
      if (hasPractice && !activity.practiceHref) return false;
      return true;
    });
  }, [subject, kind, hasPractice, topicSlug, unitId]);

  return (
    <section id="manifest" className="space-y-3">
      {recent.length > 0 && (
        <div className="rounded-2xl border border-border/70 bg-muted/10 p-3">
          <p className="mb-2 flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
            <Clock className="h-3.5 w-3.5" /> Continue where you left off
          </p>
          <div className="flex flex-wrap gap-2">
            {recent.map((visit) => (
              <Link
                key={visit.slug}
                href={`/lab/${visit.slug}`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-card px-2.5 py-1.5 text-xs font-medium hover:bg-muted"
              >
                <Play className="h-3 w-3" /> {visit.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <h2 className="mr-2 text-lg font-semibold">All subjects, one manifest</h2>
        <div className="flex gap-1 rounded-xl bg-muted p-1">
          {KINDS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setKind(option)}
              className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
                kind === option
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {option === "all" ? "All kinds" : option}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setHasPractice((value) => !value)}
          aria-pressed={hasPractice}
          className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${
            hasPractice
              ? "border-sky-500/40 bg-sky-500/10 text-sky-600"
              : "border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          Has practice
        </button>
        <span className="text-xs text-muted-foreground">{activities.length} activities</span>
        {initialKind !== "theory" && (
          <Link href="/lab/theory" className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-primary">
            Theory hub <ArrowRight className="h-3 w-3" />
          </Link>
        )}
      </div>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {(limit > 0 ? activities.slice(0, limit) : activities).map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
      {limit > 0 && activities.length > limit && (
        <p className="text-xs text-muted-foreground">
          Showing {limit} of {activities.length}. Use the filters to narrow the manifest.
        </p>
      )}
      {activities.length === 0 && (
        <p className="rounded-xl border border-border/60 bg-muted/10 px-3 py-6 text-center text-xs text-muted-foreground">
          No activity is placed on this {topicSlug ? "topic" : unitId ? "unit" : "filter"} yet.
          The notes page and the full hub still list everything that does exist.
        </p>
      )}
    </section>
  );
}
