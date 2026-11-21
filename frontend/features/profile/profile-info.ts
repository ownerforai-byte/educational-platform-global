import type { ProfileExtras } from "@/lib/api/profile";

/**
 * Extended profile info. These keys live in `profiles.profile_extras`.
 * Core identity (name, username, bio, location, website, visibility) stays
 * on the profile row. Edit, the Info hub, and the public About tab all read
 * this list so a new field shows up in every surface.
 */
export const PROFILE_INFO_FIELDS = [
  { key: "intro", label: "Short intro", kind: "text", group: "about" },
  { key: "occupation", label: "Occupation", kind: "line", group: "about" },
  { key: "education", label: "Education", kind: "line", group: "about" },
  { key: "skills", label: "Skills", kind: "line", group: "about" },
  { key: "interests", label: "Interests", kind: "line", group: "about" },
  { key: "portfolio", label: "Portfolio", kind: "line", group: "about" },
  { key: "github", label: "GitHub", kind: "line", group: "social" },
  { key: "twitter", label: "X / Twitter", kind: "line", group: "social" },
  { key: "linkedin", label: "LinkedIn", kind: "line", group: "social" },
  { key: "instagram", label: "Instagram", kind: "line", group: "social" },
  { key: "youtube", label: "YouTube", kind: "line", group: "social" },
] as const satisfies ReadonlyArray<{
  key: keyof ProfileExtras;
  label: string;
  kind: "line" | "text";
  group: "about" | "social";
}>;

export type ProfileInfoKey = (typeof PROFILE_INFO_FIELDS)[number]["key"];

export function emptyProfileInfo(): ProfileExtras {
  return Object.fromEntries(PROFILE_INFO_FIELDS.map((field) => [field.key, ""])) as ProfileExtras;
}

export function profileInfoFrom(extras: Record<string, unknown> | null | undefined): ProfileExtras {
  const next = emptyProfileInfo();
  for (const field of PROFILE_INFO_FIELDS) {
    const value = extras?.[field.key];
    next[field.key] = typeof value === "string" ? value : "";
  }
  return next;
}

export function profileInfoText(
  extras: Record<string, unknown> | null | undefined,
  key: ProfileInfoKey,
): string | null {
  const value = extras?.[key];
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}
