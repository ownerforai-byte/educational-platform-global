import { apiFetch } from "@/lib/api-client";

/**
 * The XP leaderboard payload.
 *
 * Everything ranking-related is computed on the server (`backend/src/utils/xp.ts`)
 * so the UI can never disagree with the ranking it is displaying. The `rule`
 * block is returned with the data for exactly that reason: the "how XP works"
 * card prints the server's numbers, not a copy of them.
 */

export interface LeaderboardEntry {
  rank: number;
  /** Already masked server-side ("Aarav S.") — there is no raw name here. */
  name: string;
  xp: number;
  accuracy: number;
  answered: number;
  sets: number;
  isYou: boolean;
}

export interface LeaderboardYou {
  rank: number;
  xp: number;
  accuracy: number;
  answered: number;
  correct: number;
  sets: number;
  inTopList: boolean;
  /** XP between you and the student directly above (0 when you lead). */
  gapToNext: number;
  nextName: string | null;
}

export interface LeaderboardRule {
  correctChoice: number;
  wrongChoice: number;
  writingPerQuestion: number;
  writingWeakMultiplier: number;
  writingWeakBelowPct: number;
  bonus: { at80: number; at60: number; at40: number };
}

export interface LeaderboardResponse {
  entries: LeaderboardEntry[];
  you: LeaderboardYou | null;
  totals: { students: number; sets: number };
  rule: LeaderboardRule;
  mode: string;
  /** false → the quiz-history table has not been migrated yet. */
  migrated: boolean;
  /** false → the server could not read the set format; every set is scored as choice. */
  formatKnown: boolean;
}

export async function getLeaderboard(): Promise<LeaderboardResponse> {
  return apiFetch<LeaderboardResponse>("/api/leaderboard");
}
