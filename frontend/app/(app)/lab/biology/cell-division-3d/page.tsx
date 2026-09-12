import { getLab } from "@/lib/lab-catalog";
import { LabPageBody } from "@/components/lab/lab-page-body";

export const metadata = {
  title: "Cell Division 3D — Biology Lab",
  description: "Step-through 3D animation of mitosis and meiosis for NEB Biology.",
};

export default function CellDivision3DPage() {
  return <LabPageBody entry={getLab("cell-division-3d")!} />;
}
