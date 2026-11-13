import { z } from "zod";

/** Shared success/error envelope used by backend `lib/response.ts`. */
export const apiErrorSchema = z.object({
  message: z.string(),
  code: z.string().optional(),
  details: z.unknown().optional(),
});

export const apiEnvelopeSchema = z.object({
  ok: z.boolean(),
  data: z.unknown().optional(),
  error: z.union([z.string(), apiErrorSchema]).optional(),
  meta: z.record(z.string(), z.unknown()).optional(),
});

export type ApiEnvelope<T = unknown> = {
  ok: boolean;
  data?: T;
  error?: string | z.infer<typeof apiErrorSchema>;
  meta?: Record<string, unknown>;
};
