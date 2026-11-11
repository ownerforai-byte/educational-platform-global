export const OFFICIAL_SUBJECT_SLUGS = [
  'physics',
  'chemistry',
  'biology',
  'mathematics',
  'english',
  'nepali',
] as const;

export type SubjectSlug = (typeof OFFICIAL_SUBJECT_SLUGS)[number];

export const OFFICIAL_CLASSES = ['11', '12'] as const;
export type AcademicClass = (typeof OFFICIAL_CLASSES)[number];

export interface SubjectMeta {
  slug: SubjectSlug;
  name: string;
  code?: string;
  category: 'science' | 'language' | 'compulsory';
}

export const SUBJECT_METADATA: Record<SubjectSlug, SubjectMeta> = {
  physics: {
    slug: 'physics',
    name: 'Physics',
    code: 'Phy. 101/201',
    category: 'science',
  },
  chemistry: {
    slug: 'chemistry',
    name: 'Chemistry',
    code: 'Chem. 101/201',
    category: 'science',
  },
  biology: {
    slug: 'biology',
    name: 'Biology',
    code: 'Bio. 101/201',
    category: 'science',
  },
  mathematics: {
    slug: 'mathematics',
    name: 'Mathematics',
    code: 'Math. 101/201',
    category: 'science',
  },
  english: {
    slug: 'english',
    name: 'English',
    code: 'Eng. 001/002',
    category: 'compulsory',
  },
  nepali: {
    slug: 'nepali',
    name: 'Nepali',
    code: 'Nep. 001/002',
    category: 'compulsory',
  },
};
