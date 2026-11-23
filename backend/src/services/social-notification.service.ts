import { insertSocialNotification } from "../db/repositories/social-notification.repository.js";
import { sendNotification } from "../notifications/notification.service.js";

const PUSH_COPY: Record<
  SocialNotificationKind,
  (opts: { postId?: string | null }) => { title: string; body: string; deepLink: string }
> = {
  like: () => ({
    title: "New like on your post",
    body: "Someone liked your community post.",
    deepLink: "/ai/community",
  }),
  comment: ({ postId }) => ({
    title: "New comment",
    body: "Someone commented on your post.",
    deepLink: postId ? `/ai/community/posts/${postId}` : "/ai/community",
  }),
  reply: ({ postId }) => ({
    title: "New reply",
    body: "Someone replied to your comment.",
    deepLink: postId ? `/ai/community/posts/${postId}` : "/ai/community",
  }),
  follow: () => ({
    title: "New follower",
    body: "Someone followed you.",
    deepLink: "/ai/community",
  }),
  repost: ({ postId }) => ({
    title: "Post reposted",
    body: "Someone reposted your post.",
    deepLink: postId ? `/ai/community/posts/${postId}` : "/ai/community",
  }),
  mention: ({ postId }) => ({
    title: "You were mentioned",
    body: "Someone tagged your profile in the community.",
    deepLink: postId ? `/ai/community/posts/${postId}` : "/ai/community",
  }),
  accept: ({ postId }) => ({
    title: "Your answer was accepted",
    body: "Your reply was marked as the accepted answer.",
    deepLink: postId ? `/ai/community/posts/${postId}` : "/ai/community",
  }),
  quote: ({ postId }) => ({
    title: "Your post was quoted",
    body: "Someone quoted your post in a new discussion.",
    deepLink: postId ? `/ai/community/posts/${postId}` : "/ai/community",
  }),
};

export type SocialNotificationKind =
  | "like"
  | "comment"
  | "reply"
  | "follow"
  | "repost"
  | "mention"
  | "accept"
  | "quote";

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
    return;
  }
  if (result.missingTable) return;
  const copy = PUSH_COPY[opts.kind]({ postId: opts.postId });
  void sendNotification(opts.userId, {
    kind: "community_activity",
    category: "system",
    title: copy.title,
    body: copy.body,
    deepLink: copy.deepLink,
    actionLabel: "Open",
    metadata: {
      socialKind: opts.kind,
      postId: opts.postId ?? undefined,
      commentId: opts.commentId ?? undefined,
    },
  }).catch(() => {});
}
