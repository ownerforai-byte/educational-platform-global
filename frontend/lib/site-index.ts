/**
 * Site index — the data behind the "Everything Index" head page (/index).
 *
 * Every routable destination on the platform, gathered from the registries
 * that actually drive the pages (labs, graphs, pro-knowledge chapters,
 * derivation/theorem tracks, the official syllabus), never hand-copied — so
 * the head page cannot drift away from the routes it points at.
 *
 * Rendered as: short opening → name → its link below.
 *
 * Server-only: this module pulls the heavy registries. The client renderer
 * imports just the types from ./site-index-types.
 */

import { LAB_REGISTRY } from "./lab-registry";
import { ALL_GRAPHS, GRAPH_SUBJECTS, type GraphSubject } from "./graphs";
import { PRO_SECTIONS } from "@/features/knowledge/pro";
import { KNOWLEDGE_KINDS } from "@/features/knowledge/types";
import { SYLLABUS } from "./syllabus";
import { getTheoremProofRoutes, getSyllabusTheoremItems } from "./theorem-topics";
import type { SiteIndexEntry, SiteIndexGroup, SiteIndexLink } from "./site-index-types";

export type { SiteIndexEntry, SiteIndexGroup, SiteIndexLink } from "./site-index-types";

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
    name: "3D labs & simulations",
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

function labEntry(lab: (typeof LAB_REGISTRY)[number]): SiteIndexEntry {
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

export function buildSiteIndex(): SiteIndexGroup[] {
  const groups: SiteIndexGroup[] = [];

  /* 1. Start here — the fixed spine of the platform. */
  groups.push({
    id: "start",
    name: "Start here",
    opening: "The main doors: your dashboard, the curriculum spines and the tools that track your work.",
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
        name: "Search Index",
        opening: "Type anything and search every note, chapter and topic on the platform at once.",
        href: "/search",
        meta: "Ctrl + K",
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
        opening: "The master list of materials, simulations and reference pages on the platform.",
        href: "/resources",
        meta: "Vault",
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

  /* 3. Labs — split by what the page actually is. */
  for (const kind of ["3d", "theory", "calculator"] as const) {
    const meta = LAB_GROUP_META[kind];
    const labs = LAB_REGISTRY.filter((l) => l.type === kind);
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

  /* 7. Reference & practice — everything else, each with its own routed pages. */
  groups.push({
    id: "reference",
    name: "Reference, practice & general knowledge",
    opening: "The pages that sit beside the curriculum: reference tables, practice banks, GK and the assistant.",
    entries: [
      {
        name: "Periodic Table & CEE",
        opening: "The full 118-element table with all CEE blocks, trends and per-element facts.",
        href: "/periodic-table",
        meta: "118 elements",
      },
      {
        name: "Concept Legends & Facts",
        opening: "Legend entries, high-yield facts and misconception fixes, per class and subject.",
        href: "/legend",
        meta: "Facts",
        links: [
          { label: "Class 11", href: "/legend/class-11-notes" },
          { label: "Class 12", href: "/legend/class-12-notes" },
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
        name: "3D Simulations Hub",
        opening: "All 3D simulations grouped by subject and official unit order.",
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
        name: "Knowledge Hub",
        opening: "Numericals, diagrams, grammar, writing and Nepali byakaran — with their pro pages.",
        href: "/knowledge",
        meta: "Concepts",
        links: [
          { label: "Numerical Physics", href: "/knowledge/numerical-physics" },
          { label: "Numerical Chemistry", href: "/knowledge/numerical-chemistry" },
          { label: "Biology Diagrams", href: "/knowledge/biology-diagrams" },
          { label: "English Grammar", href: "/knowledge/grammar" },
          { label: "English Writing", href: "/knowledge/writing" },
          { label: "नेपाली व्याकरण", href: "/knowledge/byakaran" },
        ],
      },
      {
        name: "Practice Quiz Bank",
        opening: "PYQ-style question sets by subject and unit, with worked answers.",
        href: "/quiz",
        meta: "PYQ",
      },
      {
        name: "Adaptive AI Quiz",
        opening: "Questions that adjust to your level as you answer.",
        href: "/ai-quiz",
        meta: "Adaptive",
      },
      {
        name: "AI Study Assistant",
        opening: "Ask anything — answers first, then the platform links and sources that back them.",
        href: "/chat",
        meta: "AI",
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
