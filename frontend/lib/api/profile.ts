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

export async function updateMyProfile(payload: {
  fullName?: string;
  username?: string;
  bio?: string;
  location?: string;
  website?: string;
  visibility?: "public" | "members" | "private";
}) {
  return apiFetch<{ profile: PublicProfile }>(`${ROOT}/me`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

async function fileToBase64(file: File): Promise<string> {
  const buf = await file.arrayBuffer();
  const bytes = new Uint8Array(buf);
  let binary = "";
  for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i]!);
  return btoa(binary);
}

export async function uploadAvatar(file: File) {
  return apiFetch<{ profile: PublicProfile; byteSize: number }>(`${ROOT}/me/avatar`, {
    method: "POST",
    body: JSON.stringify({ dataBase64: await fileToBase64(file), contentType: file.type }),
  });
}

export async function uploadCover(file: File) {
  return apiFetch<{ profile: PublicProfile; byteSize: number }>(`${ROOT}/me/cover`, {
    method: "POST",
    body: JSON.stringify({ dataBase64: await fileToBase64(file), contentType: file.type }),
  });
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
