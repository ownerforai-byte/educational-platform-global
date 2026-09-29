import {
  getSubjectSyllabus,
  getUnitSyllabus,
  getUnitTopicEntries,
  SYLLABUS,
} from "../../syllabus";

/**
 * Syllabus reference check (PLANS.md §4.6).
 *
 * Enforces `frontend/agents.md` §1–§2: content may not exist outside the
 * syllabus. `validate.ts` runs this for every in-scope file; `doctor.ts`
 * reports it; the build refuses nothing on its own (the validator is the gate).
 *
 * Field-name reality check (the plan asked for this): `ClassSyllabus` has NO
 * `id` — its `slug` IS the content directory name (`class-11-notes`), while the
 * CLI's `CLASS_DIR_TO_SLUG` yields the short form (`class-11`). Both spellings
 * are indexed here so either caller works.
 */

const unitsByKey = new Map<string, Set<string>>();
const topicEntriesByKey = new Map<string, { slug: string; title: string }[]>();

const addClassKey = (key: string, unitIds: string[]) => {
  const set = unitsByKey.get(key);
  if (set) unitIds.forEach((u) => set.add(u));
  else unitsByKey.set(key, new Set(unitIds));
};

for (const cls of SYLLABUS) {
  const short = cls.slug.replace(/-notes$/, ""); // class-11-notes → class-11
  for (const subject of cls.subjects) {
    const unitIds = subject.units.map((u) => u.id);
    addClassKey(`${cls.slug}.${subject.slug}`, unitIds);
    addClassKey(`${short}.${subject.slug}`, unitIds);
    for (const unit of subject.units) {
      const entries = getUnitTopicEntries(unit).map((t) => ({ slug: t.slug, title: t.title }));
      topicEntriesByKey.set(`${cls.slug}.${subject.slug}.${unit.id}`, entries);
      topicEntriesByKey.set(`${short}.${subject.slug}.${unit.id}`, entries);
    }
  }
}

/** Accepts `class-11-notes` (directory / syllabus) or `class-11` (short form). */
function resolveSubject(classSlug: string, subjectSlug: string) {
  const direct = getSubjectSyllabus(classSlug, subjectSlug);
  if (direct) return direct;
  const withNotes = classSlug.endsWith("-notes") ? null : getSubjectSyllabus(`${classSlug}-notes`, subjectSlug);
  return withNotes ?? undefined;
}

export type RefCheck = { ok: boolean; reason?: string };

/**
 * Enforces `frontend/agents.md` §1–§2: content may not exist outside the
 * syllabus. Topic matching mirrors `getTopicEntryBySlug` (exact slug first, then
 * every slug-word appearing in the title) because measured corpus topic slugs do
 * not always equal the full syllabus slug.
 */
export function checkSyllabusRef(
  classSlug: string,
  subjectSlug: string,
  unitSlug: string,
  topicSlug: string,
): RefCheck {
  const units = unitsByKey.get(`${classSlug}.${subjectSlug}`);
  if (!units) return { ok: false, reason: `unknown class/subject ${classSlug}/${subjectSlug}` };
  if (!units.has(unitSlug)) return { ok: false, reason: `unit "${unitSlug}" is not in the syllabus` };

  const entries = topicEntriesByKey.get(`${classSlug}.${subjectSlug}.${unitSlug}`) ?? [];
  if (entries.length === 0) return { ok: true }; // unit exists but carries no topics yet
  if (entries.some((t) => t.slug === topicSlug)) return { ok: true };

  const words = topicSlug.toLowerCase().split(/-+/).filter(Boolean);
  if (words.length > 0) {
    const hit = entries.some((t) => {
      const lower = t.title.toLowerCase();
      return words.every((w) => lower.includes(w));
    });
    if (hit) return { ok: true };
  }
  return { ok: false, reason: `topic "${topicSlug}" is not a syllabus topic of unit "${unitSlug}"` };
}

/** Unit-only check — mindmap files are unit-level artifacts with no topic. */
export function checkSyllabusUnit(classSlug: string, subjectSlug: string, unitSlug: string): RefCheck {
  const units = unitsByKey.get(`${classSlug}.${subjectSlug}`);
  if (!units) return { ok: false, reason: `unknown class/subject ${classSlug}/${subjectSlug}` };
  if (!units.has(unitSlug)) return { ok: false, reason: `unit "${unitSlug}" is not in the syllabus` };
  return { ok: true };
}

/** Unit ids for a class/subject — kept for error text and `doctor` output. */
export function syllabusUnitsFor(classSlug: string, subjectSlug: string): string[] {
  const subject = resolveSubject(classSlug, subjectSlug);
  return subject ? subject.units.map((u) => u.id) : [];
}

export { getUnitSyllabus };
