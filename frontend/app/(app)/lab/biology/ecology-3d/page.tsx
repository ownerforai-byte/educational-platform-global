import { getLab } from "@/lib/lab-catalog";
import { LabPageBody } from "@/components/lab/lab-page-body";

export const metadata = {
  title: "Ecology 3D — Biology Lab",
  description: "3D ecosystem model: food webs, energy flow and nutrient cycles for NEB Biology.",
};

export default function Ecology3DPage() {
  return <LabPageBody entry={getLab("ecology-3d")!} />;
}
