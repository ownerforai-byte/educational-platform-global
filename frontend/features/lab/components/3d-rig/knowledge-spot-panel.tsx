"use client";

import React, { useEffect, useState } from "react";
import { Html } from "@react-three/drei";
import { MathMarkdown } from "@/components/content/math-markdown";
import { cn } from "@/lib/utils";
import type { ConceptData, ConceptFieldKey } from "./types";

// Pure presentational component - no drei/Canvas dependencies
// Can be rendered both inside and outside <Canvas>
type KnowledgeSpotPanelContentProps = {
  conceptData: ConceptData | null;
  fieldKeys: ConceptFieldKey[];
  title: string;
  onClose: () => void;
};

export function KnowledgeSpotPanelContent({
  conceptData,
  fieldKeys,
  title,
  onClose,
}: KnowledgeSpotPanelContentProps) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!conceptData || !isOpen) return null;

  const renderField = (key: ConceptFieldKey) => {
    const items = conceptData[key];
    if (!items?.length) {
      return <div className="text-[11px] italic text-muted-foreground">Empty — populate {key}</div>;
    }
    return items.map((item, i) => (
      <div key={i} className="text-[12px]">
        <MathMarkdown content={item} />
      </div>
    ));
  };

  const coreFields: ConceptFieldKey[] = ["formulas", "keyPoints", "confusion", "examShortTricks"];
  const contextualFields = fieldKeys.filter(k => !coreFields.includes(k));

  return (
    <div className={cn(
      "w-[280px] rounded-xl border bg-white/95 p-3 shadow-lg backdrop-blur-md transition-all duration-200",
      "dark:bg-slate-900/95 dark:border-slate-700",
      isOpen ? "" : "opacity-0 pointer-events-none"
    )}>
      <div className="mb-3 flex items-center justify-between border-b border-border/40 pb-2.5">
        <h3 className="text-[13px] font-bold text-foreground">{title}</h3>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Close knowledge panel"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Core</div>
          <div className="space-y-1">
            {coreFields.map(key => (
              <div key={key} className="mb-1">
                <div className="text-[10px] font-medium text-muted-foreground mb-0.5">{key}</div>
                {renderField(key)}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Contextual</div>
          <div className="space-y-1">
            {contextualFields.map(key => (
              <div key={key} className="mb-1">
                <div className="text-[10px] font-medium text-muted-foreground mb-0.5">{key}</div>
                {renderField(key)}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-2.5 border-t border-border/40 pt-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground">
            {Object.keys(conceptData).length} fields available
          </span>
          <span className="text-[10px] font-medium text-primary">Esc to close</span>
        </div>
      </div>
    </div>
  );
}

// Wrapper component for use inside <Canvas>
// Provides Html overlay positioning for 3D world
type KnowledgeSpotPanelProps = {
  conceptData: ConceptData | null;
  fieldKeys: ConceptFieldKey[];
  title: string;
  onClose: () => void;
};

export function KnowledgeSpotPanel({ conceptData, fieldKeys, title, onClose }: KnowledgeSpotPanelProps) {
  return (
    <Html position={[0, 0, 0]} style={{ pointerEvents: "auto" }}>
      <div style={{ width: "100%", maxWidth: "280px" }}>
        <KnowledgeSpotPanelContent
          conceptData={conceptData}
          fieldKeys={fieldKeys}
          title={title}
          onClose={onClose}
        />
      </div>
    </Html>
  );
}

export default KnowledgeSpotPanel;
