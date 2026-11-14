import { apiFetch } from "@/lib/api-client";

export interface PublicProfile {
  id: string;
  fullName: string;
  username: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  plan: string | null;
  role: string | null;
  visibility: string;
  avatarUrl: string | null;
  coverUrl: string | null;
  extras: Record<string, unknown>;
  isYou?: boolean;
}

export interface ProfileStats {
  posts: number;
  comments: number;
  likesReceived: number;
  filesShared: number;
  followers: number;
  following: number;
}

export interface StorageInfo {
  usedBytes: number;
  limitBytes: number;
  remainingBytes: number;
  unlimited: boolean;
  tierDefaults?: Record<string, number>;
}

const ROOT = "/api/profile";

export function profilePath(username: string | null | undefined, id: string): string {
  if (username) return `/profile/${encodeURIComponent(username)}`;
  return `/profile/${id}`;
}

export async function getMyProfile(): Promise<{
  profile: PublicProfile;
  stats: ProfileStats;
  storage: StorageInfo | null;
}> {
  return apiFetch(`${ROOT}/me`);
}

export async function getStorage(): Promise<StorageInfo> {
  return apiFetch("/api/user/storage");
}

export async function getPublicProfile(username: string): Promise<{
  profile: PublicProfile;
  stats: ProfileStats;
  following: boolean;
  migrated: boolean;
}> {
  return apiFetch(`${ROOT}/${encodeURIComponent(username)}`);
}

export async function getProfilePosts(username: string) {
  return apiFetch<{ posts: Array<{ id: string; title: string; body: string; category: string; createdAt: string }>; migrated: boolean }>(
    `${ROOT}/${encodeURIComponent(username)}/posts`,
  );
}

export interface ProfileListUser {
  id: string;
  fullName: string;
  username: string | null;
  avatarUrl: string | null;
  followingByYou?: boolean;
}

/** Avatar/cover URL when R2 has no public base — matches backend `imageUrl`. */
export function profileMediaUrl(objectPath: string | null | undefined): string | null {
  if (!objectPath) return null;
  const key = objectPath.replace(/^\/+/, "");
  return `/api/profile/media?path=${encodeURIComponent(key)}`;
}

export async function getProfileFollowers(username: string) {
  return apiFetch<{ users: ProfileListUser[]; migrated: boolean }>(
    `${ROOT}/${encodeURIComponent(username)}/followers`,
  );
}

export async function getProfileFollowing(username: string) {
  return apiFetch<{ users: ProfileListUser[]; migrated: boolean }>(
    `${ROOT}/${encodeURIComponent(username)}/following`,
  );
}

export async function getProfileFiles(username: string) {
  return apiFetch<{
    files: Array<{
      id: string;
      postId: string;
      filename: string;
      contentType: string;
      byteSize: number;
      createdAt: string;
    }>;
    migrated: boolean;
  }>(`${ROOT}/${encodeURIComponent(username)}/files`);
}

export async function searchUsers(q: string) {
  return apiFetch<{ users: Array<PublicProfile & { avatarUrl: string | null }> }>(
    `/api/users?q=${encodeURIComponent(q)}`,
  );
}

export interface ProfileExtras {
  occupation?: string;
  education?: string;
  skills?: string;
  interests?: string;
  portfolio?: string;
  intro?: string;
}

export async function updateMyProfile(payload: {
  fullName?: string;
  username?: string;
  bio?: string;
  location?: string;
  website?: string;
  visibility?: "public" | "members" | "private";
  extras?: ProfileExtras;
}) {
  return apiFetch<{ profile: PublicProfile }>(`${ROOT}/me`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function checkUsername(username: string): Promise<{ available: boolean; reason?: string }> {
  return apiFetch(`${ROOT}/username-check?username=${encodeURIComponent(username)}`);
}

const CLIENT_MAX = {
  avatar: { w: 256, h: 256, skipUnderBytes: 80 * 1024 },
  cover: { w: 1200, h: 400, skipUnderBytes: 200 * 1024 },
} as const;

/**
 * Downsample with the platform canvas (no extra deps) so the upload is closer
 * to the server's output size. Server Sharp is still the source of truth.
 */
export async function downsampleForUpload(file: File, kind: "avatar" | "cover"): Promise<Blob> {
  const spec = CLIENT_MAX[kind];
  if (file.size <= spec.skipUnderBytes) return file;
  if (typeof createImageBitmap !== "function") return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, spec.w / bitmap.width, spec.h / bitmap.height);
    const dw = Math.max(1, Math.round(bitmap.width * scale));
    const dh = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = dw;
    canvas.height = dh;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      bitmap.close();
      return file;
    }
    ctx.drawImage(bitmap, 0, 0, dw, dh);
    bitmap.close();
    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, "image/jpeg", 0.82);
    });
    if (!blob || blob.size >= file.size) return file;
    return blob;
  } catch {
    return file;
  }
}

export interface ProfileImageUploadResult {
  profile: PublicProfile;
  byteSize: number;
  storage: StorageInfo | null;
}

async function postProfileImage(
  path: string,
  file: File,
  kind: "avatar" | "cover",
  signal?: AbortSignal,
): Promise<ProfileImageUploadResult> {
  const body = await downsampleForUpload(file, kind);
  return apiFetch<ProfileImageUploadResult>(path, {
    method: "POST",
    headers: { "Content-Type": body.type || file.type || "application/octet-stream" },
    body,
    signal,
  });
}

export async function uploadAvatar(file: File, signal?: AbortSignal) {
  return postProfileImage(`${ROOT}/me/avatar`, file, "avatar", signal);
}

export async function uploadCover(file: File, signal?: AbortSignal) {
  return postProfileImage(`${ROOT}/me/cover`, file, "cover", signal);
}

export async function followUser(username: string) {
  return apiFetch(`${ROOT}/${encodeURIComponent(username)}/follow`, { method: "POST" });
}

export async function unfollowUser(username: string) {
  return apiFetch(`${ROOT}/${encodeURIComponent(username)}/follow`, { method: "DELETE" });
}

export function formatBytes(n: number): string {
  if (!Number.isFinite(n) || n < 0) return "0 B";
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}
