import { getLab } from "@/lib/lab-catalog";
import { LabPageBody } from "@/components/lab/lab-page-body";

export const metadata = {
  title: "Biomolecules 3D — Biology Lab",
  description: "3D structures of carbohydrates, lipids, proteins and nucleic acids for NEB Biology.",
};

export default function Biomolecules3DPage() {
  return <LabPageBody entry={getLab("biomolecules-3d")!} />;
}
