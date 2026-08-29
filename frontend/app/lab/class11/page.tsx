"use client";

import { useState } from "react";
import Link from "next/link";
import { Cuboid, BookOpen, Calculator } from "lucide-react";

const LABS = [
  {
    "id": "class11-physics",
    "title": "Class 11 Physics 3D Plus",
    "description": "Extended 3D physics.",
    "type": "3d",
    "status": "new",
    "color": "#f43f5e",
    "unit": "Class 11 Physics"
  },
  {
    "id": "class11-chemistry",
    "title": "Class 11 Chemistry 3D Plus",
    "description": "Extended 3D chemistry.",
    "type": "3d",
    "status": "new",
    "color": "#f43f5e",
    "unit": "Class 11 Chemistry"
  },
  {
    "id": "class11-math",
    "title": "Class 11 Math 3D Plus",
    "description": "Extended 3D math.",
    "type": "3d",
    "status": "new",
    "color": "#f43f5e",
    "unit": "Class 11 Math"
  },
  {
    "id": "class11-biology",
    "title": "Class 11 Biology 3D Plus",
    "description": "Extended 3D biology.",
    "type": "3d",
    "status": "new",
    "color": "#f43f5e",
    "unit": "Class 11 Biology"
  }
];

type Tab = "3d" | "theory" | "calculator";

export default function Class11LabPage() {
  const [activeTab, setActiveTab] = useState<Tab>("3d");
  const filtered = LABS.filter((l) =>
    activeTab === "3d" ? l.type === "3d" : activeTab === "theory" ? l.type === "theory" : l.type === "calculator"
  );

  return (
    <div className="mx-auto max-w-6xl space-y-6 py-8 md:py-14 px-4">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md" style={{ backgroundColor: "#f43f5e20" }}>
            <Cuboid className="h-5 w-5 text-rose-600" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Class 11 Lab 3D</h1>
            <p className="text-sm text-muted-foreground">4 interactive labs · Syllabus-aligned</p>
          </div>
        </div>
        <Link href="/lab" className="text-xs text-muted-foreground hover:text-primary inline-flex items-center gap-1 mt-2">
          ← Back to all labs
        </Link>
      </div>

      <div className="flex gap-2 p-1 bg-muted rounded-xl w-fit">
        {(["3d", "theory", "calculator"] as const).map((t) => {
          const count = LABS.filter((l) => (t === "3d" ? l.type === "3d" : t === "theory" ? l.type === "theory" : l.type === "calculator")).length;
          const isActive = activeTab === t;
          return (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
              {t === "3d" && <Cuboid className="h-4 w-4" />}
              {t === "theory" && <BookOpen className="h-4 w-4" />}
              {t === "calculator" && <Calculator className="h-4 w-4" />}
              <span className="capitalize">{t}</span>
              <span className="text-xs opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((lab) => (
          <Link key={lab.id} href={`/lab/${lab.id}`} className="block group">
            <div className="elev-1 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-200 hover:elev-2 p-4 h-full flex flex-col">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "${lab.color}18" }}>
                  {lab.type === "3d" && <Cuboid className="h-4 w-4" style={{ color: lab.color }} />}
                  {lab.type === "theory" && <BookOpen className="h-4 w-4" style={{ color: lab.color }} />}
                  {lab.type === "calculator" && <Calculator className="h-4 w-4" style={{ color: lab.color }} />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate">{lab.title}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">{lab.description}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ borderColor: "${lab.color}40", color: lab.color, backgroundColor: "${lab.color}10" }}>{lab.unit ?? lab.type}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${lab.status === "premium" ? "bg-amber-100 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400" : lab.status === "new" ? "bg-blue-100 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400"}`}>
                  {lab.status === "premium" ? "Premium" : lab.status === "new" ? "New" : lab.status === "development" ? "Dev" : "Active"}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center text-muted-foreground">
          <p className="text-sm">No {activeTab} labs found for Class 11.</p>
        </div>
      )}
    </div>
  );
}
