export const ACCESS_LEVELS = [
  'guest',
  'member',
  'plus',
  'pro',
  'owner',
] as const;

export type AccessLevel = (typeof ACCESS_LEVELS)[number];

export const ACCESS_RANK: Record<AccessLevel, number> = {
  guest: 0,
  member: 1,
  plus: 2,
  pro: 3,
  owner: 4,
};

export const TIER_DAILY_SPARKS: Record<AccessLevel, number> = {
  guest: 0,
  member: 13,
  plus: 25,
  pro: 50,
  owner: 999999,
};
