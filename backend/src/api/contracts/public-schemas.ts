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

/** GET /api/mobile/home — native Android bootstrap payload. */
export const mobileHomeResponseSchema = z.object({
  ok: z.literal(true),
  data: z.object({
    apiVersion: z.literal("mobile-v1"),
    features: z.object({
      syllabus: z.boolean(),
      notes: z.boolean(),
      practice: z.boolean(),
      aiChat: z.boolean(),
      community: z.boolean(),
    }),
    links: z.object({
      syllabus: z.string().startsWith("/"),
      notes: z.string().startsWith("/"),
      practice: z.string().startsWith("/"),
      ai: z.string().startsWith("/"),
      community: z.string().startsWith("/"),
    }),
  }),
});

/** Shared cursor-pagination query for /api/mobile list endpoints.
 *  The 50-item server cap is applied by the mobile pagination helper
 *  (clamped, not rejected) — see backend/src/api/mobile/pagination.ts. */
export const cursorPaginationQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).default(20),
  cursor: z.string().min(1).optional(),
});

/** Shared cursor-pagination page envelope for /api/mobile list endpoints. */
export function cursorPageSchema<T extends z.ZodTypeAny>(itemSchema: T) {
  return z.object({
    items: z.array(itemSchema),
    nextCursor: z.string().nullable(),
  });
}

/** GET /api/mobile/syllabus — compact class → subject tree for the native app. */
export const mobileSyllabusSubjectSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
});

export const mobileSyllabusResponseSchema = z.object({
  ok: z.literal(true),
  data: z.object({
    classes: z.array(
      z.object({
        id: z.string().min(1),
        slug: z.string().min(1),
        name: z.string().min(1),
        subjects: z.array(mobileSyllabusSubjectSchema),
      }),
    ),
  }),
});

/** GET /api/mobile/units?subject=… — units (chapters) for one subject. */
export const mobileUnitSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  order: z.number().int(),
  topicCount: z.number().int().nonnegative(),
});

export const mobileUnitsResponseSchema = z.object({
  ok: z.literal(true),
  data: z.object({
    subject: z.object({
      id: z.string().min(1),
      slug: z.string().min(1),
      name: z.string().min(1),
    }),
    units: z.array(mobileUnitSchema),
  }),
});

/** GET /api/mobile/notes — cursor-paginated r-notes catalog. */
export const mobileNoteItemSchema = z.object({
  id: z.string().min(1),
  subject: z.string(),
  chapter: z.string(),
  title: z.string(),
  noteCount: z.number().int().nonnegative(),
});

export const mobileNotesResponseSchema = z.object({
  ok: z.literal(true),
  data: cursorPageSchema(mobileNoteItemSchema),
});

/** GET /api/mobile/practice — cursor-paginated exam catalog. */
export const mobileExamItemSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  durationMin: z.number().int().nonnegative(),
  questionCount: z.number().int().nonnegative(),
});

export const mobilePracticeResponseSchema = z.object({
  ok: z.literal(true),
  data: cursorPageSchema(mobileExamItemSchema),
});

/** GET /api/mobile/community — cursor-paginated public post list. */
export const mobileCommunityPostSchema = z.object({
  id: z.string().min(1),
  authorId: z.string().min(1),
  title: z.string().min(1),
  body: z.string(),
  category: z.string(),
  kind: z.string(),
  createdAt: z.string().min(1),
  updatedAt: z.string().min(1),
});

export const mobileCommunityResponseSchema = z.object({
  ok: z.literal(true),
  data: cursorPageSchema(mobileCommunityPostSchema),
});

/** GET /api/v2/meta */
export const apiV2MetaSchema = z.object({
  apiVersion: z.literal(2),
  stable: z.boolean(),
  legacyBase: z.literal("/api"),
  deprecated: z.array(z.string()),
  requirements: appRequirementsSchema,
});