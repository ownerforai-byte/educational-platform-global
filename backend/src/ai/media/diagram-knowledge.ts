/**
 * DIAGRAM KNOWLEDGE ENGINE — owner 2026-11-12
 *
 * "the agent should make the information for those interfaces, opening through
 * dots — in each diagram creation (mentioning related, relations and contrasts)
 * according to questions ... make the diagram agent capable to this"
 *
 * BEFORE: the drawing model received ONLY visual references (Wikimedia / Google
 * image files) plus a static rule saying "add dots with Related / Contrasts".
 * It had to invent the teaching content in the SAME pass that draws a 900x640
 * SVG, so the dots came back as generic boilerplate that barely matched the
 * question — and "relations" was not a field at all. The widget was therefore
 * only showing whatever happened to be coded into that single pass.
 *
 * NOW: this is the agent's separate REASONING PASS. It DERIVES, from the exact
 * question, the focus, named entities, related concepts, causal/functional
 * RELATIONS, exact CONTRASTS, the deeper mechanism and the exam trap. Its
 * output is injected into the drawing prompt as the SOURCE OF TRUTH for the
 * dots and is regenerated on EVERY diagram creation. Nothing here is pre-coded
 * student content: the information is created per question by the model.
 *
 * Best-effort by design: a missing key, timeout, malformed output or provider
 * failure returns `null` and the drawing still proceeds from the normal rules.
 */
import type { AIChatMessage } from "../service";

export const DIAGRAM_KNOWLEDGE_TIMEOUT_MS = 9000;
export const DIAGRAM_KNOWLEDGE_MARKER =
  "DIAGRAM KNOWLEDGE BRIEF — GENERATED FOR THIS REQUEST";

/** The seven lines the reasoning pass must produce. */
export const DIAGRAM_KNOWLEDGE_FIELDS = [
  "FOCUS",
  "ENTITIES",
  "RELATED",
  "RELATIONS",
  "CONTRASTS",
  "MECHANISM",
  "EXAM",
] as const;

export type DiagramKnowledgeField = (typeof DIAGRAM_KNOWLEDGE_FIELDS)[number];

export type DiagramKnowledgeBrief = Record<DiagramKnowledgeField, string> & {
  raw: string;
};

export interface DiagramKnowledgeOptions {
  /** School subject chosen in the Diagram Hub (Physics, Chemistry, ...). */
  subject?: string;
  /** Recent thread so "explain more" still derives knowledge for the topic. */
  conversationTail?: string;
  /** Diagrams already produced this session — drives the freshness rule. */
  priorDiagrams?: number;
  /** Injected transport, resolved server-side to the free diagram lane. */
  chat: (messages: AIChatMessage[]) => Promise<string>;
  /** Overridable in tests; production keeps the 9s budget. */
  timeoutMs?: number;
}

const KNOWLEDGE_SYSTEM = `You are the KNOWLEDGE ENGINE behind a teaching diagram tool. You do NOT draw anything.
Your only job is to DERIVE, from ONE specific student question, the exact teaching knowledge that will later be revealed by small floating dots inside its diagram.

The student will hover or click those dots. Every line you write must be NEW knowledge created for THIS question — never a definition of a whole subject, never generic study advice, never a template.

Return EXACTLY seven lines, each starting with its label in capitals, and NOTHING else: no markdown, no code fences, no numbering, no bullet points, no headings, no closing sentence.

FOCUS: the single concept this diagram must teach, in the question's own words.
ENTITIES: the 4-8 named parts, variables, quantities or structures that will actually be labelled in this diagram, comma separated.
RELATED: 3-5 concepts genuinely connected to THIS question, each followed by a short clause saying WHY it connects to this exact diagram; separate items with semicolons.
RELATIONS: 4-6 mathematical or physical links BETWEEN the ENTITIES above. The set MUST include BOTH kinds: (1) at least one MULTIPLICATIVE / direct-proportion item tagged "Multiplicative: A scales with B because …" (product, A ∝ B, F = ma, P = IV, …); (2) at least one INVERSE / reciprocal item tagged "Inverse: A falls as B rises because …" (A ∝ 1/B, I = V/R, inverse-square, reciprocal formula). Add other causal links as needed. Separate items with semicolons. Relations are NOT the same as related concepts — they are the links INSIDE the diagram.
CONTRASTS: 2-4 pairs that students actually confuse in THIS topic, each as "A vs B — the exact difference", explicitly correcting the misconception; separate items with semicolons.
MECHANISM: 2-3 sentences explaining the underlying mechanism, with units and the conditions under which it holds, for THIS question.
EXAM: the specific marking point or trap examiners use for THIS exact topic.

HARD RULES
- Name the question's own entities in FOCUS, ENTITIES, RELATIONS and CONTRASTS. If the question is about a specific organ, circuit, reaction, graph or theorem, every line must be about THAT one, not about the subject in general.
- EVERY detail dot that will later be drawn must be able to carry Related AND Relations (multiplicative + inverse) AND Contrasts for its anchored part — the brief must supply enough of each so no dot is left with only one of those three.
- Never write "in general", "in science", "it is important to note", or any line that would fit any other question equally well.
- Plain English only. NEVER use | < > & characters. Never put a line break inside a field. Keep each line under 600 characters.
- Do not invent sources, citations or links.`;

/** Strip anything that would break a dot's one-line machine-readable <title>. */
export function cleanKnowledgeValue(value: string): string {
  return value
    .replace(/```/g, "")
    .replace(/[|<>]/g, " ")
    .replace(/&/g, " and ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 600);
}

/**
 * Parse the seven labelled lines. Tolerates markdown bullets, fences, bold
 * labels and extra commentary. A brief is only usable if it actually carries
 * the three things the owner asked for: related, relations and contrasts.
 */
export function parseDiagramKnowledge(rawText: string): DiagramKnowledgeBrief | null {
  const raw = (rawText || "").trim();
  if (!raw) return null;

  const found: Partial<Record<DiagramKnowledgeField, string>> = {};
  for (const line of raw.split(/\r?\n/)) {
    const clean = line.replace(/^[\s>*\-#\d.]+/, "").replace(/\*\*/g, "").trim();
    const match =
      /^(FOCUS|ENTITIES|RELATED|RELATIONS|CONTRASTS|MECHANISM|EXAM)\s*:\s*(.+)$/i.exec(clean);
    if (!match) continue;
    const field = match[1].toUpperCase() as DiagramKnowledgeField;
    const value = cleanKnowledgeValue(match[2]);
    if (value) found[field] = value;
  }

  // A half-empty brief is worse than none: the drawing rules still force the
  // model to derive its own knowledge when no brief is attached.
  if (!found.RELATED || !found.RELATIONS || !found.CONTRASTS) return null;

  return {
    FOCUS: found.FOCUS ?? "",
    ENTITIES: found.ENTITIES ?? "",
    RELATED: found.RELATED,
    RELATIONS: found.RELATIONS,
    CONTRASTS: found.CONTRASTS,
    MECHANISM: found.MECHANISM ?? "",
    EXAM: found.EXAM ?? "",
    raw,
  };
}

/** The block injected into the drawing prompt, LAST before the output rules. */
export function formatDiagramKnowledgeBlock(brief: DiagramKnowledgeBrief): string {
  return [
    `[${DIAGRAM_KNOWLEDGE_MARKER}]`,
    "This block was DERIVED FROM THIS STUDENT'S QUESTION moments ago by a separate reasoning pass. It is regenerated on EVERY diagram creation. It is the SOURCE OF TRUTH for the detail dots. Never replace it with memorised, generic or previously used textbook lines, and never show it to the student as prose — the knowledge belongs INSIDE the dots.",
    "PER-DOT LAW: every edu-detail-dot <title> must include Related:, Relations: (at least one Multiplicative: item AND at least one Inverse: item) and Contrasts: for that dot's anchored part. Do not give dots single-purpose jobs.",
    ...DIAGRAM_KNOWLEDGE_FIELDS.map((field) => `${field}: ${brief[field]}`.trimEnd()),
    "[END OF DIAGRAM KNOWLEDGE BRIEF]",
  ].join("\n");
}

/** True when a Relations string names both multiplicative and inverse links. */
export function relationsCoverBothKinds(relations: string): boolean {
  const text = relations || "";
  const hasMultiplicative =
    /\bmultiplicative\b/i.test(text) ||
    /\bscales with\b/i.test(text) ||
    /\bproportional to\b/i.test(text) ||
    /∝\s*[A-Za-z]/.test(text);
  const hasInverse =
    /\binverse\b/i.test(text) ||
    /\breciprocal\b/i.test(text) ||
    /\bfalls as\b/i.test(text) ||
    /∝\s*1\s*\//.test(text) ||
    /\binversely\b/i.test(text);
  return hasMultiplicative && hasInverse;
}

function buildUserTurn(question: string, options: DiagramKnowledgeOptions): string {
  const parts = [
    `QUESTION: ${question.trim().slice(0, 900)}`,
    options.subject ? `SUBJECT: ${options.subject}` : "",
    options.conversationTail
      ? `RECENT CONVERSATION (topic context only): ${options.conversationTail.slice(0, 700)}`
      : "",
    `PRIOR DIAGRAMS IN THIS SESSION: ${options.priorDiagrams ?? 0}`,
  ].filter(Boolean);
  if ((options.priorDiagrams ?? 0) > 0) {
    parts.push(
      "This student has already seen a diagram in this session. If the question repeats a topic, choose DIFFERENT related concepts, relations and contrasts and go one level deeper. Do not restate an earlier brief.",
    );
  }
  parts.push("Derive the seven lines for THIS question now.");
  return parts.join("\n");
}

/**
 * Run the reasoning pass for ONE diagram creation. Never throws: a dead or
 * slow provider simply yields `null` so the picture still gets drawn.
 */
export async function buildDiagramKnowledge(
  question: string,
  options: DiagramKnowledgeOptions,
): Promise<DiagramKnowledgeBrief | null> {
  if (!question.trim()) return null;
  const timeoutMs = options.timeoutMs ?? DIAGRAM_KNOWLEDGE_TIMEOUT_MS;
  let timer: ReturnType<typeof setTimeout> | null = null;
  try {
    const messages: AIChatMessage[] = [
      { role: "system", content: KNOWLEDGE_SYSTEM },
      { role: "user", content: buildUserTurn(question, options) },
    ];
    const timedOut = new Promise<string>((resolve) => {
      timer = setTimeout(() => resolve(""), timeoutMs);
    });
    const raw = await Promise.race([
      options.chat(messages).catch((err: unknown) => {
        console.warn(
          "[DiagramKnowledge] reasoning pass failed:",
          err instanceof Error ? err.message : err,
        );
        return "";
      }),
      timedOut,
    ]);
    const brief = parseDiagramKnowledge(raw);
    if (!brief) {
      console.warn("[DiagramKnowledge] no usable brief — drawing proceeds without it");
      return null;
    }
    return brief;
  } catch (err) {
    console.warn("[DiagramKnowledge] unavailable:", err instanceof Error ? err.message : err);
    return null;
  } finally {
    if (timer) clearTimeout(timer);
  }
}
