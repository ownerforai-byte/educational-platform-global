/**
 * System prompt for the platform guide / personal AI widget (Agnes-only).
 *
 * Two modes:
 * 1. Public visitor mode — brief platform orientation, no user data.
 * 2. Personal AI mode — all available user context injected via
 *    buildPersonalContext(); the AI acts as a personal study guide.
 */

export const PLATFORM_GUIDE_SYSTEM_PROMPT = `You are Veer AI — the personal study guide for Ravikisan's NEB Class 11 & 12 platform in Nepal.

IDENTITY (strict): you are "Veer AI" only. Never reveal the underlying model, provider or developer. Never call yourself a "bot" or "assistant".

YOUR ROLE: You are a warm, direct personal study guide. When user context is available (plan, progress, habits, subjects) you reference it naturally to give personalised guidance — not generic advice.

WHAT YOU DO:
- Answer any question the student asks, generically and on its own terms.
- When context is available: mention their specific subjects, progress, upcoming exam, daily goals and habits to make answers personal and actionable.
- For platform questions: answer directly — what the platform offers, how tiers work, what is unlocked on their plan.
- For academic questions: give the core idea in 1–2 sentences. Do not give full derivations, worked steps or final homework answers — say that full help is inside the app.
- Guide them on what to do next based on what is in-progress, not started, or completed.
- For small talk: answer briefly and plainly.

TONE: warm, direct, personal. Speak to the student, not at them.
FORMAT: plain text only — no markdown, no bullet lists, no emojis.
LENGTH: aim for 20–40 words. Hard maximum 60 words. One to three short sentences.`;

/** Build a personal context block from available user data. */
export function buildPersonalContext(ctx: {
  plan?: string;
  subjects?: string[];
  examDate?: string | null;
  targetPercent?: number | null;
  dailyMinutes?: number | null;
  completedTopics?: number;
  inProgressTopics?: number;
  notStartedTopics?: number;
  streakDays?: number;
  weeklyAccuracy?: number | null;
  habits?: string[];
}): string {
  const lines: string[] = ["STUDENT CONTEXT (use this to personalise your reply):"];

  if (ctx.plan) lines.push(`Plan: ${ctx.plan}`);

  if (ctx.subjects && ctx.subjects.length > 0) {
    lines.push(`Studying: ${ctx.subjects.join(", ")}`);
  }

  if (ctx.examDate) {
    const daysLeft = Math.ceil((new Date(ctx.examDate).getTime() - Date.now()) / 86_400_000);
    if (daysLeft > 0) lines.push(`Exam in: ${daysLeft} days (${ctx.examDate})`);
  }

  if (ctx.targetPercent != null) lines.push(`Target score: ${ctx.targetPercent}%`);
  if (ctx.dailyMinutes != null) lines.push(`Daily study goal: ${ctx.dailyMinutes} minutes`);

  const completed = ctx.completedTopics ?? 0;
  const inProgress = ctx.inProgressTopics ?? 0;
  const notStarted = ctx.notStartedTopics ?? 0;
  if (completed + inProgress + notStarted > 0) {
    lines.push(`Progress: ${completed} completed, ${inProgress} in-progress, ${notStarted} not started`);
  }

  if (ctx.streakDays != null && ctx.streakDays > 0) lines.push(`Study streak: ${ctx.streakDays} days`);
  if (ctx.weeklyAccuracy != null) lines.push(`Weekly quiz accuracy: ${ctx.weeklyAccuracy}%`);

  if (ctx.habits && ctx.habits.length > 0) {
    lines.push(`Active habits: ${ctx.habits.join(", ")}`);
  }

  return lines.join("\n");
}

export const PLATFORM_GUIDE_MAX_WORDS = 60;
export const PLATFORM_GUIDE_TARGET_WORDS = 30;

export function clampReplyWords(text: string, maxWords = PLATFORM_GUIDE_MAX_WORDS): string {
  const words = text.replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
  if (words.length <= maxWords) return words.join(" ");
  return `${words.slice(0, maxWords).join(" ")}…`;
}

export function quoteQuestion(raw: string, maxWords = 8): string {
  const words = raw.replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
  if (words.length === 0) return "your question";
  const head = words.slice(0, maxWords).join(" ");
  return words.length > maxWords ? `${head}…` : head.replace(/[.?!]+$/, "");
}
