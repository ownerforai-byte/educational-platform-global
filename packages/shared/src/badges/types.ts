export type BadgeRarity = "common" | "uncommon" | "rare" | "epic" | "legendary";

export type BadgeCategory =
  | "academic-excellence"
  | "consistency-discipline"
  | "knowledge-skills"
  | "community-participation"
  | "learning-milestones"
  | "teacher"
  | "special-exclusive"
  | "role";

export type BadgeAudience = "student" | "teacher" | "special" | "role";

/** Owner = only assignable in owner console. Earned = auto from quiz accuracy / XP when rules match. */
export type BadgeAssignment = "owner" | "earned";

export interface BadgeDefinition {
  id: string;
  label: string;
  category: BadgeCategory;
  audience: BadgeAudience;
  rarity: BadgeRarity;
  assignment: BadgeAssignment;
}

export const BADGE_RARITY_TIER: Record<BadgeRarity, number> = {
  common: 1,
  uncommon: 2,
  rare: 3,
  epic: 4,
  legendary: 5,
};

export const PROFILE_EXTRAS_BADGE_KEY = "assignedBadgeIds";