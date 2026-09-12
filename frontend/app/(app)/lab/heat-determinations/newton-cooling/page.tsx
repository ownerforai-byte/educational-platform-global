import { getLab } from "@/lib/lab-catalog";
import { LabPageBody } from "@/components/lab/lab-page-body";

export const metadata = {
  title: "Newton's Law of Cooling — Physics Practical",
  description: "Verify Newton's law of cooling by plotting the cooling curve.",
};

export default function NewtonCoolingPage() {
  return <LabPageBody entry={getLab("newton-cooling")!} />;
}
