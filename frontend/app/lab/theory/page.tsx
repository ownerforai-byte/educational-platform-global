"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { LAB_REGISTRY } from "@/lib/lab-registry";
import type { LabMeta } from "@/lib/lab-registry";

type LabCategory = "physics" | "chemistry" | "mathematics" | "biology";

const SUBJECT_CONFIG: Record<LabCategory, { label: string; color: string; emoji: string }> = {
  physics: { label: "Physics", color: "#3b82f6", emoji: "⚛️" },
  chemistry: { label: "Chemistry", color: "#10b981", emoji: "🧪" },
  mathematics: { label: "Mathematics", color: "#8b5cf6", emoji: "🔢" },
  biology: { label: "Biology", color: "#22c55e", emoji: "🧬" },
};

export default function LabTheoryPage() {
  const [activeSubject, setActiveSubject] = useState<LabCategory>("physics");
  const [searchQuery, setSearchQuery] = useState("");

  const theoryLabs = useMemo(() => LAB_REGISTRY.filter((lab) => lab.id.includes("th-")), []);

  const filteredLabs = useMemo(() => {
    let labs = theoryLabs.filter((lab) => lab.category === activeSubject);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      labs = theoryLabs.filter(l => l.title.toLowerCase().includes(q) || l.description.toLowerCase().includes(q));
    }
    return labs;
  }, [activeSubject, searchQuery, theoryLabs]);

  const availableSubjects = (Object.keys(SUBJECT_CONFIG) as LabCategory[]).filter(
    (s) => LAB_REGISTRY.some(l => l.category === s && l.id.includes("th-"))
  );

  return (
    <div className="mx-auto max-w-6xl space-y-6 py-8 md:py-14 px-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Theory Lab</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Structured theory explanations with worked examples for all subjects.
        </p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {availableSubjects.map((subject) => {
          const cfg = SUBJECT_CONFIG[subject];
          const count = LAB_REGISTRY.filter(l => l.category === subject && l.id.includes("th-")).length;
          const isActive = activeSubject === subject;
          return (
            <button
              key={subject}
              onClick={() => setActiveSubject(subject)}
              className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "shadow-md elev-2 ring-2"
                  : "bg-muted text-muted-foreground hover:elev-1"
              }`}
              style={isActive ? { backgroundColor: cfg.color, color: "#fff", borderColor: cfg.color } : undefined}
            >
              <span>{cfg.emoji}</span>
              {cfg.label}
              <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-md ${isActive ? 'bg-white/20' : 'bg-muted-foreground/20'}`}>{count}</span>
            </button>
          );
        })}
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredLabs.map((lab) => (
          <LabCard key={lab.id} lab={lab} />
        ))}
      </div>

      {filteredLabs.length === 0 && (
        <div className="py-16 text-center text-muted-foreground">
          <p className="text-sm">No theory topics found for {SUBJECT_CONFIG[activeSubject].label}.</p>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <span className="stat-pill">
          <span className="text-muted-foreground">Total theory topics:</span>
          <span className="stat-pill-value">{theoryLabs.length}</span>
        </span>
        {availableSubjects.map((s) => {
          const c = SUBJECT_CONFIG[s];
          const n = LAB_REGISTRY.filter(l => l.category === s && l.id.includes("th-")).length;
          if (n === 0) return null;
          return (
            <span key={s} className="stat-pill">
              <span className="text-muted-foreground">{c.label}:</span>
              <span className="stat-pill-value" style={{ color: c.color }}>{n}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

function LabCard({ lab }: { lab: LabMeta }) {
  const cfg = SUBJECT_CONFIG[lab.category as LabCategory] ?? { label: "Lab", color: "#64748b", emoji: "📖" };
  const statusColor = lab.status === "new" ? "text-blue-600 dark:text-blue-400" :
    lab.status === "premium" ? "text-amber-600 dark:text-amber-400" :
    lab.status === "development" ? "text-purple-600 dark:text-purple-400" :
    "text-emerald-600 dark:text-emerald-400";
  const statusBg = lab.status === "new" ? "bg-blue-500/10" :
    lab.status === "premium" ? "bg-amber-500/10" :
    lab.status === "development" ? "bg-purple-500/10" :
    "bg-emerald-500/10";

  return (
    <Link href={`/lab/${lab.id}`} className="block group">
      <div className="elev-2 rounded-2xl border border-border overflow-hidden bg-card hover:border-primary/50 transition-all duration-[200ms] hover:elev-2 h-full flex flex-col">
        <div className="p-4 flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg" style={{ backgroundColor: `${cfg.color}18`, color: cfg.color }}>
            {cfg.emoji}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">{lab.title}</h3>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{lab.description}</p>
          </div>
        </div>
        <div className="px-4 py-2.5 border-t border-border/50 flex items-center justify-between">
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ color: cfg.color, borderColor: `${cfg.color}40`, backgroundColor: `${cfg.color}10` }}>
            {cfg.label}
          </span>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusBg} ${statusColor}`}>
            {lab.status === "new" ? "New" : lab.status === "premium" ? "Premium" : lab.status === "development" ? "Dev" : "Active"}
          </span>
        </div>
      </div>
    </Link>
  );
}
