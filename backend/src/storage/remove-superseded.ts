import { releaseStoragePath } from "../services/profile-storage";
import { r2Delete } from "./r2";

/**
 * When a new storage object replaces an older one (profile avatar/cover, etc.),
 * delete the previous R2 key and release its quota row. Best-effort: a failed
 * delete must not roll back a successful profile write.
 */
export async function removeSupersededObject(
  ownerId: string,
  oldPath: string | null | undefined,
  newPath?: string | null,
): Promise<void> {
  if (!oldPath) return;
  if (newPath && oldPath === newPath) return;
  try {
    await r2Delete(oldPath);
  } catch {
    /* object may already be gone */
  }
  try {
    await releaseStoragePath(ownerId, oldPath);
  } catch {
    /* quota row may already be released */
  }
}