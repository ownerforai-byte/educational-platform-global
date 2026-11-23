import { randomUUID } from "node:crypto";
import { getAdminClient, isMissingTable } from "./base.repository.js";

export type SocialNotificationRow = {
  id: string;
  actor_id: string | null;
  kind: string;
  post_id: string | null;
  comment_id: string | null;
  read_at: string | null;
  created_at: string;
};

export async function insertSocialNotification(row: {
  userId: string;
  actorId?: string | null;
  kind: string;
  postId?: string | null;
  commentId?: string | null;
}): Promise<{ missingTable: boolean; error: { message: string } | null }> {
  const { error } = await getAdminClient().from("social_notifications").insert({
    id: randomUUID(),
    user_id: row.userId,
    actor_id: row.actorId ?? null,
    kind: row.kind,
    post_id: row.postId ?? null,
    comment_id: row.commentId ?? null,
    created_at: new Date().toISOString(),
  });
  return {
    missingTable: Boolean(error && isMissingTable(error)),
    error: error ? { message: error.message ?? "insert failed" } : null,
  };
}

export async function listSocialNotifications(
  userId: string,
  opts: { cursor: number; limit: number; unreadOnly: boolean },
): Promise<{ missingTable: boolean; error: { message: string } | null; rows: SocialNotificationRow[] }> {
  let query = getAdminClient()
    .from("social_notifications")
    .select("id, actor_id, kind, post_id, comment_id, read_at, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .range(opts.cursor, opts.cursor + opts.limit);
  if (opts.unreadOnly) query = query.is("read_at", null);
  const { data, error } = await query;
  return {
    missingTable: Boolean(error && isMissingTable(error)),
    error: error ? { message: error.message ?? "list failed" } : null,
    rows: (data ?? []) as SocialNotificationRow[],
  };
}

export async function countUnreadSocialNotifications(userId: string): Promise<number> {
  const { count } = await getAdminClient()
    .from("social_notifications")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .is("read_at", null);
  return typeof count === "number" ? count : 0;
}

export type NotificationActorProfile = {
  fullName: string;
  username: string | null;
  avatarPath: string | null;
};

export async function loadNotificationActorProfiles(
  actorIds: string[],
): Promise<Map<string, NotificationActorProfile>> {
  const actors = new Map<string, NotificationActorProfile>();
  if (actorIds.length === 0) return actors;
  const { data: actorRows } = await getAdminClient()
    .from("profiles")
    .select("id, full_name, username, avatar_path")
    .in("id", actorIds);
  for (const row of (actorRows ?? []) as Array<{
    id: string;
    full_name: string | null;
    username: string | null;
    avatar_path: string | null;
  }>) {
    actors.set(row.id, {
      fullName: (row.full_name ?? "").trim() || "Student",
      username: row.username ?? null,
      avatarPath: row.avatar_path,
    });
  }
  return actors;
}

export async function loadNotificationPostTitles(postIds: string[]): Promise<Map<string, string>> {
  const postTitles = new Map<string, string>();
  if (postIds.length === 0) return postTitles;
  const { data: postRows } = await getAdminClient()
    .from("community_feed_posts")
    .select("id, title")
    .in("id", postIds);
  for (const row of (postRows ?? []) as Array<{ id: string; title: string }>) {
    postTitles.set(row.id, row.title);
  }
  return postTitles;
}

export async function markSocialNotificationsRead(
  userId: string,
  opts: { all: boolean; ids: string[] },
): Promise<{ missingTable: boolean; error: { message: string } | null }> {
  const now = new Date().toISOString();
  let query = getAdminClient()
    .from("social_notifications")
    .update({ read_at: now })
    .eq("user_id", userId)
    .is("read_at", null);
  if (!opts.all && opts.ids.length > 0) query = query.in("id", opts.ids.slice(0, 100));
  const { error } = await query;
  return {
    missingTable: Boolean(error && isMissingTable(error)),
    error: error ? { message: error.message ?? "update failed" } : null,
  };
}
