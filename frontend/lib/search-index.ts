/**
 * Client-side search index — instant suggestions from the syllabus, labs,
 * graphs, key concepts, derivations, and worked examples without hitting
 * the backend API.
 *
 * Built lazily on first search and cached in memory. Every entry is tagged
 * with its kind (Unit, Chapter, Topic, Concept, Example, Subject, Lab, Graph, Page)
 * so the UI can clearly badge and distinguish them.
 *
 * [IMPORTANT CORE FILE]
 */

import { SYLLABUS, getUnitTopicEntries } from "./syllabus";
import { LAB_METADATA_LIST } from "./lab-metadata";
import { ALL_GRAPHS } from "./graphs";
import { DERIVATIONS_AND_THEOREMS } from "./derivations-data";

/* ────────────────────────────── types ────────────────────────────── */

export type SearchEntryKind =
  | "Subject"
  | "Unit"
  | "Chapter"
  | "Topic"
  | "Concept"
  | "Example"
  | "Lab"
  | "Graph"
  | "Page";

export interface SearchEntry {
  /** Display title. */
  title: string;
  /** The kind badge to show in the dropdown. */
  kind: SearchEntryKind;
  /** Route to navigate to on selection. */
  href: string;
  /** Breadcrumb pieces: class · subject · parent unit. */
  breadcrumb: string;
  /** All-lowercase search haystack (title + breadcrumb + keywords). */
  haystack: string;
  /** Priority — lower is more important. */
  priority: number;
}

/* ────────────────────────────── helpers ────────────────────────────── */

const CLASS_LABEL: Record<string, string> = {
  "class-11-notes": "Class 11",
  "class-12-notes": "Class 12",
};

const SUBJECT_LABEL: Record<string, string> = {
  physics: "Physics",
  chemistry: "Chemistry",
  biology: "Biology",
  mathematics: "Mathematics",
  english: "English",
  nepali: "Nepali",
};

/** Broad curriculum domains (Units) for NEB subjects */
const MAJOR_UNITS: { title: string; classSlug: string; subjectSlug: string; chapters: string[]; keywords: string }[] = [
  // Physics XI
  { title: "Mechanics", classSlug: "class-11-notes", subjectSlug: "physics", chapters: ["Physical Quantities", "Vectors", "Kinematics", "Dynamics", "Work Energy Power", "Circular Motion", "Gravitation", "Elasticity"], keywords: "force motion velocity acceleration newton gravity energy power" },
  { title: "Heat & Thermodynamics", classSlug: "class-11-notes", subjectSlug: "physics", chapters: ["Heat and Temperature", "Thermal Expansion", "Quantity of Heat", "Rate of Heat Flow", "Ideal Gas"], keywords: "calorimetry conduction convection radiation temperature carnot entropy" },
  { title: "Geometrical Optics", classSlug: "class-11-notes", subjectSlug: "physics", chapters: ["Reflection at Curved Mirror", "Refraction at Plane Surfaces", "Refraction through Prisms", "Lenses", "Dispersion"], keywords: "light mirror lens prism reflection refraction dispersion snell" },
  { title: "Electrostatics & DC Circuits", classSlug: "class-11-notes", subjectSlug: "physics", chapters: ["Electric Charges", "Electric Field", "Potential Difference", "Capacitor", "DC Circuits"], keywords: "charge field potential capacitor capacitance ohm kirchhoff resistance" },
  { title: "Modern Physics", classSlug: "class-11-notes", subjectSlug: "physics", chapters: ["Nuclear Physics", "Solids", "Recent Trends in Physics"], keywords: "nucleus radioactivity semiconductor diode band theory" },

  // Chemistry XI
  { title: "General & Physical Chemistry", classSlug: "class-11-notes", subjectSlug: "chemistry", chapters: ["Foundation and Fundamentals", "Stoichiometry", "Atomic Structure", "Periodic Table", "Chemical Bonding", "Oxidation and Reduction", "States of Matter", "Chemical Equilibrium"], keywords: "mole atom orbital bond redox gas equilibrium bohr rutherford" },
  { title: "Inorganic Chemistry", classSlug: "class-11-notes", subjectSlug: "chemistry", chapters: ["Chemistry of Non-metals", "Chemistry of Metals"], keywords: "hydrogen oxygen halogen nitrogen carbon sodium iron extraction metallurgy" },
  { title: "Organic Chemistry", classSlug: "class-11-notes", subjectSlug: "chemistry", chapters: ["Fundamental Principles of Organic Chemistry", "Hydrocarbons"], keywords: "nomenclature isomerism alkane alkene alkyne resonance inductive effect" },
  { title: "Applied Chemistry", classSlug: "class-11-notes", subjectSlug: "chemistry", chapters: ["Fundamentals of Applied Chemistry", "Modern Chemical Manufactures"], keywords: "cement paper glass chemical industry polymer fertilizer" },

  // Biology XI
  { title: "Botany & Floral Diversity", classSlug: "class-11-notes", subjectSlug: "biology", chapters: ["Biomolecules and Cell Biology", "Floral Diversity", "Introductory Microbiology", "Ecology", "Vegetation"], keywords: "plant cell mitosis meiosis fungi algae gymnosperm angiosperm taxonomy" },
  { title: "Zoology & Faunal Diversity", classSlug: "class-11-notes", subjectSlug: "biology", chapters: ["Introduction to Biology", "Evolutionary Biology", "Faunal Diversity", "Biota and Environment", "Conservation Biology"], keywords: "animal kingdom protozoa porifera chordata earthworm frog evolution" },

  // Mathematics XI
  { title: "Algebra", classSlug: "class-11-notes", subjectSlug: "mathematics", chapters: ["Logic and Sets", "Real Numbers", "Relations and Functions", "Curve Sketching", "Matrices and Determinants", "Quadratic Equations", "Complex Numbers", "Sequences and Series"], keywords: "matrix determinant complex polynomial sequence series induction binomial" },
  { title: "Trigonometry", classSlug: "class-11-notes", subjectSlug: "mathematics", chapters: ["Trigonometric Functions", "Properties of Triangle", "Solution of Triangle"], keywords: "sine cosine tangent triangle angle identity inverse" },
  { title: "Analytic Geometry", classSlug: "class-11-notes", subjectSlug: "mathematics", chapters: ["Straight Lines", "Pair of Straight Lines", "Circle"], keywords: "coordinate distance slope angle perpendicular intersection tangent normal" },
  { title: "Vectors", classSlug: "class-11-notes", subjectSlug: "mathematics", chapters: ["Vectors in Plane", "Dot and Cross Product"], keywords: "scalar vector dot cross magnitude direction component" },
  { title: "Calculus", classSlug: "class-11-notes", subjectSlug: "mathematics", chapters: ["Limits and Continuity", "Derivatives", "Applications of Derivatives", "Anti-derivatives"], keywords: "limit continuity differentiation integral rate tangent max min" },
  { title: "Statistics & Probability", classSlug: "class-11-notes", subjectSlug: "mathematics", chapters: ["Measures of Dispersion", "Probability"], keywords: "mean variance standard deviation permutation combination bayes" },
];

function cleanSnippet(text: string, maxLen = 80): string {
  const s = text.replace(/\s+/g, " ").trim();
  if (s.length <= maxLen) return s;
  const cut = s.slice(0, maxLen);
  const at = cut.lastIndexOf(" ");
  return `${(at > maxLen * 0.6 ? cut.slice(0, at) : cut).replace(/[,;:.]$/, "")}…`;
}

let _cache: SearchEntry[] | null = null;

function buildIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];

  /* ── 1. Major Curriculum Units ── */
  for (const mu of MAJOR_UNITS) {
    const classLabel = CLASS_LABEL[mu.classSlug] ?? mu.classSlug;
    const subj = SUBJECT_LABEL[mu.subjectSlug] ?? mu.subjectSlug;
    entries.push({
      title: `${mu.title} (Unit)`,
      kind: "Unit",
      href: `/${mu.classSlug}/${mu.subjectSlug}`,
      breadcrumb: `${classLabel} · ${subj} Unit · ${mu.chapters.length} chapters`,
      haystack: `${mu.title} unit ${subj} ${classLabel} ${mu.chapters.join(" ")} ${mu.keywords}`.toLowerCase(),
      priority: 1,
    });
  }

  /* ── 2. Syllabus: Subjects, Chapters, Topics ── */
  for (const cls of SYLLABUS) {
    const classLabel = CLASS_LABEL[cls.slug] ?? cls.name;
    for (const subject of cls.subjects) {
      const subjectLabel = SUBJECT_LABEL[subject.slug] ?? subject.name;

      // Subject entry
      entries.push({
        title: `${subjectLabel} — ${classLabel}`,
        kind: "Subject",
        href: `/${cls.slug}/${subject.slug}`,
        breadcrumb: classLabel,
        haystack: `${subjectLabel} ${classLabel} ${subject.description ?? ""}`.toLowerCase(),
        priority: 0,
      });

      for (let unitIdx = 0; unitIdx < subject.units.length; unitIdx += 1) {
        const unit = subject.units[unitIdx];

        // Is it a Unit or Chapter? Units that are sections/domains vs chapters
        const isSection = unit.title.toLowerCase().includes("section") || unit.title.toLowerCase().includes("unit");
        const entryKind: SearchEntryKind = isSection ? "Unit" : "Chapter";

        // Chapter/Unit entry
        entries.push({
          title: unit.title,
          kind: entryKind,
          href: `/${cls.slug}/${subject.slug}/chapters/${unit.id}`,
          breadcrumb: `${classLabel} · ${subjectLabel} · ${entryKind} ${unitIdx + 1}`,
          haystack: `${unit.title} chapter unit ${subjectLabel} ${classLabel} ${unit.id.replace(/-/g, " ")}`.toLowerCase(),
          priority: 2,
        });

        // Topic entries
        const topicEntries = getUnitTopicEntries(unit);
        for (const topic of topicEntries) {
          entries.push({
            title: topic.title,
            kind: "Topic",
            href: `/${cls.slug}/${subject.slug}/chapters/${unit.id}/topics/${topic.slug}`,
            breadcrumb: `${classLabel} · ${subjectLabel} · ${unit.title}`,
            haystack: `${topic.title} topic ${unit.title} ${subjectLabel} ${classLabel}`.toLowerCase(),
            priority: 3,
          });
        }
      }
    }
  }

  /* ── 3. Scientific Concepts, Laws & Derivations ── */
  for (const d of DERIVATIONS_AND_THEOREMS) {
    const classSlug = d.gradeTrack === "grade-11" ? "class-11-notes" : "class-12-notes";
    const classLabel = CLASS_LABEL[classSlug] ?? "Class 11";
    const subj = SUBJECT_LABEL[d.subject] ?? d.subject;
    const terms = (d.concernedTerms ?? []).map((t) => t.term).join(" ");
    const traps = (d.examTraps ?? []).join(" ");

    // Concept / Derivation entry
    entries.push({
      title: d.title,
      kind: "Concept",
      href: `/derivations/${classSlug}/${d.subject}/${d.slug}`,
      breadcrumb: `${classLabel} · ${subj} · ${d.unit}`,
      haystack: `${d.title} concept derivation theorem law formula ${terms} ${traps} ${d.unit} ${subj}`.toLowerCase(),
      priority: 3,
    });

    // Solved Problems / Examples
    if (d.solvedProblems && d.solvedProblems.length > 0) {
      for (const p of d.solvedProblems) {
        const preview = cleanSnippet(p.question, 75);
        entries.push({
          title: `Example: ${preview}`,
          kind: "Example",
          href: `/derivations/${classSlug}/${d.subject}/${d.slug}#problems`,
          breadcrumb: `${subj} · ${d.unit} · ${p.examBadge ?? "Worked Example"}`,
          haystack: `example problem numerical ${p.question} ${p.finalAnswer ?? ""} ${d.title} ${d.unit} ${subj}`.toLowerCase(),
          priority: 4,
        });
      }
    }
  }

  /* ── 4. Labs ── */
  for (const lab of LAB_METADATA_LIST) {
    const subj = SUBJECT_LABEL[lab.category] ?? lab.category;
    entries.push({
      title: lab.title,
      kind: "Lab",
      href: `/lab/${lab.id}`,
      breadcrumb: `${subj} · ${lab.type}`,
      haystack: `${lab.title} ${lab.description ?? ""} ${subj} lab video 3d virtual ${lab.unit ?? ""}`.toLowerCase(),
      priority: 4,
    });
  }

  /* ── 5. Graphs ── */
  for (const g of ALL_GRAPHS) {
    const subj = SUBJECT_LABEL[g.subject] ?? g.subject;
    entries.push({
      title: g.name,
      kind: "Graph",
      href: `/graphs/${g.slug}`,
      breadcrumb: `${subj} · ${g.category}`,
      haystack: `${g.name} ${g.meaning ?? ""} ${subj} graph chart curve ${g.category}`.toLowerCase(),
      priority: 5,
    });
  }

  /* ── 6. Fixed platform pages ── */
  const pages: { title: string; href: string; keywords: string }[] = [
    { title: "Home", href: "/home", keywords: "dashboard home center overview" },
    { title: "Periodic Table & CEE Trends", href: "/periodic-table", keywords: "periodic table elements chemistry s p d f block trends cee entrance" },
    { title: "Visual Mindmaps", href: "/mindmap", keywords: "mindmap blueprint concept visual roadmaps" },
    { title: "Formula Derivations", href: "/derivations", keywords: "derivation formula proof step by step" },
    { title: "Formula Sheets", href: "/formulas", keywords: "formula sheet quick revision speed formulas" },
    { title: "Theorems & Formal Proofs", href: "/theorems", keywords: "theorem proof formal mathematics physics visual" },
    { title: "Previous Year Questions (PYQs)", href: "/pyqs", keywords: "pyq past paper previous year question solution board exam" },
    { title: "Practice Quiz Bank", href: "/quiz", keywords: "quiz practice mcq mock test evaluation" },
    { title: "Veer Study Assistant", href: "/chat", keywords: "ai chat veer study assistant doubt solver" },
    { title: "Adaptive Veer Quiz", href: "/ai-quiz", keywords: "ai quiz adaptive difficulty practice" },
    { title: "3D Video Hub", href: "/lab/3d", keywords: "3d video virtual webgl laboratory" },
    { title: "Science Graph Bank", href: "/graphs", keywords: "graph science bank chart curves slopes" },
    { title: "Notes Archive", href: "/notes", keywords: "notes archive imported ravikishan curriculum" },
    { title: "Resource Vault & PDFs", href: "/resources", keywords: "resource document pdf webnotee library vault download" },
    { title: "Official CDC Syllabus", href: "/syllabus", keywords: "syllabus cdc neb official curriculum course structure" },
    { title: "My Learning Progress", href: "/progress", keywords: "progress tracking stats analytics coverage" },
    { title: "Exam Countdown Timer", href: "/exam-countdown", keywords: "exam countdown days board entrance dates timer" },
    { title: "Knowledge Hub", href: "/knowledge", keywords: "knowledge numericals diagrams grammar nepali english" },
    { title: "Practical Lab Manuals", href: "/practical", keywords: "practical lab manual procedure apparatus experiment" },
    { title: "Concept Legends & High-Yield Facts", href: "/legend", keywords: "legend facts concept high yield entrance traps" },
    { title: "Loksewa General Knowledge", href: "/loksewa", keywords: "loksewa general knowledge nepal history geography" },
    { title: "Veer Step-by-Step Math Solver", href: "/ai/math", keywords: "math solver step by step algebra calculus solution" },
    { title: "Deep Concept Studio", href: "/ai/deep-dive", keywords: "deep dive concept explanation structured pedagogy" },
    { title: "Diagram Visual Studio", href: "/ai/diagrams", keywords: "diagram labelled study visual science drawings" },
  ];

  for (const p of pages) {
    entries.push({
      title: p.title,
      kind: "Page",
      href: p.href,
      breadcrumb: "Platform",
      haystack: `${p.title} page ${p.keywords}`.toLowerCase(),
      priority: 0,
    });
  }

  return entries;
}

/* ────────────────────────────── public API ────────────────────────────── */

/** Get or build the full search index (cached after first call). */
export function getSearchIndex(): SearchEntry[] {
  if (!_cache) _cache = buildIndex();
  return _cache;
}

/**
 * Search the local index across Units, Chapters, Topics, Concepts, Examples, etc.
 *
 * Scoring algorithm:
 *  - Matches all query terms: +200 bonus
 *  - Exact title match: +500
 *  - Title starts with query: +300
 *  - Title contains exact query phrase: +200
 *  - Word boundary match in title: +60 per word
 *  - Word in title: +30 per word
 *  - Word in breadcrumb: +20 per word
 *  - Word in haystack: +10 per word
 *  - Kind priority weighting
 */
export function localSearch(query: string, limit = 20): SearchEntry[] {
  const trimmed = query.trim().toLowerCase();
  if (trimmed.length < 2) return [];

  const words = trimmed.split(/\s+/).filter((w) => w.length >= 2);
  if (words.length === 0) return [];

  const index = getSearchIndex();
  const scored: { entry: SearchEntry; score: number }[] = [];

  for (const entry of index) {
    let score = 0;
    const titleLower = entry.title.toLowerCase();
    const breadcrumbLower = entry.breadcrumb.toLowerCase();
    let wordsMatched = 0;

    for (const word of words) {
      const inTitle = titleLower.includes(word);
      const inBreadcrumb = breadcrumbLower.includes(word);
      const inHaystack = entry.haystack.includes(word);

      if (inTitle || inBreadcrumb || inHaystack) {
        wordsMatched += 1;
        if (inTitle) {
          score += 30;
          // Word boundary bonus
          if (new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).test(titleLower)) {
            score += 60;
          }
        }
        if (inBreadcrumb) score += 20;
        if (inHaystack) score += 10;
      }
    }

    if (wordsMatched === 0) continue;

    // All search words match!
    if (wordsMatched === words.length) {
      score += 200;
    }

    // Exact phrase in title
    if (titleLower === trimmed) {
      score += 500;
    } else if (titleLower.startsWith(trimmed)) {
      score += 300;
    } else if (titleLower.includes(trimmed)) {
      score += 200;
    }

    // Priority bonus (lower priority number = more important fundamental kind)
    // 0 = Subject/Page (+30), 1 = Unit (+25), 2 = Chapter (+20), 3 = Topic/Concept (+15), 4 = Example/Lab (+10)
    score += Math.max(0, 30 - entry.priority * 5);

    scored.push({ entry, score });
  }

  // Sort descending by score, then alphabetically
  scored.sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title));

  return scored.slice(0, limit).map((s) => s.entry);
}
