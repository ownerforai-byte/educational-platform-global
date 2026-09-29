import { Metadata } from "next";
import { PeriodicTableView } from "@/components/periodic-table/periodic-table-view";

export const metadata: Metadata = {
  title: "Modern Periodic Table & CEE Question Bank — NEB & CEE Chemistry",
  description:
    "Interactive 118-element periodic table with a full s/p/d/f Block Explorer — every block's characteristics, periodic-trend facts, exam traps and CEE high-frequency details — plus past MCQs, hallmark reactions, key ores & compounds and electron configurations.",
};

export default function PeriodicTablePage() {
  return (
    <div className="w-full max-w-[1780px] mx-auto pb-4 px-1 sm:px-2 lg:px-4">
      <PeriodicTableView />
    </div>
  );
}
