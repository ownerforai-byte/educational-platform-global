"use client";

import { useEffect, useMemo, useState } from "react";
import { getLeaderboard } from "@/lib/api/leaderboard";
import { useLiveStats } from "@/lib/hooks/use-live-stats";
import { useStreakCount } from "@/lib/hooks/use-streak";
import { getMyProfile } from "@/lib/api/profile";
import { readAssignedBadgeIds, resolveProfileBadges } from "./resolve-profile-badges";
import type { DisplayBadge } from "./platform-badge";

export function useProfileBadges(): {
  badges: DisplayBadge[];
  loading: boolean;
} {
  const stats = useLiveStats();
  const streak = useStreakCount();
  const [rank, setRank] = useState<number | null | undefined>(undefined);
  const [assignedIds, setAssignedIds] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;
    Promise.allSettled([getLeaderboard("all"), getMyProfile()]).then(([board, profile]) => {
      if (cancelled) return;
      if (board.status === "fulfilled") setRank(board.value.you?.rank ?? null);
      else setRank(null);
      if (profile.status === "fulfilled") {
        setAssignedIds(readAssignedBadgeIds(profile.value.profile.extras));
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const badges = useMemo(() => {
    if (stats.loading || rank === undefined) return [];
    return resolveProfileBadges({
      quizRows: stats.quizRows,
      rank,
      streak,
      topicsCompleted: stats.completedTopics,
      percentSyllabus: stats.overallProgressPercent,
      assignedIds,
    });
  }, [stats.loading, stats.quizRows, stats.completedTopics, stats.overallProgressPercent, rank, streak, assignedIds]);

  return { badges, loading: stats.loading || rank === undefined };
}