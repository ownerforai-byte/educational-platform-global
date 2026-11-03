"use client";

import { useEffect, useState } from "react";
import { getProgress } from "@/lib/api/progress";
import { summarizeJourney, type JourneySummary } from "@/lib/progress/catalog";
import type { ProgressEntry } from "@/types/api";

/** Read-only view of the signed-in student's journey (existing progress API). */
export function useJourney() {
  const [entries, setEntries] = useState<ProgressEntry[]>([]);
  const [summary, setSummary] = useState<JourneySummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getProgress()
      .then((data) => {
        if (cancelled) return;
        setEntries(data);
        setSummary(summarizeJourney(data));
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { entries, summary, loading, failed };
}
