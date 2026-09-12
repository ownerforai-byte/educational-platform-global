import { Metadata } from "next";
import { PeriodicTableView } from "@/components/periodic-table/periodic-table-view";

export const metadata: Metadata = {
  title: "Modern Periodic Table & CEE Question Bank — NEB Chemistry",
  description:
    "Interactive 118-element periodic table with CEE past MCQs, boiling and melting points, electronic configurations, and metal/non-metal/block classification filters.",
};

export default function PeriodicTablePage() {
  return (
    <div className="mx-auto max-w-7xl py-6 md:py-10 px-2 sm:px-4">
      <PeriodicTableView />
    </div>
  );
}
