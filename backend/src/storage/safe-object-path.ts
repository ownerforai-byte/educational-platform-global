/** Object keys the profile media proxy may stream (no arbitrary bucket paths). */
export const PUBLIC_MEDIA_PREFIXES = ["profiles/", "community/"] as const;

/**
 * Normalize and validate an R2 object key for public proxy reads.
 * Returns null when the path is missing, traversal, or outside allowed prefixes.
 */
export function normalizeMediaObjectPath(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed || trimmed.includes("\\") || trimmed.includes("..")) return null;
  const key = trimmed.replace(/^\/+/, "");
  if (!PUBLIC_MEDIA_PREFIXES.some((prefix) => key.startsWith(prefix))) return null;
  return key;
}
