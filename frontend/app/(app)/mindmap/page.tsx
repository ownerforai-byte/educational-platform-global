"use client";

import React, { useState } from "react";
import { TopicMindMap } from "@/components/lab/topic-mindmap";
import { SYLLABUS } from "@/lib/core/syllabus";
import {
  Atom, FlaskConical, Leaf, Sigma, BookOpen, Globe,
  ChevronRight, Layers, Sparkles, BarChart3, Search,
} from "lucide-react";

// ─── Subject config ───────────────────────────────────────────────────────────
const SUBJECTS = [
  {
    slug: "physics",
    name: "Physics",
    emoji: "⚛️",
    icon: Atom,
    color: "#3b82f6",
    glow: "rgba(59,130,246,0.35)",
    bg: "from-blue-900/40 to-blue-950/60",
    border: "border-blue-500/30",
    tag: "Mechanics · Waves · Modern",
  },
  {
    slug: "chemistry",
    name: "Chemistry",
    emoji: "🧪",
    icon: FlaskConical,
    color: "#10b981",
    glow: "rgba(16,185,129,0.35)",
    bg: "from-emerald-900/40 to-emerald-950/60",
    border: "border-emerald-500/30",
    tag: "Organic · Inorganic · Physical",
  },
  {
    slug: "biology",
    name: "Biology",
    emoji: "🌿",
    icon: Leaf,
    color: "#22c55e",
    glow: "rgba(34,197,94,0.35)",
    bg: "from-green-900/40 to-green-950/60",
    border: "border-green-500/30",
    tag: "Cell · Genetics · Ecology",
  },
  {
    slug: "mathematics",
    name: "Mathematics",
    emoji: "∑",
    icon: Sigma,
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.35)",
    bg: "from-amber-900/40 to-amber-950/60",
    border: "border-amber-500/30",
    tag: "Calculus · Algebra · Geometry",
  },
  {
    slug: "english",
    name: "English",
    emoji: "📖",
    icon: BookOpen,
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.35)",
    bg: "from-violet-900/40 to-violet-950/60",
    border: "border-violet-500/30",
    tag: "Grammar · Writing · Literature",
  },
  {
    slug: "nepali",
    name: "Nepali",
    emoji: "🇳🇵",
    icon: Globe,
    color: "#f43f5e",
    glow: "rgba(244,63,94,0.35)",
    bg: "from-rose-900/40 to-rose-950/60",
    border: "border-rose-500/30",
    tag: "Byakaran · Kavita · Nibandha",
  },
];

interface UnitOption { id: string; title: string }

function unitsForSubject(subjectSlug: string): UnitOption[] {
  const seen = new Map<string, string>();
  for (const cls of SYLLABUS) {
    const subj = cls.subjects.find((x) => x.slug === subjectSlug);
    if (!subj) continue;
    for (const u of subj.units) {
      if (!seen.has(u.id)) seen.set(u.id, u.title);
    }
  }
  return [...seen].map(([id, title]) => ({ id, title }));
}

const UNITS: Record<string, UnitOption[]> = Object.fromEntries(
  SUBJECTS.map((s) => [s.slug, unitsForSubject(s.slug)]),
);

// ─── Stats bar helper ─────────────────────────────────────────────────────────
function StatPill({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: string | number; color: string }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-slate-700/60 bg-slate-900/70 px-4 py-2.5">
      <div className="flex h-8 w-8 items-center justify-center rounded-xl" style={{ backgroundColor: `${color}20` }}>
        <Icon className="h-4 w-4" style={{ color }} />
      </div>
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{label}</p>
        <p className="text-sm font-extrabold text-white">{value}</p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function MindMapHubPage() {
  const [activeSubject, setActiveSubject] = useState(SUBJECTS[0]);
  const [activeUnitId, setActiveUnitId] = useState<string | null>(null);
  const [unitSearch, setUnitSearch] = useState("");

  const subjectUnits = UNITS[activeSubject.slug] ?? [];
  const filteredUnits = unitSearch.trim()
    ? subjectUnits.filter((u) => u.title.toLowerCase().includes(unitSearch.toLowerCase()))
    : subjectUnits;
  const activeUnit = subjectUnits.find((u) => u.id === activeUnitId) ?? subjectUnits[0];

  const totalUnits = SUBJECTS.reduce((n, s) => n + (UNITS[s.slug]?.length ?? 0), 0);

  return (
    <div className="min-h-screen bg-[#060a13] text-slate-100">

      {/* ── Hero header ─────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden border-b border-slate-800/80 bg-gradient-to-br from-[#0a0f1e] via-[#080d1a] to-[#060a13]">
        {/* ambient glow blobs */}
        <div className="pointer-events-none absolute -top-32 left-1/4 h-80 w-80 rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="pointer-events-none absolute -top-16 right-1/3 h-60 w-60 rounded-full bg-violet-600/8 blur-[100px]" />

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-14">
          {/* badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-widest text-blue-400">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            Visual Blueprint Architecture · NEB / CEE / IOE
          </div>

          <h1 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
            <span className="text-white">Visual</span>{" "}
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Mind Maps
            </span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
            Every NEB syllabus unit has its own branch tree — laws, formulas, derivations and CEE
            traps — so no two units look the same. Pick a subject, pick a unit, explore the tree.
          </p>

          {/* stats row */}
          <div className="mt-6 flex flex-wrap gap-3">
            <StatPill icon={BarChart3} label="Total units" value={totalUnits} color="#3b82f6" />
            <StatPill icon={Layers} label="Subjects" value={SUBJECTS.length} color="#10b981" />
            <StatPill icon={Sparkles} label="Mode" value="Interactive KaTeX" color="#f59e0b" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-8">

        {/* ── Subject selector cards ─────────────────────────────────── */}
        <section>
          <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Choose a subject
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {SUBJECTS.map((s) => {
              const isActive = activeSubject.slug === s.slug;
              const Icon = s.icon;
              const units = UNITS[s.slug] ?? [];
              return (
                <button
                  key={s.slug}
                  onClick={() => { setActiveSubject(s); setActiveUnitId(null); setUnitSearch(""); }}
                  className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-200 ${
                    isActive
                      ? `${s.border} bg-gradient-to-br ${s.bg} ring-1`
                      : "border-slate-800/60 bg-slate-900/50 hover:border-slate-700"
                  }`}
                  style={isActive ? { boxShadow: `0 0 24px ${s.glow}` } : undefined}
                >
                  {/* glow blob on active */}
                  {isActive && (
                    <div
                      className="pointer-events-none absolute -right-4 -top-4 h-20 w-20 rounded-full blur-2xl"
                      style={{ backgroundColor: s.glow }}
                    />
                  )}
                  <div
                    className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${s.color}22`, border: `1px solid ${s.color}40` }}
                  >
                    <Icon className="h-4.5 w-4.5" style={{ color: s.color }} />
                  </div>
                  <p className="text-xs font-extrabold text-white">{s.name}</p>
                  <p className="mt-0.5 text-[9px] text-slate-500">{units.length} units</p>
                  <p className="mt-1 text-[9px] font-medium" style={{ color: s.color }}>
                    {s.tag}
                  </p>
                  {isActive && (
                    <div
                      className="absolute bottom-0 left-0 h-0.5 w-full rounded-full"
                      style={{ backgroundColor: s.color }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* ── Unit picker ────────────────────────────────────────────── */}
        <section>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              {activeSubject.name} — {subjectUnits.length} units
            </p>
            {/* unit search */}
            <div className="relative">
              <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-500" />
              <input
                value={unitSearch}
                onChange={(e) => setUnitSearch(e.target.value)}
                placeholder="Filter units…"
                className="h-8 rounded-xl border border-slate-700/70 bg-slate-900 pl-8 pr-3 text-xs text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-slate-500 w-48"
              />
            </div>
          </div>

          {/* Scrollable unit strip */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-700">
            {filteredUnits.map((u, i) => {
              const isActive = activeUnit?.id === u.id;
              return (
                <button
                  key={u.id}
                  onClick={() => setActiveUnitId(u.id)}
                  title={u.title}
                  className={`flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-2 text-[11px] font-semibold whitespace-nowrap max-w-[220px] transition-all duration-150 ${
                    isActive
                      ? "text-white ring-1"
                      : "border border-slate-800 bg-slate-900/70 text-slate-400 hover:text-slate-200 hover:border-slate-600"
                  }`}
                  style={isActive ? {
                    backgroundColor: `${activeSubject.color}18`,
                    border: `1px solid ${activeSubject.color}60`,
                    boxShadow: `0 0 10px ${activeSubject.glow}`,
                    color: activeSubject.color,
                  } : undefined}
                >
                  <span
                    className="flex h-4 w-4 shrink-0 items-center justify-center rounded-md text-[8px] font-black"
                    style={isActive
                      ? { backgroundColor: `${activeSubject.color}30`, color: activeSubject.color }
                      : { backgroundColor: "rgba(148,163,184,0.1)", color: "#64748b" }}
                  >
                    {i + 1}
                  </span>
                  <span className="truncate">{u.title}</span>
                  {isActive && <ChevronRight className="h-3 w-3 shrink-0 opacity-70" />}
                </button>
              );
            })}
            {filteredUnits.length === 0 && (
              <p className="py-2 text-xs text-slate-600 italic">No units match "{unitSearch}"</p>
            )}
          </div>
        </section>

        {/* ── Active unit info bar ────────────────────────────────────── */}
        {activeUnit && (
          <div
            className="flex flex-wrap items-center gap-3 rounded-2xl border px-4 py-3"
            style={{ borderColor: `${activeSubject.color}30`, backgroundColor: `${activeSubject.color}08` }}
          >
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-lg"
              style={{ backgroundColor: `${activeSubject.color}18` }}
            >
              {activeSubject.emoji}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: activeSubject.color }}>
                {activeSubject.name} · {subjectUnits.findIndex((u) => u.id === activeUnit.id) + 1} of {subjectUnits.length}
              </p>
              <p className="truncate text-sm font-extrabold text-white">{activeUnit.title}</p>
            </div>
            <span
              className="rounded-full px-2.5 py-1 text-[10px] font-bold"
              style={{ backgroundColor: `${activeSubject.color}20`, color: activeSubject.color }}
            >
              Interactive tree
            </span>
          </div>
        )}

        {/* ── Main mindmap workspace ──────────────────────────────────── */}
        {activeUnit && (
          <TopicMindMap
            key={`${activeSubject.slug}:${activeUnit.id}`}
            subjectSlug={activeSubject.slug}
            topicSlug={activeUnit.id}
            topicTitle={activeUnit.title}
            unitId={activeUnit.id}
            accentColor={activeSubject.color}
          />
        )}

      </div>
    </div>
  );
}
