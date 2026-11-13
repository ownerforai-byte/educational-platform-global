import { z } from "zod";

/** Top contract DTOs shared by frontend + backend (T13). */

export const sessionUserSchema = z.object({
  id: z.string(),
  email: z.string().email().or(z.string()),
  fullName: z.string().nullable().optional(),
  role: z.string().nullable().optional(),
  plan: z.enum(["member", "plus", "pro"]).nullable().optional(),
  premiumStatus: z.boolean().optional(),
});

export const authSessionSchema = z.object({
  user: sessionUserSchema.nullable(),
  accessToken: z.string().optional(),
});

export const userStateSchema = z.object({
  namespace: z.string(),
  payload: z.unknown().nullable(),
  version: z.number().int().nonnegative(),
  updatedAt: z.string().nullable(),
});

export const creditsInfoSchema = z.object({
  id: z.string(),
  email: z.string(),
  fullName: z.string().nullable().optional(),
  role: z.string().optional(),
  credits: z.number(),
  creditsLimit: z.number().optional(),
  premiumStatus: z.boolean().optional(),
  dailyPool: z.number().nullable().optional(),
  plan: z.string().optional(),
});

export const progressRowSchema = z.object({
  topic_id: z.string().optional(),
  completed: z.boolean().optional(),
  updated_at: z.string().optional(),
});

export const bookmarkRowSchema = z.object({
  id: z.string().optional(),
  resource_id: z.string().optional(),
  created_at: z.string().optional(),
});

export const communityPostSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  body: z.string().optional(),
  created_at: z.string().optional(),
});

export const aiChatNonStreamSchema = z.object({
  answer: z.string().optional(),
  message: z.string().optional(),
  session: z.string().optional(),
});

export const accessRequestSchema = z.object({
  id: z.string(),
  status: z.enum(["pending", "approved", "expired"]).or(z.string()),
  requested_at: z.string().optional(),
  approved_at: z.string().nullable().optional(),
  expires_at: z.string().nullable().optional(),
});

export const publicConfigSchema = z.object({
  dailyCreditPool: z.number(),
  aiMessageCost: z.number(),
  sectionMinTiers: z.record(z.string(), z.string()),
});

export const searchResultSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  type: z.string().optional(),
  href: z.string().optional(),
});

export type SessionUserDto = z.infer<typeof sessionUserSchema>;
export type AuthSessionDto = z.infer<typeof authSessionSchema>;
export type UserStateDto = z.infer<typeof userStateSchema>;
export type CreditsInfoDto = z.infer<typeof creditsInfoSchema>;
export type ProgressRowDto = z.infer<typeof progressRowSchema>;
export type BookmarkRowDto = z.infer<typeof bookmarkRowSchema>;
export type CommunityPostDto = z.infer<typeof communityPostSchema>;
export type AiChatNonStreamDto = z.infer<typeof aiChatNonStreamSchema>;
export type AccessRequestDto = z.infer<typeof accessRequestSchema>;
export type PublicConfigDto = z.infer<typeof publicConfigSchema>;
export type SearchResultDto = z.infer<typeof searchResultSchema>;
