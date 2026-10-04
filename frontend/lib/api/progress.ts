import { apiFetch } from "../api-client";
import {
  buildProgressCatalog,
  journeyRowToEntry,
  parseTopicPathId,
} from "../progress/catalog";
import type {
  JourneyRow,
  JourneyTrackStatus,
  ProgressEntry,
  ProgressUpdateRequest,
} from "../../types/api";

/**
 * My Progress client.
 *
 * `GET /api/progress` returns only the topics this user has actually touched
 * (one row per syllabus path, newest activity first). `getProgress()` merges
 * that activity into the full syllabus catalogue so the page always shows the
 * whole journey — never an empty page for a student who has not started yet.
 *
 * Writes go through the same endpoint: opening a topic records `started`,
 * marking it done records `completed`. The server never downgrades a
 * completed topic, so a later view cannot undo the student's work.
 */

/** Journey rows for the signed-in user, most recently studied first. */
export async function getJourney(): Promise<JourneyRow[]> {
  return apiFetch<JourneyRow[]>("/api/progress");
}

export interface JourneyTrackInput {
  classSlug: string;
  subjectSlug: string;
  unitSlug: string;
  topicSlug: string;
  /** Defaults to `"started"` server-side (a fresh topic view). */
  status?: JourneyTrackStatus;
}

/** Record a journey event and return the resulting row. */
export async function trackTopic(input: JourneyTrackInput): Promise<JourneyRow> {
  return apiFetch<JourneyRow>("/api/progress", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

/**
 * Full journey: every syllabus topic with this user's status on it.
 */
export async function getProgress(): Promise<ProgressEntry[]> {
  const rows = await getJourney();
  return buildProgressCatalog(rows);
}

/**
 * Toggle one topic. `topic_id` is the syllabus path id
 * (`class/subject/unit/topic`) produced by the catalogue.
 *
 * Un-checking sends `not_completed` — an explicit intent — rather than a
 * passive `started`, so the server really clears `completedAt` instead of
 * keeping the topic completed (passive views are never allowed to downgrade).
 */
export async function updateProgress(
  data: ProgressUpdateRequest
): Promise<ProgressEntry> {
  const path = parseTopicPathId(data.topic_id);
  if (!path) {
    throw new Error("Unknown topic reference");
  }
  const row = await trackTopic({
    ...path,
    status: data.completed ? "completed" : "not_completed",
  });
  return journeyRowToEntry(row);
}
