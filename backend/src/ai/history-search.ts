/**
 * HISTORY SEARCH — the tutor's other job: search the student's OWN saved
 * conversations and present what they discussed, as asked.
 *
 * Owner request (2026-09-30): "create and route a separate interface for tutor
 * console and history — its work is specially to search chat history and
 * present them as asked." So this is not a tutor that answers academic
 * questions; it answers questions ABOUT the student's own history ("what did we
 * discuss about capacitors?", "where did we leave the lens derivation?",
 * "summarise everything I asked about chemistry").
 *
 * Two rules make that honest, and both are enforced in code rather than hoped
 * for in a prompt:
 *
 *   1. THE ANSWER MAY ONLY COME FROM THE HISTORY. The selected messages are
 *      attached verbatim; the model is told to state plainly when the history
 *      does not contain something, and never to fill a gap with general
 *      knowledge. A history search that answers from the model's memory is a
 *      fabricated history.
 *   2. THE SEARCH IS REAL, NOT A DUMP. Every saved message is scored against
 *      the question's own words and only the matching ones are attached — with
 *      the conversation names, because "which thread was that in" is half of
 *      what the student is asking. If nothing matches, the caller is told so
 *      and no model call is made at all.
 *
 * The one subtle rule, and the reason it is written down: a question that NAMES
 * a topic gets only that topic's messages, even when that leaves nothing ("my
 * history does not mention photosynthesis" is the honest answer, and the route
 * says it without spending a call). Falling back to "your most recent messages"
 * is reserved for a question that names nothing at all — "summarise everything"
 * — where recency is the only sensible order. Words are compared by stem (see
 * `stem` in curriculum-retrieval), so "capacitors" finds "capacitor".
 */
import { stem } from "./curriculum-retrieval";

export interface HistoryMessage {
  session: string;
  role: "user" | "assistant";
  content: string;
  created_at?: string;
}

export interface HistorySelection {
  /** The messages to attach, oldest-first across all conversations. */
  selected: HistoryMessage[];
  /** Conversation name → how many of its messages were attached. */
  sessions: Array<{ session: string; messages: number; matched: number; lastMessageAt: string }>;
  /** How much was searched, so the UI can say it honestly. */
  considered: { messages: number; sessions: number; chars: number };
  /** The question's own searchable words after scaffolding is removed. */
  terms: string[];
}

/** Words that carry no search value in a "show me my history" question. */
const STOPWORDS = new Set([
  "what", "which", "when", "where", "who", "whom", "why", "how", "did", "does",
  "was", "were", "are", "our", "you", "your", "yours", "with", "about", "from",
  "into", "over", "under", "between", "this", "that", "these", "those", "there",
  "them", "then", "than", "have", "has", "had", "can", "could", "would", "should",
  "please", "tell", "show", "give", "find", "search", "summary", "summarise",
  "summarize", "recap", "list", "all", "everything", "anything", "something",
  "history", "chat", "chats", "conversation", "conversations", "thread",
  "threads", "session", "sessions", "asked", "said", "discussed", "talked",
  "discuss", "whole", "entire", "full", "complete", "overall", "generally",
  "talk", "mention", "mentioned", "before", "earlier", "previous", "last",
  "again", "the", "and", "for", "not", "but", "any", "some", "more", "most",
]);

/** The words worth searching the history for. */
export function historyTerms(question: string): string[] {
  const words = (question || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  const terms: string[] = [];
  for (const word of words) {
    const term = word.replace(/^-+|-+$/g, "");
    if (term.length < 3 || STOPWORDS.has(term)) continue;
    if (!terms.includes(term)) terms.push(term);
  }
  return terms;
}

/** Words of a message, lowercased and stripped of punctuation. */
function wordsOf(text: string): string[] {
  return (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

/**
 * Relevance of one message: how many of the question's terms it carries, and
 * how often. Compared by STEM, so a question about "capacitors" matches a
 * message that says "capacitor" — without it, the plural asked for and the
 * singular written looked like two different topics.
 */
export function scoreMessage(content: string, terms: string[]): number {
  if (!terms.length) return 0;
  const wanted = terms.map(stem);
  const counts = new Map<string, number>();
  for (const word of wordsOf(content)) {
    const key = stem(word);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  let score = 0;
  for (const term of new Set(wanted)) {
    const hits = counts.get(term) ?? 0;
    if (hits > 0) score += 1 + Math.min(2, (hits - 1) * 0.5);
  }
  return score;
}

/**
 * Pick the messages worth attaching for this question.
 *
 * When the question names nothing searchable ("summarise everything"), the most
 * recent messages win instead of an empty result — the student still gets their
 * history presented, just by recency rather than by topic.
 */
export function selectHistory(
  messages: HistoryMessage[],
  question: string,
  opts: { maxMessages?: number; maxChars?: number } = {},
): HistorySelection {
  const maxMessages = opts.maxMessages ?? 80;
  const maxChars = opts.maxChars ?? 40_000;
  const terms = historyTerms(question);
  const considered = {
    messages: messages.length,
    sessions: new Set(messages.map((m) => m.session || "default")).size,
    chars: messages.reduce((sum, m) => sum + m.content.length, 0),
  };

  const scored = messages.map((message, index) => ({
    message,
    index,
    score: scoreMessage(message.content, terms),
  }));

  // A question that names nothing searchable is the ONLY case that falls back
  // to recency. A question that names a topic the history does not cover must
  // come back empty, so the caller can say so instead of presenting unrelated
  // old messages as the answer.
  const byRecency = terms.length === 0;
  const ranked = byRecency
    ? [...scored].sort((a, b) => b.index - a.index)
    : [...scored].sort((a, b) => b.score - a.score || b.index - a.index);

  const matched: typeof scored = [];
  let chars = 0;
  for (const entry of ranked) {
    if (!entry.message.content.trim()) continue;
    if (!byRecency && entry.score === 0) break;
    if (matched.length >= maxMessages) break;
    if (chars + entry.message.content.length > maxChars && matched.length) break;
    matched.push(entry);
    chars += entry.message.content.length;
  }

  // A matched message brings its NEIGHBOUR in the same conversation. Half of a
  // history answer is the reply to the question the student just found: without
  // it, "you asked about the energy in a capacitor" arrives with no answer
  // beside it, and the model is left to reconstruct one (which it must not do).
  const byIndex = new Map(scored.map((entry) => [entry.index, entry]));
  const chosenIndexes = new Set(matched.map((entry) => entry.index));
  if (!byRecency) {
    for (const index of [...chosenIndexes]) {
      const session = byIndex.get(index)?.message.session ?? "default";
      for (const neighbour of [index - 1, index + 1]) {
        const entry = byIndex.get(neighbour);
        if (entry && entry.message.session === session && entry.message.content.trim()) {
          chosenIndexes.add(neighbour);
        }
      }
    }
  }

  // Attach in chronological order: a history reads forwards, and the model is
  // asked to present it that way.
  const picked = [...chosenIndexes]
    .map((index) => byIndex.get(index)!)
    .sort((a, b) => a.index - b.index)
    .slice(0, Math.max(maxMessages, matched.length));
  const selected = picked.map((entry) => entry.message);

  const bySession = new Map<string, { messages: number; matched: number; lastMessageAt: string }>();
  for (const entry of picked) {
    const name = entry.message.session || "default";
    const bucket = bySession.get(name) ?? { messages: 0, matched: 0, lastMessageAt: "" };
    bucket.messages += 1;
    if (entry.score > 0) bucket.matched += 1;
    bucket.lastMessageAt = bucket.lastMessageAt || entry.message.created_at || "";
    bySession.set(name, bucket);
  }

  return {
    selected,
    sessions: Array.from(bySession, ([session, stats]) => ({ session, ...stats })),
    considered,
    terms,
  };
}

/**
 * The contract the model answers a history question under. Deliberately narrow:
 * this interface searches saved conversations, it does not teach.
 */
export const HISTORY_SEARCH_RULES = `[VEER — HISTORY CONSOLE]

Your only job on this page is to SEARCH THE STUDENT'S OWN SAVED CONVERSATIONS
and present what they contain, exactly as asked.

HOW TO SEARCH:
- Read every [SAVED CONVERSATION] message attached below before you answer.
- The question asks about the history, not about the subject. Answer from the
  history: what was asked, what was explained, what conclusion was reached,
  what was left unfinished.
- When the question names a topic, list every place it appears — even a passing
  mention — in the order it happened.

HOW TO PRESENT:
- Lead with the direct answer in one short line ("You asked about capacitors
  twice, on two different ideas.").
- Then WALK THE MOMENTS: one short block per occurrence, each naming the
  conversation it came from and what was actually said (paraphrase tightly,
  quote a formula or a key sentence when that is the point).
- Close with what is still open: questions the student asked that were not
  finished, or a thread that was abandoned mid-derivation.
- Keep it tight and skimmable: short sentences, one idea per line, no padding.
- If a conversation name is available, use it so the student can reopen it.

ABSOLUTE LIMITS:
- Never answer from your own knowledge of the subject. If the history does not
  contain what was asked, say so plainly in one line ("Your saved conversations
  do not mention X") and stop — never fill the gap with a lesson on the topic.
- Never invent a conversation, a message, a date or a quote. Only the attached
  messages exist.
- Never claim the history covers something it only touches on.
- If the history is empty or the attached messages do not match the question,
  say exactly that and suggest a wider search word.`;

/** Format the selected history as the block the model reads. */
export function formatHistoryContext(selection: HistorySelection): string {
  if (!selection.selected.length) return "";
  const lines = [
    "[SAVED CONVERSATION]",
    `The student's own saved messages, oldest first. ${selection.selected.length} of ` +
      `${selection.considered.messages} message(s) across ${selection.considered.sessions} ` +
      `conversation(s) matched this question's words: ${selection.terms.join(", ") || "(none)"}.`,
    "",
  ];
  let currentSession = "";
  for (const message of selection.selected) {
    const session = message.session || "default";
    if (session !== currentSession) {
      currentSession = session;
      lines.push(`── conversation: ${session} ──`);
    }
    lines.push(`${message.role === "user" ? "STUDENT" : "VEER"}: ${message.content}`);
    lines.push("");
  }
  lines.push("[END OF SAVED CONVERSATION]");
  return lines.join("\n");
}
