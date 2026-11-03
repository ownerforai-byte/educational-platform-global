"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { DAILY_MINUTES_OPTIONS, type StudyPreferences } from "@/lib/study-goals";
import { useStudyGoals } from "./use-study-goals";
import { GuestGoalsPrompt } from "./guest-goals-prompt";

const TOGGLES: Array<{ key: Exclude<keyof StudyPreferences, "language">; label: string }> = [
  { key: "notifyDailyReminder", label: "Daily study reminder" },
  { key: "notifyStreakAlerts", label: "Streak alerts" },
  { key: "reduceMotion", label: "Reduce motion" },
  { key: "largeText", label: "Larger text" },
];

/** /settings: language, theme, study goals, notifications, accessibility. */
export function SettingsView() {
  const { goals, save, guest, adoptGuest, dropGuest, dismissGuest } = useStudyGoals();
  const prefs = goals.preferences;
  const setPrefs = (patch: Partial<StudyPreferences>) =>
    save({ ...goals, preferences: { ...prefs, ...patch } });

  return (
    <div className="container max-w-3xl py-8 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Saved on this device only.</p>
      </div>

      <GuestGoalsPrompt guest={guest} onTransfer={adoptGuest} onDiscard={dropGuest} onLater={dismissGuest} />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Language and theme</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-4">
          <div className="space-y-1">
            <Label htmlFor="language">Language</Label>
            <select
              id="language"
              className="h-9 rounded-md border bg-background px-2 text-sm"
              value={prefs.language}
              onChange={(e) => setPrefs({ language: e.target.value === "ne" ? "ne" : "en" })}
            >
              <option value="en">English</option>
              <option value="ne">नेपाली</option>
            </select>
          </div>
          <ThemeToggle variant="inline" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Study goals</CardTitle>
          <CardDescription>
            {goals.subjects.length} subject(s) chosen. Change subjects in onboarding.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1">
            <Label htmlFor="exam-date">Exam date</Label>
            <Input
              id="exam-date"
              type="date"
              value={goals.examDate ?? ""}
              onChange={(e) => save({ ...goals, examDate: e.target.value || null })}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="target">Target %</Label>
            <Input
              id="target"
              type="number"
              min={0}
              max={100}
              value={goals.targetPercent ?? ""}
              onChange={(e) =>
                save({ ...goals, targetPercent: e.target.value === "" ? null : Number(e.target.value) })
              }
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="minutes">Daily study time</Label>
            <select
              id="minutes"
              className="h-9 w-full rounded-md border bg-background px-2 text-sm"
              value={goals.dailyMinutes}
              onChange={(e) => save({ ...goals, dailyMinutes: Number(e.target.value) })}
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

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Notifications and accessibility</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {TOGGLES.map((t) => (
            <div key={t.key} className="flex items-center justify-between">
              <Label htmlFor={t.key}>{t.label}</Label>
              <Switch
                id={t.key}
                checked={prefs[t.key]}
                onCheckedChange={(checked) => setPrefs({ [t.key]: checked })}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
