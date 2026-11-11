import { getAdminClient } from "./base.repository.js";

export const JOURNEY_COLUMNS =
  "id, class_slug, subject_slug, unit_slug, topic_slug, status, started_at, last_viewed_at, view_count, completed_at, updated_at";

export interface JourneyRow {
  id: string;
  class_slug: string;
  subject_slug: string;
  unit_slug: string;
  topic_slug: string;
  status: "started" | "completed";
  started_at: string;
  last_viewed_at: string;
  view_count: number | null;
  completed_at: string | null;
  updated_at: string;
}

export async function listUserJourney(userId: string): Promise<{
  data: JourneyRow[] | null;
  error: { message: string } | null;
}> {
  const { data, error } = await getAdminClient()
    .from("user_journey")
    .select(JOURNEY_COLUMNS)
    .eq("user_id", userId)
    .order("last_viewed_at", { ascending: false });
  return { data: (data ?? null) as JourneyRow[] | null, error };
}

export async function findUserJourney(
  userId: string,
  slugs: { classSlug: string; subjectSlug: string; unitSlug: string; topicSlug: string },
): Promise<{
  data: Pick<JourneyRow, "id" | "status" | "completed_at" | "view_count"> | null;
  error: { message: string } | null;
}> {
  const { data, error } = await getAdminClient()
    .from("user_journey")
    .select("id, status, completed_at, view_count")
    .eq("user_id", userId)
    .eq("class_slug", slugs.classSlug)
    .eq("subject_slug", slugs.subjectSlug)
    .eq("unit_slug", slugs.unitSlug)
    .eq("topic_slug", slugs.topicSlug)
    .maybeSingle();
  return { data: data as Pick<JourneyRow, "id" | "status" | "completed_at" | "view_count"> | null, error };
}

export async function insertUserJourney(
  row: Record<string, unknown>,
): Promise<{ data: JourneyRow | null; error: { message: string } | null }> {
  const { data, error } = await getAdminClient()
    .from("user_journey")
    .insert(row)
    .select(JOURNEY_COLUMNS)
    .single();
  return { data: (data ?? null) as JourneyRow | null, error };
}

export async function updateUserJourney(
  journeyId: string,
  patch: Record<string, unknown>,
): Promise<{ data: JourneyRow | null; error: { message: string } | null }> {
  const { data, error } = await getAdminClient()
    .from("user_journey")
    .update(patch)
    .eq("id", journeyId)
    .select(JOURNEY_COLUMNS)
    .single();
  return { data: (data ?? null) as JourneyRow | null, error };
}

export async function upsertLegacyUserProgress(
  row: Record<string, unknown>,
): Promise<{ data: Record<string, unknown> | null; error: { message: string } | null }> {
  const { data, error } = await getAdminClient()
    .from("user_progress")
    .upsert(row, { onConflict: "user_id,topic_id" })
    .select("id, topic_id, completed, completed_at, updated_at")
    .single();
  return { data: (data ?? null) as Record<string, unknown> | null, error };
}

export async function countCompletedTopics(
  userId: string,
  topicIds: string[],
): Promise<number> {
  const { count } = await getAdminClient()
    .from("user_progress")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .in("topic_id", topicIds)
    .eq("completed", true);
  return count ?? 0;
}
