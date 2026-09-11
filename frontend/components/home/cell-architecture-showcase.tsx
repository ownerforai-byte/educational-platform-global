"use client";

import { Microscope, ArrowRight, Sparkles, Gamepad2, Grid3X3, BookOpen, Library, Trophy } from "lucide-react";
import Link from "next/link";

const features = [
  { label: "Plant Cell", desc: "Chloroplasts, nucleus, wall", href: "/lab/biology" },
  { label: "White Blood Cell", desc: "Immune defense & phagocytosis", href: "/lab/biology" },
  { label: "Neuron", desc: "Axons, dendrites & signaling", href: "/lab/biology" },
  { label: "Muscle Cell", desc: "Myofibrils & contraction", href: "/lab/biology" },
];

const studioFeatures = [
  { label: "Gallery", icon: Grid3X3, desc: "Browse 7 interactive specimens" },
  { label: "Quiz Mode", icon: Gamepad2, desc: "Flashcards & mastery tracking" },
  { label: "AI Tutor", icon: Sparkles, desc: "Guided organelle exploration" },
  { label: "Study Library", icon: Library, desc: "Favorites, notebooks & achievements" },
];

export function CellArchitectureShowcase() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Microscope className="h-5 w-5 text-rose-500" />
          Cell Architecture Studio
        </h2>
        <Link
          href="/lab/biology"
          className="inline-flex items-center gap-1 text-xs font-semibold text-rose-500 hover:text-rose-600 hover:underline"
        >
          Open Studio <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {/* Specimen previews */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {features.map((f) => (
          <Link
            key={f.label}
            href={f.href}
            className="group flex flex-col items-center gap-2 rounded-xl border border-rose-500/20 bg-gradient-to-br from-rose-500/10 to-orange-500/10 p-4 text-center hover:scale-[1.02] hover:border-rose-500/30 transition-all"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500 group-hover:scale-110 transition-transform">
              <Microscope className="h-5 w-5" />
            </div>
            <span className="text-sm font-semibold text-foreground">{f.label}</span>
            <span className="text-xs text-muted-foreground leading-tight">{f.desc}</span>
          </Link>
        ))}
      </div>

      {/* Feature highlights from the cloned studio */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {studioFeatures.map((feat) => {
          const Icon = feat.icon;
          return (
            <div
              key={feat.label}
              className="flex flex-col items-center gap-2 rounded-xl border border-muted/20 bg-card p-4 text-center"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-500/10 text-rose-500">
                <Icon className="h-4 w-4" />
              </div>
              <span className="text-xs font-semibold text-foreground">{feat.label}</span>
              <span className="text-[11px] text-muted-foreground leading-tight">{feat.desc}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
