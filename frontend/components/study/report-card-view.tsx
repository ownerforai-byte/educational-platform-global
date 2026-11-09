"use client";

import { useEffect, useState } from "react";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { groupJourney } from "@/lib/progress/catalog";
import { getStreak } from "@/lib/streaks";
import { daysUntilExam, listGoalSubjects } from "@/lib/study-goals";
import { useStudyGoals } from "./use-study-goals";
import { useJourney } from "./use-journey";
import { WeakTopics } from "./weak-topics";

/** /report-card: printable progress snapshot built from the goals, streak and journey readers. */
export function ReportCardView() {
  const { goals } = useStudyGoals();
  const { entries, summary, loading } = useJourney();
  const [streak, setStreak] = useState(0);
  useEffect(() => setStreak(getStreak().count), []);

  const names = new Map(listGoalSubjects().map((s) => [s.key, s.subjectName]));
  const groups = groupJourney(entries).filter(
    (g) => goals.subjects.length === 0 || goals.subjects.includes(`${g.classSlug}/${g.subjectSlug}`),
  );
  const days = daysUntilExam(goals);

  return (
    <div className="container max-w-3xl py-8 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Report card</h1>
          <p className="text-sm text-muted-foreground">
            A printable snapshot of your progress. Use Print and save as PDF to share it.
          </p>
        </div>
        <Button variant="outline" className="print:hidden" onClick={() => window.print()}>
          <Printer className="mr-2 h-4 w-4" /> Print
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Overview</CardTitle>
          <CardDescription>{new Date().toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2 text-sm sm:grid-cols-2">
          <p>Topics completed: {loading ? "…" : summary ? `${summary.completed} of ${summary.total} (${summary.percent}%)` : "unavailable"}</p>
          <p>In progress: {summary ? summary.inProgress : "…"}</p>
          <p>Study streak: {streak} day(s)</p>
          <p>Target: {goals.targetPercent === null ? "not set" : `${goals.targetPercent}%`}</p>
          <p>
            Exam: {goals.examDate ?? "not set"}
            {days !== null && days >= 0 ? ` (${days} days to go)` : ""}
          </p>
          <p>Daily study time: {goals.dailyMinutes} minutes</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">By subject</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          {groups.map((g) => (
            <div key={g.key} className="flex justify-between">
              <span>
                {names.get(g.key) ?? g.subjectName} <span className="text-muted-foreground">({g.className})</span>
              </span>
              <span className="tabular-nums">
                {g.completed} / {g.total}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Weak topics print with the report so the call-out reaches paper. */}
      <WeakTopics variant="report" />
    </div>
  );
}
