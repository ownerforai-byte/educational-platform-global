/**
 * Government home pages cited in the independence disclaimer and on
 * `/official-sources`. Play's link checker flags `www.neb.gov.np` (bad TLS);
 * only the apex HTTPS URLs below are kept in user-facing disclaimer copy.
 */

export type OfficialGovernmentSource = {
  name: string;
  abbr: string;
  url: string;
  publishes: string;
};

export const OFFICIAL_GOVERNMENT_SOURCES: readonly OfficialGovernmentSource[] = [
  {
    name: "Curriculum Development Centre (CDC)",
    abbr: "CDC",
    url: "https://moecdc.gov.np/",
    publishes:
      "The national curriculum framework and the Class 11 & 12 subject curricula that the syllabus on this platform is arranged around.",
  },
  {
    name: "National Examination Board (NEB)",
    abbr: "NEB",
    url: "https://neb.gov.np/",
    publishes:
      "Exam notices, examination routines, model questions, results and administrative announcements for the Grade 11 and 12 examinations.",
  },
  {
    name: "Ministry of Education, Science and Technology (MoEST)",
    abbr: "MoEST",
    url: "https://moest.gov.np/",
    publishes:
      "The education policy and the ministry-level notices that the CDC curriculum and NEB exams operate under.",
  },
] as const;

/** Must never appear in disclaimer / official-sources copy (verified dead or invalid TLS). */
export const FORBIDDEN_OFFICIAL_SOURCE_URL_MARKERS = [
  "www.neb.gov.np",
  "neb.gov.com",
  "http://neb.gov.np",
  "http://www.neb.gov.np",
  "https://www.neb.gov.np",
] as const;

export const OFFICIAL_GOVERNMENT_SOURCE_URLS: readonly string[] =
  OFFICIAL_GOVERNMENT_SOURCES.map((s) => s.url);