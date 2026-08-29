import { AIProvider, AIChatMessage, AISearchResponse } from "../types";
import { SYLLABUS } from "@/lib/syllabus";

export class GeminiProvider implements AIProvider {
  name = "gemini";
  private apiKey: string;
  private model = "gemini-2.0-flash";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async callGemini(prompt: string): Promise<string> {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": this.apiKey,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
      }),
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
    const history = messages.filter((m) => m.role !== "system").map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const prompt = `${systemPrompt}\n\n${history.map((h) => `${h.role === "user" ? "User" : "Assistant"}: ${h.parts[0].text}`).join("\n\n")}\n\nAssistant:`;
    return this.callGemini(prompt);
  }

  async search(query: string): Promise<AISearchResponse> {
    if (!this.apiKey) throw new Error("Missing Gemini API key");
    const syllabusContext = this.buildSyllabusContext(query);
    const prompt = `You are a NEB Class 11 study assistant.
${syllabusContext}
Answer the user query based on the syllabus context above.
If the query is unrelated to studies, projects, or non-academic topics, refuse politely.
Keep the reply concise and syllabus-aligned.

User query: ${query}`;

    const reply = await this.callGemini(prompt);
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
          if (matched.length > 0) {
            matches.push({ subject: subject.name, unit: unit.title, topics: matched.slice(0, 5) });
          }
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
