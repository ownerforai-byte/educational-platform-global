import { z } from "zod";

/** Keep in sync with `PROFILE_EXTRAS_BADGE_KEY` in packages/shared. */
export const PROFILE_EXTRAS_BADGE_KEY = "assignedBadgeIds";

export const assignedBadgeIdsSchema = z.object({
  badgeIds: z.array(z.string().regex(/^[a-z0-9-]{2,64}$/)).max(48),
});
