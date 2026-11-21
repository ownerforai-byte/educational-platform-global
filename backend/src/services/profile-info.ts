import { z } from "zod";

/**
 * Extended profile info stored in `profiles.profile_extras`.
 * Keep these keys aligned with `frontend/features/profile/profile-info.ts`.
 * Empty strings are dropped later by `compactProfileExtras`.
 */
export const profileExtrasSchema = z
  .object({
    occupation: z.string().trim().max(120).optional(),
    education: z.string().trim().max(200).optional(),
    skills: z.string().trim().max(400).optional(),
    interests: z.string().trim().max(400).optional(),
    portfolio: z.string().trim().max(300).optional(),
    intro: z.string().trim().max(2000).optional(),
    github: z.string().trim().max(200).optional(),
    twitter: z.string().trim().max(200).optional(),
    linkedin: z.string().trim().max(200).optional(),
    instagram: z.string().trim().max(200).optional(),
    youtube: z.string().trim().max(200).optional(),
  })
  .partial();
