import { AIProvider, AIChatMessage, AISearchResponse } from "../types";
import { SYLLABUS } from "@/lib/syllabus";

export class OpenRouterProvider implements AIProvider {
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
    const syllabusContext = this.buildSyllabusContext(query);
    const messages: AIChatMessage[] = [
      {
        role: "system",
        content: `You are a NEB Class 11 study assistant.
${syllabusContext}
Answer the user query based on the syllabus context above.
If the query is unrelated to studies, projects, or non-academic topics, refuse politely.
Keep the reply concise and syllabus-aligned.`,
      },
      { role: "user", content: query },
    ];

    const reply = await this.callOpenRouter(messages);
    return {
      results: [],
      fallbackMessage: reply,
      syllabusHints: syllabusContext ? this.extractSyllabusHints(query) : undefined,
    };
  }

  private buildSyllabusContext(query: string): string {
    const lower = query.toLowerCase();
    const matches: Array<{ subject: string; unit: string; topics: string[] }> = [];
    for (const cls of SYLLABUS) {
      for (const subject of cls.subjects) {
        for (const unit of subject.units) {
          const matched = unit.topics.filter((topic) => topic.toLowerCase().includes(lower) || lower.includes(topic.toLowerCase()));
          if (matched.length > 0) matches.push({ subject: subject.name, unit: unit.title, topics: matched.slice(0, 5) });
        }
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

  private extractSyllabusHints(query: string): Array<{ subject: string; unit: string; topics: string[] }> {
    const lower = query.toLowerCase();
    const hints: Array<{ subject: string; unit: string; topics: string[] }> = [];
    for (const cls of SYLLABUS) {
      for (const subject of cls.subjects) {
        for (const unit of subject.units) {
          const matched = unit.topics.filter((topic) => topic.toLowerCase().includes(lower) || lower.includes(topic.toLowerCase()));
          if (matched.length > 0) hints.push({ subject: subject.name, unit: unit.title, topics: matched.slice(0, 5) });
        }
      }
    }
    return hints.slice(0, 5);
  }
}
