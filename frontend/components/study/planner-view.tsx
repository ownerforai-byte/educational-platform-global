"use client";

import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ComingSoon } from "@/components/content/coming-soon";
import { buildWeeklyPlan, weakTopicsFromJourney } from "@/lib/study-plan";
import { useStudyGoals } from "./use-study-goals";
import { useJourney } from "./use-journey";

/** /planner: weekly plan from goals, exam date and weak topics (progress journey). */
export function PlannerView() {
  const { goals, ready } = useStudyGoals();
  const { entries, loading, failed } = useJourney();

  if (ready && goals.subjects.length === 0) {
    return (
      <ComingSoon
        title="Weekly planner"
        kind="Notes"
        status="Needs your study goals"
        message="Pick your subjects, exam date and daily study time and the planner builds your week."
        backHref="/dashboard"
        backLabel="Dashboard"
      />
    );
  }

  const days = buildWeeklyPlan(goals, weakTopicsFromJourney(entries));

  return (
    <div className="container max-w-4xl py-8 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
            <CalendarDays className="h-6 w-6" /> Weekly planner
          </h1>
          <p className="text-sm text-muted-foreground">
            {goals.dailyMinutes} minutes a day over your subjects, aimed at topics you have not finished.
            {failed ? " Progress is unavailable, so no weak topics are suggested." : ""}
            {loading ? " Loading your progress…" : ""}
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/settings">Edit goals</Link>
        </Button>
      </div>

      {ready && days.length === 0 && (
        <p className="text-sm text-muted-foreground">Your exam date has passed. Update it in Settings to plan again.</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {days.map((day) => (
          <Card key={day.date}>
            <CardHeader>
              <CardTitle className="text-base">
                {new Date(`${day.date}T00:00:00`).toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })}
              </CardTitle>
              <CardDescription>
                {day.daysToExam === 0
                  ? "Exam day"
                  : day.revision
                    ? "Revision day: go over what you know"
                    : day.daysToExam !== null
                      ? `${day.daysToExam} days to the exam`
                      : "Study day"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {day.blocks.map((b) => (
                <div key={b.subjectKey} className="flex justify-between gap-2">
                  <span>
                    <span className="font-medium">{b.subjectName}</span>
                    {b.focus &&
                      (b.focus.href ? (
                        <Link href={b.focus.href} className="ml-1 text-muted-foreground underline">
                          {b.focus.title}
                        </Link>
                      ) : (
                        <span className="ml-1 text-muted-foreground">{b.focus.title}</span>
                      ))}
                  </span>
                  <span className="text-muted-foreground">{b.minutes} min</span>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
