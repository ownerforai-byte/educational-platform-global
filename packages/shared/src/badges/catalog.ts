import { BADGE_CATALOG } from "./catalog-data";
import type { BadgeDefinition } from "./types";

export const BADGE_BY_ID: ReadonlyMap<string, BadgeDefinition> = new Map(
  BADGE_CATALOG.map((row) => [row.id, row]),
);

export const BADGE_ID_SET: ReadonlySet<string> = new Set(BADGE_CATALOG.map((row) => row.id));

export function getBadgeDefinition(id: string): BadgeDefinition | undefined {
  return BADGE_BY_ID.get(id);
}

export function isValidBadgeId(id: string): boolean {
  return BADGE_ID_SET.has(id);
}

export function listOwnerAssignableBadges(): BadgeDefinition[] {
  return BADGE_CATALOG.filter(
    (row) =>
      row.assignment === "owner" &&
      row.audience !== "role" &&
      row.id !== "creator" &&
      row.id !== "community-bot",
  );
}

export function parseAssignedBadgeIds(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  const out: string[] = [];
  for (const item of raw) {
    if (typeof item !== "string") continue;
    const id = item.trim();
    if (!id || !isValidBadgeId(id)) continue;
    if (!out.includes(id)) out.push(id);
    if (out.length >= 48) break;
  }
  return out;
}