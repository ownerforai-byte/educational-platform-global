import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CellOrganellesExplorer3D } from "@/components/lab/cell-organelles-explorer-3d";

export const metadata: Metadata = {
  title: "Cell Organelles 3D",
  description:
    "Interactive 3D model of cell organelles — orbit, zoom and inspect each organelle.",
};

export default function CellOrganelles3DPage() {
  return (
    <div className="space-y-4">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 pt-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Cell Organelles 3D
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Interactive 3D model — orbit, zoom and inspect each organelle.
          </p>
        </div>
        <Link
          href="/lab/3d"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to 3D Labs
        </Link>
      </div>

      <CellOrganellesExplorer3D />
    </div>
  );
}
