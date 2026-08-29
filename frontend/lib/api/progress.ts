import { apiFetch } from "../api-client";
import type { ProgressEntry, ProgressUpdateRequest } from "../../types/api";

/**
 * Get the current user's progress across all topics.
 */
export async function getProgress(): Promise<ProgressEntry[]> {
  return apiFetch<ProgressEntry[]>("/api/progress");
}

/**
 * Update progress for a specific topic.
 */
export async function updateProgress(
  data: ProgressUpdateRequest
): Promise<ProgressEntry> {
  return apiFetch<ProgressEntry>("/api/progress", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
