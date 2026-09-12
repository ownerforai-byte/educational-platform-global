"use client";

import React, { useState } from "react";
import { TopicMindMap } from "@/components/lab/topic-mindmap";
import { Workflow, BookOpen, Layers, Atom, Sparkles } from "lucide-react";

const SUBJECTS = [
  { slug: "physics", name: "Physics", topic: "Newtonian Mechanics, Work & Orbital Dynamics", unit: "Mechanics" },
  { slug: "chemistry", name: "Chemistry", topic: "Atomic Structure, Bonding & Chemical Equilibrium", unit: "Physical Chemistry" },
  { slug: "biology", name: "Biology", topic: "Cellular Ultrastructure, Metabolism & Genetics", unit: "Cell Biology" },
  { slug: "mathematics", name: "Mathematics", topic: "Calculus, Differential Theorems & 3D Vectors", unit: "Calculus" },
];

export default function MindMapHubPage() {
  const [activeSubject, setActiveSubject] = useState(SUBJECTS[0]);

  return (
    <div className="mx-auto max-w-7xl py-6 md:py-10 px-3 sm:px-6 space-y-8">
      {/* Hero Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              Interactive Blueprint Architecture
            </span>
            <span className="text-xs text-muted-foreground font-mono">NEB &bull; CEE &bull; IOE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight mt-1">
            Visual Science Mindmaps
          </h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Explore isolated concept pathways on a high-contrast dark blueprint canvas. Distinct colors separate fundamentals, governing laws, laboratory observations, exam traps, and real-world mechanisms so branches are never confusable.
          </p>
        </div>

        {/* Subject Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {SUBJECTS.map((s) => {
            const isActive = activeSubject.slug === s.slug;
            return (
              <button
                key={s.slug}
                onClick={() => setActiveSubject(s)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md scale-105"
                    : "bg-card border border-border/70 text-muted-foreground hover:text-foreground hover:bg-muted/40"
                }`}
              >
                {s.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Mindmap Workspace */}
      <TopicMindMap
        subjectSlug={activeSubject.slug}
        topicSlug={activeSubject.slug}
        topicTitle={activeSubject.topic}
        unitId={activeSubject.unit}
      />
    </div>
  );
}
