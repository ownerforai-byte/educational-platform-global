"use client";

/**
 * Cohort comparison — the Analytics card that used to say "under progress,
 * the platform does not record an anonymised cohort aggregate yet". It does
 * not need to record one: the leaderboard derives the cohort on read from the
 * same scored sets, and this card shows only what the privacy rule allows —
 * medians and your own percentile. No other student's number or name appears.
 */

import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLeaderboard, type LeaderboardResponse } from "@/lib/api/leaderboard";

export function CohortComparison() {
  const [data, setData] = useState<LeaderboardResponse | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getLeaderboard()
      .then((d) => {
        if (!cancelled) setData(d);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const { cohort, you } = data ?? {};
  const comparable = Boolean(data?.migrated && cohort && cohort.students > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Users className="h-4 w-4" /> Cohort comparison
        </CardTitle>
        <CardDescription>
          Anonymous by design — medians and percentiles only, never another student&apos;s data.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        {failed ? (
          <p className="text-muted-foreground">
            The cohort could not be loaded right now — try again later.
          </p>
        ) : !data || !cohort ? (
          <p className="text-muted-foreground">Comparing with the cohort…</p>
        ) : !comparable ? (
          <p className="text-muted-foreground">
            No scored sets across the platform yet. The comparison appears as soon as students
            finish practice sets.
          </p>
        ) : (
          <dl className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <dt className="text-muted-foreground">Students with scored sets</dt>
              <dd className="font-semibold tabular-nums">{cohort.students}</dd>
            </div>
            {you ? (
              <>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-muted-foreground">Your rank</dt>
                  <dd className="font-semibold tabular-nums">
                    #{you.rank} of {cohort.students}
                    {cohort.yourXpPercentile !== null && (
                      <span className="ml-1.5 text-xs font-medium text-muted-foreground">
                        (outscored {cohort.yourXpPercentile}%)
                      </span>
                    )}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-muted-foreground">Your XP vs cohort median</dt>
                  <dd className="font-semibold tabular-nums">
                    {you.xp.toLocaleString()} vs {cohort.medianXp.toLocaleString()}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-muted-foreground">Your accuracy vs cohort median</dt>
                  <dd className="font-semibold tabular-nums">
                    {you.accuracy}% vs {cohort.medianAccuracy}%
                  </dd>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted-foreground">Cohort medians</dt>
                <dd className="font-semibold tabular-nums">
                  {cohort.medianXp.toLocaleString()} XP · {cohort.medianAccuracy}% accuracy
                </dd>
              </div>
            )}
          </dl>
        )}
      </CardContent>
    </Card>
  );
}
