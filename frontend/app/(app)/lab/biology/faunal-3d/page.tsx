import { getLab } from "@/lib/lab-catalog";
import { LabPageBody } from "@/components/lab/lab-page-body";

export const metadata = {
  title: "Faunal Diversity 3D — Biology Lab",
  description: "3D tour of animal phyla and their key identifying characters for NEB Biology.",
};

export default function Faunal3DPage() {
  return <LabPageBody entry={getLab("faunal-3d")!} />;
}
