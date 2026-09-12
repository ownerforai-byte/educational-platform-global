import { getLab } from "@/lib/lab-catalog";
import { LabPageBody } from "@/components/lab/lab-page-body";

export const metadata = {
  title: "Microbiology 3D — Biology Lab",
  description: "3D exploration of microbes — bacteria, viruses and fungi — for NEB Biology.",
};

export default function Micro3DPage() {
  return <LabPageBody entry={getLab("micro-3d")!} />;
}
