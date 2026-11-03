"use client";

import { useEffect, useMemo, useState } from "react";
import { Award, Flame } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { evaluateAchievements, nextMilestone } from "@/lib/achievements";
import { getStreak, streakLabel } from "@/lib/streaks";
import { useJourney } from "./use-journey";

/** /streaks: badges, achievements and the next milestone over the streak and journey readers. */
export function StreaksView() {
  const { summary, loading } = useJourney();
  const [streak, setStreak] = useState(0);
  useEffect(() => setStreak(getStreak().count), []);

  const list = useMemo(
    () =>
      evaluateAchievements({
        streak,
        topicsCompleted: summary?.completed ?? 0,
        topicsInProgress: summary?.inProgress ?? 0,
        percent: summary?.percent ?? 0,
      }),
    [streak, summary],
  );
  const next = nextMilestone(list);
  const earned = list.filter((a) => a.earned).length;

  return (
    <div className="container max-w-4xl py-8 space-y-6">
      <div className="space-y-1">
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <Flame className="h-6 w-6" /> Streaks and badges
        </h1>
        <p className="text-sm text-muted-foreground">
          {streakLabel(streak)}. {earned} of {list.length} badges earned.
          {loading && " Loading progress…"}
        </p>
      </div>

      {next && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Next milestone: {next.title}</CardTitle>
            <CardDescription>{next.description} ({next.progress}% there)</CardDescription>
          </CardHeader>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((a) => (
          <Card key={a.id} className={a.earned ? "" : "opacity-60"}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Award className="h-4 w-4" /> {a.title}
              </CardTitle>
              <CardDescription>{a.description}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm">{a.earned ? "Earned" : `${a.progress}%`}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
