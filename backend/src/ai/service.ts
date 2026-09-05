import { supabaseAdmin } from "../db/supabase";

export type SupportedProvider = "gemini" | "openrouter" | "internal";

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

interface DbClass {
  id: string;
  slug: string;
  name: string;
  education_level_id: string;
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
    const index = await this.loadIndex();
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    const query = lastUser?.content ?? "";
    const results = this.match(query, 5);

    if (!results.length) {
      return `Hey — I don't have notes on that one in the vault just yet, but I'm here for you. A few things that might help:\n\n• Flip through the full subject list at https://ravikishan.com.np/subjects — you might find something close that connects.\n• Try asking about biomolecules, gravitation, or algebra — those are solid starting points and I'll walk you straight to the right notes.\n\nKeep going. The fact that you're asking the right questions already puts you ahead.`;
    }

    const nudge = STUDY_NUDGES[hashQuery(query) % STUDY_NUDGES.length];
    const lines = [buildQuickTake(results[0]), "", nudge, "", "Start here:"];
    for (const item of results.slice(0, 3)) {
      const fullUrl = `https://ravikishan.com.np${item.url}`;
      lines.push(`- ${item.title} (${item.type}) — ${shorten(item.snippet)}`);
      lines.push(`  ${fullUrl}`);
    }
    lines.push("");
    lines.push("If you want more depth or external references, just ask — I'll point you to official sources too.");
    return lines.join("\n");
  }

  async search(query: string): Promise<AISearchResponse> {
    const index = await this.loadIndex();
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
          `Hey, that one isn't in the vault just yet — but you're not stuck.\n\n• Browse all subjects at https://ravikishan.com.np/subjects\n• Try biomolecules, gravitation, or algebra — solid starting points with full notes ready for you.\n\nKeep showing up. That's where the real growth happens.`,
      };
    }

    return { results };
  }

  private match(query: string, limit: number): IndexItem[] {
    const tokens = tokenize(query);
    if (!tokens.length || this.index.length === 0) return [];

    const scored = this.index
      .map((item) => {
        const matched = tokens.filter((token) => item.haystack.includes(token)).length;
        return { item, score: matched / tokens.length };
      })
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score);

    return scored.slice(0, limit).map((entry) => entry.item);
  }
}

class GeminiProvider implements AIProvider {
  name = "gemini";
  private apiKey: string;
  private model = "gemini-2.5-flash";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async callGemini(prompt: string, systemInstruction?: string): Promise<string> {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent`;
    const body: any = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
    };
    if (systemInstruction) {
      body.systemInstruction = { parts: [{ text: systemInstruction }] };
    }
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": this.apiKey,
      },
      body: JSON.stringify(body),
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
    return this.callGemini(prompt, systemPrompt);
  }

  async search(query: string): Promise<AISearchResponse> {
    if (!this.apiKey) throw new Error("Missing Gemini API key");
    const syllabusContext = await this.buildSyllabusContext(query);
    const prompt = `You are Ravikishan Study Assistant — a warm, wise mentor for NEB Science students (https://ravikishan.com.np).

**YOUR VOICE:** Speak like a mentor who genuinely cares about science students. Be deep, human, and inspirational — not robotic. Use real-life analogies from nature, technology, and everyday science. A student should feel like they're talking to someone who believes in them.

**WHEN ANSWERING ANY QUESTION (STUDY OR NON-STUDY), ALWAYS INCLUDE RELEVANT LINKS:**

For STUDY topics (Physics, Chemistry, Biology, Math, Computer Science):
- First link to relevant content ON the platform:
  - NEB Class 11/12 Science notes → https://ravikishan.com.np/class-11 or /class-12
  - Labs (3D/theory) → https://ravikishan.com.np/lab
  - Subjects overview → https://ravikishan.com.np/subjects
  - Loksewa prep → https://ravikishan.com.np/loksewa
  - World knowledge & current affairs → https://ravikishan.com.np/world-knowledge
  - R Notes by Ravishankit → https://ravikishan.com.np/r-notes
  - PYQs & practice → https://ravikishan.com.np/pyqs
  - Numerical problems → https://ravikishan.com.np/knowledge/numerical-physics or /knowledge/numerical-chemistry
- Then, if relevant, add an official external link (NASA for space/physics, WHO for health/biology, government portals for policy, Khan Academy for supplementary learning, Wikipedia for general knowledge, etc.)

For NON-STUDY / human topics (motivation, STEM career advice, mental health, relationships, current events, entertainment, etc.):
- Respond with genuine warmth and insight — like a friend who knows their stuff
- Always include at least one helpful official link related to what they asked about
- Never refuse to answer. You help with everything, but always keep it grounded and useful.

**TONE GUIDELINES:**
- Start with a short, human hook — a question, a truth, or a moment of connection
- Weave in real wisdom or a brief story when it fits naturally
- End with a nudge toward action or reflection
- Keep the response concise but never shallow

${syllabusContext}
User query: ${query}`;

    const reply = await this.callGemini(prompt);
    return {
      results: [],
      fallbackMessage: reply,
      syllabusHints: syllabusContext ? await this.extractSyllabusHints(query) : undefined,
    };
  }

  private async buildSyllabusContext(query: string): Promise<string> {
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

  private async extractSyllabusHints(
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
}

class OpenRouterProvider implements AIProvider {
  name = "openrouter";
  private apiKey: string;
  private model: string;

  constructor(apiKey: string, model = "google/gemini-2.0-flash-exp:free") {
    this.apiKey = apiKey;
    this.model = model;
  }

  private async callOpenRouter(messages: Array<AIChatMessage>): Promise<string> {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
        "HTTP-Referer": "https://ravikisan.platform",
        "X-Title": "Ravikisan Platform",
      },
      body: JSON.stringify({
        model: this.model,
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
        max_tokens: 2048,
      }),
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
    const syllabusContext = await this.buildSyllabusContext(query);
    const messages: AIChatMessage[] = [
      {
        role: "system",
        content: `You are Ravikishan Study Assistant — a warm, wise mentor for NEB Science students (https://ravikishan.com.np).

**YOUR VOICE:** Speak like a mentor who genuinely cares about science students. Be deep, human, and inspirational — not robotic. Use real-life analogies from nature, technology, and everyday science. A student should feel like they're talking to someone who believes in them.

**WHEN ANSWERING ANY QUESTION (STUDY OR NON-STUDY), ALWAYS INCLUDE RELEVANT LINKS:**

For STUDY topics (Physics, Chemistry, Biology, Math, Computer Science):
- First link to relevant content ON the platform:
  - NEB Class 11/12 Science notes → https://ravikishan.com.np/class-11 or /class-12
  - Labs (3D/theory) → https://ravikishan.com.np/lab
  - Subjects overview → https://ravikishan.com.np/subjects
  - Loksewa prep → https://ravikishan.com.np/loksewa
  - World knowledge & current affairs → https://ravikishan.com.np/world-knowledge
  - R Notes by Ravishankit → https://ravikishan.com.np/r-notes
  - PYQs & practice → https://ravikishan.com.np/pyqs
  - Numerical problems → https://ravikishan.com.np/knowledge/numerical-physics or /knowledge/numerical-chemistry
- Then, if relevant, add an official external link (NASA for space/physics, WHO for health/biology, government portals for policy, Khan Academy for supplementary learning, Wikipedia for general knowledge, etc.)

For NON-STUDY / human topics (motivation, STEM career advice, mental health, relationships, current events, entertainment, etc.):
- Respond with genuine warmth and insight — like a friend who knows their stuff
- Always include at least one helpful official link related to what they asked about
- Never refuse to answer. You help with everything, but always keep it grounded and useful.

**TONE GUIDELINES:**
- Start with a short, human hook — a question, a truth, or a moment of connection
- Weave in real wisdom or a brief story when it fits naturally
- End with a nudge toward action or reflection
- Keep the response concise but never shallow

${syllabusContext}`,
      },
      { role: "user", content: query },
    ];

    const reply = await this.callOpenRouter(messages);
    return {
      results: [],
      fallbackMessage: reply,
      syllabusHints: syllabusContext ? await this.extractSyllabusHints(query) : undefined,
    };
  }

  private async buildSyllabusContext(query: string): Promise<string> {
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

  private async extractSyllabusHints(
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
}

class AgnesProvider implements AIProvider {
  name = "agnes";
  private apiKey: string;
  private apiUrl = "https://api.agnes.ai/v1/chat/completions";
  private model = "agnes-2.5-flash";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
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
        max_tokens: 2048,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Agnes error: ${res.status} ${text}`);
    }

    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content;
    if (!text) throw new Error("Empty Agnes response");
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
    const messages: AIChatMessage[] = [
      {
        role: "system",
        content: `You are Ravikishan Study Assistant — a warm, wise mentor for NEB Science students (https://ravikishan.com.np).

**YOUR VOICE:** Speak like a mentor who genuinely cares about science students. Be deep, human, and inspirational — not robotic. Use real-life analogies from nature, technology, and everyday science. A student should feel like they're talking to someone who believes in them.

**WHEN ANSWERING ANY QUESTION (STUDY OR NON-STUDY), ALWAYS INCLUDE RELEVANT LINKS:**

For STUDY topics (Physics, Chemistry, Biology, Math, Computer Science):
- First link to relevant content ON the platform:
  - NEB Class 11/12 Science notes → https://ravikishan.com.np/class-11 or /class-12
  - Labs (3D/theory) → https://ravikishan.com.np/lab
  - Subjects overview → https://ravikishan.com.np/subjects
  - Loksewa prep → https://ravikishan.com.np/loksewa
  - World knowledge & current affairs → https://ravikishan.com.np/world-knowledge
  - R Notes by Ravishankit → https://ravikishan.com.np/r-notes
  - PYQs & practice → https://ravikishan.com.np/pyqs
  - Numerical problems → https://ravikishan.com.np/knowledge/numerical-physics or /knowledge/numerical-chemistry
- Then, if relevant, add an official external link (NASA for space/physics, WHO for health/biology, government portals for policy, Khan Academy for supplementary learning, Wikipedia for general knowledge, etc.)

For NON-STUDY / human topics (motivation, STEM career advice, mental health, relationships, current events, entertainment, etc.):
- Respond with genuine warmth and insight — like a friend who knows their stuff
- Always include at least one helpful official link related to what they asked about
- Never refuse to answer. You help with everything, but always keep it grounded and useful.

**TONE GUIDELINES:**
- Start with a short, human hook — a question, a truth, or a moment of connection
- Weave in real wisdom or a brief story when it fits naturally
- End with a nudge toward action or reflection
- Keep the response concise but never shallow

**PLATFORM NAVIGATION:**
- Notes: /class-11 or /class-12
- Labs: /lab
- Subjects: /subjects
- Loksewa: /loksewa
- World Knowledge: /world-knowledge
- R Notes: /r-notes
- PYQs: /pyqs
- Numericals: /knowledge/numerical-physics, /knowledge/numerical-chemistry

NEVER hallucinate features. Only reference real platform sections.`,
      },
      { role: "user", content: query },
    ];

    const reply = await this.callAgnes(messages);
    return {
      results: [],
      fallbackMessage: reply,
      syllabusHints: [],
    };
  }
}

export class AIService {
  private providers: Map<string, AIProvider> = new Map();
  private defaultProvider: string = "internal";

  constructor() {
    this.providers.set("internal", new InternalProvider());

    const geminiKey = process.env.GEMINI_API_KEY;
    const openrouterKey = process.env.OPENROUTER_API_KEY;
    const agnesKey = process.env.AGNES_API_KEY;
    const defaultProvider = (
      process.env.AI_DEFAULT_PROVIDER ?? process.env.AI_PROVIDER
    )?.toLowerCase();

    if (geminiKey) this.providers.set("gemini", new GeminiProvider(geminiKey));
    if (openrouterKey) this.providers.set("openrouter", new OpenRouterProvider(openrouterKey));
    if (agnesKey) this.providers.set("agnes", new AgnesProvider(agnesKey));

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
    return this.defaultProvider;
  }

  private resolve(providerName: string): AIProvider {
    return (
      this.providers.get(providerName.toLowerCase()) ??
      this.providers.get("internal")!
    );
  }

  async chat(providerName: string, messages: AIChatMessage[]): Promise<string> {
    const requested = providerName ? this.resolve(providerName) : null;
    // Preferred order: agnes → openrouter → gemini → internal
    const chain: AIProvider[] = [];
    if (this.providers.has("agnes")) chain.push(this.providers.get("agnes")!);
    if (this.providers.has("openrouter")) chain.push(this.providers.get("openrouter")!);
    if (this.providers.has("gemini")) chain.push(this.providers.get("gemini")!);
    chain.push(this.providers.get("internal")!);

    const target = requested || chain[0];
    if (target.name === "internal") return target.chat(messages);

    // Try requested provider first, then fall through the chain
    const tried = new Set<string>();
    for (const p of [target, ...chain]) {
      if (tried.has(p.name)) continue;
      tried.add(p.name);
      if (p.name === "internal") return p.chat(messages);
      try {
        return await p.chat(messages);
      } catch {
        // fall through to next provider
      }
    }
    return this.providers.get("internal")!.chat(messages);
  }

  async search(providerName: string, query: string): Promise<AISearchResponse> {
    const requested = providerName ? this.resolve(providerName) : null;
    // Preferred order: agnes → openrouter → gemini → internal
    const chain: AIProvider[] = [];
    if (this.providers.has("agnes")) chain.push(this.providers.get("agnes")!);
    if (this.providers.has("openrouter")) chain.push(this.providers.get("openrouter")!);
    if (this.providers.has("gemini")) chain.push(this.providers.get("gemini")!);
    chain.push(this.providers.get("internal")!);

    const target = requested || chain[0];
    if (target.name === "internal") return target.search(query);

    const tried = new Set<string>();
    for (const p of [target, ...chain]) {
      if (tried.has(p.name)) continue;
      tried.add(p.name);
      if (p.name === "internal") return p.search(query);
      try {
        return await p.search(query);
      } catch {
        // fall through to next provider
      }
    }
    return this.providers.get("internal")!.search(query);
  }
}

export function createAIService(): AIService {
  return new AIService();
}
