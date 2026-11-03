"use client";

import { useCallback, useEffect, useState } from "react";
import { DEFAULT_GOALS, readGoals, writeGoals, type StudyGoals } from "@/lib/study-goals";

/** Client hook over lib/study-goals (device-local, hydrated after mount). */
export function useStudyGoals() {
  const [goals, setGoals] = useState<StudyGoals>(DEFAULT_GOALS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setGoals(readGoals());
    setReady(true);
  }, []);

  const save = useCallback((next: StudyGoals) => {
    setGoals(writeGoals(next));
  }, []);

  return { goals, ready, save };
}
