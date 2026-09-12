import { Metadata } from "next";
import { PeriodicTableView } from "@/components/periodic-table/periodic-table-view";

export const metadata: Metadata = {
  title: "Modern Periodic Table & CEE Question Bank — NEB & CEE Chemistry",
  description:
    "Interactive 118-element periodic table with CEE past MCQs, hallmark chemical reactions, key ores & compounds, melting and boiling points, and electron configurations.",
};

export default function PeriodicTablePage() {
  return (
    <div className="w-full max-w-[1780px] mx-auto py-4 md:py-8 px-2 sm:px-4 lg:px-6">
      <PeriodicTableView />
    </div>
  );
}
