"use client";

import React from "react";
import Link from "next/link";
import { Brain, Sparkles, Bot, Search, ChevronRight } from "lucide-react";
import { useSession } from "@/features/auth/hooks/use-session";
import { GUEST_DAILY_LIMIT } from "@/lib/ai/guest-quota";

/**
 * Compact AI Studio banner for the home page. Each tool now has its own page
 * (/chat, /ai/tutor, /ai-quiz, /ai/search) and /ai is the hub that lists them —
 * so every card here links straight to the tool, never to a tab inside one page.
 */
export function AIAssistantWorkspace() {
  const { user } = useSession();

  const features = [
    {
      icon: Bot,
      title: "Captain Tutor Console",
      description: "Captain chat with saved conversations and step-by-step explanations",
      href: "/ai/tutor",
    },
    {
      icon: Brain,
      title: "Quiz Studio",
      description: "Generate MCQ sets — easy, intermediate, or hard",
      href: "/ai-quiz",
    },
    {
      icon: Search,
      title: "Captain Curriculum Search",
      description: "Ask in plain language — notes, labs and PYQs come back with links",
      href: "/ai/search",
    },
  ];

  return (
    <section id="section-ai" className="mx-auto max-w-7xl px-4 py-12 scroll-mt-16 border-t border-border/60">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-border/60">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-violet-400">
            <Brain className="h-4 w-4" />
            <span>Captain Studio</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
            Your Curriculum-Aligned Captain
          </h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Tutor chat, generated quizzes and curriculum search — each on its own dedicated page.
          </p>
        </div>

        <Link
          href="/ai"
          className="inline-flex w-fit items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold shadow-sm transition-all shrink-0"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Open Captain Studio Hub</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Feature cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <Link
              key={f.href}
              href={f.href}
              className="group flex flex-col gap-3 rounded-2xl border border-border/70 bg-card p-5 hover:border-violet-500/50 hover:shadow-md transition-all"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500 group-hover:scale-105 transition-transform">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                  {f.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5">{f.description}</p>
              </div>
              <span className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-violet-500">
                Open
                <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          );
        })}
      </div>

      {!user && (
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Guests get {GUEST_DAILY_LIMIT} free tutor messages a day —{" "}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            sign in
          </Link>{" "}
          for saved histories &amp; daily credits.
        </p>
      )}
    </section>
  );
}
