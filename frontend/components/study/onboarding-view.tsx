"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DAILY_MINUTES_OPTIONS,
  listGoalSubjects,
  type StudyGoals,
} from "@/lib/study-goals";
import { useStudyGoals } from "./use-study-goals";
import { GuestGoalsPrompt } from "./guest-goals-prompt";

/** /onboarding: goal setup, saved on this device through lib/study-goals. */
export function OnboardingView() {
  const router = useRouter();
  const { goals, ready, save, guest, adoptGuest, dropGuest, dismissGuest } = useStudyGoals();
  const [draft, setDraft] = useState<StudyGoals>(goals);
  const subjects = listGoalSubjects();

  useEffect(() => {
    if (ready) setDraft(goals);
  }, [ready, goals]);

  const toggle = (key: string) =>
    setDraft((d) => ({
      ...d,
      subjects: d.subjects.includes(key) ? d.subjects.filter((s) => s !== key) : [...d.subjects, key],
    }));

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    save({ ...draft, onboarded: true });
    router.push("/dashboard");
  };

  return (
    <form onSubmit={submit} className="container max-w-3xl py-8 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Set your study goals</h1>
        <p className="text-sm text-muted-foreground">
          Saved on this device only. You can change everything later in Settings.
        </p>
      </div>

      <GuestGoalsPrompt guest={guest} onTransfer={adoptGuest} onDiscard={dropGuest} onLater={dismissGuest} />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Subjects</CardTitle>
          <CardDescription>Pick what you are studying.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2 sm:grid-cols-2">
          {subjects.map((s) => (
            <label key={s.key} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={draft.subjects.includes(s.key)}
                onChange={() => toggle(s.key)}
              />
              {s.subjectName} <span className="text-muted-foreground">({s.className})</span>
            </label>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-3">
          <div className="space-y-1">
            <Label htmlFor="exam-date">Exam date</Label>
            <Input
              id="exam-date"
              type="date"
              value={draft.examDate ?? ""}
              onChange={(e) => setDraft((d) => ({ ...d, examDate: e.target.value || null }))}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="target">Target %</Label>
            <Input
              id="target"
              type="number"
              min={0}
              max={100}
              value={draft.targetPercent ?? ""}
              onChange={(e) =>
                setDraft((d) => ({ ...d, targetPercent: e.target.value === "" ? null : Number(e.target.value) }))
              }
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="minutes">Daily study time</Label>
            <select
              id="minutes"
              className="h-9 w-full rounded-md border bg-background px-2 text-sm"
              value={draft.dailyMinutes}
              onChange={(e) => setDraft((d) => ({ ...d, dailyMinutes: Number(e.target.value) }))}
            >
              {DAILY_MINUTES_OPTIONS.map((m) => (
                <option key={m} value={m}>
                  {m} minutes
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      <Button type="submit">Save and open dashboard</Button>
    </form>
  );
}
