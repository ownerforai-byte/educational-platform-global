import { createAIService, type AIChatMessage } from "../ai/service";
import { buildCurriculumContext, DEFAULT_RECORD_LIMIT } from "../ai/curriculum-retrieval";
import {
  configuredCommunityBotProviderPool,
  getCommunityBotDailyProvider,
} from "../ai/community-bot-daily-provider";
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

/** HTTP-safe failure from community bot generation (no keys or stacks on the wire). */
export class CommunityAssistantReplyError extends Error {
  readonly status: number;

  constructor(message: string, status = 503) {
    super(message);
    this.name = "CommunityAssistantReplyError";
    this.status = status;
  }
}

function capReply(trimmed: string): string {
  return trimmed.length > 8000 ? `${trimmed.slice(0, 7997)}…` : trimmed;
}

function mapAiFailure(err: unknown): never {
  const message = err instanceof Error ? err.message : String(err);
  if (/timeout|timed out|deadline/i.test(message)) {
    throw new CommunityAssistantReplyError(
      "The Study Assistant took too long to answer. Please try again in a moment.",
      504,
    );
  }
  throw new CommunityAssistantReplyError(
    "The Study Assistant is temporarily unavailable. Please try again in a moment.",
    503,
  );
}

function orderedPoolForToday(liveNames: string[]): string[] {
  const live = new Set(liveNames.map((n) => n.toLowerCase()));
  const pool = configuredCommunityBotProviderPool().filter((n) => live.has(n.toLowerCase()));
  if (pool.length === 0) return [];
  const daily = getCommunityBotDailyProvider(Date.now(), liveNames);
  const start = daily && pool.includes(daily) ? pool.indexOf(daily) : 0;
  return [...pool.slice(start), ...pool.slice(0, start)];
}

/**
 * Ground a community post in curriculum retrieval, then produce a concise
 * public comment (not a private chat turn).
 */
export async function generateCommunityFollowUpReply(opts: {
  title: string;
  body: string;
  category: string;
  question: string;
  priorAssistantReply?: string;
}): Promise<string> {
  const context = [
    `Original post:\n${opts.title}\n\n${opts.body}`,
    opts.priorAssistantReply ? `Your earlier public reply:\n${opts.priorAssistantReply}` : null,
    `Student follow-up question:\n${opts.question.trim()}`,
  ]
    .filter(Boolean)
    .join("\n\n");
  return generateCommunityAssistantReply({
    title: "Follow-up",
    body: context,
    category: opts.category,
  });
}

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
  const liveNames = service.getProviders();
  const poolOrder = orderedPoolForToday(liveNames);

  for (const providerName of poolOrder) {
    const reply = await service.tryChatProvider(providerName, messages);
    if (reply?.trim()) return capReply(reply.trim());
  }

  try {
    const chainReply = await service.chat("", messages);
    const trimmed = chainReply.trim();
    if (!trimmed) {
      throw new CommunityAssistantReplyError(
        "The Study Assistant could not produce a reply. Please try again in a moment.",
        502,
      );
    }
    return capReply(trimmed);
  } catch (err) {
    if (err instanceof CommunityAssistantReplyError) throw err;
    mapAiFailure(err);
  }
}