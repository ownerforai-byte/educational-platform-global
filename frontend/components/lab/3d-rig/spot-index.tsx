"use client";

import React, { useMemo, useCallback } from "react";
import { cn } from "@/lib/utils";
import type { KnowledgeHotspotDef, ConceptFieldKey } from "./types";

type SpotIndexProps = {
  hotspots: KnowledgeHotspotDef[];
  onFocus: (id: string) => void;
  onCameraFocus?: (position: [number, number, number]) => void;
  activeId?: string;
};

type FieldCategory = {
  label: string;
  keys: ConceptFieldKey[];
  icon: React.ReactNode;
  color: string;
};

const FIELD_CATEGORIES: FieldCategory[] = [
  {
    label: "Core",
    keys: ["formulas", "keyPoints", "confusion", "examShortTricks"],
    icon: <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3a2 2 0 002 2v4m0 0H9m3 0h6m-6 0V5a2 2 0 012-2h4" /></svg>,
    color: "text-primary",
  },
  {
    label: "Practice",
    keys: ["numericals", "practiceQuestions", "practice", "examples"],
    icon: <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
    color: "text-secondary",
  },
  {
    label: "Notes",
    keys: ["specialNotes", "importantNotes", "importantConcepts", "importantStatements", "importantTasks", "summary"],
    icon: <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    color: "text-accent",
  },
  {
    label: "Extras",
    keys: ["universalFacts", "related", "bounds", "examNotes", "mcs"],
    icon: <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    color: "text-muted",
  },
];

function getCategoryForField(key: ConceptFieldKey): FieldCategory {
  return FIELD_CATEGORIES.find((cat) => cat.keys.includes(key)) ?? FIELD_CATEGORIES[3];
}

function HotspotItem({ hotspot, isActive, onFocus, onCameraFocus }: { hotspot: KnowledgeHotspotDef; isActive: boolean; onFocus: (id: string) => void; onCameraFocus?: (position: [number, number, number]) => void }) {
  const position = hotspot.position;
  const handleClick = useCallback(() => {
    onFocus(hotspot.id);
    onCameraFocus?.(position);
  }, [onFocus, onCameraFocus, hotspot.id, position]);

  return (
    <button type="button" onClick={handleClick} className={cn("group flex w-full items-center gap-2 rounded-lg border p-2 transition-all text-left hover:bg-muted/50 hover:border-primary/40", isActive ? "border-primary bg-primary/5 ring-1 ring-primary/30" : "border-border/60 bg-muted/20")}>
      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white" style={{ backgroundColor: hotspot.iconColor ?? "#3b82f6" }}>{hotspot.position[0].toFixed(1)}</div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[11px] font-medium">{hotspot.label}</div>
        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground"><span>({hotspot.position[0].toFixed(1)}, {hotspot.position[1].toFixed(1)})</span><span className="text-muted-foreground/40">·</span><span>{hotspot.fieldKeys.length} fields</span></div>
      </div>
      {isActive && <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">✓</div>}
    </button>
  );
}

export function SpotIndex({ hotspots, onFocus, onCameraFocus, activeId }: SpotIndexProps) {
  const grouped = useMemo(() => {
    const map = new Map<string, KnowledgeHotspotDef[]>();
    for (const cat of FIELD_CATEGORIES) map.set(cat.label, []);
    for (const h of hotspots) {
      const cat = getCategoryForField(h.fieldKeys[0]);
      const list = map.get(cat.label) ?? [];
      list.push(h);
      map.set(cat.label, list);
    }
    return map;
  }, [hotspots]);

  return (
    <div className="flex flex-col gap-1">
      <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-lg bg-background/90 px-3 py-2 backdrop-blur border-b border-border/40">
        <span className="text-[11px] font-bold uppercase tracking-wider">Knowledge Spots</span>
        <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium">{hotspots.length}</span>
      </div>
      {FIELD_CATEGORIES.map((cat) => {
        const items = grouped.get(cat.label) ?? [];
        if (items.length === 0) return null;
        return (
          <div key={cat.label} className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              <span className={cat.color}>{cat.icon}</span>{cat.label}
              <span className="ml-auto rounded-full bg-muted/50 px-1 py-0 text-[9px]">{items.length}</span>
            </div>
            {items.map((hotspot) => <HotspotItem key={hotspot.id} hotspot={hotspot} isActive={activeId === hotspot.id} onFocus={onFocus} onCameraFocus={onCameraFocus} />)}
          </div>
        );
      })}
      {hotspots.length === 0 && <div className="flex items-center justify-center py-6 text-[11px] text-muted-foreground">No knowledge hotspots</div>}
    </div>
  );
}

export default SpotIndex;
