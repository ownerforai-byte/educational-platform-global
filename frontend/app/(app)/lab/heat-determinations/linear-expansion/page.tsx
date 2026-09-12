import { getLab } from "@/lib/lab-catalog";
import { LabPageBody } from "@/components/lab/lab-page-body";

export const metadata = {
  title: "Linear Expansion — Coefficient of Expansion — Physics Practical",
  description: "Find the coefficient of linear expansion α of a metal rod.",
};

export default function LinearExpansionPage() {
  return <LabPageBody entry={getLab("linear-expansion")!} />;
}
