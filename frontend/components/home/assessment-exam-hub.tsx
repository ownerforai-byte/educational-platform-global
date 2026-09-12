"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Target,
  Brain,
  Sparkles,
  Clock,
  Calendar,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Award,
  Zap,
  BookOpen,
} from "lucide-react";

const EXAM_SCHEDULE = [
  { subject: "English", emoji: "📖", date: "2082-04-28", days: 228, color: "text-amber-500", border: "border-amber-500/20" },
  { subject: "Nepali", emoji: "🇳🇵", date: "2082-04-30", days: 230, color: "text-rose-500", border: "border-rose-500/20" },
  { subject: "Physics", emoji: "⚡", date: "2082-05-01", days: 231, color: "text-sky-500", border: "border-sky-500/20" },
  { subject: "Chemistry", emoji: "🧪", date: "2082-05-03", days: 233, color: "text-emerald-500", border: "border-emerald-500/20" },
  { subject: "Mathematics", emoji: "🔢", date: "2082-05-05", days: 235, color: "text-violet-500", border: "border-violet-500/20" },
  { subject: "Biology", emoji: "🌿", date: "2082-05-07", days: 237, color: "text-teal-500", border: "border-teal-500/20" },
];

export function AssessmentExamHub() {
  const [selectedSubject, setSelectedSubject] = useState("physics");
  const [selectedDifficulty, setSelectedDifficulty] = useState<"easy" | "intermediate" | "hard">("intermediate");
  const [selectedCount, setSelectedCount] = useState(10);

  return (
    <section id="section-assessment" className="mx-auto max-w-7xl px-4 py-12 scroll-mt-16 border-t border-border/60">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-border/60">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-500">
            <Target className="h-4 w-4" />
            <span>Assessment &amp; Exam Readiness</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
            AI Test Generator, Past Board PYQs &amp; Exam Countdown
          </h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Test your knowledge with dynamic AI question generation, review authentic NEB board questions, and stay ahead of your examination schedule.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/ai-quiz"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-sm hover:bg-primary/90 transition-all"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI Quiz Maker</span>
          </Link>
          <Link
            href="/exam-countdown"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border/70 bg-card hover:bg-muted text-xs font-semibold text-foreground transition-colors"
          >
            <Calendar className="h-3.5 w-3.5 text-primary" />
            <span>Countdown</span>
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        {/* Left Column: AI Quiz Generator Launchpad (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-border/70 bg-gradient-to-br from-violet-500/10 via-card to-card p-6 shadow-sm">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-500/20 text-violet-500">
                  <Brain className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-base">Instant AI Quiz Generator</h3>
                  <p className="text-xs text-muted-foreground">Custom syllabus questions synthesized on demand</p>
                </div>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-violet-500/20 text-violet-400">
                Live AI Engine
              </span>
            </div>

            {/* Quick interactive configurator */}
            <div className="mt-6 space-y-4">
              {/* Subject selector */}
              <div>
                <label className="text-xs font-semibold text-foreground block mb-2">Select Target Subject</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "physics", label: "Physics", icon: "⚡" },
                    { id: "chemistry", label: "Chemistry", icon: "🧪" },
                    { id: "mathematics", label: "Mathematics", icon: "🔢" },
                    { id: "biology", label: "Biology", icon: "🌿" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSubject(s.id)}
                      className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold border transition-all ${
                        selectedSubject === s.id
                          ? "border-violet-500 bg-violet-500/15 text-violet-500"
                          : "border-border/60 bg-card hover:bg-muted text-muted-foreground"
                      }`}
                    >
                      <span>{s.icon}</span>
                      <span>{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty selector */}
              <div>
                <label className="text-xs font-semibold text-foreground block mb-2">Difficulty Tier</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "easy" as const, label: "Easy", desc: "Fundamental definitions" },
                    { id: "intermediate" as const, label: "Intermediate", desc: "Standard board exam level" },
                    { id: "hard" as const, label: "Hard", desc: "Complex & analytical" },
                  ].map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setSelectedDifficulty(d.id)}
                      className={`flex flex-col items-start p-2.5 rounded-xl border text-left transition-all ${
                        selectedDifficulty === d.id
                          ? "border-violet-500 bg-violet-500/15 text-violet-500"
                          : "border-border/60 bg-card hover:bg-muted text-muted-foreground"
                      }`}
                    >
                      <span className="text-xs font-bold capitalize">{d.label}</span>
                      <span className="text-[10px] text-muted-foreground leading-tight mt-0.5">{d.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question count */}
              <div>
                <label className="text-xs font-semibold text-foreground block mb-2">Question Quantity</label>
                <div className="flex gap-2">
                  {[5, 10, 15, 20].map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCount(c)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                        selectedCount === c
                          ? "border-violet-500 bg-violet-500/15 text-violet-500"
                          : "border-border/60 bg-card hover:bg-muted text-muted-foreground"
                      }`}
                    >
                      {c} Questions
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Launch AI Quiz button */}
          <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              Instant grading with model step-by-step solutions
            </div>
            <Link
              href="/ai-quiz"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold shadow-md transition-all"
            >
              <span>Generate Test ({selectedCount} Qs)</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Column: PYQ Bank + Exam Countdown (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* PYQ Card */}
          <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-sm hover:border-sky-500/40 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/10 text-sky-500">
                  <BookOpen className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Past Questions (PYQ) Bank</h4>
                  <p className="text-[11px] text-muted-foreground">Authentic NEB past board examination papers</p>
                </div>
              </div>
              <Link
                href="/quiz"
                className="text-xs font-bold text-sky-500 hover:underline flex items-center gap-1"
              >
                Practice <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
              Solve chapter-wise past questions with official model answers, or take the Misconception Concept Test to identify common traps.
            </p>
          </div>

          {/* Board Exam Countdown Tracker */}
          <div className="flex-1 rounded-3xl border border-border/70 bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-rose-500" />
                <h4 className="text-sm font-bold text-foreground">NEB Exam Countdown (2082)</h4>
              </div>
              <Link
                href="/exam-countdown"
                className="text-xs font-semibold text-rose-500 hover:underline"
              >
                View Details &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {EXAM_SCHEDULE.map((item) => (
                <div
                  key={item.subject}
                  className={`rounded-2xl border ${item.border} bg-muted/20 p-2.5 text-center flex flex-col justify-between`}
                >
                  <div className="flex items-center justify-center gap-1 text-xs font-bold text-foreground">
                    <span>{item.emoji}</span>
                    <span className="truncate">{item.subject}</span>
                  </div>
                  <div className="my-1">
                    <span className={`text-base font-extrabold ${item.color}`}>~{item.days}</span>
                    <span className="text-[10px] text-muted-foreground block">days left</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-mono">{item.date}</span>
                </div>
              ))}
            </div>

            {/* Progress Hub Link */}
            <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                <span>Track your topic completion</span>
              </div>
              <Link
                href="/progress"
                className="text-xs font-semibold text-primary hover:underline"
              >
                Open My Progress &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
