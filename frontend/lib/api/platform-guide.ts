import { apiFetch } from "../api-client";

export interface PlatformGuideUserContext {
  plan?: string;
  subjects?: string[];
  examDate?: string | null;
  targetPercent?: number | null;
  dailyMinutes?: number | null;
  completedTopics?: number;
  inProgressTopics?: number;
  notStartedTopics?: number;
  streakDays?: number;
  weeklyAccuracy?: number | null;
  habits?: string[];
}

export function postPlatformGuideMessage(
  message: string,
  userContext?: PlatformGuideUserContext,
): Promise<{ reply: string }> {
  return apiFetch<{ reply: string; provider?: string }>("/api/ai/platform-guide", {
    method: "POST",
    body: JSON.stringify({ message, userContext }),
  });
}
