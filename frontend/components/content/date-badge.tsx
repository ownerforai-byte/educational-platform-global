/** Small validation/updated-date badge shown on important information blocks. */
import { Calendar } from "lucide-react";

export function DateBadge({ label, date, tone = "gray" }: { label: string; date: string; tone?: "green" | "blue" | "amber" | "gray" }) {
  const toneClasses = {
    green: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    blue: "border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-400",
    amber: "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    gray: "border-border bg-muted text-muted-foreground",
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-medium ${toneClasses[tone]}`}>
      <Calendar className="h-3 w-3" />
      {label}: {date}
    </span>
  );
}
