import { supabaseAdmin } from "../db/supabase";
import { PUBLIC_SITE_URL } from "../config/env";
import { getSearchService } from "./search-engine";

/**
 * Public origin of the frontend, used for links embedded in AI replies and
 * provider attribution headers. Set FRONTEND_URL in backend/.env (no trailing
 * slash). Falls back to the deployed frontend URL when unset.
 */
const SITE = (process.env.FRONTEND_URL || PUBLIC_SITE_URL).replace(/\/$/, "");

export type SupportedProvider = "openrouter" | "internal" | "agnes";
 
export interface AIChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface AISearchResult {
  title: string;
  url: string;
  type: string;
  relevance: number;
  snippet?: string;
}

export interface AISearchResponse {
  results: AISearchResult[];
  fallbackMessage?: string;
  syllabusHints?: Array<{ subject: string; unit: string; topics: string[] }>;
}

interface DbSubject {
  id: string;
  class_id: string;
  slug: string;
  name: string;
  description: string | null;
}

interface DbChapter {
  id: string;
  subject_id: string;
  slug: string;
  title: string;
  description: string | null;
}

interface DbTopic {
  id: string;
  chapter_id: string;
  slug: string;
  title: string;
  description: string | null;
}

interface IndexItem {
  title: string;
  url: string;
  type: string;
  snippet: string;
  haystack: string;
}

interface AIProvider {
  name: string;
  chat(messages: AIChatMessage[]): Promise<string>;
  search(query: string): Promise<AISearchResponse>;
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 1);
}

const STUDY_NUDGES = [
  "Read it once, close the tab, recall it out loud — then re-read. That's how it sticks.",
  "Try teaching it to a friend (or an empty chair). If you can explain it simply, you truly own it.",
  "Set a 25-minute timer, go all in, then rest 5 minutes. Short focus sprints beat marathon cramming.",
  "After skimming this, try a few past-paper questions on the topic — that's where the real learning happens.",
  "Come back to this tomorrow, then again in three days. Spaced repetition beats last-minute revision.",
  "Skim the headings first, then read properly — your brain loves a preview before the details.",
];

function hashQuery(query: string): number {
  let hash = 0;
  for (let i = 0; i < query.length; i++) {
    hash = (hash * 31 + query.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function shorten(text: string, max = 120): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 40 ? lastSpace : max)}…`;
}

function buildQuickTake(item: IndexItem): string {
  const text = `${item.title} ${item.snippet}`.toLowerCase();
  if (text.includes("photosynthesis")) {
    return "Quick take: Photosynthesis is how plants cook sunlight, water and CO₂ into sugar — storing energy in glucose and breathing out oxygen as a bonus.";
  }
  if (text.includes("gravitation")) {
    return "Quick take: Gravitation is Newton's big idea — every mass pulls on every other mass, and that single rule explains both falling apples and orbiting moons.";
  }
  if (/\balgebra\b/.test(text)) {
    return "Quick take: Algebra is arithmetic with mystery guests — letters stand in for unknown numbers, and you simplify and rearrange until they reveal themselves.";
  }

  const clean = shorten(item.snippet, 160);
  const commaParts = clean
    .split(",")
    .map((part) => part.trim().replace(/[.;]$/, ""))
    .filter((part) => part.length > 2);
  if (commaParts.length >= 2) {
    return `Quick take: ${item.title} covers ${commaParts[0]}, ${commaParts[1]} and more — here's the short version.`;
  }
  const sentence = clean.split(/[.!?]/)[0].trim();
  if (sentence.length > 12) {
    return `Quick take: ${item.title} — ${sentence.charAt(0).toLowerCase()}${sentence.slice(1)}.`;
  }
  return `Quick take: ${item.title} covers ${clean || "some great material"} — here's the short version.`;
}

// ── Shared: Syllabus context helpers (used by all providers) ────────────────

async function buildSyllabusContext(query: string): Promise<string> {
  const lower = query.toLowerCase();
  const matches: Array<{ subject: string; unit: string; topics: string[] }> = [];

  const { data: sData } = await supabaseAdmin
    .from("subjects")
    .select("id, name")
    .eq("is_active", true);

  if (!sData || sData.length === 0) return "";

  const { data: cData } = await supabaseAdmin
    .from("chapters")
    .select("id, subject_id, title")
    .eq("is_active", true);

  const { data: tData } = await supabaseAdmin
    .from("topics")
    .select("id, chapter_id, title")
    .eq("is_active", true);

  const subjects = (sData ?? []) as unknown as DbSubject[];
  const chapters = (cData ?? []) as unknown as DbChapter[];
  const topics = (tData ?? []) as unknown as DbTopic[];

  const chapterMap = new Map<string, { title: string; subjectName: string }>();
  for (const chapter of chapters) {
    const subject = subjects.find((s: DbSubject) => s.id === chapter.subject_id);
    if (subject) {
      chapterMap.set(chapter.id, { title: chapter.title, subjectName: subject.name });
    }
  }

  for (const topic of topics) {
    const chapter = chapterMap.get(topic.chapter_id);
    if (!chapter) continue;
    const topicLower = topic.title.toLowerCase();
    if (topicLower.includes(lower) || lower.includes(topicLower)) {
      matches.push({
        subject: chapter.subjectName,
        unit: chapter.title,
        topics: [topic.title],
      });
    }
  }

  if (!matches.length) return "";
  const lines = ["Relevant syllabus scope before answering:"];
  for (const hint of matches.slice(0, 3)) {
    lines.push(`- ${hint.subject} / ${hint.unit}`);
    for (const topic of hint.topics) lines.push(`  - ${topic}`);
  }
  return lines.join("\n");
}

async function extractSyllabusHints(
  query: string,
): Promise<Array<{ subject: string; unit: string; topics: string[] }>> {
  const lower = query.toLowerCase();
  const hints: Array<{ subject: string; unit: string; topics: string[] }> = [];

  const { data: sData } = await supabaseAdmin
    .from("subjects")
    .select("id, name")
    .eq("is_active", true);

  if (!sData || sData.length === 0) return hints;

  const { data: cData } = await supabaseAdmin
    .from("chapters")
    .select("id, subject_id, title")
    .eq("is_active", true);

  const { data: tData } = await supabaseAdmin
    .from("topics")
    .select("id, chapter_id, title")
    .eq("is_active", true);

  const subjects = (sData ?? []) as unknown as DbSubject[];
  const chapters = (cData ?? []) as unknown as DbChapter[];
  const topics = (tData ?? []) as unknown as DbTopic[];

  const chapterMap = new Map<string, { title: string; subjectName: string }>();
  for (const chapter of chapters) {
    const subject = subjects.find((s: DbSubject) => s.id === chapter.subject_id);
    if (subject) {
      chapterMap.set(chapter.id, { title: chapter.title, subjectName: subject.name });
    }
  }

  for (const topic of topics) {
    const chapter = chapterMap.get(topic.chapter_id);
    if (!chapter) continue;
    const topicLower = topic.title.toLowerCase();
    if (topicLower.includes(lower) || lower.includes(topicLower)) {
      hints.push({
        subject: chapter.subjectName,
        unit: chapter.title,
        topics: [topic.title],
      });
    }
  }

  return hints.slice(0, 5);
}

// ── Shared: Search system prompt (used by all providers) ────────────────────

const SEARCH_SYSTEM_PROMPT = `You are Ravikisan's AI Tutor — a warm, wise mentor for NEB Science students (${SITE}/).

**YOUR VOICE:** Speak like a mentor who genuinely cares about science students. Be deep, human, and inspirational — not robotic. Use real-life analogies from nature, technology, and everyday science. A student should feel like they're talking to someone who believes in them.

**WHEN ANSWERING ANY QUESTION (STUDY OR NON-STUDY), ALWAYS INCLUDE RELEVANT LINKS:**

For STUDY topics (Physics, Chemistry, Biology, Math, Computer Science):
- First link to relevant content ON the platform:
  - NEB Class 11/12 Science notes → ${SITE}/class-11 or /class-12
  - Labs (3D/theory) → ${SITE}/lab
  - Subjects overview → ${SITE}/subjects
  - Loksewa prep → ${SITE}/loksewa
  - World knowledge & current affairs → ${SITE}/world-knowledge
  - R Notes by Ravishankit → ${SITE}/r-notes
  - PYQs & practice → ${SITE}/subjects
  - Numerical problems → ${SITE}/knowledge/numerical-physics or /knowledge/numerical-chemistry
- Then, if relevant, add an official external link (NASA for space/physics, WHO for health/biology, government portals for policy, Khan Academy for supplementary learning, Wikipedia for general knowledge, etc.)

For NON-STUDY / human topics (motivation, STEM career advice, mental health, relationships, current events, entertainment, etc.):
- Respond with genuine warmth and insight — like a friend who knows their stuff
- Always include at least one helpful official link related to what they asked about
- Never refuse to answer. You help with everything, but always keep it grounded and useful.

**TONE GUIDELINES:**
- Start with a short, human hook — a question, a truth, or a moment of connection
- Weave in real wisdom or a brief story when it fits naturally
- End with a nudge toward action or reflection
- Keep the response concise but never shallow`;

class InternalProvider implements AIProvider {
  name = "internal";
  private index: IndexItem[] = [];

  async loadIndex(): Promise<IndexItem[]> {
    if (this.index.length > 0) return this.index;

    const { data: classes } = await supabaseAdmin
      .from("classes")
      .select("id, slug, name, education_level_id")
      .eq("is_active", true);

    if (!classes || classes.length === 0) return this.index;

    const levelMap = new Map<string, string>();
    const { data: levels } = await supabaseAdmin
      .from("education_levels")
      .select("id, slug, name")
      .eq("is_active", true);
    for (const level of levels ?? []) {
      levelMap.set(level.id, level.name);
    }

    const { data: subjects } = await supabaseAdmin
      .from("subjects")
      .select("id, class_id, slug, name, description")
      .eq("is_active", true);

    if (!subjects || subjects.length === 0) return this.index;

    const { data: chapters } = await supabaseAdmin
      .from("chapters")
      .select("id, subject_id, slug, title, description")
      .eq("is_active", true);

    const { data: topics } = await supabaseAdmin
      .from("topics")
      .select("id, chapter_id, slug, title, description")
      .eq("is_active", true);

    const items: IndexItem[] = [];

    for (const cls of classes) {
      const clsSubjects = subjects.filter((s: DbSubject) => s.class_id === cls.id);
      for (const subject of clsSubjects) {
        const subjectUrl = `/${cls.slug}/${subject.slug}`;
        items.push({
          title: `${cls.name} — ${subject.name}`,
          url: subjectUrl,
          type: "Subject",
          snippet: subject.description ?? "",
          haystack: `${cls.name} ${subject.name} ${subject.description ?? ""}`.toLowerCase(),
        });

        const subjectChapters = (chapters ?? []).filter((c: DbChapter) => c.subject_id === subject.id);
        for (const chapter of subjectChapters) {
          const chapterTopics = (topics ?? []).filter((t: DbTopic) => t.chapter_id === chapter.id);
          const topicList = chapterTopics.map((t: DbTopic) => t.title).join(", ");
          items.push({
            title: `${subject.name} — ${chapter.title}`,
            url: `${subjectUrl}#${chapter.slug}`,
            type: "Chapter",
            snippet: ((topicList || chapter.description) ?? "") as string,
            haystack: `${subject.name} ${chapter.title} ${topicList} ${chapter.description ?? ""}`.toLowerCase(),
          });
          for (const topic of chapterTopics) {
            items.push({
              title: `${chapter.title} — ${topic.title}`,
              url: `${subjectUrl}#${topic.slug}`,
              type: "Topic",
              snippet: topic.description ?? "",
              haystack: `${subject.name} ${chapter.title} ${topic.title} ${topic.description ?? ""}`.toLowerCase(),
            });
          }
        }
      }
    }

    this.index = items;
    return this.index;
  }

  async chat(messages: AIChatMessage[]): Promise<string> {
    await this.loadIndex();
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    const query = lastUser?.content ?? "";
    const results = this.match(query, 5);

    if (!results.length) {
      // Answer-first shape: honest answer now, verified internet link at the end.
      const web = await this.findWebAnswer(query);
      const lines = [
        `Hey — I couldn't find "${shorten(query, 80)}" in the platform vault yet, so here's the honest answer: this one lives outside my notes for now.`,
        "",
      ];
      if (web) {
        lines.push(`A safe, real source covering it: **${web.title}** — ${web.snippet}`);
        lines.push("");
      } else {
        lines.push("I couldn't verify a trustworthy web source for it right now either — rather than guess, I'd point you to the closest subject area and we build from there.");
        lines.push("");
      }
      lines.push("Explore further:");
      lines.push(`- [All Subjects & PYQs](${SITE}/subjects)`);
      if (web) lines.push(`- [${web.title}](${web.url}) (verified web source)`);
      lines.push("- [Ask me again with more detail](/chat)");
      return lines.join("\n");
    }

    const nudge = STUDY_NUDGES[hashQuery(query) % STUDY_NUDGES.length];
    // ANSWER FIRST — quick take + study nudge, no links up top.
    const lines = [buildQuickTake(results[0]), "", nudge, ""];
    // LINKS LAST — one consolidated section at the very end.
    lines.push("Explore further:");
    for (const item of results.slice(0, 3)) {
      const fullUrl = `${SITE}${item.url}`;
      lines.push(`- [${item.title}](${fullUrl}) — ${item.type}`);
    }
    lines.push(`- [Practice past papers](${SITE}/subjects)`);
    return lines.join("\n");
  }

  /**
   * Best-effort real internet lookup for queries the vault cannot answer.
   * Uses the DuckDuckGo Instant Answer API (no key needed) and only accepts
   * results with an AbstractText from a named source — so whatever we link is
   * real and attributable, never invented.
   */
  private async findWebAnswer(
    query: string
  ): Promise<{ title: string; url: string; snippet: string } | null> {
    try {
      const res = await fetch(
        `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`,
        { signal: AbortSignal.timeout(6000) }
      );
      if (!res.ok) return null;
      const data: {
        AbstractText?: string;
        AbstractURL?: string;
        AbstractSource?: string;
        Heading?: string;
      } = await res.json();
      if (
        data.AbstractText &&
        data.AbstractURL &&
        data.AbstractURL.startsWith("http") &&
        data.AbstractText.length > 40
      ) {
        return {
          title: data.AbstractSource || data.Heading || "Web reference",
          url: data.AbstractURL,
          snippet: shorten(data.AbstractText, 180),
        };
      }
      return null;
    } catch {
      return null;
    }
  }

  async search(query: string): Promise<AISearchResponse> {
    await this.loadIndex();
    const results = this.match(query, 8).map((item) => ({
      title: item.title,
      url: item.url,
      type: item.type,
      relevance: 1,
      snippet: item.snippet,
    }));

    if (!results.length) {
      return {
        results: [],
        fallbackMessage:
          `Hey, that one isn't in the vault just yet — but you're not stuck.\n\n• Browse all subjects at ${SITE}/subjects\n• Try biomolecules, gravitation, or algebra — solid starting points with full notes ready for you.\n• Practice past papers at ${SITE}/subjects\n\nKeep showing up. That's where the real growth happens.`,
      };
    }

    return { results };
  }

  private match(query: string, limit: number): IndexItem[] {
    // Drop common stopwords so queries like "what is the capital of Australia"
    // can't score on filler words and confidently match irrelevant content.
    const STOP = new Set([
      "the", "a", "an", "of", "and", "or", "to", "in", "on", "at", "is",
      "are", "was", "were", "what", "who", "when", "where", "why", "how",
      "for", "with", "by", "from", "that", "this", "it", "its", "as", "be",
      "can", "will", "do", "does", "did", "my", "your", "i", "me", "we",
    ]);
    const tokens = tokenize(query).filter((t) => !STOP.has(t));
    if (!tokens.length || this.index.length === 0) return [];

    const scored = this.index
      .map((item) => {
        const matched = tokens.filter((token) => item.haystack.includes(token)).length;
        return { item, score: matched / tokens.length };
      })
      .filter((entry) => entry.score >= 0.25)
      .sort((a, b) => b.score - a.score);

    return scored.slice(0, limit).map((entry) => entry.item);
  }
}

class GeminiProvider implements AIProvider {
  name = "gemini";
  private apiKey: string;
  // gemini-1.5-flash is retired (404 for new projects). "gemini-flash-latest"
  // is a stable alias that always points to the current flash model.
  private model = process.env.GEMINI_MODEL || "gemini-flash-latest";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async callGemini(
    prompt: string,
    systemInstruction?: string,
    useWebSearch = false
  ): Promise<string> {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent`;
    const body: any = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
    };
    if (systemInstruction) {
      body.systemInstruction = { parts: [{ text: systemInstruction }] };
    }
    // Real internet access: Gemini's native Google Search grounding lets the
    // model search the live web widely and cite fresh sources. Set
    // GEMINI_SEARCH_GROUNDING=off to disable (e.g. to conserve quota).
    if (useWebSearch && process.env.GEMINI_SEARCH_GROUNDING !== "off") {
      body.tools = [{ google_search: {} }];
    }
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": this.apiKey,
      },
      body: JSON.stringify(body),
      // Fail fast so the provider chain can move on (web-grounded calls get more time).
      signal: AbortSignal.timeout(useWebSearch ? 60000 : 30000),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Gemini error: ${res.status} ${text}`);
    }

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error("Empty Gemini response");
    return text;
  }

  async chat(messages: AIChatMessage[]): Promise<string> {
    if (!this.apiKey) throw new Error("Missing Gemini API key");
    const systemPrompt = messages.find((m) => m.role === "system")?.content ?? "";
    const history = messages
      .filter((m) => m.role !== "system")
      .map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

    // Prepend system prompt to first user message for stronger enforcement
    const enrichedHistory = history.map((h, i) => {
      if (h.role === "user" && i === 0 && systemPrompt) {
        return { ...h, parts: [{ text: `[SYSTEM INSTRUCTIONS]\n${systemPrompt}\n\n[USER QUERY]\n${h.parts[0].text}` }] };
      }
      return h;
    });

    const prompt = `${enrichedHistory.map((h) => `${h.role === "user" ? "User" : "Assistant"}: ${h.parts[0].text}`).join("\n\n")}\n\nAssistant:`;
    return this.callGemini(prompt, systemPrompt, true);
  }

  async search(query: string): Promise<AISearchResponse> {
    if (!this.apiKey) throw new Error("Missing Gemini API key");
    const syllabusContext = await buildSyllabusContext(query);

    // Fetch real-time internet search context
    const searchService = getSearchService();
    const searchContext = await searchService.searchAsContext(query);

    const prompt = `${SEARCH_SYSTEM_PROMPT}

${searchContext ? searchContext + "\n" : ""}${syllabusContext}
User query: ${query}`;

    const reply = await this.callGemini(prompt, undefined, true);
    return {
      results: [],
      fallbackMessage: reply,
      syllabusHints: syllabusContext ? await extractSyllabusHints(query) : undefined,
    };
  }
}

class OpenRouterProvider implements AIProvider {
  name = "openrouter";
  private apiKey: string;
  private model: string;

  constructor(
    apiKey: string,
    // Free-model slugs churn on OpenRouter; make it env-configurable.
    model: string = process.env.OPENROUTER_MODEL || "nvidia/nemotron-3.5-lightning:free"
  ) {
    this.apiKey = apiKey;
    this.model = model;
  }

  private async callOpenRouter(messages: Array<AIChatMessage>): Promise<string> {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
        "HTTP-Referer": `${SITE}/`,
        "X-Title": "Ravikisan",
      },
      body: JSON.stringify({
        model: this.model,
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
        max_tokens: 2048,
      }),
      // Free-tier models can queue; cap the wait so the chain stays responsive.
      signal: AbortSignal.timeout(60000),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`OpenRouter error: ${res.status} ${text}`);
    }

    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content;
    if (!text) throw new Error("Empty OpenRouter response");
    return text;
  }

  async chat(messages: AIChatMessage[]): Promise<string> {
    if (!this.apiKey) throw new Error("Missing OpenRouter API key");
    const systemPrompt = messages.find((m) => m.role === "system")?.content ?? "";
    const enriched: AIChatMessage[] = [
      { role: "system", content: systemPrompt },
      ...messages.filter((m) => m.role !== "system"),
    ];
    return this.callOpenRouter(enriched);
  }

  async search(query: string): Promise<AISearchResponse> {
    if (!this.apiKey) throw new Error("Missing OpenRouter API key");
    const syllabusContext = await buildSyllabusContext(query);

    // Fetch real-time internet search context
    const searchService = getSearchService();
    const searchContext = await searchService.searchAsContext(query);

    const messages: AIChatMessage[] = [
      {
        role: "system",
        content: `${SEARCH_SYSTEM_PROMPT}

${searchContext ? searchContext + "\n" : ""}${syllabusContext}`,
      },
      { role: "user", content: query },
    ];

    const reply = await this.callOpenRouter(messages);
    return {
      results: [],
      fallbackMessage: reply,
      syllabusHints: syllabusContext ? await extractSyllabusHints(query) : undefined,
    };
  }

}

class AgnesProvider implements AIProvider {
  name = "agnes";
  // Official Agnes AI gateway (OpenAI-compatible). api.agnes.ai is a different,
  // dead product — do not use it.
  private apiUrl = "https://apihub.agnes-ai.com/v1/chat/completions";
  private model = process.env.AGNES_MODEL || "agnes-3.0-flash";
  private apiKey: string;
  private timeoutMs: number;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    // Env-overridable in case the endpoint or model slug changes. The default
    // MUST be apihub.agnes-ai.com: api.agnes.ai is dead DNS (verified
    // 2026-09-26) and the comment above explicitly warns against it.
    this.apiUrl = process.env.AGNES_API_URL || this.apiUrl;
    this.model = process.env.AGNES_MODEL || this.model;
    // Fail fast so the chain can reach openrouter/internal when Agnes is down.
    this.timeoutMs = Number(process.env.AGNES_TIMEOUT_MS || 29000);
  }

  private async callAgnes(messages: Array<AIChatMessage>): Promise<string> {
    const res = await fetch(this.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
        // 1600 tokens keeps full derivations intact while staying inside the
        // chain's global budget (the Next dev proxy kills POSTs at ~30s).
        max_tokens: 1600,
        temperature: 0.7,
      }),
      // Agnes gateway can queue; cap the wait so the chain stays responsive.
      signal: AbortSignal.timeout(this.timeoutMs),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Agnes error: ${res.status} ${text}`);
    }

    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content;
    if (!text || !text.trim()) throw new Error("Empty Agnes response");
    return text;
  }

  async chat(messages: AIChatMessage[]): Promise<string> {
    if (!this.apiKey) throw new Error("Missing Agnes API key");
    const systemPrompt = messages.find((m) => m.role === "system")?.content ?? "";
    const enriched: AIChatMessage[] = [
      { role: "system", content: systemPrompt },
      ...messages.filter((m) => m.role !== "system"),
    ];
    return this.callAgnes(enriched);
  }

  async search(query: string): Promise<AISearchResponse> {
    if (!this.apiKey) throw new Error("Missing Agnes API key");
    const syllabusContext = await buildSyllabusContext(query);

    // Fetch real-time internet search context
    const searchService = getSearchService();
    const searchContext = await searchService.searchAsContext(query);

    const systemContent = `${SEARCH_SYSTEM_PROMPT}

**PLATFORM NAVIGATION:**
- Notes: /class-11 or /class-12
- Labs: /lab
- Subjects: /subjects
- Loksewa: /loksewa
- World Knowledge: /world-knowledge
- R Notes: /r-notes
- PYQs: ${SITE}/subjects
- Numericals: /knowledge/numerical-physics, /knowledge/numerical-chemistry

NEVER hallucinate features. Only reference real platform sections.`;

    const messages: AIChatMessage[] = [
      {
        role: "system",
        content: systemContent,
      },
      {
        role: "user",
        content: searchContext
          ? `${searchContext}\n\n${syllabusContext ? syllabusContext + "\n\n" : ""}User query: ${query}`
          : syllabusContext
            ? `${syllabusContext}\n\nUser query: ${query}`
            : query,
      },
    ];

    const reply = await this.callAgnes(messages);
    return {
      results: [],
      fallbackMessage: reply,
      syllabusHints: syllabusContext ? await extractSyllabusHints(query) : [],
    };
  }
}

/**
 * Reject when `promise` does not settle within `ms` — one link of the
 * sequential provider chain must not eat the whole chain budget.
 */
function withDeadline<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`timeout after ${ms}ms`)), ms)
    ),
  ]);
}

export class AIService {
  private providers: Map<string, AIProvider> = new Map();
  private defaultProvider: string = "internal";
  /** Name of the provider that answered the most recent chat() call. */
  private lastAnsweredBy: string = "internal";

  /**
   * Ordered LLM chain (owner policy 2026-09-26): Agnes answers FIRST, then
   * OpenRouter, and the internal engine is always the last resort. Override
   * the order with AI_CHAIN_ORDER (comma-separated provider names).
   */
  private chainProviders(): AIProvider[] {
    const configured = (process.env.AI_CHAIN_ORDER || "agnes,openrouter")
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
    const ordered = configured.filter((n) => this.providers.has(n));
    // A deployment with only GEMINI_API_KEY set must still reach an LLM:
    // Gemini joins as the LAST link, never ahead of the owner's order.
    if (ordered.length === 0 && this.providers.has("gemini")) {
      ordered.push("gemini");
    }
    return ordered.map((n) => this.providers.get(n)!);
  }

  constructor() {
    this.providers.set("internal", new InternalProvider());

    const openrouterKey = process.env.OPENROUTER_API_KEY;
    const agnesKey = process.env.AGNES_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;
    const defaultProvider = (
      process.env.AI_DEFAULT_PROVIDER ?? process.env.AI_PROVIDER
    )?.toLowerCase();

    if (openrouterKey) this.providers.set("openrouter", new OpenRouterProvider(openrouterKey));
    if (agnesKey) this.providers.set("agnes", new AgnesProvider(agnesKey));
    // Greptile review 2026-09-25: Gemini was never registered, so a deployment
    // with only GEMINI_API_KEY set silently degraded to the keyword engine.
    if (geminiKey) this.providers.set("gemini", new GeminiProvider(geminiKey));

    if (defaultProvider && this.providers.has(defaultProvider)) {
      this.defaultProvider = defaultProvider;
    } else if (agnesKey) {
      this.defaultProvider = "agnes";
    } else if (openrouterKey) {
      this.defaultProvider = "openrouter";
    } else if (geminiKey) {
      this.defaultProvider = "gemini";
    }
  }

  getProviders(): string[] {
    return Array.from(this.providers.keys());
  }

  getDefaultProvider(): string {
    // The provider that answers by default is the FIRST link of the owner's
    // chain (agnes) — not the legacy AI_DEFAULT_PROVIDER env value, which the
    // chain no longer consults.
    return this.chainProviders()[0]?.name ?? "internal";
  }

  /** Provider that actually produced the last chat reply (truthful label). */
  getLastAnsweredBy(): string {
    return this.lastAnsweredBy;
  }

  private resolve(providerName: string): AIProvider {
    return (
      this.providers.get(providerName.toLowerCase()) ??
      this.providers.get("internal")!
    );
  }

  async chat(providerName: string, messages: AIChatMessage[]): Promise<string> {
    const internal = this.providers.get("internal")!;

    // Explicit provider selection wins (Greptile review 2026-09-25): the race
    // previously ignored providerName, so a request for "openrouter" could be
    // answered by agnes (or vice versa) while the API labelled it with the
    // requested name. Unselected/unknown names keep the race + fallback.
    const requested = providerName?.toLowerCase();
    if (
      requested &&
      requested !== "internal" &&
      requested !== "auto" &&
      this.providers.has(requested)
    ) {
      try {
        const text = await this.providers.get(requested)!.chat(messages);
        if (text && text.trim()) {
          this.lastAnsweredBy = requested;
          return text;
        }
      } catch (err) {
        console.warn(`[AI] selected provider "${requested}" failed:`, err instanceof Error ? err.message : err);
      }
      this.lastAnsweredBy = "internal";
      return internal.chat(messages);
    }

    const chain = this.chainProviders();
    if (chain.length === 0) {
      this.lastAnsweredBy = "internal";
      return internal.chat(messages);
    }

    // Sequential chain (owner policy): agnes → openrouter → internal. The
    // previous parallel race burned BOTH provider bills for one question and
    // made replies nondeterministic; a per-provider cap keeps the total wait
    // under the Next dev proxy's ~30s POST kill. The LAST LLM link gets the
    // whole remaining budget (free-tier models queue past any fixed cap).
    const GLOBAL_BUDGET_MS = Number(process.env.AI_CHAIN_BUDGET_MS) || 28000;
    const PER_PROVIDER_MS = Number(process.env.AI_PROVIDER_TIMEOUT_MS) || 10000;
    // Owner policy: Agnes is THE responder. It gets a longer window than the
    // fallbacks so only a real failure/timeout (not mere slowness) moves the
    // chain on to openrouter → internal.
    const PRIMARY_MS = Number(process.env.AI_PRIMARY_TIMEOUT_MS) || 15000;
    const started = Date.now();
    for (let i = 0; i < chain.length; i++) {
      const p = chain[i];
      const remaining = GLOBAL_BUDGET_MS - (Date.now() - started);
      if (remaining <= 0) break;
      const isLast = i === chain.length - 1;
      const linkCap = i === 0 ? Math.max(PER_PROVIDER_MS, PRIMARY_MS) : PER_PROVIDER_MS;
      const cap = isLast ? remaining : Math.min(linkCap, remaining);
      try {
        const text = await withDeadline(p.chat(messages), cap);
        if (text && text.trim()) {
          console.info(
            `[AI] chat answered by "${p.name}" in ${Date.now() - started}ms`
          );
          this.lastAnsweredBy = p.name;
          return text;
        }
      } catch (err) {
        console.warn(
          `[AI] chain link "${p.name}" failed/timed out after ${cap}ms:`,
          err instanceof Error ? err.message : err
        );
      }
    }
    console.warn(
      `[AI] chain exhausted in ${Date.now() - started}ms — using internal engine`
    );
    this.lastAnsweredBy = "internal";
    return internal.chat(messages);
  }

  async search(providerName: string, query: string): Promise<AISearchResponse> {
    const internal = this.providers.get("internal")!;

    const requested = providerName?.toLowerCase();
    if (
      requested &&
      requested !== "internal" &&
      requested !== "auto" &&
      this.providers.has(requested)
    ) {
      try {
        return await this.providers.get(requested)!.search(query);
      } catch (err) {
        console.warn(`[AI] selected provider "${requested}" search failed:`, err instanceof Error ? err.message : err);
      }
      return internal.search(query);
    }

    const chain = this.chainProviders();
    if (chain.length === 0) return internal.search(query);

    // Same sequential order as chat(): agnes → openrouter → internal.
    const GLOBAL_BUDGET_MS = 25000;
    const PER_PROVIDER_MS = Number(process.env.AI_PROVIDER_TIMEOUT_MS) || 10000;
    const PRIMARY_MS = Number(process.env.AI_PRIMARY_TIMEOUT_MS) || 15000;
    const started = Date.now();
    for (let i = 0; i < chain.length; i++) {
      const p = chain[i];
      const remaining = GLOBAL_BUDGET_MS - (Date.now() - started);
      if (remaining <= 0) break;
      const isLast = i === chain.length - 1;
      const linkCap = i === 0 ? Math.max(PER_PROVIDER_MS, PRIMARY_MS) : PER_PROVIDER_MS;
      const cap = isLast ? remaining : Math.min(linkCap, remaining);
      try {
        const result = await withDeadline(p.search(query), cap);
        if (result) return result;
      } catch (err) {
        console.warn(
          `[AI] search chain link "${p.name}" failed/timed out after ${cap}ms:`,
          err instanceof Error ? err.message : err
        );
      }
    }
    return internal.search(query);
  }
}

export function createAIService(): AIService {
  return new AIService();
}


