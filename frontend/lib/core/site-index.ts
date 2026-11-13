/**
 * Site index — the data behind the "Everything Index" head page (/site-index).
 *
 * Every routable destination on the platform, gathered from the registries
 * that actually drive the pages (labs, graphs, pro-knowledge chapters,
 * derivation/theorem tracks, the official syllabus), never hand-copied — so
 * the head page cannot drift away from the routes it points at.
 *
 * Rendered as: short opening → name → its link below.
 *
 * Search is a front door, not an index: the global search bar (Ctrl K) and the
 * quick-access pill both lead to /search, and that is where the whole library is
 * searched — so /search is not a standalone card on the Everything Index page.
 *
 * Server-only: this module pulls the heavy registries. The client renderer
 * imports just the types from ./site-index-types.
 */

import { LAB_METADATA_LIST } from "../lab-metadata";
import { ALL_GRAPHS, GRAPH_SUBJECTS, type GraphSubject } from "../graphs";
import { PRO_SECTIONS } from "@/features/knowledge/pro";
import { KNOWLEDGE_KINDS } from "@/features/knowledge/types";
import { getUnitConcept } from "../visual-concept-map";
import { matchConceptSchematic } from "@/components/lab/schematic-concepts";
import {
  buildTopicKnowledge,
  isAuthoredSpecialTopic,
  isInclinedPlaneTopic,
  KIND_LABEL,
} from "../topic-visuals";
import { SYLLABUS, getUnitTopicEntries } from "./syllabus";
import { getTheoremProofRoutes, getSyllabusTheoremItems } from "../theorem-topics";
import { PHYSICS_XI_ACADEMIC_UNITS } from "../physics-xi-academic";
import type { SiteIndexEntry, SiteIndexGroup, SiteIndexLink } from "../site-index-types";

export type { SiteIndexEntry, SiteIndexGroup, SiteIndexLink } from "../site-index-types";

/* ────────────────────────────── helpers ────────────────────────────── */

/** Collapse whitespace and cut to one readable line. */
function oneLine(text: string | undefined, max = 130): string {
  const s = (text ?? "").replace(/\s+/g, " ").trim();
  if (!s) return "";
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const at = cut.lastIndexOf(" ");
  return `${(at > max * 0.6 ? cut.slice(0, at) : cut).replace(/[,;:.]$/, "")}…`;
}

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

const LAB_KIND_LABEL: Record<string, string> = {
  "3d": "3D model",
  theory: "Theory",
  calculator: "Calculator",
};

const LAB_GROUP_META: Record<string, { id: string; name: string; opening: string; href: string }> = {
  "3d": {
    id: "labs-3d",
    name: "3D labs & videos",
    opening:
      "Every real WebGL lab — models you orbit, layered views and live process animation, one page each.",
    href: "/lab/3d",
  },
  theory: {
    id: "labs-theory",
    name: "Lab theory pages",
    opening:
      "The written theory behind each lab: the law, the assumptions, the derivation and the exam framing.",
    href: "/lab/theory",
  },
  calculator: {
    id: "labs-calc",
    name: "Lab calculators & solvers",
    opening:
      "Enter the data, get the answer with the working shown — numerical drills for the lab topics.",
    href: "/lab",
  },
};

function labEntry(lab: (typeof LAB_METADATA_LIST)[number]): SiteIndexEntry {
  return {
    name: lab.title,
    opening: oneLine(lab.description),
    href: `/lab/${lab.id}`,
    meta: [LAB_KIND_LABEL[lab.type] ?? lab.type, SUBJECT_LABEL[lab.category] ?? lab.category, lab.unit]
      .filter(Boolean)
      .join(" · "),
  };
}

/* ────────────────────────────── builder ────────────────────────────── */

/** Topic pages whose schematic is generated from that topic's syllabus scope. */
function buildTopicSchematicEntries(): SiteIndexEntry[] {
  const entries: SiteIndexEntry[] = [];

  for (const cls of SYLLABUS) {
    for (const subject of cls.subjects) {
      for (const unit of subject.units) {
        for (const topic of getUnitTopicEntries(unit)) {
          // Mirror SchematicDiagram's authored-drawing precedence. Only topics
          // that reach its topic-derived builder belong in this index.
          if (matchConceptSchematic(subject.slug, topic.slug, topic.title, unit.id)) continue;
          if (getUnitConcept(unit.id, topic.slug, topic.title, subject.slug)) continue;
          if (isAuthoredSpecialTopic(subject.slug, topic.slug, topic.title)) continue;
          if (isInclinedPlaneTopic(topic.slug, topic.title, unit.id)) continue;

          const knowledge = buildTopicKnowledge({
            subjectSlug: subject.slug,
            classSlug: cls.slug,
            unitId: unit.id,
            topicSlug: topic.slug,
            topicTitle: topic.title,
          });

          entries.push({
            name: topic.title,
            opening: `${KIND_LABEL[knowledge.kind]} generated from this topic's syllabus scope and available notes.`,
            href: `/${cls.slug}/${subject.slug}/chapters/${unit.id}/topics/${topic.slug}`,
            meta: `${CLASS_LABEL[cls.slug] ?? cls.name} · ${subject.name}`,
          });
        }
      }
    }
  }

  return entries;
}

export function buildSiteIndex(): SiteIndexGroup[] {
  const groups: SiteIndexGroup[] = [];

  /* 1. Start here — the fixed spine of the platform. */
  groups.push({
    id: "start",
    name: "Start here",
    opening: "The main doors: your dashboard, the curriculum spines and the tools that track your work — search the whole library from the bar above (Ctrl K), not as a separate card.",
    entries: [
      {
        name: "Home",
        opening: "Your command centre — every subject, tool and track reachable in one screen.",
        href: "/home",
        meta: "Dashboard",
      },
      {
        name: "Curriculum Levels",
        opening: "Browse by level and track: NEB XI & XII, entrance prep and public-service syllabi.",
        href: "/levels",
        meta: "Tracks",
      },
      {
        name: "All 6 Subjects",
        opening: "Science, maths, languages — each subject's head page with every note track inside.",
        href: "/subjects",
        meta: "Subjects",
      },
      {
        name: "Official CDC Syllabus",
        opening: "The single source of truth: unit order, topic lists and teaching hours as published.",
        href: "/syllabus",
        meta: "Reference",
      },
      {
        name: "Syllabus by Year",
        opening:
          "Every NEB syllabus addition, removal and revision by BS year (2073–2082) across all six subjects.",
        href: "/syllabus/additions",
        meta: "2073–82",
      },
      {
        name: "Class 11 Hub",
        opening: "Class 11 in one place — six subjects, all units, notes, labs and derivations.",
        href: "/class-11-notes",
        meta: "Class XI",
      },
      {
        name: "Class 12 Hub",
        opening: "Class 12 in one place — six subjects, all units, notes, labs and derivations.",
        href: "/class-12-notes",
        meta: "Class XII",
      },
      {
        name: "Visual Mindmaps",
        opening: "Concept pathways on a blueprint canvas — fundamentals to exam traps, branch by branch.",
        href: "/mindmap",
        meta: "Blueprints",
      },
      {
        name: "My Progress",
        opening: "What you have covered, what is left, and where your weak units actually are.",
        href: "/progress",
        meta: "Stats",
      },
      {
        name: "Dashboard",
        opening: "Today at a glance: streak, exam countdown, your daily plan and what to open next.",
        href: "/dashboard",
        meta: "Today",
      },
      {
        name: "Set Study Goals",
        opening: "Choose subjects, exam date, target and daily study time. Open to everyone.",
        href: "/onboarding",
        meta: "Setup",
      },
      {
        name: "Settings",
        opening: "Language, theme, study goals, notifications and accessibility.",
        href: "/settings",
        meta: "Account",
      },
      {
        name: "Report Card",
        opening: "A printable snapshot of your progress, ready to save as PDF and share.",
        href: "/report-card",
        meta: "Progress",
      },
      {
        name: "Weekly Planner",
        opening: "A seven-day plan from your goals, exam date and the topics you have not finished.",
        href: "/planner",
        meta: "Plan",
      },
      {
        name: "Spaced Repetition",
        opening: "Flashcards from concept notes and past questions, scheduled so you review just before forgetting.",
        href: "/srs",
        meta: "Memory",
      },
      {
        name: "Mock Exams",
        opening: "Timed papers: an OMR sheet scored for you, an answer key, and written past questions.",
        href: "/mock-exams",
        meta: "Exam",
      },
      {
        name: "Analytics",
        opening: "Accuracy by subject and topic, unit progress and a weekly trend from your quizzes and progress.",
        href: "/analytics",
        meta: "Insight",
      },
      {
        name: "Streaks and Badges",
        opening: "Your study streak, the badges you have earned and the next milestone to chase.",
        href: "/streaks",
        meta: "Habit",
      },
      {
        name: "Community",
        opening: "A study space for every subject with links to its notes and the Ask board.",
        href: "/community",
        meta: "Social",
      },
      {
        name: "Ask",
        opening: "Type a study question and get an answer from the Veer tutor.",
        href: "/ask",
        meta: "Q&A",
      },
      {
        name: "My Notes",
        opening: "Write your own notes and annotate passages; they stay on your device.",
        href: "/my-notes",
        meta: "Personal",
      },
      {
        name: "Downloads",
        opening: "Take a unit offline: concept notes, past questions, drills and formulas in one file.",
        href: "/downloads",
        meta: "Offline",
      },
      {
        name: "Billing",
        opening: "Check your spark balance and spark transaction history.",
        href: "/billing",
        meta: "Account",
      },
      {
        name: "Referrals",
        opening: "Your referral and reward overview, with the current tracking status shown on the page.",
        href: "/referrals",
        meta: "Rewards",
      },
      {
        name: "Saved Bookmarks",
        opening: "Everything you starred, in the order you saved it.",
        href: "/bookmarks",
        meta: "Saved",
      },
      {
        name: "Exam Countdown",
        opening: "Count the days to your board and entrance papers, per subject.",
        href: "/exam-countdown",
        meta: "Planning",
      },
      {
        name: "Resource Vault",
        opening: "The master list of materials, videos and reference pages on the platform.",
        href: "/resources",
        meta: "Vault",
      },
      {
        name: "PDF Library",
        opening:
          "Download-ready PDFs and study materials — exam-cram sheets, unit notes and MCQ practice sets.",
        href: "/pdfs",
        meta: "PDFs",
      },
      {
        name: "Veer Math Solver",
        opening: "Work through maths problems with clear, step-by-step explanations.",
        href: "/ai/math",
        meta: "AI study tool",
      },
      {
        name: "Deep Concept Studio",
        opening: "Explore difficult ideas through structured, syllabus-aware explanations.",
        href: "/ai/deep-dive",
        meta: "AI study tool",
      },
      {
        name: "Diagram Hub",
        opening: "Create detailed, labelled study diagrams for curriculum topics.",
        href: "/ai/diagrams",
        meta: "AI visual tool",
      },
    ],
  });

  /* 2. Class tracks — one head per class × subject, plus its four routed views. */
  for (const cls of SYLLABUS) {
    const label = CLASS_LABEL[cls.slug] ?? cls.name;
    groups.push({
      id: `track-${cls.slug}`,
      name: `${label} — every subject head`,
      opening: `Each ${label} subject has its own head page, and under it four routed views: theory, chapters, mindmap and the official syllabus.`,
      href: `/${cls.slug}`,
      entries: cls.subjects.map((subject) => {
        const hours = subject.units.reduce((sum, u) => sum + (u.hours ?? 0), 0);
        const links: SiteIndexLink[] = [
          { label: "Theory", href: `/${cls.slug}/${subject.slug}/theory` },
          { label: "Chapters", href: `/${cls.slug}/${subject.slug}/chapters` },
          { label: "Mindmap", href: `/${cls.slug}/${subject.slug}/mindmap` },
          { label: "Syllabus", href: `/${cls.slug}/${subject.slug}/syllabus` },
        ];
        return {
          name: `${subject.name} — ${label}`,
          opening: oneLine(subject.description, 118),
          href: `/${cls.slug}/${subject.slug}`,
          meta: `${subject.units.length} units · ${hours} hrs`,
          links,
        };
      }),
    });
  }

  /* Generated schematics are listed at their own syllabus topic destinations. */
  const topicSchematicEntries = buildTopicSchematicEntries();
  if (topicSchematicEntries.length > 0) {
    groups.push({
      id: "topic-schematics",
      name: "Generated topic concept maps",
      opening: `${topicSchematicEntries.length} topic-derived diagrams, each linked to the syllabus topic page that displays it.`,
      entries: topicSchematicEntries,
    });
  }

  /* 3. Labs — split by what the page actually is. */
  for (const kind of ["3d", "theory", "calculator"] as const) {
    const meta = LAB_GROUP_META[kind];
    const labs = LAB_METADATA_LIST.filter((l) => l.type === kind);
    if (labs.length === 0) continue;
    groups.push({
      id: meta.id,
      name: meta.name,
      opening: `${meta.opening} (${labs.length} pages)`,
      href: meta.href,
      entries: labs.map(labEntry),
    });
  }

  /* 4. Graph bank — one group per subject. */
  for (const subject of GRAPH_SUBJECTS) {
    const graphs = ALL_GRAPHS.filter((g) => g.subject === (subject.slug as GraphSubject));
    if (graphs.length === 0) continue;
    groups.push({
      id: `graphs-${subject.slug}`,
      name: `${subject.label} graphs`,
      opening: `Every ${subject.label.toLowerCase()} graph with its basis, meaning, special cases and the shape it outputs — each on its own interactive page.`,
      href: "/graphs",
      entries: graphs.map((g) => ({
        name: g.name,
        opening: oneLine(g.meaning),
        href: `/graphs/${g.slug}`,
        meta: `${g.category} · ${g.classLevel === "both" ? "XI & XII" : g.classLevel === "class-11" ? "Class 11" : "Class 12"}`,
      })),
    });
  }

  /* 5. Pro knowledge — a group per section, a chapter, then its five kind pages. */
  for (const section of PRO_SECTIONS) {
    groups.push({
      id: `pro-${section.id}`,
      name: `Pro knowledge — ${section.title}`,
      opening: `${oneLine(section.subtitle, 150)} (${section.chapters.length} chapters, five pages each)`,
      href: `/knowledge/pro/${section.id}`,
      entries: section.chapters.map((chapter) => ({
        name: chapter.title,
        opening: oneLine(chapter.blurb),
        href: `/knowledge/pro/${section.id}/${chapter.id}`,
        meta:
          chapter.classLevel === "both"
            ? "XI & XII"
            : chapter.classLevel === "class-11"
              ? "Class 11"
              : "Class 12",
        links: KNOWLEDGE_KINDS.map((k) => ({
          label: k.label,
          href: `/knowledge/pro/${section.id}/${chapter.id}/${k.slug}`,
        })),
      })),
    });
  }

  /* 6. Derivations & theorems — one group each, track by track. */
  const proofRoutes = getTheoremProofRoutes();

  groups.push({
    id: "derivations",
    name: "Formula derivations",
    opening:
      "Every formula derived line by line in official unit order, each with its special cases — one page per syllabus topic.",
    href: "/derivations",
    entries: proofRoutes.map(({ classSlug, subjectSlug }) => {
      const items = getSyllabusTheoremItems(classSlug, subjectSlug);
      const curated = items.filter((i) => i.hasCuratedContent).length;
      return {
        name: `${SUBJECT_LABEL[subjectSlug] ?? subjectSlug} — ${CLASS_LABEL[classSlug] ?? classSlug}`,
        opening: `${items.length} syllabus topics in unit order, ${curated} with full step-by-step derivations and special cases.`,
        href: `/derivations/${classSlug}/${subjectSlug}`,
        meta: `${items.length} topics`,
      };
    }),
  });

  groups.push({
    id: "formulas",
    name: "Formula sheets",
    opening:
      "Every Physics, Mathematics and Chemistry formula the Class 11 notes carry, unit by unit in official syllabus order — one sheet per unit, grouped by source note.",
    href: "/formulas",
    entries: [
      {
        name: "Physics Formula Sheet",
        opening:
          "Mechanics to nuclear physics: every formula of the Class 11 physics syllabus, unit by unit.",
        href: "/formulas/physics",
        meta: "Class 11",
      },
      {
        name: "Mathematics Formula Sheet",
        opening:
          "Algebra, trigonometry, calculus and more — every formula of the Class 11 mathematics syllabus.",
        href: "/formulas/mathematics",
        meta: "Class 11",
      },
      {
        name: "Chemistry Formula Sheet",
        opening:
          "Atomic structure to applied chemistry: every formula of the Class 11 chemistry syllabus, unit by unit.",
        href: "/formulas/chemistry",
        meta: "Class 11",
      },
    ],
  });

  groups.push({
    id: "theorems",
    name: "Theorems & formal proofs",
    opening:
      "Statements, givens, constructions and proofs — visual, step by step, in syllabus order.",
    href: "/theorems",
    entries: proofRoutes.map(({ classSlug, subjectSlug }) => {
      const items = getSyllabusTheoremItems(classSlug, subjectSlug);
      const curated = items.filter((i) => i.hasCuratedContent).length;
      return {
        name: `${SUBJECT_LABEL[subjectSlug] ?? subjectSlug} — ${CLASS_LABEL[classSlug] ?? classSlug}`,
        opening: `${items.length} syllabus topics, ${curated} with a full formal proof and an interactive visual.`,
        href: `/theorems/${classSlug}/${subjectSlug}`,
        meta: `${items.length} topics`,
      };
    }),
  });

  /* 7. Physics XI academic briefs — one deep page per syllabus unit. */
  groups.push({
    id: "physics-xi-academic",
    name: "Physics XI academic briefs",
    opening: `${PHYSICS_XI_ACADEMIC_UNITS.length} unit briefs — what the model asserts, the conditions it needs, the questions that are still open, and where to read further.`,
    href: "/resources/physics-xi",
    entries: PHYSICS_XI_ACADEMIC_UNITS.map((unit) => ({
      name: `Unit ${unit.unitNo}: ${unit.unitName}`,
      opening: oneLine(unit.summary, 132),
      href: `/resources/physics-xi/${unit.unitId}`,
      meta: unit.contentArea,
    })),
  });

  /* 8. Veer studio — one dedicated page per tool, plus the wallet that feeds it. */
  groups.push({
    id: "ai",
    name: "Veer studio — one page per tool",
    opening:
      "Each Veer tool on the platform has its own page with its own features: ask a doubt, keep a conversation, generate a quiz, or search the curriculum.",
    href: "/ai",
    entries: [
      {
        name: "Veer Studio Hub",
        opening: "The door to the Veer tools, practice, and the community feed.",
        href: "/ai",
        meta: "Hub",
        links: [
          { label: "Practice Hub", href: "/practice" },
          { label: "Community", href: "/ai/community" },
        ],
      },
      {
        name: "Community",
        opening: "Read study posts as a guest. Verified members and every higher tier can publish, attach files, like, and comment.",
        href: "/ai/community",
        meta: "Social",
        links: [
          { label: "My posts", href: "/ai/community/me" },
          { label: "Find students", href: "/users" },
        ],
      },
      {
        name: "Veer Study Assistant",
        opening: "Ask any NEB Class 11 or 12 doubt and get a curriculum-aligned answer on the spot.",
        href: "/chat",
        meta: "Chat",
        links: [
          { label: "नेपाली console — replies in Nepali", href: "/chat/nepali" },
          { label: "Grammar console — origin-first with citations", href: "/chat/grammar" },
          { label: "Tutor console with history", href: "/ai/tutor" },
          { label: "Adaptive quiz", href: "/ai-quiz" },
          { label: "Curriculum search", href: "/ai/search" },
        ],
      },
      {
        name: "AI Workspace",
        opening: "One desk for the Veer tools: keep a thread, a draft and a diagram side by side.",
        href: "/ai/workspace",
        meta: "Workspace",
      },
      {
        name: "Subject Classrooms",
        opening: "Veer tutored subject by subject, in the official unit order of each class.",
        href: "/ai/subjects",
        meta: "Classrooms",
      },
      {
        name: "AI History",
        opening: "Every Veer conversation you have started, newest first, ready to reopen.",
        href: "/ai/history",
        meta: "History",
      },
      {
        name: "Veer Tutor Console",
        opening:
          "Long-form tutor with saved conversations, a New conversation button and a prompt enhancer.",
        href: "/ai/tutor",
        meta: "History",
      },
      {
        name: "Adaptive Veer Quiz",
        opening: "Generated practice sets with difficulty bands, scoring and worked feedback.",
        href: "/ai-quiz",
        meta: "Practice",
        links: [{ label: "Quiz History", href: "/ai-quiz/history" }],
      },
      {
        name: "Veer Curriculum Search",
        opening: "Plain-language search across notes, labs, graphs and past questions.",
        href: "/ai/search",
        meta: "Search",
      },
      {
        name: "Credits & Plan",
        opening: "Your daily pool, top-ups and the PRO plan that removes the cap.",
        href: "/credits",
        meta: "Wallet",
      },
    ],
  });

  /* 9. Reference & practice — everything else, each with its own routed pages. */
  groups.push({
    id: "reference",
    name: "Reference, practice & general knowledge",
    opening: "The pages that sit beside the curriculum: reference tables, practice banks and general knowledge.",
    entries: [
      {
        name: "Periodic Table & CEE",
        opening: "The full 118-element table with all CEE blocks, trends and per-element facts.",
        href: "/periodic-table",
        meta: "118 elements",
      },
      {
        name: "Ad P Table",
        opening:
          "The Ad P periodic table: 118 elements, live hover preview and the CEE entrance hub — opens at Plus.",
        href: "/ad-p-table",
        meta: "Plus",
      },
      {
        name: "Concept Legends & Facts",
        opening: "Legend entries, high-yield facts and misconception fixes, per class and subject — plus a per-topic sheet for every unit and topic of all six subjects, where exam shortcuts, time-saving notes and PYQ solutions land as they are added.",
        href: "/legend",
        meta: "Facts",
        links: [
          { label: "Class 11", href: "/legend/class-11-notes" },
          { label: "Class 12", href: "/legend/class-12-notes" },
          { label: "Per-topic sheets", href: "/legend/class-11-notes/physics/mechanics/kinematics" },
        ],
      },
      {
        name: "Practical Lab Manuals",
        opening: "Lab manuals with aim, apparatus, procedure, observation tables and precautions.",
        href: "/practical",
        meta: "Manuals",
        links: [
          { label: "Physics", href: "/practical/physics" },
          { label: "Chemistry", href: "/practical/chemistry" },
          { label: "Biology", href: "/practical/biology" },
        ],
      },
      {
        name: "Lessons Library",
        opening: "Guided lessons that walk a topic from first principles to worked examples.",
        href: "/lessons",
        meta: "Theory",
      },
      {
        name: "Notes Archive",
        opening: "The imported notes collection, grouped by class and subject.",
        href: "/notes",
        meta: "Archive",
      },
      {
        name: "Virtual 3D Labs",
        opening: "The master lab entry point — every 3D suite, theory hub and calculator in one list.",
        href: "/lab",
        meta: "Lab root",
      },
      {
        name: "3D Video Hub",
        opening: "All 3D videos grouped by subject and official unit order.",
        href: "/lab/3d",
        meta: "Hub",
      },
      {
        name: "Lab Theory Hub",
        opening: "Every lab's theory content, grouped by subject, with search.",
        href: "/lab/theory",
        meta: "Hub",
      },
      {
        name: "Science Graph Bank",
        opening: "The classification of every graph: basis, meaning, reading rules, limits and output.",
        href: "/graphs",
        meta: "Charts",
      },
      {
        name: "Graph Bank (Legacy)",
        opening: "The older graph bank, kept reachable for its per-subject listings.",
        href: "/science-graph-bank",
        meta: "Legacy",
      },
      {
        name: "Knowledge Hub",
        opening: "Numericals, diagrams, grammar, writing and Nepali byakaran — with their pro pages.",
        href: "/knowledge",
        meta: "Concepts",
        links: [
          { label: "Pro Knowledge Hub", href: "/knowledge/pro" },
          { label: "Numerical Physics", href: "/knowledge/numerical-physics" },
          { label: "Numerical Chemistry", href: "/knowledge/numerical-chemistry" },
          { label: "Biology Diagrams", href: "/knowledge/biology-diagrams" },
          { label: "English Grammar", href: "/knowledge/grammar" },
          { label: "English Writing", href: "/knowledge/writing" },
          { label: "नेपाली व्याकरण", href: "/knowledge/byakaran" },
          { label: "Analytical Geometry", href: "/knowledge/analytical-geometry" },
        ],
      },
      {
        name: "Previous Year Questions",
        opening:
          "The real NEB paper archive for Class 11 — every subject's past questions grouped by exam year, tagged with their syllabus unit, each with a worked solution.",
        href: "/pyqs",
        meta: "PYQ archive",
      },
      {
        name: "Practice Quiz Bank",
        opening: "PYQ-style question sets by subject and unit, with worked answers.",
        href: "/quiz",
        meta: "PYQ",
      },
      {
        name: "Loksewa GK",
        opening: "Public-service general knowledge across Nepal's geography, history and environment.",
        href: "/loksewa",
        meta: "GK",
        links: [
          { label: "Geography of Nepal", href: "/loksewa/geography-of-nepal" },
          { label: "History", href: "/loksewa/history" },
          { label: "Environment", href: "/loksewa/environment" },
        ],
      },
      {
        name: "World Knowledge",
        opening: "Global general knowledge, current affairs and international topics.",
        href: "/world-knowledge",
        meta: "Global",
        links: [
          { label: "General Knowledge", href: "/world-knowledge/general-knowledge" },
          { label: "Current Affairs", href: "/world-knowledge/current-affairs" },
          { label: "Global Topics", href: "/world-knowledge/global-topics" },
        ],
      },
    ],
  });

  /* 10. About, help & plans — the public pages the footer and sidebar link to. */
  groups.push({
    id: "about-info",
    name: "About, help & plans",
    opening:
      "The public pages: what the platform does, who it is for, how it works, and what each plan costs.",
    entries: [
      {
        name: "Guest sign-in note",
        opening:
          "An inspiring note for guests without an account — create one, sign in, or check approval status.",
        href: "/welcome/join",
        meta: "Public",
      },
      {
        name: "About",
        opening: "What this platform is, who builds it and the NEB curriculum it follows.",
        href: "/about",
        meta: "Public",
      },
      {
        name: "What it has",
        opening: "Not everything, but: educational contents, journal, quick access, world knowledge, daily-life activities in progress and the curious features still to come.",
        href: "/what-it-has",
        meta: "Public",
      },
      {
        name: "Features",
        opening: "Every capability in one list: notes, labs, graphs, Veer tools and planning.",
        href: "/features",
        meta: "Public",
      },
      {
        name: "How It Works",
        opening: "The study loop the platform is built around, from goals to revision.",
        href: "/how-it-works",
        meta: "Public",
      },
      {
        name: "Plans & Pricing",
        opening: "What Visitor, Member, Plus, Pro and Owner each unlock, and what they cost.",
        href: "/plans",
        meta: "Pricing",
      },
      {
        name: "For Schools",
        opening: "Running a class or a school on the platform: shared tracks and reporting.",
        href: "/school",
        meta: "Public",
      },
      {
        name: "For Teachers",
        opening: "Teaching from the same syllabus the notes and papers are built on.",
        href: "/teachers",
        meta: "Public",
      },
      {
        name: "For Parents",
        opening: "A plain guide to what students can use today and what a guardian can check with them.",
        href: "/parents",
        meta: "Public",
      },
      {
        name: "Blog",
        opening: "Notes on the curriculum, exam changes and how students actually study.",
        href: "/blog",
        meta: "Writing",
      },
      {
        name: "NEB Updates",
        opening: "Board announcements that change what you have to prepare.",
        href: "/neb-updates",
        meta: "Updates",
      },
      {
        name: "Official Sources",
        opening: "The government domains that publish the curriculum and exam notices — and the exact relationship.",
        href: "/official-sources",
        meta: "References",
      },
      {
        name: "Help Center",
        opening: "Answers to the everyday questions: access tiers, downloads and accounts.",
        href: "/help",
        meta: "Support",
      },
      {
        name: "Contact Us",
        opening: "Reach the team about a bug, a content error or a school enquiry.",
        href: "/contact",
        meta: "Support",
      },
      {
        name: "Site Map",
        opening: "A grouped directory of every indexed page, with a link to the searchable Everything Index.",
        href: "/sitemap-page",
        meta: "Public",
      },
    ],
  });

  /* 10b. Legal & data policies — footer destinations now covered by the canonical index. */
  groups.push({
    id: "legal",
    name: "Legal & data policies",
    opening:
      "The policies behind privacy, terms, cookies, purchases, data safety, content rating, attribution and rights requests.",
    entries: [
      {
        name: "Privacy Policy",
        opening: "How account and study data are handled.",
        href: "/legal/privacy",
        meta: "Legal",
      },
      {
        name: "Terms of Service",
        opening: "The rules for using the platform and its study material.",
        href: "/legal/terms",
        meta: "Legal",
      },
      {
        name: "Cookie Policy",
        opening: "What the site stores in the browser and why.",
        href: "/legal/cookies",
        meta: "Legal",
      },
      {
        name: "Purchases & Refunds",
        opening: "Plan purchases, billing records and refund boundaries.",
        href: "/legal/purchases",
        meta: "Legal",
      },
      {
        name: "Data Safety",
        opening: "How study records and account data are protected.",
        href: "/legal/data-safety",
        meta: "Legal",
      },
      {
        name: "Content Rating",
        opening: "Who the material is written for and how to report a concern.",
        href: "/legal/content-rating",
        meta: "Legal",
      },
      {
        name: "Attribution & Licences",
        opening: "Which licence covers the code, which covers the notes, and how to credit the platform.",
        href: "/legal/attribution",
        meta: "Legal",
      },
      {
        name: "Takedown Requests",
        opening: "How a rights holder asks for material to be reviewed or removed.",
        href: "/legal/takedown",
        meta: "Legal",
      },
    ],
  });

  /* 11. Planning, practice & recognition — the pages that keep the study loop closed. */
  groups.push({
    id: "study-loop",
    name: "Planning, practice & recognition",
    opening:
      "The pages that keep the loop closed: goals, schedule, revision, practice, the leaderboard and what you earn.",
    entries: [
      {
        name: "Study Goals",
        opening: "The targets you set at onboarding, and how far through them you are.",
        href: "/goals",
        meta: "Planning",
      },
      {
        name: "Study Schedule",
        opening: "Your week laid out against the units you have not finished yet.",
        href: "/schedule",
        meta: "Planning",
      },
      {
        name: "Quick Revision",
        opening: "Short recall passes over the units closest to your exam date.",
        href: "/revision",
        meta: "Revision",
      },
      {
        name: "Practice Hub",
        opening: "Practice lives under AI Tools: quiz bank, past questions, drills and mock papers.",
        href: "/practice",
        meta: "Practice",
        links: [{ label: "Practice history", href: "/practice/history" }],
      },
      {
        name: "Edit profile",
        opening: "Update your public name, bio, and profile photo.",
        href: "/profile/edit",
        meta: "Account",
      },
      {
        name: "Exam Hub",
        opening: "Board and entrance tracks with preparation maps and links to live study tools.",
        href: "/exams",
        meta: "Tracks",
        links: [
          { label: "NEB Board Exam", href: "/exams/neb" },
          { label: "CEE Medical Entrance", href: "/exams/cee" },
          { label: "IOE Engineering Entrance", href: "/exams/ioe" },
        ],
      },
      {
        name: "Leaderboard",
        opening: "Where your study streak and quiz accuracy rank against everyone else.",
        href: "/leaderboard",
        meta: "Ranking",
      },
      {
        name: "Achievements",
        opening: "Scholar level, streak, certificates and leaderboard rank — every award in one place.",
        href: "/achievements",
        meta: "Awards",
      },
      {
        name: "Certificates",
        opening: "The certificates you have earned for finishing a unit or a track.",
        href: "/certificates",
        meta: "Awards",
      },
      {
        name: "Study Journal",
        opening: "A dated log of what you studied, what went wrong and what to revisit.",
        href: "/journal",
        meta: "Journal",
      },
    ],
  });

  /* 12. Platform notices — announcements, changelog, status, feedback, inbox. */
  groups.push({
    id: "platform",
    name: "Platform notices & feedback",
    opening:
      "What changed, what is running, and how to tell us when something is wrong.",
    entries: [
      {
        name: "Announcements",
        opening: "Platform news and syllabus changes, newest first.",
        href: "/announcements",
        meta: "Notices",
      },
      {
        name: "What's New",
        opening: "The changelog: every shipped change, in release order.",
        href: "/changelog",
        meta: "Changelog",
      },
      {
        name: "Platform Status",
        opening: "Service information, quick checks and support paths; live telemetry is not claimed.",
        href: "/status",
        meta: "Status",
      },
      {
        name: "Send Feedback",
        opening: "Report a bug, a broken link or a content error straight to the team.",
        href: "/feedback",
        meta: "Feedback",
      },
      {
        name: "Notice Board",
        opening: "The notices pinned to your account, grouped by what they affect.",
        href: "/notice",
        meta: "Inbox",
      },
      {
        name: "Notifications",
        opening: "Your notification feed: reminders, replies and study nudges.",
        href: "/notifications",
        meta: "Inbox",
      },
    ],
  });

  return groups;
}

/** Flat counts for the head page summary. */
export function siteIndexTotals(groups: SiteIndexGroup[]) {
  const entries = groups.reduce((sum, g) => sum + g.entries.length, 0);
  const links = groups.reduce(
    (sum, g) => sum + g.entries.reduce((s, e) => s + (e.links?.length ?? 0), 0),
    0,
  );
  return { groups: groups.length, entries, routes: entries + links };
}
