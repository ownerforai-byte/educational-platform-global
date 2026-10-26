/**
 * Nepali exercise taxonomy (अभ्यासका प्रकारहरू).
 *
 * Owner request (2026-10-24): "create all types of exercise pages for each
 * unit's topic of nepali as it has no pages for its contents" — every Nepali
 * unit/topic gets one scaffold page per exercise type below. The pages exist
 * from day one; the exercise sets and worked solutions land on them later.
 */

export type TopicExerciseType = {
  /** URL segment under `.../exercises/` — the type's own page. */
  id: string;
  /** English label (headers, breadcrumbs). */
  title: string;
  /** Devanagari label — the name students see in the textbook अभ्यास. */
  devanagari: string;
  /** What will live on the page. */
  description: string;
};

/** All exercise types, in the order the textbook अभ्यास is organized. */
export const NEPALI_EXERCISE_TYPES: readonly TopicExerciseType[] = [
  {
    id: "shabda-bhandar",
    title: "Vocabulary",
    devanagari: "शब्द भण्डार",
    description:
      "शब्दार्थ, समानार्थक र विपरीतार्थक शब्द, उखान-थिचौका र शब्द प्रयोगका अभ्यास।",
  },
  {
    id: "bodh-abhyas",
    title: "Comprehension & Q&A",
    devanagari: "बोध र अभ्यास",
    description:
      "पाठ बुझाइमा आधारित प्रश्नोत्तर, भावार्थ, कथावस्तु र पाठगत बोधका अभ्यास।",
  },
  {
    id: "vyakaran",
    title: "Grammar Practice",
    devanagari: "व्याकरण",
    description:
      "पदप्रकरण, काल, समास, वाक्य शुद्धिकरण र अन्य व्याकरणिक अभ्यासहरू।",
  },
  {
    id: "rachana-lekhan",
    title: "Creative Writing",
    devanagari: "रचना र लेखन",
    description:
      "निबन्ध, चिठी, संवाद, दैनिकी, वक्तृता र सिर्जनात्मक लेखनका अभ्यास।",
  },
  {
    id: "vastugat-prashna",
    title: "Objective Questions",
    devanagari: "वस्तुगत प्रश्नहरू",
    description:
      "बहुविकल्पीय प्रश्न, खाली ठाउँ भर्ने र सही-गलत चिन्ने अभ्यासहरू।",
  },
  {
    id: "laghu-uttariya",
    title: "Short Answer Questions",
    devanagari: "लघु उत्तरीय प्रश्नहरू",
    description:
      "छोटो उत्तर दिनुपर्ने परीक्षामुखी प्रश्नहरू र छिटो उत्तर लेख्ने अभ्यास।",
  },
  {
    id: "dirgha-uttariya",
    title: "Long Answer Questions",
    devanagari: "दीर्घ उत्तरीय प्रश्नहरू",
    description:
      "विस्तृत उत्तर आवश्यक पर्ने प्रश्नहरू, विश्लेषण र व्याख्यात्मक अभ्यास।",
  },
] as const;

/**
 * Exercise types configured for a subject. Nepali carries the full textbook
 * अभ्यास taxonomy (above); other subjects keep their single exercises
 * scaffold until their own taxonomies are requested.
 */
export function getExerciseTypes(subjectSlug: string): TopicExerciseType[] {
  return subjectSlug === "nepali" ? [...NEPALI_EXERCISE_TYPES] : [];
}

/** Resolve one exercise type page target for a subject (null → notFound). */
export function getExerciseType(
  subjectSlug: string,
  exerciseTypeId: string,
): TopicExerciseType | null {
  return (
    getExerciseTypes(subjectSlug).find((type) => type.id === exerciseTypeId) ??
    null
  );
}
