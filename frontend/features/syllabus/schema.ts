import { z } from "zod";

export const subjectParamsSchema = z.object({
  subject: z.string().min(1).max(80),
});

export const unitParamsSchema = subjectParamsSchema.extend({
  unit: z.string().min(1).max(120),
});

export const topicParamsSchema = unitParamsSchema.extend({
  topicSlug: z.string().min(1).max(120),
});

export type SubjectParams = z.infer<typeof subjectParamsSchema>;
export type UnitParams = z.infer<typeof unitParamsSchema>;
export type TopicParams = z.infer<typeof topicParamsSchema>;

/**
 * Safe param parsers — this module's "opening" into the working syllabus tree.
 *
 * Every syllabus route's URL segments run through one of these before a
 * lookup, so an empty or absurdly long slug is rejected up front (the caller
 * maps `null` to `notFound()`) instead of reaching the data layer. Each wraps
 * the zod schema above and returns the typed, validated params or `null`.
 */
export function parseSubjectParams(params: unknown): SubjectParams | null {
  const parsed = subjectParamsSchema.safeParse(params);
  return parsed.success ? parsed.data : null;
}

export function parseUnitParams(params: unknown): UnitParams | null {
  const parsed = unitParamsSchema.safeParse(params);
  return parsed.success ? parsed.data : null;
}

export function parseTopicParams(params: unknown): TopicParams | null {
  const parsed = topicParamsSchema.safeParse(params);
  return parsed.success ? parsed.data : null;
}
