import { apiFetch } from "@/lib/api-client";

/**
 * Community discussions — threads per study space, replies and upvotes.
 *
 * Authors arrive masked server-side (first name + initial); there is no raw
 * name or user id in any payload. `migrated: false` means the
 * `community_threads` tables are not set up on this deployment yet.
 */

export interface CommunityThread {
  id: string;
  spaceId: string;
  title: string;
  body: string;
  /** Masked server-side ("Aarav S."). */
  author: string;
  createdAt: string;
  replyCount: number;
  upvotes: number;
  upvotedByYou: boolean;
}

export interface CommunityReply {
  id: string;
  body: string;
  author: string;
  createdAt: string;
}

export interface CommunityThreadListResponse {
  threads: CommunityThread[];
  migrated: boolean;
}

export interface CommunityThreadDetailResponse {
  thread: CommunityThread | null;
  replies: CommunityReply[];
  migrated: boolean;
}

export interface CommunityWriteResponse {
  thread: CommunityThread | null;
  migrated: boolean;
}

export interface CommunityReplyResponse {
  reply: CommunityReply | null;
  migrated: boolean;
}

export interface CommunityUpvoteResponse {
  upvotes: number;
  upvotedByYou: boolean;
  migrated: boolean;
}

export function listThreads(spaceId: string): Promise<CommunityThreadListResponse> {
  return apiFetch<CommunityThreadListResponse>(
    `/api/community/${encodeURIComponent(spaceId)}/threads`,
  );
}

export function createThread(
  spaceId: string,
  title: string,
  body: string,
): Promise<CommunityWriteResponse> {
  return apiFetch<CommunityWriteResponse>(
    `/api/community/${encodeURIComponent(spaceId)}/threads`,
    { method: "POST", body: JSON.stringify({ title, body }) },
  );
}

export function getThread(threadId: string): Promise<CommunityThreadDetailResponse> {
  return apiFetch<CommunityThreadDetailResponse>(
    `/api/community/threads/${encodeURIComponent(threadId)}`,
  );
}

export function createReply(threadId: string, body: string): Promise<CommunityReplyResponse> {
  return apiFetch<CommunityReplyResponse>(
    `/api/community/threads/${encodeURIComponent(threadId)}/replies`,
    { method: "POST", body: JSON.stringify({ body }) },
  );
}

export function toggleUpvote(threadId: string): Promise<CommunityUpvoteResponse> {
  return apiFetch<CommunityUpvoteResponse>(
    `/api/community/threads/${encodeURIComponent(threadId)}/upvote`,
    { method: "POST" },
  );
}
