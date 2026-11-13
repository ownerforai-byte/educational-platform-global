import type { SyllabusTopicEntry } from "@/lib/core/syllabus";

export type UnitVM = {
  id: string;
  title: string;
  topics: string[];
  topicEntries: SyllabusTopicEntry[];
  hours?: number;
  /** Bikram Sambat year the unit first appeared in the official NEB curriculum. */
  introducedIn?: number;
};

export type SubjectNavVM = {
  slug: string;
  name: string;
  description: string;
  units: UnitVM[];
};
