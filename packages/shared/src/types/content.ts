import type { SubjectSlug, AcademicClass } from '../constants/subjects';

export interface CurriculumTopicRef {
  slug: string;
  title: string;
  unitSlug: string;
  subjectSlug: SubjectSlug;
  classLevel: AcademicClass;
  order: number;
}

export interface CurriculumUnitRef {
  slug: string;
  title: string;
  subjectSlug: SubjectSlug;
  classLevel: AcademicClass;
  order: number;
  hours?: number;
  topics: string[];
}
