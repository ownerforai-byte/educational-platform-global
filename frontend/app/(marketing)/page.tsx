"use client";

import { GraduationCap, Sparkles, BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ScienceLabSection } from "@/components/lab/science-lab-section";

export default function Home() {
  return (
    <div className="w-full space-y-8">
      {/* Hero / Introduction */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent-cyan/5 pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/20">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
              Welcome to <span className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">Ravikisan&apos;s Platform</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              Interactive 3D visualisations for NEB Class 11 &amp; 12 science. Explore concepts in Math, Chemistry, Physics and Biology with animated simulations.
            </p>
          </div>
          <Link
            href="/subjects"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity shrink-0"
          >
            Explore Subjects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Quick access cards */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Quick Access
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { href: "/subjects", label: "Subjects", icon: BookOpen, color: "from-blue-500/10 to-cyan-500/10 border-blue-500/20" },
            { href: "/chat", label: "AI Tutor", icon: Sparkles, color: "from-violet-500/10 to-purple-500/10 border-violet-500/20" },
            { href: "/levels", label: "Curriculum", icon: GraduationCap, color: "from-amber-500/10 to-orange-500/10 border-amber-500/20" },
            { href: "/syllabus", label: "Syllabus", icon: BookOpen, color: "from-emerald-500/10 to-teal-500/10 border-emerald-500/20" },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className={`group flex flex-col items-center gap-2 rounded-xl border ${card.color} bg-gradient-to-br p-4 text-center hover:scale-[1.02] transition-transform`}
              >
                <Icon className="h-6 w-6 text-foreground" />
                <span className="text-sm font-semibold text-foreground">{card.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Science Lab */}
      <ScienceLabSection />
    </div>
  );
}
