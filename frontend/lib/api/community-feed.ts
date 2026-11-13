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

export interface FeedComment {
  id: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  author: FeedAuthor;
}

export interface FeedPost {
  id: string;
  title: string;
  body: string;
  category: string;
  visibility: "public";
  createdAt: string;
  updatedAt: string;
  author: FeedAuthor;
  likeCount: number;
  likedByYou: boolean;
  commentCount: number;
  attachments: FeedAttachment[];
  comments?: FeedComment[];
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
  migrated: boolean;
}

export interface PostInput {
  title: string;
  body: string;
  category: string;
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

export function listFeed(params: { q?: string; category?: string; cursor?: number | null; authorId?: string } = {}): Promise<FeedList> {
  const search = new URLSearchParams();
  if (params.q) search.set("q", params.q);
  if (params.category) search.set("category", params.category);
  if (params.authorId) search.set("authorId", params.authorId);
  if (params.cursor) search.set("cursor", String(params.cursor));
  const qs = search.toString();
  return call<FeedList>(`${ROOT}/feed${qs ? `?${qs}` : ""}`);
}

export function listMine(params: { q?: string; category?: string; cursor?: number | null } = {}): Promise<FeedList> {
  const search = new URLSearchParams();
  if (params.q) search.set("q", params.q);
  if (params.category) search.set("category", params.category);
  if (params.cursor) search.set("cursor", String(params.cursor));
  const qs = search.toString();
  return call<FeedList>(`${ROOT}/feed/mine${qs ? `?${qs}` : ""}`);
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

export function deletePost(id: string): Promise<{ ok: boolean }> {
  return call(`${ROOT}/feed/${id}`, { method: "DELETE" });
}

export function toggleLike(id: string): Promise<{ likeCount: number; likedByYou: boolean }> {
  return call(`${ROOT}/feed/${id}/like`, { method: "POST" });
}

export function addComment(postId: string, body: string): Promise<{ comment: FeedComment }> {
  return call(`${ROOT}/feed/${postId}/comments`, {
    method: "POST",
    body: JSON.stringify({ body }),
  });
}

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

export function getPerson(userId: string): Promise<PersonResponse> {
  return call(`${ROOT}/people/${userId}`);
}

export function uploadAttachment(
  postId: string,
  file: File,
  onProgress: (fraction: number) => void,
): Promise<FeedAttachment> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read that file"));
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      const comma = result.indexOf(",");
      const dataBase64 = comma >= 0 ? result.slice(comma + 1) : result;
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${ROOT}/feed/${postId}/attachments`);
      xhr.withCredentials = true;
      xhr.setRequestHeader("Content-Type", "application/json");
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
      xhr.send(JSON.stringify({
        filename: file.name,
        contentType: file.type || "application/octet-stream",
        dataBase64,
      }));
    };
    reader.readAsDataURL(file);
  });
}
