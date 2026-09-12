import { getLab } from "@/lib/lab-catalog";
import { LabPageBody } from "@/components/lab/lab-page-body";

export const metadata = {
  title: "Biology 3D Labs — NEB (+2)",
  description: "Hub of interactive 3D theory labs for NEB Class 11 & 12 Biology: cell, division, flora, fauna, ecology and more.",
};

export default function BioLabHub() {
  return <LabPageBody entry={getLab("biology")!} />;
}
