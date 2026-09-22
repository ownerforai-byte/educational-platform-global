import type { KnowledgeSection } from "@/features/knowledge/types";
import { PHYSICS_CHAPTERS_A } from "./sections/numerical-physics-a";
import { PHYSICS_CHAPTERS_B } from "./sections/numerical-physics-b";
import { CHEMISTRY_CHAPTERS } from "./sections/numerical-chemistry";
import { BIOLOGY_CHAPTERS } from "./sections/biology-diagrams";
import { GRAMMAR_CHAPTERS } from "./sections/grammar";
import { WRITING_CHAPTERS } from "./sections/writing";
import { BYAKARAN_CHAPTERS } from "./sections/byakaran";

/**
 * The six Knowledge Hub sections with their full pro-level chapter sets.
 * Every chapter carries all five knowledge kinds, each on its own page:
 *   /knowledge/pro/<section>/<chapter>/<kind>
 */
export const PRO_SECTIONS: KnowledgeSection[] = [
  {
    id: "numerical-physics",
    title: "Numerical Physics",
    subtitle:
      "Pro-level physics knowledge: every chapter with full theory at three levels, a complete formula vault with symbol meanings and validity, special cases, exam tricks and the traps that cost marks.",
    chapters: [...PHYSICS_CHAPTERS_A, ...PHYSICS_CHAPTERS_B],
  },
  {
    id: "numerical-chemistry",
    title: "Numerical Chemistry",
    subtitle:
      "Calculation-centred chemistry: the mole as a bridge, gas laws, ionic equilibrium and buffers, energetics and electrochemistry — each with formulas, edge cases and speed techniques.",
    chapters: CHEMISTRY_CHAPTERS,
  },
  {
    id: "biology-diagrams",
    title: "Biology Diagrams",
    subtitle:
      "Diagram mastery: the exact label sets, identification features, ultrastructure details and drawing tricks for cells, plant morphology, and human systems.",
    chapters: BIOLOGY_CHAPTERS,
  },
  {
    id: "grammar",
    title: "English Grammar",
    subtitle:
      "Complete English grammar: parts of speech, all twelve tenses, voice and narration, clauses and conditionals, modals and articles — with rules, cases and error traps.",
    chapters: GRAMMAR_CHAPTERS,
  },
  {
    id: "writing",
    title: "English Writing",
    subtitle:
      "Writing craft: paragraph and essay structure, letters and emails, reports and articles, creative writing and textual skills — formats, formulas and mark-earning skeletons.",
    chapters: WRITING_CHAPTERS,
  },
  {
    id: "byakaran",
    title: "नेपाली व्याकरण",
    subtitle:
      "नेपाली व्याकरणको पूर्ण ज्ञान: शब्दभेद, लिङ्ग-वचन-पुरुष-काल, कारक, समास, सन्धि र अलंकार — सूत्र, अपवाद र परीक्षामा सोधिने ट्रिकसहित।",
    chapters: BYAKARAN_CHAPTERS,
  },
];

export function getProSection(sectionId: string): KnowledgeSection | undefined {
  return PRO_SECTIONS.find((s) => s.id === sectionId);
}

/** Total authored items across every section — used for hub-level counts. */
export function proTotals() {
  let theory = 0;
  let formulas = 0;
  let specialCases = 0;
  let tricks = 0;
  let mistakes = 0;
  let chapters = 0;
  for (const s of PRO_SECTIONS) {
    for (const c of s.chapters) {
      chapters += 1;
      theory += c.theory.length;
      formulas += c.formulas.length;
      specialCases += c.specialCases.length;
      tricks += c.tricks.length;
      mistakes += c.mistakes.length;
    }
  }
  return { sections: PRO_SECTIONS.length, chapters, theory, formulas, specialCases, tricks, mistakes };
}
