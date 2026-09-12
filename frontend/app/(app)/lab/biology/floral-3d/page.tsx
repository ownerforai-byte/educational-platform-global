import { getLab } from "@/lib/lab-catalog";
import { LabPageBody } from "@/components/lab/lab-page-body";

export const metadata = {
  title: "Floral Diversity 3D — Biology Lab",
  description: "3D model of flower morphology and angiosperm family characters for NEB Biology.",
};

export default function Floral3DPage() {
  return <LabPageBody entry={getLab("floral-3d")!} />;
}
