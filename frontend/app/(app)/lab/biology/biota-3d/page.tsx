import { getLab } from "@/lib/lab-catalog";
import { LabPageBody } from "@/components/lab/lab-page-body";

export const metadata = {
  title: "Biota 3D — Biology Lab",
  description: "3D biodiversity and taxonomy framework for NEB Biology.",
};

export default function Biota3DPage() {
  return <LabPageBody entry={getLab("biota-3d")!} />;
}
