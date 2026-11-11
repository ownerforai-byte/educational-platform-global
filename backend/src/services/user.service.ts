import type { JourneyRow } from "../db/repositories/progress.repository.js";
import {
  JOURNEY_COLUMNS,
  findUserJourney,
  insertUserJourney,
  listUserJourney,
  updateUserJourney,
  upsertLegacyUserProgress,
} from "../db/repositories/progress.repository.js";

export interface JourneyDto {
  id: string;
  classSlug: string;
  subjectSlug: string;
  unitSlug: string;
  topicSlug: string;
  status: "started" | "completed";
  startedAt: string;
  lastViewedAt: string;
  viewCount: number;
  completedAt: string | null;
  updatedAt: string;
}

export function mapJourneyRow(row: JourneyRow): JourneyDto {
  return {
    id: row.id,
    classSlug: row.class_slug,
    subjectSlug: row.subject_slug,
    unitSlug: row.unit_slug,
    topicSlug: row.topic_slug,
    status: row.status,
    startedAt: row.started_at,
    lastViewedAt: row.last_viewed_at,
    viewCount: row.view_count ?? 1,
    completedAt: row.completed_at ?? null,
    updatedAt: row.updated_at,
  };
}

export async function getUserJourney(userId: string): Promise<{
  rows: JourneyDto[];
  error: { message: string } | null;
}> {
  const { data, error } = await listUserJourney(userId);
  if (error) return { rows: [], error };
  return { rows: (data ?? []).map(mapJourneyRow), error: null };
}

export interface RecordJourneyInput {
  classSlug: string;
  subjectSlug: string;
  unitSlug: string;
  topicSlug: string;
  status?: "started" | "completed" | "not_completed";
}

export async function recordUserJourney(
  userId: string,
  data: RecordJourneyInput,
): Promise<{ row: JourneyDto | null; error: { message: string } | null }> {
  const requested = data.status ?? "started";
  const explicitUncomplete = requested === "not_completed";
  const now = new Date().toISOString();

  const { data: existing, error: readError } = await findUserJourney(userId, {
    classSlug: data.classSlug,
    subjectSlug: data.subjectSlug,
    unitSlug: data.unitSlug,
    topicSlug: data.topicSlug,
  });

  if (readError) return { row: null, error: readError };

  if (!existing) {
    const status = requested === "completed" ? "completed" : "started";
    const { data: created, error: insertError } = await insertUserJourney({
      user_id: userId,
      class_slug: data.classSlug,
      subject_slug: data.subjectSlug,
      unit_slug: data.unitSlug,
      topic_slug: data.topicSlug,
      status,
      started_at: now,
      last_viewed_at: now,
      view_count: 1,
      completed_at: status === "completed" ? now : null,
      updated_at: now,
    });

    if (insertError) return { row: null, error: insertError };
    return { row: created ? mapJourneyRow(created) : null, error: null };
  }

  const status: "started" | "completed" = explicitUncomplete
    ? "started"
    : requested === "completed" || existing.status === "completed"
      ? "completed"
      : "started";

  const { data: updated, error: updateError } = await updateUserJourney(existing.id, {
    status,
    last_viewed_at: now,
    view_count: (existing.view_count ?? 1) + 1,
    completed_at: status === "completed" ? (existing.completed_at ?? now) : null,
    updated_at: now,
  });

  if (updateError) return { row: null, error: updateError };
  return { row: updated ? mapJourneyRow(updated) : null, error: null };
}

export async function recordLegacyTopicProgress(
  userId: string,
  topicId: string,
  completed: boolean,
): Promise<{ row: Record<string, unknown> | null; error: { message: string } | null }> {
  const isCompleted = completed === true;
  const { data, error } = await upsertLegacyUserProgress({
    user_id: userId,
    topic_id: topicId,
    completed: isCompleted,
    completed_at: isCompleted ? new Date().toISOString() : null,
  });
  return { row: data, error };
}

/** Reserved for response shaping when clients need column lists. */
export const journeySelectColumns = JOURNEY_COLUMNS;
