"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Bot, Brain, Search, Sparkles, ChevronRight, Coins } from "lucide-react";
import { useSession } from "@/features/auth/hooks/use-session";
import { cn } from "@/lib/utils";
import { AIChatInterface } from "@/components/ai/ai-chat-interface";
import { QuizStudio } from "@/components/ai/quiz-studio";
import { SmartSearchPanel } from "@/components/ai/smart-search-panel";

/**
 * Lazy child components are mounted once and kept mounted when switching tabs
 * so chat history / quiz progress / search results survive navigation.
 */
const TABS = [
  { id: "tutor", label: "AI Tutor", icon: Bot, description: "Chat with Professor mode" },
  { id: "quiz", label: "Quiz Studio", icon: Brain, description: "Generate MCQ practice sets" },
  { id: "search", label: "Smart Search", icon: Search, description: "AI curriculum search" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function AIStudioPage() {
  const searchParams = useSearchParams();
  const initialTab = TABS.some((t) => t.id === searchParams.get("tab"))
    ? (searchParams.get("tab") as TabId)
    : "tutor";
  const [activeTab, setActiveTab] = useState<TabId>(initialTab);
  const { user } = useSession();

  return (
    <div className="mx-auto max-w-5xl px-2 sm:px-4 py-4 sm:py-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/20">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
              AI Studio
              <span className="rounded-full bg-violet-500/15 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-violet-500">
                Beta
              </span>
            </h1>
            <p className="text-xs text-muted-foreground">
              Your complete AI toolkit — tutor, quizzes, and curriculum search in one place.
            </p>
          </div>
        </div>

        {user ? (
          <span className="inline-flex w-fit items-center gap-1.5 rounded-xl border border-border/60 bg-muted/40 px-2.5 py-1.5 text-xs font-semibold">
            <Coins className="h-3.5 w-3.5 text-amber-500" />
            {user.credits ?? 0} credits
          </span>
        ) : (
          <Link
            href="/login"
            className="inline-flex w-fit items-center gap-1.5 rounded-xl bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Sign in for unlimited tutoring
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>

      {/* Tab bar */}
      <div className="flex gap-1.5 overflow-x-auto rounded-2xl border border-border/70 bg-card p-1.5">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-3 py-2.5 text-xs font-semibold transition-all",
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              )}
              title={tab.description}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Panels — all stay mounted so state survives tab switches */}
      <div className={activeTab === "tutor" ? "" : "hidden"}>
        <TutorPanel />
      </div>
      <div className={activeTab === "quiz" ? "" : "hidden"}>
        <QuizPanel />
      </div>
      <div className={activeTab === "search" ? "" : "hidden"}>
        <SearchPanel />
      </div>
    </div>
  );
}

// ── Panel wrappers ──────────────────────────────────────────────────────────

function TutorPanel() {
  return <AIChatInterface />;
}

function QuizPanel() {
  return <QuizStudio />;
}

function SearchPanel() {
  return <SmartSearchPanel />;
}
