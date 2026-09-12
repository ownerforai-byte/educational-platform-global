import { getLab } from "@/lib/lab-catalog";
import { LabPageBody } from "@/components/lab/lab-page-body";

export const metadata = {
  title: "Conservation 3D — Biology Lab",
  description: "3D model of threatened ecosystems and conservation strategies for NEB Biology.",
};

export default function Conservation3DPage() {
  return <LabPageBody entry={getLab("conservation-3d")!} />;
}
