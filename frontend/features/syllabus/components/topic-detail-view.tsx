import Link from "next/link";
import { EmptyState } from "@/components/content/empty-state";
import { AnalyticalGeometryResources } from "@/components/content/analytical-geometry-resources";
import { LimitsContinuityResources } from "@/components/content/limits-continuity-resources";
import { LogicSetsResources } from "@/components/content/logic-sets-resources";
import { FunctionsResources } from "@/components/content/functions-resources";
import { CurveSketchingResources } from "@/components/content/curve-sketching-resources";
import { SequenceSeriesResources } from "@/components/content/sequence-series-resources";
import { MatricesDeterminantsResources } from "@/components/content/matrices-determinants-resources";
import { QuadraticEquationResources } from "@/components/content/quadratic-equation-resources";
import { ComplexNumberResources } from "@/components/content/complex-number-resources";
import { DifferentiationResources } from "@/components/content/differentiation-resources";
import { ApplicationDerivativesResources } from "@/components/content/application-derivatives-resources";
import { AntiderivativesResources } from "@/components/content/antiderivatives-resources";
import { NumericalIntegrationResources } from "@/components/content/numerical-integration-resources";
import { TrigonometryResources } from "@/components/content/trigonometry-resources";
import { VectorsResources } from "@/components/content/vectors-resources";
import { StatisticsProbabilityResources } from "@/components/content/statistics-probability-resources";
import { MindmapInterface } from "@/features/mindmap/components/mindmap-interface";
import { getTopicMindmap } from "@/features/mindmap/queries";
import { OfficialSyllabusPanel } from "./official-syllabus-panel";
import { SubjectSectionNav } from "./subject-section-nav";
import { getUnitTopic } from "../queries";
import { ContentTabs } from "@/components/content/content-tabs";
import type { NotesTrack } from "@/lib/imported-notes";
import { RavikishanTopicResources } from "@/components/content/ravikishan-topic-resources";

function isNotesTrack(value: string): value is NotesTrack {
  return value === "class-11-notes" || value === "class-12-notes";
}

export async function TopicDetailView({
  classSlug,
  subjectSlug,
  unitId,
  topicSlug,
}: {
  classSlug: string;
  subjectSlug: string;
  unitId: string;
  topicSlug: string;
}) {
  const data = getUnitTopic(classSlug, subjectSlug, unitId, topicSlug);
  const basePath = `/${classSlug}/${subjectSlug}`;

  if (!data) {
    return (
      <EmptyState
        title="Topic not found"
        description="This topic is not listed in the official syllabus for this unit."
      />
    );
  }

  const { unit, topic } = data;
  const mindmap = await getTopicMindmap({
    classSlug,
    subjectSlug,
    unitId,
    topicSlug: topic.slug,
    topicTitle: topic.title,
  });

  return (
    <div className="space-y-6">
      <SubjectSectionNav basePath={basePath} active="chapters" />

      <OfficialSyllabusPanel
        heading="Syllabus"
        description="Official syllabus for this unit. Notes and mind maps below are attached only to the highlighted topic."
        units={[unit]}
        basePath={basePath}
        highlightUnitId={unit.id}
        highlightTopicSlug={topic.slug}
      />

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Unit ·{" "}
          <Link
            href={`${basePath}/chapters/${unit.id}`}
            className="text-primary hover:underline"
          >
            {unit.title}
          </Link>
        </p>
        <h2 className="text-2xl font-semibold tracking-tight">{topic.title}</h2>
      </div>

      {/* Notes Availability Notice */}
      <div className={`rounded-lg border p-4 ${
        isNotesTrack(classSlug)
          ? "border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800"
          : "border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-800"
      }`}>
        <div className="flex items-start gap-3">
          <span className="text-2xl">{isNotesTrack(classSlug) ? "📚" : "⚠️"}</span>
          <div>
            <h3 className="font-semibold text-sm">
              {isNotesTrack(classSlug) ? "Notes Available" : "Notes Not Available"}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {isNotesTrack(classSlug)
                ? "Detailed notes for this topic are available below. These notes have been curated and organized according to the official NEB syllabus."
                : "This class track does not have imported notes yet. Please check back later or contact the administrator for access to study materials."}
            </p>
          </div>
        </div>
      </div>

      <MindmapInterface
        title={topic.title}
        root={mindmap.root}
        source={mindmap.source}
      />

      <ContentTabs
        classSlug={classSlug}
        subjectSlug={subjectSlug}
        unitId={unitId}
        topicSlug={topic.slug}
        unit={unit}
      />

      {/* Ravikishan-sourced notes — merged, ordered by topic slug ascending */}
      <RavikishanTopicResources
        classSlug={classSlug}
        subjectSlug={subjectSlug}
        unitId={unitId}
        topicSlug={topic.slug}
      />

      {/* ─── Dedicated Resource Sections by Unit ─── */}

      {/* Class 11 — Algebra: topic-specific resources */}
      {unitId === "algebra" && subjectSlug === "mathematics" && (
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">Algebra Resources</h2>
          <p className="text-sm text-muted-foreground">
            Interactive resources for logic, functions, curve sketching, sequences, matrices, quadratic equations, and complex numbers.
          </p>
          {topicSlug?.includes("logic") && <LogicSetsResources />}
          {topicSlug?.includes("function") && <FunctionsResources />}
          {topicSlug?.includes("curve") && <CurveSketchingResources />}
          {topicSlug?.includes("sequence") && <SequenceSeriesResources />}
          {topicSlug?.includes("matrice") && <MatricesDeterminantsResources />}
          {topicSlug?.includes("quadratic") && <QuadraticEquationResources />}
          {topicSlug?.includes("complex") && <ComplexNumberResources />}
        </div>
      )}

      {/* Class 11 — Analytic Geometry */}
      {unitId === "analytic-geometry" && subjectSlug === "mathematics" && (
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">
            Analytical Geometry Resources
          </h2>
          <p className="text-sm text-muted-foreground">
            PDF exercise solutions, theory summaries, and interactive conic section
            &amp; straight-line visualizations for this unit.
          </p>
          <AnalyticalGeometryResources />
        </div>
      )}

      {/* Class 11 — Trigonometry */}
      {unitId === "trigonometry" && subjectSlug === "mathematics" && (
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">
            Trigonometry Resources
          </h2>
          <p className="text-sm text-muted-foreground">
            Interactive unit circle, inverse trigonometric functions, and trigonometric equation solver.
          </p>
          <TrigonometryResources />
        </div>
      )}

      {/* Class 11 — Vectors */}
      {unitId === "vectors" && subjectSlug === "mathematics" && (
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">
            Vectors Resources
          </h2>
          <p className="text-sm text-muted-foreground">
            Interactive 2D vector diagrams, dot product visualization, and linear dependence explorer.
          </p>
          <VectorsResources />
        </div>
      )}

      {/* Class 11 — Statistics & Probability */}
      {unitId === "statistics-and-probability" && subjectSlug === "mathematics" && (
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">
            Statistics &amp; Probability Resources
          </h2>
          <p className="text-sm text-muted-foreground">
            Interactive data dispersion analyzer, probability simulator, and binomial distribution visualizer.
          </p>
          <StatisticsProbabilityResources />
        </div>
      )}

      {/* Class 12 — Limits & Continuity */}
      {unitId === "limits-and-continuity" && subjectSlug === "mathematics" && (
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">
            Limits and Continuity Resources
          </h2>
          <p className="text-sm text-muted-foreground">
            Interactive limit visualizations, continuity analysis, and theory summaries
            for this unit.
          </p>
          <LimitsContinuityResources />
        </div>
      )}

      {/* Class 12 — Differentiation */}
      {unitId === "differentiation" && subjectSlug === "mathematics" && (
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">Differentiation Resources</h2>
          <p className="text-sm text-muted-foreground">
            Interactive derivative calculators, tangent/normal visualizations, and theory summaries.
          </p>
          <DifferentiationResources />
        </div>
      )}

      {/* Class 12 — Application of Derivatives */}
      {unitId === "application-of-derivatives" && subjectSlug === "mathematics" && (
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">Application of Derivatives</h2>
          <p className="text-sm text-muted-foreground">
            Tangent/normal lines, max/min, increasing/decreasing intervals, rate of change.
          </p>
          <ApplicationDerivativesResources />
        </div>
      )}

      {/* Class 12 — Antiderivatives */}
      {unitId === "antiderivatives" && subjectSlug === "mathematics" && (
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">Antiderivatives &amp; Integration</h2>
          <p className="text-sm text-muted-foreground">
            Indefinite integrals, definite integrals, area under curves, and fundamental theorem.
          </p>
          <AntiderivativesResources />
        </div>
      )}

      {/* Class 12 — Numerical Integration */}
      {unitId === "numerical-integration" && subjectSlug === "mathematics" && (
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">Numerical Integration</h2>
          <p className="text-sm text-muted-foreground">
            Trapezoidal rule, Simpson&apos;s rule, and numerical approximation methods.
          </p>
          <NumericalIntegrationResources />
        </div>
      )}

      <Link
        href={`${basePath}/chapters/${unit.id}`}
        className="inline-block text-sm text-muted-foreground hover:text-foreground hover:underline"
      >
        Back to unit syllabus
      </Link>
    </div>
  );
}
