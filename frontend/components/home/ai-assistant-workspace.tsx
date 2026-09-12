"use client";

import React from "react";
import Link from "next/link";
import {
  Brain,
  Sparkles,
  Coins,
  Bookmark,
  TrendingUp,
  Settings,
  ShieldCheck,
  Crown,
  ArrowRight,
} from "lucide-react";
import { StudyChat } from "@/components/chat/study-chat";

export function AIAssistantWorkspace() {
  return (
    <section id="section-ai" className="mx-auto max-w-7xl px-4 py-12 scroll-mt-16 border-t border-border/60">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-border/60">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-violet-400">
            <Brain className="h-4 w-4" />
            <span>AI Study Assistant &amp; Workspace</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
            Agnes: Your Curriculum-Aligned AI Tutor
          </h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Ask any question on NEB Class 11 &amp; 12 concepts, solve numerical problems with step-by-step guidance, and manage your personal study workspace.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/chat"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold shadow-sm transition-all"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Full AI Screen</span>
          </Link>
          <Link
            href="/credits"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border/70 bg-card hover:bg-muted text-xs font-semibold text-foreground transition-colors"
          >
            <Coins className="h-3.5 w-3.5 text-amber-500" />
            <span>My Credits</span>
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        {/* Left Column: Interactive Study Chat (8 cols) */}
        <div className="lg:col-span-8 flex flex-col rounded-3xl border border-border/70 bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-500">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">Interactive AI Study Chat</h3>
                <p className="text-[11px] text-muted-foreground">Trained on syllabus guidelines and model answers</p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500">
              Online
            </span>
          </div>

          {/* Embedded StudyChat */}
          <div className="flex-1 min-h-[360px] flex flex-col">
            <StudyChat compact={false} />
          </div>
        </div>

        {/* Right Column: Student Account & Utility Tools (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Student Workspace
            </h3>
            <span className="text-xs text-muted-foreground">My Account</span>
          </div>

          <div className="space-y-3">
            <Link
              href="/credits"
              className="group flex items-center justify-between p-4 rounded-2xl border border-border/70 bg-card hover:border-amber-500/40 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 group-hover:scale-105 transition-transform">
                  <Coins className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">Credits &amp; Plan</h4>
                  <p className="text-[11px] text-muted-foreground">Manage tokens, balance &amp; premium access</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>

            <Link
              href="/bookmarks"
              className="group flex items-center justify-between p-4 rounded-2xl border border-border/70 bg-card hover:border-violet-500/40 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500 group-hover:scale-105 transition-transform">
                  <Bookmark className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">Saved Bookmarks</h4>
                  <p className="text-[11px] text-muted-foreground">Quick access to bookmarked topics &amp; labs</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>

            <Link
              href="/progress"
              className="group flex items-center justify-between p-4 rounded-2xl border border-border/70 bg-card hover:border-emerald-500/40 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 group-hover:scale-105 transition-transform">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">Study Progress</h4>
                  <p className="text-[11px] text-muted-foreground">Completion analytics across all subjects</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>

            <Link
              href="/controller"
              className="group flex items-center justify-between p-4 rounded-2xl border border-border/70 bg-card hover:border-sky-500/40 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-500 group-hover:scale-105 transition-transform">
                  <Crown className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">Platform Controller</h4>
                  <p className="text-[11px] text-muted-foreground">System health, database &amp; diagnostics</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
