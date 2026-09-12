import { getLab } from "@/lib/lab-catalog";
import { LabPageBody } from "@/components/lab/lab-page-body";

export const metadata = {
  title: "Searle's Bar — Thermal Conductivity — Physics Practical",
  description: "Searle's method to determine the thermal conductivity K of a metal rod.",
};

export default function SearlesBarPage() {
  return <LabPageBody entry={getLab("searles-bar")!} />;
}
