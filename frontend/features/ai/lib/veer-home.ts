/**
 * Shared empty-home chips for Veer Chat, Professor widget, and Workspace.
 * Small key-term boxes that send a real next prompt when clicked.
 */
import { SYLLABUS } from "@/lib/syllabus";

export type VeerChip = { id: string; label: string; prompt: string };

/** Section 3 — study / history suggestions (work as next prompts). */
export const VEER_SUGGESTION_CHIPS: VeerChip[] = [
  {
    id: "todays-plan",
    label: "Today's plan",
    prompt:
      "Make today's beginner-friendly study plan for me from what we've talked about and NEB Class 11–12. Short steps, real tasks, one subject focus if my history is thin.",
  },
  {
    id: "summarise-history",
    label: "Summarise my learning",
    prompt:
      "Summarise my learning history from this chat: go subject by subject in short plain language. If history is thin, outline what a strong Class 11–12 week looks like and what to ask next.",
  },
  {
    id: "progress",
    label: "Progress check",
    prompt:
      "From our chat history, rate my progress honestly — strengths, gaps, and the next three study moves. Keep it beginner-friendly and full of concrete ideas.",
  },
  {
    id: "daily-habits",
    label: "Daily habits",
    prompt:
      "Build daily learning habits for me (study, reading, writing, revision, practice) as real timed tasks based on our chat. Include a simple checklist I can follow today.",
  },
  {
    id: "weak-points",
    label: "Weak points",
    prompt:
      "Spot my weak points from our chat history and explain each simply with a tiny practice idea. If history is thin, list the usual Class 11–12 weak spots and how to fix them.",
  },
  {
    id: "key-terms",
    label: "Key terms drill",
    prompt:
      "Pull the most important key terms from our recent topics (or current subject) and teach each in one clear sentence plus a tiny example a beginner can remember.",
  },
  {
    id: "revision-sprint",
    label: "15-min revision",
    prompt:
      "Give me a 15-minute revision sprint from our chat history: what to re-read, one quick write task, and one check question. Beginner-friendly.",
  },
  {
    id: "exam-ideas",
    label: "Exam ideas",
    prompt:
      "Share exam-style ideas and how to answer them for topics we've touched. Keep language simple, show thinking steps, and add one practice prompt I can try now.",
  },
];

export const VEER_LENS_CHIPS: Array<{
  id: "knowledge" | "ideas" | "derivations";
  label: string;
  hint: string;
}> = [
  { id: "knowledge", label: "Knowledge", hint: "Clear facts & foundations" },
  { id: "ideas", label: "Ideas", hint: "Intuition & connections" },
  { id: "derivations", label: "Derivations", hint: "Step-by-step proofs" },
];

/** Shorten a long syllabus topic into a chip label. */
export function shortTopicLabel(topic: string, max = 36): string {
  const clean = topic.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 12 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}

/** Subject-level quick topic chips from the official syllabus. */
export function topicChipsForSubject(subjectSlug: string | undefined, limit = 10): VeerChip[] {
  if (!subjectSlug) {
    return [
      {
        id: "neb-overview",
        label: "NEB overview",
        prompt:
          "Give me a beginner-friendly overview of NEB Class 11–12 Science and how to start studying this week.",
      },
      {
        id: "study-system",
        label: "Study system",
        prompt:
          "Design a simple daily study system for Class 11–12: reading, writing, practice, and revision — real tasks I can do today.",
      },
      {
        id: "pick-subject",
        label: "Pick a subject",
        prompt:
          "Help me choose which subject to focus on today and why, then outline the first three beginner steps.",
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
        prompt: `Teach "${topic}" for ${subject.name} in a beginner-friendly way: clear idea first, then key terms, then one short practice check. Full of concrete examples.`,
      });
    }
  }
  return chips;
}
