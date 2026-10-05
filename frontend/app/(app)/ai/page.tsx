import type { Metadata } from "next";
import Link from "next/link";
import {
  Bot,
  Brain,
  Search,
  Sparkles,
  MessageSquare,
  History,
  Wand2,
  ListChecks,
  Target,
  BookOpenCheck,
  ArrowRight,
  Gem,
  BellRing,
} from "lucide-react";
import { AiPlanStrip } from "@/components/ai/ai-plan-strip";

export const metadata: Metadata = {
  title: "Veer Studio Hub — Tutor, Quiz Generator & Curriculum Search",
  description:
    "Owner-only Veer tool hub: study assistant, tutor console with saved conversations, adaptive quiz generator and curriculum search.",
};

/**
 * /ai — the AI Studio HUB (owner emails only since 2026-10-05;
 * ai/layout.tsx bounces everyone else, POST /api/ai enforces it).
 *
 * This page used to be the studio itself, with the tutor, the quiz generator
 * and the search engine hidden behind three in-page tabs — so all three shared
 * one URL and nothing could be linked, bookmarked or opened directly. Now each
 * tool lives on its own dedicated, feature-filled page and this page is the
 * door to them:
 *
 *   /chat       — AI study assistant (subject modes, quick actions)
 *   /ai/tutor   — tutor console with saved conversations & prompt enhancer
 *   /ai/history — history console: search your own saved conversations
 *   /ai-quiz    — adaptive quiz generator (its canonical route)
 *   /ai/search  — AI curriculum search
 */
const TOOLS: {
  href: string;
  title: string;
  badge: string;
  description: string;
  icon: typeof Bot;
  iconClass: string;
  borderClass: string;
  features: string[];
}[] = [
  {
    href: "/chat",
    title: "Veer Study Assistant",
    badge: "Ask a doubt",
    description:
      "The everyday tutor: ask any NEB Class 11 or 12 question and get a curriculum-aligned answer, right inside the console.",
    icon: MessageSquare,
    iconClass: "bg-violet-500/10 text-violet-500 border-violet-500/25",
    borderClass: "hover:border-violet-500/50",
    features: [
      "Subject modes — Physics, Chemistry, Biology, Maths",
      "Quick actions on every answer: copy, regenerate, go deeper, shorten",
      "Thread summary and a one-tap hand-off to the quiz generator",
    ],
  },
  {
    href: "/ai/tutor",
    title: "Tutor Console & History",
    badge: "Saved chats",
    description:
      "The long-form console for signed-in students: keep separate conversations, come back to any of them, and polish a rough question before sending.",
    icon: Bot,
    iconClass: "bg-fuchsia-500/10 text-fuchsia-500 border-fuchsia-500/25",
    borderClass: "hover:border-fuchsia-500/50",
    features: [
      "Conversation list with one-tap New conversation",
      "Prompt enhancer — rewrite a rough question before you send it",
      "History loads back from your account on every device",
    ],
  },
  {
    // Owner request (2026-09-30): a SEPARATE interface from the tutor console,
    // whose work is to search the owner's saved conversations and present
    // them as asked. Owner-only like the rest of /ai.
    href: "/ai/history",
    title: "History Console",
    badge: "Search your chats",
    description:
      "Ask about your own saved conversations — what you discussed, where it started, what was left unfinished — and get it presented, conversation by conversation.",
    icon: History,
    iconClass: "bg-sky-500/10 text-sky-500 border-sky-500/25",
    borderClass: "hover:border-sky-500/50",
    features: [
      "Searches only your saved messages — never answers from general knowledge",
      "Shows which conversation each moment came from",
      "Free for signed-in students; guests are asked to sign in",
    ],
  },
  {
    href: "/ai-quiz",
    title: "Adaptive Veer Quiz",
    badge: "Practice",
    description:
      "Generate a practice set from any subject and unit, pick the difficulty, then answer and score it with worked feedback.",
    icon: Brain,
    iconClass: "bg-blue-500/10 text-blue-500 border-blue-500/25",
    borderClass: "hover:border-blue-500/50",
    features: [
      "Easy, intermediate and hard difficulty bands",
      "Scoped to the official syllabus units you choose",
      "Live score, per-question feedback and instant retake",
    ],
  },
  {
    href: "/ai/search",
    title: "Veer Curriculum Search",
    badge: "Find anything",
    description:
      "Ask in plain language and get the pages that answer it — notes, labs, graphs and past questions — with the links to open each one.",
    icon: Search,
    iconClass: "bg-emerald-500/10 text-emerald-500 border-emerald-500/25",
    borderClass: "hover:border-emerald-500/50",
    features: [
      "Plain-language queries, not keyword guessing",
      "Returns notes, labs, graphs and question banks together",
      "Straight links to every match on the platform",
    ],
  },
];

const PROMISES = [
  {
    icon: BookOpenCheck,
    title: "Curriculum-anchored",
    text: "Answers follow the official CDC units, so revision stays board-exam shaped.",
  },
  {
    icon: ListChecks,
    title: "One credit, one reply",
    text: "Daily credits refill at midnight; PRO students are never capped.",
  },
  {
    icon: History,
    title: "Nothing lost",
    text: "Signed-in conversations are saved and restored wherever you sign in.",
  },
];

export default function AIStudioPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-3 sm:px-4 py-6 sm:py-10">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-violet-500/[0.08] via-card to-card p-6 sm:p-10 shadow-sm">
        <div className="absolute -top-16 -right-10 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/20">
              <Sparkles className="h-5 w-5 text-white" />
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
              AI Studio · Four Dedicated Tools
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
            AI Studio Hub
          </h1>
          <p className="max-w-3xl text-sm sm:text-base text-muted-foreground leading-relaxed">
            Every AI tool on Ravikisan&apos;s Platform now has its own page, with its own
            features and its own link — so you can open, share or bookmark the exact tool you
            need instead of landing on one page that hides all of them behind tabs.
          </p>
        </div>
      </div>

      {/* ── Live plan / credits ─────────────────────────────────────────── */}
      <AiPlanStrip />

      {/* ── The four tools ──────────────────────────────────────────────── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold tracking-tight">Open a tool</h2>
          <span className="text-xs text-muted-foreground">One page per tool</span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className={`group flex flex-col rounded-3xl border border-border/70 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${tool.borderClass}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${tool.iconClass}`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="rounded-full border border-border/60 bg-background/80 px-2.5 py-0.5 text-[9.5px] font-extrabold uppercase tracking-wider text-muted-foreground">
                    {tool.badge}
                  </span>
                </div>

                <h3 className="mt-4 text-base font-extrabold tracking-tight text-foreground group-hover:text-primary transition-colors">
                  {tool.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {tool.description}
                </p>

                <ul className="mt-3 space-y-1.5 border-t border-border/50 pt-3">
                  {tool.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[11px] text-foreground/80">
                      <Target className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-primary">
                  Open {tool.title}
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── What the studio guarantees ──────────────────────────────────── */}
      <section className="grid gap-4 sm:grid-cols-3">
        {PROMISES.map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.title} className="rounded-2xl border border-border/70 bg-card p-5">
              <Icon className="h-4 w-4 text-primary" />
              <h3 className="mt-2.5 text-sm font-bold text-foreground">{p.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{p.text}</p>
            </div>
          );
        })}
      </section>

      {/* ── Where credits come from ─────────────────────────────────────── */}
      <section className="rounded-2xl border border-border/70 bg-muted/20 p-5 space-y-2">
        <h2 className="flex items-center gap-2 text-sm font-bold text-foreground">
          <Wand2 className="h-4 w-4 text-violet-500" />
          How the daily pool works
        </h2>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Guests get 2 free messages a day. Signed-in students get 4 credits a day, and one
          credit pays for one AI reply. The pool refills at 12:00 AM and PRO students are never
          capped.{" "}
          <Link href="/credits" className="font-semibold text-primary hover:underline">
            See your plan and top-up options
          </Link>
          .
        </p>

        {/* Owner request (2026-09-30): the PRO plan link belongs under the
            plan/top-up line, and the notice board is reachable from here too.
            Both pages are public — never coin-gated — and neither is shown on
            the home page. */}
        <p className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-xs">
          <Link
            href="/pro-plan"
            className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
          >
            <Gem className="h-3.5 w-3.5" />
            PRO plan — Veer &amp; note credits with no daily cap
          </Link>
          <Link
            href="/notice"
            className="inline-flex items-center gap-1.5 font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <BellRing className="h-3.5 w-3.5" />
            Notice board
          </Link>
        </p>
      </section>
    </div>
  );
}
