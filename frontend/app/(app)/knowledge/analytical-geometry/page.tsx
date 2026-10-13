import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, DraftingCompass } from "lucide-react";
import { AnalyticalGeometryExercise } from "@/components/content/topic-resources/analytical-geometry-exercise";
import { AnalyticalGeometryResourcePanel } from "@/components/content/analytical-geometry-resource-panel";

export const metadata: Metadata = {
  title: "Analytical Geometry — Knowledge Hub",
  description:
    "Analytical geometry exercise book with solutions plus interactive 3D visualizations of points, lines, planes and perpendicular distances.",
};

const PDF_URL =
  "https://drive.google.com/file/d/1D-kZXzO-LbPL9jZkPIAXCV6zjhJknlzt/view?usp=sharing";

export default function AnalyticalGeometryPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8">
      <div className="flex items-center gap-3">
        <Link
          href="/knowledge"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Knowledge Hub
        </Link>
      </div>

      <div>
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <DraftingCompass className="h-4 w-4" />
          <span>Class 11 Mathematics</span>
        </div>
        <h1 className="mt-1 text-2xl md:text-3xl font-bold tracking-tight">
          Analytical Geometry
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Straight lines, slopes, intercepts and concurrencies — with the full
          exercise book, worked solutions, and interactive 3D visualizations.
        </p>
      </div>

      <AnalyticalGeometryResourcePanel resourceUrl={PDF_URL} />

      <AnalyticalGeometryExercise pdfUrl={PDF_URL} showResourcePanel={false} />
    </div>
  );
}
