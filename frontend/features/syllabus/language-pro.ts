/**
 * Language syllabus pro track — Nepali and English topics.
 *
 * These subjects are language study, not STEM drill subjects: their topic pages
 * carry only the companion content tabs (notes, quick 3 self-check, related
 * topics, bounds & limits, exam tips, journal, resources). MCQs, step-by-step
 * numericals and the entrance bank do not belong on them.
 *
 * The `/pro` route, the tab profile resolver and every topic link that should
 * land on a language page read this one list, so the routes and the links can
 * never disagree.
 */

export const LANGUAGE_PRO_SUBJECTS = ["nepali", "english"] as const;

export type LanguageProSubject = (typeof LANGUAGE_PRO_SUBJECTS)[number];

/** True when this subject's topics open the companion-only language surface. */
export function hasLanguageProTrack(subjectSlug: string): boolean {
  return (LANGUAGE_PRO_SUBJECTS as readonly string[]).includes(subjectSlug);
}
