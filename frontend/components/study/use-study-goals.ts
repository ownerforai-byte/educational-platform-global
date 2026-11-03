"use client";

import { useCallback, useEffect, useState } from "react";
import {
  DEFAULT_GOALS,
  accountHasGoals,
  discardGuestGoals,
  findGuestGoals,
  readGoals,
  transferGuestGoals,
  writeGoals,
  type StudyGoals,
} from "@/lib/study-goals";

/** Client hook over lib/study-goals (device-local, hydrated after mount). */
export function useStudyGoals() {
  const [goals, setGoals] = useState<StudyGoals>(DEFAULT_GOALS);
  const [ready, setReady] = useState(false);
  const [guest, setGuest] = useState<{ goals: StudyGoals; replaces: boolean } | null>(null);

  useEffect(() => {
    setGoals(readGoals());
    const found = findGuestGoals();
    setGuest(found ? { goals: found, replaces: accountHasGoals() } : null);
    setReady(true);
  }, []);

  const save = useCallback((next: StudyGoals) => {
    setGoals(writeGoals(next));
  }, []);

  /** Explicitly confirmed by the student (the prompt states any replacement). */
  const adoptGuest = useCallback(() => {
    const moved = transferGuestGoals();
    if (moved) setGoals(moved);
    setGuest(null);
  }, []);

  const dropGuest = useCallback(() => {
    discardGuestGoals();
    setGuest(null);
  }, []);

  return { goals, ready, save, guest, adoptGuest, dropGuest, dismissGuest: () => setGuest(null) };
}
