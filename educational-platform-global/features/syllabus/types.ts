import type { SyllabusTopicEntry } from "@/lib/syllabus";

export type UnitVM = {
  id: string;
  title: string;
  topics: string[];
  topicEntries: SyllabusTopicEntry[];
  hours?: number;
};

export type SubjectNavVM = {
  slug: string;
  name: string;
  description: string;
  units: UnitVM[];
};
