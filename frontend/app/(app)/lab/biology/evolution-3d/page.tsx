import { getLab } from "@/lib/lab-catalog";
import { LabPageBody } from "@/components/lab/lab-page-body";

export const metadata = {
  title: "Evolution 3D — Biology Lab",
  description: "3D visualizations of natural selection and speciation for NEB Biology.",
};

export default function Evolution3DPage() {
  return <LabPageBody entry={getLab("evolution-3d")!} />;
}
