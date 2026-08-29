import { apiFetch } from "../api-client";
import type {
  Bookmark,
  BookmarkCreateRequest,
  BookmarkDeleteResponse,
} from "../../types/api";

/**
 * Get all bookmarks for the current user.
 */
export async function getBookmarks(): Promise<Bookmark[]> {
  return apiFetch<Bookmark[]>("/api/bookmarks");
}

/**
 * Create a new bookmark (upsert).
 */
export async function createBookmark(
  data: BookmarkCreateRequest
): Promise<Bookmark> {
  return apiFetch<Bookmark>("/api/bookmarks", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Delete a bookmark by ID.
 */
export async function deleteBookmark(
  id: string
): Promise<BookmarkDeleteResponse> {
  return apiFetch<BookmarkDeleteResponse>(
    `/api/bookmarks/${encodeURIComponent(id)}`,
    {
      method: "DELETE",
    }
  );
}
