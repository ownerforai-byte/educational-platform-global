/**
 * Search/query entry point. Two concerns, both delegating to their single
 * source instead of duplicating it:
 *
 * 1. Search wire types — a thin compatibility surface over the canonical API
 *    shapes in `@/types/api`. This module used to declare its own copies,
 *    which drifted from the real `/api/search` contract; the same names stay
 *    importable here, but every shape is the platform's actual API shape.
 *
 * 2. Syllabus queries — re-exported from `@/features/syllabus/queries.ts`,
 *    the live implementation, so this module remains a valid query entry
 *    point for pages without forking any query logic.
 */
export type {
  /** One search hit, exactly as `/api/search` returns it. */
  SearchResultItem,
  /** The syllabus hint block attached to a search response. */
  SyllabusHint,
  /** Full `/api/search` response envelope. */
  SearchResponse,
} from "@/types/api";

// Historical alias: this file used to export `SearchResult`. It is the same
// concept as `SearchResultItem`, so it now points at the canonical type.
export type { SearchResultItem as SearchResult } from "@/types/api";

export {
  listSubjects,
  getSubjectNav,
  getUnit,
  getUnitTopic,
  resolveUnitIdFromChapterSlug,
} from "@/features/syllabus/queries";
