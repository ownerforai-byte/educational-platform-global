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
