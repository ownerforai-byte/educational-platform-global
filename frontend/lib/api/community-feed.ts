import { apiFetch } from "@/lib/api-client";

export const COMMUNITY_CATEGORIES = [
  { id: "general", label: "General" },
  { id: "physics", label: "Physics" },
  { id: "chemistry", label: "Chemistry" },
  { id: "biology", label: "Biology" },
  { id: "mathematics", label: "Mathematics" },
  { id: "english", label: "English" },
  { id: "nepali", label: "Nepali" },
] as const;

export type CommunityCategory = (typeof COMMUNITY_CATEGORIES)[number]["id"];

export const COMMUNITY_POST_KINDS = [
  { id: "discussion", label: "Discussion" },
  { id: "question", label: "Question" },
  { id: "resource", label: "Resource" },
  { id: "announcement", label: "Announcement" },
  { id: "study_note", label: "Study note" },
] as const;

export type CommunityPostKind = (typeof COMMUNITY_POST_KINDS)[number]["id"];
export type CommunityFeedFilter = "latest" | "unanswered" | "following" | "solved";

export interface FeedAuthor {
  id: string;
  fullName: string;
  username?: string | null;
  plan: string | null;
  role: string | null;
  avatarUrl?: string | null;
  followingByYou?: boolean;
}

export interface FeedAttachment {
  id: string;
  filename: string;
  contentType: string;
  byteSize: number;
}

export interface FeedCommentReplyTo {
  id: string;
  fullName: string;
  username?: string | null;
}

export interface FeedComment {
  id: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  author: FeedAuthor;
  /**
   * Author this comment replies to (the post author for top-level comments,
   * or the parent comment's author when threaded). Used for the
   * "Replying to @name" affordance. Optional for older payloads.
   */
  replyTo?: FeedCommentReplyTo | null;
  /** Parent comment id when this is a threaded reply; null/absent for top-level. */
  parentId?: string | null;
}

export interface FeedAssistantReply {
  posted: boolean;
  canApprove: boolean;
}

export interface FeedQuotedPost {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  author: FeedAuthor;
}

export interface FeedPost {
  id: string;
  title: string;
  body: string;
  quotedPostId?: string | null;
  quotedPost?: FeedQuotedPost | null;
  category: string;
  kind?: CommunityPostKind;
  solved?: boolean;
  acceptedCommentId?: string | null;
  visibility: "public";
  createdAt: string;
  updatedAt: string;
  author: FeedAuthor;
  likeCount: number;
  likedByYou: boolean;
  commentCount: number;
  saveCount: number;
  savedByYou: boolean;
  repostCount?: number;
  repostedByYou?: boolean;
  attachments: FeedAttachment[];
  comments?: FeedComment[];
  assistantReply?: FeedAssistantReply;
}

export interface FeedList {
  posts: FeedPost[];
  nextCursor: number | null;
  migrated: boolean;
}

export interface FeedDetail {
  post: FeedPost | null;
  migrated: boolean;
}

export interface PersonResponse {
  profile: FeedAuthor | null;
  posts: FeedPost[];
  nextCursor?: number | null;
  migrated: boolean;
}

export interface PostInput {
  title: string;
  body: string;
  category: string;
  kind?: CommunityPostKind;
  quotedPostId?: string;
}

const ROOT = "/api/community";

export function attachmentFileUrl(id: string, disposition: "inline" | "attachment" = "attachment"): string {
  return `${ROOT}/feed/attachments/${id}/file?disposition=${disposition}`;
}

export function sharePath(id: string): string {
  return `/ai/community/posts/${id}`;
}

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  return apiFetch<T>(path, init);
}

export function listFeed(
  params: {
    q?: string;
    category?: string;
    kind?: CommunityPostKind | "";
    cursor?: number | null;
    authorId?: string;
    filter?: CommunityFeedFilter;
    ids?: string[];
    signal?: AbortSignal;
  } = {},
): Promise<FeedList> {
  const search = new URLSearchParams();
  if (params.q) search.set("q", params.q);
  if (params.category) search.set("category", params.category);
  if (params.kind) search.set("kind", params.kind);
  if (params.authorId) search.set("authorId", params.authorId);
  if (params.filter && params.filter !== "latest") search.set("filter", params.filter);
  if (params.ids !== undefined) search.set("ids", params.ids.join(","));
  if (params.cursor) search.set("cursor", String(params.cursor));
  const qs = search.toString();
  return call<FeedList>(
    `${ROOT}/feed${qs ? `?${qs}` : ""}`,
    params.signal ? { signal: params.signal } : undefined,
  );
}

export function listMine(
  params: {
    q?: string;
    category?: string;
    kind?: CommunityPostKind | "";
    cursor?: number | null;
    filter?: CommunityFeedFilter;
    signal?: AbortSignal;
  } = {},
): Promise<FeedList> {
  const search = new URLSearchParams();
  if (params.q) search.set("q", params.q);
  if (params.category) search.set("category", params.category);
  if (params.kind) search.set("kind", params.kind);
  if (params.filter && params.filter !== "latest") search.set("filter", params.filter);
  if (params.cursor) search.set("cursor", String(params.cursor));
  const qs = search.toString();
  return call<FeedList>(
    `${ROOT}/feed/mine${qs ? `?${qs}` : ""}`,
    params.signal ? { signal: params.signal } : undefined,
  );
}

export function createPost(input: PostInput): Promise<{ post: FeedPost }> {
  return call(`${ROOT}/feed`, {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function getPost(id: string): Promise<FeedDetail> {
  return call(`${ROOT}/feed/${id}`);
}

export function updatePost(id: string, input: PostInput): Promise<{ post: FeedPost }> {
  return call(`${ROOT}/feed/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

export function setAcceptedComment(
  postId: string,
  commentId: string | null,
): Promise<{ post: FeedPost | null; acceptedCommentId?: string | null }> {
  return call(`${ROOT}/feed/${postId}/accepted-comment`, {
    method: "PATCH",
    body: JSON.stringify({ commentId }),
  });
}

export function deletePost(id: string): Promise<{ ok: boolean }> {
  return call(`${ROOT}/feed/${id}`, { method: "DELETE" });
}

export function toggleLike(id: string): Promise<{ likeCount: number; likedByYou: boolean }> {
  return call(`${ROOT}/feed/${id}/like`, { method: "POST" });
}

export function toggleSave(id: string): Promise<{ saveCount: number; savedByYou: boolean }> {
  return call(`${ROOT}/feed/${id}/save`, { method: "POST" });
}

export function listSaved(params: { cursor?: number | null; signal?: AbortSignal } = {}): Promise<FeedList> {
  const search = new URLSearchParams();
  if (params.cursor) search.set("cursor", String(params.cursor));
  const qs = search.toString();
  return call<FeedList>(
    `${ROOT}/feed/saved${qs ? `?${qs}` : ""}`,
    params.signal ? { signal: params.signal } : undefined,
  );
}

export function listTrending(): Promise<{ posts: FeedPost[]; migrated: boolean }> {
  return call(`${ROOT}/feed/trending`);
}

export function toggleRepost(id: string): Promise<{ repostCount: number; repostedByYou: boolean }> {
  return call(`${ROOT}/feed/${id}/repost`, { method: "POST" });
}

export function reportPost(id: string, reason?: string): Promise<{ ok: boolean }> {
  return call(`${ROOT}/feed/${id}/report`, {
    method: "POST",
    body: JSON.stringify({ reason: reason ?? "" }),
  });
}

export function toggleBlockUser(userId: string): Promise<{ blocked: boolean }> {
  return call(`${ROOT}/blocks`, {
    method: "POST",
    body: JSON.stringify({ userId, toggle: true }),
  });
}

export interface SocialNotificationItem {
  id: string;
  actorId: string | null;
  kind: string;
  postId: string | null;
  commentId: string | null;
  readAt: string | null;
  createdAt: string;
}

export function listSocialNotifications(params: {
  cursor?: number;
  unreadOnly?: boolean;
} = {}): Promise<{
  items: SocialNotificationItem[];
  nextCursor: number | null;
  unreadCount: number;
  migrated: boolean;
}> {
  const search = new URLSearchParams();
  if (params.cursor) search.set("cursor", String(params.cursor));
  if (params.unreadOnly) search.set("unread", "1");
  const qs = search.toString();
  return call(`${ROOT}/notifications${qs ? `?${qs}` : ""}`);
}

export function markSocialNotificationsRead(opts: { all?: boolean; ids?: string[] }): Promise<{ ok: boolean }> {
  return call(`${ROOT}/notifications/read`, {
    method: "PATCH",
    body: JSON.stringify(opts),
  });
}

export function addComment(
  postId: string,
  body: string,
  opts?: { followUpToBot?: boolean; replyToCommentId?: string },
): Promise<{ comment: FeedComment; botComment?: FeedComment | null; botReplyPending?: boolean }> {
  return call(`${ROOT}/feed/${postId}/comments`, {
    method: "POST",
    body: JSON.stringify({
      body,
      followUpToBot: opts?.followUpToBot === true,
      ...(opts?.replyToCommentId ? { replyToCommentId: opts.replyToCommentId } : {}),
    }),
  });
}

/** One-click: generate and publish a curriculum-grounded Veer comment. Idempotent per post. */
export function publishAssistantReply(postId: string): Promise<{
  comment: FeedComment;
  assistantReply: FeedAssistantReply;
}> {
  return call(`${ROOT}/feed/${postId}/ai-assistant/reply`, {
    method: "POST",
    body: JSON.stringify({ approve: true }),
  });
}

/** @deprecated Use {@link publishAssistantReply} — kept for older callers. */
export const approveAssistantReply = publishAssistantReply;

export function updateComment(postId: string, commentId: string, body: string): Promise<{ comment: FeedComment }> {
  return call(`${ROOT}/feed/${postId}/comments/${commentId}`, {
    method: "PATCH",
    body: JSON.stringify({ body }),
  });
}

export function deleteComment(postId: string, commentId: string): Promise<{ ok: boolean }> {
  return call(`${ROOT}/feed/${postId}/comments/${commentId}`, { method: "DELETE" });
}

export function deleteAttachment(id: string): Promise<{ ok: boolean }> {
  return call(`${ROOT}/feed/attachments/${id}`, { method: "DELETE" });
}

export function getPerson(
  userId: string,
  params: { cursor?: number | null; signal?: AbortSignal } = {},
): Promise<PersonResponse> {
  const search = new URLSearchParams();
  if (params.cursor) search.set("cursor", String(params.cursor));
  const qs = search.toString();
  return call(
    `${ROOT}/people/${userId}${qs ? `?${qs}` : ""}`,
    params.signal ? { signal: params.signal } : undefined,
  );
}

const ATTACHMENT_MIME_BY_EXT: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  pdf: "application/pdf",
  doc: "application/msword",
  xls: "application/vnd.ms-excel",
  ppt: "application/vnd.ms-powerpoint",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  txt: "text/plain",
};

/** Browser `File.type` is often empty for office docs; the server allow-list is extension-based. */
export function mimeForAttachment(file: Pick<File, "name" | "type">): string {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  return ATTACHMENT_MIME_BY_EXT[ext] || file.type || "application/octet-stream";
}

/** Aligns with `backend/src/storage/binary-upload-policy.ts` extension map. */
export const UPLOAD_FILENAME_HEADER = "x-upload-filename";

export function uploadAttachment(
  postId: string,
  file: File,
  onProgress: (fraction: number) => void,
): Promise<FeedAttachment> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const mime = mimeForAttachment(file);
    xhr.open("POST", `${ROOT}/feed/${postId}/attachments`);
    xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", mime);
    xhr.setRequestHeader(UPLOAD_FILENAME_HEADER, encodeURIComponent(file.name));
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && event.total > 0) onProgress(event.loaded / event.total);
    };
    xhr.onerror = () => reject(new Error("Upload failed"));
    xhr.onload = () => {
      let payload: { attachment?: FeedAttachment; error?: string } = {};
      try {
        payload = JSON.parse(xhr.responseText) as { attachment?: FeedAttachment; error?: string };
      } catch {
        payload = {};
      }
      if (xhr.status < 200 || xhr.status >= 300 || !payload.attachment) {
        reject(Object.assign(new Error(payload.error || "Upload failed"), { status: xhr.status }));
        return;
      }
      onProgress(1);
      resolve(payload.attachment);
    };
    xhr.send(file);
  });
}
