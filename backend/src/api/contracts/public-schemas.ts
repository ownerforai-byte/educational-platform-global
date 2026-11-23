import { z } from "zod";

/** GET /health and GET /api/v2/health */
export const healthResponseSchema = z.object({
  status: z.literal("ok"),
  timestamp: z.string(),
  commit: z.string().nullable(),
});

/** GET /api/ai/status and GET /api/v2/ai/status */
export const aiStatusResponseSchema = z.object({
  configured: z.boolean(),
  online: z.boolean(),
});

/** Legal URLs + support contacts every store client must link to. */
export const appRequirementsSchema = z.object({
  appName: z.string().min(1),
  website: z.string().url(),
  supportEmail: z.string().email(),
  legal: z.object({
    privacy: z.string().url(),
    terms: z.string().url(),
    cookies: z.string().url(),
    purchases: z.string().url(),
    deleteAccount: z.string().url(),
    dataSafety: z.string().url(),
  }),
  clients: z.object({
    androidPackage: z.string().min(1),
    minAndroidVersionCode: z.number().int().nonnegative(),
  }),
});

/** GET /api/v2/meta */
export const apiV2MetaSchema = z.object({
  apiVersion: z.literal(2),
  stable: z.boolean(),
  legacyBase: z.literal("/api"),
  deprecated: z.array(z.string()),
  requirements: appRequirementsSchema,
});