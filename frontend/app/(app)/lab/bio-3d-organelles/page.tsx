import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/ui/under-development";

export const metadata: Metadata = {
  title: "Cell Organelles 3D",
  description: "Interactive 3D model of cell organelles — orbit, zoom and inspect each organelle.",
};

export default function CellOrganelles3DPage() {
  return (
    <UnderDevelopment
      title="Cell Organelles 3D"
      description="Interactive 3D model of cell organelles — orbit, zoom and inspect each part."
      backHref="/lab/3d"
      backLabel="Back to 3D Labs"
    />
  );
}
