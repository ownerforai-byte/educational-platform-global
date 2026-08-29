import { AIProvider, AIChatMessage, AISearchResponse } from "../types";
import { SYLLABUS } from "@/lib/syllabus";

interface IndexItem {
  title: string;
  url: string;
  type: string;
  snippet: string;
  haystack: string;
}

function buildIndex(): IndexItem[] {
  const items: IndexItem[] = [];
  for (const cls of SYLLABUS) {
    for (const subject of cls.subjects) {
      const subjectUrl = subject.notesUrl ?? `/${cls.slug}/${subject.slug}`;
      items.push({
        title: `${cls.name} — ${subject.name}`,
        url: subjectUrl,
        type: "Subject",
        snippet: subject.description,
        haystack: `${cls.name} ${subject.name} ${subject.description}`.toLowerCase(),
      });
      for (const unit of subject.units) {
        items.push({
          title: `${subject.name} — ${unit.title}`,
          url: `${subjectUrl}#${unit.id}`,
          type: "Unit",
          snippet: unit.topics.slice(0, 3).join(", "),
          haystack: `${subject.name} ${unit.title} ${unit.topics.join(" ")}`.toLowerCase(),
        });
      }
    }
  }
  return items;
}

const INDEX: IndexItem[] = buildIndex();

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

export class InternalProvider implements AIProvider {
  name = "internal";

  async chat(messages: AIChatMessage[]): Promise<string> {
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    const query = lastUser?.content ?? "";
    const results = this.match(query, 5);

    if (!results.length) {
      return "Hmm, I couldn't find that one in the syllabus yet. Try asking for a subject or a topic instead — biomolecules, gravitation or algebra are great starting points, and I'll walk you straight to the right notes.";
    }

    const nudge = STUDY_NUDGES[hashQuery(query) % STUDY_NUDGES.length];
    const lines = [buildQuickTake(results[0]), "", nudge, "", "Start here:"];
    for (const item of results.slice(0, 3)) {
      lines.push(`- ${item.title} (${item.type}) — ${shorten(item.snippet)}`);
      lines.push(`  ${item.url}`);
    }
    return lines.join("\n");
  }

  async search(query: string): Promise<AISearchResponse> {
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
          "No direct match for that one yet — try a subject or topic from the syllabus instead (biomolecules, gravitation or algebra all work great).",
      };
    }

    return { results };
  }

  private match(query: string, limit: number): IndexItem[] {
    const tokens = tokenize(query);
    if (!tokens.length) return [];

    const scored = INDEX.map((item) => {
      const matched = tokens.filter((token) => item.haystack.includes(token)).length;
      return { item, score: matched / tokens.length };
    })
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score);

    return scored.slice(0, limit).map((entry) => entry.item);
  }
}
