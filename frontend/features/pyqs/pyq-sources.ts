/**
 * pyq-sources — the PYQ paper LINK index (metadata only, no paper text).
 *
 * `content/practice/pyq-links/<class>/<subject>.json` lists where each NEB
 * past/model paper can be found online. NEB papers are ⚠️ in SOURCES.md, so
 * this family is deliberately **link-only**: every entry carries a URL, a
 * provider credit and unit coverage — never question text. Students click
 * through to read the paper at the source; the platform authors its own
 * solutions and conceptual guidance around it.
 *
 * Files reach the app through `content/_index.json` (registered by
 * `scripts/pyq-register.mjs`, same as the PYQ banks), so both the server
 * (disk read) and the browser (fetch) see the same data.
 */
import { loadData } from "@/lib/data-loader";
import { normalizeClassDir, classDirOfTrack } from "@/lib/content/paths";

export type PyqPaperKind = "past" | "model" | "important";

export interface PyqPaperLink {
  /** Bikram Sambat exam year (e.g. 2081). */
  year: number;
  /** Exam body — "NEB" for board papers. */
  examSource: string;
  /** Grade the paper was set for ("11" | "12"). */
  grade: string;
  title: string;
  /** Link to the provider page hosting the paper. */
  url: string;
  /** Provider slug for credit (e.g. "educatenepal"). */
  provider: string;
  /** past | model | important. */
  kind: PyqPaperKind;
  /** Always "link-only" — this family never carries paper text. */
  rights: "link-only";
  /** Syllabus unit slugs the paper draws from. */
  units: string[];
  /**
   * Where on the provider page the paper sits, when the URL is a collection
   * page rather than a direct paper link (e.g. "Physics — 2081 section").
   */
  locator?: string;
}

export interface PyqLinkFile {
  subject: string;
  classLevel: string;
  papers: PyqPaperLink[];
}

const SECTION = "practice/pyq-links";

/** Every link file shipped for a class+subject, newest year first. */
export async function pyqLinksFor(
  classSlug: string,
  subjectSlug: string,
): Promise<PyqPaperLink[]> {
  const classDir = normalizeClassDir(classDirOfTrack(classSlug));
  let file: PyqLinkFile | undefined;
  try {
    // Loads the family's OWN file (mirrored to public/data/content by
    // scripts/pyq-register.mjs) rather than the whole corpus index — the
    // index no longer ships publicly (7bb51358 moved paid bodies behind the
    // reveal endpoint), and a per-file read keeps the browser payload tiny.
    file = await loadData<PyqLinkFile>(`content/${SECTION}/${classDir}/${subjectSlug}.json`);
  } catch {
    file = undefined;
  }
  if (!file || !Array.isArray(file.papers)) return [];
  return [...file.papers].sort((a, b) => b.year - a.year);
}

/** True when every entry is genuinely link-only (rights gate). */
export function allLinkOnly(papers: PyqPaperLink[]): boolean {
  return papers.every((p) => p.rights === "link-only");
}
