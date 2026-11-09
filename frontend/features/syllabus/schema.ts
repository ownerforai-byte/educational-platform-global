import { z } from "zod";

/**
 * Decode a route segment that may arrive percent-encoded.
 *
 * Next hands non-ASCII dynamic segments encoded (`[topicSlug]` =
 * `%E0%A4%AA%E0%A4%BE…` for `पाठ-१-…`), and each Devanagari glyph becomes NINE
 * ASCII chars when encoded — so a 40-char Nepali slug validates as 300+
 * chars. Decoding must therefore happen BEFORE the length guard, or every
 * long Nepali topic is rejected with a hard 404 even though its page is in
 * `generateStaticParams`.
 */
function decodeSegment(value: unknown): unknown {
  if (typeof value !== "string" || !value.includes("%")) return value;
  try {
    return decodeURIComponent(value) || value;
  } catch {
    // Malformed percent-escape: treat the input as already decoded.
    return value;
  }
}

function decodeParams(params: unknown): unknown {
  if (!params || typeof params !== "object") return params;
  const source = params as Record<string, unknown>;
  const decoded: Record<string, unknown> = { ...source };
  for (const key of ["subject", "unit", "topicSlug"] as const) {
    if (key in decoded) decoded[key] = decodeSegment(decoded[key]);
  }
  return decoded;
}

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
  const parsed = subjectParamsSchema.safeParse(decodeParams(params));
  return parsed.success ? parsed.data : null;
}

export function parseUnitParams(params: unknown): UnitParams | null {
  const parsed = unitParamsSchema.safeParse(decodeParams(params));
  return parsed.success ? parsed.data : null;
}

export function parseTopicParams(params: unknown): TopicParams | null {
  const parsed = topicParamsSchema.safeParse(decodeParams(params));
  return parsed.success ? parsed.data : null;
}
