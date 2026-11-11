import Link from "next/link";
import { ArrowRight, Compass, HelpCircle, Sparkles, Zap } from "lucide-react";
import { AI_TOOL_GROUPS, toolsInGroup } from "./ai-tools-registry";

/**
 * The workspace, as a command deck.
 *
 * This page replaces a three-card banner that only linked to other pages. It
 * shows every tool exactly once, grouped by what the student is trying to do
 * (Study / Solve / Create / Review), each with its real one-line purpose — all
 * read from the shared registry so nothing can drift out of sync.
 */

const GROUP_COPY: Record<(typeof AI_TOOL_GROUPS)[number], string> = {
  Study: "Learn a topic, then prove you learned it.",
  Solve: "Stuck on a sum, a derivation or a single doubt? Start here.",
  Create: "Make something you can look at: diagrams and figures.",
  Review: "Go back through what you already discussed.",
};

const START_HERE = [
  {
    icon: Compass,
    title: "New to a topic",
    text: "Deep dive first, then generate a quiz on the same topic.",
    href: "/ai/deep-dive",
    linkLabel: "Open deep dive",
  },
  {
    icon: Zap,
    title: "Exam in a week",
    text: "Generate a hard MCQ set and let the grading show you the gaps.",
    href: "/ai-quiz",
    linkLabel: "Open quiz studio",
  },
  {
    icon: HelpCircle,
    title: "One stubborn doubt",
    text: "Ask it in quick chat — no thread to maintain, no history to clean.",
    href: "/chat",
    linkLabel: "Open quick chat",
  },
];

export function AiWorkspaceDeck() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-7 px-3 py-6 sm:px-4 sm:py-8">
      <header className="space-y-2">
        <p className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          Veer workspace
        </p>
        <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
          Every tool, grouped by what you are trying to do
        </h1>
        <p className="max-w-2xl text-[13px] leading-relaxed text-muted-foreground">
          Ten tools sit behind this page. Pick by intent — study, solve, create, review — instead of
          guessing which assistant does what.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          <Link
            href="/ai"
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-[11px] font-bold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Browse all tools and classrooms
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <Link
            href="/ai/subjects"
            className="inline-flex items-center gap-1.5 rounded-xl border-2 border-border/80 px-4 py-2 text-[11px] font-bold text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Open a subject classroom
          </Link>
        </div>
      </header>

      <section aria-labelledby="start-heading" className="space-y-3">
        <h2 id="start-heading" className="text-[13px] font-bold">
          Start here
        </h2>
        <ul className="grid gap-3 sm:grid-cols-3">
          {START_HERE.map((item) => (
            <li
              key={item.title}
              className="flex flex-col rounded-2xl border-2 border-border/80 bg-card p-4"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <item.icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <h3 className="mt-2.5 text-[13px] font-bold text-foreground">{item.title}</h3>
              <p className="mt-1 flex-1 text-[11px] leading-relaxed text-muted-foreground">{item.text}</p>
              <Link
                href={item.href}
                className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {item.linkLabel}
                <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {AI_TOOL_GROUPS.map((group) => {
        const tools = toolsInGroup(group);
        if (tools.length === 0) return null;
        return (
          <section key={group} aria-labelledby={`group-${group}`} className="space-y-3">
            <div className="flex items-baseline justify-between gap-3 border-b border-border/70 pb-2">
              <h2 id={`group-${group}`} className="text-[13px] font-bold uppercase tracking-wider">
                {group}
              </h2>
              <p className="text-[11px] text-muted-foreground">{GROUP_COPY[group]}</p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    className="group flex h-full items-start gap-3 rounded-2xl border-2 border-border/80 bg-card p-4 transition-colors hover:border-primary/50 hover:bg-primary/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${tool.accent}`}
                    >
                      <tool.icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-1 text-[13px] font-bold text-foreground">
                        {tool.label}
                        <ArrowRight
                          className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="mt-0.5 block text-[11px] leading-relaxed text-muted-foreground">
                        {tool.blurb}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
