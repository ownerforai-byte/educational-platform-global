import { randomUUID } from "node:crypto";
import { supabaseAdmin } from "../db/supabase.js";

export type SocialNotificationKind =
  | "like"
  | "comment"
  | "reply"
  | "follow"
  | "repost"
  | "mention";

function isMissingTable(error: { message?: string; code?: string } | null): boolean {
  const msg = (error?.message ?? "").toLowerCase();
  return (
    msg.includes("could not find the table") ||
    msg.includes("does not exist") ||
    msg.includes("schema cache")
  );
}

/** Best-effort insert — never blocks the parent action. */
export async function recordSocialNotification(opts: {
  userId: string;
  actorId?: string | null;
  kind: SocialNotificationKind;
  postId?: string | null;
  commentId?: string | null;
}): Promise<void> {
  if (!opts.userId || opts.userId === opts.actorId) return;
  const { error } = await supabaseAdmin.from("social_notifications").insert({
    id: randomUUID(),
    user_id: opts.userId,
    actor_id: opts.actorId ?? null,
    kind: opts.kind,
    post_id: opts.postId ?? null,
    comment_id: opts.commentId ?? null,
    created_at: new Date().toISOString(),
  });
  if (error && !isMissingTable(error)) {
    console.warn("[social-notification] insert failed", error.message);
  }
}