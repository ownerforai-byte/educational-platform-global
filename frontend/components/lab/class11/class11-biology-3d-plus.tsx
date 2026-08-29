"use client";

import { useState } from "react";
import { Dna, Microscope, Leaf, Heart, TreeDeciduous, Users } from "lucide-react";

export function Class11Biology3DPlus() {
  const [activeTopic, setActiveTopic] = useState("cell");

  const topics = [
    { id: "cell", label: "Cell Biology", icon: Microscope, color: "text-green-600", bg: "bg-green-500/10" },
    { id: "genetics", label: "Genetics", icon: Dna, color: "text-emerald-600", bg: "bg-emerald-500/10" },
    { id: "ecology", label: "Ecology", icon: TreeDeciduous, color: "text-lime-600", bg: "bg-lime-500/10" },
    { id: "human", label: "Human Physiology", icon: Heart, color: "text-rose-600", bg: "bg-rose-500/10" },
    { id: "evolution", label: "Evolution", icon: Users, color: "text-amber-600", bg: "bg-amber-500/10" },
  ];

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex items-center gap-3 pb-3 border-b border-border">
        <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
          <Microscope className="h-5 w-5 text-green-600" />
        </div>
        <div>
          <h2 className="font-semibold text-base">Class 11 Biology 3D+</h2>
          <p className="text-xs text-muted-foreground">Complete NEB Class 11 biology syllabus visualizations</p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {topics.map((t) => {
          const Icon = t.icon;
          const isActive = activeTopic === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTopic(t.id)}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive ? `${t.bg} ${t.color} ring-1 ring-current` : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <Icon className="h-4 w-4" />
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="flex-1 flex items-center justify-center min-h-[300px] rounded-xl bg-muted/30 border border-border/50 dot-pattern">
        <div className="text-center space-y-3">
          <div className={`w-20 h-20 mx-auto rounded-full ${topics.find(t => t.id === activeTopic)?.bg ?? "bg-muted"} border-2 flex items-center justify-center`}>
            {(() => {
              const t = topics.find(t => t.id === activeTopic)!;
              const Icon = t.icon;
              return <Icon className={`h-10 w-10 ${t.color}`} />;
            })()}
          </div>
          <div>
            <p className="font-semibold text-foreground text-lg">{topics.find(t => t.id === activeTopic)?.label}</p>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
              Interactive 3D visualization for NEB Class 11 Biology — {topics.find(t => t.id === activeTopic)?.label.toLowerCase()}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
