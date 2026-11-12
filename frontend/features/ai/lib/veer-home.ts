/**
 * Shared empty-home chips for Veer Chat and the Professor widget.
 * Chat = deepest academic; widget = beginner nature / habits / recap / recall.
 */
import type { LucideIcon } from "lucide-react";
import {
  Droplets,
  Flower2,
  Leaf,
  Mountain,
  Sprout,
  Sun,
  TreePine,
  Wind,
} from "lucide-react";
import { SYLLABUS } from "@/lib/syllabus";

export type VeerChip = { id: string; label: string; prompt: string };

export type VeerLensId = "knowledge" | "ideas" | "derivations";

export const VEER_LENS_CHIPS: Array<{
  id: VeerLensId;
  label: string;
  hint: string;
  icon: LucideIcon;
}> = [
  {
    id: "knowledge",
    label: "Knowledge",
    hint: "Clear facts & foundations",
    icon: Sprout,
  },
  {
    id: "ideas",
    label: "Ideas",
    hint: "Intuition & living connections",
    icon: Flower2,
  },
  {
    id: "derivations",
    label: "Derivations",
    hint: "Step-by-step roots to result",
    icon: Mountain,
  },
];

/** Deep Veer Chat suggestions — full academic depth. */
export const VEER_CHAT_SUGGESTIONS: VeerChip[] = [
  {
    id: "todays-plan",
    label: "Today's deep plan",
    prompt:
      "Build today's deepest study plan from our chat and the NEB Class 11–12 syllabus: subject order, proofs to attempt, misconceptions to kill, and one exam-grade check per focus.",
  },
  {
    id: "summarise-history",
    label: "Deep learning map",
    prompt:
      "Map my learning history from this chat subject by subject at full depth: what I understand, what is half-formed, and the exact next concept chain to climb.",
  },
  {
    id: "progress",
    label: "Mastery check",
    prompt:
      "Audit my progress from chat history like a strict professor: strengths, weak mechanisms, missing derivations, and the next three deep moves with why each matters.",
  },
  {
    id: "daily-habits",
    label: "Scholar habits",
    prompt:
      "Design elite daily scholar habits (reading, writing, derivation practice, revision) as timed tasks grounded in our chat — concrete, hard enough to grow.",
  },
  {
    id: "weak-points",
    label: "Root weaknesses",
    prompt:
      "Dig out my weak points from chat history to their syllabus roots. For each: the misconception, the correct mechanism, and one tough practice that proves the fix.",
  },
  {
    id: "key-terms",
    label: "Concept forge",
    prompt:
      "Forge the key terms from our recent topics: precise definition, contrast with the nearest neighbour, one derivation or law link, and a trap students fall into.",
  },
  {
    id: "revision-sprint",
    label: "Deep 20-min sprint",
    prompt:
      "Give a 20-minute deep revision sprint from our history: re-derive one result, rewrite one explanation, answer one hard check. No fluff.",
  },
  {
    id: "exam-ideas",
    label: "Board-level ideas",
    prompt:
      "Give board-exam style ideas for topics we've touched: mark-worthy structure, common examiner traps, and one full model answer outline at depth.",
  },
];

/** @deprecated use VEER_CHAT_SUGGESTIONS */
export const VEER_SUGGESTION_CHIPS = VEER_CHAT_SUGGESTIONS;

/** Widget — beginner, nature, habits, recap, recall. */
export const VEER_WIDGET_SUGGESTIONS: VeerChip[] = [
  {
    id: "nature-plan",
    label: "Gentle day's plan",
    prompt:
      "Make a gentle beginner study plan for today like tending a garden: small watering (read), sunlight (one idea), and one seed to plant (tiny practice). Use our chat if any.",
  },
  {
    id: "recap",
    label: "Recap me",
    prompt:
      "Recap what I've learned so far in plain beginner language, subject by subject, like walking back through a forest path — short, warm, memorable.",
  },
  {
    id: "recall",
    label: "Recall drill",
    prompt:
      "Be my recaller: ask me 5 soft recall questions from our chat (or common Class 11–12 starters if history is thin). After each idea, remind me of the nature metaphor that sticks.",
  },
  {
    id: "habits",
    label: "Learning habits",
    prompt:
      "Build beginner learning habits (reading, writing, noticing, revising) as tiny natural rituals I can do daily — timed, kind, and realistic.",
  },
  {
    id: "weak-sprouts",
    label: "Weak sprouts",
    prompt:
      "Find my weak sprouts from chat history and explain each simply with one nature analogy and one tiny fix I can try today.",
  },
  {
    id: "key-seeds",
    label: "Key seeds",
    prompt:
      "Pull the key terms from recent topics and teach each as a seed: one sentence meaning, one living example, one picture in nature.",
  },
  {
    id: "breath-revision",
    label: "10-min breath revision",
    prompt:
      "Give a calm 10-minute revision: breathe through what we covered, one write line, one soft check question. Beginner-friendly.",
  },
  {
    id: "nature-bridge",
    label: "Nature bridge",
    prompt:
      "Bridge today's subject idea to something in nature (river, tree, weather, light) so a beginner never forgets it. Keep it warm and clear.",
  },
];

export const VEER_WIDGET_ROOTS: VeerChip[] = [
  {
    id: "root-habits",
    label: "Habits",
    prompt:
      "Coach my daily learning habits like seasons — morning seed, midday light, evening root. Beginner steps only.",
  },
  {
    id: "root-recall",
    label: "Recall",
    prompt:
      "Run a friendly recall session: what should stick from Class 11–12 this week, asked gently, answered with nature pictures.",
  },
  {
    id: "root-recap",
    label: "Recap",
    prompt:
      "Recap my recent learning path in short beginner paragraphs — one subject at a time, no jargon walls.",
  },
  {
    id: "root-nature",
    label: "Nature",
    prompt:
      "Teach the next useful science idea using only nature analogies a beginner can see: rivers, trees, wind, sunlight, soil.",
  },
  {
    id: "root-learning",
    label: "Learning",
    prompt:
      "Show me how to learn one small concept today: notice → name → nurture → check. Keep it beginner-friendly.",
  },
];

export const VEER_WIDGET_LENS_PROMPTS: Record<VeerLensId, string> = {
  knowledge:
    "Plant the core knowledge for my class and subject as a beginner garden: clear facts, soft key terms, one check question, nature analogies welcome.",
  ideas:
    "Share living ideas and intuition for my class and subject — connections a beginner can feel, with one nature picture each.",
  derivations:
    "Grow the most useful derivation gently for my class and subject: each step like a root, meaning of every line, beginner pace.",
};

export const VEER_CHAT_LENS_PROMPTS: Record<VeerLensId, string> = {
  knowledge:
    "Teach the deepest core knowledge for this subject: precise definitions, syllabus anchors, contrasts, and one hard check that proves mastery.",
  ideas:
    "Open the richest idea-space for this subject: mechanisms, mental models, cross-links, and exam-grade intuition — no shallow analogies alone.",
  derivations:
    "Derive the central result for this subject from first principles with full working, reasons on every line, and the exam form of the result.",
};

export const VEER_NATURE_SECTION_ICONS = {
  subjects: TreePine,
  focus: Leaf,
  suggestions: Sun,
  topics: Droplets,
  roots: Wind,
} as const;

/** Shorten a long syllabus topic into a chip label. */
export function shortTopicLabel(topic: string, max = 36): string {
  const clean = topic.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 12 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}

/** Subject-level quick topic chips from the official syllabus. */
export function topicChipsForSubject(
  subjectSlug: string | undefined,
  limit = 10,
  depth: "deep" | "gentle" = "deep",
): VeerChip[] {
  const gentle = depth === "gentle";
  if (!subjectSlug) {
    return gentle
      ? VEER_WIDGET_ROOTS.slice(0, 3)
      : [
          {
            id: "neb-overview",
            label: "NEB overview",
            prompt:
              "Give the deepest useful overview of NEB Class 11–12 Science structure and how to climb it this week with proofs and checks.",
          },
          {
            id: "study-system",
            label: "Study system",
            prompt:
              "Design a rigorous daily study system for Class 11–12: reading, writing, derivation, practice, revision — real timed tasks.",
          },
          {
            id: "pick-subject",
            label: "Pick a subject",
            prompt:
              "Help me choose which subject to attack today and why, then outline the first three deep steps including one derivation or mechanism.",
          },
        ];
  }

  const subject = SYLLABUS.flatMap((c) => c.subjects).find((s) => s.slug === subjectSlug);
  if (!subject) return [];

  const chips: VeerChip[] = [];
  for (const unit of subject.units) {
    for (const topic of unit.topics) {
      if (chips.length >= limit) return chips;
      const label = shortTopicLabel(topic);
      chips.push({
        id: `${subject.slug}-${unit.id}-${chips.length}`,
        label,
        prompt: gentle
          ? `Teach "${topic}" for ${subject.name} gently for a beginner: one clear idea, one nature analogy, key words as seeds, one soft check.`
          : `Teach "${topic}" for ${subject.name} at full depth: precise idea, key terms with contrasts, mechanism or derivation, exam trap, and a hard check.`,
      });
    }
  }
  return chips;
}
