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
  | "English"
  | "Nepali";

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
    key: "study-hub",
    title: "Study Hub — Biology · Chemistry · Physics",
    subject: "Biology",
    topic: "Cross-subject · Illustrated",
    description:
      "Full-syllabus illustrated study hub across Biology, Chemistry and Physics with searchable chapters and inline diagrams (self-contained).",
    href: `${MAT_DIR}/STUDY_HUB.html`,
    kind: "html",
  },
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
    key: "biology-8mark-core-outlets",
    title: "Biology — 8-Mark Core Outlets",
    subject: "Biology",
    topic: "Class 11 · Model answers",
    description:
      "Core 8-mark long-answer outlets with point-by-point diagrams, marking schemes, and revision outlines.",
    href: `${PDFS_DIR}/biology-8mark-core-outlets.pdf`,
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
  {
    key: "neb-physics-all-probable-questions",
    title: "NEB Physics — All Probable Questions & Diagrams",
    subject: "Physics",
    topic: "Full syllabus · Question Bank",
    description:
      "Full NEB Class 11 Physics probable questions bank with step-by-step worked answers, formulas, and diagrams.",
    href: `${MAT_DIR}/neb-physics-all-probable-questions-answers-diagrams.html`,
    kind: "html",
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
  {
    key: "chemistry-hub",
    title: "Chemistry Hub — Grade 6 to 11 (Chronological)",
    subject: "Chemistry",
    topic: "Full syllabus · Study guide",
    description:
      "Chronological chemistry reference from Grade 6 through Grade 11 — unit-by-unit notes and key reactions in one navigable hub.",
    href: `${MAT_DIR}/CHEMISTRY_HUB.html`,
    kind: "html",
  },
  {
    key: "chemistry-probable-long-qs",
    title: "Chemistry — Probable Long Questions (Atomic, Bonding, Periodic)",
    subject: "Chemistry",
    topic: "Class 11 · Long Questions",
    description:
      "Probable long-answer questions and high-yield scoring points covering Atomic Structure, Chemical Bonding, and Periodic Classification.",
    href: `${MAT_DIR}/neb-chem11-probable-long-qs-atomic-bonding-periodic.docx`,
    kind: "docx",
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
  {
    key: "math-unit-01-algebra",
    title: "Math XI Unit 1 — Algebra Master Resource Guide",
    subject: "Mathematics",
    topic: "Algebra · Full Notes",
    description:
      "Comprehensive master study document covering Logic, Sets, Real Numbers, Functions, Curves, Sequences, Matrices, Quadratics, and Complex Numbers.",
    href: `${MAT_DIR}/Math_XI_Unit_01_algebra.docx`,
    kind: "docx",
  },
  {
    key: "math-unit-02-trigonometry",
    title: "Math XI Unit 2 — Trigonometry Master Guide",
    subject: "Mathematics",
    topic: "Trigonometry · Full Notes",
    description:
      "Master study document covering Inverse Circular Functions, Trigonometric Equations, and standard identity proofs.",
    href: `${MAT_DIR}/Math_XI_Unit_02_trigonometry.docx`,
    kind: "docx",
  },
  {
    key: "math-unit-03-analytic-geometry",
    title: "Math XI Unit 3 — Analytic Geometry Master Guide",
    subject: "Mathematics",
    topic: "Analytic Geometry · Full Notes",
    description:
      "Master document covering Straight Lines, Pair of Straight Lines, Concurrency, and 3D Coordinates in Space.",
    href: `${MAT_DIR}/Math_XI_Unit_03_analytic-geometry.docx`,
    kind: "docx",
  },
  {
    key: "math-unit-04-vectors",
    title: "Math XI Unit 4 — Vectors Master Guide",
    subject: "Mathematics",
    topic: "Vectors · Full Notes",
    description:
      "Master document covering Vector Algebra, Scalar & Vector Products, and Geometric Applications.",
    href: `${MAT_DIR}/Math_XI_Unit_04_vectors.docx`,
    kind: "docx",
  },
  {
    key: "math-unit-05-statistics-probability",
    title: "Math XI Unit 5 — Statistics & Probability Master Guide",
    subject: "Mathematics",
    topic: "Statistics & Probability · Full Notes",
    description:
      "Master document covering Measures of Dispersion, Probability Axioms, Conditional Probability, and Binomial Distribution.",
    href: `${MAT_DIR}/Math_XI_Unit_05_statistics-probability.docx`,
    kind: "docx",
  },
  {
    key: "math-unit-06-calculus",
    title: "Math XI Unit 6 — Calculus Master Guide",
    subject: "Mathematics",
    topic: "Calculus · Full Notes",
    description:
      "Master document covering Limits & Continuity, Differentiation, Derivative Applications, and Definite & Indefinite Antiderivatives.",
    href: `${MAT_DIR}/Math_XI_Unit_06_calculus.docx`,
    kind: "docx",
  },
  {
    key: "math-unit-07-computational-mechanics",
    title: "Math XI Unit 7 — Computational Methods & Mechanics",
    subject: "Mathematics",
    topic: "Computational Methods · Full Notes",
    description:
      "Master document covering Numerical Integration, Linear Programming, and Statics & Dynamics applications.",
    href: `${MAT_DIR}/Math_XI_Unit_07_computational-mechanics.docx`,
    kind: "docx",
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
  {
    key: "writing-hub",
    title: "Writing & Vocabulary Hub — Generic to Pro",
    subject: "English",
    topic: "Writing · Vocabulary",
    description:
      "Guided writing and vocabulary progression from generic to professional level — essay forms, word banks and style upgrades.",
    href: `${MAT_DIR}/WRITING_HUB.html`,
    kind: "html",
  },

  // ── Nepali ────────────────────────────────────────────────────────────
  {
    key: "nepali-hub",
    title: "नेपाली हब — भाषा, व्याकरण र साहित्य",
    subject: "Nepali",
    topic: "Full syllabus · Study guide",
    description:
      "सम्पूर्ण परीक्षा-प्रासङ्गिक नेपाली भाषा, व्याकरण र साहित्य सामग्री — एउटै नेभिगेटेबल हबमा संकलित।",
    href: `${MAT_DIR}/NEPALI_HUB.html`,
    kind: "html",
  },
];

export const SUBJECT_ORDER: Subject[] = [
  "Biology",
  "Physics",
  "Chemistry",
  "Mathematics",
  "English",
  "Nepali",
];
