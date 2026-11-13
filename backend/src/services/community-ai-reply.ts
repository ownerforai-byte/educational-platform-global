import { createAIService, type AIChatMessage } from "../ai/service";
import { buildCurriculumContext, DEFAULT_RECORD_LIMIT } from "../ai/curriculum-retrieval";
import { getWorkLaneProvider } from "../ai/config";
import { COMMUNITY_BOT_DISPLAY_NAME } from "../lib/community-bot";

const CATEGORY_HINT: Record<string, string> = {
  general: "general NEB (+2) study",
  physics: "Class 11–12 Physics (NEB Nepal)",
  chemistry: "Class 11–12 Chemistry (NEB Nepal)",
  biology: "Class 11–12 Biology (NEB Nepal)",
  mathematics: "Class 11–12 Mathematics (NEB Nepal)",
  english: "Class 11–12 English (NEB Nepal)",
  nepali: "Class 11–12 Nepali (NEB Nepal)",
};

function subjectLine(category: string): string {
  return CATEGORY_HINT[category] ?? CATEGORY_HINT.general;
}

/**
 * Ground a community post in curriculum retrieval, then produce a concise
 * public comment (not a private chat turn).
 */
export async function generateCommunityAssistantReply(opts: {
  title: string;
  body: string;
  category: string;
}): Promise<string> {
  const question = [opts.title.trim(), opts.body.trim()].filter(Boolean).join("\n\n");
  const curriculum = buildCurriculumContext(question, Math.min(DEFAULT_RECORD_LIMIT, 4));
  const system = [
    `You are ${COMMUNITY_BOT_DISPLAY_NAME}, the official study helper on the Ravikisan community board.`,
    "A student published a public post; you are writing ONE community comment that everyone can read.",
    "Use the attached curriculum grounding when it matches the question; do not invent syllabus facts.",
    `Subject context: ${subjectLine(opts.category)}.`,
    "Format: clear Markdown (short headings or bullets when helpful).",
    "Tone: encouraging, precise, exam-oriented. No provider names, no meta about being an AI.",
    "Length: roughly 120–450 words unless the question is trivial.",
    "If the post is not a study question, briefly clarify and offer one constructive next step.",
    curriculum ? `\n---\nCURRICULUM GROUNDING\n${curriculum}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const messages: AIChatMessage[] = [
    { role: "system", content: system },
    { role: "user", content: question },
  ];

  const service = createAIService();
  const lane = getWorkLaneProvider("enhance") || getWorkLaneProvider("chat");
  const reply = await service.chat(lane, messages);
  const trimmed = reply.trim();
  if (!trimmed) throw new Error("Assistant produced an empty reply.");
  return trimmed.length > 8000 ? `${trimmed.slice(0, 7997)}…` : trimmed;
}
