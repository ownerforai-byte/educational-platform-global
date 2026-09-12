import { getLab } from "@/lib/lab-catalog";
import { LabPageBody } from "@/components/lab/lab-page-body";

export const metadata = {
  title: "Cell 3D — Biology Lab",
  description: "Interactive 3D explorer of eukaryotic and prokaryotic cells for NEB Biology.",
};

export default function Cell3DPage() {
  return <LabPageBody entry={getLab("cell-3d")!} />;
}
