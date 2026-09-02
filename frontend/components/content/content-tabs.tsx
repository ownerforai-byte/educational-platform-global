"use client";

import { useState } from "react";
import { RavikishanTopicResources } from "./ravikishan-topic-resources";
import { EmptyState } from "./empty-state";
import { AnalyticalGeometryResources } from "./analytical-geometry-resources";
import { LimitsContinuityResources } from "./limits-continuity-resources";
import { LogicSetsResources } from "./logic-sets-resources";
import { FunctionsResources } from "./functions-resources";
import { CurveSketchingResources } from "./curve-sketching-resources";
import { SequenceSeriesResources } from "./sequence-series-resources";
import { MatricesDeterminantsResources } from "./matrices-determinants-resources";
import { QuadraticEquationResources } from "./quadratic-equation-resources";
import { ComplexNumberResources } from "./complex-number-resources";
import { DifferentiationResources } from "./differentiation-resources";
import { ApplicationDerivativesResources } from "./application-derivatives-resources";
import { AntiderivativesResources } from "./antiderivatives-resources";
import { NumericalIntegrationResources } from "./numerical-integration-resources";
import { TrigonometryResources } from "./trigonometry-resources";
import { VectorsResources } from "./vectors-resources";
import { StatisticsProbabilityResources } from "./statistics-probability-resources";
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
  const [activeTab, setActiveTab] = useState<"notes" | "formulas" | "numericals" | "resources">("notes");

  // --- Class 11 Mathematics unit-level conditions ---
  const isAnalyticGeometry =
    unitId === "analytic-geometry" && subjectSlug === "mathematics";
  const isLimitsContinuity =
    unitId === "limits-and-continuity" && subjectSlug === "mathematics";
  const isDifferentiation =
    unitId === "differentiation" && subjectSlug === "mathematics";

  // --- Class 11 Algebra topic-level conditions ---
  const isLogicSets =
    unitId === "algebra" && subjectSlug === "mathematics" && topicSlug?.includes("logic");
  const isFunctions =
    unitId === "algebra" && subjectSlug === "mathematics" && topicSlug?.includes("function");
  const isCurveSketching =
    unitId === "algebra" && subjectSlug === "mathematics" && topicSlug?.includes("curve");
  const isSequenceSeries =
    unitId === "algebra" && subjectSlug === "mathematics" && topicSlug?.includes("sequence");
  const isMatricesDeterminants =
    unitId === "algebra" && subjectSlug === "mathematics" && topicSlug?.includes("matrice");
  const isQuadratic =
    unitId === "algebra" && subjectSlug === "mathematics" && topicSlug?.includes("quadratic");
  const isComplex =
    unitId === "algebra" && subjectSlug === "mathematics" && topicSlug?.includes("complex");

  // --- Class 11 other unit-level conditions ---
  const isTrigonometry =
    unitId === "trigonometry" && subjectSlug === "mathematics";
  const isVectors =
    unitId === "vectors" && subjectSlug === "mathematics";
  const isStatsProb =
    unitId === "statistics-and-probability" && subjectSlug === "mathematics";

  // --- Class 12 Calculus unit-level conditions ---
  const isAppDerivatives =
    unitId === "application-of-derivatives" && subjectSlug === "mathematics";
  const isAntiderivatives =
    unitId === "antiderivatives" && subjectSlug === "mathematics";
  const isNumericalIntegration =
    unitId === "numerical-integration" && subjectSlug === "mathematics";

  const topicTitle = unit
    ? getTopicEntryBySlug(unit, topicSlug)?.title ?? topicSlug
    : topicSlug;

  const topicPath = getTopicPath(classSlug, subjectSlug, unitId, topicSlug);
  const unitPath = getUnitPath(classSlug, subjectSlug, unitId);

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex gap-1 border-b border-border">
        {(["notes", "formulas", "numericals", "resources"] as const).map((tab) => (
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
            <RavikishanTopicResources
              classSlug={classSlug}
              subjectSlug={subjectSlug}
              unitId={unitId}
              topicSlug={topicSlug}
              unit={unit}
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

        {activeTab === "resources" && (
          <div className="space-y-3">
            {/* Class 11 Algebra topics — checked first (most specific) */}
            {isLogicSets ? (
              <LogicSetsResources />
            ) : isFunctions ? (
              <FunctionsResources />
            ) : isCurveSketching ? (
              <CurveSketchingResources />
            ) : isSequenceSeries ? (
              <SequenceSeriesResources />
            ) : isMatricesDeterminants ? (
              <MatricesDeterminantsResources />
            ) : isQuadratic ? (
              <QuadraticEquationResources />
            ) : isComplex ? (
              <ComplexNumberResources />
            ) : /* Class 11 Trigonometry */
            isTrigonometry ? (
              <TrigonometryResources />
            ) : /* Class 11 Vectors */
            isVectors ? (
              <VectorsResources />
            ) : /* Class 11 Statistics & Probability */
            isStatsProb ? (
              <StatisticsProbabilityResources />
            ) : /* Class 11 Analytic Geometry */
            isAnalyticGeometry ? (
              <AnalyticalGeometryResources />
            ) : /* Class 12 Limits & Continuity */
            isLimitsContinuity ? (
              <LimitsContinuityResources />
            ) : /* Class 12 Differentiation */
            isDifferentiation ? (
              <DifferentiationResources />
            ) : /* Class 12 Application of Derivatives */
            isAppDerivatives ? (
              <ApplicationDerivativesResources />
            ) : /* Class 12 Antiderivatives */
            isAntiderivatives ? (
              <AntiderivativesResources />
            ) : /* Class 12 Numerical Integration */
            isNumericalIntegration ? (
              <NumericalIntegrationResources />
            ) : (
              <EmptyState
                title="Coming soon"
                description={`Resources for ${topicTitle} will be available here.`}
              />
            )}
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
