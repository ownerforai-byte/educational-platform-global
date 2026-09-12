import { getLab } from "@/lib/lab-catalog";
import { LabPageBody } from "@/components/lab/lab-page-body";

export const metadata = {
  title: "Heat Determination Experiments — Physics Practical",
  description: "Hub of Physics measurement experiments on thermal properties: Lees' disc, linear expansion, Newton cooling and Searle's bar.",
};

export default function HeatDeterminationsHub() {
  return <LabPageBody entry={getLab("heat-determinations")!} />;
}
