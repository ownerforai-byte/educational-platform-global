"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { StudyGoals } from "@/lib/study-goals";

interface Props {
  guest: { goals: StudyGoals; replaces: boolean } | null;
  onTransfer: () => void;
  onDiscard: () => void;
  onLater: () => void;
}

/** Explicit confirmation before goals saved while logged out move to this account. */
export function GuestGoalsPrompt({ guest, onTransfer, onDiscard, onLater }: Props) {
  if (!guest) return null;
  const { goals, replaces } = guest;
  return (
    <Card role="region" aria-label="Goals saved before sign-in">
      <CardHeader>
        <CardTitle className="text-base">Goals saved before you signed in</CardTitle>
        <CardDescription>
          This device has goals saved while logged out ({goals.subjects.length} subject(s)
          {goals.examDate ? `, exam ${goals.examDate}` : ""}). Move them to your account?
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {replaces && (
          <p className="text-sm text-destructive">
            Your account already has saved goals. Moving these will replace them.
          </p>
        )}
        <div className="flex flex-wrap gap-2">
          <Button type="button" onClick={onTransfer}>
            {replaces ? "Replace my account goals" : "Move to my account"}
          </Button>
          <Button type="button" variant="outline" onClick={onDiscard}>
            Discard them
          </Button>
          <Button type="button" variant="ghost" onClick={onLater}>
            Not now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
