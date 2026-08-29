import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

const TOPICS = [
  {
    title: "Parts of Speech",
    items: [
      "Noun — Person, Place, Thing, Idea (Proper, Common, Collective, Material, Abstract)",
      "Pronoun — Personal, Possessive, Reflexive, Relative, Interrogative",
      "Verb — Action, Auxiliary, Transitive, Intransitive",
      "Adjective — Descriptive, Quantitative, Demonstrative, Possessive, Interrogative",
      "Adverb — Time, Place, Manner, Degree, Frequency",
      "Preposition — of, in, on, at, by, with, from, to",
      "Conjunction — Co-ordinating, Sub-ordinating, Correlative",
      "Interjection — Expressing emotion (Oh! Alas! Hurrah!)",
    ],
  },
  {
    title: "Tenses",
    items: [
      "Simple Present — I write, He writes",
      "Present Continuous — I am writing, He is writing",
      "Present Perfect — I have written, He has written",
      "Present Perfect Continuous — I have been writing",
      "Simple Past — I wrote, He wrote",
      "Past Continuous — I was writing",
      "Past Perfect — I had written",
      "Simple Future — I will write",
      "Future Perfect — I will have written",
    ],
  },
  {
    title: "Voice (Active & Passive)",
    items: [
      "Active: Subject does the action",
      "Passive: Subject receives the action",
      "Rules for changing Voice in all tenses",
      "Intransitive verbs — no passive form",
      "Impersonal verbs — special passive construction",
    ],
  },
  {
    title: "Narration (Direct & Indirect Speech)",
    items: [
      "Direct Speech: Exact words spoken",
      "Indirect Speech: Reported speech",
      "Changes in tense, pronouns, time expressions",
      "Rules for Statements, Questions, Commands, Requests",
      "Exceptions — universal truths, timeless facts",
    ],
  },
  {
    title: "Clauses",
    items: [
      "Noun Clause — subject, object, complement",
      "Adjective Clause (Relative Clause) — who, which, that, whose",
      "Adverb Clause — time, place, reason, condition, purpose",
      "Clause vs Phrase distinction",
    ],
  },
  {
    title: "Conditionals",
    items: [
      "Type 0: Zero Conditional (facts) — If you heat water, it boils",
      "Type 1: First Conditional (real future) — If it rains, I will stay",
      "Type 2: Second Conditional (unreal present) — If I were rich, I would travel",
      "Type 3: Third Conditional (unreal past) — If I had studied, I would have passed",
    ],
  },
  {
    title: "Modals",
    items: [
      "Can / Could — ability, permission",
      "May / Might — possibility, permission",
      "Must / Have to — obligation",
      "Should / Ought to — advice",
      "Will / Would — future, requests",
    ],
  },
  {
    title: "Non-finite Verbs",
    items: [
      "Gerund — Verb + ing used as noun",
      "Infinitive — to + base verb",
      "Participle — Present (-ing), Past (-ed), Perfect (having + past participle)",
      "Verbal phrases and clauses",
    ],
  },
];

const EXAMPLES = [
  { before: "She writes a letter.", after: "A letter is written by her." },
  { before: "He said, 'I am busy.'", after: "He said that he was busy." },
  { before: "If she studies hard, she will pass.", after: "Conditional Type 1 — real future possibility" },
  { before: "The boy who is running is my brother.", after: "Relative clause — 'who is running' modifies 'boy'" },
];

export default function GrammarPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 py-6 md:py-10 px-4">
      <Link href="/knowledge" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Back to Knowledge
      </Link>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
          <BookOpen className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold">English Grammar</h1>
          <p className="text-xs text-muted-foreground">NEB Class 11 & 12 — Comprehensive grammar reference</p>
        </div>
      </div>

      <div className="space-y-3">
        {TOPICS.map((topic, i) => (
          <details key={i} className="rounded-xl border border-border bg-card overflow-hidden group">
            <summary className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-muted/50 transition-colors list-none">
              <span className="font-semibold text-sm">{topic.title}</span>
              <span className="text-muted-foreground text-xs group-open:hidden">▼</span>
              <span className="text-muted-foreground text-xs group-open:block hidden">▲</span>
            </summary>
            <div className="border-t border-border px-5 py-3 space-y-1.5">
              {topic.items.map((item, j) => (
                <div key={j} className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1 text-xs">●</span>
                  <p className="text-xs text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-5 space-y-3">
        <h2 className="font-semibold text-sm text-foreground">Transformation Examples</h2>
        {EXAMPLES.map((ex, i) => (
          <div key={i} className="grid grid-cols-[1fr_auto_1fr] gap-3 items-center py-2 border-b border-border/50 last:border-0">
            <p className="text-xs text-muted-foreground">Before: {ex.before}</p>
            <span className="text-xs text-muted-foreground text-center">→</span>
            <p className="text-xs font-medium text-green-600 dark:text-green-400 text-right">After: {ex.after}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
