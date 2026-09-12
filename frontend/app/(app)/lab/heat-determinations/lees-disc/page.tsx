import { getLab } from "@/lib/lab-catalog";
import { LabPageBody } from "@/components/lab/lab-page-body";

export const metadata = {
  title: "Lees' Disc — Thermal Conductivity — Physics Practical",
  description: "Steady-state experiment to determine the thermal conductivity K of a metal disc.",
};

export default function LeesDiscPage() {
  return <LabPageBody entry={getLab("lees-disc")!} />;
}
