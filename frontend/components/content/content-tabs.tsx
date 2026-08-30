"use client";

import { useState } from "react";
import { ImportedNotesSection } from "./imported-notes-section";
import { EmptyState } from "./empty-state";
import { getTopicPath, getUnitPath } from "@/features/syllabus/content-router";
import { getTopicEntryBySlug, getUnitSyllabus } from "@/lib/syllabus";
import type { SyllabusUnit } from "@/lib/syllabus";

type ContentTabsProps = {
  classSlug: string;
  subjectSlug: string;
  unitId: string;
  topicSlug: string;
  unit?: SyllabusUnit;
};

export function ContentTabs({
  classSlug,
  subjectSlug,
  unitId,
  topicSlug,
  unit,
}: ContentTabsProps) {
  const [activeTab, setActiveTab] = useState<"notes" | "formulas" | "numericals">("notes");

  const topicTitle = unit
    ? getTopicEntryBySlug(unit, topicSlug)?.title ?? topicSlug
    : topicSlug;

  const topicPath = getTopicPath(classSlug, subjectSlug, unitId, topicSlug);
  const unitPath = getUnitPath(classSlug, subjectSlug, unitId);

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex gap-1 border-b border-border">
        {(["notes", "formulas", "numericals"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[200px]">
        {activeTab === "notes" && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Notes</h3>
            <ImportedNotesSection
              subject={subjectSlug}
              unitId={unitId}
              topicTitle={topicTitle}
              target={classSlug as any}
            />
          </div>
        )}

        {activeTab === "formulas" && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Formulas</h3>
            <EmptyState
              title="Coming soon"
              description={`Formula sheets for ${topicTitle} will be available here.`}
            />
          </div>
        )}

        {activeTab === "numericals" && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Numericals</h3>
            <EmptyState
              title="Coming soon"
              description={`Practice problems for ${topicTitle} will be available here.`}
            />
          </div>
        )}
      </div>

      {/* Source Info */}
      <p className="text-xs text-muted-foreground font-mono">
        Source: {topicPath}
      </p>
    </div>
  );
}
