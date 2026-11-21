import { insertSocialNotification } from "../db/repositories/social-notification.repository.js";

export type SocialNotificationKind =
  | "like"
  | "comment"
  | "reply"
  | "follow"
  | "repost"
  | "mention";

/** Best-effort insert — never blocks the parent action. */
export async function recordSocialNotification(opts: {
  userId: string;
  actorId?: string | null;
  kind: SocialNotificationKind;
  postId?: string | null;
  commentId?: string | null;
}): Promise<void> {
  if (!opts.userId || opts.userId === opts.actorId) return;
  const result = await insertSocialNotification(opts);
  if (result.error && !result.missingTable) {
    console.warn("[social-notification] insert failed", result.error.message);
  }
}
