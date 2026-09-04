"use client";

import type { ComponentType, ReactNode } from "react";
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
import { getTopicPath } from "@/features/syllabus/content-router";
import { getTopicEntryBySlug } from "@/lib/syllabus";
import type { SyllabusUnit } from "@/lib/syllabus";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ContentTabsProps = {
  classSlug: string;
  subjectSlug: string;
  unitId: string;
  topicSlug: string;
  unit?: SyllabusUnit;
};

type ResourceSpec = {
  title: string;
  description: string;
  component: ComponentType;
  match: (unitId: string, subjectSlug: string, topicSlug: string) => boolean;
};

const ALGEBRA_SECTION = {
  title: "Algebra Resources",
  description:
    "Interactive resources for logic, functions, curve sketching, sequences, matrices, quadratic equations, and complex numbers.",
};

const ALGEBRA_TOPIC_RESOURCES: {
  keyword: string;
  title: string;
  description: string;
  component: ComponentType;
}[] = [
  { keyword: "logic", title: "Logic & Sets", description: "Statement logic, set operations, and Venn diagram applications.", component: LogicSetsResources },
  { keyword: "function", title: "Functions", description: "Domain, range, composition, inverse functions, and types of functions.", component: FunctionsResources },
  { keyword: "curve", title: "Curve Sketching", description: "Increasing/decreasing intervals, maxima/minima, and concavity analysis.", component: CurveSketchingResources },
  { keyword: "sequence", title: "Sequences & Series", description: "AP/GP, convergence tests, mean value theorem, and series sums.", component: SequenceSeriesResources },
  { keyword: "matrice", title: "Matrices & Determinants", description: "Matrix operations, determinants, and solving linear systems.", component: MatricesDeterminantsResources },
  { keyword: "quadratic", title: "Quadratic Equations", description: "Factorization, completing the square, and nature of roots.", component: QuadraticEquationResources },
  { keyword: "complex", title: "Complex Numbers", description: "Argand diagram, polar form, and De Moivre's theorem.", component: ComplexNumberResources },
];

const UNIT_RESOURCES: ResourceSpec[] = [
  { title: "Analytical Geometry Resources", description: "PDF exercise solutions, theory summaries, and interactive conic section & straight-line visualizations for this unit.", component: AnalyticalGeometryResources, match: (u, s) => u === "analytic-geometry" && s === "mathematics" },
  { title: "Trigonometry Resources", description: "Interactive unit circle, inverse trigonometric functions, and trigonometric equation solver.", component: TrigonometryResources, match: (u, s) => u === "trigonometry" && s === "mathematics" },
  { title: "Vectors Resources", description: "Interactive 2D vector diagrams, dot product visualization, and linear dependence explorer.", component: VectorsResources, match: (u, s) => u === "vectors" && s === "mathematics" },
  { title: "Statistics & Probability Resources", description: "Interactive data dispersion analyzer, probability simulator, and binomial distribution visualizer.", component: StatisticsProbabilityResources, match: (u, s) => u === "statistics-and-probability" && s === "mathematics" },
  { title: "Limits and Continuity Resources", description: "Interactive limit visualizations, continuity analysis, and theory summaries for this unit.", component: LimitsContinuityResources, match: (u, s) => u === "limits-and-continuity" && s === "mathematics" },
  { title: "Differentiation Resources", description: "Interactive derivative calculators, tangent/normal visualizations, and theory summaries.", component: DifferentiationResources, match: (u, s) => u === "differentiation" && s === "mathematics" },
  { title: "Application of Derivatives", description: "Tangent/normal lines, max/min, increasing/decreasing intervals, rate of change.", component: ApplicationDerivativesResources, match: (u, s) => u === "application-of-derivatives" && s === "mathematics" },
  { title: "Antiderivatives & Integration", description: "Indefinite integrals, definite integrals, area under curves, and fundamental theorem.", component: AntiderivativesResources, match: (u, s) => u === "antiderivatives" && s === "mathematics" },
  { title: "Numerical Integration", description: "Trapezoidal rule, Simpson's rule, and numerical approximation methods.", component: NumericalIntegrationResources, match: (u, s) => u === "numerical-integration" && s === "mathematics" },
];

function ResourceCard({ title, description, Component }: { title: string; description: string; Component: ComponentType }) {
  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
      </CardHeader>
      <CardContent>
        <Component />
      </CardContent>
    </Card>
  );
}

function renderResources(
  unitId: string,
  subjectSlug: string,
  topicSlug: string,
  topicTitle: string,
): ReactNode {
  // Class 11 Algebra — topic-level classification within the unit section
  if (unitId === "algebra" && subjectSlug === "mathematics") {
    const sub = ALGEBRA_TOPIC_RESOURCES.find((r) => topicSlug.includes(r.keyword));
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">{ALGEBRA_SECTION.title}</h2>
          <p className="text-sm text-muted-foreground">{ALGEBRA_SECTION.description}</p>
        </div>
        {sub ? (
          <ResourceCard title={sub.title} description={sub.description} Component={sub.component} />
        ) : (
          <EmptyState
            title="Coming soon"
            description={`Interactive resources for ${topicTitle} will be available here.`}
          />
        )}
      </div>
    );
  }

  // Unit-level resources for all other matches
  const spec = UNIT_RESOURCES.find((r) => r.match(unitId, subjectSlug, topicSlug));
  if (!spec) {
    return (
      <EmptyState
        title="Coming soon"
        description={`Resources for ${topicTitle} will be available here.`}
      />
    );
  }
  return (
    <div className="space-y-4">
      <ResourceCard title={spec.title} description={spec.description} Component={spec.component} />
    </div>
  );
}

export function ContentTabs({
  classSlug,
  subjectSlug,
  unitId,
  topicSlug,
  unit,
}: ContentTabsProps) {
  const [activeTab, setActiveTab] = useState<"notes" | "formulas" | "numericals" | "resources">("notes");

  const topicTitle = unit
    ? getTopicEntryBySlug(unit, topicSlug)?.title ?? topicSlug
    : topicSlug;

  const topicPath = getTopicPath(classSlug, subjectSlug, unitId, topicSlug);

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

        {activeTab === "resources" && renderResources(unitId, subjectSlug, topicSlug, topicTitle)}
      </div>

      {/* Source Info */}
      <p className="text-xs text-muted-foreground font-mono">
        Source: {topicPath}
      </p>
    </div>
  );
}
