export type SubjectIconName = "atom" | "book" | "dna" | "flask" | "languages" | "sigma";

/**
 * PER-SUBJECT AI CLASSROOMS (owner 2026-10-25: "one interface per subject with
 * their own history — no mix up, for clarity" and "dont remove the existing,
 * keep it with its history and create a new for all subject with their chat
 * history").
 *
 * The general Veer consoles (/chat, /ai/tutor) keep their shared history —
 * this registry powers SIX dedicated teaching interfaces, one per NEB subject,
 * and every one of them owns a private conversation history:
 *
 *   · server histories are namespaced `subj:<slug>:<id>` — the chat-history
 *     API filters by that prefix, so a Physics conversation never shows up in
 *     the Mathematics classroom (or in the general console);
 *   · signed-out threads mirror to their own localStorage key per subject.
 *
 * Each classroom is "pro in its own representation": its accent, its teaching
 * focus in the system prompt, and its own starter problems.
 */

import type { SubjectSlug } from "@/types/content";
export type { SubjectSlug } from "@/types/content";

export interface SubjectStarter {
  label: string;
  text: string;
}

export interface SubjectClassroom {
  slug: SubjectSlug;
  /** Short subject name — "Physics". */
  subject: string;
  /** Interface title — "Physics Classroom". */
  title: string;
  tagline: string;
  icon: SubjectIconName;
  /** Tailwind text colour for the subject accent. */
  accent: string;
  /** Tailwind background tint for the subject accent. */
  accentBg: string;
  /** Tailwind border tint for the subject accent. */
  accentBorder: string;
  /**
   * Extra system-prompt block appended to the platform prompt: how this
   * classroom teaches its subject ("pro in their respective representation").
   */
  focus: string;
  starters: SubjectStarter[];
}

export const SUBJECT_CLASSROOMS: SubjectClassroom[] = [
  {
    slug: "physics",
    subject: "Physics",
    title: "Physics Classroom",
    tagline: "Derivations, numericals and labelled diagrams — NEB Physics XI & XII.",
    icon: "atom",
    accent: "text-sky-500",
    accentBg: "bg-sky-500/10",
    accentBorder: "border-sky-500/30",
    focus:
      "\n\nCLASSROOM (PHYSICS): teach NEB Class 11/12 Physics like a master teacher — state the physical principle first, then the derivation with every step on its own line and its reason named, then a worked numerical with SI units on every quantity. Draw labelled vector diagrams (```svg fences — ray circuits, free-body, fields) whenever geometry or direction matters. Flag the sign conventions and the exam traps in every answer.",
    starters: [
      { label: "Derivation", text: "Derive the Lens Maker's formula step by step with sign conventions." },
      { label: "Numerical", text: "A ball is thrown at 30° with 20 m/s — find time of flight, range and max height (g = 10 m/s²), with units." },
      { label: "Concept", text: "Explain Carnot engine cycle and maximum theoretical efficiency with a P–V diagram." },
      { label: "Diagram", text: "Draw and explain the labelled ray diagram for a convex lens forming a real image." },
    ],
  },
  {
    slug: "chemistry",
    subject: "Chemistry",
    title: "Chemistry Classroom",
    tagline: "Mechanisms, reactions and apparatus — physical, organic and inorganic.",
    icon: "flask",
    accent: "text-emerald-500",
    accentBg: "bg-emerald-500/10",
    accentBorder: "border-emerald-500/30",
    focus:
      "\n\nCLASSROOM (CHEMISTRY): teach NEB Class 11/12 Chemistry like a master teacher — every reaction with its mechanism (curled electron-flow arrows in ```svg diagrams), every numerical with mole logic and units, every trend with its reason. Name the apparatus in process diagrams (distillation, titration, electrolysis) and keep IUPAC notation exact. End with the exam-common mistakes on this topic.",
    starters: [
      { label: "Mechanism", text: "Compare SN1 and SN2 reaction mechanisms, kinetics and stereochemistry step by step." },
      { label: "Numerical", text: "Balance KMnO₄ + Fe²⁺ in acidic medium and solve the titration mole calculation step by step." },
      { label: "Concept", text: "Explain the Inert Pair Effect in heavier p-block elements with examples and causes." },
      { label: "Diagram", text: "Draw and explain the labelled setup for the electrolysis of brine." },
    ],
  },
  {
    slug: "biology",
    subject: "Biology",
    title: "Biology Classroom",
    tagline: "Life cycles, pathways and labelled structures — botany and zoology.",
    icon: "dna",
    accent: "text-pink-500",
    accentBg: "bg-pink-500/10",
    accentBorder: "border-pink-500/30",
    focus:
      "\n\nCLASSROOM (BIOLOGY): teach NEB Class 11/12 Biology like a master teacher — structure first, then process: every cycle with each stage and its ploidy (n/2n), every pathway with substrate → enzyme → product per compartment, every organ system with a labelled ```svg diagram (every part named, italic genus species). Connect form to function in every paragraph and close with the exam marking points.",
    starters: [
      { label: "Process", text: "Describe the steps of DNA replication and the role of DNA Polymerase III, in order." },
      { label: "Comparison", text: "Compare aerobic and anaerobic respiration with their ATP yields in a table." },
      { label: "Diagram", text: "Draw a labelled diagram of a plant cell and explain the function of every organelle." },
      { label: "Cycle", text: "Explain the alternation of generations in a fern life cycle with ploidy at each stage." },
    ],
  },
  {
    slug: "mathematics",
    subject: "Mathematics",
    title: "Mathematics Classroom",
    tagline: "Proofs, derivations and problem solving — every step on its own line.",
    icon: "sigma",
    accent: "text-violet-500",
    accentBg: "bg-violet-500/10",
    accentBorder: "border-violet-500/30",
    focus:
      "\n\nCLASSROOM (MATHEMATICS): teach NEB Class 11/12 Mathematics like a master teacher — every proof as a numbered chain where each step sits on its OWN line and states why it follows from the previous one; never compress working into one line. Box the final result with $$\\boxed{...}$$. Include a short verification (substitute back / dimensional check) and one exam-style variant problem.",
    starters: [
      { label: "Proof", text: "Prove lim(x→0) [sin(x)/x] = 1 using the Sandwich (Squeeze) Theorem, one step per line." },
      { label: "Algebra", text: "Complete the square for x² + 6x + 5, state the vertex form, and verify it by expanding back." },
      { label: "Calculus", text: "Find the derivative of f(x) = x^x from first principles, showing every transformation." },
      { label: "Geometry", text: "Prove that the angle subtended by a diameter is a right angle, with a labelled figure." },
    ],
  },
  {
    slug: "nepali",
    subject: "नेपाली",
    title: "नेपाली कक्षा — Nepali Classroom",
    tagline: "व्याकरण, रचना र साहित्य — नेपाली भाषामा नै शिक्षण।",
    icon: "languages",
    accent: "text-amber-500",
    accentBg: "bg-amber-500/10",
    accentBorder: "border-amber-500/30",
    focus:
      "\n\nCLASSROOM (नेपाली): यो शुद्ध नेपाली कक्षा हो — NEB कक्षा ११/१२ नेपाली मात्र, र हरेक उत्तर नेपाली भाषामा लेख्ने (प्रश्न जुन भाषामा सोधिए पनि)। व्याकरण नियम, उदाहरण, छन्द, रस-अलङ्कार र रचना विश्लेषण परम्परागत ढङ्गले, चरणबद्ध रूपमा प्रस्तुत गर्ने। देवनागरी लिपिमा स्पष्ट रूपमा लेख्ने।",
    starters: [
      { label: "व्याकरण", text: "कर्ता, कर्म र भावकारकका धातुरूप छुट्याउनुहोस् र प्रयोग देखाउनुहोस्।" },
      { label: "व्याकरण", text: "र्‍यापि र जमर्‍यापि के हो? फरक र उदाहरणसहित बुझाउनुहोस्।" },
      { label: "साहित्य", text: "रस, अलङ्कार र छन्दको परिचय उदाहरणसहित दिनुहोस्।" },
      { label: "रचना", text: "निबन्ध लेख्ने क्रम (चरण) कसरी बुझ्ने र लेख्ने? प्रारूपसहित।" },
    ],
  },
  {
    slug: "english",
    subject: "English",
    title: "English Classroom",
    tagline: "Grammar, writing and language development — origin-first, with citations.",
    icon: "book",
    accent: "text-indigo-500",
    accentBg: "bg-indigo-500/10",
    accentBorder: "border-indigo-500/30",
    focus:
      "\n\nCLASSROOM (ENGLISH): teach the English language itself — grammar, writing skill, language development and idea generation — origin-first: why a rule exists and how it formed, before its usage. Show wrong examples and explain WHY they are wrong. Structure writing tasks with outlines and model paragraphs, and cite the grammar authority behind every rule.",
    starters: [
      { label: "Grammar", text: "Explain clauses with their types — with examples and why each is classified that way." },
      { label: "Grammar", text: "Teach the English tenses from origin — why each tense exists and how it formed." },
      { label: "Writing", text: "Generate 10 essay ideas for NEB practice and outline the best one fully." },
      { label: "Vocabulary", text: "How do I build my English vocabulary from roots, prefixes and suffixes?" },
    ],
  },
];

export function getSubjectClassroom(slug: string): SubjectClassroom | undefined {
  return SUBJECT_CLASSROOMS.find((c) => c.slug === slug);
}

/** History namespace for one classroom — `subj:physics:` etc. */
export function subjectSessionPrefix(slug: SubjectSlug): string {
  return `subj:${slug}:`;
}

/** A fresh conversation id inside one classroom's private history. */
export function newSubjectSession(slug: SubjectSlug): string {
  return `${subjectSessionPrefix(slug)}t-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

/** Signed-out thread mirror key — one per subject, never shared. */
export function subjectThreadKey(slug: SubjectSlug): string {
  return `neb_subject_thread_${slug}`;
}

/** Signed-in active-session key — one per subject, never shared. */
export function subjectSessionKey(slug: SubjectSlug): string {
  return `neb_subject_session_${slug}`;
}
