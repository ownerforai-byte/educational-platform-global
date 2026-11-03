"use client";

import { listGoalSubjects } from "@/lib/study-goals";

/** Subject dropdown limited to the student's goal subjects (all subjects when none chosen). */
export function SubjectSelect({
  id,
  value,
  chosen,
  onChange,
}: {
  id: string;
  value: string;
  chosen: string[];
  onChange: (key: string) => void;
}) {
  const all = listGoalSubjects();
  const options = chosen.length > 0 ? all.filter((s) => chosen.includes(s.key)) : all;
  return (
    <select
      id={id}
      className="h-9 rounded-md border bg-background px-2 text-sm"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((s) => (
        <option key={s.key} value={s.key}>
          {s.subjectName} ({s.className})
        </option>
      ))}
    </select>
  );
}
