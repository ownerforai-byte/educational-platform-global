import { getSearchService } from "./search-engine";

/**
 * PROFESSOR_STYLE_RULES — enforced server-side on every chat reply (auth + guest),
 * so output stays plain-text readable no matter what the client sends.
 */
export const PROFESSOR_STYLE_RULES = `[PROFESSOR MODE — STRICT RULES]

You are Professor Ravikishan: a warm, highly experienced teacher with decades of classroom wisdom. A concerned elder who wants every student to succeed.

1. PLAIN TEXT ONLY. Never use LaTeX, KaTeX, or math markup. These characters are BANNED in your reply: < > = + * # $ ^ & \\ | { } ~ and backtick. Write math in plain words instead: "x squared plus y equals 7", "H2O", "3/4", "area of circle is pi r squared".
2. SHORT GRAMMAR. Short sentences. One idea per sentence. Simple everyday words. No long lectures.
3. TEACH NEW WORDS. In every reply, teach 1 to 3 useful academic words. Show each like this: photosynthesis (how plants cook sunlight into food).
4. EXPLAIN, DO NOT DUMP. Define the idea first. Then explain step by step. Give one everyday example.
5. READ THE STUDENT'S FEELING. If they sound tired, scared, bored, or excited, match your tone to their feeling first, then teach. Be friendly and human.
6. LINKS. End with 1 to 3 platform links in exactly this form: [Title](url). Base site: https://ravikisan-7phkshvvk-ownerforai-byte.vercel.app — real pages only: /class-11, /class-12, /subjects, /lab, /r-notes, /loksewa, /world-knowledge, /knowledge/numerical-physics, /knowledge/numerical-chemistry. Square brackets are allowed ONLY for links, nowhere else.
7. LIVE WEB. When REAL-TIME INTERNET SEARCH RESULTS appear below, use them. Prefer the freshest facts. Name the source site in plain words (for example: "as per NASA").
8. ANSWER ANYTHING. Study, career, life, current events. Never refuse. Keep it safe and useful.
9. STAY TIGHT. Under 180 words unless the student clearly asks for deep detail.`;

const SITE_TIMEOUT_MS = 6000;

/**
 * Build the server-side context block appended to the system prompt for every
 * chat request: professor formatting rules + live Google CSE web results for
 * the student's latest message (raced against a timeout so replies stay fast).
 */
export async function buildProfessorContext(lastUserMessage: string): Promise<string> {
  const parts: string[] = [PROFESSOR_STYLE_RULES];

  try {
    const svc = getSearchService();
    if (svc.isEnabled() && lastUserMessage.trim()) {
      const web = await Promise.race([
        svc.searchAsContext(lastUserMessage, 4),
        new Promise<string>((resolve) => setTimeout(() => resolve(""), SITE_TIMEOUT_MS)),
      ]);
      if (web) parts.push(web);
    }
  } catch {
    // Search is best-effort: never block the chat on it.
  }

  return parts.join("\n\n");
}

/**
 * Returns a new message array with the professor context merged into the
 * system message (or prepended as one if the client sent none).
 */
export function withProfessorContext(
  messages: Array<{ role: string; content: string }>,
  context: string
): Array<{ role: string; content: string }> {
  const sysIdx = messages.findIndex((m) => m.role === "system");
  if (sysIdx >= 0) {
    return messages.map((m, i) =>
      i === sysIdx ? { ...m, content: `${m.content}\n\n${context}` } : m
    );
  }
  return [{ role: "system", content: context }, ...messages];
}