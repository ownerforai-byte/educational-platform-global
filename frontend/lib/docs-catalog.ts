/**
 * THE STUDY-DOCUMENTS CATALOG — the single source of truth for every document
 * the platform ships (PDFs under /pdfs, everything else under /materials).
 *
 * Owner request (2026-10-23): "resources(all docs and added pdfs here)" — the
 * per-topic Resources tab must list ALL documents and added PDFs, so the
 * catalog is shared by the PDF Library page (/pdfs) and the per-topic content
 * tabs (components/content/content-tabs.tsx) instead of living inside one
 * page. New documents and added PDFs are registered HERE.
 */

export type Kind = "pdf" | "html" | "md" | "docx";
export type Subject =
  | "Biology"
  | "Physics"
  | "Chemistry"
  | "Mathematics"
  | "English";

export type Doc = {
  key: string;
  title: string;
  subject: Subject;
  topic: string;
  description: string;
  href: string;
  kind: Kind;
};

// Static study materials. PDFs live under /pdfs, everything else under /materials
// (both served from frontend/public, so they need no backend / auth).
export const PDFS_DIR = "/pdfs";
export const MAT_DIR = "/materials";

export const DOCS: Doc[] = [
  // ── Biology ───────────────────────────────────────────────────────────
  {
    key: "pioneer-grade11-biology-examcram",
    title: "Pioneer Grade 11 Biology — Exam Cram (Enhanced)",
    subject: "Biology",
    topic: "Class 11 · Full syllabus",
    description:
      "Full-syllabus rapid revision across Class 11 Biology — enhanced layout with section bookmarks and model answers.",
    href: `${PDFS_DIR}/pioneer-grade11-biology-examcram.pdf`,
    kind: "pdf",
  },
  {
    key: "bacteria-nutrition-classified-v2",
    title: "Nutrition in Bacteria — Fully Classified",
    subject: "Biology",
    topic: "Class 11/12 · Study guide",
    description:
      "Every nutritional type sorted by energy, carbon and electron source — tables, diagrams, 4-mark and 4.8-mark answer blocks.",
    href: `${PDFS_DIR}/bacteria-nutrition-classified-v2.pdf`,
    kind: "pdf",
  },
  {
    key: "biology-8mark-long-questions",
    title: "Biology — Probable 8-Mark Long Questions",
    subject: "Biology",
    topic: "Class 11 · Model answers",
    description:
      "Sixteen probable long-answer questions with full model answers, diagrams and marking points.",
    href: `${PDFS_DIR}/biology-8mark-long-questions.pdf`,
    kind: "pdf",
  },
  {
    key: "intro-microbiology-kingdom-monera",
    title: "Introductory Microbiology — Kingdom Monera",
    subject: "Biology",
    topic: "Class 11 · Notes",
    description:
      "Monera characteristics, bacterial structure and classification — compact revision notes.",
    href: `${PDFS_DIR}/bacteria.pdf`,
    kind: "pdf",
  },
  {
    key: "meiosis-cell-division",
    title: "Meiosis — Cell Division",
    subject: "Biology",
    topic: "Class 11 · Diagrams",
    description:
      "Illustrated meiosis walkthrough with the stages of cell division laid out step by step.",
    href: `${PDFS_DIR}/meiosis.pdf`,
    kind: "pdf",
  },
  {
    key: "cell-biology-masterclass-slides",
    title: "Cell Biology — Masterclass Slides",
    subject: "Biology",
    topic: "Slides",
    description: "Optimised slide-style notes covering the full cell-biology unit.",
    href: `${MAT_DIR}/cell-biology-masterclass-slides.md`,
    kind: "md",
  },
  {
    key: "biology-units-1to5-mindmap-architecture",
    title: "Biology Units 1–5 — Mindmap Architecture",
    subject: "Biology",
    topic: "Study Material",
    description: "Concept-mindmap architecture for Biology Units 1 to 5.",
    href: `${MAT_DIR}/biology-units-1to5-mindmap-architecture.docx`,
    kind: "docx",
  },
  {
    key: "biology-units-1to5-conceptual-notes",
    title: "Biology Units 1–5 — Conceptual Study Notes",
    subject: "Biology",
    topic: "Study Material",
    description: "Conceptual study notes for Biology Units 1 to 5.",
    href: `${MAT_DIR}/biology-units-1to5-conceptual-notes.docx`,
    kind: "docx",
  },

  // ── Physics ───────────────────────────────────────────────────────────
  {
    key: "ideal-and-real-gases-notes",
    title: "Ideal & Real Gases — Notes",
    subject: "Physics",
    topic: "Thermodynamics",
    description: "Kinetic theory, ideal gas law and deviations of real gases (van der Waals).",
    href: `${MAT_DIR}/ideal-and-real-gases-notes.pdf`,
    kind: "pdf",
  },
  {
    key: "liquid-state-notes",
    title: "Liquid State — Notes",
    subject: "Physics",
    topic: "States of Matter",
    description: "Intermolecular forces, viscosity, surface tension and liquid crystals.",
    href: `${MAT_DIR}/liquid-state-notes.pdf`,
    kind: "pdf",
  },
  {
    key: "liquid-crystal",
    title: "Liquid Crystals",
    subject: "Physics",
    topic: "States of Matter",
    description: "Mesophase behaviour and the physics of liquid-crystal materials.",
    href: `${MAT_DIR}/liquid-crystal.pdf`,
    kind: "pdf",
  },
  {
    key: "physics-guide-with-diagrams",
    title: "Physics Guide — With Diagrams",
    subject: "Physics",
    topic: "Illustrated",
    description: "9 illustrated diagrams with step-by-step worked explanations.",
    href: `${MAT_DIR}/physics-guide-with-diagrams.html`,
    kind: "html",
  },
  {
    key: "physics-mcq-test",
    title: "Physics — MCQ Test",
    subject: "Physics",
    topic: "Practice",
    description: "Optimised multiple-choice practice set.",
    href: `${MAT_DIR}/physics-mcq-test.md`,
    kind: "md",
  },
  {
    key: "physics-comprehensive-guide",
    title: "Physics Comprehensive Guide",
    subject: "Physics",
    topic: "Reference",
    description: "Tables + synonym/reference material for the physics unit.",
    href: `${MAT_DIR}/physics-comprehensive-guide.docx`,
    kind: "docx",
  },
  {
    key: "physics-conceptual-question-bank",
    title: "Physics — Conceptual Question Bank",
    subject: "Physics",
    topic: "140+ Qs",
    description: "140+ conceptual questions with reasoning.",
    href: `${MAT_DIR}/physics-conceptual-question-bank.docx`,
    kind: "docx",
  },

  // ── Chemistry ─────────────────────────────────────────────────────────
  {
    key: "chemistry-mcq-test",
    title: "Chemistry — MCQ Test",
    subject: "Chemistry",
    topic: "Practice",
    description: "Optimised multiple-choice practice set.",
    href: `${MAT_DIR}/chemistry-mcq-test.md`,
    kind: "md",
  },

  // ── Mathematics ───────────────────────────────────────────────────────
  {
    key: "math-mcq-test",
    title: "Math — MCQ Test",
    subject: "Mathematics",
    topic: "Practice",
    description: "Optimised multiple-choice practice set.",
    href: `${MAT_DIR}/math-mcq-test.md`,
    kind: "md",
  },

  // English
  {
    key: "neb-essays-grade11-12",
    title: "NEB Essays — Grade 11 & 12",
    subject: "English",
    topic: "Essay Writing",
    description:
      "Model essays for NEB Grade 11 and 12 English — structure, arguments and polished vocabulary for the board exam.",
    href: `${PDFS_DIR}/neb-essays-grade11-12.pdf`,
    kind: "pdf",
  },
];

export const SUBJECT_ORDER: Subject[] = [
  "Biology",
  "Physics",
  "Chemistry",
  "Mathematics",
  "English",
];
